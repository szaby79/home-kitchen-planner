import {
  createEmptyWeekPlan,
  Recipe,
  WEEKDAYS,
  WeekendDessertMode,
  WeekPlan,
} from '@/types/recipe';

function shuffledIds(recipes: Recipe[]): string[] {
  return [...recipes].sort(() => Math.random() - 0.5).map(recipe => recipe.id);
}

function pickForWeek(recipes: Recipe[], count: number): (string | null)[] {
  const ids = shuffledIds(recipes);
  return WEEKDAYS.map((_, index) => {
    if (index >= count || ids.length === 0) return null;
    return ids[index % ids.length];
  });
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
  const dinnerRecipes = recipes.filter(
    recipe =>
      recipe.category === 'main' &&
      (recipe.mealType === 'dinner' || recipe.mealType === 'both'),
  );
  const dessertIds = shuffledIds(recipes.filter(recipe => recipe.category === 'dessert'));

  const lunches = pickForWeek(lunchRecipes, numLunches);
  const dinners = pickForWeek(dinnerRecipes, numDinners);
  const plan = createEmptyWeekPlan();

  WEEKDAYS.forEach((day, index) => {
    plan[day] = { ...plan[day], lunch: lunches[index], dinner: dinners[index] };
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
