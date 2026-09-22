import { describe, expect, it } from 'vitest';
import { dietaryRecipePackThree } from '@/data/dietaryRecipePackThree';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { recipeAllergens, recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { DEFAULT_MENU_PREFERENCES, FoodRestriction } from '@/types/recipe';

const normalizeName = (name: string) => name
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('hu')
  .replace(/[^a-z0-9]/g, '');

describe('dietary recipe pack three', () => {
  it('adds 12 complete recipes without exact name or ID duplicates', () => {
    expect(dietaryRecipePackThree).toHaveLength(12);
    expect(new Set(defaultRecipes.map(recipe => recipe.id)).size).toBe(defaultRecipes.length);
    expect(new Set(defaultRecipes.map(recipe => normalizeName(recipe.name))).size).toBe(defaultRecipes.length);

    dietaryRecipePackThree.forEach(recipe => {
      expect(recipe.ingredients.length, recipe.name).toBeGreaterThanOrEqual(8);
      expect(recipe.description.match(/^\d+\./gm), recipe.name).toHaveLength(5);
      expect(ENGLISH_INSTRUCTIONS[recipe.id]?.match(/^\d+\./gm), recipe.name).toHaveLength(5);
      expect(recipe.preparationTime, recipe.name).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.name).toBeGreaterThan(0);
      expect(recipe.totalTime, recipe.name).toBe(recipe.preparationTime! + recipe.cookingTime!);
      expect(recipe.estimatedCostCategory, recipe.name).toMatch(/^\${1,3}$/);
    });
  });

  it('adds balanced vegan, vegetarian, and keto coverage', () => {
    expect(dietaryRecipePackThree.filter(recipe => recipe.vegan)).toHaveLength(5);
    expect(dietaryRecipePackThree.filter(recipe => recipe.vegetarian)).toHaveLength(7);
    expect(dietaryRecipePackThree.filter(recipe => recipe.keto)).toHaveLength(10);
    expect(dietaryRecipePackThree.filter(recipe => recipe.keto && recipe.vegan)).toHaveLength(4);
  });

  it.each<FoodRestriction>(['milk', 'egg', 'nuts', 'fish', 'soy'])(
    'blocks every pack-three recipe carrying the %s allergen',
    restriction => {
      const affected = dietaryRecipePackThree.filter(recipe => recipeAllergens(recipe).has(restriction));
      expect(affected.length).toBeGreaterThan(0);
      affected.forEach(recipe => expect(recipeMatchesSafetyPreferences(recipe, {
        ...DEFAULT_MENU_PREFERENCES,
        allergies: [restriction],
      }), recipe.name).toBe(false));
    },
  );

  it('keeps the chicken meal available with all unrelated allergen filters', () => {
    const chicken = dietaryRecipePackThree.find(recipe => recipe.id === 'main-117')!;
    expect(recipeAllergens(chicken).size).toBe(0);
    expect(recipeMatchesSafetyPreferences(chicken, {
      ...DEFAULT_MENU_PREFERENCES,
      allergies: ['milk', 'egg', 'nuts', 'fish', 'soy'],
    })).toBe(true);
  });
});
