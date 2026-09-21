import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '@/App';

describe('recipe filters', () => {
  it('clears the active category when quick meals are selected', async () => {
    localStorage.clear();
    window.history.pushState({}, '', '/recipes?category=dessert');
    render(<App />);

    fireEvent.click(screen.getByText('Szűrés és rendezés'));
    fireEvent.click(screen.getByRole('button', { name: /gyors ételek/i }));
    await waitFor(() => {
      expect(window.location.search).toContain('quick=1');
      expect(window.location.search).not.toContain('category=');
      expect(screen.queryByText('Nincs találat.')).not.toBeInTheDocument();
    });
  });

  it('keeps advanced filters collapsed until requested and shows active filter state', async () => {
    localStorage.clear();
    window.history.pushState({}, '', '/recipes');
    render(<App />);

    const filters = screen.getByText('Szűrés és rendezés').closest('details');
    expect(filters).not.toHaveAttribute('open');
    expect(screen.getByPlaceholderText('Recept keresése...')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Összes' })).toBeVisible();

    fireEvent.click(screen.getByText('Szűrés és rendezés'));
    fireEvent.click(screen.getByRole('button', { name: 'Kedvencek' }));
    expect(await screen.findByText('1 aktív')).toBeInTheDocument();
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
