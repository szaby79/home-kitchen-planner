import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { beginnerInstructions } from '@/data/beginnerInstructions';
import { defaultRecipes } from '@/data/recipes';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { Recipe } from '@/types/recipe';

describe('beginner recipe instructions', () => {
  it('provides short, numbered instructions for every built-in recipe', () => {
    expect(Object.keys(beginnerInstructions)).toHaveLength(70);
    expect(defaultRecipes).toHaveLength(120);

    for (const recipe of defaultRecipes) {
      expect(recipe.description.match(/^\d+\./gm)?.length, recipe.name).toBeGreaterThanOrEqual(5);
    }
  });

  it('adds 10 soups, 35 mains and 5 desserts without duplicate IDs or names', () => {
    expect(defaultRecipes.filter(recipe => recipe.category === 'soup')).toHaveLength(30);
    expect(defaultRecipes.filter(recipe => recipe.category === 'main')).toHaveLength(70);
    expect(defaultRecipes.filter(recipe => recipe.category === 'dessert')).toHaveLength(20);
    expect(new Set(defaultRecipes.map(recipe => recipe.id)).size).toBe(120);
    expect(new Set(defaultRecipes.map(recipe => recipe.name.toLocaleLowerCase('hu'))).size).toBe(120);
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
    expect(result.current.recipes).toHaveLength(121);
    expect(localStorage.getItem('plan-pan-recipes-content-version')).toBe('3');
  });
});
