import { describe, expect, it } from 'vitest';
import { dietaryRecipePackOne } from '@/data/dietaryRecipePackOne';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { recipeAllergens, recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { DEFAULT_MENU_PREFERENCES, FoodRestriction } from '@/types/recipe';

const normalizeName = (name: string) => name
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('hu')
  .replace(/[^a-z0-9]/g, '');

describe('dietary recipe pack one', () => {
  it('adds 12 complete, non-duplicated recipes', () => {
    expect(dietaryRecipePackOne).toHaveLength(12);
    expect(new Set(defaultRecipes.map(recipe => recipe.id)).size).toBe(defaultRecipes.length);
    expect(new Set(defaultRecipes.map(recipe => normalizeName(recipe.name))).size).toBe(defaultRecipes.length);

    dietaryRecipePackOne.forEach(recipe => {
      expect(recipe.ingredients.length, recipe.name).toBeGreaterThanOrEqual(8);
      expect(recipe.description.match(/^\d+\./gm), recipe.name).toHaveLength(5);
      expect(ENGLISH_INSTRUCTIONS[recipe.id]?.match(/^\d+\./gm), recipe.name).toHaveLength(5);
      expect(recipe.preparationTime, recipe.name).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.name).toBeGreaterThan(0);
      expect(recipe.estimatedCostCategory, recipe.name).toMatch(/^\${1,3}$/);
    });
  });

  it('provides meaningful vegan, vegetarian, and keto coverage', () => {
    expect(dietaryRecipePackOne.filter(recipe => recipe.vegan)).toHaveLength(6);
    expect(dietaryRecipePackOne.filter(recipe => recipe.vegetarian)).toHaveLength(9);
    expect(dietaryRecipePackOne.filter(recipe => recipe.keto)).toHaveLength(8);
    expect(dietaryRecipePackOne.filter(recipe => recipe.keto && recipe.vegan)).toHaveLength(3);
  });

  it.each<FoodRestriction>(['milk', 'egg', 'fish', 'soy'])(
    'removes recipes carrying the %s allergen',
    restriction => {
      const restricted = dietaryRecipePackOne.filter(recipe => recipeAllergens(recipe).has(restriction));
      expect(restricted.length).toBeGreaterThan(0);

      restricted.forEach(recipe => {
        expect(recipeMatchesSafetyPreferences(recipe, {
          ...DEFAULT_MENU_PREFERENCES,
          allergies: [restriction],
        }), recipe.name).toBe(false);
      });
    },
  );

  it('keeps the tofu meal available with a gluten restriction and blocked with soy', () => {
    const tofu = dietaryRecipePackOne.find(recipe => recipe.id === 'main-98')!;

    expect(recipeMatchesSafetyPreferences(tofu, {
      ...DEFAULT_MENU_PREFERENCES,
      allergies: ['gluten'],
    })).toBe(true);
    expect(recipeMatchesSafetyPreferences(tofu, {
      ...DEFAULT_MENU_PREFERENCES,
      allergies: ['soy'],
    })).toBe(false);
  });
});
