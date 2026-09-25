import { describe, expect, it } from 'vitest';
import { auditedMainIds } from '@/data/mainAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';
import { recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { DEFAULT_MENU_PREFERENCES, FoodRestriction } from '@/types/recipe';

const batchThreeIds = Array.from({ length: 15 }, (_, index) => `main-${index + 35}`);
const batchThreeMains = defaultRecipes.filter(recipe => batchThreeIds.includes(recipe.id));

describe('main recipe quality audit batch three', () => {
  it('covers main-35 through main-49 with equivalent bilingual step counts', () => {
    expect(auditedMainIds.slice(30, 45)).toEqual(batchThreeIds);
    expect(batchThreeMains).toHaveLength(15);

    batchThreeMains.forEach(recipe => {
      expect(recipe.category, recipe.id).toBe('main');
      const hungarianSteps = recipe.description.match(/^\d+\./gm)?.length ?? 0;
      const englishSteps = ENGLISH_INSTRUCTIONS[recipe.id]?.match(/^\d+\./gm)?.length ?? 0;
      expect(hungarianSteps, recipe.id).toBeGreaterThanOrEqual(5);
      expect(hungarianSteps, recipe.id).toBeLessThanOrEqual(8);
      expect(englishSteps, recipe.id).toBe(hungarianSteps);
      expect(recipe.qualityAuditStatus, recipe.id).toBe('code-reviewed');
      expect(localizeRecipe(recipe, true).note, recipe.id).not.toBe(recipe.note);
    });
  });

  it('stores realistic complete elapsed time including rests', () => {
    batchThreeMains.forEach(recipe => {
      expect(recipe.preparationTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.restingTime, recipe.id).toBeGreaterThanOrEqual(0);
      expect(recipe.totalTime, recipe.id)
        .toBe(recipe.preparationTime! + recipe.cookingTime! + recipe.restingTime!);
    });

    const byId = Object.fromEntries(batchThreeMains.map(recipe => [recipe.id, recipe]));
    expect(byId['main-36'].totalTime).toBe(75);
    expect(byId['main-38'].totalTime).toBe(195);
    expect(byId['main-39'].totalTime).toBe(195);
    expect(byId['main-42'].totalTime).toBe(95);
  });

  it.each<FoodRestriction>(['gluten', 'milk', 'lactose', 'egg'])(
    'blocks audited mains explicitly carrying the %s restriction',
    restriction => {
      const affected = batchThreeMains.filter(recipe => recipe.commonAllergens?.includes(restriction));
      expect(affected.length, restriction).toBeGreaterThan(0);
      affected.forEach(recipe => expect(recipeMatchesSafetyPreferences(recipe, {
        ...DEFAULT_MENU_PREFERENCES,
        allergies: [restriction],
      }), recipe.id).toBe(false));
    },
  );

  it('keeps corrected four-person ratios and complete ingredients', () => {
    const byId = Object.fromEntries(batchThreeMains.map(recipe => [recipe.id, recipe]));
    const quantity = (id: string, ingredient: string) => byId[id].ingredients.find(item => item.name === ingredient)?.quantity;

    expect(quantity('main-37', 'olaj')).toBe(500);
    expect(quantity('main-38', 'cukor')).toBe(1);
    expect(quantity('main-38', 'citrom')).toBe(1);
    expect(quantity('main-40', 'rizs')).toBe(150);
    expect(quantity('main-41', 'rizs')).toBe(150);
    expect(quantity('main-46', 'só')).toBe(2);
  });

  it('does not omit the potato method or hide vague final cooking time', () => {
    const pork = batchThreeMains.find(recipe => recipe.id === 'main-36')!;
    expect(pork.description).toContain('burgonyát');
    expect(pork.description).toContain('35–40 percig');
    expect(ENGLISH_INSTRUCTIONS['main-36']).toContain('35–40 minutes');

    const slambuc = batchThreeMains.find(recipe => recipe.id === 'main-45')!;
    expect(slambuc.description).toContain('10–15 percig');
    expect(ENGLISH_INSTRUCTIONS['main-45']).toContain('10–15 minutes');
  });

  it('aligns the measured liquid and long pork cooking in both languages', () => {
    const tarhonya = batchThreeMains.find(recipe => recipe.id === 'main-42')!;
    expect(tarhonya.description).toContain('6 dl forró vizet');
    expect(ENGLISH_INSTRUCTIONS['main-42']).toContain('600 ml hot water');

    const rice = batchThreeMains.find(recipe => recipe.id === 'main-43')!;
    expect(rice.description).toContain('5 dl forró vizet');
    expect(ENGLISH_INSTRUCTIONS['main-43']).toContain('500 ml hot water');

    for (const id of ['main-42', 'main-43']) {
      expect(batchThreeMains.find(recipe => recipe.id === id)!.description).toContain('45–55 percig');
      expect(ENGLISH_INSTRUCTIONS[id]).toContain('45–55 minutes');
    }
  });
});
