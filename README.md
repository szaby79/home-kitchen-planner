# Plan & Pan

Plan & Pan is a bilingual Hungarian/English family meal planner. Version 1.36.0 adds a clean automated release gate, restores the batch-cooking preference, and documents the remaining real-device checks.

## Tervezett PR-sorozat

- PR #31 / v1.31 – felhasználói adatbázis-alap (kész)
- PR #32 / v1.32 – recept- és ételfotó-audit (kész)
- PR #33 / v1.33 – családi beállítások mentése (kész)
- PR #34 / v1.34 – heti menük és bevásárlólisták mentése (kész)
- PR #35 / v1.35 – fiók- és adatvédelmi vezérlők (kézi ellenőrzésre vár)
- PR #36 / v1.36 – stabilizáció és automatikus kiadási ellenőrzések (folyamatban)
- Ezután: keto étrend mód (a következő szabad PR-számmal)

## Local development

Requirements: Node.js 22 or newer and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The local app runs at `http://localhost:8080`. If the Supabase variables are missing, account sign-in displays a friendly unavailable state and the rest of the app continues in guest mode.

Available checks:

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

The same commands run automatically for pull requests through `.github/workflows/ci.yml`. Real-device and configured-cloud checks remain explicit manual gates in [`docs/RELEASE_TESTING.md`](docs/RELEASE_TESTING.md); in particular, PR #34 shopping-list synchronization is not considered manually verified yet.

## Supabase Free setup for v1.31–v1.35

1. Create or select the Plan & Pan project in Supabase.
2. Apply the committed migrations in filename order:
   - `supabase/migrations/20260911000000_create_profiles.sql`
   - `supabase/migrations/20260911010000_create_family_settings.sql`
   - `supabase/migrations/20260912000000_create_weekly_plans.sql`
   - `supabase/migrations/20260913000000_add_account_privacy_controls.sql`
   Open **SQL Editor**, create a new query for each unapplied migration, paste its complete contents, and run it once. If the project is linked to the Supabase CLI instead, run `supabase db push` from this repository.
3. In **Authentication → Providers → Email**, keep email authentication enabled. The current UI uses passwordless magic links; no telephone number or application password is collected.
4. In **Authentication → URL Configuration**, configure the URLs below.
5. In **Project Settings → API Keys**, copy the project URL and the browser-safe publishable key. Do not use a secret key or the legacy service-role key.

### Authentication redirect URLs

Keep the three environments separate:

| Environment | Supabase URL configuration |
| --- | --- |
| Local | Add `http://localhost:8080/**` as an additional redirect URL. |
| Vercel Preview | Add `https://*-YOUR_VERCEL_SCOPE.vercel.app/**`, replacing the placeholder with the team or account scope used by this project. |
| Production | Set the **Site URL** to the canonical production address and add `https://YOUR_PRODUCTION_DOMAIN/**` as an additional redirect URL. |

Do not add an unrestricted `https://**` wildcard. The application passes the current origin as the magic-link destination, so every legitimate local, preview, and production origin must be allow-listed.

### Required public environment variables

Create these values in `.env.local` for local development and in **Vercel → Project Settings → Environment Variables** for Preview and Production:

```text
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_placeholder_key
```

These two values are intended for browser use. Row Level Security remains the authorization boundary. Never create a `VITE_` variable containing a secret, `sb_secret_...`, or service-role key.

After adding or changing Vercel variables, redeploy the affected environment.

### Test-email limitation

Supabase's built-in test email sender only delivers to pre-authorized project-team addresses and is currently limited to two messages per hour. Before inviting the 5–8 external beta testers, configure a free-tier custom SMTP provider in **Authentication → Email → SMTP Settings**, or limit the first test to authorized team addresses. No paid email service is required by the code and none is added in v1.31.

## Data and security model

- Authentication credentials stay exclusively in Supabase Auth; passwords are not requested or copied into `public` tables.
- `public.profiles` stores only a user UUID, privacy-notice acceptance metadata, and timestamps.
- `public.family_settings` stores one JSON settings object per authenticated user, containing only the existing menu-generation preferences and timestamps. Its UUID primary key is also the owner-lookup index.
- `public.weekly_plans` stores one UUID-addressed active menu per user and Monday-based week. It keeps stable recipe IDs in `menu_data` and the linked quantities, units, manual items, checkmarks, and notes in `shopping_list`.
- A database trigger creates the profile when a new `auth.users` record is created.
- Row Level Security allows an authenticated user to select and update only the profile whose UUID matches `auth.uid()`.
- Row Level Security allows authenticated users to select, insert, update, and delete only the family-settings row whose `user_id` matches `auth.uid()`. The anonymous role has no table privileges.
- Row Level Security applies the same owner-only select, insert, update, and delete boundary to every weekly-plan record. A unique `(user_id, week_start)` constraint makes upload and retry idempotent, and an owner/week index supports saved-week history.
- The anonymous role has no profile-table privileges or public profile policy.
- Guest menus, preferences, favourites, and shopping data remain device-local. Guest data is never written to a signed-in account except for an intentional first-sign-in migration when that account has no matching cloud record.
- Signed-in family-setting changes are debounced before upload. A failed change is retained in user-scoped local pending storage and can be retried without exposing it to guest mode or another account.
- Signed-in weekly-menu, replacement, portion, manual shopping-item, checkmark, and note changes are debounced and saved together. Failed changes remain in user-and-week-scoped pending storage for safe retry; cloud records stay authoritative when they already exist.

## Verification with a configured Supabase project

1. Open the application in a private browser window and confirm all existing guest features remain usable.
2. Open **Sign in**, enter a test email, explicitly accept the privacy notice, and request the link.
3. Open the magic link and confirm the header shows the signed-in email.
4. Refresh and fully reopen the browser; confirm the session is restored.
5. In Supabase Table Editor, confirm a matching `profiles` row exists and contains the accepted notice version and timestamp.
6. Sign out and confirm the app returns to guest mode without removing device-local guest data.
7. For an RLS check, sign in as two different test users and confirm each client can select only its own profile UUID and cannot update the other UUID.

### Verify family-settings sync

1. Apply `supabase/migrations/20260911010000_create_family_settings.sql` before deploying v1.33.
2. As a guest, save non-default Family Settings and confirm they survive a refresh.
3. Sign in to an account with no `family_settings` row. Confirm the local guest settings are uploaded once and appear in **Table Editor → family_settings** under that user's UUID.
4. Change the settings while signed in. Confirm the UI shows **Mentés… / Saving…**, then **Mentve / Saved**, and the row's `settings` and `updated_at` values change.
5. Refresh, sign out and sign back in, then use a second browser to confirm the same cloud values load. After sign-out, confirm only the separate guest settings are visible.
6. Test with two accounts. Each authenticated client must return only its own row; selecting, updating, or deleting a different `user_id` must affect zero rows or return an authorization error.

### Roll back the v1.33 database migration

Rollback removes all cloud-saved family settings and cannot be undone without a backup. In Supabase SQL Editor, run only if v1.33 must be reverted:

```sql
begin;
drop trigger if exists family_settings_set_updated_at on public.family_settings;
drop function if exists public.set_family_settings_updated_at();
drop table if exists public.family_settings;
commit;
```

The application can then be rolled back to v1.32; guest local settings are unaffected.

### Verify weekly-plan and shopping-list sync

1. Apply `supabase/migrations/20260912000000_create_weekly_plans.sql` once before testing v1.34.
2. As a guest, generate a menu, add a manual shopping item, check an item, and add a note. Refresh and confirm the same local state remains.
3. Sign in to an account with no record for the displayed week. A valid matching guest menu and shopping state should upload once. In **Table Editor → weekly_plans**, verify one row exists for that user's UUID and `week_start`.
4. Change a meal or portion and a shopping checkmark. Wait for **Mentve / Saved**, refresh, close and reopen the browser, then sign in from a second browser. The exact same menu and list state should load.
5. Generate another calendar week or use existing test rows, then choose it under **Mentett hét / Saved weeks**. Confirm the week label changes and **Vissza az aktuális héthez / Return to current week** restores the current week.
6. Regenerate an existing week and confirm the bilingual replacement dialog appears before any data changes. Cancel once; then confirm once and verify the same database row is updated rather than duplicated.
7. Test with two accounts. Each client must return only its own rows; selecting, updating, or deleting another user's UUID must affect zero rows or return an authorization error.

### Roll back the v1.34 database migration

Rollback permanently removes all cloud-saved weekly menus and shopping lists. Back up required data first, then run this only when v1.34 must be reverted:

```sql
begin;
drop trigger if exists weekly_plans_set_updated_at on public.weekly_plans;
drop function if exists public.set_weekly_plans_updated_at();
drop table if exists public.weekly_plans;
commit;
```

The application can then be rolled back to v1.33; guest-local menus and shopping lists are unaffected.

## Account and privacy controls (v1.35)

The profile control opens `/account` for signed-in users. The bilingual screen shows safe account metadata, privacy-notice metadata, cloud-sync status, and current-user-only record counts. It provides:

- a UTF-8 JSON export named `plan-and-pan-data-export-YYYY-MM-DD.json`;
- deletion of family settings and weekly-plan/shopping-list records while keeping the Auth account;
- separate local-device and Supabase global sign-out;
- permanent account deletion through the authenticated server-only `/api/delete-account` endpoint;
- a guest-only reset that removes only browser keys beginning with `plan-pan-`.

The export schema is `plan-and-pan-export-v1`. It contains the export timestamp, safe account metadata (email and creation date), profile/privacy acceptance metadata, family settings, weekly plans, and their linked shopping-list snapshots. It deliberately excludes passwords, access/refresh tokens, credentials, service keys, and database row IDs.

### Privacy acceptance history, RLS, and deletion integrity

`supabase/migrations/20260913000000_add_account_privacy_controls.sql` creates `public.privacy_notice_acceptances`, backfills the current profile acceptance, and records future notice-version acceptance through a trigger. The table references `auth.users(id) ON DELETE CASCADE`; authenticated users receive read-only access to their own history through RLS. The browser cannot insert, update, or delete audit rows.

The same migration adds the `delete_my_plan_pan_data()` security-invoker RPC. It derives ownership exclusively from `auth.uid()` and deletes that user's `weekly_plans` and `family_settings` in one database transaction. It does not delete the profile, acceptance history, or authentication account. Existing profile, family-settings, and weekly-plan ownership policies remain unchanged and are not weakened.

All user-owned public tables (`profiles`, `family_settings`, `weekly_plans`, and `privacy_notice_acceptances`) reference `auth.users` with `ON DELETE CASCADE`. Permanent Auth-user deletion therefore removes all related Plan & Pan rows without orphans.

The privacy-notice version is `beta-2026-09-v2`. Existing users are shown the updated notice and must explicitly accept it; updating the profile records the new version while the prior acceptance remains in the history table.

### Secure account-deletion endpoint setup

`api/delete-account.ts` is deployed automatically as a Vercel Edge Function with the branch or production deployment. It accepts no user ID. It verifies the caller's bearer access token using the browser-safe Supabase publishable key, derives the authenticated user UUID from that verified token, and only then calls Supabase Admin deletion for that UUID. The endpoint returns generic errors and does not log tokens or user data.

Before testing permanent deletion, add this server-only variable in **Vercel → Project → Settings → Environment Variables**:

```text
SUPABASE_SERVICE_ROLE_KEY=<the project's server-only service-role key>
```

Apply it to Preview and Production as appropriate, then redeploy those environments. Obtain the value directly from **Supabase → Project Settings → API Keys**. Never prefix it with `VITE_`, never expose it in browser code, never commit it, and never paste it into an issue, PR, log, or chat. The endpoint reuses the existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` server environment values; optional server aliases `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` are also supported.

### Verify v1.35

Use disposable test accounts for destructive testing—never Szabolcs's real account.

1. Apply `supabase/migrations/20260913000000_add_account_privacy_controls.sql`, add the server-only Vercel variable, and redeploy the preview.
2. Open **Fiók és adatvédelem / Account and Privacy** from the profile control in HU and EN, on narrow and desktop viewports.
3. Confirm the summary matches only the signed-in test user's family-settings and weekly-plan records.
4. Download the JSON and inspect it: expected application data is present; tokens, passwords, service keys, internal IDs, and another user's records are absent.
5. Confirm neither deletion button enables until the exact localized word `TÖRLÉS` or `DELETE` is typed. Cancel once and verify nothing changes.
6. Delete saved data. Verify the Auth account remains signed in, related application rows are gone, local pending queues are cleared, and refresh does not recreate them.
7. Verify local sign-out clears this browser session. With two disposable sessions, verify global sign-out invalidates the other session according to Supabase's global sign-out behavior.
8. With a separate disposable account, test permanent deletion. Also test an expired/invalid token and verify it deletes nothing. Confirm the user and all cascaded rows are gone after success.
9. As a guest, generate a menu and shopping list, then clear guest data. Confirm unrelated local-storage keys remain.
10. Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.

### Roll back v1.35

First roll the application deployment back to v1.34. The SQL below removes v1.35's acceptance-history table and saved-data RPC; it does not restore any data already deleted by a user:

```sql
begin;
drop function if exists public.delete_my_plan_pan_data();
drop trigger if exists profiles_record_privacy_notice_acceptance on public.profiles;
drop function if exists public.record_privacy_notice_acceptance();
drop table if exists public.privacy_notice_acceptances;
commit;
```

Remove `SUPABASE_SERVICE_ROLE_KEY` from Vercel only after the v1.34 rollback is active, then redeploy. Existing profile, family-settings, and weekly-plan tables remain intact.
