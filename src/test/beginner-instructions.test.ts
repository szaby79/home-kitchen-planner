import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { beginnerInstructions } from '@/data/beginnerInstructions';
import { defaultRecipes } from '@/data/recipes';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { sortRecipesByCategory } from '@/lib/recipeSort';
import { Recipe } from '@/types/recipe';

describe('beginner recipe instructions', () => {
  it('groups every category in the intended order', () => {
    const sorted = sortRecipesByCategory(defaultRecipes);

    expect(sorted.slice(0, 35).every(recipe => recipe.category === 'soup')).toBe(true);
    expect(sorted.slice(35, 126).every(recipe => recipe.category === 'main')).toBe(true);
    expect(sorted.slice(126, 156).every(recipe => recipe.category === 'stew')).toBe(true);
    expect(sorted.slice(156, 166).every(recipe => recipe.category === 'side')).toBe(true);
    expect(sorted.slice(166, 174).every(recipe => recipe.category === 'pickle')).toBe(true);
    expect(sorted.slice(174, 184).every(recipe => recipe.category === 'salad')).toBe(true);
    expect(sorted.slice(184).every(recipe => recipe.category === 'dessert')).toBe(true);
    expect([sorted[0].id, sorted[34].id]).toEqual(['soup-1', 'soup-35']);
    expect([sorted[35].id, sorted[125].id]).toEqual(['main-1', 'main-121']);
    expect([sorted[126].id, sorted[155].id]).toEqual(['main-24', 'main-90']);
    expect([sorted[156].id, sorted[165].id]).toEqual(['side-1', 'side-10']);
    expect([sorted[166].id, sorted[173].id]).toEqual(['pickle-1', 'pickle-8']);
    expect([sorted[174].id, sorted[183].id]).toEqual(['salad-1', 'salad-10']);
    expect([sorted[184].id, sorted[203].id]).toEqual(['dessert-1', 'dessert-20']);
  });

  it('provides short, numbered instructions for every built-in recipe', () => {
    expect(Object.keys(beginnerInstructions)).toHaveLength(70);
    expect(defaultRecipes).toHaveLength(204);

    for (const recipe of defaultRecipes) {
      expect(recipe.description.match(/^\d+\./gm)?.length, recipe.name).toBeGreaterThanOrEqual(5);
    }
  });

  it('contains the complete Hungarian catalog without duplicates', () => {
    expect(defaultRecipes.filter(recipe => recipe.category === 'soup')).toHaveLength(35);
    expect(defaultRecipes.filter(recipe => recipe.category === 'main')).toHaveLength(91);
    expect(defaultRecipes.filter(recipe => recipe.category === 'stew')).toHaveLength(30);
    expect(defaultRecipes.filter(recipe => recipe.category === 'side')).toHaveLength(10);
    expect(defaultRecipes.filter(recipe => recipe.category === 'pickle')).toHaveLength(8);
    expect(defaultRecipes.filter(recipe => recipe.category === 'salad')).toHaveLength(10);
    expect(defaultRecipes.filter(recipe => recipe.category === 'dessert')).toHaveLength(20);
    expect(new Set(defaultRecipes.map(recipe => recipe.id)).size).toBe(204);
    expect(new Set(defaultRecipes.map(recipe => recipe.name.toLocaleLowerCase('hu'))).size).toBe(204);
  });

  it('contains exactly 30 főzelék meals and every one names its topping', () => {
    const stews = defaultRecipes.filter(recipe => recipe.category === 'stew');
    expect(stews).toHaveLength(30);
    expect(stews.every(recipe => recipe.name.toLocaleLowerCase('hu').includes('főzelék'))).toBe(true);
    stews.forEach(recipe => expect(recipe.name.split(' ').length, recipe.name).toBeGreaterThan(1));
  });

  it('includes homemade csipetke ingredients and the paprika warning', () => {
    const goulash = defaultRecipes.find(recipe => recipe.id === 'soup-2');

    expect(goulash?.ingredients.some(item => item.name === 'finomliszt')).toBe(true);
    expect(goulash?.ingredients.some(item => item.name === 'tojás')).toBe(true);
    expect(goulash?.ingredients.some(item => item.name === 'csipetke')).toBe(false);
    expect(goulash?.description).toContain('keserű');
    expect(goulash?.description).toContain('Csipetkéhez');
  });

  it('migrates cached built-in content without changing a user recipe', () => {
    const stew = defaultRecipes.find(recipe => recipe.category === 'stew')!;
    const cachedBuiltIn = { ...stew, category: 'main' as const, description: 'Régi rövid leírás', ingredients: [] };
    const userRecipe: Recipe = {
      id: 'user-recipe',
      name: 'Saját recept',
      category: 'main',
      mealType: 'both',
      ingredients: [],
      description: 'Ezt meg kell őrizni.',
      defaultServings: 2,
      note: '',
      imageUrl: '',
    };

    localStorage.setItem('plan-pan-recipes', JSON.stringify([cachedBuiltIn, userRecipe]));
    localStorage.removeItem('plan-pan-recipes-content-version');

    const { result } = renderHook(() => useRecipeStore());

    expect(result.current.recipes[0].description).toBe(stew.description);
    expect(result.current.recipes[0].ingredients).toEqual(stew.ingredients);
    expect(result.current.recipes[0].category).toBe('stew');
    expect(result.current.recipes[1]).toEqual(userRecipe);
    expect(result.current.recipes).toHaveLength(205);
    expect(localStorage.getItem('plan-pan-recipes-content-version')).toBe('12');
  });
});
