import { describe, expect, it } from 'vitest';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { ENGLISH_RECIPE_NAMES, hasEnglishRecipeName } from '@/i18n/englishRecipeNames';
import { hasIngredientTranslation, localizeRecipe } from '@/i18n/recipeLocalization';

describe('English recipe catalogue', () => {
  it('covers all 251 built-in recipes with five numbered steps', () => {
    expect(defaultRecipes).toHaveLength(251);
    expect(Object.keys(ENGLISH_INSTRUCTIONS)).toHaveLength(251);
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

  it('gives every built-in recipe a unique English name while preserving IDs and quantities', () => {
    expect(Object.keys(ENGLISH_RECIPE_NAMES)).toHaveLength(defaultRecipes.length);
    expect(new Set(Object.values(ENGLISH_RECIPE_NAMES)).size).toBe(defaultRecipes.length);
    for (const recipe of defaultRecipes) {
      const english = localizeRecipe(recipe, true);
      expect(english.id).toBe(recipe.id);
      expect(hasEnglishRecipeName(recipe.id), recipe.id).toBe(true);
      expect(english.name, recipe.id).toBe(ENGLISH_RECIPE_NAMES[recipe.id]);
      expect(english.name, recipe.id).not.toBe(recipe.name);
      expect(english.ingredients.map(item => item.quantity)).toEqual(recipe.ingredients.map(item => item.quantity));
      recipe.ingredients.forEach((ingredient, index) => {
        if (['g', 'kg', 'ml', 'l', '°C'].includes(ingredient.unit)) {
          expect(english.ingredients[index].unit).toBe(ingredient.unit);
        }
      });
    }
  });

  it('keeps every Hungarian recipe name unchanged in Hungarian mode', () => {
    for (const recipe of defaultRecipes) expect(localizeRecipe(recipe, false)).toBe(recipe);
  });

  it('translates every built-in recipe note when one exists', () => {
    for (const recipe of defaultRecipes.filter(item => item.note)) {
      expect(localizeRecipe(recipe, true).note, recipe.id).not.toBe(recipe.note);
    }
  });
});
