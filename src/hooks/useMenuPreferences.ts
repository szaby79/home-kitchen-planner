import { createContext, useContext } from 'react';
import type { MenuPreferences } from '@/types/recipe';

export const PREFERENCES_KEY = 'plan-pan-menu-preferences-v1';

export type FamilySettingsSyncStatus = 'idle' | 'loading' | 'saving' | 'saved' | 'error';

export type MenuPreferencesContextValue = {
  preferences: MenuPreferences;
  savePreferences: (next: MenuPreferences) => void;
  hasSavedPreferences: boolean;
  cloudSyncEnabled: boolean;
  syncStatus: FamilySettingsSyncStatus;
};

export const MenuPreferencesContext = createContext<MenuPreferencesContextValue | null>(null);

export function useMenuPreferences() {
  const context = useContext(MenuPreferencesContext);
  if (!context) throw new Error('useMenuPreferences must be used inside MenuPreferencesProvider');
  return context;
}
