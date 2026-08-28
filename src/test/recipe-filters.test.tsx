import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '@/App';

describe('recipe filters', () => {
  it('clears the active category when quick meals are selected', async () => {
    localStorage.clear();
    window.history.pushState({}, '', '/recipes?category=dessert');
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /gyors ételek/i }));
    await waitFor(() => {
      expect(window.location.search).toContain('quick=1');
      expect(window.location.search).not.toContain('category=');
      expect(screen.queryByText('Nincs találat.')).not.toBeInTheDocument();
    });
  });

  it('clears quick meals when a normal category is selected', async () => {
    localStorage.clear();
    window.history.pushState({}, '', '/recipes?quick=1');
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Desszertek' }));
    await waitFor(() => {
      expect(window.location.search).toContain('category=dessert');
      expect(window.location.search).not.toContain('quick=1');
    });
  });
});
