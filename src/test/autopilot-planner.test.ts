import { describe, expect, it } from 'vitest';
import { defaultRecipes } from '@/data/recipes';
import { generateSelectedPlan } from '@/lib/planGenerator';
import { createDefaultAutopilotSettings, createEmptyWeekPlan, createGenerationSelection, DEFAULT_MENU_PREFERENCES } from '@/types/recipe';
import { isQuickRecipe } from '@/lib/recipeScheduling';

describe('family food autopilot', () => {
  it('respects day-specific people counts and intentional leftovers', () => {
    const settings = createDefaultAutopilotSettings(4);
    settings.goal = 'cook-fast';
    settings.days.Szerda.people = 3;
    settings.days.Szerda.maxCookingTime = 30;
    settings.days.Csütörtök.people = 4;
    settings.days.Csütörtök.mode = 'leftovers';

    const plan = generateSelectedPlan(
      defaultRecipes,
      createEmptyWeekPlan(),
      createGenerationSelection(true),
      'balanced',
      DEFAULT_MENU_PREFERENCES,
      [],
      settings,
    );

    expect(plan.Szerda.lunch).not.toBeNull();
    expect(plan.Csütörtök.lunch).toBe(plan.Szerda.lunch);
    expect(plan.Csütörtök.lunchFromLeftovers).toBe(true);
    expect(plan.Szerda.lunchServings).toBe(7);
    expect(plan.Csütörtök.lunchServings).toBe(4);
    expect(plan.Csütörtök.dinner).toBe(plan.Szerda.dinner);
    expect(plan.Csütörtök.dinnerFromLeftovers).toBe(true);
    expect(plan.Szerda.dinnerServings).toBe(7);
  });

  it('keeps cook-fast dinners in the quick recipe pool', () => {
    const settings = createDefaultAutopilotSettings(4);
    settings.goal = 'cook-fast';
    settings.days.Hétfő.maxCookingTime = 20;

    const plan = generateSelectedPlan(
      defaultRecipes,
      createEmptyWeekPlan(),
      createGenerationSelection(true),
      'balanced',
      DEFAULT_MENU_PREFERENCES,
      [],
      settings,
    );

    const dinner = defaultRecipes.find(recipe => recipe.id === plan.Hétfő.dinner);
    expect(dinner).toBeDefined();
    expect(dinner && isQuickRecipe(dinner)).toBe(true);
  });

  it('leaves no-meal days empty', () => {
    const settings = createDefaultAutopilotSettings(4);
    settings.days.Péntek.mode = 'no-meal';
    const selection = createGenerationSelection(true);
    selection.Péntek = { lunch: false, dinner: false };

    const plan = generateSelectedPlan(defaultRecipes, createEmptyWeekPlan(), selection, 'balanced', DEFAULT_MENU_PREFERENCES, [], settings);
    expect(plan.Péntek.lunch).toBeNull();
    expect(plan.Péntek.dinner).toBeNull();
  });
});
