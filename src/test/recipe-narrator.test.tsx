import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RecipeNarrator from '@/components/RecipeNarrator';
import { LanguageProvider } from '@/i18n/LanguageContext';
import App from '@/App';

const hungarianSteps = `1. Vágd fel a húst. Aprítsd fel a hagymát.

2. Párold meg a hagymát. Pirítsd körbe a húst.

3. Húzd le a fazekat a tűzről, majd add hozzá a pirospaprikát.`;
const englishSteps = `1. Cut the beef. Chop the onion.

2. Cook the onion. Brown the beef.

3. Remove the pot from the heat before adding the paprika.`;

class MockUtterance {
  text: string;
  lang = '';
  rate = 1;
  pitch = 1;
  volume = 1;
  voice: SpeechSynthesisVoice | null = null;
  onstart: (() => void) | null = null;
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(text: string) { this.text = text; }
}

const speech = {
  speak: vi.fn((utterance: MockUtterance) => utterance.onstart?.()),
  pause: vi.fn(), resume: vi.fn(), cancel: vi.fn(), getVoices: vi.fn(() => []),
  addEventListener: vi.fn(), removeEventListener: vi.fn(),
};

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: speech });
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value: MockUtterance });
  Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', { configurable: true, value: MockUtterance });
});

describe('Gulyásleves spoken guidance', () => {
  it('appears on the Gulyásleves recipe page', () => {
    window.history.pushState({}, '', '/recipes/soup-2');
    render(<App />);
    expect(screen.getByTestId('recipe-narrator')).toBeInTheDocument();
    expect(screen.getByText('Nagymama hangos segítsége')).toBeInTheDocument();
  });

  it('plays Hungarian steps at a natural pace and provides the agreed controls', () => {
    render(<LanguageProvider><RecipeNarrator recipeName="Gulyásleves" description={hungarianSteps} /></LanguageProvider>);

    expect(screen.getByText('Nagymama hangos segítsége')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '10 mp vissza' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Lépés ismétlése' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Lejátszás' }));

    const utterance = speech.speak.mock.calls.at(-1)?.[0] as MockUtterance;
    expect(utterance.lang).toBe('hu-HU');
    expect(utterance.rate).toBe(0.95);
    expect(utterance.pitch).toBe(0.92);
    fireEvent.click(screen.getByRole('button', { name: 'Szünet' }));
    expect(speech.pause).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Folytatás' })).toBeInTheDocument();
  });

  it('narrates and labels the same feature in English', () => {
    localStorage.setItem('plan-pan-language', 'en');
    render(<LanguageProvider><RecipeNarrator recipeName="Gulyásleves" description={englishSteps} /></LanguageProvider>);

    expect(screen.getByText("Grandma's cooking guidance")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back 10 sec' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    const utterance = speech.speak.mock.calls.at(-1)?.[0] as MockUtterance;
    expect(utterance.lang).toBe('en-CA');
    fireEvent.click(screen.getByRole('button', { name: 'Next step' }));
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    expect((speech.speak.mock.calls.at(-1)?.[0] as MockUtterance).text).toContain('Step 2');
  });
});
