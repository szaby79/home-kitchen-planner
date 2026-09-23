## Outcome

Describe the user or launch-readiness result. Do not use feature count as the outcome.

## Product-direction check

- [ ] Reduces planning work, saves meaningful time or money, improves accuracy/personalization, reduces waste, or improves trust.
- [ ] The same value cannot be delivered more simply.
- [ ] A normal user can understand the change without developer explanation.
- [ ] Supports repeated weekly use and the core Plan & Pan promise.
- [ ] Moves the product closer to January 2027 production readiness.
- [ ] Adds no unjustified user-facing complexity or pre-launch technical risk.

If most of these statements are false, stop and do not build the change.

## Safety and scope

- [ ] Existing working behavior is preserved unless the PR explains why it must change.
- [ ] Authentication, data ownership, sync, deletion, dietary and allergy boundaries affected by this PR are identified.
- [ ] Failure, loading, empty and recovery behavior is covered where relevant.
- [ ] No credentials, tokens, private household data or production-only values are included.
- [ ] The application version matches the actual PR number.

## Verification

- [ ] TypeScript
- [ ] ESLint
- [ ] Vitest
- [ ] Production build
- [ ] Relevant Playwright flows
- [ ] Required real-device or configured-cloud checks are recorded, or explicitly remain open in `docs/RELEASE_TESTING.md`.

## Not included

List deferred work so the PR boundary is unambiguous.

