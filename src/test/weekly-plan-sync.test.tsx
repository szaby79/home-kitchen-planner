import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defaultRecipes } from '@/data/recipes';
import { shoppingItemKey, usePlannerStore } from '@/hooks/usePlannerStore';
import { getWeekStart } from '@/lib/weekDates';
import { StoredWeeklyPlan, WeeklyPlanPayload } from '@/lib/weeklyPlanValidation';
import { createEmptyWeekPlan, Recipe } from '@/types/recipe';

const cloud = vi.hoisted(() => ({ fetch: vi.fn(), upsert: vi.fn() }));

vi.mock('@/lib/weeklyPlans', () => ({
  fetchWeeklyPlans: cloud.fetch,
  upsertWeeklyPlan: cloud.upsert,
}));

const recipes: Recipe[] = [
  { ...defaultRecipes.find(recipe => recipe.category === 'main')!, ingredients: [{ name: 'rice', quantity: 100, unit: 'g' }] },
  { ...defaultRecipes.find(recipe => recipe.category === 'soup')!, ingredients: [{ name: 'carrot', quantity: 2, unit: 'pcs' }] },
];

function planWithMeal(recipeId = recipes[0].id) {
  const plan = createEmptyWeekPlan();
  plan.Hétfő.lunch = recipeId;
  plan.Hétfő.lunchServings = 5;
  return plan;
}

function record(weekStart: string, familyPlan = planWithMeal(), updatedAt = '2026-09-12T10:00:00.000Z'): StoredWeeklyPlan {
  return {
    id: `plan-${weekStart}`,
    weekStart,
    weekPlan: familyPlan,
    shoppingItems: [],
    extraItems: [],
    checkedItemKeys: [],
    shoppingNotes: '',
    createdAt: '2026-09-12T09:00:00.000Z',
    updatedAt,
  };
}

describe('weekly plan local and cloud synchronization', () => {
  beforeEach(() => {
    localStorage.clear();
    cloud.fetch.mockReset().mockResolvedValue([]);
    cloud.upsert.mockReset().mockImplementation(async (_userId: string, weekStart: string, payload: WeeklyPlanPayload) => ({
      ...record(weekStart, payload.weekPlan, '2026-09-12T11:00:00.000Z'),
      shoppingItems: payload.shoppingItems,
      extraItems: payload.extraItems,
      checkedItemKeys: payload.checkedItemKeys,
      shoppingNotes: payload.shoppingNotes,
    }));
  });

  it('restores the selected saved week after remount without leaking selection to another user', async () => {
    const oldWeek = '2025-01-06';
    cloud.fetch.mockResolvedValue([record(getWeekStart()), record(oldWeek)]);
    const first = renderHook(() => usePlannerStore(recipes, { userId: 'user-a' }));
    await waitFor(() => expect(first.result.current.plannerReady).toBe(true));
    act(() => { first.result.current.openSavedWeek(oldWeek); });
    first.unmount();

    const second = renderHook(() => usePlannerStore(recipes, { userId: 'user-a' }));
    await waitFor(() => expect(second.result.current.plannerReady).toBe(true));
    expect(second.result.current.displayedWeekStart).toBe(oldWeek);
    expect(second.result.current.weekPlan.Hétfő.lunchServings).toBe(5);
    second.unmount();

    const other = renderHook(() => usePlannerStore(recipes, { userId: 'user-b' }));
    await waitFor(() => expect(other.result.current.plannerReady).toBe(true));
    expect(other.result.current.displayedWeekStart).toBe(getWeekStart());
  });

  it('falls back to the current week and forgets a remembered plan that was deleted', async () => {
    localStorage.setItem('plan-pan-selected-week-v1:user-a', '2025-01-06');
    cloud.fetch.mockResolvedValue([record(getWeekStart())]);
    const hook = renderHook(() => usePlannerStore(recipes, { userId: 'user-a' }));
    await waitFor(() => expect(hook.result.current.plannerReady).toBe(true));
    expect(hook.result.current.displayedWeekStart).toBe(getWeekStart());
    expect(localStorage.getItem('plan-pan-selected-week-v1:user-a')).toBeNull();
  });

  it('keeps guest plans, manual items, checkmarks and notes device-local after remount', async () => {
    const first = renderHook(() => usePlannerStore(recipes));
    act(() => {
      first.result.current.updateDay('Hétfő', { lunch: recipes[0].id, lunchServings: 5 });
      first.result.current.addExtraItem({ name: 'Apples', quantity: 2, unit: 'pcs', checked: false });
      first.result.current.toggleRemoved('rice-g');
      first.result.current.setShoppingNotes('Use the reusable bag');
    });
    await waitFor(() => expect(localStorage.getItem('plan-pan-shopping-notes')).toBe('Use the reusable bag'));
    first.unmount();

    const second = renderHook(() => usePlannerStore(recipes));
    expect(second.result.current.weekPlan.Hétfő.lunch).toBe(recipes[0].id);
    expect(second.result.current.weekPlan.Hétfő.lunchServings).toBe(5);
    expect(second.result.current.extraItems[0].name).toBe('Apples');
    expect(second.result.current.removedItems.has('rice-g')).toBe(true);
    expect(second.result.current.shoppingNotes).toBe('Use the reusable bag');
    expect(cloud.fetch).not.toHaveBeenCalled();
    expect(cloud.upsert).not.toHaveBeenCalled();
  });

  it('waits for cloud loading and treats the saved current week as authoritative', async () => {
    const current = getWeekStart();
    localStorage.setItem('plan-pan-weekplan', JSON.stringify(planWithMeal(recipes[1].id)));
    let finishLoad: (records: StoredWeeklyPlan[]) => void = () => undefined;
    cloud.fetch.mockReturnValue(new Promise(resolve => { finishLoad = resolve; }));
    const saved = record(current);
    const view = renderHook(() => usePlannerStore(recipes, { userId: 'user-a' }));

    expect(view.result.current.plannerReady).toBe(false);
    await new Promise(resolve => window.setTimeout(resolve, 750));
    expect(cloud.upsert).not.toHaveBeenCalled();
    await act(async () => finishLoad([saved]));

    await waitFor(() => expect(view.result.current.plannerReady).toBe(true));
    expect(view.result.current.weekPlan).toEqual(saved.weekPlan);
    expect(view.result.current.cloudSyncStatus).toBe('saved');
    expect(cloud.upsert).not.toHaveBeenCalled();
  });

  it('migrates a matching valid guest week once and includes linked shopping state', async () => {
    const current = getWeekStart();
    localStorage.setItem('plan-pan-week-start', current);
    localStorage.setItem('plan-pan-weekplan', JSON.stringify(planWithMeal()));
    localStorage.setItem('plan-pan-extra-items', JSON.stringify([{ name: 'Apples', quantity: 2, unit: 'pcs', checked: false, manual: true }]));
    localStorage.setItem('plan-pan-checked-items', JSON.stringify(['rice-g', 'Apples-pcs']));
    localStorage.setItem('plan-pan-shopping-notes', 'Guest note');

    const view = renderHook(() => usePlannerStore(recipes, { userId: 'user-a' }));
    await waitFor(() => expect(cloud.upsert).toHaveBeenCalledTimes(1), { timeout: 2000 });
    expect(cloud.upsert).toHaveBeenCalledWith('user-a', current, expect.objectContaining({
      weekPlan: planWithMeal(),
      checkedItemKeys: ['rice-g', 'Apples-pcs'],
      shoppingNotes: 'Guest note',
    }));
    const payload = cloud.upsert.mock.calls[0][2] as WeeklyPlanPayload;
    expect(payload.shoppingItems.find(item => shoppingItemKey(item) === 'rice-g')?.checked).toBe(true);
    expect(payload.shoppingItems.find(item => shoppingItemKey(item) === 'Apples-pcs')?.checked).toBe(true);
    await waitFor(() => expect(view.result.current.cloudSyncStatus).toBe('saved'));
    await new Promise(resolve => window.setTimeout(resolve, 800));
    expect(cloud.upsert).toHaveBeenCalledTimes(1);
  });

  it('opens previous cloud weeks and restores the separate guest state on sign-out', async () => {
    const current = getWeekStart();
    const previousDate = new Date(`${current}T12:00:00`);
    previousDate.setDate(previousDate.getDate() - 7);
    const previous = getWeekStart(previousDate);
    const oldPlan = planWithMeal(recipes[1].id);
    cloud.fetch.mockResolvedValue([record(current), record(previous, oldPlan)]);
    localStorage.setItem('plan-pan-weekplan', JSON.stringify(createEmptyWeekPlan()));

    const view = renderHook(({ userId }) => usePlannerStore(recipes, { userId }), { initialProps: { userId: 'user-a' as string | null } });
    await waitFor(() => expect(view.result.current.savedWeeks).toHaveLength(2));
    act(() => expect(view.result.current.openSavedWeek(previous)).toBe(true));
    expect(view.result.current.displayedWeekStart).toBe(previous);
    expect(view.result.current.weekPlan).toEqual(oldPlan);
    act(() => expect(view.result.current.returnToCurrentWeek()).toBe(true));
    expect(view.result.current.displayedWeekStart).toBe(current);

    view.rerender({ userId: null });
    await waitFor(() => expect(view.result.current.cloudSyncEnabled).toBe(false));
    expect(view.result.current.weekPlan).toEqual(createEmptyWeekPlan());
    expect(view.result.current.savedWeeks).toEqual([]);
  });

  it('retains failed changes in user-scoped pending storage without losing the visible plan', async () => {
    const current = getWeekStart();
    cloud.fetch.mockResolvedValue([record(current)]);
    cloud.upsert.mockRejectedValueOnce(new Error('offline'));
    const view = renderHook(() => usePlannerStore(recipes, { userId: 'user-a' }));
    await waitFor(() => expect(view.result.current.cloudSyncStatus).toBe('saved'));

    act(() => view.result.current.updateDay('Hétfő', { lunchServings: 7 }));
    await waitFor(() => expect(view.result.current.cloudSyncStatus).toBe('error'), { timeout: 2000 });
    expect(view.result.current.weekPlan.Hétfő.lunchServings).toBe(7);
    const pending = localStorage.getItem(`plan-pan-weekly-plan-pending-v1:user-a:${current}`);
    expect(pending).toContain('"lunchServings":7');
    expect(localStorage.getItem('plan-pan-weekplan')).toBeNull();
  });

  it('refetches cloud state after an initial outage before uploading pending edits', async () => {
    const current = getWeekStart();
    const saved = record(current);
    cloud.fetch.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce([saved]);
    const view = renderHook(() => usePlannerStore(recipes, { userId: 'user-a' }));
    await waitFor(() => expect(view.result.current.cloudSyncStatus).toBe('error'));

    act(() => view.result.current.updateDay('Hétfő', { lunchServings: 8 }));
    await new Promise(resolve => window.setTimeout(resolve, 800));
    expect(cloud.upsert).not.toHaveBeenCalled();
    expect(localStorage.getItem(`plan-pan-weekly-plan-pending-v1:user-a:${current}`)).toContain('"lunchServings":8');

    act(() => window.dispatchEvent(new Event('online')));
    await waitFor(() => expect(cloud.fetch).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(cloud.upsert).toHaveBeenCalledTimes(1), { timeout: 2000 });
    expect((cloud.upsert.mock.calls[0][2] as WeeklyPlanPayload).weekPlan.Hétfő.lunchServings).toBe(8);
  });
});
