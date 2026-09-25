import { describe, expect, it } from 'vitest';
import { auditedMainIds } from '@/data/mainAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { DEFAULT_MENU_PREFERENCES, FoodRestriction } from '@/types/recipe';

const auditedMains = defaultRecipes.filter(recipe => auditedMainIds.includes(recipe.id));

describe('main recipe quality audit batch one', () => {
  it('covers main-1 through main-15 once with equivalent bilingual step counts', () => {
    expect(auditedMainIds).toEqual(Array.from({ length: 15 }, (_, index) => `main-${index + 1}`));
    expect(auditedMains).toHaveLength(15);

    auditedMains.forEach(recipe => {
      const hungarianSteps = recipe.description.match(/^\d+\./gm)?.length ?? 0;
      const englishSteps = ENGLISH_INSTRUCTIONS[recipe.id]?.match(/^\d+\./gm)?.length ?? 0;
      expect(hungarianSteps, recipe.id).toBeGreaterThanOrEqual(5);
      expect(hungarianSteps, recipe.id).toBeLessThanOrEqual(8);
      expect(englishSteps, recipe.id).toBe(hungarianSteps);
      expect(recipe.qualityAuditStatus, recipe.id).toBe('code-reviewed');
    });
  });

  it('stores complete elapsed time including chilling and resting', () => {
    auditedMains.forEach(recipe => {
      expect(recipe.preparationTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.restingTime, recipe.id).toBeGreaterThanOrEqual(0);
      expect(recipe.totalTime, recipe.id)
        .toBe(recipe.preparationTime! + recipe.cookingTime! + recipe.restingTime!);
    });

    const byId = Object.fromEntries(auditedMains.map(recipe => [recipe.id, recipe]));
    expect(byId['main-3'].totalTime).toBe(60);
    expect(byId['main-6'].totalTime).toBe(180);
    expect(byId['main-10'].totalTime).toBe(135);
    expect(byId['main-15'].totalTime).toBe(115);
  });

  it('does not call frying, stuffing, or long braising easy', () => {
    expect(auditedMains.filter(recipe => recipe.difficulty === 'easy').map(recipe => recipe.id))
      .toEqual(['main-8', 'main-12']);
  });

  it.each<FoodRestriction>(['gluten', 'milk', 'lactose', 'egg'])(
    'blocks audited mains explicitly carrying the %s restriction',
    restriction => {
      const affected = auditedMains.filter(recipe => recipe.commonAllergens?.includes(restriction));
      expect(affected.length, restriction).toBeGreaterThan(0);
      affected.forEach(recipe => expect(recipeMatchesSafetyPreferences(recipe, {
        ...DEFAULT_MENU_PREFERENCES,
        allergies: [restriction],
      }), recipe.id).toBe(false));
    },
  );

  it('keeps the corrected four-person casserole and filling ratios', () => {
    const byId = Object.fromEntries(auditedMains.map(recipe => [recipe.id, recipe]));
    const quantity = (id: string, ingredient: string) => byId[id].ingredients.find(item => item.name === ingredient)?.quantity;

    expect(quantity('main-8', 'burgonya')).toBe(800);
    expect(quantity('main-8', 'kolbász')).toBe(200);
    expect(quantity('main-9', 'rizs')).toBe(150);
    expect(quantity('main-10', 'rizs')).toBe(100);
    expect(quantity('main-11', 'rizs')).toBe(100);
  });

  it('includes cabbage leaves for rolls and flexible pickle serving guidance', () => {
    const stuffedCabbage = auditedMains.find(recipe => recipe.id === 'main-10')!;
    expect(stuffedCabbage.ingredients).toContainEqual({ name: 'savanyú káposztalevél', quantity: 8, unit: 'db' });

    const brassoi = auditedMains.find(recipe => recipe.id === 'main-13')!;
    expect(brassoi.description).toContain('méretétől függ');
    expect(ENGLISH_INSTRUCTIONS['main-13']).toContain('depending on their size');
  });
});
