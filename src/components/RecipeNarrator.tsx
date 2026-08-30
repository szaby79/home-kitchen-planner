import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, Pause, Play, Repeat2, Rewind, SkipBack, SkipForward, Square, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

type Props = {
  recipeName: string;
  description: string;
};

type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'finished';

export default function RecipeNarrator({ recipeName, description }: Props) {
  const { isEnglish, tr } = useLanguage();
  const steps = useMemo(() => splitSteps(description), [description]);
  const [status, setStatus] = useState<PlaybackStatus>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const runId = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCache = useRef(new Map<string, string>());
  const pendingText = useRef<string | null>(null);
  const pendingRequest = useRef<AbortController | null>(null);

  const stopAudio = useCallback(() => {
    pendingRequest.current?.abort();
    pendingRequest.current = null;
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    pendingText.current = null;
  }, []);

  // Never let a response from a previous language/recipe start playing later.
  useEffect(() => {
    setCurrentStep(0);
    setStatus('idle');
    setError(null);
    setLoading(false);
    const cache = audioCache.current;
    return () => {
      runId.current += 1;
      stopAudio();
      audioRef.current = null;
      cache.forEach(url => URL.revokeObjectURL(url));
      cache.clear();
    };
  }, [isEnglish, description, stopAudio]);

  const playStepWithCustomVoice = useCallback(async (stepIndex: number) => {
    const text = steps[stepIndex]?.trim();
    if (!text) return;
    if (pendingText.current === text) return; // prevent duplicate requests
    const activeRun = ++runId.current;
    stopAudio();
    setCurrentStep(stepIndex);
    setStatus('idle');
    setLoading(false);
    setError(null);

    let url = audioCache.current.get(text);
    if (!url) {
      pendingText.current = text;
      const controller = new AbortController();
      pendingRequest.current = controller;
      setLoading(true);
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('tts-failed');
        const blob = await response.blob();
        if (activeRun !== runId.current) return;
        url = URL.createObjectURL(blob);
        audioCache.current.set(text, url);
      } catch {
        if (activeRun === runId.current) {
          setLoading(false);
          setStatus('idle');
          setError(tr('A hangos segítség most nem elérhető. Próbáld újra.', 'Voice guidance is unavailable right now. Please try again.'));
        }
        return;
      } finally {
        if (activeRun === runId.current) {
          pendingText.current = null;
          pendingRequest.current = null;
          setLoading(false);
        }
      }
    }
    if (activeRun !== runId.current) return;

    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio();
      audioRef.current = audio;
    }
    audio.onended = () => { if (activeRun === runId.current) setStatus('finished'); };
    audio.onerror = () => {
      if (activeRun === runId.current) {
        setStatus('idle');
        setError(tr('A hang lejátszása nem sikerült. Próbáld újra.', 'Audio playback failed. Please try again.'));
      }
    };
    audio.src = url;
    audio.currentTime = 0;
    try {
      await audio.play();
      if (activeRun === runId.current) setStatus('playing');
    } catch {
      if (activeRun === runId.current) {
        setStatus('idle');
        setError(tr('A hang lejátszása nem sikerült. Próbáld újra.', 'Audio playback failed. Please try again.'));
      }
    }
  }, [steps, stopAudio, tr]);

  const resumeAudio = (audio: HTMLAudioElement) => {
    const activeRun = runId.current;
    setError(null);
    void audio.play().then(() => {
      if (activeRun === runId.current) setStatus('playing');
    }).catch(() => {
      if (activeRun === runId.current) {
        setStatus('paused');
        setError(tr('A hang lejátszása nem sikerült. Próbáld újra.', 'Audio playback failed. Please try again.'));
      }
    });
  };

  const playOrPause = () => {
    const audio = audioRef.current;
    if (status === 'playing' && audio) {
      audio.pause();
      setStatus('paused');
    } else if (status === 'paused' && audio) {
      resumeAudio(audio);
    } else {
      void playStepWithCustomVoice(currentStep);
    }
  };

  const stopPlayback = () => {
    runId.current += 1;
    stopAudio();
    setLoading(false);
    setStatus('idle');
  };

  const jumpToStep = (stepIndex: number) => {
    const target = Math.max(0, Math.min(steps.length - 1, stepIndex));
    void playStepWithCustomVoice(target);
  };

  const rewindTenSeconds = () => {
    const audio = audioRef.current;
    if (loading || status === 'idle' || !audio || !audio.src) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
    resumeAudio(audio);
  };

  return <section className="mb-6 overflow-hidden rounded-xl border border-primary/25 bg-card shadow-sm" data-testid="recipe-narrator">
    <div className="flex items-start gap-3 border-b bg-primary/[0.045] p-4 sm:p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Volume2 className="h-5 w-5" /></span>
      <div>
        <h2 className="font-display text-lg font-semibold">{tr('Nagymama hangos segítsége', "Grandma's cooking guidance")}</h2>
        <p className="text-sm text-muted-foreground">{tr(`A ${recipeName} elkészítése lépésről lépésre, nyugodt tempóban.`, `Step-by-step guidance for ${recipeName}, spoken at an easy-to-follow pace.`)}</p>
        <span className="mt-2 inline-flex rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-foreground">{isEnglish ? 'English voice' : 'Magyar hang'} · {tr('természetesebb hangteszt', 'natural voice test')}</span>
      </div>
    </div>

    <div className="space-y-4 p-4 sm:p-5">
      <div className="rounded-lg border bg-secondary/25 p-4" aria-live="polite">
        <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-primary">{tr(`${currentStep + 1}. lépés / ${steps.length}`, `Step ${currentStep + 1} of ${steps.length}`)}</p>
        <p className="text-sm leading-relaxed">{steps[currentStep]}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Button type="button" size="lg" onClick={playOrPause} disabled={loading} className="gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : status === 'playing' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {loading ? tr('Készítem…', 'Preparing…') : status === 'playing' ? tr('Szünet', 'Pause') : status === 'paused' ? tr('Folytatás', 'Continue') : tr('Lejátszás', 'Play')}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={rewindTenSeconds} className="gap-2"><Rewind className="h-4 w-4" /> {tr('10 mp vissza', 'Back 10 sec')}</Button>
        <Button type="button" variant="outline" size="lg" onClick={() => jumpToStep(currentStep)} className="gap-2"><Repeat2 className="h-4 w-4" /> {tr('Lépés ismétlése', 'Repeat step')}</Button>
        <Button type="button" variant="ghost" size="lg" onClick={stopPlayback} className="gap-2"><Square className="h-4 w-4" /> {tr('Leállítás', 'Stop')}</Button>
        <Button type="button" variant="ghost" size="lg" disabled={currentStep === 0} onClick={() => jumpToStep(currentStep - 1)} className="gap-2"><SkipBack className="h-4 w-4" /> {tr('Előző lépés', 'Previous step')}</Button>
        <Button type="button" variant="ghost" size="lg" disabled={currentStep === steps.length - 1} onClick={() => jumpToStep(currentStep + 1)} className="gap-2"><SkipForward className="h-4 w-4" /> {tr('Következő lépés', 'Next step')}</Button>
      </div>
      {error && <p className="text-sm font-medium text-destructive" role="alert">{error}</p>}
      <p className="text-xs text-muted-foreground">{tr('A „10 mp vissza” az aktuális lépés hangját tekeri vissza tíz másodperccel.', '“Back 10 sec” rewinds the current step by ten seconds.')}</p>
    </div>
  </section>;
}

function splitSteps(description: string) {
  const matches = [...description.matchAll(/(?:^|\n\n)(\d+)\.\s*([\s\S]*?)(?=\n\n\d+\.|$)/g)];
  return matches.length ? matches.map(match => match[2].trim()) : [description.trim()];
}
