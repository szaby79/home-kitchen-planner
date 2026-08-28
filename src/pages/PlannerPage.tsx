import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/components/Layout';
import { WEEKDAYS, WeekDay, CATEGORY_LABELS, Recipe, createGenerationSelection, GenerationSelection, MealSlot as MealSlotType, MenuProfile } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Shuffle, Trash2, Zap, ShoppingCart, Check, Flame, Utensils, Pencil, List, RotateCcw, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { isQuickRecipe } from '@/lib/recipeScheduling';
import { estimateRecipeCalories } from '@/lib/calorieCalculator';
import { formatMealName } from '@/lib/mealDisplay';

type SortMode = 'abc' | 'random' | 'favorites';

export default function PlannerPage() {
  const { recipes, weekPlan, updateDay, clearPlan, generateRandomPlan, isFavorite } = useAppContext();
  const [selection, setSelection] = useState<GenerationSelection>(() => createGenerationSelection(true));
  const [menuProfile, setMenuProfile] = useState<MenuProfile>('balanced');
  const [sortMode, setSortMode] = useState<SortMode>('abc');
  const [randomSeed, setRandomSeed] = useState(1);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [expandedExtras, setExpandedExtras] = useState<Set<WeekDay>>(new Set());
  const [mobileDay, setMobileDay] = useState<WeekDay>('Hétfő');
  const [mobileEditing, setMobileEditing] = useState(false);
  const [showWeekOverview, setShowWeekOverview] = useState(false);
  const [changeMessage, setChangeMessage] = useState('');
  const [undoChange, setUndoChange] = useState<{ day: WeekDay; values: Partial<typeof weekPlan[WeekDay]> } | null>(null);
  const selectedCount = WEEKDAYS.reduce((count, day) => count + Number(selection[day].lunch) + Number(selection[day].dinner), 0);
  const hasPlan = WEEKDAYS.some(day => Boolean(weekPlan[day].lunch || weekPlan[day].dinner || weekPlan[day].soup));

  const sorted = (list: Recipe[]) => [...list].sort((a, b) => {
    if (sortMode === 'favorites') {
      const favoriteDifference = Number(isFavorite(b.id)) - Number(isFavorite(a.id));
      if (favoriteDifference) return favoriteDifference;
    }
    if (sortMode === 'random') return hash(`${a.id}-${randomSeed}`) - hash(`${b.id}-${randomSeed}`);
    return a.name.localeCompare(b.name, 'hu');
  });
  const options = (category: Recipe['category']) => sorted(recipes.filter(recipe => recipe.category === category));
  const dinnerOptions = sorted(recipes.filter(recipe => (recipe.category === 'main' || recipe.category === 'salad') && isQuickRecipe(recipe) && (recipe.mealType === 'dinner' || recipe.mealType === 'both')));
  const setAll = (selected: boolean) => setSelection(createGenerationSelection(selected));
  const setFromToday = () => {
    const next = createGenerationSelection(false);
    WEEKDAYS.slice((new Date().getDay() + 6) % 7).forEach(day => { next[day] = { lunch: true, dinner: true }; });
    setSelection(next);
  };
  const toggleSelection = (day: WeekDay, slot: MealSlotType) => setSelection(current => ({ ...current, [day]: { ...current[day], [slot]: !current[day][slot] } }));
  const handleGenerate = () => { if (selectedCount) { generateRandomPlan(selection, menuProfile); setHasGenerated(true); setMobileEditing(false); setChangeMessage('Elkészült a menü. Amit nem szeretsz, egyszerűen lecserélheted.'); } };
  const changeSort = (mode: SortMode) => { setSortMode(mode); if (mode === 'random') setRandomSeed(seed => seed + 1); };
  const updateMobileDay = (day: WeekDay, updates: Partial<typeof weekPlan[WeekDay]>) => {
    const previous = Object.fromEntries(Object.keys(updates).map(key => [key, weekPlan[day][key as keyof typeof updates]])) as Partial<typeof weekPlan[WeekDay]>;
    setUndoChange({ day, values: previous });
    updateDay(day, updates);
    setChangeMessage('A módosítás elkészült, a bevásárlólista automatikusan frissült.');
  };
  const undoLastChange = () => {
    if (!undoChange) return;
    updateDay(undoChange.day, undoChange.values);
    setUndoChange(null);
    setChangeMessage('Az utolsó módosítást visszavontuk.');
  };

  return (
    <div className="page-container max-w-6xl">
      <h1 className="section-title">Heti menüterv</h1>
      <div className="mb-4 grid grid-cols-4 gap-1 rounded-xl border bg-card p-2 text-center text-[10px] md:hidden">
        {['Napok', 'Generálás', 'Ellenőrzés', 'Bevásárlás'].map((step, index) => <div key={step} className="rounded-lg px-1 py-2"><span className="mx-auto mb-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">{index + 1}</span>{step}</div>)}
      </div>
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm">
        <Zap className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <p><strong>Életszerű tervezés:</strong> hétköznap egyszerűbb, hétvégén tartalmasabb ebéd készül. Vacsorára csak gyors étel vagy saláta kerül.</p>
      </div>

      <div className="bg-card border rounded-lg p-4 mb-6 space-y-4">
        <div><h2 className="font-semibold">Melyik napokra készüljön menü?</h2><p className="text-sm text-muted-foreground">Csak a kijelölt étkezések változnak. Az „Ebéd” a teljes ebédet állítja össze.</p></div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setAll(true)}>Teljes hét</Button>
          <Button variant="outline" size="sm" onClick={setFromToday}>Mától vasárnapig</Button>
          <Button variant="ghost" size="sm" onClick={() => setAll(false)}>Kijelölés törlése</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {WEEKDAYS.map(day => <div key={day} className="rounded-lg border bg-secondary/20 p-3">
            <p className="font-semibold text-sm mb-2">{day}</p><div className="flex gap-2">
              {(['lunch', 'dinner'] as MealSlotType[]).map(slot => <button key={slot} type="button" onClick={() => toggleSelection(day, slot)} className={`flex flex-1 items-center justify-center gap-1 rounded-md border px-2 py-1.5 text-xs font-medium transition ${selection[day][slot] ? 'border-primary bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'}`}>
                {selection[day][slot] && <Check className="h-3 w-3" />}{slot === 'lunch' ? 'Ebéd' : 'Vacsora'}
              </button>)}
            </div>
          </div>)}
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <label className="min-w-[260px] text-sm font-medium">Milyen legyen a hét?
            <select value={menuProfile} onChange={event => setMenuProfile(event.target.value as MenuProfile)} className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm">
              <option value="balanced">Életszerű hét – ajánlott</option>
              <option value="soup">Leveses hét</option>
              <option value="simple">Egyszerű hét</option>
            </select>
          </label>
          <p className="max-w-md text-xs text-muted-foreground">{menuProfile === 'balanced' ? 'Hétköznap egyszerűbb, a leves több napra is készülhet, hétvégén tartalmasabb ebéd.' : menuProfile === 'soup' ? 'Minden ebédhez kerül leves, azonos leves két egymást követő napra is.' : 'Főétel és csak akkor köret, ha valóban szükséges.'}</p>
          <Button onClick={handleGenerate} disabled={!selectedCount} className="gap-2"><Shuffle className="w-4 h-4" /> Generálás ({selectedCount})</Button>
          <Button variant="outline" onClick={() => { clearPlan(); setHasGenerated(false); }} className="gap-2"><Trash2 className="w-4 h-4" /> Törlés</Button>
        </div>
      </div>

      <div className="mb-5 hidden flex-wrap items-center gap-2 rounded-lg border bg-card p-3 text-sm md:flex">
        <span className="font-medium">Ételek sorrendje:</span>
        {([['abc', 'ABC'], ['random', 'Véletlenszerű'], ['favorites', 'Kedvencek elöl']] as const).map(([mode, label]) => <Button key={mode} size="sm" variant={sortMode === mode ? 'default' : 'outline'} onClick={() => changeSort(mode)}>{label}</Button>)}
      </div>

      {hasGenerated && <div className="mb-6 hidden rounded-xl border border-accent/40 bg-accent/10 p-4 md:block"><p className="font-semibold">Kész a menü.</p><p className="mb-3 text-sm text-muted-foreground">Minden elemet külön cserélhetsz. A bevásárlólista automatikusan frissül.</p><Button asChild className="gap-2"><Link to="/shopping"><ShoppingCart className="h-4 w-4" /> Bevásárlólista megtekintése</Link></Button></div>}

      <div className="hidden space-y-4 md:block">
        {WEEKDAYS.map(day => {
          const plan = weekPlan[day];
          const lunchIds = [plan.soup, plan.lunch, plan.side, plan.pickle, plan.dessert].filter(Boolean) as string[];
          const lunchCalories = lunchIds.reduce((sum, id) => sum + estimateRecipeCalories(recipes.find(recipe => recipe.id === id)!), 0);
          const hasLunchExtras = Boolean(plan.soup || plan.side || plan.pickle || plan.dessert);
          const showExtras = hasLunchExtras || expandedExtras.has(day);
          return <section key={day} className="animate-fade-in rounded-xl border bg-card p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h3 className="font-display text-xl font-semibold">{day}</h3>{lunchCalories > 0 && <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"><Flame className="h-3.5 w-3.5" /> Ebéd összesen: kb. {lunchCalories} kcal/adag</span>}</div>
            <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
              <div className="rounded-lg border border-primary/20 bg-primary/[0.035] p-3">
                <h4 className="mb-3 flex items-center gap-2 font-semibold"><Utensils className="h-4 w-4 text-primary" /> Ebéd</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {showExtras && <div className="sm:col-span-2"><MealSlot label="Leves (választható)" value={plan.soup} servings={plan.soupServings} options={options('soup')} recipes={recipes} onChange={value => updateDay(day, { soup: value })} onServingsChange={value => updateDay(day, { soupServings: value })} /></div>}
                  <div className="sm:col-span-2"><MealSlot label="Főétel" value={plan.lunch} servings={plan.lunchServings} days={plan.lunchDays} options={options('main')} recipes={recipes} onChange={value => updateDay(day, { lunch: value })} onServingsChange={value => updateDay(day, { lunchServings: value })} onDaysChange={value => updateDay(day, { lunchDays: value })} /></div>
                  {showExtras && <>
                    <MealSlot label="Köret (választható)" value={plan.side} servings={plan.sideServings} options={options('side')} recipes={recipes} onChange={value => updateDay(day, { side: value })} onServingsChange={value => updateDay(day, { sideServings: value })} />
                    <MealSlot label="Savanyúság (választható)" value={plan.pickle} servings={plan.pickleServings} options={options('pickle')} recipes={recipes} onChange={value => updateDay(day, { pickle: value })} onServingsChange={value => updateDay(day, { pickleServings: value })} />
                    <MealSlot label="Desszert (választható)" value={plan.dessert} servings={plan.dessertServings} options={options('dessert')} recipes={recipes} onChange={value => updateDay(day, { dessert: value })} onServingsChange={value => updateDay(day, { dessertServings: value })} />
                  </>}
                </div>
                {!hasLunchExtras && <Button variant="ghost" size="sm" className="mt-3" onClick={() => setExpandedExtras(current => { const next = new Set(current); if (next.has(day)) next.delete(day); else next.add(day); return next; })}>{showExtras ? 'Kiegészítők bezárása' : '+ Ebéd kiegészítése'}</Button>}
              </div>
              <MealSlot label="Vacsora – gyors étel" value={plan.dinner} servings={plan.dinnerServings} days={plan.dinnerDays} options={dinnerOptions} recipes={recipes} onChange={value => updateDay(day, { dinner: value })} onServingsChange={value => updateDay(day, { dinnerServings: value })} onDaysChange={value => updateDay(day, { dinnerDays: value })} />
            </div>
          </section>;
        })}
      </div>
      {hasPlan && <MobilePlan
        activeDay={mobileDay}
        setActiveDay={day => { setMobileDay(day); setMobileEditing(false); }}
        editing={mobileEditing}
        setEditing={setMobileEditing}
        showWeekOverview={showWeekOverview}
        setShowWeekOverview={setShowWeekOverview}
        weekPlan={weekPlan}
        recipes={recipes}
        options={options}
        dinnerOptions={dinnerOptions}
        updateDay={updateMobileDay}
        changeMessage={changeMessage}
        canUndo={Boolean(undoChange)}
        onUndo={undoLastChange}
      />}

      {hasPlan && <div className="mt-6 rounded-xl border border-accent/40 bg-accent/10 p-5 text-center">
        <p className="text-lg font-semibold">✓ Kész a heti menü</p>
        <p className="mb-4 text-sm text-muted-foreground">A menü automatikusan el van mentve, és a bevásárlólista naprakész.</p>
        <Button asChild size="lg" className="gap-2"><Link to="/shopping"><ShoppingCart className="h-5 w-5" /> Bevásárlólista megtekintése</Link></Button>
      </div>}
      <p className="mt-4 text-center text-xs text-muted-foreground">A kalóriaérték tervezési becslés, nem orvosi vagy dietetikusi adat.</p>
      {hasPlan && <div className="h-20 md:hidden" />}
      {hasPlan && <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 p-3 backdrop-blur md:hidden"><Button asChild className="w-full gap-2"><Link to="/shopping"><ShoppingCart className="h-4 w-4" /> Bevásárlólista</Link></Button></div>}
    </div>
  );
}

type MobilePlanProps = {
  activeDay: WeekDay;
  setActiveDay: (day: WeekDay) => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  showWeekOverview: boolean;
  setShowWeekOverview: (show: boolean) => void;
  weekPlan: ReturnType<typeof useAppContext>['weekPlan'];
  recipes: Recipe[];
  options: (category: Recipe['category']) => Recipe[];
  dinnerOptions: Recipe[];
  updateDay: (day: WeekDay, updates: Partial<ReturnType<typeof useAppContext>['weekPlan'][WeekDay]>) => void;
  changeMessage: string;
  canUndo: boolean;
  onUndo: () => void;
};

function MobilePlan({ activeDay, setActiveDay, editing, setEditing, showWeekOverview, setShowWeekOverview, weekPlan, recipes, options, dinnerOptions, updateDay, changeMessage, canUndo, onUndo }: MobilePlanProps) {
  const [replaceSlot, setReplaceSlot] = useState<MobileSlot | null>(null);
  const plan = weekPlan[activeDay];
  const dayIndex = WEEKDAYS.indexOf(activeDay);
  const recipeFor = (id: string | null) => id ? recipes.find(recipe => recipe.id === id) : undefined;
  const mealRows = [
    ['Leves', plan.soup, 'soup'], ['Főétel', plan.lunch, 'lunch'], ['Köret', plan.side, 'side'], ['Savanyúság', plan.pickle, 'pickle'], ['Desszert', plan.dessert, 'dessert'], ['Vacsora', plan.dinner, 'dinner'],
  ] as const;
  const visibleRows = mealRows.filter(([, id]) => Boolean(id));
  const replacementOptions = replaceSlot === 'dinner' ? dinnerOptions : replaceSlot ? options(slotCategory(replaceSlot)) : [];
  const selectedReplacement = replaceSlot ? plan[replaceSlot] : null;

  return <div className="md:hidden" data-testid="mobile-planner">
    <div className="sticky top-14 z-30 -mx-4 mb-4 border-y bg-[#FFF8EE]/95 px-3 py-2 backdrop-blur">
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map(day => <button key={day} type="button" onClick={() => setActiveDay(day)} className={`rounded-lg py-2 text-xs font-semibold ${day === activeDay ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground'}`}>{mobileDayLabel(day)}</button>)}
      </div>
    </div>

    <div className="mb-3 flex gap-2">
      <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => setShowWeekOverview(!showWeekOverview)}><List className="h-4 w-4" /> {showWeekOverview ? 'Nap bezárása' : 'Heti áttekintés'}</Button>
      <Button variant={editing ? 'default' : 'outline'} size="sm" className="flex-1 gap-1" onClick={() => { setShowWeekOverview(false); setEditing(!editing); }}><Pencil className="h-4 w-4" /> {editing ? 'Szerkesztés kész' : 'Másik ételt kérek'}</Button>
    </div>

    {changeMessage && <div className="mb-3 flex items-center justify-between gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3 text-xs"><span>✓ {changeMessage}</span>{canUndo && <Button variant="ghost" size="sm" className="h-7 shrink-0 gap-1 px-2" onClick={onUndo}><RotateCcw className="h-3 w-3" /> Visszavonás</Button>}</div>}

    {showWeekOverview ? <div className="space-y-2 rounded-xl border bg-card p-3">
      <h2 className="font-display text-xl font-semibold">A teljes hét</h2>
      {WEEKDAYS.map(day => {
        const dayPlan = weekPlan[day];
        const names = [dayPlan.soup, dayPlan.lunch, dayPlan.dinner].map(recipeFor).filter(Boolean).map(recipe => recipe!.name);
        return <button key={day} type="button" onClick={() => { setActiveDay(day); setShowWeekOverview(false); }} className="flex w-full items-center justify-between gap-3 rounded-lg border bg-secondary/20 p-3 text-left"><span className="w-20 shrink-0 font-semibold">{day}</span><span className="line-clamp-2 flex-1 text-xs text-muted-foreground">{names.join(' • ') || 'Nincs még menü'}</span><ChevronRight className="h-4 w-4" /></button>;
      })}
    </div> : <section className="rounded-xl border bg-card p-4">
      <div className="mb-4 flex items-center justify-between"><Button variant="ghost" size="icon" disabled={dayIndex === 0} onClick={() => setActiveDay(WEEKDAYS[dayIndex - 1])}><ChevronLeft /></Button><h2 className="font-display text-2xl font-semibold">{activeDay}</h2><Button variant="ghost" size="icon" disabled={dayIndex === 6} onClick={() => setActiveDay(WEEKDAYS[dayIndex + 1])}><ChevronRight /></Button></div>
      {editing ? <div className="space-y-3">
        <MealSlot label="Leves" value={plan.soup} servings={plan.soupServings} options={options('soup')} recipes={recipes} onChange={value => updateDay(activeDay, { soup: value })} onServingsChange={value => updateDay(activeDay, { soupServings: value })} />
        <MealSlot label="Főétel" value={plan.lunch} servings={plan.lunchServings} days={plan.lunchDays} options={options('main')} recipes={recipes} onChange={value => updateDay(activeDay, { lunch: value })} onServingsChange={value => updateDay(activeDay, { lunchServings: value })} onDaysChange={value => updateDay(activeDay, { lunchDays: value })} />
        <MealSlot label="Köret" value={plan.side} servings={plan.sideServings} options={options('side')} recipes={recipes} onChange={value => updateDay(activeDay, { side: value })} onServingsChange={value => updateDay(activeDay, { sideServings: value })} />
        <MealSlot label="Savanyúság" value={plan.pickle} servings={plan.pickleServings} options={options('pickle')} recipes={recipes} onChange={value => updateDay(activeDay, { pickle: value })} onServingsChange={value => updateDay(activeDay, { pickleServings: value })} />
        <MealSlot label="Desszert" value={plan.dessert} servings={plan.dessertServings} options={options('dessert')} recipes={recipes} onChange={value => updateDay(activeDay, { dessert: value })} onServingsChange={value => updateDay(activeDay, { dessertServings: value })} />
        <MealSlot label="Vacsora – gyors étel" value={plan.dinner} servings={plan.dinnerServings} days={plan.dinnerDays} options={dinnerOptions} recipes={recipes} onChange={value => updateDay(activeDay, { dinner: value })} onServingsChange={value => updateDay(activeDay, { dinnerServings: value })} onDaysChange={value => updateDay(activeDay, { dinnerDays: value })} />
      </div> : <div className="space-y-2">
        {visibleRows.length ? visibleRows.map(([label, id, slot]) => <CompactMeal key={label} label={mobileMealLabel(label, slot)} recipe={recipeFor(id)} displayName={slot === 'lunch' ? formatMealName(recipeFor(id), recipeFor(plan.side)) : undefined} servings={servingsForLabel(label, plan)} onReplace={() => setReplaceSlot(slot)} />) : <p className="rounded-lg bg-secondary/30 p-5 text-center text-sm text-muted-foreground">Erre a napra még nincs menü.</p>}
      </div>}
    </section>}
    {replaceSlot && <div className="fixed inset-0 z-[70] flex items-end bg-black/40" role="dialog" aria-label={`${slotLabel(replaceSlot)} cseréje`}>
      <div className="w-full rounded-t-2xl bg-card p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-extrabold uppercase tracking-wider text-primary">{replaceSlot === 'dinner' ? 'Vacsora' : 'Ebéd'}</p><h3 className="text-lg font-semibold">{slotLabel(replaceSlot)} cseréje</h3></div><Button variant="ghost" size="icon" aria-label="Csere bezárása" onClick={() => setReplaceSlot(null)}><X className="h-5 w-5" /></Button></div>
        <label className="mb-2 block text-sm font-medium" htmlFor="mobile-replacement">Válassz másik ételt</label>
        <select id="mobile-replacement" value={selectedReplacement || ''} onChange={event => { updateDay(activeDay, { [replaceSlot]: event.target.value || null }); setReplaceSlot(null); }} className="w-full rounded-lg border bg-background px-3 py-3 text-base">
          <option value="">— Nincs kiválasztva —</option>
          {replacementOptions.map(recipe => <option key={recipe.id} value={recipe.id}>{recipe.name}</option>)}
        </select>
        <p className="mt-3 text-xs text-muted-foreground">Csak ez az egy étel változik meg. A nap többi része változatlan marad.</p>
      </div>
    </div>}
  </div>;
}

function CompactMeal({ label, recipe, displayName, servings, onReplace }: { label: string; recipe?: Recipe; displayName?: string; servings: number; onReplace: () => void }) {
  if (!recipe) return null;
  return <div className="flex items-center gap-3 rounded-xl border bg-secondary/20 p-2.5">
    <Link to={`/recipes/${recipe.id}`} className="flex min-w-0 flex-1 items-center gap-3">
      <img src={recipe.imageUrl} alt="" className="h-16 w-20 shrink-0 rounded-lg object-cover" />
      <div className="min-w-0 flex-1"><p className="text-[11px] font-extrabold uppercase tracking-wider text-foreground">{label}</p><p className="line-clamp-2 text-sm font-semibold">{displayName || recipe.name}</p><p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground"><Flame className="h-3 w-3" /> kb. {estimateRecipeCalories(recipe)} kcal · {servings} adag</p></div>
    </Link>
    <Button type="button" variant="outline" size="sm" className="h-9 shrink-0 border-primary px-3 font-bold text-primary" onClick={onReplace}>Csere</Button>
  </div>;
}

type MobileSlot = 'soup' | 'lunch' | 'side' | 'pickle' | 'dessert' | 'dinner';

function slotCategory(slot: MobileSlot): Recipe['category'] {
  return ({ soup: 'soup', lunch: 'main', side: 'side', pickle: 'pickle', dessert: 'dessert', dinner: 'main' } as const)[slot];
}

function slotLabel(slot: MobileSlot) {
  return ({ soup: 'Leves', lunch: 'Főétel', side: 'Köret', pickle: 'Savanyúság', dessert: 'Desszert', dinner: 'Vacsora' } as const)[slot];
}

function mobileMealLabel(label: string, slot: MobileSlot) {
  return slot === 'dinner' ? 'VACSORA' : `EBÉD · ${label.toLocaleUpperCase('hu')}`;
}

function mobileDayLabel(day: WeekDay) {
  return ({ Hétfő: 'H', Kedd: 'K', Szerda: 'Sze', Csütörtök: 'Cs', Péntek: 'P', Szombat: 'Szo', Vasárnap: 'V' } as Record<WeekDay, string>)[day];
}

function servingsForLabel(label: string, plan: ReturnType<typeof useAppContext>['weekPlan'][WeekDay]) {
  if (label === 'Leves') return plan.soupServings;
  if (label === 'Főétel') return plan.lunchServings;
  if (label === 'Köret') return plan.sideServings;
  if (label === 'Savanyúság') return plan.pickleServings;
  if (label === 'Desszert') return plan.dessertServings;
  return plan.dinnerServings;
}

function hash(value: string) { return [...value].reduce((total, char) => ((total << 5) - total + char.charCodeAt(0)) | 0, 0); }

function MealSlot({ label, value, servings, days = 1, options, recipes, onChange, onServingsChange, onDaysChange }: { label: string; value: string | null; servings: number; days?: number; options: Recipe[]; recipes: Recipe[]; onChange: (value: string | null) => void; onServingsChange: (value: number) => void; onDaysChange?: (value: number) => void }) {
  const recipe = value ? recipes.find(item => item.id === value) : null;
  return <div className="rounded-lg bg-secondary/35 p-3">
    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
    <select value={value || ''} onChange={event => onChange(event.target.value || null)} className="mb-2 w-full rounded-md border bg-background px-3 py-2 text-sm">
      <option value="">— Nincs kiválasztva —</option>
      {options.map(item => <option key={item.id} value={item.id}>{isQuickRecipe(item) ? '⚡ ' : ''}{item.name} ({CATEGORY_LABELS[item.category]})</option>)}
    </select>
    {recipe && <div className="flex gap-3 rounded-lg border bg-card p-2.5">
      <Link to={`/recipes/${recipe.id}`} className="shrink-0 overflow-hidden rounded-md"><img src={recipe.imageUrl} alt={recipe.name} className="h-[70px] w-24 object-cover" /></Link>
      <div className="min-w-0 flex-1"><Link to={`/recipes/${recipe.id}`} className="line-clamp-2 text-sm font-semibold hover:text-primary">{recipe.name}</Link><Link to={`/recipes/${recipe.id}`} className="text-xs text-primary hover:underline">Recept megnyitása</Link>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground"><Flame className="h-3 w-3" /> kb. {estimateRecipeCalories(recipe)} kcal/adag</p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs"><Counter label="Adag" value={servings} min={1} onChange={onServingsChange} />{onDaysChange && <Counter label="Napra" value={days} min={1} max={7} onChange={onDaysChange} />}</div>
      </div>
    </div>}
  </div>;
}

function Counter({ label, value, min, max = 99, onChange }: { label: string; value: number; min: number; max?: number; onChange: (value: number) => void }) {
  return <div className="flex items-center gap-1"><span className="text-muted-foreground">{label}:</span><button onClick={() => onChange(Math.max(min, value - 1))} className="flex h-5 w-5 items-center justify-center rounded border bg-background">−</button><strong>{value}</strong><button onClick={() => onChange(Math.min(max, value + 1))} className="flex h-5 w-5 items-center justify-center rounded border bg-background">+</button></div>;
}
