import { expect, test } from '@playwright/test';
import { seedEnglishGuest, seedGuestPlan } from './helpers';

test('favourites and recipe serving quantities persist and calculate correctly', async ({ page }) => {
  await seedEnglishGuest(page);
  await page.goto('/recipes');

  const addFavourite = page.getByRole('button', { name: 'Add Rántott csirke to favourites' });
  await addFavourite.click();
  await expect(page.getByRole('button', { name: 'Remove Rántott csirke from favourites' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Remove Rántott csirke from favourites' })).toBeVisible();

  await page.getByRole('heading', { name: 'Rántott csirke' }).click();
  await expect(page).toHaveURL(/\/recipes\/main-1$/);
  await expect(page.getByRole('heading', { name: 'Rántott csirke' })).toBeVisible();

  const servingControl = page.getByText('Servings:', { exact: true }).locator('..');
  await servingControl.getByRole('button').last().click();
  await expect(servingControl.getByText('5', { exact: true })).toBeVisible();
  await expect(page.getByText('csirkemell').locator('..')).toContainText('750 g');
});

test('portion editing stays on the planner, updates shopping quantities, and survives reload', async ({ page }) => {
  await seedGuestPlan(page);
  await page.goto('/planner/week');

  if (await page.getByTestId('mobile-planner').isVisible()) {
    await page.getByRole('button', { name: 'Replace a dish' }).click();
  }

  const mainDish = page.locator('label:visible').filter({ hasText: /^Main dish/ }).first().locator('..');
  await expect(mainDish.getByText('Rántott csirke', { exact: true })).toBeVisible();
  await mainDish.getByRole('button', { name: '+' }).click();

  await expect(page).toHaveURL(/\/planner\/week$/);
  await expect(mainDish.getByText('5', { exact: true })).toBeVisible();
  await page.reload();

  if (await page.getByTestId('mobile-planner').isVisible()) {
    await page.getByRole('button', { name: 'Replace a dish' }).click();
  }
  const reloadedMainDish = page.locator('label:visible').filter({ hasText: /^Main dish/ }).first().locator('..');
  await expect(reloadedMainDish.getByText('5', { exact: true })).toBeVisible();

  await page.goto('/shopping');
  await expect(page.getByText('csirkemell').locator('..')).toContainText('750 g');
});

test('recipe navigation returns to the active guest plan without losing it', async ({ page }) => {
  await seedGuestPlan(page, 5);
  await page.goto('/planner/week');

  await page.getByText('Rántott csirke', { exact: true }).first().click();
  await expect(page).toHaveURL(/\/recipes\/main-1$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/planner\/week$/);

  if (await page.getByTestId('mobile-planner').isVisible()) {
    await expect(page.getByText(/5 servings/)).toBeVisible();
  } else {
    const mainDish = page.locator('label:visible').filter({ hasText: /^Main dish/ }).first().locator('..');
    await expect(mainDish.getByText('5', { exact: true })).toBeVisible();
  }
});

test('shopping-list manual state and notes survive reload', async ({ page }) => {
  await seedGuestPlan(page);
  await page.goto('/shopping');
  await expect(page.getByText('csirkemell').locator('..')).toContainText('600 g');

  const addItem = page.getByRole('heading', { name: 'Add another item' }).locator('..');
  await addItem.getByPlaceholder('Item name').fill('Banana');
  await addItem.getByPlaceholder('Quantity').fill('6');
  await addItem.getByPlaceholder('Unit').fill('pc');
  await addItem.getByRole('button').click();

  const bananaRow = page.getByText('Banana', { exact: true }).locator('..');
  await expect(bananaRow).toContainText('6 pc');
  await bananaRow.getByRole('button').first().click();
  await expect(page.getByText('Banana', { exact: true })).toHaveClass(/line-through/);
  await page.getByLabel('Personal notes').fill('Use the reusable bag');

  await page.reload();
  await expect(page.getByText('Banana', { exact: true })).toHaveClass(/line-through/);
  await expect(page.getByLabel('Personal notes')).toHaveValue('Use the reusable bag');
});

test('family settings save locally and reload for a guest', async ({ page }) => {
  await seedEnglishGuest(page);
  await page.goto('/family-settings');

  await page.getByRole('button', { name: 'One more person' }).click();
  await expect(page.getByText('5 people', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Save preferences' }).click();
  await expect(page.getByText(/5 people/)).toBeVisible();

  await page.reload();
  await expect(page.getByText(/5 people/)).toBeVisible();
});
