import {
  createEmptyWeekPlan,
  Recipe,
  WEEKDAYS,
  WeekendDessertMode,
  WeekPlan,
} from '@/types/recipe';
import { isQuickRecipe, isSundayRecipe } from '@/lib/recipeScheduling';

function shuffledIds(recipes: Recipe[]): string[] {
  return [...recipes].sort(() => Math.random() - 0.5).map(recipe => recipe.id);
}

function pickId(recipes: Recipe[], usedIds: Set<string>): string | null {
  const unused = recipes.filter(recipe => !usedIds.has(recipe.id));
  const pool = unused.length > 0 ? unused : recipes;
  const ids = shuffledIds(pool);
  const selected = ids[0] ?? null;
  if (selected) usedIds.add(selected);
  return selected;
}

export function generateWeekPlan(
  recipes: Recipe[],
  numLunches: number,
  numDinners: number,
  weekendDessertMode: WeekendDessertMode,
): WeekPlan {
  const lunchRecipes = recipes.filter(
    recipe =>
      recipe.category !== 'dessert' &&
      (recipe.mealType === 'lunch' || recipe.mealType === 'both'),
  );
  const weekdayLunchRecipes = lunchRecipes.filter(
    recipe => recipe.category === 'soup' || recipe.category === 'salad' || isQuickRecipe(recipe),
  );
  const saturdayLunchRecipes = lunchRecipes.filter(recipe => !isSundayRecipe(recipe));
  const sundayLunchRecipes = lunchRecipes.filter(isSundayRecipe);
  const dinnerRecipes = recipes.filter(
    recipe =>
      (recipe.category === 'main' || recipe.category === 'salad') &&
      isQuickRecipe(recipe) &&
      (recipe.mealType === 'dinner' || recipe.mealType === 'both'),
  );
  const dessertIds = shuffledIds(recipes.filter(recipe => recipe.category === 'dessert'));
  const plan = createEmptyWeekPlan();
  const usedLunchIds = new Set<string>();
  const usedDinnerIds = new Set<string>();

  WEEKDAYS.forEach((day, index) => {
    let dayLunchRecipes = weekdayLunchRecipes;
    if (day === 'Szombat') dayLunchRecipes = saturdayLunchRecipes;
    if (day === 'Vasárnap') dayLunchRecipes = sundayLunchRecipes.length > 0 ? sundayLunchRecipes : lunchRecipes;

    plan[day] = {
      ...plan[day],
      lunch: index < numLunches ? pickId(dayLunchRecipes, usedLunchIds) : null,
      dinner: index < numDinners ? pickId(dinnerRecipes, usedDinnerIds) : null,
    };
  });

  const saturdayHasLunch = Boolean(plan.Szombat.lunch);
  const sundayHasLunch = Boolean(plan.Vasárnap.lunch);
  const firstDessert = dessertIds[0] ?? null;
  const secondDessert = weekendDessertMode === 'different'
    ? dessertIds[1] ?? firstDessert
    : firstDessert;

  if (saturdayHasLunch) plan.Szombat.dessert = firstDessert;
  if (sundayHasLunch) plan.Vasárnap.dessert = secondDessert;

  return plan;
}
