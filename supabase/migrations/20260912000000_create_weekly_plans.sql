begin;

create table public.weekly_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  menu_data jsonb not null,
  shopping_list jsonb not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint weekly_plans_menu_data_is_object check (jsonb_typeof(menu_data) = 'object'),
  constraint weekly_plans_shopping_list_is_object check (jsonb_typeof(shopping_list) = 'object'),
  constraint weekly_plans_one_record_per_user_week unique (user_id, week_start)
);

comment on table public.weekly_plans is 'One current Plan & Pan menu and linked shopping-list snapshot per user and calendar week.';
comment on column public.weekly_plans.menu_data is 'Stable recipe IDs, portions, batch days and leftover flags for the generated week.';
comment on column public.weekly_plans.shopping_list is 'Linked ingredient snapshot, manual items, checked item keys and notes.';

create index weekly_plans_user_week_history_idx
  on public.weekly_plans (user_id, week_start desc);

alter table public.weekly_plans enable row level security;

revoke all on table public.weekly_plans from anon;
revoke all on table public.weekly_plans from authenticated;
grant select, insert, update, delete on table public.weekly_plans to authenticated;

create policy "Users can read only their own weekly plans"
  on public.weekly_plans
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create only their own weekly plans"
  on public.weekly_plans
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update only their own weekly plans"
  on public.weekly_plans
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete only their own weekly plans"
  on public.weekly_plans
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create function public.set_weekly_plans_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger weekly_plans_set_updated_at
  before update on public.weekly_plans
  for each row execute function public.set_weekly_plans_updated_at();

commit;
