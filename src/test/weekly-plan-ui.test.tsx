import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '@/App';

describe('weekly plan replacement confirmation', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/planner');
  });

  it.each([
    ['hu', 'Heti menü generálása', 'Lecseréled a jelenlegi heti tervet?', 'Mégse'],
    ['en', 'Generate weekly menu', 'Replace the current weekly plan?', 'Cancel'],
  ])('requires explicit confirmation before Autopilot replaces an existing plan (%s)', (language, generateLabel, title, cancelLabel) => {
    localStorage.setItem('plan-pan-language', language);
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: generateLabel }));
    expect(screen.getByText(language === 'en' ? 'Your week is ready' : 'Elkészült a hetetek')).toBeInTheDocument();
    const saved = localStorage.getItem('plan-pan-weekplan');

    fireEvent.click(screen.getByRole('button', { name: generateLabel }));
    expect(screen.getByRole('alertdialog')).toHaveTextContent(title);
    expect(localStorage.getItem('plan-pan-weekplan')).toBe(saved);
    fireEvent.click(screen.getByRole('button', { name: cancelLabel }));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(localStorage.getItem('plan-pan-weekplan')).toBe(saved);
  });

  it('keeps the saved weekly menu reachable after the planner is reopened', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Heti menü generálása' }));
    expect(screen.getByText('Elkészült a hetetek')).toBeInTheDocument();

    cleanup();
    window.history.pushState({}, '', '/planner');
    render(<App />);

    const openSavedMenu = screen.getByRole('link', { name: 'Mentett heti menü megnyitása' });
    expect(openSavedMenu).toHaveAttribute('href', '/planner/week');
    fireEvent.click(openSavedMenu);
    expect(screen.getByRole('heading', { name: 'Heti menüterv' })).toBeInTheDocument();
  });

  it('keeps day settings compact until the user chooses a day to edit', () => {
    render(<App />);

    expect(screen.queryByLabelText('Hányan esznek?')).not.toBeInTheDocument();
    const dayButtons = screen.getAllByRole('button', { name: /Módosítás/ });
    expect(dayButtons).toHaveLength(7);
    expect(dayButtons.every(button => button.getAttribute('aria-expanded') === 'false')).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: /Kedd.*Módosítás/ }));
    expect(screen.getByLabelText('Hányan esznek?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Kedd.*Módosítás/ })).toHaveAttribute('aria-expanded', 'true');

    fireEvent.change(screen.getByLabelText('Hányan esznek?'), { target: { value: '5' } });
    expect(screen.getByRole('button', { name: /Kedd.*5 fő.*Módosítás/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Szerda.*Módosítás/ }));
    expect(screen.getByRole('button', { name: /Kedd.*Módosítás/ })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getAllByLabelText('Hányan esznek?')).toHaveLength(1);
  });

  it('uses one non-floating primary action for generation', () => {
    render(<App />);

    expect(screen.getAllByRole('button', { name: 'Heti menü generálása' })).toHaveLength(1);
    expect(screen.getByTestId('generate-week-panel')).not.toHaveClass('sticky');
  });
});
