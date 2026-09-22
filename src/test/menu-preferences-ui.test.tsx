import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MenuPreferencesPanel from '@/components/MenuPreferencesPanel';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { defaultRecipes } from '@/data/recipes';
import { DEFAULT_MENU_PREFERENCES } from '@/types/recipe';

describe('family preferences panel', () => {
  beforeEach(() => localStorage.clear());

  it('presents simple Hungarian questions and saves the selected family profile', () => {
    const onSave = vi.fn();
    render(<LanguageProvider><MenuPreferencesPanel preferences={DEFAULT_MENU_PREFERENCES} hasSavedPreferences={false} recipes={defaultRecipes} onSave={onSave} /></LanguageProvider>);

    expect(screen.getByText('Családi beállítások')).toBeInTheDocument();
    expect(screen.getByText('Hány főre főztök?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('radio', { name: 'Vegetáriánus' }));
    fireEvent.click(screen.getByRole('radio', { name: '2 napra' }));
    fireEvent.click(screen.getByRole('button', { name: 'Beállítások mentése' }));

    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ diet: 'vegetarian', batchDays: 2, familySize: 4 }));
  });

  it('shows the same setup clearly in English', () => {
    localStorage.setItem('plan-pan-language', 'en');
    render(<LanguageProvider><MenuPreferencesPanel preferences={DEFAULT_MENU_PREFERENCES} hasSavedPreferences={false} recipes={defaultRecipes} onSave={() => undefined} /></LanguageProvider>);

    expect(screen.getByText('Family preferences')).toBeInTheDocument();
    expect(screen.getByText('How many people are you cooking for?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save preferences' })).toBeInTheDocument();
  });

  it('shows bilingual cloud saving states without changing the settings form', () => {
    const view = render(<LanguageProvider><MenuPreferencesPanel preferences={DEFAULT_MENU_PREFERENCES} hasSavedPreferences recipes={defaultRecipes} onSave={() => undefined} cloudSyncEnabled syncStatus="saving" /></LanguageProvider>);
    expect(screen.getByText('Mentés…')).toBeInTheDocument();

    localStorage.setItem('plan-pan-language', 'en');
    view.unmount();
    render(<LanguageProvider><MenuPreferencesPanel preferences={DEFAULT_MENU_PREFERENCES} hasSavedPreferences recipes={defaultRecipes} onSave={() => undefined} cloudSyncEnabled syncStatus="saved" /></LanguageProvider>);
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('visually and verbally separates dangerous allergies from intolerances', () => {
    render(<LanguageProvider><MenuPreferencesPanel preferences={DEFAULT_MENU_PREFERENCES} hasSavedPreferences={false} recipes={defaultRecipes} onSave={() => undefined} /></LanguageProvider>);

    expect(screen.getByText('Teljes kizárás. Már kis mennyiség is súlyos reakciót okozhat.')).toHaveClass('text-destructive');
    expect(screen.getByText('Emésztési érzékenység. A kijelölt összetevőket az Autopilot kerüli.')).toHaveClass('text-muted-foreground');

    const milkAllergy = screen.getByRole('checkbox', { name: 'Tej' });
    fireEvent.click(milkAllergy);
    expect(milkAllergy).toHaveClass('bg-destructive');

    const lactoseIntolerance = screen.getByRole('checkbox', { name: 'Laktóz' });
    fireEvent.click(lactoseIntolerance);
    expect(lactoseIntolerance).toHaveClass('bg-primary');
  });
});
