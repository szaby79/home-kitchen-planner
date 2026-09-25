import { describe, expect, it } from 'vitest';
import { auditedStewIds } from '@/data/stewAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';

const batchOneIds = [
  'main-24', 'main-25', 'main-26', 'main-27',
  ...Array.from({ length: 11 }, (_, index) => `main-${index + 71}`),
];
const batchOneStews = defaultRecipes.filter(recipe => batchOneIds.includes(recipe.id));

describe('stew quality audit batch one', () => {
  it('covers the first 15 stews in source order with matching Hungarian and English steps', () => {
    expect(auditedStewIds).toEqual(batchOneIds);
    expect(batchOneStews.map(recipe => recipe.id)).toEqual(batchOneIds);

    batchOneStews.forEach(recipe => {
      expect(recipe.category, recipe.id).toBe('stew');
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

  it('includes safe doneness checks for ground meat and poultry in both languages', () => {
    for (const id of ['main-24', 'main-27', 'main-74', 'main-76']) {
      expect(defaultRecipes.find(recipe => recipe.id === id)?.description, id).toContain('71 °C');
      expect(ENGLISH_INSTRUCTIONS[id], id).toContain('71 °C');
    }
    for (const id of ['main-75', 'main-77']) {
      expect(defaultRecipes.find(recipe => recipe.id === id)?.description, id).toContain('74 °C');
      expect(ENGLISH_INSTRUCTIONS[id], id).toContain('74 °C');
    }
    expect(defaultRecipes.find(recipe => recipe.id === 'main-26')?.description).toContain('63 °C');
    expect(ENGLISH_INSTRUCTIONS['main-26']).toContain('63 °C');
  });

  it('keeps recipe titles, quantities, and allergens aligned with the listed ingredients', () => {
    const chickenFreeTitle = defaultRecipes.find(recipe => recipe.id === 'main-74')!;
    expect(chickenFreeTitle.name).toBe('Cukkinifőzelék húspogácsával');
    expect(localizeRecipe(chickenFreeTitle, true).name).toBe('Creamed Zucchini with Meat Patties');

    expect(defaultRecipes.find(recipe => recipe.id === 'main-73')?.ingredients.find(item => item.name === 'fehérbab')?.quantity).toBe(300);
    expect(defaultRecipes.find(recipe => recipe.id === 'main-76')?.ingredients.some(item => item.name === 'zsemlemorzsa')).toBe(true);
    expect(defaultRecipes.find(recipe => recipe.id === 'main-80')?.ingredients[0].quantity).toBe(700);
    expect(defaultRecipes.find(recipe => recipe.id === 'main-81')?.ingredients.find(item => item.name === 'vöröslencse')?.quantity).toBe(350);

    const chickpeas = defaultRecipes.find(recipe => recipe.id === 'main-80')!;
    expect(localizeRecipe(chickpeas, true).ingredients[0].name).toBe('canned chickpeas, drained');
    expect(localizeRecipe(defaultRecipes.find(recipe => recipe.id === 'main-76')!, true).name)
      .toBe('Creamed Broccoli with Cheesy Pork Patties');
    expect(chickenFreeTitle.commonAllergens).toEqual(expect.arrayContaining(['egg', 'gluten', 'milk', 'lactose']));
    expect(defaultRecipes.find(recipe => recipe.id === 'main-81')?.commonAllergens).not.toContain('milk');
  });
});
