import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const sql = fs.readFileSync(path.resolve('supabase/migrations/20260913000000_add_account_privacy_controls.sql'), 'utf8').toLowerCase();
const historicalSql = [
  'supabase/migrations/20260911000000_create_profiles.sql',
  'supabase/migrations/20260911010000_create_family_settings.sql',
  'supabase/migrations/20260912000000_create_weekly_plans.sql',
].map(file => fs.readFileSync(path.resolve(file), 'utf8').toLowerCase()).join('\n');

describe('account privacy database migration', () => {
  it('preserves owner-readable acceptance history with RLS and cascade deletion', () => {
    expect(sql).toContain('create table public.privacy_notice_acceptances');
    expect(sql).toContain('references auth.users(id) on delete cascade');
    expect(sql).toContain('unique (user_id, notice_version)');
    expect(sql).toContain('enable row level security');
    expect(sql).toContain('using ((select auth.uid()) = user_id)');
    expect(sql).toContain('grant select on table public.privacy_notice_acceptances to authenticated');
    expect(sql).not.toContain('grant insert');
  });

  it('deletes saved data transactionally using only auth.uid ownership', () => {
    expect(sql).toContain('create function public.delete_my_plan_pan_data()');
    expect(sql).toContain('security invoker');
    expect(sql).toContain('delete from public.weekly_plans where user_id = (select auth.uid())');
    expect(sql).toContain('delete from public.family_settings where user_id = (select auth.uid())');
    expect(sql).not.toMatch(/delete_my_plan_pan_data\([^)]*(user|uuid|id)/);
  });

  it('keeps every existing user-owned table attached to auth deletion cascade', () => {
    expect(historicalSql.match(/references auth\.users\(id\) on delete cascade/g)).toHaveLength(3);
  });
});
