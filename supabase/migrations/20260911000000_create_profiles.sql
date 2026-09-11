begin;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  privacy_notice_version text,
  privacy_notice_accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_privacy_notice_version_length check (
    privacy_notice_version is null or char_length(privacy_notice_version) <= 64
  )
);

comment on table public.profiles is 'Minimal Plan & Pan account profile. Authentication credentials remain in Supabase Auth.';
comment on column public.profiles.privacy_notice_version is 'Version of the beta privacy notice explicitly accepted during account access.';

alter table public.profiles enable row level security;

revoke all on table public.profiles from anon;
revoke all on table public.profiles from authenticated;
grant select on table public.profiles to authenticated;
grant update (privacy_notice_version, privacy_notice_accepted_at, updated_at) on table public.profiles to authenticated;

create policy "Users can read only their own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can update only their own profile"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create function public.set_profile_updated_at()
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

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_profile_updated_at();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  accepted_version text;
begin
  accepted_version := nullif(new.raw_user_meta_data ->> 'privacy_notice_version', '');

  insert into public.profiles (
    id,
    privacy_notice_version,
    privacy_notice_accepted_at
  ) values (
    new.id,
    accepted_version,
    case when accepted_version is not null then now() else null end
  );

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

commit;

