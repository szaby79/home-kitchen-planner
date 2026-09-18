import { expect, test } from '@playwright/test';
import { monitorCriticalBrowserErrors, seedEnglishGuest } from './helpers';

test.beforeEach(async ({ page }) => {
  await seedEnglishGuest(page);
});

test('loads the application without critical browser errors', async ({ page }) => {
  const expectNoCriticalErrors = monitorCriticalBrowserErrors(page);

  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Plan & Pan' })).toBeVisible();
  await expect(page.getByText('Less planning. Less rushing. More time together.')).toBeVisible();
  expectNoCriticalErrors();
});

test('keeps the account entry point and guest fallback usable', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign in with Email' }).click();

  await expect(page.getByRole('heading', { name: 'Create Account / Sign In' })).toBeVisible();
  await expect(page.getByLabel('Email address')).toBeDisabled();
  await expect(page.getByText('Account sign-in is still being configured.')).toBeVisible();
  await page.getByRole('button', { name: 'Continue as Guest' }).click();
  await expect(page.getByRole('heading', { name: 'Create Account / Sign In' })).not.toBeVisible();
});
