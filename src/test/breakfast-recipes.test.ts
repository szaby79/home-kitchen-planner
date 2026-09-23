import { describe, expect, it } from 'vitest';
import { breakfastRecipes } from '@/data/breakfastRecipes';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { recipeAllergens, recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { DEFAULT_MENU_PREFERENCES, FoodRestriction } from '@/types/recipe';

const normalizeName = (name: string) => name
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('hu')
  .replace(/[^a-z0-9]/g, '');

describe('breakfast recipe foundation', () => {
  it('adds 23 complete breakfasts without duplicate names or IDs', () => {
    expect(breakfastRecipes).toHaveLength(23);
    expect(new Set(defaultRecipes.map(recipe => recipe.id)).size).toBe(defaultRecipes.length);
    expect(new Set(defaultRecipes.map(recipe => normalizeName(recipe.name))).size).toBe(defaultRecipes.length);

    breakfastRecipes.forEach(recipe => {
      expect(recipe.category).toBe('breakfast');
      expect(recipe.mealType).toBe('breakfast');
      expect(recipe.ingredients.length, recipe.name).toBeGreaterThanOrEqual(8);
      expect(recipe.description.match(/^\d+\./gm), recipe.name).toHaveLength(5);
      expect(ENGLISH_INSTRUCTIONS[recipe.id]?.match(/^\d+\./gm), recipe.name).toHaveLength(5);
      expect(recipe.preparationTime, recipe.name).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.name).toBeGreaterThan(0);
      expect(recipe.totalTime, recipe.name).toBe(recipe.preparationTime! + recipe.cookingTime!);
    });
  });

  it('includes vegan and keto choices without hiding the everyday breakfasts', () => {
    expect(breakfastRecipes.filter(recipe => recipe.vegan)).toHaveLength(2);
    expect(breakfastRecipes.filter(recipe => recipe.keto)).toHaveLength(9);
    expect(breakfastRecipes.filter(recipe => recipe.childFriendly)).toHaveLength(23);
  });

  it.each<FoodRestriction>(['gluten', 'milk', 'egg', 'nuts', 'soy'])(
    'blocks breakfast recipes carrying the %s allergen',
    restriction => {
      const affected = breakfastRecipes.filter(recipe => recipeAllergens(recipe).has(restriction));
      expect(affected.length).toBeGreaterThan(0);
      affected.forEach(recipe => expect(recipeMatchesSafetyPreferences(recipe, {
        ...DEFAULT_MENU_PREFERENCES,
        allergies: [restriction],
      }), recipe.name).toBe(false));
    },
  );
});
