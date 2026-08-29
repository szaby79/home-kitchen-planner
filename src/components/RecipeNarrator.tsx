import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, Repeat2, Rewind, SkipBack, SkipForward, Volume2 } from 'lucide-react';
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
  const segments = useMemo(() => steps.map(step => splitSentences(step)), [steps]);
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState<PlaybackStatus>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const currentSegment = useRef(0);
  const runId = useRef(0);
  const voices = useRef<SpeechSynthesisVoice[]>([]);

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

  useEffect(() => {
    if (!supported || !('speechSynthesis' in window)) return;
    runId.current += 1;
    window.speechSynthesis.cancel();
    currentSegment.current = 0;
    setCurrentStep(0);
    setStatus('idle');
  }, [isEnglish, description, supported]);

  const speakSegment = (stepIndex: number, segmentIndex: number) => {
    if (!supported || !segments[stepIndex]?.[segmentIndex]) return;
    const synth = window.speechSynthesis;
    const activeRun = ++runId.current;
    synth.cancel();
    setCurrentStep(stepIndex);
    currentSegment.current = segmentIndex;

    const prefix = segmentIndex === 0 ? tr(`${stepIndex + 1}. lépés. `, `Step ${stepIndex + 1}. `) : '';
    const utterance = new SpeechSynthesisUtterance(`${prefix}${segments[stepIndex][segmentIndex]}`);
    utterance.lang = isEnglish ? 'en-CA' : 'hu-HU';
    utterance.rate = 0.95;
    utterance.pitch = 0.92;
    utterance.volume = 1;
    utterance.voice = chooseWarmVoice(voices.current, isEnglish) ?? null;
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

  const playOrPause = () => {
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
  const jumpToStep = (stepIndex: number) => speakSegment(Math.max(0, Math.min(steps.length - 1, stepIndex)), 0);
  const rewindTenSeconds = () => {
    const segmentIndex = currentSegment.current;
    if (segmentIndex > 0) speakSegment(currentStep, segmentIndex - 1);
    else if (currentStep > 0) speakSegment(currentStep - 1, Math.max(0, segments[currentStep - 1].length - 1));
    else speakSegment(0, 0);
  };

  return <section className="mb-6 overflow-hidden rounded-xl border border-primary/25 bg-card shadow-sm" data-testid="recipe-narrator">
    <div className="flex items-start gap-3 border-b bg-primary/[0.045] p-4 sm:p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Volume2 className="h-5 w-5" /></span>
      <div>
        <h2 className="font-display text-lg font-semibold">{tr('Nagymama hangos segítsége', "Grandma's cooking guidance")}</h2>
        <p className="text-sm text-muted-foreground">{tr(`A ${recipeName} elkészítése lépésről lépésre, normál tempóban.`, `Step-by-step guidance for ${recipeName}, spoken at a natural pace.`)}</p>
        <span className="mt-2 inline-flex rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-foreground">{isEnglish ? 'English voice' : 'Magyar hang'} · {tr('próbaverzió', 'demo')}</span>
      </div>
    </div>

    {!supported ? <p className="p-5 text-sm text-muted-foreground">{tr('Ezen az eszközön a hangos felolvasás nem támogatott.', 'Spoken guidance is not supported on this device.')}</p> : <div className="space-y-4 p-4 sm:p-5">
      <div className="rounded-lg border bg-secondary/25 p-4" aria-live="polite">
        <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-primary">{tr(`${currentStep + 1}. lépés / ${steps.length}`, `Step ${currentStep + 1} of ${steps.length}`)}</p>
        <p className="text-sm leading-relaxed">{steps[currentStep]}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Button type="button" size="lg" onClick={playOrPause} className="gap-2">
          {status === 'playing' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {status === 'playing' ? tr('Szünet', 'Pause') : status === 'paused' ? tr('Folytatás', 'Continue') : tr('Lejátszás', 'Play')}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={rewindTenSeconds} className="gap-2"><Rewind className="h-4 w-4" /> {tr('10 mp vissza', 'Back 10 sec')}</Button>
        <Button type="button" variant="outline" size="lg" onClick={() => jumpToStep(currentStep)} className="gap-2"><Repeat2 className="h-4 w-4" /> {tr('Lépés ismétlése', 'Repeat step')}</Button>
        <Button type="button" variant="ghost" size="lg" disabled={currentStep === 0} onClick={() => jumpToStep(currentStep - 1)} className="gap-2"><SkipBack className="h-4 w-4" /> {tr('Előző lépés', 'Previous step')}</Button>
        <Button type="button" variant="ghost" size="lg" disabled={currentStep === steps.length - 1} onClick={() => jumpToStep(currentStep + 1)} className="gap-2"><SkipForward className="h-4 w-4" /> {tr('Következő lépés', 'Next step')}</Button>
      </div>
      <p className="text-xs text-muted-foreground">{tr('A „10 mp vissza” az előző rövid mondattól folytatja, hogy biztosan semmi ne maradjon ki.', '“Back 10 sec” restarts from the previous short sentence so you do not miss anything.')}</p>
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
    ? ['Samantha', 'Karen', 'Moira', 'Serena', 'Susan', 'Zira', 'Female']
    : ['Tünde', 'Mariska', 'Eszter', 'Hungarian Female', 'Google magyar'];
  return preferredNames.map(name => candidates.find(voice => voice.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))).find(Boolean) ?? candidates[0];
}
