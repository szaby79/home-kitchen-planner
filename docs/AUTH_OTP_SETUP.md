# Email OTP authentication setup (v1.40)

Plan & Pan uses Supabase email OTP verification inside the same browser or installed PWA window. The frontend uses only the public Supabase publishable key. No service-role key is required or allowed in the browser.

## Required email delivery setup

Custom SMTP is required before PR #40 can be verified with real beta users. Supabase's default sender is limited to project-team addresses, is rate-limited, and is not intended for production authentication email.

For the current beta, use the existing `skpunited.com` domain through Zoho Mail. This is only the sending domain; the Plan & Pan product name and application domain can still be changed later without migrating user data.

Before entering anything in Supabase:

1. Confirm there is a Zoho mailbox or send-capable alias on `skpunited.com`. A receiving-only Zoho group such as `info@`, `sales@`, or `support@` must not be assumed to have SMTP credentials.
2. Prefer `noreply@skpunited.com` as the sender only if it is an alias of the authenticating mailbox or has its own mailbox credentials. Otherwise use the authenticating mailbox address as the sender.
3. The current Canadian Zoho account shows SMTP host `smtp.zohocloud.ca`, port `465`, and SSL. Recheck **Server Configuration Details** before reusing these values after an account or data-center change.
4. Authenticate as `szabolcsbecze@skpunited.com`. If Zoho two-factor authentication is enabled, create an application-specific password instead of using the normal account password.
5. In Supabase, open **Project Settings > Authentication > SMTP Settings**, enable custom SMTP, and enter the host, port, mailbox username, password, sender address, and sender name `Plan & Pan`.
6. Store the SMTP password only in the Supabase dashboard. Never commit it, paste it into GitHub, or send it in chat.

After saving SMTP, send a real OTP only to a disposable test account and confirm delivery before inviting beta users.

## Required Supabase email template change

Complete this once after custom SMTP is enabled and before manually testing PR #40:

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

## Current email delivery decision

PR #40 uses Zoho Mail SMTP with the existing `skpunited.com` domain. No new domain is required for the beta. This does not change the frontend OTP flow and does not weaken Supabase authentication or Row Level Security.

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
