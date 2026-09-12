import { fireEvent, render, screen } from '@testing-library/react';
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
});
