import { describe, expect, it } from 'vitest';
import { defaultRecipes } from '@/data/recipes';
import { generateWeekPlan } from '@/lib/planGenerator';
import { WEEKDAYS } from '@/types/recipe';
import { isQuickRecipe, isSundayRecipe } from '@/lib/recipeScheduling';

describe('weekly menu generation rules', () => {
  it('uses only quick mains or salads for dinner', () => {
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const plan = generateWeekPlan(defaultRecipes, 7, 7, 'same');

      WEEKDAYS.forEach(day => {
        const dinner = defaultRecipes.find(recipe => recipe.id === plan[day].dinner);
        expect(['main', 'salad']).toContain(dinner?.category);
        expect(dinner && isQuickRecipe(dinner)).toBe(true);
      });
    }
  });

  it('reserves serious Sunday dishes for Sunday lunch', () => {
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const plan = generateWeekPlan(defaultRecipes, 7, 7, 'same');
      const sundayLunch = defaultRecipes.find(recipe => recipe.id === plan.Vasárnap.lunch);

      expect(sundayLunch && isSundayRecipe(sundayLunch)).toBe(true);
      WEEKDAYS.slice(0, 6).forEach(day => {
        const meal = defaultRecipes.find(recipe => recipe.id === plan[day].lunch);
        expect(meal && isSundayRecipe(meal)).toBe(false);
      });
    }
  });

  it('adds the same dessert after both weekend lunches when requested', () => {
    const plan = generateWeekPlan(defaultRecipes, 7, 7, 'same');

    expect(plan.Szombat.dessert).not.toBeNull();
    expect(plan.Vasárnap.dessert).toBe(plan.Szombat.dessert);
  });

  it('adds two different desserts after weekend lunches when requested', () => {
    const plan = generateWeekPlan(defaultRecipes, 7, 7, 'different');

    expect(plan.Szombat.dessert).not.toBeNull();
    expect(plan.Vasárnap.dessert).not.toBe(plan.Szombat.dessert);
  });

  it('does not add a dessert on a weekend day without lunch', () => {
    const plan = generateWeekPlan(defaultRecipes, 5, 7, 'same');

    expect(plan.Szombat.lunch).toBeNull();
    expect(plan.Szombat.dessert).toBeNull();
    expect(plan.Vasárnap.lunch).toBeNull();
    expect(plan.Vasárnap.dessert).toBeNull();
  });
});
