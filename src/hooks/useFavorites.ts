import { useCallback, useEffect, useState } from 'react';

const FAVORITES_KEY = 'plan-pan-favorites';

function loadFavorites(): string[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(loadFavorites);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = useCallback((recipeId: string) => {
    setFavoriteIds(current =>
      current.includes(recipeId)
        ? current.filter(id => id !== recipeId)
        : [...current, recipeId],
    );
  }, []);

  const isFavorite = useCallback(
    (recipeId: string) => favoriteIds.includes(recipeId),
    [favoriteIds],
  );

  return { favoriteIds, toggleFavorite, isFavorite };
}
