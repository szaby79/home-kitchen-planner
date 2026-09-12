import { DEFAULT_MENU_PREFERENCES } from '@/types/recipe';
import type { MenuPreferences } from '@/types/recipe';

export function normalizePreferences(value: unknown): MenuPreferences | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const candidate = { ...DEFAULT_MENU_PREFERENCES, ...(value as Partial<MenuPreferences>) };
  const diets = ['none', 'vegetarian', 'vegan'];
  const restrictions = ['gluten', 'milk', 'lactose', 'egg', 'nuts', 'fish', 'soy'];
  const styles = ['traditional', 'light', 'quick', 'meatless'];
  const cookingTimes = ['any', '30', '45', '60'];

  if (!Number.isInteger(candidate.familySize) || Number(candidate.familySize) < 1 || Number(candidate.familySize) > 12) return null;
  if (!diets.includes(String(candidate.diet))) return null;
  if (!isStringArray(candidate.allergies, restrictions) || !isStringArray(candidate.intolerances, restrictions)) return null;
  if (!isStringArray(candidate.preferredStyles, styles)) return null;
  if (!Array.isArray(candidate.dislikedIngredients) || !candidate.dislikedIngredients.every(item => typeof item === 'string')) return null;
  if (!cookingTimes.includes(String(candidate.maxCookingTime))) return null;
  if (![1, 2, 3].includes(Number(candidate.batchDays))) return null;

  return {
    familySize: candidate.familySize as number,
    diet: candidate.diet as MenuPreferences['diet'],
    allergies: [...candidate.allergies] as MenuPreferences['allergies'],
    intolerances: [...candidate.intolerances] as MenuPreferences['intolerances'],
    dislikedIngredients: candidate.dislikedIngredients.map(item => item.trim()).filter(Boolean),
    preferredStyles: [...candidate.preferredStyles] as MenuPreferences['preferredStyles'],
    maxCookingTime: candidate.maxCookingTime as MenuPreferences['maxCookingTime'],
    batchDays: candidate.batchDays as MenuPreferences['batchDays'],
  };
}

function isStringArray(value: unknown, allowed: string[]): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string' && allowed.includes(item));
}
