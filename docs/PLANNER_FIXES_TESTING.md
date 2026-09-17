# Planner fixes: v1.39.1

Base inspected: main 4e6ee98494bfcf890e8d5759ab975a141a2c461b, v1.39.0, latest merged PR #39. PR #40 (v1.40.0 email OTP) remains open. These fixes are independently based on main, without auth changes. Reconcile version/changelog changes when integrating #40; do not merge automatically.

## Manual findings on production before these changes

Owner tested desktop Firefox and iPhone browser using the same account:
- Magic-link browser login succeeds; installed iPhone PWA still opens the browser instead of signing into the PWA.
- Saved family settings and historical weekly meals load.
- Shopping check/uncheck survives reload and synchronizes in both directions.
- Manual shopping items survive reload, deletion survives reload, and a phone-added item appears on desktop.
- Reload resets selection to the current week; selecting the old week restores its data.
- Autopilot and shopping navigation make the saved menu difficult to reach.
- Save status is out of view when scrolled down.
- Recipe opened from a 7-serving meal shows default 4 servings; its Back link opens the recipe library.
- Autopilot draft shows 4 diners despite saved family size 6. This is a separate draft/hydration issue, not proof that saved meal portions were overwritten.

## Implemented

Account-scoped selected-week preference is restored only when a matching record is returned by the authenticated cloud fetch. Missing/deleted records fall back to current week. Preference is included in existing account-cache cleanup. Cloud tables, RLS, authentication and recipes are unchanged. No migration or environment variable is required.

Saved menu access, recipe return links and planned recipe quantities are corrected. Mobile editing is labeled “Edit meals and servings”. Recipe-page quantity changes still only scale the recipe view; saved portions are edited in the weekly menu. Cloud status stays visible while scrolling.

## Verification

Automated: full suite, typecheck, lint, production build. New regressions cover remembered-week remount/account isolation/deleted-record fallback, existing-menu access, recipe servings/return and shopping return. Existing mobile editing expectations updated.

Manual acceptance still required on preview:
- Historical-week refresh on phone and desktop preserves selected week.
- Edit a saved meal portion through the mobile editor, reload the other device and verify the portion and shopping quantities.
- Open the recipe: planned servings display; Back returns to menu with the selected week retained.
- Verify floating cloud-save status remains readable without hiding controls, including errors and long English labels.

## Outstanding

- Autopilot device-local draft/family-size mismatch needs a separate behavior decision and regression fix. UI now explicitly distinguishes generation settings from saved meal portions.
- PWA login remains with PR #40. Supabase dashboard observed during testing requires custom SMTP to edit its template; the PR's earlier no-SMTP claim does not match that dashboard. Do not mark OTP tested or ready based on browser magic-link tests.
- Live RLS verification, account deletion/export tests with disposable accounts, and remaining release-checklist items are not completed by these UI tests.
- Foundation architecture/schema/analytics work has not started in this patch.
