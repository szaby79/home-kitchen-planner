import { describe, expect, it } from 'vitest';
import { dietaryRecipePackTwo } from '@/data/dietaryRecipePackTwo';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { recipeAllergens, recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { DEFAULT_MENU_PREFERENCES, FoodRestriction } from '@/types/recipe';

const normalizeName = (name: string) => name
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('hu')
  .replace(/[^a-z0-9]/g, '');

describe('dietary recipe pack two', () => {
  it('adds 12 complete recipes without exact name or ID duplicates', () => {
    expect(dietaryRecipePackTwo).toHaveLength(12);
    expect(new Set(defaultRecipes.map(recipe => recipe.id)).size).toBe(defaultRecipes.length);
    expect(new Set(defaultRecipes.map(recipe => normalizeName(recipe.name))).size).toBe(defaultRecipes.length);

    dietaryRecipePackTwo.forEach(recipe => {
      expect(recipe.ingredients.length, recipe.name).toBeGreaterThanOrEqual(8);
      expect(recipe.description.match(/^\d+\./gm), recipe.name).toHaveLength(5);
      expect(ENGLISH_INSTRUCTIONS[recipe.id]?.match(/^\d+\./gm), recipe.name).toHaveLength(5);
      expect(recipe.preparationTime, recipe.name).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.name).toBeGreaterThan(0);
      expect(recipe.totalTime, recipe.name).toBe(recipe.preparationTime! + recipe.cookingTime!);
      expect(recipe.estimatedCostCategory, recipe.name).toMatch(/^\${1,3}$/);
    });
  });

  it('adds intentional vegan, vegetarian, and keto overlap', () => {
    expect(dietaryRecipePackTwo.filter(recipe => recipe.vegan)).toHaveLength(4);
    expect(dietaryRecipePackTwo.filter(recipe => recipe.vegetarian)).toHaveLength(7);
    expect(dietaryRecipePackTwo.filter(recipe => recipe.keto)).toHaveLength(10);
    expect(dietaryRecipePackTwo.filter(recipe => recipe.keto && recipe.vegan)).toHaveLength(2);
  });

  it.each<FoodRestriction>(['milk', 'egg', 'nuts', 'fish'])(
    'blocks every pack-two recipe carrying the %s allergen',
    restriction => {
      const affected = dietaryRecipePackTwo.filter(recipe => recipeAllergens(recipe).has(restriction));
      expect(affected.length).toBeGreaterThan(0);
      affected.forEach(recipe => expect(recipeMatchesSafetyPreferences(recipe, {
        ...DEFAULT_MENU_PREFERENCES,
        allergies: [restriction],
      }), recipe.name).toBe(false));
    },
  );

  it('keeps allergen-free recipes available when unrelated filters are selected', () => {
    const beefAndCabbage = dietaryRecipePackTwo.find(recipe => recipe.id === 'main-107')!;
    expect(recipeAllergens(beefAndCabbage).size).toBe(0);
    expect(recipeMatchesSafetyPreferences(beefAndCabbage, {
      ...DEFAULT_MENU_PREFERENCES,
      allergies: ['milk', 'egg', 'nuts', 'fish'],
    })).toBe(true);
  });
});
