import { describe, expect, it } from 'vitest';
import { defaultRecipes } from '@/data/recipes';
import { localizeRecipe } from '@/i18n/recipeLocalization';
import { splitRecipeSteps } from '@/lib/recipeSteps';

describe('Catalogue narration coverage', () => {
  it.each([false, true])('preserves every instruction within the server limit (English: %s)', english => {
    expect(defaultRecipes).toHaveLength(148);
    for (const recipe of defaultRecipes) {
      const description = localizeRecipe(recipe, english).description;
      const steps = splitRecipeSteps(description);
      expect(steps.length, recipe.id).toBeGreaterThan(1);
      for (const step of steps) {
        expect(step.length, recipe.id).toBeGreaterThan(0);
        expect(step.length, recipe.id).toBeLessThanOrEqual(1200);
      }
      // No directions or safety notes may disappear during step extraction.
      const withoutNumbers = description.replace(/(^|\n)[ \t]*\d+\.[ \t]+/g, '$1');
      expect(steps.join(' ').replace(/\s+/g, ' ').trim(), recipe.id)
        .toBe(withoutNumbers.replace(/\s+/g, ' ').trim());
    }
  });

  it('keeps a trailing caution with the final numbered step', () => {
    expect(splitRecipeSteps('1. First.\n\n2. Second.\n\nCaution: hot!'))
      .toEqual(['First.', 'Second.\n\nCaution: hot!']);
  });

  it('supports a non-numbered custom description', () => {
    expect(splitRecipeSteps('  Mix and serve.  ')).toEqual(['Mix and serve.']);
  });

  it('splits single-newline and Windows lists without splitting decimal quantities', () => {
    expect(splitRecipeSteps('1. Add 1.5 litres.\r\n2. Stir.\r\n3. Serve.'))
      .toEqual(['Add 1.5 litres.', 'Stir.', 'Serve.']);
  });

  it('retains an introduction before a numbered list', () => {
    expect(splitRecipeSteps('Prepare the ingredients.\n1. Mix.\n2. Serve.'))
      .toEqual(['Prepare the ingredients.', 'Mix.', 'Serve.']);
  });
});
