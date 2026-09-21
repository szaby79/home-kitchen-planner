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

    const navigation = screen.getByRole('navigation');
    expect(within(navigation).getByRole('link', { name: 'Heti terv' })).toHaveAttribute('href', '/planner');
    expect(within(navigation).queryByRole('link', { name: 'Admin' })).not.toBeInTheDocument();
    expect(within(navigation).queryByRole('link', { name: 'Budget' })).not.toBeInTheDocument();
    expect(within(navigation).queryByRole('link', { name: 'Súgó' })).not.toBeInTheDocument();
  });

  it('opens the saved weekly menu when meals already exist', () => {
    localStorage.setItem('plan-pan-weekplan', JSON.stringify({ Hétfő: { lunch: 'main-1' } }));
    window.history.replaceState({}, '', '/');
    render(<App />);

    const navigation = screen.getByRole('navigation');
    expect(within(navigation).getByRole('link', { name: 'Heti terv' })).toHaveAttribute('href', '/planner/week');
  });

  it('shows only the four core destinations in the mobile menu', () => {
    window.history.replaceState({}, '', '/');
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Menü megnyitása' }));
    const mobileNavigation = screen.getAllByRole('navigation').at(-1)!;
    expect(within(mobileNavigation).getAllByRole('link').map(link => link.textContent)).toEqual([
      'Főoldal', 'Receptek', 'Heti terv', 'Bevásárlólista',
    ]);
  });

  it('keeps advanced recipe management available behind a secondary control', () => {
    window.history.replaceState({}, '', '/recipes');
    render(<App />);

    expect(screen.getByText('További lehetőségek')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Recept hozzáadása vagy szerkesztése/ })).toHaveAttribute('href', '/admin');
  });
});
