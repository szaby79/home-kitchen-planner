import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '@/App';

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
});
