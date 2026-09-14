# Email OTP authentication setup (v1.40)

Plan & Pan uses Supabase email OTP verification inside the same browser or installed PWA window. The frontend uses only the public Supabase publishable key. No service-role key is required or allowed in the browser.

## Required Supabase dashboard change

Complete this once before manually testing PR #40:

1. Open the Plan & Pan project in the Supabase dashboard.
2. Select **Authentication**.
3. Open **Email Templates**.
4. Open the **Magic Link** template used by passwordless email sign-in.
5. Replace the sign-in link in the message body with the OTP token variable: `{{ .Token }}`.
6. Keep the template bilingual if desired, and clearly tell the recipient to enter the code in Plan & Pan.
7. Save the template.
8. Do not paste any key, password, access token, or SMTP credential into GitHub or chat.

A minimal body can contain:

```text
Plan & Pan belépési kód / sign-in code: {{ .Token }}
```

If Supabase presents a separate confirmation template for newly created users, ensure that its passwordless confirmation content also displays `{{ .Token }}` rather than requiring the recipient to leave the app through a link.

## Current email delivery

Custom SMTP is not required for PR #40. Supabase's development email sender can be used for the small beta test group, subject to its rate limits. A custom SMTP provider can be connected later without changing the frontend OTP flow.

## Verification

Use a disposable account where account creation or deletion is tested. For an existing account:

1. Open Plan & Pan in a normal browser, request a code, enter it in the in-app dialog, refresh, and confirm the session remains active.
2. Close and reopen the browser and confirm the session is restored.
3. Repeat inside the installed iPhone PWA; do not open Safari to complete verification.
4. Confirm the existing family settings, weekly plan, and shopping-list state return for the same account.
5. In Supabase Authentication and the `profiles` table, confirm no duplicate user or profile was created.
6. Sign out explicitly and confirm a new OTP is required next time.
7. Trigger no repeated sends during the 60-second resend cooldown.

## Rollback

Restore the previous Magic Link email template in Supabase and revert the PR #40 commits. No database rollback is required because this change adds no migration and changes no existing table.
