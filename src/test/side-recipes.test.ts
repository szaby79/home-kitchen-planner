import { describe, expect, it } from 'vitest';
import { auditedSideIds } from '@/data/sideAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';

const sideIds = Array.from({ length: 10 }, (_, index) => `side-${index + 1}`);
const sides = defaultRecipes.filter(recipe => recipe.category === 'side');

describe('side dish quality audit', () => {
  it('covers every side dish with complete Hungarian and English instructions', () => {
    expect(auditedSideIds).toEqual(sideIds);
    expect(sides.map(recipe => recipe.id)).toEqual(sideIds);

    sides.forEach(recipe => {
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

  it('keeps water, rest time, and cooking method explicit for grains and pasta', () => {
    for (const id of ['side-3', 'side-5', 'side-10']) {
      expect(defaultRecipes.find(recipe => recipe.id === id)?.restingTime, id).toBeGreaterThanOrEqual(5);
    }
    expect(defaultRecipes.find(recipe => recipe.id === 'side-3')?.description).toContain('6 dl vízzel');
    expect(ENGLISH_INSTRUCTIONS['side-3']).toContain('600 ml water');
    expect(defaultRecipes.find(recipe => recipe.id === 'side-4')?.ingredients.some(item => item.name === 'olaj')).toBe(true);
    expect(defaultRecipes.find(recipe => recipe.id === 'side-4')?.description).toContain('ne legyen lisztes vagy nyers');
    expect(ENGLISH_INSTRUCTIONS['side-4']).toContain('should not look floury or raw');
  });

  it('uses one consistent method in Hungarian and English for vegetables and corn rice', () => {
    expect(defaultRecipes.find(recipe => recipe.id === 'side-8')?.description).toContain('széles serpenyőbe');
    expect(ENGLISH_INSTRUCTIONS['side-8']).toContain('wide pan');
    expect(defaultRecipes.find(recipe => recipe.id === 'side-10')?.description).toContain('főzd további 3 percig');
    expect(ENGLISH_INSTRUCTIONS['side-10']).toContain('cook for 3 more minutes');
  });

  it('marks the allergens declared by the audited ingredients', () => {
    expect(defaultRecipes.find(recipe => recipe.id === 'side-2')?.commonAllergens)
      .toEqual(expect.arrayContaining(['milk', 'lactose']));
    expect(defaultRecipes.find(recipe => recipe.id === 'side-4')?.commonAllergens)
      .toEqual(expect.arrayContaining(['gluten', 'egg']));
    expect(defaultRecipes.find(recipe => recipe.id === 'side-5')?.commonAllergens)
      .toEqual(expect.arrayContaining(['gluten', 'egg']));
    expect(defaultRecipes.find(recipe => recipe.id === 'side-9')?.commonAllergens).toEqual([]);
  });
});
