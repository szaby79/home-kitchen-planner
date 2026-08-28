import { describe, expect, it } from 'vitest';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { hasIngredientTranslation, localizeRecipe } from '@/i18n/recipeLocalization';

describe('English recipe catalogue', () => {
  it('covers all 148 built-in recipes with five numbered steps', () => {
    expect(defaultRecipes).toHaveLength(148);
    expect(Object.keys(ENGLISH_INSTRUCTIONS)).toHaveLength(148);
    for (const recipe of defaultRecipes) {
      const directions = ENGLISH_INSTRUCTIONS[recipe.id];
      expect(directions, recipe.id).toBeTruthy();
      for (const step of [1, 2, 3, 4, 5]) expect(directions, `${recipe.id} step ${step}`).toContain(`${step}. `);
    }
  });

  it('translates every built-in ingredient', () => {
    const ingredients = new Set(defaultRecipes.flatMap(recipe => recipe.ingredients.map(item => item.name)));
    expect([...ingredients].filter(name => !hasIngredientTranslation(name))).toEqual([]);
  });

  it('keeps Hungarian food names, quantities, IDs, and metric units unchanged', () => {
    for (const recipe of defaultRecipes) {
      const english = localizeRecipe(recipe, true);
      expect(english.id).toBe(recipe.id);
      expect(english.name).toBe(recipe.name);
      expect(english.ingredients.map(item => item.quantity)).toEqual(recipe.ingredients.map(item => item.quantity));
      recipe.ingredients.forEach((ingredient, index) => {
        if (['g', 'kg', 'ml', 'l', '°C'].includes(ingredient.unit)) {
          expect(english.ingredients[index].unit).toBe(ingredient.unit);
        }
      });
    }
  });

  it('translates every built-in recipe note when one exists', () => {
    for (const recipe of defaultRecipes.filter(item => item.note)) {
      expect(localizeRecipe(recipe, true).note, recipe.id).not.toBe(recipe.note);
    }
  });
});
