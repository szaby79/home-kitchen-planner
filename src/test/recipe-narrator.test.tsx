import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RecipeNarrator from '@/components/RecipeNarrator';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import App from '@/App';
import { defaultRecipes } from '@/data/recipes';
import { localizeRecipe } from '@/i18n/recipeLocalization';
import { splitRecipeSteps } from '@/lib/recipeSteps';

const hungarianSteps = `1. Vágd fel a húst. Aprítsd fel a hagymát.

2. Párold meg a hagymát. Pirítsd körbe a húst.

3. Húzd le a fazekat a tűzről, majd add hozzá a pirospaprikát.`;
const englishSteps = `1. Cut the beef. Chop the onion.

2. Cook the onion. Brown the beef.

3. Remove the pot from the heat before adding the paprika.`;

class MockAudio {
  src = '';
  currentTime = 0;
  onended: (() => void) | null = null;
  onerror: (() => void) | null = null;
  play = vi.fn(async () => undefined);
  pause = vi.fn();
  constructor() { audioElements.push(this); }
}

let audioElements: MockAudio[];
const fetchMock = vi.fn<typeof fetch>();
const speech = { speak: vi.fn(), cancel: vi.fn() };
const audioResponse = () => new Response(new Blob(['test audio'], { type: 'audio/mpeg' }), { status: 200 });

function renderNarrator(language: 'hu' | 'en' = 'hu') {
  localStorage.setItem('plan-pan-language', language);
  return render(<LanguageProvider><RecipeNarrator recipeName="Gulyásleves" description={language === 'hu' ? hungarianSteps : englishSteps} /></LanguageProvider>);
}

function SwitchableNarrator() {
  const { isEnglish, setLanguage } = useLanguage();
  return <>
    <button onClick={() => setLanguage(isEnglish ? 'hu' : 'en')}>Switch language</button>
    <RecipeNarrator recipeName="Gulyásleves" description={isEnglish ? englishSteps : hungarianSteps} />
  </>;
}

beforeEach(() => {
  localStorage.clear();
  audioElements = [];
  fetchMock.mockReset().mockImplementation(async () => audioResponse());
  vi.stubGlobal('fetch', fetchMock);
  vi.stubGlobal('Audio', MockAudio);
  vi.stubGlobal('speechSynthesis', speech);
  Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: vi.fn(() => `blob:test-${Math.random()}`) });
  Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() });
  speech.speak.mockClear();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Hungarian and English custom voice guidance', () => {
  it.each(['', '   '])('hides playback for a custom recipe without directions (%j)', description => {
    localStorage.setItem('plan-pan-recipes', JSON.stringify([{ ...defaultRecipes[0], id: 'custom-empty', description }]));
    window.history.pushState({}, '', '/recipes/custom-empty');
    render(<App />);
    expect(screen.queryByTestId('recipe-narrator')).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('offers playback for a custom recipe with unnumbered directions', async () => {
    localStorage.setItem('plan-pan-recipes', JSON.stringify([{ ...defaultRecipes[0], id: 'custom-test', description: 'Keverd össze, majd tálald.' }]));
    window.history.pushState({}, '', '/recipes/custom-test');
    render(<App />);
    expect(fetchMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Lejátszás' }));
    await screen.findByRole('button', { name: 'Szünet' });
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual({ text: 'Keverd össze, majd tálald.' });
  });

  it.each(defaultRecipes.flatMap(recipe => (['hu', 'en'] as const).map(language => ({ recipe, language }))))(
    'offers on-demand guidance on $recipe.id in $language', async ({ recipe, language }) => {
      localStorage.setItem('plan-pan-language', language);
      window.history.pushState({}, '', `/recipes/${recipe.id}`);
      render(<App />);
      const en = language === 'en';
      const steps = splitRecipeSteps(localizeRecipe(recipe, en).description);
      expect(screen.getByTestId('recipe-narrator')).toHaveTextContent(steps[0]);
      expect(fetchMock).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole('button', { name: en ? 'Play' : 'Lejátszás' }));
      await screen.findByRole('button', { name: en ? 'Pause' : 'Szünet' });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, init] = fetchMock.mock.calls[0];
      expect(url).toBe('/api/tts');
      expect(JSON.parse(String(init?.body))).toEqual({ text: steps[0] });
      expect(audioElements[0].play).toHaveBeenCalledOnce();
      expect(speech.speak).not.toHaveBeenCalled();
    },
  );

  it('appears on the Gulyásleves recipe page without generating audio', () => {
    window.history.pushState({}, '', '/recipes/soup-2');
    render(<App />);
    expect(screen.getByTestId('recipe-narrator')).toBeInTheDocument();
    expect(screen.getByText('Nagymama hangos segítsége')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each(['hu', 'en'] as const)('sends the selected language text through /api/tts, with no browser speech (%s)', async language => {
    renderNarrator(language);
    const en = language === 'en';
    expect(fetchMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: en ? 'Play' : 'Lejátszás' }));
    await screen.findByRole('button', { name: en ? 'Pause' : 'Szünet' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/tts');
    expect(init?.method).toBe('POST');
    expect(JSON.parse(String(init?.body))).toEqual({ text: en ? 'Cut the beef. Chop the onion.' : 'Vágd fel a húst. Aprítsd fel a hagymát.' });
    expect(audioElements[0].play).toHaveBeenCalledOnce();
    expect(speech.speak).not.toHaveBeenCalled();
  });

  it.each(['hu', 'en'] as const)('supports pause, resume, real rewind, cached repeat, step navigation and stop (%s)', async language => {
    const en = language === 'en';
    renderNarrator(language);
    fireEvent.click(screen.getByRole('button', { name: en ? 'Play' : 'Lejátszás' }));
    fireEvent.click(await screen.findByRole('button', { name: en ? 'Pause' : 'Szünet' }));
    expect(audioElements[0].pause).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: en ? 'Continue' : 'Folytatás' }));
    await screen.findByRole('button', { name: en ? 'Pause' : 'Szünet' });
    audioElements[0].currentTime = 15;
    fireEvent.click(screen.getByRole('button', { name: en ? 'Back 10 sec' : '10 mp vissza' }));
    expect(audioElements[0].currentTime).toBe(5);
    await act(async () => undefined);
    fireEvent.click(screen.getByRole('button', { name: en ? 'Repeat step' : 'Lépés ismétlése' }));
    await screen.findByRole('button', { name: en ? 'Pause' : 'Szünet' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: en ? 'Next step' : 'Következő lépés' }));
    await screen.findByRole('button', { name: en ? 'Pause' : 'Szünet' });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).text).toBe(en ? 'Cook the onion. Brown the beef.' : 'Párold meg a hagymát. Pirítsd körbe a húst.');
    fireEvent.click(screen.getByRole('button', { name: en ? 'Previous step' : 'Előző lépés' }));
    await screen.findByRole('button', { name: en ? 'Pause' : 'Szünet' });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    fireEvent.click(screen.getByRole('button', { name: en ? 'Stop' : 'Leállítás' }));
    expect(audioElements[0].currentTime).toBe(0);
    expect(screen.getByRole('button', { name: en ? 'Play' : 'Lejátszás' })).toBeInTheDocument();
    const callsBeforeRewind = audioElements[0].play.mock.calls.length;
    fireEvent.click(screen.getByRole('button', { name: en ? 'Back 10 sec' : '10 mp vissza' }));
    expect(audioElements[0].play.mock.calls.length).toBe(callsBeforeRewind);
  });

  it('uses Hungarian custom audio on devices without the browser speech API', async () => {
    vi.stubGlobal('speechSynthesis', undefined);
    vi.stubGlobal('SpeechSynthesisUtterance', undefined);
    renderNarrator();
    fireEvent.click(screen.getByRole('button', { name: 'Lejátszás' }));
    await screen.findByRole('button', { name: 'Szünet' });
    expect(audioElements[0].play).toHaveBeenCalled();
  });

  it.each(['hu', 'en'] as const)('shows a localized service error and can retry without a browser fallback (%s)', async language => {
    const en = language === 'en';
    fetchMock.mockResolvedValueOnce(new Response('{}', { status: 502 }));
    renderNarrator(language);
    fireEvent.click(screen.getByRole('button', { name: en ? 'Play' : 'Lejátszás' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(en ? 'Voice guidance is unavailable' : 'A hangos segítség most nem elérhető');
    expect(speech.speak).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: en ? 'Play' : 'Lejátszás' }));
    await screen.findByRole('button', { name: en ? 'Pause' : 'Szünet' });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('keeps existing per-step playback instead of automatically generating the next step', async () => {
    renderNarrator('en');
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    await screen.findByRole('button', { name: 'Pause' });
    act(() => audioElements[0].onended?.());
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('deduplicates pending requests and prevents late playback after Stop', async () => {
    let resolve!: (response: Response) => void;
    fetchMock.mockImplementationOnce(() => new Promise<Response>(done => { resolve = done; }));
    renderNarrator();
    fireEvent.click(screen.getByRole('button', { name: 'Lejátszás' }));
    expect(screen.getByRole('button', { name: 'Készítem…' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Lépés ismétlése' }));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'Leállítás' }));
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true);
    await act(async () => { resolve(audioResponse()); });
    expect(audioElements).toHaveLength(0);
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });

  it('does not let a late Hungarian response interfere with English playback', async () => {
    let resolve!: (response: Response) => void;
    fetchMock.mockImplementationOnce(() => new Promise<Response>(done => { resolve = done; }));
    render(<LanguageProvider><SwitchableNarrator /></LanguageProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Lejátszás' }));
    fireEvent.click(screen.getByRole('button', { name: 'Switch language' }));
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    await screen.findByRole('button', { name: 'Pause' });
    await act(async () => { resolve(audioResponse()); });
    expect(audioElements).toHaveLength(1);
    expect(audioElements[0].play).toHaveBeenCalledOnce();
    expect(URL.createObjectURL).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  });

  it('stops active audio and clears cached URLs when switching language and unmounting', async () => {
    const { unmount } = render(<LanguageProvider><SwitchableNarrator /></LanguageProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Lejátszás' }));
    await screen.findByRole('button', { name: 'Szünet' });
    const oldUrl = audioElements[0].src;
    fireEvent.click(screen.getByRole('button', { name: 'Switch language' }));
    expect(audioElements[0].pause).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(oldUrl);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    await screen.findByRole('button', { name: 'Pause' });
    const newUrl = audioElements[1].src;
    unmount();
    expect(audioElements[1].pause).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(newUrl);
  });

  it('discards pending audio after unmount', async () => {
    let resolve!: (response: Response) => void;
    fetchMock.mockImplementationOnce(() => new Promise<Response>(done => { resolve = done; }));
    const { unmount } = renderNarrator();
    fireEvent.click(screen.getByRole('button', { name: 'Lejátszás' }));
    unmount();
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true);
    await act(async () => { resolve(audioResponse()); });
    expect(URL.createObjectURL).not.toHaveBeenCalled();
    expect(audioElements).toHaveLength(0);
  });

  it('resets playback and drops a pending response when the recipe changes', async () => {
    let resolve!: (response: Response) => void;
    fetchMock.mockImplementationOnce(() => new Promise<Response>(done => { resolve = done; }));
    const { rerender } = renderNarrator();
    fireEvent.click(screen.getByRole('button', { name: 'Lejátszás' }));
    rerender(<LanguageProvider><RecipeNarrator recipeName="Másik recept" description="1. Készítsük elő a burgonyát." /></LanguageProvider>);
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true);
    await act(async () => { resolve(audioResponse()); });
    expect(audioElements).toHaveLength(0);
    expect(screen.getByText('Készítsük elő a burgonyát.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Lejátszás' })).toBeEnabled();
  });

  it('reports audio playback errors without falling back to system speech', async () => {
    renderNarrator();
    fireEvent.click(screen.getByRole('button', { name: 'Lejátszás' }));
    await screen.findByRole('button', { name: 'Szünet' });
    act(() => audioElements[0].onerror?.());
    expect(screen.getByRole('alert')).toHaveTextContent('A hang lejátszása nem sikerült');
    expect(speech.speak).not.toHaveBeenCalled();
  });
});
