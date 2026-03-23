import { useState, useEffect, useCallback, useMemo } from 'react';
import { WeekPlan, WeekDay, WEEKDAYS, createEmptyWeekPlan, ShoppingItem, Recipe } from '@/types/recipe';

const PLAN_KEY = 'plan-pan-weekplan';
const EXTRA_ITEMS_KEY = 'plan-pan-extra-items';

function loadPlan(): WeekPlan {
  try {
    const stored = localStorage.getItem(PLAN_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return createEmptyWeekPlan();
}

function loadExtraItems(): ShoppingItem[] {
  try {
    const stored = localStorage.getItem(EXTRA_ITEMS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

export function usePlannerStore(recipes: Recipe[]) {
  const [weekPlan, setWeekPlan] = useState<WeekPlan>(loadPlan);
  const [extraItems, setExtraItems] = useState<ShoppingItem[]>(loadExtraItems);
  const [removedItems, setRemovedItems] = useState<Set<string>>(new Set());

  useEffect(() => { localStorage.setItem(PLAN_KEY, JSON.stringify(weekPlan)); }, [weekPlan]);
  useEffect(() => { localStorage.setItem(EXTRA_ITEMS_KEY, JSON.stringify(extraItems)); }, [extraItems]);

  const updateDay = useCallback((day: WeekDay, updates: Partial<typeof weekPlan[typeof day]>) => {
    setWeekPlan(prev => ({ ...prev, [day]: { ...prev[day], ...updates } }));
  }, []);

  const clearPlan = useCallback(() => { setWeekPlan(createEmptyWeekPlan()); }, []);

  const generateRandomPlan = useCallback((numLunches: number, numDinners: number) => {
    const lunchRecipes = recipes.filter(r => (r.mealType === 'lunch' || r.mealType === 'both') && r.category !== 'dessert');
    const dinnerRecipes = recipes.filter(r => (r.mealType === 'dinner' || r.mealType === 'both') && r.category !== 'dessert');

    const pick = (arr: Recipe[], count: number): (string | null)[] => {
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      const result: (string | null)[] = [];
      for (let i = 0; i < 7; i++) {
        result.push(i < count ? shuffled[i % shuffled.length].id : null);
      }
      return result;
    };

    const lunches = pick(lunchRecipes, numLunches);
    const dinners = pick(dinnerRecipes, numDinners);

    const newPlan = createEmptyWeekPlan();
    WEEKDAYS.forEach((day, i) => {
      newPlan[day] = { lunch: lunches[i], dinner: dinners[i], lunchServings: 4, dinnerServings: 4, lunchDays: 1, dinnerDays: 1 };
    });
    setWeekPlan(newPlan);
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
    });

    return Array.from(items.values());
  }, [weekPlan, recipes]);

  const dailyShoppingList = useMemo(() => {
    const result: Record<WeekDay, ShoppingItem[]> = {} as any;
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
