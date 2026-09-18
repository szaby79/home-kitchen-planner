import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

function migration(name: string) {
  return readFileSync(resolve(process.cwd(), 'supabase', 'migrations', name), 'utf8')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

describe('Supabase ownership boundaries', () => {
  it.each([
    ['family_settings', '20260911010000_create_family_settings.sql'],
    ['weekly_plans', '20260912000000_create_weekly_plans.sql'],
  ])('keeps %s RLS enabled and binds every write to auth.uid()', (table, file) => {
    const sql = migration(file);
    expect(sql).toContain(`alter table public.${table} enable row level security`);
    expect(sql).toContain(`revoke all on table public.${table} from anon`);
    expect(sql).toMatch(/using \(\(select auth\.uid\(\)\) = user_id\)/);
    expect(sql).toMatch(/with check \(\(select auth\.uid\(\)\) = user_id\)/);
    expect(sql).toContain('references auth.users(id) on delete cascade');
  });

  it('keeps profiles owner-scoped and unavailable to anonymous users', () => {
    const sql = migration('20260911000000_create_profiles.sql');
    expect(sql).toContain('alter table public.profiles enable row level security');
    expect(sql).toContain('revoke all on table public.profiles from anon');
    expect(sql).toMatch(/using \(\(select auth\.uid\(\)\) = id\)/);
    expect(sql).toMatch(/with check \(\(select auth\.uid\(\)\) = id\)/);
  });
});
