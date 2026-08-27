import { useState, useEffect, useCallback, useMemo } from 'react';
import { WeekPlan, WeekDay, WEEKDAYS, createEmptyWeekPlan, ShoppingItem, Recipe, WeekendDessertMode } from '@/types/recipe';
import { generateWeekPlan } from '@/lib/planGenerator';

const PLAN_KEY = 'plan-pan-weekplan';
const EXTRA_ITEMS_KEY = 'plan-pan-extra-items';

function loadPlan(): WeekPlan {
  try {
    const stored = localStorage.getItem(PLAN_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<WeekPlan>;
      const migrated = createEmptyWeekPlan();
      WEEKDAYS.forEach(day => {
        migrated[day] = { ...migrated[day], ...(parsed[day] || {}) };
      });
      return migrated;
    }
  } catch {
    return createEmptyWeekPlan();
  }
  return createEmptyWeekPlan();
}

function loadExtraItems(): ShoppingItem[] {
  try {
    const stored = localStorage.getItem(EXTRA_ITEMS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    return [];
  }
  return [];
}

export function usePlannerStore(recipes: Recipe[]) {
  const [weekPlan, setWeekPlan] = useState<WeekPlan>(loadPlan);
  const [extraItems, setExtraItems] = useState<ShoppingItem[]>(loadExtraItems);
  const [removedItems, setRemovedItems] = useState<Set<string>>(new Set());

  useEffect(() => { localStorage.setItem(PLAN_KEY, JSON.stringify(weekPlan)); }, [weekPlan]);
  useEffect(() => { localStorage.setItem(EXTRA_ITEMS_KEY, JSON.stringify(extraItems)); }, [extraItems]);

  // Clean up plans saved by earlier versions where a soup could appear at dinner.
  useEffect(() => {
    setWeekPlan(current => {
      let changed = false;
      const next = { ...current };

      WEEKDAYS.forEach(day => {
        const dinner = recipes.find(recipe => recipe.id === current[day].dinner);
        const dessertAllowed = day === 'Szombat' || day === 'Vasárnap';
        const invalidDinner = Boolean(current[day].dinner && dinner?.category !== 'main');
        const invalidDessert = Boolean(current[day].dessert && !dessertAllowed);

        if (invalidDinner || invalidDessert) {
          changed = true;
          next[day] = {
            ...current[day],
            dinner: invalidDinner ? null : current[day].dinner,
            dessert: invalidDessert ? null : current[day].dessert,
          };
        }
      });

      return changed ? next : current;
    });
  }, [recipes]);

  const updateDay = useCallback((day: WeekDay, updates: Partial<typeof weekPlan[typeof day]>) => {
    setWeekPlan(prev => ({ ...prev, [day]: { ...prev[day], ...updates } }));
  }, []);

  const clearPlan = useCallback(() => { setWeekPlan(createEmptyWeekPlan()); }, []);

  const generateRandomPlan = useCallback((numLunches: number, numDinners: number, dessertMode: WeekendDessertMode) => {
    setWeekPlan(generateWeekPlan(recipes, numLunches, numDinners, dessertMode));
  }, [recipes]);

  const shoppingList = useMemo(() => {
    const items = new Map<string, ShoppingItem>();

    WEEKDAYS.forEach((day, dayIndex) => {
      const plan = weekPlan[day];
      const processSlot = (recipeId: string | null, servings: number, days: number) => {
        if (!recipeId) return;
        const recipe = recipes.find(r => r.id === recipeId);
        if (!recipe) return;
        const multiplier = (servings / recipe.defaultServings) * days;
        recipe.ingredients.forEach(ing => {
          const key = `${ing.name}-${ing.unit}`;
          const existing = items.get(key);
          if (existing) {
            existing.quantity += ing.quantity * multiplier;
          } else {
            items.set(key, { name: ing.name, quantity: ing.quantity * multiplier, unit: ing.unit, checked: false, dayIndex });
          }
        });
      };
      processSlot(plan.lunch, plan.lunchServings, plan.lunchDays);
      processSlot(plan.dinner, plan.dinnerServings, plan.dinnerDays);
      processSlot(plan.dessert, plan.dessertServings, 1);
    });

    return Array.from(items.values());
  }, [weekPlan, recipes]);

  const dailyShoppingList = useMemo(() => {
    const result = Object.fromEntries(WEEKDAYS.map(day => [day, []])) as Record<WeekDay, ShoppingItem[]>;
    WEEKDAYS.forEach((day, dayIndex) => {
      const plan = weekPlan[day];
      const items: ShoppingItem[] = [];
      const processSlot = (recipeId: string | null, servings: number, days: number) => {
        if (!recipeId) return;
        const recipe = recipes.find(r => r.id === recipeId);
        if (!recipe) return;
        const multiplier = (servings / recipe.defaultServings) * days;
        recipe.ingredients.forEach(ing => {
          const existing = items.find(i => i.name === ing.name && i.unit === ing.unit);
          if (existing) {
            existing.quantity += ing.quantity * multiplier;
          } else {
            items.push({ name: ing.name, quantity: ing.quantity * multiplier, unit: ing.unit, checked: false, dayIndex });
          }
        });
      };
      processSlot(plan.lunch, plan.lunchServings, plan.lunchDays);
      processSlot(plan.dinner, plan.dinnerServings, plan.dinnerDays);
      processSlot(plan.dessert, plan.dessertServings, 1);
      result[day] = items;
    });
    return result;
  }, [weekPlan, recipes]);

  const addExtraItem = useCallback((item: ShoppingItem) => {
    setExtraItems(prev => [...prev, { ...item, manual: true }]);
  }, []);

  const removeExtraItem = useCallback((index: number) => {
    setExtraItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const toggleRemoved = useCallback((itemKey: string) => {
    setRemovedItems(prev => {
      const next = new Set(prev);
      if (next.has(itemKey)) next.delete(itemKey);
      else next.add(itemKey);
      return next;
    });
  }, []);

  return {
    weekPlan, updateDay, clearPlan, generateRandomPlan,
    shoppingList, dailyShoppingList,
    extraItems, addExtraItem, removeExtraItem,
    removedItems, toggleRemoved,
  };
}
