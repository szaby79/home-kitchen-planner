import { describe, expect, it } from 'vitest';
import { auditedMainIds } from '@/data/mainAudit';
import { defaultRecipes } from '@/data/recipes';
import { ENGLISH_INSTRUCTIONS } from '@/i18n/englishInstructions';
import { localizeRecipe } from '@/i18n/recipeLocalization';
import { recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { DEFAULT_MENU_PREFERENCES, FoodRestriction } from '@/types/recipe';

const batchFourIds = ['main-50', ...Array.from({ length: 14 }, (_, index) => `main-${index + 57}`)];
const batchFourMains = defaultRecipes.filter(recipe => batchFourIds.includes(recipe.id));

describe('main recipe quality audit batch four', () => {
  it('covers the next 15 actual main dishes and skips the separate stew category', () => {
    expect(auditedMainIds.slice(45, 60)).toEqual(batchFourIds);
    expect(batchFourMains).toHaveLength(15);

    batchFourMains.forEach(recipe => {
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

  it('stores complete elapsed time for a normal home cook', () => {
    batchFourMains.forEach(recipe => {
      expect(recipe.preparationTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.cookingTime, recipe.id).toBeGreaterThan(0);
      expect(recipe.restingTime, recipe.id).toBeGreaterThanOrEqual(0);
      expect(recipe.totalTime, recipe.id)
        .toBe(recipe.preparationTime! + recipe.cookingTime! + recipe.restingTime!);
    });

    const byId = Object.fromEntries(batchFourMains.map(recipe => [recipe.id, recipe]));
    expect(byId['main-58'].totalTime).toBe(150);
    expect(byId['main-65'].totalTime).toBe(190);
    expect(byId['main-66'].totalTime).toBe(250);
    expect(byId['main-70'].totalTime).toBe(170);
  });

  it.each<FoodRestriction>(['gluten', 'milk', 'lactose', 'egg', 'fish'])(
    'blocks audited mains explicitly carrying the %s restriction',
    restriction => {
      const affected = batchFourMains.filter(recipe => recipe.commonAllergens?.includes(restriction));
      expect(affected.length, restriction).toBeGreaterThan(0);
      affected.forEach(recipe => expect(recipeMatchesSafetyPreferences(recipe, {
        ...DEFAULT_MENU_PREFERENCES,
        allergies: [restriction],
      }), recipe.id).toBe(false));
    },
  );

  it('uses measurable poultry safety checks in both languages', () => {
    for (const id of ['main-58', 'main-64']) {
      const recipe = batchFourMains.find(item => item.id === id)!;
      expect(recipe.description).toContain('74 °C');
      expect(ENGLISH_INSTRUCTIONS[id]).toContain('74 °C');
    }
    expect(batchFourMains.find(item => item.id === 'main-64')!.description)
      .toContain('a szín önmagában nem biztos jel');
  });

  it('aligns the fish methods and preserves the small-bone warning', () => {
    const catfish = batchFourMains.find(recipe => recipe.id === 'main-60')!;
    expect(catfish.ingredients.find(item => item.name === 'tejföl')?.quantity).toBe(300);
    expect(catfish.description).toContain('maradék 150 ml tejföllel');
    expect(ENGLISH_INSTRUCTIONS['main-60']).toContain('remaining 150 ml sour cream');

    const carp = batchFourMains.find(recipe => recipe.id === 'main-61')!;
    expect(carp.description).toContain('Fedd le, és süsd 25 percig');
    expect(ENGLISH_INSTRUCTIONS['main-61']).toContain('Cover and bake for 25 minutes');
    expect(carp.description).toContain('apró szálka');
    expect(ENGLISH_INSTRUCTIONS['main-61']).toContain('small bones may remain');
  });

  it('does not promise unlisted fixed side dishes', () => {
    const byId = Object.fromEntries(batchFourMains.map(recipe => [recipe.id, recipe]));
    expect(byId['main-62'].description).not.toContain('Főtt rizzsel vagy tarhonyával');
    expect(byId['main-63'].description).not.toContain('Rizzsel tálald');
    expect(byId['main-65'].description).not.toContain('Főtt burgonyával és savanyúsággal');
    expect(byId['main-66'].description).not.toContain('Főtt burgonyával tálald');
    expect(byId['main-69'].description).not.toContain('Nokedlivel tálald');
  });

  it('retains realistic long cooking and enough measured salt', () => {
    const byId = Object.fromEntries(batchFourMains.map(recipe => [recipe.id, recipe]));
    const quantity = (id: string, ingredient: string) => byId[id].ingredients.find(item => item.name === ingredient)?.quantity;

    expect(quantity('main-50', 'só')).toBe(1.5);
    expect(quantity('main-57', 'só')).toBe(2);
    expect(quantity('main-60', 'só')).toBe(2);
    expect(quantity('main-61', 'só')).toBe(2);
    expect(quantity('main-67', 'só')).toBe(2.5);
    expect(byId['main-63'].description).toContain('45–55 percig');
    expect(ENGLISH_INSTRUCTIONS['main-63']).toContain('45–55 minutes');
    expect(byId['main-67'].description).toContain('2,5–3 órán át');
    expect(ENGLISH_INSTRUCTIONS['main-67']).toContain('2.5–3 hours');
  });
});
