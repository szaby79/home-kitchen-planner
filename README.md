# Plan & Pan

Plan & Pan is a bilingual Hungarian/English family meal planner. Version 1.33 securely synchronizes the existing family settings for signed-in users while preserving device-local guest mode.

## Tervezett PR-sorozat

- PR #31 / v1.31 – felhasználói adatbázis-alap (kész)
- PR #32 / v1.32 – recept- és ételfotó-audit (kész)
- PR #33 / v1.33 – családi beállítások mentése (folyamatban)
- PR #34 / v1.34 – heti menük és bevásárlólisták mentése
- PR #35 / v1.35 – fiók- és adatvédelmi vezérlők
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

## Supabase Free setup for v1.31–v1.33

1. Create or select the Plan & Pan project in Supabase.
2. Apply the committed migrations in filename order:
   - `supabase/migrations/20260911000000_create_profiles.sql`
   - `supabase/migrations/20260911010000_create_family_settings.sql`
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
- A database trigger creates the profile when a new `auth.users` record is created.
- Row Level Security allows an authenticated user to select and update only the profile whose UUID matches `auth.uid()`.
- Row Level Security allows authenticated users to select, insert, update, and delete only the family-settings row whose `user_id` matches `auth.uid()`. The anonymous role has no table privileges.
- The anonymous role has no profile-table privileges or public profile policy.
- Guest menus, preferences, favourites, and shopping data remain device-local. Guest family settings are never written to a signed-in account except for the intentional first-sign-in migration when that account has no cloud settings yet.
- Signed-in family-setting changes are debounced before upload. A failed change is retained in user-scoped local pending storage and can be retried without exposing it to guest mode or another account.
- Cloud saving of weekly menus and shopping lists remains deferred to a later PR.

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
