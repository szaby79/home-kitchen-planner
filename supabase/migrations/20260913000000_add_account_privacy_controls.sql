begin;

create table public.privacy_notice_acceptances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  notice_version text not null,
  accepted_at timestamptz not null,
  created_at timestamptz not null default now(),
  constraint privacy_notice_acceptances_version_length check (char_length(notice_version) between 1 and 64),
  constraint privacy_notice_acceptances_one_per_version unique (user_id, notice_version)
);

comment on table public.privacy_notice_acceptances is 'Minimal audit history of privacy notices explicitly accepted by each Plan & Pan user.';

create index privacy_notice_acceptances_user_date_idx
  on public.privacy_notice_acceptances (user_id, accepted_at desc);

alter table public.privacy_notice_acceptances enable row level security;

revoke all on table public.privacy_notice_acceptances from anon;
revoke all on table public.privacy_notice_acceptances from authenticated;
grant select on table public.privacy_notice_acceptances to authenticated;

create policy "Users can read only their own privacy acceptances"
  on public.privacy_notice_acceptances
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

insert into public.privacy_notice_acceptances (user_id, notice_version, accepted_at)
select id, privacy_notice_version, privacy_notice_accepted_at
from public.profiles
where privacy_notice_version is not null
  and privacy_notice_accepted_at is not null
on conflict (user_id, notice_version) do nothing;

create function public.record_privacy_notice_acceptance()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.privacy_notice_version is not null and new.privacy_notice_accepted_at is not null then
    insert into public.privacy_notice_acceptances (user_id, notice_version, accepted_at)
    values (new.id, new.privacy_notice_version, new.privacy_notice_accepted_at)
    on conflict (user_id, notice_version) do nothing;
  end if;
  return new;
end;
$$;

revoke all on function public.record_privacy_notice_acceptance() from public;

create trigger profiles_record_privacy_notice_acceptance
  after insert or update of privacy_notice_version, privacy_notice_accepted_at on public.profiles
  for each row execute function public.record_privacy_notice_acceptance();

create function public.delete_my_plan_pan_data()
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if (select auth.uid()) is null then
    raise exception 'authentication required';
  end if;

  delete from public.weekly_plans where user_id = (select auth.uid());
  delete from public.family_settings where user_id = (select auth.uid());
end;
$$;

revoke all on function public.delete_my_plan_pan_data() from public;
grant execute on function public.delete_my_plan_pan_data() to authenticated;

commit;
