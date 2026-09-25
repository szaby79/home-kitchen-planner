import { describe, expect, it } from 'vitest';
import { auditedMainIds } from '@/data/mainAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';
import { recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { DEFAULT_MENU_PREFERENCES, FoodRestriction } from '@/types/recipe';

const batchSevenIds = Array.from({ length: 15 }, (_, index) => `main-${index + 121}`);
const batchSevenMains = defaultRecipes.filter(recipe => batchSevenIds.includes(recipe.id));

describe('main recipe quality audit batch seven', () => {
  it('covers main-121 through main-135 in source order', () => {
    expect(auditedMainIds.slice(90, 105)).toEqual(batchSevenIds);
    expect(batchSevenMains).toHaveLength(15);

    batchSevenMains.forEach(recipe => {
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
    batchSevenMains.forEach(recipe => {
      expect(recipe.preparationTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.restingTime, recipe.id).toBeGreaterThanOrEqual(0);
      expect(recipe.totalTime, recipe.id)
        .toBe(recipe.preparationTime! + recipe.cookingTime! + recipe.restingTime!);
    });

    const byId = Object.fromEntries(batchSevenMains.map(recipe => [recipe.id, recipe]));
    expect(byId['main-125'].totalTime).toBe(85);
    expect(byId['main-126'].totalTime).toBe(63);
    expect(byId['main-130'].totalTime).toBe(80);
    expect(byId['main-132'].totalTime).toBe(90);
    expect(byId['main-135'].totalTime).toBe(60);
  });

  it.each<FoodRestriction>(['milk', 'lactose', 'gluten', 'egg', 'nuts', 'fish', 'soy'])(
    'blocks audited mains explicitly carrying the %s restriction',
    restriction => {
      const affected = batchSevenMains.filter(recipe => recipe.commonAllergens?.includes(restriction));
      expect(affected.length, restriction).toBeGreaterThan(0);
      affected.forEach(recipe => expect(recipeMatchesSafetyPreferences(recipe, {
        ...DEFAULT_MENU_PREFERENCES,
        allergies: [restriction],
      }), recipe.id).toBe(false));
    },
  );

  it('uses measurable safe-temperature guidance in both languages', () => {
    const expectedTemperatures: Record<string, string> = {
      'main-121': '63 °C',
      'main-127': '71 °C',
      'main-129': '74 °C',
      'main-130': '63 °C',
      'main-131': '71 °C',
      'main-135': '71 °C',
    };

    Object.entries(expectedTemperatures).forEach(([id, temperature]) => {
      const recipe = batchSevenMains.find(item => item.id === id)!;
      expect(recipe.description).toContain(temperature);
      expect(ENGLISH_INSTRUCTIONS[id]).toContain(temperature);
    });
  });

  it('lists every used liquid and realistic canned purchase weights', () => {
    const byId = Object.fromEntries(batchSevenMains.map(recipe => [recipe.id, recipe]));
    const quantity = (id: string, ingredient: string) => byId[id].ingredients.find(item => item.name === ingredient)?.quantity;

    expect(quantity('main-122', 'víz')).toBe(100);
    expect(quantity('main-131', 'tonhalkonzerv')).toBe(640);
    expect(byId['main-131'].description).toContain('körülbelül 420–480 g marad');
    expect(quantity('main-134', 'csicseriborsó konzerv')).toBe(800);
    expect(byId['main-134'].description).toContain('körülbelül 480 g marad');
  });

  it('prevents crowded pans and trays', () => {
    const byId = Object.fromEntries(batchSevenMains.map(recipe => [recipe.id, recipe]));
    expect(byId['main-122'].description).toContain('két részletben');
    expect(byId['main-124'].description).toContain('két nagy tepsire');
    expect(byId['main-133'].description).toContain('két sütőpapíros tepsire');
    expect(byId['main-134'].description).toContain('két nagy tepsire');
    expect(byId['main-135'].description).toContain('2–3 adagban');
  });

  it('treats 800 g pork tenderloin as two realistic pieces', () => {
    const pork = batchSevenMains.find(recipe => recipe.id === 'main-130')!;
    expect(pork.description).toContain('A két sertésszüzet');
    expect(pork.description).toContain('Oszd el a tölteléket a két húson');
    expect(ENGLISH_INSTRUCTIONS['main-130']).toContain('both pork tenderloins');
  });

  it('does not ask the cook to re-chop sliced almonds and allocates all pork oil', () => {
    const trout = batchSevenMains.find(recipe => recipe.id === 'main-121')!;
    expect(trout.description).toContain('szeletelt mandulát');
    expect(trout.description).not.toContain('mandulát vágd durvára');
    expect(ENGLISH_INSTRUCTIONS['main-121']).not.toContain('roughly chop the almonds');

    const pork = batchSevenMains.find(recipe => recipe.id === 'main-130')!;
    expect(pork.ingredients.find(item => item.name === 'olívaolaj')?.quantity).toBe(3);
    expect(pork.description).toContain('Egy teáskanál olajon');
    expect(pork.description).toContain('két teáskanál olajon');
    expect(pork.description).toContain('maradék két evőkanál olajjal');
  });
});
