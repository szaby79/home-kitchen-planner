import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, Clock3, Heart, Leaf, PackageOpen, ShoppingCart, Shuffle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { EN_WEEKDAYS } from '@/i18n/labels';
import { createGenerationSelection, DayMode, MenuPreferences, WEEKDAYS, WeekDay, WeeklyAutopilotSettings, WeeklyGoal } from '@/types/recipe';
import { useMenuPreferences } from '@/hooks/useMenuPreferences';
import MenuPreferencesPanel from '@/components/MenuPreferencesPanel';
import SavedWeeksBar from '@/components/SavedWeeksBar';
import HelpLink from '@/components/HelpLink';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AUTOPILOT_STORAGE_KEY, loadAutopilotSettings, reconcileAutopilotFamilySize } from '@/lib/autopilotSettings';

export default function AutopilotPlannerPage() {
  const { generateRandomPlan, weekPlan, recipes, favoriteIds, plannerReady } = useAppContext();
  const { tr, isEnglish } = useLanguage();
  const { preferences, savePreferences, hasSavedPreferences, cloudSyncEnabled, syncStatus } = useMenuPreferences();
  const [settings, setSettings] = useState<WeeklyAutopilotSettings>(() => loadAutopilotSettings(preferences.familySize));
  const [pantryText, setPantryText] = useState(() => settings.pantryIngredients.join(', '));
  const [generated, setGenerated] = useState(false);
  const [generationError, setGenerationError] = useState(false);
  const [confirmGenerate, setConfirmGenerate] = useState(false);
  const [expandedDay, setExpandedDay] = useState<WeekDay | null>(null);
  const hasPlan = WEEKDAYS.some(day => Boolean(weekPlan[day].soup || weekPlan[day].lunch || weekPlan[day].side || weekPlan[day].pickle || weekPlan[day].dinner || weekPlan[day].dessert));

  useEffect(() => {
    setSettings(current => reconcileAutopilotFamilySize(current, preferences.familySize));
  }, [preferences.familySize]);

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
    setSettings(current => ({
      ...current,
      days: {
        ...current.days,
        [day]: {
          ...current.days[day],
          ...updates,
          ...(updates.people === undefined ? {} : { peopleCustomized: updates.people !== preferences.familySize }),
        },
      },
    }));
    setGenerated(false);
  };

  const saveFamilyPreferences = (next: MenuPreferences) => {
    savePreferences(next);
    setSettings(current => reconcileAutopilotFamilySize(current, next.familySize));
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
    if (!plannerReady) return;
    const pantryIngredients = pantryText.split(',').map(value => value.trim()).filter(Boolean);
    const nextSettings = { ...settings, pantryIngredients };
    localStorage.setItem(AUTOPILOT_STORAGE_KEY, JSON.stringify(nextSettings));
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
    <div className="page-container max-w-6xl space-y-6 pb-10">
      <div className="max-w-3xl">
        <div className="mb-2 flex items-center gap-2 text-primary"><Sparkles className="h-5 w-5" /><span className="text-sm font-bold uppercase tracking-wide">{tr('Családi étel-autopilóta', 'Family food autopilot')}</span></div>
        <div className="flex items-center gap-1">
          <h1 className="section-title mb-2">{tr('Állítsuk össze a heteteket', 'Build your week')}</h1>
          <HelpLink section="autopilot" label="Autopilot" />
        </div>
        <p className="text-sm font-medium leading-relaxed text-muted-foreground">{tr('Az alapbeállítások készen állnak. Csak azt módosítsd, ami ezen a héten eltér, majd generáld a menüt.', 'Your defaults are ready. Only change what is different this week, then generate the menu.')}</p>
      </div>

      <SavedWeeksBar />

      {hasPlan && !generated && <section className="rounded-xl border border-primary/30 bg-primary/5 p-4">
        <p className="mb-3 text-sm font-semibold text-foreground">{tr('A mentett heti menüd betöltődött. Innen közvetlenül megnyithatod az ételeket.', 'Your saved weekly menu is loaded. Open the meals directly from here.')}</p>
        <Button asChild className="w-full sm:w-auto"><Link to="/planner/week">{tr('Mentett heti menü megnyitása', 'Open saved weekly menu')}</Link></Button>
      </section>}

      <MenuPreferencesPanel preferences={preferences} hasSavedPreferences={hasSavedPreferences} recipes={recipes} onSave={saveFamilyPreferences} cloudSyncEnabled={cloudSyncEnabled} syncStatus={syncStatus} />

      <section>
        <h2 className="mb-3 text-lg font-bold">{tr('Mi a legfontosabb ezen a héten?', 'What matters this week?')}</h2>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          {goals.map(goal => {
            const Icon = goal.icon;
            const selected = settings.goal === goal.id;
            return <button key={goal.id} type="button" aria-pressed={selected} onClick={() => { setSettings(current => ({ ...current, goal: goal.id })); setGenerated(false); }} className={`flex min-h-16 items-center gap-2 rounded-xl border p-3 text-left transition sm:min-h-20 sm:gap-3 sm:p-4 ${selected ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'bg-card hover:bg-secondary/40'}`}>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 ${selected ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}><Icon className="h-5 w-5" /></span>
              <span className="text-sm font-semibold leading-tight sm:text-base">{isEnglish ? goal.en : goal.hu}</span>{selected && <Check className="ml-auto hidden h-5 w-5 text-primary sm:block" />}
            </button>;
          })}
        </div>
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
        <div className="space-y-2">
          {WEEKDAYS.map(day => {
            const schedule = settings.days[day];
            return <DayScheduleCard
              key={day}
              day={day}
              schedule={schedule}
              modes={modes}
              isEnglish={isEnglish}
              expanded={expandedDay === day}
              onToggle={() => setExpandedDay(current => current === day ? null : day)}
              onUpdate={updates => updateDay(day, updates)}
              tr={tr}
            />;
          })}
        </div>
      </section>

      <div className="rounded-xl border bg-card p-4 shadow-sm md:flex md:items-center md:justify-between" data-testid="generate-week-panel">
        <div className="mb-2 text-sm font-medium md:mb-0"><strong>{activeDays.length}</strong> {tr('tervezett nap', 'planned days')} · <strong>{averagePeople}</strong> {tr('fő átlagosan', 'people on average')}</div>
        <Button size="lg" disabled={!plannerReady} onClick={() => hasPlan ? setConfirmGenerate(true) : createWeek()} className="w-full gap-2 md:w-auto"><Sparkles className="h-4 w-4" />{plannerReady ? tr('Heti menü generálása', 'Generate weekly menu') : tr('Mentett terv betöltése…', 'Loading saved plan…')}</Button>
      </div>

      <AlertDialog open={confirmGenerate} onOpenChange={setConfirmGenerate}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tr('Lecseréled a jelenlegi heti tervet?', 'Replace the current weekly plan?')}</AlertDialogTitle>
            <AlertDialogDescription>{tr('A most mentett menü és a hozzá tartozó bevásárlólista új tervre cserélődik. Ha a generálás nem sikerül, a jelenlegi terv változatlanul megmarad.', 'The saved menu and its linked shopping list will be replaced with a new plan. If generation fails, the current plan will remain unchanged.')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tr('Mégse', 'Cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={createWeek}>{tr('Terv lecserélése', 'Replace plan')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

type DayScheduleCardProps = {
  day: WeekDay;
  schedule: WeeklyAutopilotSettings['days'][WeekDay];
  modes: Array<{ id: DayMode; hu: string; en: string }>;
  isEnglish: boolean;
  expanded: boolean;
  onToggle: () => void;
  onUpdate: (updates: Partial<WeeklyAutopilotSettings['days'][WeekDay]>) => void;
  tr: (hu: string, en: string) => string;
};

function DayScheduleCard({ day, schedule, modes, isEnglish, expanded, onToggle, onUpdate, tr }: DayScheduleCardProps) {
  const mode = modes.find(item => item.id === schedule.mode);
  const detailsId = `autopilot-day-${day}`;
  const cookingTime = schedule.maxCookingTime ? `${schedule.maxCookingTime} min` : tr('nincs időlimit', 'no time limit');

  return <div className="overflow-hidden rounded-xl border bg-secondary/15">
    <button
      type="button"
      className="flex min-h-16 w-full items-center gap-3 px-3 py-2 text-left sm:px-4"
      aria-expanded={expanded}
      aria-controls={detailsId}
      onClick={onToggle}
    >
      <span className="min-w-0 flex-1">
        <span className="block font-bold">{isEnglish ? EN_WEEKDAYS[day] : day}</span>
        <span className="block text-sm font-medium leading-snug text-muted-foreground">
          {schedule.people} {tr('fő', 'people')} · {isEnglish ? mode?.en : mode?.hu} · {cookingTime}
        </span>
      </span>
      <span className="sr-only">{tr('Módosítás', 'Edit')}</span>
      <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
    </button>

    {expanded && <div id={detailsId} className="border-t bg-card p-3 sm:p-4">
      <div className="mb-3 grid grid-cols-2 gap-2">
        <label className="text-xs font-semibold text-muted-foreground">{tr('Hányan esznek?', 'People eating')}
          <input type="number" min={1} max={20} value={schedule.people} onChange={event => onUpdate({ people: Math.max(1, Number(event.target.value) || 1) })} className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground" />
        </label>
        <label className="text-xs font-semibold text-muted-foreground">{tr('Max. főzési idő', 'Max cook time')}
          <select value={schedule.maxCookingTime ?? ''} onChange={event => onUpdate({ maxCookingTime: event.target.value ? Number(event.target.value) : null })} className="mt-1 h-10 w-full rounded-md border bg-background px-2 text-sm text-foreground">
            <option value="">{tr('Nincs limit', 'No limit')}</option><option value="20">20 min</option><option value="30">30 min</option><option value="45">45 min</option><option value="60">60 min</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-2 gap-1.5">{modes.map(item => <button key={item.id} type="button" onClick={() => onUpdate({ mode: item.id })} className={`min-h-10 rounded-md border px-2 py-2 text-xs font-semibold ${schedule.mode === item.id ? 'border-primary bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'}`}>{isEnglish ? item.en : item.hu}</button>)}</div>
    </div>}
  </div>;
}

function SummaryCard({ value, label }: { value: string | number; label: string }) {
  return <div className="rounded-xl border bg-card p-3"><div className="text-xl font-bold text-primary">{value}</div><div className="text-xs font-semibold leading-snug text-muted-foreground">{label}</div></div>;
}
