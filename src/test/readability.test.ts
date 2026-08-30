import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync('src/index.css', 'utf8');
type RGB = [number, number, number];

function color(block: string, token: string): RGB {
  const match = block.match(new RegExp(`--${token}:\\s*([\\d.]+) ([\\d.]+)% ([\\d.]+)%`));
  if (!match) throw new Error(`Missing color: ${token}`);
  const h = Number(match[1]) / 30;
  const s = Number(match[2]) / 100;
  const l = Number(match[3]) / 100;
  const a = s * Math.min(l, 1 - l);
  return [0, 8, 4].map(n => {
    const k = (n + h) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  }) as RGB;
}

function blend(fg: RGB, bg: RGB, opacity: number): RGB {
  return fg.map((v, i) => v * opacity + bg[i] * (1 - opacity)) as RGB;
}

function contrast(a: RGB, b: RGB) {
  const luminance = (rgb: RGB) => rgb.map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

describe('readability color regression checks', () => {
  for (const selector of [':root', '.dark']) {
    const block = css.slice(css.indexOf(`${selector} {`)).split('}')[0];
    for (const surface of ['background', 'card', 'muted', 'secondary', 'popover']) {
      it(`${selector}: secondary text contrasts with ${surface}`, () => {
        expect(contrast(color(block, 'muted-foreground'), color(block, surface))).toBeGreaterThanOrEqual(4.5);
      });
    }
    it(`${selector}: text stays readable on tinted meal and status cards`, () => {
      for (const base of ['background', 'card']) {
        for (const [tint, opacity] of [['accent', 0.1], ['secondary', 0.2]] as const) {
          expect(contrast(color(block, 'muted-foreground'), blend(color(block, tint), color(block, base), opacity))).toBeGreaterThanOrEqual(4.5);
        }
      }
      expect(contrast(color(block, 'foreground'), blend(color(block, 'accent'), color(block, 'card'), 0.15))).toBeGreaterThanOrEqual(4.5);
    });
  }

  it('preserves the established light brand palette', () => {
    const block = css.slice(css.indexOf(':root {')).split('}')[0];
    expect(block).toContain('--background: 36 100% 97%');
    expect(block).toContain('--primary: 15 67% 54%');
    expect(block).toContain('--accent: 105 14% 48%');
  });

  it('gives native placeholders a fully opaque semantic color', () => {
    expect(css).toMatch(/input::placeholder, textarea::placeholder\s*\{\s*color: hsl\(var\(--muted-foreground\)\);\s*opacity: 1;/);
  });
});
