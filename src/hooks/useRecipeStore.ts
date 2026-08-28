import { useState, useEffect, useCallback } from 'react';
import { Recipe } from '@/types/recipe';
import { defaultRecipes } from '@/data/recipes';

const STORAGE_KEY = 'plan-pan-recipes';
const CONTENT_VERSION_KEY = 'plan-pan-recipes-content-version';
const CONTENT_VERSION = '6';

const defaultRecipesById = new Map(
  defaultRecipes.map(recipe => [recipe.id, recipe] as const),
);

function refreshDefaultRecipeContent(recipes: Recipe[]): Recipe[] {
  const needsContentMigration = localStorage.getItem(CONTENT_VERSION_KEY) !== CONTENT_VERSION;

  const refreshed = recipes.map(recipe => {
    const defaultRecipe = defaultRecipesById.get(recipe.id);
    if (!defaultRecipe) return recipe;

    return {
      ...recipe,
      imageUrl: defaultRecipe.imageUrl,
      ...(needsContentMigration
        ? {
            ingredients: defaultRecipe.ingredients,
            description: defaultRecipe.description,
          }
        : {}),
    };
  });

  if (needsContentMigration) {
    const existingIds = new Set(refreshed.map(recipe => recipe.id));
    for (const defaultRecipe of defaultRecipes) {
      if (!existingIds.has(defaultRecipe.id)) {
        refreshed.push(defaultRecipe);
      }
    }
    localStorage.setItem(CONTENT_VERSION_KEY, CONTENT_VERSION);
  }

  return refreshed;
}

function loadRecipes(): Recipe[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Recipe[];
      return refreshDefaultRecipeContent(parsed);
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
