import { describe, expect, it } from 'vitest';
import { auditedMainIds } from '@/data/mainAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';
import { recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { DEFAULT_MENU_PREFERENCES, FoodRestriction } from '@/types/recipe';

const batchSixIds = Array.from({ length: 15 }, (_, index) => `main-${index + 106}`);
const batchSixMains = defaultRecipes.filter(recipe => batchSixIds.includes(recipe.id));

describe('main recipe quality audit batch six', () => {
  it('covers main-106 through main-120 in source order', () => {
    expect(auditedMainIds.slice(75, 90)).toEqual(batchSixIds);
    expect(batchSixMains).toHaveLength(15);

    batchSixMains.forEach(recipe => {
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

  it('stores realistic full elapsed time including rests', () => {
    batchSixMains.forEach(recipe => {
      expect(recipe.preparationTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.restingTime, recipe.id).toBeGreaterThanOrEqual(0);
      expect(recipe.totalTime, recipe.id)
        .toBe(recipe.preparationTime! + recipe.cookingTime! + recipe.restingTime!);
    });

    const byId = Object.fromEntries(batchSixMains.map(recipe => [recipe.id, recipe]));
    expect(byId['main-109'].totalTime).toBe(43);
    expect(byId['main-111'].totalTime).toBe(70);
    expect(byId['main-117'].totalTime).toBe(75);
    expect(byId['main-118'].totalTime).toBe(103);
    expect(byId['main-120'].totalTime).toBe(58);
  });

  it.each<FoodRestriction>(['milk', 'lactose', 'egg', 'nuts', 'fish', 'soy'])(
    'blocks audited mains explicitly carrying the %s restriction',
    restriction => {
      const affected = batchSixMains.filter(recipe => recipe.commonAllergens?.includes(restriction));
      expect(affected.length, restriction).toBeGreaterThan(0);
      affected.forEach(recipe => expect(recipeMatchesSafetyPreferences(recipe, {
        ...DEFAULT_MENU_PREFERENCES,
        allergies: [restriction],
      }), recipe.id).toBe(false));
    },
  );

  it('uses measurable safe-temperature guidance in both languages', () => {
    const expectedTemperatures: Record<string, string> = {
      'main-107': '71 °C',
      'main-108': '74 °C',
      'main-109': '63 °C',
      'main-110': '63 °C',
      'main-117': '74 °C',
      'main-119': '63 °C',
      'main-120': '74 °C',
    };

    Object.entries(expectedTemperatures).forEach(([id, temperature]) => {
      const recipe = batchSixMains.find(item => item.id === id)!;
      expect(recipe.description).toContain(temperature);
      expect(ENGLISH_INSTRUCTIONS[id]).toContain(temperature);
    });
  });

  it('models the canned bean purchase and all added liquid', () => {
    const beans = batchSixMains.find(recipe => recipe.id === 'main-112')!;
    expect(beans.ingredients.find(item => item.name === 'fehérbab konzerv')?.quantity).toBe(800);
    expect(beans.ingredients.find(item => item.name === 'víz')?.quantity).toBe(100);
    expect(beans.description).toContain('körülbelül 480 g marad');
    expect(ENGLISH_INSTRUCTIONS['main-112']).toContain('about 480 g should remain');
  });

  it('pre-bakes watery vegetables and controls buckwheat hydration', () => {
    const stuffedZucchini = batchSixMains.find(recipe => recipe.id === 'main-114')!;
    expect(stuffedZucchini.description).toContain('süsd elő 8 percig');
    expect(ENGLISH_INSTRUCTIONS['main-114']).toContain('pre-bake for 8 minutes');

    const buckwheat = batchSixMains.find(recipe => recipe.id === 'main-115')!;
    expect(buckwheat.ingredients.find(item => item.name === 'zöldségalaplé')?.quantity).toBe(750);
    expect(buckwheat.description).toContain('650 ml forró alaplevet');

    const lasagna = batchSixMains.find(recipe => recipe.id === 'main-118')!;
    expect(lasagna.description).toContain('süsd elő 8 percig');
    expect(lasagna.description).toContain('alaposan lecsepegtetett mozzarellát');
    expect(ENGLISH_INSTRUCTIONS['main-118']).toContain('pre-bake for 8 minutes');
  });
});
