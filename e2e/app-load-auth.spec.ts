import { expect, test } from '@playwright/test';
import { monitorCriticalBrowserErrors, seedEnglishGuest } from './helpers';

test.beforeEach(async ({ page }) => {
  await seedEnglishGuest(page);
});

test('loads the application without critical browser errors', async ({ page }) => {
  const expectNoCriticalErrors = monitorCriticalBrowserErrors(page);

  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Plan & Pan', exact: true })).toBeVisible();
  await expect(page.getByText('Less planning.', { exact: true })).toBeVisible();
  await expect(page.getByText('Less rushing.', { exact: true })).toBeVisible();
  await expect(page.getByText('More time together.', { exact: true })).toBeVisible();
  expectNoCriticalErrors();
});

test('keeps the account entry point and guest fallback usable', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign in with Email' }).click();

  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue as Guest' }).click();
  await expect(page.getByRole('heading', { name: 'Sign in' })).not.toBeVisible();
});

test('requests an email OTP inside the app without contacting a real account', async ({ page }) => {
  test.skip(Boolean(process.env.PLAYWRIGHT_BASE_URL), 'The mocked OTP transport is available only on the isolated local test server.');

  let otpRequest: { email?: string; create_user?: boolean; data?: Record<string, unknown> } | null = null;
  await page.route('**/__e2e_supabase/auth/v1/otp', async (route) => {
    otpRequest = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Sign in with Email' }).click();
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
