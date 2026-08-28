import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/components/Layout';
import { WEEKDAYS, WeekDay, CATEGORY_LABELS, Recipe, WeekendDessertMode, createGenerationSelection, GenerationSelection, MealSlot as MealSlotType } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Shuffle, Trash2, Zap, ShoppingCart, Check, Flame, Utensils } from 'lucide-react';
import { isQuickRecipe } from '@/lib/recipeScheduling';
import { estimateRecipeCalories } from '@/lib/calorieCalculator';

type SortMode = 'abc' | 'random' | 'favorites';

export default function PlannerPage() {
  const { recipes, weekPlan, updateDay, clearPlan, generateRandomPlan, isFavorite } = useAppContext();
  const [selection, setSelection] = useState<GenerationSelection>(() => createGenerationSelection(true));
  const [weekendDessertMode, setWeekendDessertMode] = useState<WeekendDessertMode>('same');
  const [sortMode, setSortMode] = useState<SortMode>('abc');
  const [randomSeed, setRandomSeed] = useState(1);
  const [hasGenerated, setHasGenerated] = useState(false);
  const selectedCount = WEEKDAYS.reduce((count, day) => count + Number(selection[day].lunch) + Number(selection[day].dinner), 0);

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
  const handleGenerate = () => { if (selectedCount) { generateRandomPlan(selection, weekendDessertMode); setHasGenerated(true); } };
  const changeSort = (mode: SortMode) => { setSortMode(mode); if (mode === 'random') setRandomSeed(seed => seed + 1); };

  return (
    <div className="page-container max-w-6xl">
      <h1 className="section-title">Heti menüterv</h1>
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm">
        <Zap className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <p><strong>Életszerű tervezés:</strong> komplett ebéd külön levessel, főétellel, körettel, savanyúsággal és desszerttel. Vacsorára csak gyors étel vagy saláta kerül.</p>
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
          <label className="min-w-[210px] text-sm font-medium">Hétvégi desszert
            <select value={weekendDessertMode} onChange={event => setWeekendDessertMode(event.target.value as WeekendDessertMode)} className="mt-1 h-9 w-full rounded-md border bg-background px-2 text-sm">
              <option value="same">Ugyanaz mindkét nap</option><option value="different">Különböző desszert</option>
            </select>
          </label>
          <Button onClick={handleGenerate} disabled={!selectedCount} className="gap-2"><Shuffle className="w-4 h-4" /> Generálás ({selectedCount})</Button>
          <Button variant="outline" onClick={() => { clearPlan(); setHasGenerated(false); }} className="gap-2"><Trash2 className="w-4 h-4" /> Törlés</Button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2 rounded-lg border bg-card p-3 text-sm">
        <span className="font-medium">Ételek sorrendje:</span>
        {([['abc', 'ABC'], ['random', 'Véletlenszerű'], ['favorites', 'Kedvencek elöl']] as const).map(([mode, label]) => <Button key={mode} size="sm" variant={sortMode === mode ? 'default' : 'outline'} onClick={() => changeSort(mode)}>{label}</Button>)}
      </div>

      {hasGenerated && <div className="mb-6 rounded-xl border border-accent/40 bg-accent/10 p-4"><p className="font-semibold">Kész a menü.</p><p className="mb-3 text-sm text-muted-foreground">Minden elemet külön cserélhetsz. A bevásárlólista automatikusan frissül.</p><Button asChild className="gap-2"><Link to="/shopping"><ShoppingCart className="h-4 w-4" /> Bevásárlólista megtekintése</Link></Button></div>}

      <div className="space-y-4">
        {WEEKDAYS.map(day => {
          const plan = weekPlan[day];
          const lunchIds = [plan.soup, plan.lunch, plan.side, plan.pickle, plan.dessert].filter(Boolean) as string[];
          const lunchCalories = lunchIds.reduce((sum, id) => sum + estimateRecipeCalories(recipes.find(recipe => recipe.id === id)!), 0);
          return <section key={day} className="animate-fade-in rounded-xl border bg-card p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h3 className="font-display text-xl font-semibold">{day}</h3>{lunchCalories > 0 && <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"><Flame className="h-3.5 w-3.5" /> Komplett ebéd: kb. {lunchCalories} kcal/adag</span>}</div>
            <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
              <div className="rounded-lg border border-primary/20 bg-primary/[0.035] p-3">
                <h4 className="mb-3 flex items-center gap-2 font-semibold"><Utensils className="h-4 w-4 text-primary" /> Komplett ebéd</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <MealSlot label="Leves" value={plan.soup} servings={plan.soupServings} options={options('soup')} recipes={recipes} onChange={value => updateDay(day, { soup: value })} onServingsChange={value => updateDay(day, { soupServings: value })} />
                  <MealSlot label="Főétel" value={plan.lunch} servings={plan.lunchServings} days={plan.lunchDays} options={options('main')} recipes={recipes} onChange={value => updateDay(day, { lunch: value })} onServingsChange={value => updateDay(day, { lunchServings: value })} onDaysChange={value => updateDay(day, { lunchDays: value })} />
                  <MealSlot label="Köret" value={plan.side} servings={plan.sideServings} options={options('side')} recipes={recipes} onChange={value => updateDay(day, { side: value })} onServingsChange={value => updateDay(day, { sideServings: value })} />
                  <MealSlot label="Savanyúság" value={plan.pickle} servings={plan.pickleServings} options={options('pickle')} recipes={recipes} onChange={value => updateDay(day, { pickle: value })} onServingsChange={value => updateDay(day, { pickleServings: value })} />
                  <div className="sm:col-span-2"><MealSlot label="Desszert ebéd után (választható)" value={plan.dessert} servings={plan.dessertServings} options={options('dessert')} recipes={recipes} onChange={value => updateDay(day, { dessert: value })} onServingsChange={value => updateDay(day, { dessertServings: value })} /></div>
                </div>
              </div>
              <MealSlot label="Vacsora – gyors étel" value={plan.dinner} servings={plan.dinnerServings} days={plan.dinnerDays} options={dinnerOptions} recipes={recipes} onChange={value => updateDay(day, { dinner: value })} onServingsChange={value => updateDay(day, { dinnerServings: value })} onDaysChange={value => updateDay(day, { dinnerDays: value })} />
            </div>
          </section>;
        })}
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">A kalóriaérték tervezési becslés, nem orvosi vagy dietetikusi adat.</p>
    </div>
  );
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
