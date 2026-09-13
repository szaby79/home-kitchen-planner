import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WeekPlan, WeekDay, WEEKDAYS, createEmptyWeekPlan, ShoppingItem, Recipe, GenerationSelection, MenuPreferences, MenuProfile, WeeklyAutopilotSettings } from '@/types/recipe';
import { generateSelectedPlan } from '@/lib/planGenerator';
import { recipeNeedsSeparateSide } from '@/lib/recipeScheduling';
import { fetchWeeklyPlans, upsertWeeklyPlan } from '@/lib/weeklyPlans';
import { getWeekStart, isDateKey } from '@/lib/weekDates';
import { hasPlanMeals, normalizeShoppingItems, normalizeWeekPlan, StoredWeeklyPlan, weeklyPlanFingerprint, WeeklyPlanState } from '@/lib/weeklyPlanValidation';

const PLAN_KEY = 'plan-pan-weekplan';
const EXTRA_ITEMS_KEY = 'plan-pan-extra-items';
const CHECKED_ITEMS_KEY = 'plan-pan-checked-items';
const SHOPPING_NOTES_KEY = 'plan-pan-shopping-notes';
const WEEK_START_KEY = 'plan-pan-week-start';
const PENDING_PREFIX = 'plan-pan-weekly-plan-pending-v1:';
const SAVE_DEBOUNCE_MS = 700;

export type WeeklyPlanSyncStatus = 'idle' | 'loading' | 'pending' | 'saving' | 'saved' | 'error';

type PlannerSyncOptions = { userId?: string | null; authLoading?: boolean };
type PendingWeeklyPlan = { weekStart: string; state: WeeklyPlanState; savedAt: string; baseUpdatedAt?: string | null };

function loadPlan(): WeekPlan {
  try {
    const stored = localStorage.getItem(PLAN_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<WeekPlan>;
      const migrated = createEmptyWeekPlan();
      WEEKDAYS.forEach(day => { migrated[day] = { ...migrated[day], ...(parsed[day] || {}) }; });
      return normalizeWeekPlan(migrated) ?? createEmptyWeekPlan();
    }
  } catch {
    // Invalid legacy data falls back to an empty plan.
  }
  return createEmptyWeekPlan();
}

function loadExtraItems(): ShoppingItem[] {
  try {
    const stored = localStorage.getItem(EXTRA_ITEMS_KEY);
    return stored ? normalizeShoppingItems(JSON.parse(stored)) ?? [] : [];
  } catch {
    return [];
  }
}

function loadCheckedItemKeys(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(CHECKED_ITEMS_KEY) ?? '[]');
    return Array.isArray(parsed) && parsed.every(item => typeof item === 'string') ? [...new Set(parsed)] : [];
  } catch {
    return [];
  }
}

function loadGuestState(): WeeklyPlanState & { weekStart: string } {
  const storedWeekStart = localStorage.getItem(WEEK_START_KEY);
  return {
    weekPlan: loadPlan(),
    extraItems: loadExtraItems(),
    checkedItemKeys: loadCheckedItemKeys(),
    shoppingNotes: localStorage.getItem(SHOPPING_NOTES_KEY) || '',
    weekStart: isDateKey(storedWeekStart) ? storedWeekStart : getWeekStart(),
  };
}

function pendingKey(userId: string, weekStart: string) {
  return `${PENDING_PREFIX}${userId}:${weekStart}`;
}

function loadPending(userId: string, weekStart: string): PendingWeeklyPlan | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(pendingKey(userId, weekStart)) ?? 'null') as Partial<PendingWeeklyPlan> | null;
    if (!parsed || parsed.weekStart !== weekStart || typeof parsed.savedAt !== 'string' || !parsed.state) return null;
    const weekPlan = normalizeWeekPlan(parsed.state.weekPlan);
    const extraItems = normalizeShoppingItems(parsed.state.extraItems);
    const checkedItemKeys = Array.isArray(parsed.state.checkedItemKeys) && parsed.state.checkedItemKeys.every(item => typeof item === 'string') ? [...new Set(parsed.state.checkedItemKeys)] : null;
    if (!weekPlan || !extraItems || !checkedItemKeys || typeof parsed.state.shoppingNotes !== 'string') return null;
    const pending: PendingWeeklyPlan = { weekStart, savedAt: parsed.savedAt, state: { weekPlan, extraItems, checkedItemKeys, shoppingNotes: parsed.state.shoppingNotes } };
    if (Object.prototype.hasOwnProperty.call(parsed, 'baseUpdatedAt')) pending.baseUpdatedAt = typeof parsed.baseUpdatedAt === 'string' ? parsed.baseUpdatedAt : null;
    return pending;
  } catch {
    return null;
  }
}

function toState(record: StoredWeeklyPlan): WeeklyPlanState {
  return { weekPlan: record.weekPlan, extraItems: record.extraItems, checkedItemKeys: record.checkedItemKeys, shoppingNotes: record.shoppingNotes };
}

export function shoppingItemKey(item: ShoppingItem) {
  return `${item.name}-${item.unit}`;
}

export function usePlannerStore(recipes: Recipe[], options: PlannerSyncOptions = {}) {
  const userId = options.userId ?? null;
  const authLoading = options.authLoading ?? false;
  const currentWeekStart = getWeekStart();
  const [initialGuest] = useState(loadGuestState);
  const [weekPlan, setWeekPlan] = useState<WeekPlan>(initialGuest.weekPlan);
  const [extraItems, setExtraItems] = useState<ShoppingItem[]>(initialGuest.extraItems);
  const [removedItems, setRemovedItems] = useState<Set<string>>(() => new Set(initialGuest.checkedItemKeys));
  const [shoppingNotes, setShoppingNotesState] = useState(initialGuest.shoppingNotes);
  const [displayedWeekStart, setDisplayedWeekStart] = useState(initialGuest.weekStart);
  const [savedWeeks, setSavedWeeks] = useState<StoredWeeklyPlan[]>([]);
  const [plannerReady, setPlannerReady] = useState(!authLoading && !userId);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<WeeklyPlanSyncStatus>(authLoading ? 'loading' : 'idle');
  const [dirtyRevision, setDirtyRevision] = useState(0);
  const [cloudReloadRevision, setCloudReloadRevision] = useState(0);
  const loadSequence = useRef(0);
  const saveSequence = useRef(0);
  const currentUserId = useRef<string | null>(userId);
  const lastSavedFingerprint = useRef<string | null>(null);
  const cloudUpdatedAt = useRef<string | null>(null);
  const cloudLoadFailed = useRef(false);

  const applyState = useCallback((state: WeeklyPlanState) => {
    setWeekPlan(state.weekPlan);
    setExtraItems(state.extraItems);
    setRemovedItems(new Set(state.checkedItemKeys));
    setShoppingNotesState(state.shoppingNotes);
  }, []);

  useEffect(() => {
    if (authLoading) {
      setPlannerReady(false);
      setCloudSyncStatus('loading');
      return;
    }
    const sequence = ++loadSequence.current;
    saveSequence.current += 1;
    currentUserId.current = userId;
    setDirtyRevision(0);

    if (!userId) {
      cloudLoadFailed.current = false;
      const guest = loadGuestState();
      applyState(guest);
      setDisplayedWeekStart(guest.weekStart);
      setSavedWeeks([]);
      lastSavedFingerprint.current = null;
      cloudUpdatedAt.current = null;
      setCloudSyncStatus('idle');
      setPlannerReady(true);
      return;
    }

    setPlannerReady(false);
    setCloudSyncStatus('loading');
    applyState({ weekPlan: createEmptyWeekPlan(), extraItems: [], checkedItemKeys: [], shoppingNotes: '' });
    setDisplayedWeekStart(currentWeekStart);

    void fetchWeeklyPlans(userId).then(records => {
      if (sequence !== loadSequence.current || currentUserId.current !== userId) return;
      cloudLoadFailed.current = false;
      setSavedWeeks(records);
      const currentRecord = records.find(record => record.weekStart === currentWeekStart);
      const pending = loadPending(userId, currentWeekStart);
      if (currentRecord) {
        const cloudState = toState(currentRecord);
        lastSavedFingerprint.current = weeklyPlanFingerprint(cloudState);
        cloudUpdatedAt.current = currentRecord.updatedAt;
        if (pending && (pending.baseUpdatedAt === undefined || pending.baseUpdatedAt === currentRecord.updatedAt)) {
          applyState(pending.state);
          setDirtyRevision(1);
          setCloudSyncStatus('pending');
        } else {
          localStorage.removeItem(pendingKey(userId, currentWeekStart));
          applyState(cloudState);
          setCloudSyncStatus('saved');
        }
        setPlannerReady(true);
        return;
      }
      lastSavedFingerprint.current = null;
      cloudUpdatedAt.current = null;
      const guest = loadGuestState();
      const initial = pending?.state ?? (guest.weekStart === currentWeekStart && hasPlanMeals(guest.weekPlan) ? guest : null);
      if (initial) {
        applyState(initial);
        setDirtyRevision(1);
        setCloudSyncStatus('pending');
      } else {
        applyState({ weekPlan: createEmptyWeekPlan(), extraItems: [], checkedItemKeys: [], shoppingNotes: '' });
        setCloudSyncStatus('idle');
      }
      setPlannerReady(true);
    }).catch(() => {
      if (sequence !== loadSequence.current || currentUserId.current !== userId) return;
      cloudLoadFailed.current = true;
      const pending = loadPending(userId, currentWeekStart);
      const guest = loadGuestState();
      const fallback = pending?.state ?? (guest.weekStart === currentWeekStart ? guest : { weekPlan: createEmptyWeekPlan(), extraItems: [], checkedItemKeys: [], shoppingNotes: '' });
      applyState(fallback);
      setDirtyRevision(pending ? 1 : 0);
      setCloudSyncStatus('error');
      setPlannerReady(true);
    });
  }, [applyState, authLoading, cloudReloadRevision, currentWeekStart, userId]);

  useEffect(() => {
    if (authLoading || userId) return;
    localStorage.setItem(PLAN_KEY, JSON.stringify(weekPlan));
    localStorage.setItem(EXTRA_ITEMS_KEY, JSON.stringify(extraItems));
    localStorage.setItem(CHECKED_ITEMS_KEY, JSON.stringify([...removedItems]));
    localStorage.setItem(SHOPPING_NOTES_KEY, shoppingNotes);
    localStorage.setItem(WEEK_START_KEY, displayedWeekStart);
  }, [authLoading, displayedWeekStart, extraItems, removedItems, shoppingNotes, userId, weekPlan]);

  useEffect(() => {
    setWeekPlan(current => {
      let changed = false;
      const next = { ...current };
      WEEKDAYS.forEach(day => {
        const dinner = recipes.find(recipe => recipe.id === current[day].dinner);
        const lunch = recipes.find(recipe => recipe.id === current[day].lunch);
        const legacySoup = lunch?.category === 'soup' ? current[day].lunch : null;
        const invalidDinner = Boolean(dinner && dinner.category !== 'main' && dinner.category !== 'salad');
        const invalidLunch = Boolean(lunch && lunch.category !== 'main' && lunch.category !== 'stew' && lunch.category !== 'salad');
        const invalidSide = Boolean(current[day].side && lunch && !recipeNeedsSeparateSide(lunch));
        if (invalidDinner || invalidLunch || invalidSide || legacySoup) {
          changed = true;
          next[day] = { ...current[day], dinner: invalidDinner ? null : current[day].dinner, lunch: invalidLunch || legacySoup ? null : current[day].lunch, soup: legacySoup ?? current[day].soup, side: invalidSide ? null : current[day].side };
        }
      });
      return changed ? next : current;
    });
  }, [recipes]);

  const updateDay = useCallback((day: WeekDay, updates: Partial<typeof weekPlan[typeof day]>) => {
    setWeekPlan(previous => ({ ...previous, [day]: { ...previous[day], ...updates } }));
    setDirtyRevision(revision => revision + 1);
  }, []);
  const clearPlan = useCallback(() => {
    setWeekPlan(createEmptyWeekPlan());
    setDirtyRevision(revision => revision + 1);
  }, []);
  const generateRandomPlan = useCallback((selection: GenerationSelection, profile: MenuProfile, preferences: MenuPreferences, favoriteIds: string[], autopilot?: WeeklyAutopilotSettings) => {
    if (!plannerReady || !WEEKDAYS.some(day => selection[day].lunch || selection[day].dinner)) return false;
    try {
      const next = generateSelectedPlan(recipes, weekPlan, selection, profile, preferences, favoriteIds, autopilot);
      setWeekPlan(next);
      const manualKeys = new Set(extraItems.map(shoppingItemKey));
      setRemovedItems(current => new Set([...current].filter(key => manualKeys.has(key))));
      setDirtyRevision(revision => revision + 1);
      return true;
    } catch {
      return false;
    }
  }, [extraItems, plannerReady, recipes, weekPlan]);

  const shoppingList = useMemo(() => buildShoppingList(weekPlan, recipes), [weekPlan, recipes]);
  const dailyShoppingList = useMemo(() => buildDailyShoppingList(weekPlan, recipes), [weekPlan, recipes]);

  useEffect(() => {
    if (!userId || !plannerReady || dirtyRevision === 0) return;
    const state: WeeklyPlanState = { weekPlan, extraItems, checkedItemKeys: [...removedItems], shoppingNotes };
    const fingerprint = weeklyPlanFingerprint(state);
    if (fingerprint === lastSavedFingerprint.current) {
      setDirtyRevision(0);
      setCloudSyncStatus('saved');
      return;
    }
    const pending: PendingWeeklyPlan = { weekStart: displayedWeekStart, state, savedAt: new Date().toISOString() };
    if (!cloudLoadFailed.current) pending.baseUpdatedAt = cloudUpdatedAt.current;
    localStorage.setItem(pendingKey(userId, displayedWeekStart), JSON.stringify(pending));
    setCloudSyncStatus('pending');
    if (cloudLoadFailed.current) {
      setCloudSyncStatus('error');
      return;
    }
    const sequence = ++saveSequence.current;
    const timer = window.setTimeout(() => {
      setCloudSyncStatus('saving');
      void upsertWeeklyPlan(userId, displayedWeekStart, {
        ...state,
        shoppingItems: [...shoppingList, ...extraItems].map(item => ({ ...item, checked: removedItems.has(shoppingItemKey(item)) })),
      }).then(record => {
        if (sequence !== saveSequence.current || currentUserId.current !== userId) return;
        const savedState = toState(record);
        lastSavedFingerprint.current = weeklyPlanFingerprint(savedState);
        cloudUpdatedAt.current = record.updatedAt;
        localStorage.removeItem(pendingKey(userId, displayedWeekStart));
        setSavedWeeks(records => [record, ...records.filter(item => item.weekStart !== record.weekStart)].sort((a, b) => b.weekStart.localeCompare(a.weekStart)));
        setDirtyRevision(0);
        setCloudSyncStatus('saved');
      }).catch(() => {
        if (sequence !== saveSequence.current || currentUserId.current !== userId) return;
        setCloudSyncStatus('error');
      });
    }, SAVE_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [dirtyRevision, displayedWeekStart, extraItems, plannerReady, removedItems, shoppingList, shoppingNotes, userId, weekPlan]);

  useEffect(() => {
    const retry = () => {
      if (!userId || cloudSyncStatus !== 'error') return;
      if (cloudLoadFailed.current) setCloudReloadRevision(revision => revision + 1);
      else setDirtyRevision(revision => revision + 1);
    };
    window.addEventListener('online', retry);
    return () => window.removeEventListener('online', retry);
  }, [cloudSyncStatus, userId]);

  const addExtraItem = useCallback((item: ShoppingItem) => {
    setExtraItems(previous => [...previous, { ...item, manual: true }]);
    setDirtyRevision(revision => revision + 1);
  }, []);
  const removeExtraItem = useCallback((index: number) => {
    const removed = extraItems[index];
    setExtraItems(previous => previous.filter((_, itemIndex) => itemIndex !== index));
    if (removed) setRemovedItems(keys => { const next = new Set(keys); next.delete(shoppingItemKey(removed)); return next; });
    setDirtyRevision(revision => revision + 1);
  }, [extraItems]);
  const toggleRemoved = useCallback((itemKey: string) => {
    setRemovedItems(previous => { const next = new Set(previous); if (next.has(itemKey)) next.delete(itemKey); else next.add(itemKey); return next; });
    setDirtyRevision(revision => revision + 1);
  }, []);
  const setShoppingNotes = useCallback((notes: string) => {
    setShoppingNotesState(notes);
    setDirtyRevision(revision => revision + 1);
  }, []);

  const openSavedWeek = useCallback((weekStart: string) => {
    if (dirtyRevision > 0) return false;
    const record = savedWeeks.find(item => item.weekStart === weekStart);
    if (!record) return false;
    const state = toState(record);
    applyState(state);
    setDisplayedWeekStart(weekStart);
    lastSavedFingerprint.current = weeklyPlanFingerprint(state);
    cloudUpdatedAt.current = record.updatedAt;
    setCloudSyncStatus('saved');
    return true;
  }, [applyState, dirtyRevision, savedWeeks]);

  const returnToCurrentWeek = useCallback(() => {
    if (displayedWeekStart === currentWeekStart) return true;
    const record = savedWeeks.find(item => item.weekStart === currentWeekStart);
    if (record) return openSavedWeek(currentWeekStart);
    if (dirtyRevision > 0) return false;
    applyState({ weekPlan: createEmptyWeekPlan(), extraItems: [], checkedItemKeys: [], shoppingNotes: '' });
    setDisplayedWeekStart(currentWeekStart);
    lastSavedFingerprint.current = null;
    cloudUpdatedAt.current = null;
    setCloudSyncStatus('idle');
    return true;
  }, [applyState, currentWeekStart, dirtyRevision, displayedWeekStart, openSavedWeek, savedWeeks]);

  const missingRecipeIds = useMemo(() => {
    const known = new Set(recipes.map(recipe => recipe.id));
    const missing = new Set<string>();
    WEEKDAYS.forEach(day => ['soup', 'lunch', 'side', 'pickle', 'dinner', 'dessert'].forEach(slot => {
      const id = weekPlan[day][slot as keyof WeekPlan[WeekDay]];
      if (typeof id === 'string' && !known.has(id)) missing.add(id);
    }));
    return [...missing];
  }, [recipes, weekPlan]);

  return {
    weekPlan, updateDay, clearPlan, generateRandomPlan, shoppingList, dailyShoppingList,
    extraItems, addExtraItem, removeExtraItem, removedItems, toggleRemoved, shoppingNotes, setShoppingNotes,
    plannerReady, cloudSyncEnabled: Boolean(userId), cloudSyncStatus, savedWeeks, displayedWeekStart,
    currentWeekStart, openSavedWeek, returnToCurrentWeek,
    canSwitchWeeks: dirtyRevision === 0 && cloudSyncStatus !== 'pending' && cloudSyncStatus !== 'saving', missingRecipeIds,
  };
}

function buildShoppingList(weekPlan: WeekPlan, recipes: Recipe[]) {
  const items = new Map<string, ShoppingItem>();
  WEEKDAYS.forEach((day, dayIndex) => processDayIngredients(weekPlan, day, dayIndex, recipes, item => {
    const key = shoppingItemKey(item);
    const existing = items.get(key);
    if (existing) existing.quantity += item.quantity; else items.set(key, item);
  }));
  return Array.from(items.values());
}

function buildDailyShoppingList(weekPlan: WeekPlan, recipes: Recipe[]) {
  const result = Object.fromEntries(WEEKDAYS.map(day => [day, []])) as Record<WeekDay, ShoppingItem[]>;
  WEEKDAYS.forEach((day, dayIndex) => processDayIngredients(weekPlan, day, dayIndex, recipes, item => {
    const existing = result[day].find(candidate => shoppingItemKey(candidate) === shoppingItemKey(item));
    if (existing) existing.quantity += item.quantity; else result[day].push(item);
  }));
  return result;
}

function processDayIngredients(weekPlan: WeekPlan, day: WeekDay, dayIndex: number, recipes: Recipe[], add: (item: ShoppingItem) => void) {
  const plan = weekPlan[day];
  const processSlot = (recipeId: string | null, servings: number, days: number) => {
    if (!recipeId) return;
    const recipe = recipes.find(item => item.id === recipeId);
    if (!recipe) return;
    const multiplier = (servings / recipe.defaultServings) * days;
    recipe.ingredients.forEach(ingredient => add({ name: ingredient.name, quantity: ingredient.quantity * multiplier, unit: ingredient.unit, checked: false, dayIndex }));
  };
  const previousSoup = dayIndex > 0 ? weekPlan[WEEKDAYS[dayIndex - 1]].soup : null;
  const nextSoup = dayIndex < WEEKDAYS.length - 1 ? weekPlan[WEEKDAYS[dayIndex + 1]].soup : null;
  const previousPlan = dayIndex > 0 ? weekPlan[WEEKDAYS[dayIndex - 1]] : null;
  if (plan.soup !== previousSoup) processSlot(plan.soup, plan.soupServings, plan.soup && plan.soup === nextSoup ? 2 : 1);
  if (!plan.lunchFromLeftovers && (plan.lunch !== previousPlan?.lunch || (plan.lunchDays === 1 && previousPlan?.lunchDays === 1))) processSlot(plan.lunch, plan.lunchServings, plan.lunchDays);
  if (!plan.lunchFromLeftovers) processSlot(plan.side, plan.sideServings, 1);
  processSlot(plan.pickle, plan.pickleServings, 1);
  if (!plan.dinnerFromLeftovers && (plan.dinner !== previousPlan?.dinner || (plan.dinnerDays === 1 && previousPlan?.dinnerDays === 1))) processSlot(plan.dinner, plan.dinnerServings, plan.dinnerDays);
  processSlot(plan.dessert, plan.dessertServings, 1);
}
