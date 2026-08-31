import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock3, Heart, Leaf, PackageOpen, ShoppingCart, Shuffle, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { EN_WEEKDAYS } from '@/i18n/labels';
import { createDefaultAutopilotSettings, createGenerationSelection, DayMode, WEEKDAYS, WeekDay, WeeklyAutopilotSettings, WeeklyGoal } from '@/types/recipe';
import { useMenuPreferences } from '@/hooks/useMenuPreferences';

const STORAGE_KEY = 'plan-pan-weekly-autopilot';

function loadSettings(familySize: number): WeeklyAutopilotSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as WeeklyAutopilotSettings;
      const defaults = createDefaultAutopilotSettings(familySize);
      return {
        ...defaults,
        ...parsed,
        days: Object.fromEntries(WEEKDAYS.map(day => [day, { ...defaults.days[day], ...(parsed.days?.[day] ?? {}) }])) as WeeklyAutopilotSettings['days'],
      };
    }
  } catch {
    // Fall through to defaults.
  }
  return createDefaultAutopilotSettings(familySize);
}

export default function AutopilotPlannerPage() {
  const { generateRandomPlan, weekPlan, recipes, favoriteIds } = useAppContext();
  const { tr, isEnglish } = useLanguage();
  const { preferences } = useMenuPreferences();
  const [settings, setSettings] = useState<WeeklyAutopilotSettings>(() => loadSettings(preferences.familySize));
  const [pantryText, setPantryText] = useState(() => settings.pantryIngredients.join(', '));
  const [generated, setGenerated] = useState(false);
  const [generationError, setGenerationError] = useState(false);

  const goals: Array<{ id: WeeklyGoal; icon: typeof ShoppingCart; hu: string; en: string }> = [
    { id: 'save-money', icon: ShoppingCart, hu: 'Okos bevásárlás', en: 'Smart shopping' },
    { id: 'cook-fast', icon: Clock3, hu: 'Gyors főzés', en: 'Cook fast' },
    { id: 'family-favourites', icon: Heart, hu: 'Családi kedvencek', en: 'Family favourites' },
    { id: 'use-pantry', icon: PackageOpen, hu: 'Használjuk, ami otthon van', en: 'Use what I already have' },
    { id: 'eat-healthier', icon: Leaf, hu: 'Egészségesebb étkezés', en: 'Eat healthier' },
    { id: 'surprise-me', icon: Shuffle, hu: 'Lepj meg', en: 'Surprise me' },
  ];

  const modes: Array<{ id: DayMode; hu: string; en: string }> = [
    { id: 'normal', hu: 'Normál', en: 'Normal' },
    { id: 'busy', hu: 'Sűrű nap', en: 'Busy day' },
    { id: 'leftovers', hu: 'Maradék', en: 'Leftovers' },
    { id: 'no-meal', hu: 'Nem kell étkezés', en: 'No meal needed' },
  ];

  const updateDay = (day: WeekDay, updates: Partial<WeeklyAutopilotSettings['days'][WeekDay]>) => {
    setSettings(current => ({ ...current, days: { ...current.days, [day]: { ...current.days[day], ...updates } } }));
    setGenerated(false);
  };

  const activeDays = WEEKDAYS.filter(day => settings.days[day].mode !== 'no-meal');
  const leftoverDays = WEEKDAYS.filter(day => settings.days[day].mode === 'leftovers').length;
  const plannedMeals = activeDays.length * 2;
  const averagePeople = activeDays.length ? Math.round(activeDays.reduce((sum, day) => sum + settings.days[day].people, 0) / activeDays.length) : 0;
  const weekdayTimes = WEEKDAYS.slice(0, 5).map(day => settings.days[day].maxCookingTime ?? (settings.days[day].mode === 'busy' ? 30 : null)).filter((value): value is number => Boolean(value));
  const averageWeekdayTime = weekdayTimes.length ? Math.round(weekdayTimes.reduce((sum, value) => sum + value, 0) / weekdayTimes.length) : null;
  const reusedIngredientCount = useMemo(() => {
    const seen = new Map<string, number>();
    WEEKDAYS.forEach(day => {
      const plan = weekPlan[day];
      [plan.lunch, plan.dinner].filter(Boolean).forEach(id => {
        const recipe = recipes.find(item => item.id === id);
        recipe?.ingredients.forEach(item => {
          const key = item.name.toLocaleLowerCase('hu');
          seen.set(key, (seen.get(key) ?? 0) + 1);
        });
      });
    });
    return [...seen.values()].filter(value => value > 1).length;
  }, [weekPlan, recipes]);

  const createWeek = () => {
    const pantryIngredients = pantryText.split(',').map(value => value.trim()).filter(Boolean);
    const nextSettings = { ...settings, pantryIngredients };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings));
    setSettings(nextSettings);
    const selection = createGenerationSelection(true);
    WEEKDAYS.forEach(day => {
      if (nextSettings.days[day].mode === 'no-meal') selection[day] = { lunch: false, dinner: false };
    });
    const ok = generateRandomPlan(selection, 'balanced', preferences, favoriteIds, nextSettings);
    setGenerationError(!ok);
    setGenerated(ok);
  };

  return (
    <div className="page-container max-w-6xl space-y-6 pb-28 md:pb-10">
      <div className="max-w-3xl">
        <div className="mb-2 flex items-center gap-2 text-primary"><Sparkles className="h-5 w-5" /><span className="text-sm font-bold uppercase tracking-wide">{tr('Családi étel-autopilóta', 'Family food autopilot')}</span></div>
        <h1 className="section-title mb-2">{tr('Mi a legfontosabb ezen a héten?', 'What matters this week?')}</h1>
        <p className="text-sm font-medium leading-relaxed text-muted-foreground">{tr('Mondd el röviden, milyen lesz a hetetek. A menüt, a maradékokat és a bevásárlást ehhez igazítjuk.', 'Tell us briefly what your week looks like. We will adapt the meals, leftovers and shopping to it.')}</p>
      </div>

      <section className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map(goal => {
          const Icon = goal.icon;
          const selected = settings.goal === goal.id;
          return <button key={goal.id} type="button" aria-pressed={selected} onClick={() => { setSettings(current => ({ ...current, goal: goal.id })); setGenerated(false); }} className={`flex min-h-20 items-center gap-3 rounded-xl border p-4 text-left transition ${selected ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'bg-card hover:bg-secondary/40'}`}>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${selected ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}><Icon className="h-5 w-5" /></span>
            <span className="font-semibold">{isEnglish ? goal.en : goal.hu}</span>{selected && <Check className="ml-auto h-5 w-5 text-primary" />}
          </button>;
        })}
      </section>

      {settings.goal === 'save-money' && <section className="rounded-xl border bg-card p-4">
        <h2 className="font-semibold">{tr('Heti bevásárlási cél', 'Weekly grocery target')}</h2>
        <p className="mb-3 text-sm font-medium text-muted-foreground">{tr('Ez most irányt ad a receptválasztásnak; nem pontos bolti ár.', 'This guides recipe selection for now; it is not an exact store price.')}</p>
        <div className="flex flex-wrap gap-2">{[100, 125, 150, 175, 200].map(value => <Button key={value} type="button" size="sm" variant={settings.groceryTarget === value ? 'default' : 'outline'} onClick={() => setSettings(current => ({ ...current, groceryTarget: value }))}>${value}</Button>)}</div>
      </section>}

      {settings.goal === 'use-pantry' && <section className="rounded-xl border bg-card p-4">
        <h2 className="font-semibold">{tr('Mi van már otthon?', 'What do you already have?')}</h2>
        <p className="mb-3 text-sm font-medium text-muted-foreground">{tr('Írd be vesszővel elválasztva. Mennyiség most nem szükséges.', 'Enter ingredients separated by commas. Quantities are not needed yet.')}</p>
        <input value={pantryText} onChange={event => { setPantryText(event.target.value); setGenerated(false); }} placeholder={tr('csirke, rizs, burgonya, tojás…', 'chicken, rice, potatoes, eggs…')} className="h-11 w-full rounded-md border bg-background px-3 text-sm" />
      </section>}

      <section className="rounded-xl border bg-card p-4 md:p-5">
        <div className="mb-4"><h2 className="text-lg font-bold">{tr('Hogy néz ki a hetetek?', 'What does your week look like?')}</h2><p className="text-sm font-medium text-muted-foreground">{tr('Az alapértékek már ki vannak töltve. Csak a szokatlan napokat módosítsd.', 'Defaults are already filled in. Only adjust unusual days.')}</p></div>
        <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
          {WEEKDAYS.map(day => {
            const schedule = settings.days[day];
            return <div key={day} className="rounded-xl border bg-secondary/15 p-3">
              <div className="mb-3 flex items-center justify-between gap-3"><h3 className="font-bold">{isEnglish ? EN_WEEKDAYS[day] : day}</h3><span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground"><Users className="h-4 w-4" />{schedule.people}</span></div>
              <div className="mb-3 grid grid-cols-2 gap-2">
                <label className="text-xs font-semibold text-muted-foreground">{tr('Hányan esznek?', 'People eating')}
                  <input type="number" min={1} max={20} value={schedule.people} onChange={event => updateDay(day, { people: Math.max(1, Number(event.target.value) || 1) })} className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground" />
                </label>
                <label className="text-xs font-semibold text-muted-foreground">{tr('Max. főzési idő', 'Max cook time')}
                  <select value={schedule.maxCookingTime ?? ''} onChange={event => updateDay(day, { maxCookingTime: event.target.value ? Number(event.target.value) : null })} className="mt-1 h-10 w-full rounded-md border bg-background px-2 text-sm text-foreground">
                    <option value="">{tr('Nincs limit', 'No limit')}</option><option value="20">20 min</option><option value="30">30 min</option><option value="45">45 min</option><option value="60">60 min</option>
                  </select>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-1.5">{modes.map(mode => <button key={mode.id} type="button" onClick={() => updateDay(day, { mode: mode.id })} className={`min-h-10 rounded-md border px-2 py-2 text-xs font-semibold ${schedule.mode === mode.id ? 'border-primary bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'}`}>{isEnglish ? mode.en : mode.hu}</button>)}</div>
            </div>;
          })}
        </div>
      </section>

      <div className="sticky bottom-3 z-30 rounded-xl border bg-card/95 p-3 shadow-lg backdrop-blur md:static md:flex md:items-center md:justify-between md:shadow-none">
        <div className="mb-2 text-sm font-medium md:mb-0"><strong>{activeDays.length}</strong> {tr('tervezett nap', 'planned days')} · <strong>{averagePeople}</strong> {tr('fő átlagosan', 'people on average')}</div>
        <Button size="lg" onClick={createWeek} className="w-full gap-2 md:w-auto"><Sparkles className="h-4 w-4" />{tr('Készítsd el a hetem', 'Create my week')}</Button>
      </div>

      {generationError && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm font-semibold text-destructive">{tr('Nem sikerült minden naphoz megfelelő ételt találni. Próbálj hosszabb főzési időt vagy kevesebb korlátozást.', 'We could not find a suitable meal for every day. Try allowing more cooking time or fewer restrictions.')}</p>}

      {generated && <section className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
        <div className="mb-4"><p className="text-sm font-bold uppercase tracking-wide text-primary">{tr('Elkészült', 'Ready')}</p><h2 className="text-2xl font-bold">{tr('Elkészült a hetetek', 'Your week is ready')}</h2></div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          <SummaryCard value={plannedMeals} label={tr('tervezett étkezés', 'planned meals')} />
          <SummaryCard value={leftoverDays} label={tr('maradékos nap', 'leftover days')} />
          <SummaryCard value={averageWeekdayTime ? `${averageWeekdayTime} min` : '—'} label={tr('átlagos hétköznapi időlimit', 'average weekday time limit')} />
          <SummaryCard value={reusedIngredientCount} label={tr('újrahasznált hozzávaló', 'reused ingredients')} />
          <SummaryCard value={isEnglish ? goals.find(goal => goal.id === settings.goal)?.en ?? '' : goals.find(goal => goal.id === settings.goal)?.hu ?? ''} label={tr('heti cél', 'weekly goal')} />
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row"><Button asChild><Link to="/planner/week">{tr('Heti menü megnyitása', 'Open weekly menu')}</Link></Button><Button asChild variant="outline"><Link to="/shopping">{tr('Bevásárlólista', 'Shopping list')}</Link></Button></div>
      </section>}
    </div>
  );
}

function SummaryCard({ value, label }: { value: string | number; label: string }) {
  return <div className="rounded-xl border bg-card p-3"><div className="text-xl font-bold text-primary">{value}</div><div className="text-xs font-semibold leading-snug text-muted-foreground">{label}</div></div>;
}
