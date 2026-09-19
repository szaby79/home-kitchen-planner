# Plan & Pan automated testing

## Test layers

- `src/test/`: Vitest unit and React integration coverage for generators, validation, authentication UI, local persistence, Supabase adapters, family settings, weekly plans, shopping data, and account/privacy behavior.
- `e2e/`: Playwright regression coverage through the real built UI. It runs at desktop width, an iPhone-sized Chromium viewport, and an iPhone-sized WebKit viewport.
- `.github/workflows/ci.yml`: free GitHub Actions checks on pull requests, `main` pushes, and manual dispatches.

## Local commands

```sh
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium webkit
npm run test:e2e
```

Use `npm run test:e2e:headed` to watch the browser. After a failure, use `npm run test:e2e:report` to open the HTML report. CI retains screenshots, traces, logs, and the HTML report for seven days only when the browser job fails.

To test an already deployed preview instead of starting local Vite:

```sh
PLAYWRIGHT_BASE_URL=https://your-preview.example npm run test:e2e
```

## Data-safety boundary

The required CI suite runs with isolated browser storage. Guest regressions stay local, and the browser OTP-request check uses a mocked local Supabase transport with a reserved `.test` address. It does not send email, use production accounts or credentials, or make destructive database calls. Integration tests mock Supabase at the application boundary and verify account-scoped user IDs. Static migration tests prevent accidental removal of the committed RLS owner checks.

Live OTP delivery, restored authenticated sessions, cross-user RLS denial, cloud persistence, and multi-device synchronization need a dedicated non-production Supabase project and disposable users. Do not put OTPs, access tokens, service-role keys, or real-user credentials in GitHub, Playwright files, screenshots, traces, or CI variables. A future live-cloud job should remain opt-in until that test project and its secret-handling process exist.

## What remains manual on a real iPhone

- Add to Home Screen installation, icon refresh, and standalone launch.
- Session behavior after fully closing and reopening the installed PWA.
- Email-app handoff and return to the installed PWA for authentication.
- Push-notification permission and delivery.
- Native iOS keyboard, safe-area, scrolling, touch, and browser-specific behavior.
- Camera or microphone permission if those features are added.

WebKit automation catches many Safari regressions, but it is not a replacement for these operating-system and installed-PWA checks.
