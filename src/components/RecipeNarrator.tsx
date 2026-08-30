import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, Pause, Play, Repeat2, Rewind, SkipBack, SkipForward, Square, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

type Props = {
  recipeName: string;
  description: string;
};

type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'finished';

const HUNGARIAN_RATE = 0.84;

export default function RecipeNarrator({ recipeName, description }: Props) {
  const { isEnglish, tr } = useLanguage();
  const steps = useMemo(() => splitSteps(description), [description]);
  const segments = useMemo(() => steps.map(step => splitSentences(step)), [steps]);
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState<PlaybackStatus>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentSegment = useRef(0);
  const runId = useRef(0);
  const voices = useRef<SpeechSynthesisVoice[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCache = useRef(new Map<string, string>());
  const pendingText = useRef<string | null>(null);

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    pendingText.current = null;
  }, []);

  useEffect(() => {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setSupported(false);
      return;
    }
    const loadVoices = () => { voices.current = window.speechSynthesis.getVoices(); };
    loadVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
    return () => {
      runId.current += 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.removeEventListener?.('voiceschanged', loadVoices);
    };
  }, []);

  // Clean up audio element and cached object URLs on unmount.
  useEffect(() => () => {
    audioRef.current?.pause();
    audioRef.current = null;
    audioCache.current.forEach(url => URL.revokeObjectURL(url));
    audioCache.current.clear();
  }, []);

  useEffect(() => {
    runId.current += 1;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    stopAudio();
    currentSegment.current = 0;
    setCurrentStep(0);
    setStatus('idle');
    setError(null);
    setLoading(false);
  }, [isEnglish, description, stopAudio]);

  const speakSegment = (stepIndex: number, segmentIndex: number) => {
    if (!supported || !segments[stepIndex]?.[segmentIndex]) return;
    const synth = window.speechSynthesis;
    const activeRun = ++runId.current;
    synth.cancel();
    setCurrentStep(stepIndex);
    currentSegment.current = segmentIndex;

    const prefix = segmentIndex === 0 ? `${stepIndex + 1}. lépés. ` : '';
    const utterance = new SpeechSynthesisUtterance(`${prefix}${segments[stepIndex][segmentIndex]}`);
    utterance.lang = 'hu-HU';
    utterance.rate = HUNGARIAN_RATE;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.voice = chooseWarmVoice(voices.current, false) ?? null;
    utterance.onstart = () => { if (activeRun === runId.current) setStatus('playing'); };
    utterance.onend = () => {
      if (activeRun !== runId.current) return;
      const nextSegment = segmentIndex + 1;
      if (segments[stepIndex][nextSegment]) {
        speakSegment(stepIndex, nextSegment);
      } else if (steps[stepIndex + 1]) {
        speakSegment(stepIndex + 1, 0);
      } else {
        setStatus('finished');
      }
    };
    utterance.onerror = () => { if (activeRun === runId.current) setStatus('idle'); };
    synth.speak(utterance);
  };

  const playStepWithCustomVoice = useCallback(async (stepIndex: number) => {
    const text = steps[stepIndex]?.trim();
    if (!text) return;
    if (pendingText.current === text) return; // prevent duplicate requests
    const activeRun = ++runId.current;
    stopAudio();
    setCurrentStep(stepIndex);
    setError(null);

    let url = audioCache.current.get(text);
    if (!url) {
      pendingText.current = text;
      setLoading(true);
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        if (!response.ok) throw new Error('tts-failed');
        const blob = await response.blob();
        url = URL.createObjectURL(blob);
        audioCache.current.set(text, url);
      } catch {
        if (activeRun === runId.current) {
          setLoading(false);
          setStatus('idle');
          setError(tr('A hangos segítség most nem elérhető. Próbáld újra.', 'Voice guidance is unavailable right now. Please try again.'));
        }
        pendingText.current = null;
        return;
      } finally {
        pendingText.current = null;
        if (activeRun === runId.current) setLoading(false);
      }
    }
    if (activeRun !== runId.current) return;

    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio();
      audioRef.current = audio;
    }
    audio.onended = () => { if (activeRun === runId.current) setStatus('finished'); };
    audio.onerror = () => { if (activeRun === runId.current) setStatus('idle'); };
    audio.src = url;
    audio.currentTime = 0;
    try {
      await audio.play();
      if (activeRun === runId.current) setStatus('playing');
    } catch {
      if (activeRun === runId.current) setStatus('idle');
    }
  }, [steps, stopAudio, tr]);

  const playOrPause = () => {
    if (isEnglish) {
      const audio = audioRef.current;
      if (status === 'playing' && audio) {
        audio.pause();
        setStatus('paused');
      } else if (status === 'paused' && audio) {
        void audio.play().then(() => setStatus('playing')).catch(() => setStatus('idle'));
      } else {
        void playStepWithCustomVoice(currentStep);
      }
      return;
    }
    const synth = window.speechSynthesis;
    if (status === 'playing') {
      synth.pause();
      setStatus('paused');
    } else if (status === 'paused') {
      synth.resume();
      setStatus('playing');
    } else {
      speakSegment(status === 'finished' ? 0 : currentStep, status === 'finished' ? 0 : currentSegment.current);
    }
  };

  const stopPlayback = () => {
    runId.current += 1;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    stopAudio();
    setLoading(false);
    setStatus('idle');
  };

  const jumpToStep = (stepIndex: number) => {
    const target = Math.max(0, Math.min(steps.length - 1, stepIndex));
    if (isEnglish) {
      runId.current += 1;
      stopAudio();
      setStatus('idle');
      void playStepWithCustomVoice(target);
      return;
    }
    speakSegment(target, 0);
  };

  const rewindTenSeconds = () => {
    if (isEnglish) {
      const audio = audioRef.current;
      if (!audio || !audio.src) return;
      audio.currentTime = Math.max(0, audio.currentTime - 10);
      void audio.play().then(() => setStatus('playing')).catch(() => undefined);
      return;
    }
    const segmentIndex = currentSegment.current;
    if (segmentIndex > 0) speakSegment(currentStep, segmentIndex - 1);
    else if (currentStep > 0) speakSegment(currentStep - 1, Math.max(0, segments[currentStep - 1].length - 1));
    else speakSegment(0, 0);
  };

  const unavailable = !isEnglish && !supported;

  return <section className="mb-6 overflow-hidden rounded-xl border border-primary/25 bg-card shadow-sm" data-testid="recipe-narrator">
    <div className="flex items-start gap-3 border-b bg-primary/[0.045] p-4 sm:p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Volume2 className="h-5 w-5" /></span>
      <div>
        <h2 className="font-display text-lg font-semibold">{tr('Nagymama hangos segítsége', "Grandma's cooking guidance")}</h2>
        <p className="text-sm text-muted-foreground">{tr(`A ${recipeName} elkészítése lépésről lépésre, nyugodt tempóban.`, `Step-by-step guidance for ${recipeName}, spoken at an easy-to-follow pace.`)}</p>
        <span className="mt-2 inline-flex rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-foreground">{isEnglish ? 'English voice' : 'Magyar hang'} · {tr('természetesebb hangteszt', 'natural voice test')}</span>
      </div>
    </div>

    {unavailable ? <p className="p-5 text-sm text-muted-foreground">{tr('Ezen az eszközön a hangos felolvasás nem támogatott.', 'Spoken guidance is not supported on this device.')}</p> : <div className="space-y-4 p-4 sm:p-5">
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
      <p className="text-xs text-muted-foreground">{tr('A „10 mp vissza” az előző rövid mondattól folytatja, hogy biztosan semmi ne maradjon ki.', '“Back 10 sec” rewinds the current step by ten seconds.')}</p>
    </div>}
  </section>;
}

function splitSteps(description: string) {
  const matches = [...description.matchAll(/(?:^|\n\n)(\d+)\.\s*([\s\S]*?)(?=\n\n\d+\.|$)/g)];
  return matches.length ? matches.map(match => match[2].trim()) : [description.trim()];
}

function splitSentences(step: string) {
  const sentences = step.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(sentence => sentence.trim()).filter(Boolean);
  return sentences?.length ? sentences : [step];
}

function chooseWarmVoice(voices: SpeechSynthesisVoice[], english: boolean) {
  const language = english ? /^en(?:-|_)/i : /^hu(?:-|_)/i;
  const candidates = voices.filter(voice => language.test(voice.lang));
  const preferredNames = english
    ? ['Natural', 'Neural', 'Premium', 'Enhanced', 'Siri Female', 'Samantha', 'Karen', 'Moira', 'Serena', 'Susan', 'Zira', 'Female']
    : ['Natural', 'Neural', 'Premium', 'Enhanced', 'Siri', 'Tünde', 'Mariska', 'Eszter', 'Hungarian Female', 'Google magyar'];
  return preferredNames.map(name => candidates.find(voice => voice.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))).find(Boolean) ?? candidates[0];
}
