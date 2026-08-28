import { Ingredient, Recipe } from '@/types/recipe';

const KCAL_PER_100G: Array<[RegExp, number]> = [
  [/olaj|zsír/, 884], [/vaj/, 717], [/cukor|méz|lekvár/, 390], [/liszt|tarhonya|tészta|rizs|gríz|zsemlemorzsa/, 350],
  [/sajt/, 350], [/kolbász|szalonna/, 400], [/sertés|marha|csirke|pulyka|hal|hús|comb|karaj/, 190],
  [/tojás/, 143], [/tejföl|tejszín/, 210], [/tej|joghurt/, 60], [/bab|lencse|borsó/, 120],
  [/burgonya/, 77], [/kenyér|zsemle|kifli/, 260], [/dió|mák/, 600], [/csokoládé|kakaó/, 500],
  [/savanyúság|uborka|káposzta|cékla|paprika|paradicsom|hagyma|répa|zeller|brokkoli|karfiol|zöldség/, 35],
  [/alma|meggy|gyümölcs/, 55],
];
const PIECE_GRAMS: Array<[RegExp, number]> = [[/tojás/, 55], [/burgonya/, 180], [/alma/, 180], [/hagyma/, 120], [/paprika/, 150], [/paradicsom/, 140], [/répa/, 100], [/uborka/, 100]];
const lower = (value: string) => value.toLocaleLowerCase('hu');

function grams(ingredient: Ingredient): number {
  const unit = lower(ingredient.unit);
  if (unit === 'g' || unit === 'ml') return ingredient.quantity;
  if (unit === 'kg' || unit === 'l') return ingredient.quantity * 1000;
  if (unit === 'ek') return ingredient.quantity * 15;
  if (unit === 'tk') return ingredient.quantity * 5;
  if (unit === 'db') return ingredient.quantity * (PIECE_GRAMS.find(([pattern]) => pattern.test(lower(ingredient.name)))?.[1] ?? 100);
  if (unit === 'csokor') return ingredient.quantity * 30;
  if (unit === 'gerezd') return ingredient.quantity * 4;
  if (unit === 'csomag') return ingredient.quantity * 12;
  return ingredient.quantity * 20;
}

export function estimateIngredientCalories(ingredient: Ingredient): number {
  const density = KCAL_PER_100G.find(([pattern]) => pattern.test(lower(ingredient.name)))?.[1] ?? 45;
  return grams(ingredient) * density / 100;
}

export function estimateRecipeCalories(recipe: Recipe): number {
  const total = recipe.ingredients.reduce((sum, ingredient) => sum + estimateIngredientCalories(ingredient), 0);
  return Math.max(5, Math.round(total / recipe.defaultServings / 5) * 5);
}
