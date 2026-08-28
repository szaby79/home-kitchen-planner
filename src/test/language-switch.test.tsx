import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import App from '@/App';

afterEach(() => cleanup());

function Probe() {
  const { language, setLanguage, tr } = useLanguage();
  return <><p>{language}</p><p>{tr('Receptek', 'Recipes')}</p><button onClick={() => setLanguage('en')}>EN</button></>;
}

describe('language switch', () => {
  it('switches to English and persists the choice', () => {
    localStorage.clear();
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(screen.getByText('Receptek')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(screen.getByText('Recipes')).toBeInTheDocument();
    expect(localStorage.getItem('plan-pan-language')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('shows English navigation and guidance while Hungarian food names remain unchanged', async () => {
    localStorage.clear();
    window.history.pushState({}, '', '/');
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'English language' }));
    expect(screen.getByText(/takes the work out of weekly meal planning/i)).toBeInTheDocument();
    expect(screen.getAllByText('Quick meals').length).toBeGreaterThan(0);
    fireEvent.click(screen.getAllByRole('link', { name: /Recipes/i })[0]);
    expect(await screen.findByText('Húsleves')).toBeInTheDocument();
    expect(screen.getAllByText('Soups').length).toBeGreaterThan(0);
  });
});
