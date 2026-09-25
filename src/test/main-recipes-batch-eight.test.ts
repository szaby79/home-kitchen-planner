import { describe, expect, it } from 'vitest';
import { auditedMainIds } from '@/data/mainAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';

const batchEightIds = Array.from({ length: 6 }, (_, index) => `main-${index + 136}`);
const batchEightMains = defaultRecipes.filter(recipe => batchEightIds.includes(recipe.id));

describe('main recipe quality audit batch eight', () => {
  it('covers main-136 through main-141 in source order', () => {
    expect(auditedMainIds.slice(105)).toEqual(batchEightIds);
    expect(batchEightMains.map(recipe => recipe.id)).toEqual(batchEightIds);

    batchEightMains.forEach(recipe => {
      expect(recipe.category, recipe.id).toBe('main');
      const hungarianSteps = recipe.description.match(/^\d+\./gm)?.length ?? 0;
      const englishSteps = ENGLISH_INSTRUCTIONS[recipe.id]?.match(/^\d+\./gm)?.length ?? 0;
      expect(hungarianSteps, recipe.id).toBeGreaterThanOrEqual(5);
      expect(englishSteps, recipe.id).toBe(hungarianSteps);
      expect(recipe.qualityAuditStatus, recipe.id).toBe('code-reviewed');
      expect(localizeRecipe(recipe, true).note, recipe.id).not.toBe(recipe.note);
      expect(recipe.totalTime, recipe.id).toBe(
        recipe.preparationTime! + recipe.cookingTime! + recipe.restingTime!,
      );
    });
  });

  it('uses measurable cooking checks for poultry, lamb, fish, and pork in both languages', () => {
    const expectedTemperatures: Record<string, string[]> = {
      'main-137': ['74 °C'],
      'main-138': ['74 °C'],
      'main-139': ['63 °C', '71 °C'],
      'main-140': ['70 °C'],
      'main-141': ['71 °C'],
    };

    Object.entries(expectedTemperatures).forEach(([id, temperatures]) => {
      const recipe = batchEightMains.find(item => item.id === id)!;
      temperatures.forEach(temperature => {
        expect(recipe.description, id).toContain(temperature);
        expect(ENGLISH_INSTRUCTIONS[id], id).toContain(temperature);
      });
    });
  });

  it('keeps the crowded chicken tray flexible and drains cauliflower before baking', () => {
    const chicken = batchEightMains.find(recipe => recipe.id === 'main-137')!;
    const turkey = batchEightMains.find(recipe => recipe.id === 'main-138')!;
    expect(chicken.description).toContain('ha nem férnek el egy rétegben, használj két tepsit');
    expect(ENGLISH_INSTRUCTIONS['main-137']).toContain('use two trays if needed');
    expect(turkey.description).toContain('alaposan csepegtesd le');
    expect(ENGLISH_INSTRUCTIONS['main-138']).toContain('drain thoroughly');
  });

  it('marks both dairy recipes for milk and lactose restrictions', () => {
    for (const id of ['main-136', 'main-138']) {
      const recipe = batchEightMains.find(item => item.id === id)!;
      expect(recipe.commonAllergens).toEqual(expect.arrayContaining(['milk', 'lactose']));
    }
  });
});
