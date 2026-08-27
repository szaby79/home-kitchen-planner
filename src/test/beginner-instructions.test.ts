import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { beginnerInstructions } from '@/data/beginnerInstructions';
import { defaultRecipes } from '@/data/recipes';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { sortRecipesByCategory } from '@/lib/recipeSort';
import { Recipe } from '@/types/recipe';

describe('beginner recipe instructions', () => {
  it('groups soups, mains, salads and desserts in this order', () => {
    const sorted = sortRecipesByCategory(defaultRecipes);

    expect(sorted.slice(0, 30).every(recipe => recipe.category === 'soup')).toBe(true);
    expect(sorted.slice(30, 100).every(recipe => recipe.category === 'main')).toBe(true);
    expect(sorted.slice(100, 110).every(recipe => recipe.category === 'salad')).toBe(true);
    expect(sorted.slice(110).every(recipe => recipe.category === 'dessert')).toBe(true);
    expect([sorted[0].id, sorted[29].id]).toEqual(['soup-1', 'soup-30']);
    expect([sorted[30].id, sorted[99].id]).toEqual(['main-1', 'main-70']);
    expect([sorted[100].id, sorted[109].id]).toEqual(['salad-1', 'salad-10']);
    expect([sorted[110].id, sorted[129].id]).toEqual(['dessert-1', 'dessert-20']);
  });

  it('provides short, numbered instructions for every built-in recipe', () => {
    expect(Object.keys(beginnerInstructions)).toHaveLength(70);
    expect(defaultRecipes).toHaveLength(130);

    for (const recipe of defaultRecipes) {
      expect(recipe.description.match(/^\d+\./gm)?.length, recipe.name).toBeGreaterThanOrEqual(5);
    }
  });

  it('contains 30 soups, 70 mains, 10 salads and 20 desserts without duplicates', () => {
    expect(defaultRecipes.filter(recipe => recipe.category === 'soup')).toHaveLength(30);
    expect(defaultRecipes.filter(recipe => recipe.category === 'main')).toHaveLength(70);
    expect(defaultRecipes.filter(recipe => recipe.category === 'salad')).toHaveLength(10);
    expect(defaultRecipes.filter(recipe => recipe.category === 'dessert')).toHaveLength(20);
    expect(new Set(defaultRecipes.map(recipe => recipe.id)).size).toBe(130);
    expect(new Set(defaultRecipes.map(recipe => recipe.name.toLocaleLowerCase('hu'))).size).toBe(130);
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
    const cachedBuiltIn = { ...defaultRecipes[0], description: 'Régi rövid leírás', ingredients: [] };
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

    expect(result.current.recipes[0].description).toBe(defaultRecipes[0].description);
    expect(result.current.recipes[0].ingredients).toEqual(defaultRecipes[0].ingredients);
    expect(result.current.recipes[1]).toEqual(userRecipe);
    expect(result.current.recipes).toHaveLength(131);
    expect(localStorage.getItem('plan-pan-recipes-content-version')).toBe('4');
  });
});
