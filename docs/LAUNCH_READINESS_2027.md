# Plan & Pan January 2027 launch readiness

This is the evidence ledger for a paid production launch. A feature existing in source code is not proof that it works in production. Mark an item complete only when the stated evidence exists.

Last baseline review: **2026-09-23**, main commit `fde196b` (v1.64.0).

## Current verified baseline

- [x] TypeScript check passes.
- [x] ESLint has zero errors (nine existing Fast Refresh warnings).
- [x] All 774 Vitest tests pass.
- [x] Production build completes.
- [x] GitHub Actions passed on the v1.64.0 main commit, including browser regression jobs.
- [x] Unit and integration coverage exists for auth, local persistence, family settings, weekly plans, shopping state, privacy controls, diet/allergy rules and previous navigation regressions.
- [x] Desktop Chromium, mobile Chromium and mobile WebKit projects exist in the Playwright release gate.

These checks establish a good engineering baseline. They do **not** prove that the configured production services, real devices or destructive account flows work end to end.

## Launch gates

| Area | Current evidence | Missing proof before launch |
| --- | --- | --- |
| Authentication | OTP UI and provider behavior are covered by automated tests. | Real email delivery, persistent production session, duplicate-account prevention and installed-PWA return flow. |
| Family settings | Local/cloud selection, migration, debounce and failed-save retention are tested with mocked cloud calls. | Configured Supabase verification across two real devices and recovery after a real interrupted request. |
| Weekly plan | Generation, local persistence, cloud adapter behavior, saved weeks and retry boundaries are automated. | Multi-device production sync, conflict behavior and proof that no saved plan silently resets. |
| Shopping list | Aggregation and UI regression coverage exist; plan-linked cloud payloads are tested. | Real-device quantity, scaling, duplicate, completion and two-device sync verification. |
| Privacy | Export, saved-data deletion, sign-out and account-deletion boundaries have automated coverage. | Disposable-account verification against the configured Supabase and Vercel environments, including cascades and invalid sessions. |
| Mobile/PWA | Mobile Chromium and WebKit regression suites exist. | Installed iPhone PWA reopening, session persistence, safe areas, keyboard, touch and email-app handoff. |
| Recipes | Catalogue checks cover IDs, images, classifications and selected instruction rules. | A structured audit of every launch recipe for time, portions, quantities, method, safety, tags and readability. |
| Budget | A calculator and tests exist. | Evidence that budget materially changes weekly generation using realistic Hungarian pricing and substitutions. |
| Error recovery | Pending local copies and online-event retries exist for core cloud data. | Recovery from temporary server failures while the device remains online, explicit conflict handling and no silent data loss. |
| Monitoring | No production monitoring evidence is recorded. | Error capture, release identification, traceable critical failures, alert ownership and privacy review. |
| Performance | Production build succeeds. | Mobile targets, bundle/load measurements and plan-generation response targets with the launch-size catalogue. |
| Retention metrics | Product success metrics are defined. | Privacy-conscious event definitions and a verified way to measure weekly return, completion, abandonment and replacement. |

## Required order of work

1. Complete the real-cloud and disposable-account safety checks already listed in `docs/RELEASE_TESTING.md`.
2. Close any data-loss, stale-session, cross-account or cross-device issue found by those checks.
3. Add reliable recovery for transient failures and explicit handling for conflicting unsynced edits.
4. Establish privacy-reviewed production error monitoring before broad beta use.
5. Audit recipe quality with a repeatable checklist and tracked completion.
6. Make budget a verified planning constraint using defensible Hungarian price data.
7. Measure and improve mobile/PWA performance with the launch-size catalogue.
8. Add breakfast planning only as a simple, optional planning input after the preceding stability gates are controlled; the breakfast recipe catalogue alone does not justify exposing more setup.

## Evidence rules

- Link the relevant automated run, preview/production version and test date.
- Use disposable accounts for deletion and cross-account tests.
- Record the device/browser combination for PWA and synchronization checks.
- Convert every failure into a reproducible issue or a failing automated test where practical.
- Do not mark a launch gate complete from code inspection alone.
- Do not include credentials, OTPs, access tokens, service-role keys or personal household data in evidence.

