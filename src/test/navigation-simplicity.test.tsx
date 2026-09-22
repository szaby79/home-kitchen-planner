import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from '@/App';

afterEach(() => {
  cleanup();
  localStorage.clear();
  window.history.replaceState({}, '', '/');
});

describe('simplified primary navigation', () => {
  it('opens Autopilot when no weekly plan exists', () => {
    localStorage.clear();
    window.history.replaceState({}, '', '/');
    render(<App />);

    const navigation = screen.getByRole('navigation', { name: 'Elsődleges navigáció' });
    expect(within(navigation).getByRole('link', { name: 'Heti terv' })).toHaveAttribute('href', '/planner');
    expect(within(navigation).queryByRole('link', { name: 'Admin' })).not.toBeInTheDocument();
    expect(within(navigation).queryByRole('link', { name: 'Budget' })).not.toBeInTheDocument();
    expect(within(navigation).queryByRole('link', { name: 'Súgó' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Autopilot' })).toHaveAttribute('href', '/planner');
    expect(screen.getByRole('img', { name: 'Frissen elkészült, tartalmas családi étel' })).toBeInTheDocument();
    expect(screen.getByText('További lehetőségek').closest('details')).not.toHaveAttribute('open');
  });

  it('shows saved-menu status without duplicating the homepage action', () => {
    localStorage.setItem('plan-pan-weekplan', JSON.stringify({ Hétfő: { lunch: 'main-1' } }));
    window.history.replaceState({}, '', '/');
    render(<App />);

    const navigation = screen.getByRole('navigation', { name: 'Elsődleges navigáció' });
    expect(within(navigation).getByRole('link', { name: 'Heti terv' })).toHaveAttribute('href', '/planner/week');
    expect(screen.getByRole('link', { name: 'Autopilot' })).toHaveAttribute('href', '/planner');
    expect(screen.queryByRole('link', { name: 'Heti menü megnyitása' })).not.toBeInTheDocument();
    expect(screen.getByText('1 nap • 1 étkezés elmentve')).toBeInTheDocument();
  });

  it('keeps the weekly menu action centered in the persistent mobile navigation', () => {
    window.history.replaceState({}, '', '/');
    render(<App />);

    const mobileNavigation = screen.getByRole('navigation', { name: 'Mobil főmenü' });
    expect(within(mobileNavigation).getAllByRole('link').map(link => link.textContent)).toEqual([
      'Főoldal', 'Receptek', 'Heti menü', 'Heti terv', 'Bevásárlólista',
    ]);
    expect(within(mobileNavigation).getByRole('link', { name: 'Heti menü' })).toHaveAttribute('href', '/planner');
    expect(within(mobileNavigation).getByRole('link', { name: 'Heti terv' })).toHaveAttribute('href', '/planner');
    expect(within(mobileNavigation).getByRole('link', { name: 'Főoldal' })).toHaveAttribute('aria-current', 'page');
  });

  it('opens the saved weekly menu from the centered mobile action', () => {
    localStorage.setItem('plan-pan-weekplan', JSON.stringify({ Hétfő: { lunch: 'main-1' } }));
    window.history.replaceState({}, '', '/');
    render(<App />);

    const mobileNavigation = screen.getByRole('navigation', { name: 'Mobil főmenü' });
    expect(within(mobileNavigation).getByRole('link', { name: 'Heti menü' })).toHaveAttribute('href', '/planner/week');
    expect(within(mobileNavigation).getByRole('link', { name: 'Heti terv' })).toHaveAttribute('href', '/planner');
  });

  it('keeps secondary destinations in the mobile menu', () => {
    window.history.replaceState({}, '', '/');
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Menü megnyitása' }));
    const secondaryNavigation = screen.getByRole('navigation', { name: 'További lehetőségek' });
    expect(within(secondaryNavigation).getByRole('link', { name: 'Családi beállítások' })).toHaveAttribute('href', '/family-settings');
    expect(within(secondaryNavigation).getByRole('link', { name: 'Budget' })).toHaveAttribute('href', '/budget');
    expect(within(secondaryNavigation).getByRole('link', { name: 'Súgó' })).toHaveAttribute('href', '/help');
    expect(within(secondaryNavigation).getByRole('link', { name: 'Receptek kezelése' })).toHaveAttribute('href', '/admin');
    expect(within(secondaryNavigation).queryByRole('button', { name: 'Belépés' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bejelentkezés e-mail-címmel' })).toBeInTheDocument();
  });

  it('keeps advanced recipe management available behind a secondary control', () => {
    window.history.replaceState({}, '', '/recipes');
    render(<App />);

    const filters = screen.getByText('Szűrés és rendezés').closest('details');
    expect(filters).not.toHaveAttribute('open');
    fireEvent.click(screen.getByText('Szűrés és rendezés'));
    expect(screen.getByRole('link', { name: 'Receptek kezelése' })).toHaveAttribute('href', '/admin');
  });
});
