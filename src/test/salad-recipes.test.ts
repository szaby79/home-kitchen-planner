import { describe, expect, it } from 'vitest';
import { auditedSaladIds } from '@/data/saladAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';

const saladIds = Array.from({ length: 10 }, (_, index) => `salad-${index + 1}`);
const salads = defaultRecipes.filter(recipe => recipe.category === 'salad');

describe('salad quality audit', () => {
  it('covers every salad with complete Hungarian and English instructions', () => {
    expect(auditedSaladIds).toEqual(saladIds);
    expect(salads.map(recipe => recipe.id)).toEqual(saladIds);

    salads.forEach(recipe => {
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

  it('uses measurable chicken doneness guidance in both languages', () => {
    for (const id of ['salad-1', 'salad-4', 'salad-7']) {
      expect(defaultRecipes.find(recipe => recipe.id === id)?.description, id).toContain('74 °C');
      expect(ENGLISH_INSTRUCTIONS[id], id).toContain('74 °C');
    }
  });

  it('describes the yogurt Caesar variation honestly in both languages', () => {
    const caesar = defaultRecipes.find(recipe => recipe.id === 'salad-1')!;
    expect(caesar.name).toBe('Joghurtos csirkés Cézár-saláta');
    expect(localizeRecipe(caesar, true).name).toBe('Yogurt Chicken Caesar Salad');
  });

  it('includes the cooking oil and realistic elapsed time that the recipes require', () => {
    const appleChicken = defaultRecipes.find(recipe => recipe.id === 'salad-7')!;
    const pasta = defaultRecipes.find(recipe => recipe.id === 'salad-10')!;

    expect(appleChicken.ingredients.find(item => item.name === 'olaj')?.quantity).toBe(1);
    expect(pasta.restingTime).toBe(20);
    expect(pasta.totalTime).toBe(47);
    expect(pasta.quickMeal).toBe(false);
  });

  it('keeps perishable work lunches chilled and labels their allergens', () => {
    for (const id of ['salad-3', 'salad-10']) {
      expect(defaultRecipes.find(recipe => recipe.id === id)?.description, id).toContain('jégakkuval');
      expect(ENGLISH_INSTRUCTIONS[id], id).toContain('ice pack');
    }
    expect(defaultRecipes.find(recipe => recipe.id === 'salad-3')?.commonAllergens)
      .toEqual(expect.arrayContaining(['fish', 'milk', 'lactose']));
    expect(defaultRecipes.find(recipe => recipe.id === 'salad-7')?.commonAllergens)
      .toEqual(expect.arrayContaining(['nuts', 'milk', 'lactose']));
    expect(defaultRecipes.find(recipe => recipe.id === 'salad-10')?.commonAllergens)
      .toEqual(expect.arrayContaining(['gluten', 'egg', 'milk', 'lactose']));
  });
});
