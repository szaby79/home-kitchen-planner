import { describe, expect, it } from 'vitest';
import { auditedDessertIds } from '@/data/dessertAudit';
import { auditedDessertSecondBatchIds } from '@/data/dessertAuditSecondBatch';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';

const secondBatchIds = Array.from({ length: 10 }, (_, index) => `dessert-${index + 11}`);
const allDessertIds = Array.from({ length: 20 }, (_, index) => `dessert-${index + 1}`);

describe('dessert quality audit, recipes 11–20', () => {
  it('completes the full dessert category in Hungarian and English', () => {
    expect(auditedDessertSecondBatchIds).toEqual(secondBatchIds);
    expect([...auditedDessertIds, ...auditedDessertSecondBatchIds]).toEqual(allDessertIds);
    expect(defaultRecipes.filter(recipe => recipe.category === 'dessert').map(recipe => recipe.id)).toEqual(allDessertIds);

    secondBatchIds.forEach(id => {
      const recipe = defaultRecipes.find(item => item.id === id)!;
      const hungarianSteps = recipe.description.match(/^\d+\./gm)?.length ?? 0;
      const englishSteps = ENGLISH_INSTRUCTIONS[id]?.match(/^\d+\./gm)?.length ?? 0;

      expect(hungarianSteps, id).toBeGreaterThanOrEqual(5);
      expect(englishSteps, id).toBe(hungarianSteps);
      expect(recipe.qualityAuditStatus, id).toBe('code-reviewed');
      expect(localizeRecipe(recipe, true).note, id).not.toBe(recipe.note);
      expect(recipe.totalTime, id).toBe(
        recipe.preparationTime! + recipe.cookingTime! + recipe.restingTime!,
      );
      expect(recipe.quickMeal, id).toBe(false);
    });
  });

  it('includes all rising, chilling, cooling, and setting time in long desserts', () => {
    expect(defaultRecipes.find(item => item.id === 'dessert-11')?.restingTime).toBe(85);
    expect(defaultRecipes.find(item => item.id === 'dessert-13')?.restingTime).toBe(90);
    expect(defaultRecipes.find(item => item.id === 'dessert-16')?.restingTime).toBe(195);
    expect(defaultRecipes.find(item => item.id === 'dessert-18')?.restingTime).toBe(95);
  });

  it('uses a realistic four-person Dobos cake and warns about caramel burns', () => {
    const dobos = defaultRecipes.find(item => item.id === 'dessert-14')!;
    expect(dobos.ingredients.find(item => item.name === 'tojás')?.quantity).toBe(3);
    expect(dobos.ingredients.find(item => item.name === 'liszt')?.quantity).toBe(90);
    expect(dobos.description).toContain('15 cm-es');
    expect(dobos.description).toContain('súlyos égést');
    expect(ENGLISH_INSTRUCTIONS['dessert-14']).toContain('severe burns');
  });

  it('removes the unused egg problem from Rákóczi cottage cheese slice and bread pudding', () => {
    const rakoczi = defaultRecipes.find(item => item.id === 'dessert-17')!;
    const breadPudding = defaultRecipes.find(item => item.id === 'dessert-20')!;
    expect(rakoczi.ingredients.find(item => item.name === 'tojás')?.quantity).toBe(4);
    expect(rakoczi.description).toContain('maradék 3 tojássárgájával');
    expect(rakoczi.description).toContain('4 tojásfehérjét');
    expect(breadPudding.ingredients.find(item => item.name === 'tojás')?.quantity).toBe(4);
    expect(breadPudding.description).toContain('4 tojássárgájával');
  });

  it('uses four eggs and clear drying guidance for reliable choux pastry', () => {
    const creamPuffs = defaultRecipes.find(item => item.id === 'dessert-18')!;
    expect(creamPuffs.ingredients.find(item => item.name === 'tojás')?.quantity).toBe(4);
    expect(creamPuffs.description).toContain('V alakban');
    expect(creamPuffs.description).toContain('résnyire nyitott sütőben');
    expect(creamPuffs.description).toContain('végig tartsd hűtve');
  });

  it('keeps potato dough cool and tests doneness instead of relying only on floating', () => {
    const dumplings = defaultRecipes.find(item => item.id === 'dessert-19')!;
    expect(dumplings.description).toContain('teljesen kihűlni');
    expect(dumplings.description).toContain('vágd félbe próbaként');
    expect(ENGLISH_INSTRUCTIONS['dessert-19']).toContain('cut one open to test');
  });
});
