import { FOOD_PRICE_RULES, FoodPriceRule } from '@/data/foodPrices';
import { Ingredient, Recipe, ShoppingItem } from '@/types/recipe';

const PIECE_WEIGHTS: Record<string, number> = {
  alma: 180, banán: 120, burgonya: 180, paradicsom: 140, paprika: 160, kenyér: 35,
  hagyma: 120, citrom: 100, tojás: 55, uborka: 350, avokádó: 180,
};

function normalize(value: string) {
  return value.toLocaleLowerCase('hu').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function findRule(name: string): FoodPriceRule | undefined {
  const normalizedName = normalize(name);
  return FOOD_PRICE_RULES.find(rule => rule.patterns.some(pattern => {
    const normalizedPattern = normalize(pattern);
    return normalizedPattern.length <= 3
      ? normalizedName === normalizedPattern
      : normalizedName.includes(normalizedPattern);
  }));
}

function estimatedUnitCost(item: Pick<ShoppingItem, 'name' | 'quantity' | 'unit'>, rule?: FoodPriceRule): number {
  const unit = normalize(item.unit);
  const name = normalize(item.name);
  if (!rule) {
    if (unit === 'g') return item.quantity * 0.006;
    if (unit === 'ml') return item.quantity * 0.003;
    if (unit === 'kg') return item.quantity * 6;
    return item.quantity * 0.35;
  }

  let normalizedQuantity = item.quantity;
  if (unit === 'kg') normalizedQuantity *= 1000;
  if (unit === 'l') normalizedQuantity *= 1000;

  if (rule.unit === 'g' && !['g', 'kg'].includes(unit)) {
    if (unit === 'ml' || unit === 'l') {
      // For a planning estimate, liquid dairy and sauces use roughly 1 g/ml.
    } else if (unit === 'ek' || unit === 'tk') {
      normalizedQuantity *= unit === 'ek' ? 15 : 5;
    } else {
      const pieceWeight = Object.entries(PIECE_WEIGHTS).find(([key]) => name.includes(key))?.[1] ?? 100;
      normalizedQuantity *= pieceWeight;
    }
  }
  if (rule.unit === 'ml' && !['ml', 'l'].includes(unit)) normalizedQuantity *= unit === 'ek' ? 15 : unit === 'tk' ? 5 : 250;
  if (rule.unit === 'db' && unit !== 'db') normalizedQuantity = item.quantity;

  return (normalizedQuantity / rule.quantity) * rule.price;
}

export interface PricedItem extends ShoppingItem {
  cost: number;
  source: 'statcan' | 'estimate';
}

export function priceShoppingItem(item: ShoppingItem): PricedItem {
  const rule = findRule(item.name);
  return {
    ...item,
    cost: estimatedUnitCost(item, rule),
    source: rule?.source ?? 'estimate',
  };
}

export function estimateShoppingList(items: ShoppingItem[]) {
  const pricedItems = items.map(priceShoppingItem);
  const total = pricedItems.reduce((sum, item) => sum + item.cost, 0);
  const statcanCost = pricedItems.filter(item => item.source === 'statcan').reduce((sum, item) => sum + item.cost, 0);
  return { pricedItems, total, statcanCoverage: total > 0 ? (statcanCost / total) * 100 : 0 };
}

export function estimateRecipe(recipe: Recipe, servings: number) {
  const multiplier = servings / recipe.defaultServings;
  const items: ShoppingItem[] = recipe.ingredients.map((ingredient: Ingredient) => ({
    ...ingredient,
    quantity: ingredient.quantity * multiplier,
    checked: false,
  }));
  return estimateShoppingList(items).total;
}
