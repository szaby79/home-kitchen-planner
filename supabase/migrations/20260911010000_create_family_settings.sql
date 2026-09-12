begin;

create table public.family_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  settings jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint family_settings_settings_is_object check (jsonb_typeof(settings) = 'object')
);

comment on table public.family_settings is 'One minimal menu-generation settings record per Plan & Pan user.';
comment on column public.family_settings.settings is 'Existing family size, diet, restrictions, dislikes, meal styles, cooking time and batch preferences.';

alter table public.family_settings enable row level security;

revoke all on table public.family_settings from anon;
revoke all on table public.family_settings from authenticated;
grant select, insert, update, delete on table public.family_settings to authenticated;

create policy "Users can read only their own family settings"
  on public.family_settings
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create only their own family settings"
  on public.family_settings
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update only their own family settings"
  on public.family_settings
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete only their own family settings"
  on public.family_settings
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create function public.set_family_settings_updated_at()
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

create trigger family_settings_set_updated_at
  before update on public.family_settings
  for each row execute function public.set_family_settings_updated_at();

commit;
