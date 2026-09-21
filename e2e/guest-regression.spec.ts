import { expect, test } from '@playwright/test';
import { seedEnglishGuest, seedGuestPlan } from './helpers';

test('mobile navigation keeps core destinations within one tap', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 1280) >= 1024, 'Mobile navigation is intentionally hidden on desktop.');
  await seedEnglishGuest(page);
  await page.goto('/');

  const mobileNavigation = page.getByRole('navigation', { name: 'Mobile main menu' });
  await expect(mobileNavigation).toBeVisible();
  await expect(mobileNavigation.getByRole('link')).toHaveCount(4);
  await expect(mobileNavigation.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');

  await mobileNavigation.getByRole('link', { name: 'Recipes' }).click();
  await expect(page).toHaveURL(/\/recipes$/);
  await expect(page.getByRole('navigation', { name: 'Mobile main menu' }).getByRole('link', { name: 'Recipes' })).toHaveAttribute('aria-current', 'page');
});

test('home keeps one clear weekly-menu action and secondary content collapsed', async ({ page }) => {
  await seedEnglishGuest(page);
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Create weekly menu' })).toHaveAttribute('href', '/planner');
  await expect(page.getByRole('link', { name: 'Family preferences' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'How does it work?' })).toBeVisible();
  const moreOptions = page.locator('details', { hasText: 'More options' });
  await expect(moreOptions).not.toHaveAttribute('open');
});

test('recipes keep search and categories visible while secondary filters stay collapsed', async ({ page }) => {
  await seedEnglishGuest(page);
  await page.goto('/recipes');

  await expect(page.getByPlaceholder('Search recipes...')).toBeVisible();
  await expect(page.getByRole('button', { name: 'All', exact: true })).toBeVisible();
  const filters = page.locator('details', { hasText: 'Filter and sort' });
  await expect(filters).not.toHaveAttribute('open');
  await expect(page.getByRole('button', { name: 'Quick meals' })).toBeHidden();

  await page.getByText('Filter and sort', { exact: true }).click();
  await page.getByRole('button', { name: 'Quick meals' }).click();
  await expect(page).toHaveURL(/\/recipes\?quick=1$/);
  await expect(page.getByText('1 active')).toBeVisible();
});

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
  const ingredients = page.getByRole('heading', { name: 'Ingredients' }).locator('..');
  await expect(ingredients.getByText('chicken breast', { exact: true }).locator('..')).toContainText('750 g');
  await page.getByRole('link', { name: 'Back', exact: true }).click();
  await expect(page).toHaveURL(/\/recipes$/);
});

test('shopping back control returns to the actual previous app page', async ({ page }) => {
  await seedEnglishGuest(page);
  await page.goto('/');

  await page.getByText('More options', { exact: true }).click();
  await page.locator('a[href="/shopping"]', { hasText: 'Created automatically from your meal plan' }).click();
  await expect(page).toHaveURL(/\/shopping$/);
  await page.getByRole('link', { name: 'Back to menu' }).click();

  await expect(page).toHaveURL(/\/$/);
});

test('portion editing stays on the planner, updates shopping quantities, and survives reload', async ({ page }) => {
  await seedGuestPlan(page);
  await page.goto('/planner/week');

  if (await page.getByTestId('mobile-planner').isVisible()) {
    await page.getByRole('button', { name: 'Edit meals and servings' }).click();
  }

  const mainDish = page.locator('label:visible').filter({ hasText: /^Main dish/ }).first().locator('..');
  await expect(mainDish.getByText('Rántott csirke', { exact: true })).toBeVisible();
  const servings = mainDish.getByText('Servings:', { exact: true }).locator('..');
  await servings.getByRole('button', { name: '+' }).click();

  await expect(page).toHaveURL(/\/planner\/week$/);
  await expect(servings.getByText('5', { exact: true })).toBeVisible();
  await page.reload();

  if (await page.getByTestId('mobile-planner').isVisible()) {
    await page.getByRole('button', { name: 'Edit meals and servings' }).click();
  }
  const reloadedMainDish = page.locator('label:visible').filter({ hasText: /^Main dish/ }).first().locator('..');
  await expect(reloadedMainDish.getByText('5', { exact: true })).toBeVisible();

  await page.goto('/shopping');
  await expect(page.getByText('chicken breast').locator('..')).toContainText('750 g');
  await page.getByRole('link', { name: 'Back to menu' }).click();
  await expect(page).toHaveURL(/\/planner\/week$/);
});

test('saved weekly plan opens with meals first and keeps generation setup secondary', async ({ page }) => {
  await seedGuestPlan(page);
  await page.goto('/planner/week');

  await expect(page.locator('a:visible', { hasText: 'Rántott csirke' }).first()).toBeVisible();
  const setupButton = page.getByRole('button', { name: /Change plan/ });
  await expect(setupButton).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByText('Which days should be planned?')).toBeHidden();

  await setupButton.click();
  await expect(setupButton).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('Which days should be planned?')).toBeVisible();
});

test('recipe navigation returns to the active guest plan without losing it', async ({ page }) => {
  await seedGuestPlan(page, 5);
  await page.goto('/planner/week');

  await page.locator('a:visible', { hasText: 'Rántott csirke' }).first().click();
  await expect(page).toHaveURL(/\/recipes\/main-1\?from=plan&servings=5$/);
  await expect(page.getByText('5', { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/change saved servings, edit the weekly menu/i)).toBeVisible();
  await page.getByRole('link', { name: 'Back', exact: true }).click();
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
  await expect(page.getByText('chicken breast').locator('..')).toContainText('600 g');

  const personalTools = page.getByRole('button', { name: /Personal items and notes/ });
  await expect(personalTools).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('heading', { name: 'Add another item' })).toBeHidden();
  await personalTools.click();

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
  await page.getByRole('button', { name: /Personal items and notes/ }).click();
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
