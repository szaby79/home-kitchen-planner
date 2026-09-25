import { describe, expect, it } from 'vitest';
import { auditedMainIds } from '@/data/mainAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';
import { recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { DEFAULT_MENU_PREFERENCES, FoodRestriction } from '@/types/recipe';

const batchFiveIds = Array.from({ length: 15 }, (_, index) => `main-${index + 91}`);
const batchFiveMains = defaultRecipes.filter(recipe => batchFiveIds.includes(recipe.id));

describe('main recipe quality audit batch five', () => {
  it('covers main-91 through main-105 after the separate stew category', () => {
    expect(auditedMainIds.slice(60, 75)).toEqual(batchFiveIds);
    expect(batchFiveMains).toHaveLength(15);

    batchFiveMains.forEach(recipe => {
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
    batchFiveMains.forEach(recipe => {
      expect(recipe.preparationTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.restingTime, recipe.id).toBeGreaterThanOrEqual(0);
      expect(recipe.totalTime, recipe.id)
        .toBe(recipe.preparationTime! + recipe.cookingTime! + recipe.restingTime!);
    });

    const byId = Object.fromEntries(batchFiveMains.map(recipe => [recipe.id, recipe]));
    expect(byId['main-93'].totalTime).toBe(80);
    expect(byId['main-100'].totalTime).toBe(45);
    expect(byId['main-102'].totalTime).toBe(60);
    expect(byId['main-105'].totalTime).toBe(70);
  });

  it.each<FoodRestriction>(['milk', 'lactose', 'egg', 'nuts', 'fish', 'soy'])(
    'blocks audited mains explicitly carrying the %s restriction',
    restriction => {
      const affected = batchFiveMains.filter(recipe => recipe.commonAllergens?.includes(restriction));
      expect(affected.length, restriction).toBeGreaterThan(0);
      affected.forEach(recipe => expect(recipeMatchesSafetyPreferences(recipe, {
        ...DEFAULT_MENU_PREFERENCES,
        allergies: [restriction],
      }), recipe.id).toBe(false));
    },
  );

  it('uses measurable safety checks where appearance alone is unreliable', () => {
    const expectedTemperatures: Record<string, string> = {
      'main-95': '74 °C',
      'main-96': '63 °C',
      'main-97': '74 °C',
      'main-100': '71 °C',
      'main-105': '71 °C',
    };

    Object.entries(expectedTemperatures).forEach(([id, temperature]) => {
      const recipe = batchFiveMains.find(item => item.id === id)!;
      expect(recipe.description).toContain(temperature);
      expect(ENGLISH_INSTRUCTIONS[id]).toContain(temperature);
    });
  });

  it('lists canned legumes by purchased weight and keeps liquid controllable', () => {
    const byId = Object.fromEntries(batchFiveMains.map(recipe => [recipe.id, recipe]));
    const quantity = (id: string, ingredient: string) => byId[id].ingredients.find(item => item.name === ingredient)?.quantity;

    expect(quantity('main-91', 'csicseriborsó konzerv')).toBe(800);
    expect(byId['main-91'].description).toContain('körülbelül 480 g marad');
    expect(quantity('main-101', 'fekete bab konzerv')).toBe(800);
    expect(quantity('main-101', 'víz')).toBe(400);
    expect(ENGLISH_INSTRUCTIONS['main-101']).toContain('400 ml water');
  });

  it('prevents crowded trays and uses all listed cauliflower', () => {
    const patties = batchFiveMains.find(recipe => recipe.id === 'main-102')!;
    expect(patties.description).toContain('második sütőpapíros tepsire');
    expect(ENGLISH_INSTRUCTIONS['main-102']).toContain('second lined tray');

    const cauliflower = batchFiveMains.find(recipe => recipe.id === 'main-103')!;
    expect(cauliflower.ingredients.find(item => item.name === 'olívaolaj')?.quantity).toBe(5);
    expect(cauliflower.description).toContain('ne dobd ki');
    expect(cauliflower.description).toContain('sült rózsákkal');
    expect(ENGLISH_INSTRUCTIONS['main-103']).toContain('instead of discarding it');
  });

  it('uses a real aerated method for the ricotta soufflé', () => {
    const souffle = batchFiveMains.find(recipe => recipe.id === 'main-105')!;
    expect(souffle.description).toContain('Válaszd szét a tojásokat');
    expect(souffle.description).toContain('verd kemény habbá');
    expect(souffle.description).toContain('ne nyisd ki a sütőt');
    expect(ENGLISH_INSTRUCTIONS['main-105']).toContain('beat the egg whites to stiff peaks');
  });
});
