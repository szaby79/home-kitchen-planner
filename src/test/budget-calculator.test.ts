import { describe, expect, it } from 'vitest';
import { estimateShoppingList, priceShoppingItem } from '@/lib/budgetCalculator';
import { defaultRecipes } from '@/data/recipes';
import { estimateRecipe } from '@/lib/budgetCalculator';

describe('budget calculator', () => {
  it('uses the published StatCan chicken breast price proportionally', () => {
    const item = priceShoppingItem({ name: 'csirkemell', quantity: 600, unit: 'g', checked: false });
    expect(item.cost).toBeCloseTo(8.778, 3);
    expect(item.source).toBe('statcan');
  });

  it('converts a number of eggs from the dozen price', () => {
    const item = priceShoppingItem({ name: 'tojás', quantity: 6, unit: 'db', checked: false });
    expect(item.cost).toBeCloseTo(2.44, 2);
  });

  it('keeps estimated products separate from StatCan-priced products', () => {
    const result = estimateShoppingList([
      { name: 'csirkemell', quantity: 1000, unit: 'g', checked: false },
      { name: 'trappista sajt', quantity: 500, unit: 'g', checked: false },
    ]);

    expect(result.total).toBeCloseTo(23.63, 2);
    expect(result.statcanCoverage).toBeGreaterThan(50);
    expect(result.statcanCoverage).toBeLessThan(100);
  });

  it('produces a finite positive estimate for every built-in recipe', () => {
    defaultRecipes.forEach(recipe => {
      const cost = estimateRecipe(recipe, recipe.defaultServings);
      expect(Number.isFinite(cost), recipe.name).toBe(true);
      expect(cost, recipe.name).toBeGreaterThan(0);
      expect(cost, recipe.name).toBeLessThan(250);
    });
  });
});
