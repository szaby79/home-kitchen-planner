import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from '@/App';

afterEach(() => {
  cleanup();
  localStorage.clear();
  window.history.replaceState({}, '', '/');
});

describe('shopping list mobile simplicity', () => {
  it('shows the list first and keeps optional personal tools collapsed', () => {
    localStorage.setItem('plan-pan-extra-items', JSON.stringify([
      { name: 'Banán', quantity: 6, unit: 'db', manual: true },
    ]));
    window.history.replaceState({}, '', '/shopping');
    render(<App />);

    const list = screen.getByRole('region', { name: 'Heti bevásárlólista' });
    expect(within(list).getByText('Banán')).toBeInTheDocument();
    expect(within(list).getByText('0/1 tétel kész')).toBeInTheDocument();

    const tools = screen.getByRole('button', { name: /Saját tételek és jegyzet/ });
    expect(tools).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('heading', { name: 'Egyéb tétel hozzáadása' })).not.toBeInTheDocument();
    expect(list.compareDocumentPosition(tools) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    fireEvent.click(tools);
    expect(tools).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('heading', { name: 'Egyéb tétel hozzáadása' })).toBeInTheDocument();
    expect(screen.getByLabelText('Saját jegyzet')).toBeInTheDocument();
  });

  it('updates the visible progress when an item is checked', () => {
    localStorage.setItem('plan-pan-extra-items', JSON.stringify([
      { name: 'Banán', quantity: 6, unit: 'db', manual: true },
    ]));
    window.history.replaceState({}, '', '/shopping');
    render(<App />);

    const itemToggle = screen.getByRole('button', { name: 'Banán kipipálása' });
    fireEvent.click(itemToggle);

    expect(screen.getByText('1/1 tétel kész')).toBeInTheDocument();
    expect(screen.getByText('0 van hátra')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Banán visszaállítása' })).toHaveAttribute('aria-pressed', 'true');
  });
});
