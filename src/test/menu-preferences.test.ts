import { describe, expect, it } from 'vitest';
import { defaultRecipes } from '@/data/recipes';
import { generateSelectedPlan, generateWeekPlan } from '@/lib/planGenerator';
import { estimatedCookingMinutes, isVegetarianRecipe, recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { createEmptyWeekPlan, createGenerationSelection, DEFAULT_MENU_PREFERENCES, MenuPreferences, WEEKDAYS } from '@/types/recipe';

function preferences(overrides: Partial<MenuPreferences>): MenuPreferences {
  return { ...DEFAULT_MENU_PREFERENCES, ...overrides };
}

describe('personalized weekly menu generation', () => {
  it('uses the saved family size for every generated meal', () => {
    const plan = generateWeekPlan(defaultRecipes, 7, 7, 'balanced', preferences({ familySize: 6 }));
    WEEKDAYS.forEach(day => {
      expect(plan[day].lunchServings).toBe(6);
      expect(plan[day].dinnerServings).toBe(6);
      expect(plan[day].soupServings).toBe(6);
    });
  });

  it('keeps vegetarian plans free of meat and fish', () => {
    const profile = preferences({ diet: 'vegetarian' });
    const plan = generateWeekPlan(defaultRecipes, 7, 7, 'balanced', profile);
    const selectedIds = WEEKDAYS.flatMap(day => [plan[day].soup, plan[day].lunch, plan[day].dinner]).filter(Boolean) as string[];
    expect(selectedIds.length).toBeGreaterThan(0);
    selectedIds.forEach(id => expect(isVegetarianRecipe(defaultRecipes.find(recipe => recipe.id === id)!)).toBe(true));
  });

  it('excludes allergens and disliked ingredients', () => {
    const profile = preferences({ allergies: ['milk'], dislikedIngredients: ['gomba'] });
    const plan = generateWeekPlan(defaultRecipes, 7, 7, 'balanced', profile);
    const selectedIds = WEEKDAYS.flatMap(day => [plan[day].soup, plan[day].lunch, plan[day].dinner]).filter(Boolean) as string[];
    selectedIds.forEach(id => expect(recipeMatchesSafetyPreferences(defaultRecipes.find(recipe => recipe.id === id)!, profile)).toBe(true));
  });

  it('respects the preferred maximum cooking time', () => {
    const profile = preferences({ maxCookingTime: '30' });
    const plan = generateWeekPlan(defaultRecipes, 7, 7, 'simple', profile);
    WEEKDAYS.forEach(day => {
      const lunch = defaultRecipes.find(recipe => recipe.id === plan[day].lunch);
      const dinner = defaultRecipes.find(recipe => recipe.id === plan[day].dinner);
      if (lunch) expect(estimatedCookingMinutes(lunch)).toBeLessThanOrEqual(30);
      if (dinner) expect(estimatedCookingMinutes(dinner)).toBeLessThanOrEqual(30);
    });
  });

  it('repeats a batch across consecutive days and records the batch length', () => {
    const plan = generateWeekPlan(defaultRecipes, 7, 7, 'simple', preferences({ batchDays: 2 }));
    expect(plan.Hétfő.lunch).toBe(plan.Kedd.lunch);
    expect(plan.Hétfő.dinner).toBe(plan.Kedd.dinner);
    expect(plan.Hétfő.lunchDays).toBe(2);
    expect(plan.Kedd.lunchDays).toBe(2);
    expect(plan.Vasárnap.lunchDays).toBe(1);
  });

  it('does not buy extra batch portions when only one day is selected', () => {
    const selection = createGenerationSelection(false);
    selection.Kedd.lunch = true;
    const plan = generateSelectedPlan(defaultRecipes, createEmptyWeekPlan(), selection, 'simple', preferences({ batchDays: 3 }));
    expect(plan.Kedd.lunch).toBeTruthy();
    expect(plan.Kedd.lunchDays).toBe(1);
  });

  it('prioritizes a suitable favourite without repeating it all week', () => {
    const favourite = defaultRecipes.find(recipe => recipe.id === 'main-12')!;
    const plan = generateWeekPlan(defaultRecipes, 7, 7, 'simple', DEFAULT_MENU_PREFERENCES, [favourite.id]);
    const lunches = WEEKDAYS.map(day => plan[day].lunch);
    expect(lunches).toContain(favourite.id);
    expect(lunches.filter(id => id === favourite.id)).toHaveLength(1);
  });
});
