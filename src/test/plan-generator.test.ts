import { describe, expect, it } from 'vitest';
import { defaultRecipes } from '@/data/recipes';
import { mainMealComposition } from '@/data/mainMealComposition';
import { generateSelectedPlan, generateWeekPlan } from '@/lib/planGenerator';
import { createEmptyDayPlan, createGenerationSelection, DEFAULT_MENU_PREFERENCES, WEEKDAYS } from '@/types/recipe';
import { isQuickRecipe, isSundayRecipe, recipeNeedsSeparateSide } from '@/lib/recipeScheduling';

describe('weekly menu generation rules', () => {
  it('has explicit meal composition and valid side options for every main recipe', () => {
    const mains = defaultRecipes.filter(recipe => recipe.category === 'main');
    const sides = new Set(defaultRecipes.filter(recipe => recipe.category === 'side').map(recipe => recipe.id));

    expect(mains).toHaveLength(Object.keys(mainMealComposition).length);
    mains.forEach(recipe => {
      const metadata = mainMealComposition[recipe.id];
      expect(metadata?.mealComposition, recipe.id).toMatch(/^(complete-meal|main-needs-side)$/);
      if (metadata.mealComposition === 'main-needs-side') {
        expect(metadata.suitableSideDishes?.length, recipe.id).toBeGreaterThan(0);
        metadata.suitableSideDishes?.forEach(sideId => expect(sides.has(sideId), `${recipe.id} -> ${sideId}`).toBe(true));
      }
    });
  });

  it('decides from explicit metadata rather than recipe title or ingredients', () => {
    const main = defaultRecipes.find(recipe => recipe.id === 'main-14')!;
    expect(recipeNeedsSeparateSide({ ...main, name: 'Ismeretlen étel neve', ingredients: [] })).toBe(true);
    expect(recipeNeedsSeparateSide(defaultRecipes.find(recipe => recipe.id === 'main-112'))).toBe(false);
  });

  it('avoids pairing sour potato soup with sour cabbage stew when another main is available', () => {
    const catalog = defaultRecipes.filter(recipe => ['soup-18', 'main-83', 'main-112'].includes(recipe.id));

    for (let attempt = 0; attempt < 20; attempt += 1) {
      const plan = generateWeekPlan(catalog, 1, 0, 'balanced');
      expect(plan.Hétfő.soup).toBe('soup-18');
      expect(plan.Hétfő.lunch).toBe('main-112');
    }
  });

  it('keeps a similar meal pairing when no suitable alternative exists', () => {
    const catalog = defaultRecipes.filter(recipe => ['soup-18', 'main-83'].includes(recipe.id));
    const plan = generateWeekPlan(catalog, 1, 0, 'balanced');

    expect(plan.Hétfő.soup).toBe('soup-18');
    expect(plan.Hétfő.lunch).toBe('main-83');
  });

  it('uses only quick mains or salads for dinner', () => {
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const plan = generateWeekPlan(defaultRecipes, 7, 7, 'balanced');
      WEEKDAYS.forEach(day => {
        const dinner = defaultRecipes.find(recipe => recipe.id === plan[day].dinner);
        expect(['main', 'salad']).toContain(dinner?.category);
        expect(dinner && isQuickRecipe(dinner)).toBe(true);
      });
    }
  });

  it('reserves serious Sunday dishes for Sunday lunch', () => {
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const plan = generateWeekPlan(defaultRecipes, 7, 7, 'balanced');
      expect(isSundayRecipe(defaultRecipes.find(recipe => recipe.id === plan.Vasárnap.lunch)!)).toBe(true);
      WEEKDAYS.slice(0, 6).forEach(day => expect(isSundayRecipe(defaultRecipes.find(recipe => recipe.id === plan[day].lunch)!)).toBe(false));
    }
  });

  it('creates a realistic week with soup pairs and a fuller weekend', () => {
    const plan = generateWeekPlan(defaultRecipes, 7, 7, 'balanced');
    expect(plan.Hétfő.soup).not.toBeNull();
    expect(plan.Kedd.soup).toBe(plan.Hétfő.soup);
    expect(plan.Szerda.soup).toBeNull();
    expect(plan.Csütörtök.soup).toBeNull();
    expect(plan.Péntek.soup).toBeNull();
    expect(plan.Szombat.soup).not.toBeNull();
    expect(plan.Vasárnap.soup).toBe(plan.Szombat.soup);
    expect(plan.Szombat.dessert).not.toBeNull();
    expect(plan.Vasárnap.dessert).toBe(plan.Szombat.dessert);
    expect(plan.Szombat.pickle).not.toBeNull();
  });

  it('adds soup to every lunch in the soup profile and repeats practical batches', () => {
    const plan = generateWeekPlan(defaultRecipes, 7, 7, 'soup');
    WEEKDAYS.forEach(day => expect(plan[day].soup).not.toBeNull());
    expect(plan.Kedd.soup).toBe(plan.Hétfő.soup);
    expect(plan.Csütörtök.soup).toBe(plan.Szerda.soup);
    expect(plan.Szombat.soup).toBe(plan.Péntek.soup);
  });

  it('keeps the simple profile free of soup, pickle and dessert', () => {
    const plan = generateWeekPlan(defaultRecipes, 7, 7, 'simple');
    WEEKDAYS.forEach(day => {
      expect(plan[day].soup).toBeNull();
      expect(plan[day].pickle).toBeNull();
      expect(plan[day].dessert).toBeNull();
      expect(plan[day].lunch).not.toBeNull();
    });
  });

  it.each([
    'main-1', 'main-2', 'main-3', 'main-4', 'main-5', 'main-6', 'main-7', 'main-15', 'main-16', 'main-17',
    'main-19', 'main-28', 'main-29', 'main-30', 'main-32', 'main-33', 'main-47',
    'main-36', 'main-57', 'main-60', 'main-61', 'main-64', 'main-67', 'main-70', 'main-112',
  ])('never adds a separate side to complete dish %s', mainId => {
    const catalog = defaultRecipes.filter(recipe => (recipe.category !== 'main' && recipe.category !== 'stew') || recipe.id === mainId);
    expect(generateWeekPlan(catalog, 1, 0, 'balanced').Hétfő.side).toBeNull();
  });

  it('keeps the side of fasírt selectable instead of baking mashed potatoes into the recipe', () => {
    const catalog = defaultRecipes.filter(recipe => (recipe.category !== 'main' && recipe.category !== 'stew') || recipe.id === 'main-14');
    const plan = generateWeekPlan(catalog, 1, 0, 'balanced');
    expect(plan.Hétfő.lunch).toBe('main-14');
    expect(mainMealComposition['main-14'].suitableSideDishes).toContain(plan.Hétfő.side);
    expect(defaultRecipes.find(recipe => recipe.id === 'main-14')?.ingredients.some(ingredient => ingredient.name === 'burgonya')).toBe(false);
  });

  it('does not repeat a dish between lunches and dinners in the same week', () => {
    const plan = generateWeekPlan(defaultRecipes, 7, 7, 'simple');
    const mealIds = WEEKDAYS.flatMap(day => [plan[day].lunch, plan[day].dinner]).filter(Boolean);
    expect(new Set(mealIds).size).toBe(mealIds.length);
  });

  it('recognizes recipes that already contain their own side', () => {
    ['main-1', 'main-4', 'main-7', 'main-28', 'main-57', 'main-60', 'main-61', 'main-64', 'main-67', 'main-70'].forEach(id => {
      expect(recipeNeedsSeparateSide(defaultRecipes.find(recipe => recipe.id === id)), id).toBe(false);
    });
  });

  it('does not add lunch parts on a day without lunch', () => {
    const plan = generateWeekPlan(defaultRecipes, 5, 7, 'balanced');
    for (const day of ['Szombat', 'Vasárnap'] as const) {
      expect(plan[day].lunch).toBeNull();
      expect(plan[day].soup).toBeNull();
      expect(plan[day].side).toBeNull();
      expect(plan[day].pickle).toBeNull();
      expect(plan[day].dessert).toBeNull();
    }
  });

  it('replaces a full week with only the selected dinner without mutating the original', () => {
    const original = generateWeekPlan(defaultRecipes, 7, 7, 'balanced');
    const snapshot = structuredClone(original);
    const selection = createGenerationSelection(false);
    selection.Szerda.dinner = true;
    const updated = generateSelectedPlan(defaultRecipes, original, selection, 'balanced');
    WEEKDAYS.forEach(day => {
      expect(updated[day].lunch).toBeNull();
      expect(updated[day].soup).toBeNull();
      expect(updated[day].side).toBeNull();
      expect(updated[day].pickle).toBeNull();
      expect(updated[day].dessert).toBeNull();
      if (day !== 'Szerda') expect(updated[day]).toEqual(createEmptyDayPlan());
    });
    expect(updated.Szerda.dinner).not.toBeNull();
    expect(original).toEqual(snapshot);
  });

  it.each([1, 2, 3] as const)('replaces fourteen meals with four weekend meals (batch days: %s)', batchDays => {
    const original = generateWeekPlan(defaultRecipes, 7, 7);
    const selection = createGenerationSelection(false);
    selection.Szombat = { lunch: true, dinner: true };
    selection.Vasárnap = { lunch: true, dinner: true };
    const next = generateSelectedPlan(defaultRecipes, original, selection, 'balanced', { ...DEFAULT_MENU_PREFERENCES, familySize: 6, batchDays });
    WEEKDAYS.slice(0, 5).forEach(day => expect(next[day]).toEqual(createEmptyDayPlan()));
    expect(WEEKDAYS.flatMap(day => [next[day].lunch, next[day].dinner]).filter(Boolean)).toHaveLength(4);
    for (const day of ['Szombat', 'Vasárnap'] as const) {
      expect(next[day].soup).toBeTruthy();
      expect(next[day].dessert).toBeTruthy();
      expect(next[day].lunchServings).toBe(6);
      expect(next[day].lunchDays).toBeLessThanOrEqual(2);
      expect(next[day].dinnerDays).toBeLessThanOrEqual(2);
    }
  });

  it('keeps nonconsecutive lunches separate and clears all other slots', () => {
    const selection = createGenerationSelection(false);
    selection.Hétfő.lunch = true;
    selection.Szerda.lunch = true;
    const next = generateSelectedPlan(defaultRecipes, generateWeekPlan(defaultRecipes, 7, 7), selection, 'simple', { ...DEFAULT_MENU_PREFERENCES, batchDays: 3 });
    expect(next.Hétfő.lunchDays).toBe(1);
    expect(next.Szerda.lunchDays).toBe(1);
    WEEKDAYS.forEach(day => {
      expect(next[day].dinner).toBeNull();
      if (!selection[day].lunch) expect(next[day]).toEqual(createEmptyDayPlan());
    });
  });

  it('does not clear the plan for an empty selection or mutate it on failure', () => {
    const original = generateWeekPlan(defaultRecipes, 7, 7);
    const snapshot = structuredClone(original);
    expect(generateSelectedPlan(defaultRecipes, original, createGenerationSelection(false))).toBe(original);
    expect(() => generateSelectedPlan([], original, createGenerationSelection(true))).toThrow('No suitable recipe');
    expect(original).toEqual(snapshot);
  });
});
