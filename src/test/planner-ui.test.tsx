import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
      expect(mealImages.length).toBeGreaterThanOrEqual(16);
      expect(mealImages.every(image => image.getAttribute('src')?.startsWith('/recipes/'))).toBe(true);
    });
  });
});
