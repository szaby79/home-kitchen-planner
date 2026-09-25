import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HelpPage from '@/pages/HelpPage';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import App from '@/App';

afterEach(() => {
  cleanup();
  localStorage.clear();
});

function HelpHarness({ path = '/help' }: { path?: string }) {
  return (
    <LanguageProvider>
      <MemoryRouter initialEntries={[path]}>
        <HelpPage />
      </MemoryRouter>
    </LanguageProvider>
  );
}

function LanguageControl() {
  const { setLanguage } = useLanguage();
  return <button type="button" onClick={() => setLanguage('en')}>English</button>;
}

describe('Help Centre', () => {
  it('provides every Hungarian help section as an accessible accordion', () => {
    render(<HelpHarness />);

    expect(screen.getByRole('heading', { level: 1, name: 'Súgó' })).toBeInTheDocument();
    const sectionNames = [
      'A Plan & Pan röviden', 'Autopilot', 'Családi beállítások', 'Heti terv',
      'Napi terv és napi megjelenítés', 'Heti bevásárlólista', 'Napi bevásárlólista',
      'Maradék és többnapos főzés', 'Adagok', 'Kedvencek', 'Ételcsere és újragenerálás',
      'Vendégmód', 'Bejelentkezett fiók', 'Felhőmentés és szinkronizálás',
      'Fiók és adatvédelem', 'Gyakori kérdések és hibaelhárítás',
    ];

    sectionNames.forEach(name => {
      const trigger = screen.getByRole('button', { name });
      expect(trigger).toHaveAttribute('aria-expanded');
      fireEvent.click(trigger);
    });
    expect(screen.getByText(/nem kamra- vagy készletnyilvántartás/i)).toBeInTheDocument();
    expect(screen.getByText(/Ez jelenleg nincs megvalósítva/i)).toBeInTheDocument();
    expect(screen.getByText('Alkalmazásverzió: 1.81.0')).toBeInTheDocument();
  });

  it('switches all Help Centre content to English', () => {
    render(
      <LanguageProvider>
        <LanguageControl />
        <MemoryRouter><HelpPage /></MemoryRouter>
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'English' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Help Centre' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Daily shopping list' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Napi bevásárlólista' })).not.toBeInTheDocument();
  });

  it('opens the section targeted by contextual help', () => {
    render(<HelpHarness path="/help#daily-shopping" />);

    expect(screen.getByRole('button', { name: 'Napi bevásárlólista' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/megtervezett napok szerint külön szakaszokban/i)).toBeInTheDocument();
  });

  it('makes Help prominent without duplicating it in the main navigation', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getByRole('link', { name: 'Hogyan működik?' })).toHaveAttribute('href', '/help');
    expect(screen.getByRole('link', { name: 'Súgó megnyitása' })).toHaveAttribute('href', '/help');
    expect(screen.queryByRole('link', { name: 'Súgó' })).not.toBeInTheDocument();
  });
});
