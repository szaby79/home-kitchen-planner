import { expect, test, type Page } from '@playwright/test';
import { monitorCriticalBrowserErrors, seedEnglishGuest } from './helpers';

async function openSignIn(page: Page) {
  const desktopEntry = page.getByRole('button', { name: 'Sign in with Email' });
  if (await desktopEntry.isVisible()) {
    await desktopEntry.click();
    return;
  }

  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
}

test.beforeEach(async ({ page }) => {
  await seedEnglishGuest(page);
});

test('loads the application without critical browser errors', async ({ page }) => {
  const expectNoCriticalErrors = monitorCriticalBrowserErrors(page);

  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Plan & Pan', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Less planning. More time together.' })).toBeVisible();
  expectNoCriticalErrors();
});

test('keeps the account entry point and guest fallback usable', async ({ page }) => {
  await page.goto('/');
  await openSignIn(page);

  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue as Guest' }).click();
  await expect(page.getByRole('heading', { name: 'Sign in' })).not.toBeVisible();
});

test('keeps Autopilot day settings compact without a floating action panel', async ({ page }) => {
  await page.goto('/planner');

  const dayEditors = page.getByRole('button', { name: /Edit/ });
  await expect(dayEditors).toHaveCount(7);
  await expect(page.getByLabel('People eating')).toHaveCount(0);

  await page.getByRole('button', { name: /Tuesday.*Edit/ }).click();
  await expect(page.getByLabel('People eating')).toBeVisible();
  await page.getByRole('button', { name: 'Busy day' }).click();
  await expect(page.getByRole('button', { name: /Tuesday.*Busy day.*Edit/ })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Generate weekly menu' })).toHaveCount(1);
  await expect(page.getByTestId('generate-week-panel')).toHaveCSS('position', 'static');
});

test('requests an email OTP inside the app without contacting a real account', async ({ page }) => {
  test.skip(Boolean(process.env.PLAYWRIGHT_BASE_URL), 'The mocked OTP transport is available only on the isolated local test server.');

  let otpRequest: { email?: string; create_user?: boolean; data?: Record<string, unknown> } | null = null;
  await page.route('**/__e2e_supabase/auth/v1/otp', async (route) => {
    otpRequest = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });

  await page.goto('/');
  await openSignIn(page);
  await page.getByLabel('Email address').fill('playwright@example.test');
  await page.getByLabel('I have read and accept the beta privacy notice.').click();
  await page.getByRole('button', { name: 'Send sign-in code' }).click();

  await expect(page.getByRole('heading', { name: 'Check your email' })).toBeVisible();
  await expect(page.getByText(/playwright@example\.test/)).toBeVisible();
  await expect(page.getByLabel('Sign-in code')).toHaveAttribute('autocomplete', 'one-time-code');
  await expect(page.getByRole('button', { name: /Resend code/ })).toBeDisabled();
  expect(otpRequest).toMatchObject({
    email: 'playwright@example.test',
    create_user: true,
    data: { privacy_notice_version: 'beta-2026-09-v2' },
  });
});
