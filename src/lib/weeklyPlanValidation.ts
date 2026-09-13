import { createEmptyWeekPlan, ShoppingItem, WEEKDAYS, WeekPlan } from '@/types/recipe';
import { isDateKey } from '@/lib/weekDates';

const RECIPE_SLOTS = ['soup', 'lunch', 'side', 'pickle', 'dinner', 'dessert'] as const;
const NUMBER_FIELDS = ['soupServings', 'lunchServings', 'sideServings', 'pickleServings', 'dinnerServings', 'dessertServings', 'lunchDays', 'dinnerDays'] as const;

export type WeeklyPlanState = {
  weekPlan: WeekPlan;
  extraItems: ShoppingItem[];
  checkedItemKeys: string[];
  shoppingNotes: string;
};

export type WeeklyPlanPayload = WeeklyPlanState & {
  shoppingItems: ShoppingItem[];
};

export type StoredWeeklyPlan = WeeklyPlanState & {
  id: string;
  weekStart: string;
  shoppingItems: ShoppingItem[];
  createdAt: string;
  updatedAt: string;
};

export function normalizeWeekPlan(value: unknown): WeekPlan | null {
  if (!isRecord(value)) return null;
  const plan = createEmptyWeekPlan();
  for (const day of WEEKDAYS) {
    const candidate = value[day];
    if (!isRecord(candidate)) return null;
    for (const slot of RECIPE_SLOTS) {
      const recipeId = candidate[slot];
      if (recipeId !== null && typeof recipeId !== 'string') return null;
      plan[day][slot] = recipeId as string | null;
    }
    for (const field of NUMBER_FIELDS) {
      const number = candidate[field];
      if (typeof number !== 'number' || !Number.isFinite(number) || number < 1 || number > 100) return null;
      plan[day][field] = number;
    }
    plan[day].lunchFromLeftovers = candidate.lunchFromLeftovers === true;
    plan[day].dinnerFromLeftovers = candidate.dinnerFromLeftovers === true;
  }
  return plan;
}

export function normalizeShoppingItems(value: unknown): ShoppingItem[] | null {
  if (!Array.isArray(value)) return null;
  const items: ShoppingItem[] = [];
  for (const candidate of value) {
    if (!isRecord(candidate) || typeof candidate.name !== 'string' || !candidate.name.trim() || typeof candidate.unit !== 'string') return null;
    if (typeof candidate.quantity !== 'number' || !Number.isFinite(candidate.quantity) || candidate.quantity < 0) return null;
    items.push({
      name: candidate.name,
      quantity: candidate.quantity,
      unit: candidate.unit,
      checked: candidate.checked === true,
      manual: candidate.manual === true || undefined,
      dayIndex: typeof candidate.dayIndex === 'number' && candidate.dayIndex >= 0 && candidate.dayIndex <= 6 ? candidate.dayIndex : undefined,
    });
  }
  return items;
}

export function normalizeWeeklyPlanRecord(value: unknown): StoredWeeklyPlan | null {
  if (!isRecord(value) || typeof value.id !== 'string' || !isDateKey(value.week_start)) return null;
  if (typeof value.created_at !== 'string' || typeof value.updated_at !== 'string') return null;
  const menu = isRecord(value.menu_data) ? value.menu_data : null;
  const shopping = isRecord(value.shopping_list) ? value.shopping_list : null;
  const weekPlan = normalizeWeekPlan(menu?.weekPlan);
  const shoppingItems = normalizeShoppingItems(shopping?.items);
  const extraItems = normalizeShoppingItems(shopping?.extraItems);
  const checkedItemKeys = Array.isArray(shopping?.checkedItemKeys) && shopping.checkedItemKeys.every(item => typeof item === 'string') ? [...new Set(shopping.checkedItemKeys)] : null;
  if (!weekPlan || !shoppingItems || !extraItems || !checkedItemKeys || typeof shopping?.notes !== 'string') return null;
  return {
    id: value.id,
    weekStart: value.week_start,
    weekPlan,
    shoppingItems,
    extraItems,
    checkedItemKeys,
    shoppingNotes: shopping.notes,
    createdAt: value.created_at,
    updatedAt: value.updated_at,
  };
}

export function hasPlanMeals(plan: WeekPlan): boolean {
  return WEEKDAYS.some(day => RECIPE_SLOTS.some(slot => Boolean(plan[day][slot])));
}

export function weeklyPlanFingerprint(state: WeeklyPlanState): string {
  return JSON.stringify({
    weekPlan: state.weekPlan,
    extraItems: state.extraItems,
    checkedItemKeys: [...state.checkedItemKeys].sort(),
    shoppingNotes: state.shoppingNotes,
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
