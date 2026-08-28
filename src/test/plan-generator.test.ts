import { describe, expect, it } from 'vitest';
import { defaultRecipes } from '@/data/recipes';
import { generateSelectedPlan, generateWeekPlan } from '@/lib/planGenerator';
import { createGenerationSelection, WEEKDAYS } from '@/types/recipe';
import { isQuickRecipe, isSundayRecipe, recipeNeedsSeparateSide } from '@/lib/recipeScheduling';

describe('weekly menu generation rules', () => {
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

  it.each(['main-19', 'main-47', 'main-28', 'main-7'])('never adds a separate side to complete dish %s', mainId => {
    const catalog = defaultRecipes.filter(recipe => recipe.category !== 'main' || recipe.id === mainId);
    expect(generateWeekPlan(catalog, 1, 0, 'balanced').Hétfő.side).toBeNull();
  });

  it('keeps the side of fasírt selectable instead of baking mashed potatoes into the recipe', () => {
    const catalog = defaultRecipes.filter(recipe => recipe.category !== 'main' || recipe.id === 'main-14');
    const plan = generateWeekPlan(catalog, 1, 0, 'balanced');
    expect(plan.Hétfő.lunch).toBe('main-14');
    expect(plan.Hétfő.side).not.toBeNull();
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

  it('changes only the meals selected by the user', () => {
    const original = generateWeekPlan(defaultRecipes, 7, 7, 'balanced');
    const selection = createGenerationSelection(false);
    selection.Szerda.dinner = true;
    const updated = generateSelectedPlan(defaultRecipes, original, selection, 'balanced');
    WEEKDAYS.forEach(day => {
      expect(updated[day].lunch).toBe(original[day].lunch);
      if (day !== 'Szerda') expect(updated[day].dinner).toBe(original[day].dinner);
    });
    expect(updated.Szerda.dinner).not.toBeNull();
  });
});
