import { Category, Recipe } from '@/types/recipe';

const CATEGORY_ORDER: Record<Category, number> = {
  soup: 0,
  main: 1,
  side: 2,
  pickle: 3,
  salad: 4,
  dessert: 5,
};

function recipeNumber(recipe: Recipe): number {
  const match = recipe.id.match(/-(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

export function sortRecipesByCategory(recipes: Recipe[]): Recipe[] {
  return [...recipes].sort((a, b) => {
    const categoryDifference = CATEGORY_ORDER[a.category] - CATEGORY_ORDER[b.category];
    if (categoryDifference !== 0) return categoryDifference;

    const numberDifference = recipeNumber(a) - recipeNumber(b);
    if (numberDifference !== 0) return numberDifference;

    return a.name.localeCompare(b.name, 'hu');
  });
}
