import { describe, expect, it } from 'vitest';
import { defaultRecipes } from '@/data/recipes';
import { estimateRecipeCalories } from '@/lib/calorieCalculator';

describe('calorie estimates', () => {
  it('provides a finite positive per-serving estimate for every recipe', () => {
    defaultRecipes.forEach(recipe => {
      const calories = estimateRecipeCalories(recipe);
      expect(Number.isFinite(calories), recipe.name).toBe(true);
      expect(calories, recipe.name).toBeGreaterThan(0);
      expect(calories, recipe.name).toBeLessThan(2500);
    });
  });
});
