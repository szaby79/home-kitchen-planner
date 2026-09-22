import { describe, expect, it } from 'vitest';
import { isKetoRecipe, isVegetarianRecipe, isVeganRecipe, recipeAllergens, recipeMatchesSafetyPreferences } from '@/lib/menuPreferences';
import { normalizePreferences } from '@/lib/menuPreferencesValidation';
import { DEFAULT_MENU_PREFERENCES, type Recipe } from '@/types/recipe';

const recipe = (overrides: Partial<Recipe> = {}): Recipe => ({
  id: 'test-recipe',
  name: 'Tesztétel',
  category: 'main',
  mealType: 'both',
  ingredients: [{ name: 'zöldségkeverék', quantity: 500, unit: 'g' }],
  description: '1. Készítsd elő.\n\n2. Keverd össze.\n\n3. Főzd meg.\n\n4. Ellenőrizd.\n\n5. Tálald.',
  defaultServings: 4,
  note: '',
  imageUrl: '',
  ...overrides,
});

describe('dietary and allergen metadata foundation', () => {
  it('accepts keto as a persisted diet preference before the UI is released', () => {
    expect(normalizePreferences({ ...DEFAULT_MENU_PREFERENCES, diet: 'keto' })?.diet).toBe('keto');
  });

  it('requires an explicit keto classification', () => {
    expect(isKetoRecipe(recipe())).toBe(false);
    expect(isKetoRecipe(recipe({ keto: true }))).toBe(true);
  });

  it('uses explicit vegan metadata instead of guessing from the title', () => {
    expect(isVeganRecipe(recipe({ vegan: false }))).toBe(false);
    expect(isVeganRecipe(recipe({ vegan: true, name: 'Hagyományos családi étel' }))).toBe(true);
    expect(isVegetarianRecipe(recipe({ vegan: true }))).toBe(true);
  });

  it('combines declared allergens with legacy ingredient detection', () => {
    const tagged = recipe({ commonAllergens: ['soy'] });
    expect(recipeAllergens(tagged)).toContain('soy');
    expect(recipeMatchesSafetyPreferences(tagged, { ...DEFAULT_MENU_PREFERENCES, allergies: ['soy'] })).toBe(false);

    const legacy = recipe({ ingredients: [{ name: 'tejföl', quantity: 200, unit: 'ml' }] });
    expect(recipeAllergens(legacy)).toContain('milk');
  });

  it('allows only explicitly keto recipes in a keto plan', () => {
    expect(recipeMatchesSafetyPreferences(recipe({ keto: true }), { ...DEFAULT_MENU_PREFERENCES, diet: 'keto' })).toBe(true);
    expect(recipeMatchesSafetyPreferences(recipe(), { ...DEFAULT_MENU_PREFERENCES, diet: 'keto' })).toBe(false);
  });
});
