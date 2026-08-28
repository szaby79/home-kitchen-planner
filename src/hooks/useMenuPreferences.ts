import { useEffect, useState } from 'react';
import { DEFAULT_MENU_PREFERENCES, MenuPreferences } from '@/types/recipe';

const PREFERENCES_KEY = 'plan-pan-menu-preferences-v1';

function loadPreferences(): MenuPreferences {
  try {
    const saved = localStorage.getItem(PREFERENCES_KEY);
    if (saved) return { ...DEFAULT_MENU_PREFERENCES, ...JSON.parse(saved) };
  } catch {
    // Invalid old data should never prevent planning.
  }
  return DEFAULT_MENU_PREFERENCES;
}

export function useMenuPreferences() {
  const [preferences, setPreferences] = useState<MenuPreferences>(loadPreferences);
  const [hasSavedPreferences, setHasSavedPreferences] = useState(() => Boolean(localStorage.getItem(PREFERENCES_KEY)));

  useEffect(() => {
    if (!hasSavedPreferences) return;
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  }, [preferences, hasSavedPreferences]);

  const savePreferences = (next: MenuPreferences) => {
    setPreferences(next);
    setHasSavedPreferences(true);
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(next));
  };

  return { preferences, savePreferences, hasSavedPreferences };
}
