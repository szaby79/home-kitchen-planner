import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const migration = readFileSync(
  resolve(process.cwd(), 'supabase/migrations/20260911010000_create_family_settings.sql'),
  'utf8',
).toLowerCase();

describe('family settings migration security', () => {
  it('uses one UUID-owned JSON record with timestamps and RLS', () => {
    expect(migration).toContain('user_id uuid primary key references auth.users(id) on delete cascade');
    expect(migration).toContain('settings jsonb not null');
    expect(migration).toContain('created_at timestamptz not null default now()');
    expect(migration).toContain('updated_at timestamptz not null default now()');
    expect(migration).toContain('alter table public.family_settings enable row level security');
  });

  it('grants no anonymous access and scopes every operation to auth.uid()', () => {
    expect(migration).toContain('revoke all on table public.family_settings from anon');
    for (const operation of ['select', 'insert', 'update', 'delete']) {
      expect(migration).toContain(`for ${operation}`);
    }
    expect(migration.match(/\(select auth\.uid\(\)\) = user_id/g)).toHaveLength(5);
    expect(migration).not.toContain('to anon');
    expect(migration).not.toContain('to public');
  });
});
