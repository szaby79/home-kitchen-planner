import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { MenuPreferencesContext, PREFERENCES_KEY } from '@/hooks/useMenuPreferences';
import type { MenuPreferencesContextValue } from '@/hooks/useMenuPreferences';
import { fetchFamilySettings, upsertFamilySettings } from '@/lib/familySettings';
import { normalizePreferences } from '@/lib/menuPreferencesValidation';
import { DEFAULT_MENU_PREFERENCES } from '@/types/recipe';
import type { MenuPreferences } from '@/types/recipe';

const PENDING_KEY_PREFIX = 'plan-pan-family-settings-pending-v1:';
const SAVE_DEBOUNCE_MS = 650;

type PendingSettings = {
  settings: MenuPreferences;
  savedAt: string;
  baseUpdatedAt?: string | null;
};

function loadGuestPreferences(): { preferences: MenuPreferences; saved: boolean } {
  try {
    const saved = localStorage.getItem(PREFERENCES_KEY);
    const parsed = saved ? normalizePreferences(JSON.parse(saved)) : null;
    if (parsed) return { preferences: parsed, saved: true };
  } catch {
    // Invalid old data should never prevent planning.
  }
  return { preferences: DEFAULT_MENU_PREFERENCES, saved: false };
}

function pendingKey(userId: string) {
  return `${PENDING_KEY_PREFIX}${userId}`;
}

function loadPendingSettings(userId: string): PendingSettings | null {
  try {
    const saved = localStorage.getItem(pendingKey(userId));
    if (!saved) return null;
    const parsed = JSON.parse(saved) as Partial<PendingSettings>;
    const settings = normalizePreferences(parsed.settings);
    if (!settings || typeof parsed.savedAt !== 'string') return null;
    const pending: PendingSettings = { settings, savedAt: parsed.savedAt };
    if (Object.prototype.hasOwnProperty.call(parsed, 'baseUpdatedAt')) {
      pending.baseUpdatedAt = typeof parsed.baseUpdatedAt === 'string' ? parsed.baseUpdatedAt : null;
    }
    return pending;
  } catch {
    return null;
  }
}

function storePendingSettings(userId: string, pending: PendingSettings) {
  localStorage.setItem(pendingKey(userId), JSON.stringify(pending));
}

export function MenuPreferencesProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [initialGuest] = useState(loadGuestPreferences);
  const [preferences, setPreferences] = useState(initialGuest.preferences);
  const [hasSavedPreferences, setHasSavedPreferences] = useState(initialGuest.saved);
  const [syncStatus, setSyncStatus] = useState<MenuPreferencesContextValue['syncStatus']>('idle');
  const [pendingSave, setPendingSave] = useState<PendingSettings | null>(null);
  const [loadRetry, setLoadRetry] = useState(0);
  const [saveRetry, setSaveRetry] = useState(0);
  const currentUserId = useRef<string | null>(null);
  const cloudUpdatedAt = useRef<string | null | undefined>(undefined);
  const loadSequence = useRef(0);
  const saveSequence = useRef(0);

  useEffect(() => {
    if (authLoading) return;

    const sequence = ++loadSequence.current;
    saveSequence.current += 1;
    const userId = user?.id ?? null;
    currentUserId.current = userId;
    cloudUpdatedAt.current = undefined;
    setPendingSave(null);

    if (!userId) {
      const guest = loadGuestPreferences();
      setPreferences(guest.preferences);
      setHasSavedPreferences(guest.saved);
      setSyncStatus('idle');
      return;
    }

    setPreferences(DEFAULT_MENU_PREFERENCES);
    setHasSavedPreferences(false);
    setSyncStatus('loading');

    void fetchFamilySettings(userId).then(record => {
      if (sequence !== loadSequence.current || currentUserId.current !== userId) return;

      const pending = loadPendingSettings(userId);
      if (record) {
        cloudUpdatedAt.current = record.updatedAt;
        setPreferences(record.settings);
        setHasSavedPreferences(true);

        if (pending && (pending.baseUpdatedAt === undefined || pending.baseUpdatedAt === record.updatedAt)) {
          const rebased = { ...pending, baseUpdatedAt: record.updatedAt };
          storePendingSettings(userId, rebased);
          setPreferences(rebased.settings);
          setPendingSave(rebased);
          setSyncStatus('saving');
        } else {
          localStorage.removeItem(pendingKey(userId));
          setSyncStatus('saved');
        }
        return;
      }

      cloudUpdatedAt.current = null;
      const guest = loadGuestPreferences();
      const initial = pending ?? (guest.saved ? {
        settings: guest.preferences,
        savedAt: new Date().toISOString(),
        baseUpdatedAt: null,
      } : null);

      if (!initial) {
        setPreferences(DEFAULT_MENU_PREFERENCES);
        setHasSavedPreferences(false);
        setSyncStatus('idle');
        return;
      }

      const migration = { ...initial, baseUpdatedAt: null };
      storePendingSettings(userId, migration);
      setPreferences(migration.settings);
      setHasSavedPreferences(true);
      setPendingSave(migration);
      setSyncStatus('saving');
    }).catch(() => {
      if (sequence !== loadSequence.current || currentUserId.current !== userId) return;
      const pending = loadPendingSettings(userId);
      const guest = loadGuestPreferences();
      const fallback = pending?.settings ?? (guest.saved ? guest.preferences : DEFAULT_MENU_PREFERENCES);
      setPreferences(fallback);
      setHasSavedPreferences(Boolean(pending || guest.saved));
      setSyncStatus('error');
    });
  }, [authLoading, loadRetry, user?.id]);

  useEffect(() => {
    const userId = user?.id;
    if (!userId || !pendingSave || cloudUpdatedAt.current === undefined) return;

    const sequence = ++saveSequence.current;
    const timer = window.setTimeout(() => {
      void upsertFamilySettings(userId, pendingSave.settings).then(record => {
        if (sequence !== saveSequence.current || currentUserId.current !== userId) return;
        cloudUpdatedAt.current = record.updatedAt;
        localStorage.removeItem(pendingKey(userId));
        setPendingSave(null);
        setSyncStatus('saved');
      }).catch(() => {
        if (sequence !== saveSequence.current || currentUserId.current !== userId) return;
        setSyncStatus('error');
      });
    }, SAVE_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [pendingSave, saveRetry, user?.id]);

  const retrySync = useCallback(() => {
    if (!user || syncStatus !== 'error') return;
    if (pendingSave) {
      setSyncStatus('saving');
      setSaveRetry(value => value + 1);
    } else {
      setSyncStatus('loading');
      setLoadRetry(value => value + 1);
    }
  }, [pendingSave, syncStatus, user]);

  useEffect(() => {
    const retryWhenOnline = () => retrySync();
    window.addEventListener('online', retryWhenOnline);
    return () => window.removeEventListener('online', retryWhenOnline);
  }, [retrySync]);

  const savePreferences = (next: MenuPreferences) => {
    const normalized = normalizePreferences(next) ?? DEFAULT_MENU_PREFERENCES;
    setPreferences(normalized);
    setHasSavedPreferences(true);

    if (!user) {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(normalized));
      setSyncStatus('idle');
      return;
    }

    saveSequence.current += 1;
    const pending: PendingSettings = {
      settings: normalized,
      savedAt: new Date().toISOString(),
    };
    if (cloudUpdatedAt.current !== undefined) pending.baseUpdatedAt = cloudUpdatedAt.current;
    storePendingSettings(user.id, pending);
    setPendingSave(pending);
    setSyncStatus('saving');
  };

  return (
    <MenuPreferencesContext.Provider value={{
      preferences,
      savePreferences,
      hasSavedPreferences,
      cloudSyncEnabled: Boolean(user),
      syncStatus,
    }}>
      {children}
    </MenuPreferencesContext.Provider>
  );
}
