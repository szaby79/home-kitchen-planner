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
      const hungarianSteps = recipe.description.match(/^\d+\./gm)?.length ?? 0;
      const englishSteps = ENGLISH_INSTRUCTIONS[recipe.id]?.match(/^\d+\./gm)?.length ?? 0;
      expect(hungarianSteps, recipe.name).toBeGreaterThanOrEqual(5);
      expect(hungarianSteps, recipe.name).toBeLessThanOrEqual(8);
      expect(englishSteps, recipe.name).toBe(hungarianSteps);
      expect(recipe.preparationTime, recipe.name).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.name).toBeGreaterThanOrEqual(0);
      expect(recipe.restingTime, recipe.name).toBeGreaterThanOrEqual(0);
      expect(recipe.totalTime, recipe.name).toBe(recipe.preparationTime! + recipe.cookingTime! + recipe.restingTime!);
      expect(recipe.qualityAuditStatus, recipe.name).toBe('code-reviewed');
    });
  });

  it('does not invent cooking time for no-cook breakfasts and includes required waiting time', () => {
    const noCookIds = breakfastRecipes.filter(recipe => recipe.cookingTime === 0).map(recipe => recipe.id);
    expect(noCookIds).toEqual(['breakfast-3', 'breakfast-4', 'breakfast-5', 'breakfast-9', 'breakfast-17']);

    const byId = Object.fromEntries(breakfastRecipes.map(recipe => [recipe.id, recipe]));
    expect(byId['breakfast-3'].totalTime).toBe(370);
    expect(byId['breakfast-4'].totalTime).toBe(252);
    expect(byId['breakfast-21'].totalTime).toBe(142);
    expect(byId['breakfast-22'].totalTime).toBe(123);
  });

  it('marks yeast pastries as medium difficulty instead of calling every breakfast easy', () => {
    expect(breakfastRecipes.filter(recipe => recipe.difficulty === 'medium').map(recipe => recipe.id))
      .toEqual(['breakfast-21', 'breakfast-22']);
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
