import { describe, expect, it } from 'vitest';
import { defaultRecipes } from '@/data/recipes';
import { auditedSoupIds } from '@/data/soupAudit';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { DEFAULT_MENU_PREFERENCES, FoodRestriction } from '@/types/recipe';

const soups = defaultRecipes.filter(recipe => recipe.category === 'soup');

describe('soup recipe quality audit', () => {
  it('covers every soup once with equivalent Hungarian and English step counts', () => {
    expect(soups).toHaveLength(39);
    expect(new Set(auditedSoupIds)).toEqual(new Set(soups.map(recipe => recipe.id)));

    soups.forEach(recipe => {
      const hungarianSteps = recipe.description.match(/^\d+\./gm)?.length ?? 0;
      const englishSteps = ENGLISH_INSTRUCTIONS[recipe.id]?.match(/^\d+\./gm)?.length ?? 0;
      expect(hungarianSteps, recipe.id).toBeGreaterThanOrEqual(5);
      expect(hungarianSteps, recipe.id).toBeLessThanOrEqual(8);
      expect(englishSteps, recipe.id).toBe(hungarianSteps);
      expect(recipe.qualityAuditStatus, recipe.id).toBe('code-reviewed');
    });
  });

  it('uses full elapsed time including soaking, chilling, or resting', () => {
    soups.forEach(recipe => {
      expect(recipe.preparationTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.id).toBeGreaterThanOrEqual(0);
      expect(recipe.restingTime, recipe.id).toBeGreaterThanOrEqual(0);
      expect(recipe.totalTime, recipe.id)
        .toBe(recipe.preparationTime! + recipe.cookingTime! + recipe.restingTime!);
    });

    const byId = Object.fromEntries(soups.map(recipe => [recipe.id, recipe]));
    expect(byId['soup-3'].totalTime).toBe(610);
    expect(byId['soup-4'].totalTime).toBe(620);
    expect(byId['soup-6'].totalTime).toBe(325);
    expect(byId['soup-29'].totalTime).toBe(180);
  });

  it('does not invent cooking time for the no-cook cucumber and avocado soup', () => {
    expect(soups.filter(recipe => recipe.cookingTime === 0).map(recipe => recipe.id)).toEqual(['soup-36']);
    expect(soups.find(recipe => recipe.id === 'soup-36')).toMatchObject({
      preparationTime: 15,
      cookingTime: 0,
      restingTime: 30,
      totalTime: 45,
    });
  });

  it('does not label skilled traditional soups or liver dumplings as easy', () => {
    expect(soups.filter(recipe => recipe.difficulty === 'medium').map(recipe => recipe.id))
      .toEqual(['soup-2', 'soup-4', 'soup-16', 'soup-28']);
  });

  it.each<FoodRestriction>(['gluten', 'milk', 'lactose', 'egg', 'nuts', 'fish'])(
    'blocks soups explicitly carrying the %s restriction',
    restriction => {
      const affected = soups.filter(recipe => recipe.commonAllergens?.includes(restriction));
      expect(affected.length, restriction).toBeGreaterThan(0);
      affected.forEach(recipe => expect(recipeMatchesSafetyPreferences(recipe, {
        ...DEFAULT_MENU_PREFERENCES,
        allergies: [restriction],
      }), recipe.id).toBe(false));
    },
  );

  it('keeps critical corrected recipe facts in the catalogue', () => {
    const eggSoup = soups.find(recipe => recipe.id === 'soup-13')!;
    expect(eggSoup.ingredients.map(item => item.name)).toEqual(expect.arrayContaining([
      'tojás', 'liszt', 'olaj', 'pirospaprika', 'kömény', 'ecet',
    ]));
    expect(eggSoup.description).toContain('tojásfoszlányok');

    expect(soups.find(recipe => recipe.id === 'soup-15')?.ingredients)
      .toContainEqual({ name: 'szárított tárkony', quantity: 2, unit: 'tk' });
    expect(soups.find(recipe => recipe.id === 'soup-29')?.description)
      .toContain('Legfeljebb 2 órán belül tedd hűtőbe');
  });
});
