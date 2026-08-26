import { useState, useEffect, useCallback } from 'react';
import { Recipe } from '@/types/recipe';
import { defaultRecipes } from '@/data/recipes';

const STORAGE_KEY = 'plan-pan-recipes';

const defaultRecipesById = new Map(
  defaultRecipes.map(recipe => [recipe.id, recipe] as const),
);

function refreshDefaultRecipeImages(recipes: Recipe[]): Recipe[] {
  return recipes.map(recipe => {
    const defaultRecipe = defaultRecipesById.get(recipe.id);
    return defaultRecipe
      ? { ...recipe, imageUrl: defaultRecipe.imageUrl }
      : recipe;
  });
}

function loadRecipes(): Recipe[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Recipe[];
      return refreshDefaultRecipeImages(parsed);
    }
  } catch {
    return defaultRecipes;
  }
  return defaultRecipes;
}

function saveRecipes(recipes: Recipe[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export function useRecipeStore() {
  const [recipes, setRecipes] = useState<Recipe[]>(loadRecipes);

  useEffect(() => { saveRecipes(recipes); }, [recipes]);

  const addRecipe = useCallback((recipe: Recipe) => {
    setRecipes(prev => [...prev, recipe]);
  }, []);

  const updateRecipe = useCallback((updated: Recipe) => {
    setRecipes(prev => prev.map(r => r.id === updated.id ? updated : r));
  }, []);

  const deleteRecipe = useCallback((id: string) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  }, []);

  const getRecipe = useCallback((id: string) => {
    return recipes.find(r => r.id === id) || null;
  }, [recipes]);

  const getByCategory = useCallback((category: string) => {
    return recipes.filter(r => r.category === category);
  }, [recipes]);

  const resetToDefault = useCallback(() => {
    setRecipes(defaultRecipes);
  }, []);

  return { recipes, addRecipe, updateRecipe, deleteRecipe, getRecipe, getByCategory, resetToDefault };
}
