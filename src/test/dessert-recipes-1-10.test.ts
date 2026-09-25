import { describe, expect, it } from 'vitest';
import { auditedDessertIds } from '@/data/dessertAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';

const auditedIds = Array.from({ length: 10 }, (_, index) => `dessert-${index + 1}`);

describe('dessert quality audit, recipes 1–10', () => {
  it('covers the complete first batch in Hungarian and English', () => {
    expect(auditedDessertIds).toEqual(auditedIds);

    auditedIds.forEach(id => {
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
    });
  });

  it('does not mark recipes quick when rising, chilling, or cooling makes them long', () => {
    for (const id of ['dessert-3', 'dessert-5', 'dessert-6', 'dessert-9', 'dessert-10']) {
      const recipe = defaultRecipes.find(item => item.id === id)!;
      expect(recipe.quickMeal, id).toBe(false);
      expect(recipe.totalTime, id).toBeGreaterThanOrEqual(100);
    }
  });

  it('uses honest naming and serving quantities for the simplified Somlói', () => {
    const recipe = defaultRecipes.find(item => item.id === 'dessert-5')!;
    expect(recipe.name).toBe('Egyszerű somlói galuska');
    expect(localizeRecipe(recipe, true).name).toContain('Simplified');
    expect(recipe.ingredients.find(item => item.name === 'piskóta lap')?.unit).toBe('g');
    expect(recipe.restingTime).toBe(150);
  });

  it('includes the missing liquids and realistic texture corrections', () => {
    const pancake = defaultRecipes.find(item => item.id === 'dessert-1')!;
    const ricePudding = defaultRecipes.find(item => item.id === 'dessert-7')!;
    const semolina = defaultRecipes.find(item => item.id === 'dessert-8')!;

    expect(pancake.ingredients.find(item => item.name === 'szódavíz')?.quantity).toBe(200);
    expect(ricePudding.ingredients.find(item => item.name === 'víz')?.quantity).toBe(200);
    expect(semolina.ingredients.find(item => item.name === 'gríz')?.quantity).toBe(80);
  });

  it('gives measurable egg-safety and cold-storage guidance for madártej', () => {
    const recipe = defaultRecipes.find(item => item.id === 'dessert-6')!;
    expect(recipe.description).toContain('82–84 °C');
    expect(recipe.description).toContain('hűtőbe');
    expect(ENGLISH_INSTRUCTIONS['dessert-6']).toContain('82–84 °C');
    expect(ENGLISH_INSTRUCTIONS['dessert-6']).toContain('refrigerate');
  });

  it('protects the bases of both fruit pies from excess juice', () => {
    for (const id of ['dessert-9', 'dessert-10']) {
      const recipe = defaultRecipes.find(item => item.id === id)!;
      expect(recipe.ingredients.find(item => item.name === 'zsemlemorzsa')?.quantity, id).toBe(30);
      expect(recipe.description, id).toContain('20×30 cm');
      expect(recipe.description, id).toContain('zsemlemorzsával');
    }
  });
});
