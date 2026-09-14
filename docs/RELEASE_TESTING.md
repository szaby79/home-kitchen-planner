# Plan & Pan release testing

This checklist records checks that require a configured preview, real browsers, Supabase, or more than one device. Automated checks passing does not mark these manual items complete.

## Automated release gate

- [ ] GitHub Actions completes `npm ci`, type-check, lint, the full test suite, and the production build.
- [ ] The Vercel preview deploys successfully and opens without unexpected console errors.
- [ ] Hungarian and English navigation and core planner flows work at desktop and mobile widths.

## PR #34 / v1.34 weekly plan and shopping list

- [ ] As a guest, generate a weekly menu and open the shopping list.
- [ ] Verify shopping-list ingredients, quantities, units, and category groups against the generated menu and portions.
- [ ] Add and remove a manual item, edit the shopping note, and check and uncheck several items.
- [ ] Refresh the page and confirm the guest list, manual changes, notes, and checkmarks remain exactly the same.
- [ ] Sign in with a disposable test account, wait for **Mentve / Saved**, then refresh and fully close and reopen the browser. Confirm the exact menu and shopping state return.
- [ ] Sign in to the same disposable account in another browser or device. Confirm quantities, manual changes, notes, and checkmarks match.
- [ ] Change a portion, replace a meal, and check an item on one device. Confirm the linked list updates once and the other device receives the saved state after reload.
- [ ] Confirm refresh, retry, and repeated sign-in do not create duplicate `weekly_plans` rows or duplicate shopping-list items.
- [ ] Sign out and confirm the previous account's menu and shopping list are no longer visible; the separate guest state returns.
- [ ] Repeat the essential generation, list, and persistence flow in both HU and EN.

## PR #35 / v1.35 account and privacy

- [ ] Apply `supabase/migrations/20260913000000_add_account_privacy_controls.sql` to the test project.
- [ ] Configure the server-only `SUPABASE_SERVICE_ROLE_KEY` in Vercel Preview and redeploy; never expose or paste the value into chat, source, logs, or the browser.
- [ ] Open Account and Privacy in HU and EN on desktop and mobile.
- [ ] Verify the stored-data summary shows only the current disposable user's records.
- [ ] Download the JSON export and confirm expected data is present and credentials, tokens, passwords, and other users' data are absent.
- [ ] Delete saved data after typed confirmation. Confirm the account remains active and refresh does not recreate deleted rows from pending queues.
- [ ] Test current-device sign-out and global sign-out with two disposable sessions.
- [ ] Test permanent deletion only with a disposable account, including the invalid/expired-session failure path. Confirm related rows are removed without orphans.
- [ ] Confirm guest reset removes only `plan-pan-` browser data and leaves an unrelated local-storage test key intact.
- [ ] Confirm Szabolcs's real account was not used for destructive testing.

## PR #36 / v1.36 stabilization and Help Centre

- [ ] Open the Help Centre from desktop and mobile navigation, and from the prominent first-visit link on the home page.
- [ ] Expand every help section in HU and EN; confirm language switching never mixes the two languages.
- [ ] Follow the contextual help links from Autopilot, Family Settings, weekly/day plan, weekly/daily shopping list, batch cooking, and cloud-save status.
- [ ] Confirm each contextual link opens the matching Help Centre section and keyboard focus remains visible.
- [ ] At narrow mobile width, confirm readable touch targets and no horizontal scrolling.
- [ ] Confirm the Help Centre does not describe pantry inventory, automatic future-week ingredient deduction, or any other unfinished feature as available.
- [ ] Re-run the PR #34 shopping-list checks above; they remain required and are not replaced by the automated quantity-duplication regression tests.
- [ ] Complete the PR #35 disposable-account checks before PR #36 is eligible to merge.

## Approval record

- [ ] Record the preview URL and test date in the PR conversation.
- [ ] Record any failures as issues or follow-up commits before merge.
- [ ] Obtain Szabolcs's explicit merge approval for the current PR.
