import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const sql = fs.readFileSync(path.resolve('supabase/migrations/20260912000000_create_weekly_plans.sql'), 'utf8').toLowerCase();

describe('weekly plans database migration', () => {
  it('creates one UUID-owned plan per user and week with linked JSON snapshots', () => {
    expect(sql).toContain('create table public.weekly_plans');
    expect(sql).toContain('id uuid primary key default gen_random_uuid()');
    expect(sql).toContain('references auth.users(id) on delete cascade');
    expect(sql).toContain('menu_data jsonb not null');
    expect(sql).toContain('shopping_list jsonb not null');
    expect(sql).toContain('unique (user_id, week_start)');
    expect(sql).toContain('weekly_plans_user_week_history_idx');
    expect(sql).toContain('weekly_plans_set_updated_at');
  });

  it('enables RLS and restricts every CRUD policy to auth.uid ownership', () => {
    expect(sql).toContain('alter table public.weekly_plans enable row level security');
    expect(sql).toContain('revoke all on table public.weekly_plans from anon');
    expect(sql.match(/create policy/g)).toHaveLength(4);
    expect(sql.match(/auth\.uid\(\)\) = user_id/g)).toHaveLength(5);
    expect(sql).not.toContain('using (true)');
    expect(sql).not.toContain('with check (true)');
  });
});
