import { describe, expect, it } from 'vitest';
import { auditedStewIds } from '@/data/stewAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';

const batchTwoIds = [
  ...Array.from({ length: 6 }, (_, index) => `main-${index + 51}`),
  ...Array.from({ length: 9 }, (_, index) => `main-${index + 82}`),
];
const batchTwoStews = defaultRecipes.filter(recipe => batchTwoIds.includes(recipe.id));

describe('stew quality audit batch two', () => {
  it('covers the remaining 15 stews with matching Hungarian and English steps', () => {
    expect(auditedStewIds.filter(id => batchTwoIds.includes(id))).toEqual(batchTwoIds);
    expect(batchTwoStews.map(recipe => recipe.id)).toEqual(batchTwoIds);
    expect(auditedStewIds).toHaveLength(30);
    expect(defaultRecipes.filter(recipe => recipe.category === 'stew')).toHaveLength(auditedStewIds.length);

    batchTwoStews.forEach(recipe => {
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

  it('uses measurable doneness checks for pork, chicken, meatloaf, and meatballs', () => {
    for (const id of ['main-51', 'main-55', 'main-56', 'main-82', 'main-84', 'main-90']) {
      expect(defaultRecipes.find(recipe => recipe.id === id)?.description, id).toContain('71 °C');
      expect(ENGLISH_INSTRUCTIONS[id], id).toContain('71 °C');
    }
    expect(defaultRecipes.find(recipe => recipe.id === 'main-86')?.description).toContain('74 °C');
    expect(ENGLISH_INSTRUCTIONS['main-86']).toContain('74 °C');
    for (const id of ['main-83', 'main-88']) {
      expect(defaultRecipes.find(recipe => recipe.id === id)?.description, id).toContain('63 °C');
      expect(ENGLISH_INSTRUCTIONS[id], id).toContain('63 °C');
    }
  });

  it('corrects oversized portions, missing meatball ingredients, and misleading preparation', () => {
    const potatoPatties = defaultRecipes.find(recipe => recipe.id === 'main-51')!;
    const legacyBeans = defaultRecipes.find(recipe => recipe.id === 'main-52')!;
    const savoyPatties = defaultRecipes.find(recipe => recipe.id === 'main-56')!;
    const beans = defaultRecipes.find(recipe => recipe.id === 'main-85')!;
    const lentils = defaultRecipes.find(recipe => recipe.id === 'main-88')!;
    const meatballs = defaultRecipes.find(recipe => recipe.id === 'main-90')!;

    expect(potatoPatties.ingredients.find(item => item.name === 'olaj')?.quantity).toBe(2);
    expect(legacyBeans.ingredients.find(item => item.name === 'szárazbab')?.quantity).toBe(300);
    expect(legacyBeans.restingTime).toBe(480);
    expect(savoyPatties.ingredients.find(item => item.name === 'olaj')?.quantity).toBe(2);
    expect(beans.ingredients.find(item => item.name === 'tarkabab')?.quantity).toBe(300);
    expect(beans.restingTime).toBe(480);
    expect(beans.cookingTime).toBeGreaterThanOrEqual(150);
    expect(lentils.ingredients.find(item => item.name === 'lencse')?.quantity).toBe(250);
    expect(lentils.description).toContain('nem szükséges előre beáztatni');
    expect(ENGLISH_INSTRUCTIONS['main-88']).toContain('do not need soaking');
    expect(meatballs.ingredients.map(item => item.name)).toEqual(expect.arrayContaining(['vöröshagyma', 'só']));
    expect(meatballs.description).toContain('a rizs pedig legyen teljesen puha');
    expect(ENGLISH_INSTRUCTIONS['main-90']).toContain('rice should be completely tender');
  });

  it('marks the declared allergens and keeps mustard visible in both languages', () => {
    expect(defaultRecipes.find(recipe => recipe.id === 'main-82')?.commonAllergens)
      .toEqual(expect.arrayContaining(['gluten', 'egg']));
    expect(defaultRecipes.find(recipe => recipe.id === 'main-84')?.commonAllergens)
      .toEqual(expect.arrayContaining(['milk', 'lactose', 'gluten', 'egg']));
    const lentils = defaultRecipes.find(recipe => recipe.id === 'main-88')!;
    expect(lentils.ingredients.some(item => item.name === 'mustár')).toBe(true);
    expect(localizeRecipe(lentils, true).ingredients.some(item => item.name === 'mustard')).toBe(true);
  });
});
