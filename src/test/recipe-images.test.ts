import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { defaultRecipes } from '@/data/recipes';

describe('default recipe images', () => {
  it('assigns one bundled image to each of the 70 recipes', () => {
    expect(defaultRecipes).toHaveLength(70);
    expect(new Set(defaultRecipes.map(recipe => recipe.id)).size).toBe(70);

    for (const recipe of defaultRecipes) {
      expect(recipe.imageUrl).toBe(`/recipes/${recipe.id}.webp`);
      expect(
        existsSync(resolve(process.cwd(), 'public', recipe.imageUrl.slice(1))),
        `Missing image for ${recipe.name}`,
      ).toBe(true);
    }
  });
});
