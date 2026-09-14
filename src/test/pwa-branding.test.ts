import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Plan & Pan PWA branding', () => {
  it('publishes the manifest and iOS/Android icon metadata', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
    expect(html).toContain('rel="manifest" href="/manifest.webmanifest"');
    expect(html).toContain('apple-mobile-web-app-title" content="Plan & Pan"');
    expect(html).toContain('rel="apple-touch-icon" href="/plan-and-pan-app-icon.png"');
    expect(html).not.toMatch(/Lovable App|lovable\.dev/i);
  });

  it('uses the Plan & Pan name and icon in the web-app manifest', () => {
    const manifest = JSON.parse(readFileSync(resolve(process.cwd(), 'public/manifest.webmanifest'), 'utf8'));
    expect(manifest.short_name).toBe('Plan & Pan');
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons).toContainEqual(expect.objectContaining({
      src: '/plan-and-pan-app-icon.png',
      type: 'image/png',
    }));
  });
});
