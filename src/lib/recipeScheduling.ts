import { Recipe } from '@/types/recipe';

const QUICK_MAIN_IDS = new Set([
  'main-12', 'main-13', 'main-18', 'main-19', 'main-20', 'main-21',
  'main-28', 'main-32', 'main-35', 'main-44', 'main-46', 'main-47',
  'main-48', 'main-53', 'main-54', 'main-62', 'main-63', 'main-64',
]);

const SUNDAY_MAIN_IDS = new Set([
  'main-1', 'main-2', 'main-3', 'main-4', 'main-5', 'main-6', 'main-8',
  'main-9', 'main-10', 'main-11', 'main-15', 'main-16', 'main-17',
  'main-22', 'main-26', 'main-31', 'main-33', 'main-34', 'main-36',
  'main-37', 'main-38', 'main-39', 'main-40', 'main-41', 'main-49',
  'main-50', 'main-51', 'main-52', 'main-55', 'main-56', 'main-57',
  'main-58', 'main-59', 'main-60', 'main-61', 'main-65', 'main-66',
  'main-67', 'main-68', 'main-69', 'main-70',
]);

export function isQuickRecipe(recipe: Recipe): boolean {
  return recipe.category === 'salad' || QUICK_MAIN_IDS.has(recipe.id);
}

export function isSundayRecipe(recipe: Recipe): boolean {
  return SUNDAY_MAIN_IDS.has(recipe.id);
}
