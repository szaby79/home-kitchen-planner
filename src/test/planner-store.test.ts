import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { defaultRecipes } from '@/data/recipes';
import { usePlannerStore } from '@/hooks/usePlannerStore';
import { createEmptyWeekPlan, createGenerationSelection, DEFAULT_MENU_PREFERENCES, Recipe, WEEKDAYS, WeekPlan } from '@/types/recipe';

// Unique ingredients expose stale dishes; a common ingredient exposes stale totals.
const recipes: Recipe[] = defaultRecipes.map(recipe => ({
  ...recipe,
  ingredients: [{ name: `${recipe.id}-ingredient`, quantity: 100, unit: 'g' }, { name: 'shared', quantity: 10, unit: 'g' }],
}));
const slots = ['soup', 'lunch', 'side', 'pickle', 'dessert', 'dinner'] as const;

function expectedTotals(plan: WeekPlan) {
  const totals: Record<string, number> = {};
  WEEKDAYS.forEach(day => slots.forEach(slot => {
    const recipe = recipes.find(recipe => recipe.id === plan[day][slot]);
    if (!recipe) return;
    for (const ingredient of recipe.ingredients) {
      const key = `${ingredient.name}-${ingredient.unit}`;
      totals[key] = (totals[key] ?? 0) + ingredient.quantity * plan[day][`${slot}Servings`] / recipe.defaultServings;
    }
  }));
  return totals;
}

describe('active plan and shopping list replacement', () => {
  beforeEach(() => localStorage.clear());

  it.each([1, 2, 3] as const)('replaces a stored week and calculates only weekend groceries, batchDays=%s', batchDays => {
    const { result, unmount } = renderHook(() => usePlannerStore(recipes));
    act(() => {
      result.current.generateRandomPlan(createGenerationSelection(true), 'balanced', DEFAULT_MENU_PREFERENCES, []);
      result.current.addExtraItem({ name: 'Dog food', quantity: 2, unit: 'bags', checked: false });
      result.current.setShoppingNotes('Keep this personal note');
      result.current.toggleRemoved('Dog food-bags');
      result.current.toggleRemoved('shared-g');
    });
    const oldPlan = structuredClone(result.current.weekPlan);
    const selection = createGenerationSelection(false);
    selection.Szombat = { lunch: true, dinner: true };
    selection.Vasárnap = { lunch: true, dinner: true };
    act(() => {
      expect(result.current.generateRandomPlan(selection, 'balanced', { ...DEFAULT_MENU_PREFERENCES, familySize: 6, batchDays }, [])).toBe(true);
    });
    const newPlan = result.current.weekPlan;
    WEEKDAYS.slice(0, 5).forEach(day => {
      expect(newPlan[day]).toEqual(createEmptyWeekPlan()[day]);
      expect(result.current.dailyShoppingList[day]).toEqual([]);
    });
    expect(Object.fromEntries(result.current.shoppingList.map(item => [`${item.name}-${item.unit}`, item.quantity]))).toEqual(expectedTotals(newPlan));
    const removedIds = WEEKDAYS.flatMap(day => slots.map(slot => oldPlan[day][slot]))
      .filter(id => id && !WEEKDAYS.some(day => slots.some(slot => newPlan[day][slot] === id)));
    expect(removedIds.length).toBeGreaterThan(0);
    removedIds.forEach(id => expect(result.current.shoppingList.some(item => item.name === `${id}-ingredient`)).toBe(false));
    expect(result.current.removedItems.has('shared-g')).toBe(false);
    expect(result.current.removedItems.has('Dog food-bags')).toBe(true);
    expect(result.current.extraItems).toHaveLength(1);
    expect(result.current.shoppingNotes).toBe('Keep this personal note');
    expect(JSON.parse(localStorage.getItem('plan-pan-weekplan')!)).toEqual(newPlan);
    const expectedList = result.current.shoppingList;
    unmount();
    const reloaded = renderHook(() => usePlannerStore(recipes));
    expect(reloaded.result.current.weekPlan).toEqual(newPlan);
    expect(reloaded.result.current.shoppingList).toEqual(expectedList);
    expect(reloaded.result.current.extraItems[0].name).toBe('Dog food');
    expect(reloaded.result.current.shoppingNotes).toBe('Keep this personal note');
  });

  it('keeps the old plan, storage, list and notes if generation cannot fill a selected meal', () => {
    const { result } = renderHook(() => usePlannerStore(recipes));
    act(() => {
      result.current.generateRandomPlan(createGenerationSelection(true), 'simple', DEFAULT_MENU_PREFERENCES, []);
      result.current.setShoppingNotes('My note');
      result.current.toggleRemoved('shared-g');
    });
    const plan = result.current.weekPlan;
    const list = result.current.shoppingList;
    const stored = localStorage.getItem('plan-pan-weekplan');
    act(() => {
      expect(result.current.generateRandomPlan(createGenerationSelection(true), 'simple', { ...DEFAULT_MENU_PREFERENCES, dislikedIngredients: ['shared'] }, [])).toBe(false);
      expect(result.current.generateRandomPlan(createGenerationSelection(false), 'simple', DEFAULT_MENU_PREFERENCES, [])).toBe(false);
    });
    expect(result.current.weekPlan).toBe(plan);
    expect(result.current.shoppingList).toBe(list);
    expect(localStorage.getItem('plan-pan-weekplan')).toBe(stored);
    expect(result.current.shoppingNotes).toBe('My note');
    expect(result.current.removedItems.has('shared-g')).toBe(true);
  });

  it('replaces only one dish and updates quantities when servings change', () => {
    const { result } = renderHook(() => usePlannerStore(recipes));
    act(() => { result.current.generateRandomPlan(createGenerationSelection(true), 'balanced', DEFAULT_MENU_PREFERENCES, []); });
    const previous = structuredClone(result.current.weekPlan);
    const replacement = recipes.find(recipe => recipe.category === 'main' && recipe.id !== previous.Hétfő.dinner)!;
    act(() => { result.current.updateDay('Hétfő', { dinner: replacement.id, dinnerServings: 8 }); });
    expect(result.current.weekPlan).toEqual({ ...previous, Hétfő: { ...previous.Hétfő, dinner: replacement.id, dinnerServings: 8 } });
    expect(Object.fromEntries(result.current.shoppingList.map(item => [`${item.name}-${item.unit}`, item.quantity]))).toEqual(expectedTotals(result.current.weekPlan));
  });
});
