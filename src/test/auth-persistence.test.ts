import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Supabase email OTP session configuration', () => {
  it('keeps browser and installed-PWA sessions persistent', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/lib/supabase.ts'), 'utf8');

    expect(source).toContain('persistSession: true');
    expect(source).toContain('autoRefreshToken: true');
  });

  it('uses in-app email OTP verification without a redirect dependency', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/auth/AuthProvider.tsx'), 'utf8');

    expect(source).toContain('supabase.auth.signInWithOtp');
    expect(source).toContain('supabase.auth.verifyOtp');
    expect(source).toContain("type: 'email'");
    expect(source).not.toContain('emailRedirectTo');
  });
});
