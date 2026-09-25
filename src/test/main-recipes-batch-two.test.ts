import { describe, expect, it } from 'vitest';
import { auditedMainIds } from '@/data/mainAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';
import { recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { DEFAULT_MENU_PREFERENCES, FoodRestriction } from '@/types/recipe';

const batchTwoIds = [
  'main-16', 'main-17', 'main-18', 'main-19', 'main-20', 'main-21', 'main-22', 'main-23',
  'main-28', 'main-29', 'main-30', 'main-31', 'main-32', 'main-33', 'main-34',
];

const batchTwoMains = defaultRecipes.filter(recipe => batchTwoIds.includes(recipe.id));

describe('main recipe quality audit batch two', () => {
  it('covers the next 15 actual main-category recipes with bilingual methods', () => {
    expect(auditedMainIds.slice(15, 30)).toEqual(batchTwoIds);
    expect(batchTwoMains).toHaveLength(15);

    batchTwoMains.forEach(recipe => {
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

  it('stores realistic complete elapsed time, including rests', () => {
    batchTwoMains.forEach(recipe => {
      expect(recipe.preparationTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.restingTime, recipe.id).toBeGreaterThanOrEqual(0);
      expect(recipe.totalTime, recipe.id)
        .toBe(recipe.preparationTime! + recipe.cookingTime! + recipe.restingTime!);
    });

    const byId = Object.fromEntries(batchTwoMains.map(recipe => [recipe.id, recipe]));
    expect(byId['main-17'].totalTime).toBe(165);
    expect(byId['main-21'].totalTime).toBe(70);
    expect(byId['main-31'].totalTime).toBe(95);
  });

  it.each<FoodRestriction>(['gluten', 'milk', 'lactose', 'egg', 'fish'])(
    'blocks audited mains explicitly carrying the %s restriction',
    restriction => {
      const affected = batchTwoMains.filter(recipe => recipe.commonAllergens?.includes(restriction));
      expect(affected.length, restriction).toBeGreaterThan(0);
      affected.forEach(recipe => expect(recipeMatchesSafetyPreferences(recipe, {
        ...DEFAULT_MENU_PREFERENCES,
        allergies: [restriction],
      }), recipe.id).toBe(false));
    },
  );

  it('keeps corrected ingredient-method agreements', () => {
    const byId = Object.fromEntries(batchTwoMains.map(recipe => [recipe.id, recipe]));
    const quantity = (id: string, ingredient: string) => byId[id].ingredients.find(item => item.name === ingredient)?.quantity;

    expect(quantity('main-30', 'burgonya')).toBe(800);
    expect(quantity('main-30', 'tej')).toBe(150);
    expect(quantity('main-30', 'vaj')).toBe(40);
    expect(quantity('main-31', 'tojás')).toBe(2);
    expect(quantity('main-34', 'gomba')).toBe(200);
    expect(quantity('main-34', 'főtt sonka')).toBe(150);
  });

  it('keeps fish safety and paprika protection in both languages', () => {
    for (const id of ['main-29', 'main-30']) {
      const recipe = batchTwoMains.find(item => item.id === id)!;
      expect(recipe.description, id).toContain('szálka');
      expect(ENGLISH_INSTRUCTIONS[id], id).toContain('bone');
    }

    const paprikaPotatoes = batchTwoMains.find(recipe => recipe.id === 'main-19')!;
    expect(paprikaPotatoes.description).toContain('Húzd le a tűzről');
    expect(ENGLISH_INSTRUCTIONS['main-19']).toContain('off the heat');
  });
});
