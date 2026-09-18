import { expect, type Page } from '@playwright/test';

const weekdays = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'] as const;

function emptyDay() {
  return {
    soup: null,
    lunch: null,
    side: null,
    pickle: null,
    dinner: null,
    dessert: null,
    soupServings: 4,
    lunchServings: 4,
    sideServings: 4,
    pickleServings: 4,
    dinnerServings: 4,
    dessertServings: 4,
    lunchDays: 1,
    dinnerDays: 1,
    lunchFromLeftovers: false,
    dinnerFromLeftovers: false,
  };
}

export async function seedEnglishGuest(page: Page) {
  await page.addInitScript(() => {
    if (sessionStorage.getItem('plan-pan-e2e-seeded')) return;
    sessionStorage.setItem('plan-pan-e2e-seeded', 'true');
    localStorage.clear();
    localStorage.setItem('plan-pan-language', 'en');
  });
}

export async function seedGuestPlan(page: Page, servings = 4) {
  const weekPlan = Object.fromEntries(weekdays.map(day => [day, emptyDay()]));
  weekPlan.Hétfő.lunch = 'main-1';
  weekPlan.Hétfő.lunchServings = servings;

  await page.addInitScript((plan) => {
    if (sessionStorage.getItem('plan-pan-e2e-seeded')) return;
    sessionStorage.setItem('plan-pan-e2e-seeded', 'true');
    localStorage.clear();
    localStorage.setItem('plan-pan-language', 'en');
    localStorage.setItem('plan-pan-weekplan', JSON.stringify(plan));
    localStorage.setItem('plan-pan-extra-items', '[]');
    localStorage.setItem('plan-pan-checked-items', '[]');
    localStorage.setItem('plan-pan-shopping-notes', '');
  }, weekPlan);
}

export function monitorCriticalBrowserErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  return () => expect(errors, errors.join('\n')).toEqual([]);
}
