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

    expect(sorted.slice(0, 37).every(recipe => recipe.category === 'soup')).toBe(true);
    expect(sorted.slice(37, 138).every(recipe => recipe.category === 'main')).toBe(true);
    expect(sorted.slice(138, 168).every(recipe => recipe.category === 'stew')).toBe(true);
    expect(sorted.slice(168, 178).every(recipe => recipe.category === 'side')).toBe(true);
    expect(sorted.slice(178, 186).every(recipe => recipe.category === 'pickle')).toBe(true);
    expect(sorted.slice(186, 196).every(recipe => recipe.category === 'salad')).toBe(true);
    expect(sorted.slice(196).every(recipe => recipe.category === 'dessert')).toBe(true);
    expect([sorted[0].id, sorted[36].id]).toEqual(['soup-1', 'soup-37']);
    expect([sorted[37].id, sorted[137].id]).toEqual(['main-1', 'main-131']);
    expect([sorted[138].id, sorted[167].id]).toEqual(['main-24', 'main-90']);
    expect([sorted[168].id, sorted[177].id]).toEqual(['side-1', 'side-10']);
    expect([sorted[178].id, sorted[185].id]).toEqual(['pickle-1', 'pickle-8']);
    expect([sorted[186].id, sorted[195].id]).toEqual(['salad-1', 'salad-10']);
    expect([sorted[196].id, sorted[215].id]).toEqual(['dessert-1', 'dessert-20']);
  });

  it('provides short, numbered instructions for every built-in recipe', () => {
    expect(Object.keys(beginnerInstructions)).toHaveLength(70);
    expect(defaultRecipes).toHaveLength(216);

    for (const recipe of defaultRecipes) {
      expect(recipe.description.match(/^\d+\./gm)?.length, recipe.name).toBeGreaterThanOrEqual(5);
    }
  });

  it('contains the complete Hungarian catalog without duplicates', () => {
    expect(defaultRecipes.filter(recipe => recipe.category === 'soup')).toHaveLength(37);
    expect(defaultRecipes.filter(recipe => recipe.category === 'main')).toHaveLength(101);
    expect(defaultRecipes.filter(recipe => recipe.category === 'stew')).toHaveLength(30);
    expect(defaultRecipes.filter(recipe => recipe.category === 'side')).toHaveLength(10);
    expect(defaultRecipes.filter(recipe => recipe.category === 'pickle')).toHaveLength(8);
    expect(defaultRecipes.filter(recipe => recipe.category === 'salad')).toHaveLength(10);
    expect(defaultRecipes.filter(recipe => recipe.category === 'dessert')).toHaveLength(20);
    expect(new Set(defaultRecipes.map(recipe => recipe.id)).size).toBe(216);
    expect(new Set(defaultRecipes.map(recipe => recipe.name.toLocaleLowerCase('hu'))).size).toBe(216);
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
    expect(result.current.recipes).toHaveLength(217);
    expect(localStorage.getItem('plan-pan-recipes-content-version')).toBe('13');
  });
});
