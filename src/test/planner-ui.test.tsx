import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '@/App';
import { defaultRecipes } from '@/data/recipes';
import { formatMealName } from '@/lib/mealDisplay';
import { WEEKDAYS } from '@/types/recipe';

afterEach(() => vi.restoreAllMocks());

describe('planner meal cards', () => {
  it('shows proportional recipe images after generating a weekly menu', async () => {
    localStorage.clear();
    window.history.pushState({}, '', '/planner');
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /generálás/i }));

    await waitFor(() => {
      const mealImages = screen.getAllByRole('img');
      // Seven lunches and seven dinners are always visible; optional extras
      // appear only when they were requested and suit the selected dish.
      expect(mealImages.length).toBeGreaterThanOrEqual(14);
      expect(mealImages.every(image => image.getAttribute('src')?.startsWith('/recipes/'))).toBe(true);
    });
  });

  it('offers the guided compact mobile planner and a direct shopping-list action', async () => {
    localStorage.clear();
    window.history.pushState({}, '', '/planner');
    render(<App />);

    expect(screen.getByText('Napok')).toBeInTheDocument();
    expect(screen.getByText('Ellenőrzés')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /generálás/i }));

    const mobilePlanner = await screen.findByTestId('mobile-planner');
    expect(within(mobilePlanner).getByRole('button', { name: /heti áttekintés/i })).toBeInTheDocument();
    expect(within(mobilePlanner).getByRole('button', { name: /másik ételt kérek/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /bevásárlólista/i }).length).toBeGreaterThan(0);
  });

  it('opens meal details only when mobile editing is requested', async () => {
    localStorage.clear();
    window.history.pushState({}, '', '/planner');
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /generálás/i }));

    const mobilePlanner = await screen.findByTestId('mobile-planner');
    fireEvent.click(within(mobilePlanner).getByRole('button', { name: /másik ételt kérek/i }));
    expect(within(mobilePlanner).getByRole('button', { name: /szerkesztés kész/i })).toBeInTheDocument();
    expect(within(mobilePlanner).getAllByRole('combobox').length).toBe(6);
  });

  it('offers a direct replacement button that changes only one meal', async () => {
    localStorage.clear();
    window.history.pushState({}, '', '/planner');
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /generálás/i }));

    const mobilePlanner = await screen.findByTestId('mobile-planner');
    const replaceButtons = within(mobilePlanner).getAllByRole('button', { name: 'Csere' });
    expect(replaceButtons.length).toBeGreaterThan(0);
    fireEvent.click(replaceButtons[0]);
    expect(screen.getByRole('dialog')).toHaveTextContent('Csak ez az egy étel változik meg');
  });

  it('shows the meal period clearly and combines a main with its selected side', () => {
    const main = defaultRecipes.find(recipe => recipe.id === 'main-14');
    const side = defaultRecipes.find(recipe => recipe.id === 'side-2');
    expect(formatMealName(main, side)).toBe(`${main?.name} burgonyapürével`);
  });

  it.each(['hu', 'en'])('replaces a full week with four weekend meals only after confirmation (%s)', language => {
    localStorage.clear();
    localStorage.setItem('plan-pan-language', language);
    vi.spyOn(Date.prototype, 'getDay').mockReturnValue(6);
    const en = language === 'en';
    window.history.pushState({}, '', '/planner');
    const { unmount } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: en ? 'Generate (14)' : 'Generálás (14)' }));
    const previous = localStorage.getItem('plan-pan-weekplan');

    fireEvent.click(screen.getByRole('button', { name: en ? 'Today through Sunday' : 'Mától vasárnapig' }));
    expect(localStorage.getItem('plan-pan-weekplan')).toBe(previous);
    expect(screen.getByText(en ? 'Active plan: 7 days, 14 meals.' : 'Aktív terv: 7 nap, 14 étkezés.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: en ? 'Generate (4)' : 'Generálás (4)' }));
    expect(screen.getByRole('alertdialog')).toHaveTextContent(en ? '4 selected meals' : '4 kijelölt étkezést');
    fireEvent.click(screen.getByRole('button', { name: en ? 'Cancel' : 'Mégse' }));
    expect(localStorage.getItem('plan-pan-weekplan')).toBe(previous);

    fireEvent.click(screen.getByRole('button', { name: en ? 'Generate (4)' : 'Generálás (4)' }));
    fireEvent.click(screen.getByRole('button', { name: en ? 'Create new plan' : 'Új terv készítése' }));
    expect(screen.getByText(en ? 'Active plan: 2 days, 4 meals.' : 'Aktív terv: 2 nap, 4 étkezés.')).toBeInTheDocument();
    const mobile = within(screen.getByTestId('mobile-planner'));
    expect(mobile.getByRole('heading', { name: en ? 'Saturday' : 'Szombat' })).toBeInTheDocument();
    expect(mobile.queryByRole('button', { name: en ? 'M' : 'H' })).not.toBeInTheDocument();
    fireEvent.click(mobile.getByRole('button', { name: en ? 'Week overview' : 'Heti áttekintés' }));
    expect(mobile.queryByText(en ? 'Monday' : 'Hétfő')).not.toBeInTheDocument();
    const next = JSON.parse(localStorage.getItem('plan-pan-weekplan')!);
    WEEKDAYS.slice(0, 5).forEach(day => {
      expect(next[day].lunch).toBeNull();
      expect(next[day].dinner).toBeNull();
      expect(next[day].soup).toBeNull();
    });
    unmount();
    render(<App />);
    expect(within(screen.getByTestId('mobile-planner')).getByRole('heading', { name: en ? 'Saturday' : 'Szombat' })).toBeInTheDocument();
    expect(screen.getByText(en ? 'Active plan: 2 days, 4 meals.' : 'Aktív terv: 2 nap, 4 étkezés.')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('link', { name: en ? 'Shopping list' : 'Bevásárlólista' })[0]);
    fireEvent.click(screen.getByRole('button', { name: en ? 'Daily view' : 'Napi nézet' }));
    expect(screen.queryByRole('heading', { name: en ? 'Monday' : 'Hétfő' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: en ? 'Saturday' : 'Szombat' })).toBeInTheDocument();
  });

  it('disables generation with no meals selected without clearing the active menu', () => {
    localStorage.clear();
    window.history.pushState({}, '', '/planner');
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Generálás (14)' }));
    const previous = localStorage.getItem('plan-pan-weekplan');
    fireEvent.click(screen.getByRole('button', { name: 'Kijelölés törlése' }));
    expect(screen.getByRole('button', { name: 'Generálás (0)' })).toBeDisabled();
    expect(localStorage.getItem('plan-pan-weekplan')).toBe(previous);
  });
});
