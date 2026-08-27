import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/components/Layout';
import { WEEKDAYS, WeekDay, CATEGORY_LABELS, Recipe, WeekendDessertMode, createGenerationSelection, GenerationSelection, MealSlot as MealSlotType } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Shuffle, Trash2, Minus, Plus, Zap, ShoppingCart, Check } from 'lucide-react';
import { isQuickRecipe } from '@/lib/recipeScheduling';

export default function PlannerPage() {
  const { recipes, weekPlan, updateDay, clearPlan, generateRandomPlan } = useAppContext();
  const [selection, setSelection] = useState<GenerationSelection>(() => createGenerationSelection(true));
  const [weekendDessertMode, setWeekendDessertMode] = useState<WeekendDessertMode>('same');
  const [hasGenerated, setHasGenerated] = useState(false);

  const selectedCount = WEEKDAYS.reduce(
    (count, day) => count + Number(selection[day].lunch) + Number(selection[day].dinner),
    0,
  );

  const setAll = (selected: boolean) => setSelection(createGenerationSelection(selected));

  const setFromToday = () => {
    const todayIndex = (new Date().getDay() + 6) % 7;
    const next = createGenerationSelection(false);
    WEEKDAYS.slice(todayIndex).forEach(day => {
      next[day] = { lunch: true, dinner: true };
    });
    setSelection(next);
  };

  const toggleSelection = (day: WeekDay, slot: MealSlotType) => {
    setSelection(current => ({
      ...current,
      [day]: { ...current[day], [slot]: !current[day][slot] },
    }));
  };

  const handleGenerate = () => {
    if (selectedCount === 0) return;
    generateRandomPlan(selection, weekendDessertMode);
    setHasGenerated(true);
  };

  const recipeOptions = (mealSlot: 'lunch' | 'dinner') => {
    return recipes.filter(r => {
      if (r.category === 'dessert') return false;
      if (mealSlot === 'lunch') return r.mealType === 'lunch' || r.mealType === 'both';
      return (r.category === 'main' || r.category === 'salad') && (r.mealType === 'dinner' || r.mealType === 'both');
    });
  };

  const dessertOptions = recipes.filter(r => r.category === 'dessert');

  return (
    <div className="page-container">
      <h1 className="section-title">Heti menüterv</h1>
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm">
        <Zap className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <p><strong>Életszerű tervezés:</strong> hétköznap gyorsabb ételek, vasárnapi ebédre tartalmasabb fogás. A salátákat és a ⚡ jelölt gyors ételeket bármikor kézzel is kiválaszthatod.</p>
      </div>

      {/* Generation controls */}
      <div className="bg-card border rounded-lg p-4 mb-6 space-y-4">
        <div>
          <h2 className="font-semibold">Melyik napokra készüljön menü?</h2>
          <p className="text-sm text-muted-foreground">Csak a kijelölt étkezések változnak, a többi megmarad.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setAll(true)}>Teljes hét</Button>
          <Button variant="outline" size="sm" onClick={setFromToday}>Mától vasárnapig</Button>
          <Button variant="ghost" size="sm" onClick={() => setAll(false)}>Kijelölés törlése</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {WEEKDAYS.map(day => (
            <div key={day} className="rounded-lg border bg-secondary/20 p-3">
              <p className="font-semibold text-sm mb-2">{day}</p>
              <div className="flex gap-2">
                {(['lunch', 'dinner'] as MealSlotType[]).map(slot => {
                  const selected = selection[day][slot];
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => toggleSelection(day, slot)}
                      className={`flex flex-1 items-center justify-center gap-1 rounded-md border px-2 py-1.5 text-xs font-medium transition ${selected ? 'border-primary bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'}`}
                    >
                      {selected && <Check className="h-3 w-3" />}{slot === 'lunch' ? 'Ebéd' : 'Vacsora'}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[210px]">
          <label className="text-sm font-medium mb-1 block">Hétvégi desszert</label>
          <select
            value={weekendDessertMode}
            onChange={event => setWeekendDessertMode(event.target.value as WeekendDessertMode)}
            className="w-full h-8 bg-background border rounded-md px-2 text-sm"
          >
            <option value="same">Ugyanaz mindkét nap</option>
            <option value="different">Különböző desszert</option>
          </select>
        </div>
        <Button onClick={handleGenerate} disabled={selectedCount === 0} className="gap-2">
          <Shuffle className="w-4 h-4" /> Generálás ({selectedCount})
        </Button>
        <Button variant="outline" onClick={() => { clearPlan(); setHasGenerated(false); }} className="gap-2">
          <Trash2 className="w-4 h-4" /> Törlés
        </Button>
        </div>
      </div>

      {hasGenerated && (
        <div className="mb-6 rounded-xl border border-accent/40 bg-accent/10 p-4">
          <p className="font-semibold">Kész a menü.</p>
          <p className="mb-3 text-sm text-muted-foreground">Cseréld ki nyugodtan, ami nem tetszik. A bevásárlólista minden változtatás után automatikusan frissül.</p>
          <Button asChild className="gap-2">
            <Link to="/shopping"><ShoppingCart className="h-4 w-4" /> Bevásárlólista megtekintése</Link>
          </Button>
        </div>
      )}

      {/* Week grid */}
      <div className="space-y-3">
        {WEEKDAYS.map(day => {
          const plan = weekPlan[day];
          return (
            <div key={day} className="bg-card border rounded-lg p-4 animate-fade-in">
              <h3 className="font-display font-semibold text-lg mb-3">{day}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Lunch */}
                <MealSlot
                  label="Ebéd"
                  value={plan.lunch}
                  servings={plan.lunchServings}
                  days={plan.lunchDays}
                  options={recipeOptions('lunch')}
                  recipes={recipes}
                  onChange={val => updateDay(day, { lunch: val })}
                  onServingsChange={val => updateDay(day, { lunchServings: val })}
                  onDaysChange={val => updateDay(day, { lunchDays: val })}
                />
                {/* Dinner */}
                <MealSlot
                  label="Vacsora"
                  value={plan.dinner}
                  servings={plan.dinnerServings}
                  days={plan.dinnerDays}
                  options={recipeOptions('dinner')}
                  recipes={recipes}
                  onChange={val => updateDay(day, { dinner: val })}
                  onServingsChange={val => updateDay(day, { dinnerServings: val })}
                  onDaysChange={val => updateDay(day, { dinnerDays: val })}
                />
              </div>
              {(day === 'Szombat' || day === 'Vasárnap') && (
                <div className="mt-4 border-t pt-4">
                  <MealSlot
                    label="Desszert ebéd után"
                    value={plan.dessert}
                    servings={plan.dessertServings}
                    days={1}
                    options={dessertOptions}
                    recipes={recipes}
                    onChange={val => updateDay(day, { dessert: val })}
                    onServingsChange={val => updateDay(day, { dessertServings: val })}
                    hideDays
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MealSlot({ label, value, servings, days, options, recipes, onChange, onServingsChange, onDaysChange, hideDays = false }: {
  label: string;
  value: string | null;
  servings: number;
  days: number;
  options: Recipe[];
  recipes: Recipe[];
  onChange: (val: string | null) => void;
  onServingsChange: (val: number) => void;
  onDaysChange?: (val: number) => void;
  hideDays?: boolean;
}) {
  const recipe = value ? recipes.find(r => r.id === value) : null;

  return (
    <div className="bg-secondary/30 rounded-md p-3">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">{label}</label>
      <select
        value={value || ''}
        onChange={e => onChange(e.target.value || null)}
        className="w-full bg-background border rounded-md px-3 py-2 text-sm mb-2"
      >
        <option value="">— Nincs kiválasztva —</option>
        {options.map(r => (
          <option key={r.id} value={r.id}>
            {isQuickRecipe(r) ? '⚡ ' : ''}{r.name} ({CATEGORY_LABELS[r.category]})
          </option>
        ))}
      </select>
      {recipe && (
        <div className="flex gap-3 rounded-lg border bg-card p-2.5">
          <Link
            to={`/recipes/${recipe.id}`}
            aria-label={`${recipe.name} receptjének megnyitása`}
            className="shrink-0 overflow-hidden rounded-md"
          >
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="h-[72px] w-24 sm:w-28 object-cover transition-transform hover:scale-105"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <Link to={`/recipes/${recipe.id}`} className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2">
              {recipe.name}
            </Link>
            <Link to={`/recipes/${recipe.id}`} className="text-xs text-primary hover:underline">
              Recept megnyitása
            </Link>
            <div className="flex flex-wrap gap-3 text-xs mt-2">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Adag:</span>
                <button onClick={() => onServingsChange(Math.max(1, servings - 1))} className="bg-background border rounded w-5 h-5 flex items-center justify-center">-</button>
                <span className="font-bold">{servings}</span>
                <button onClick={() => onServingsChange(servings + 1)} className="bg-background border rounded w-5 h-5 flex items-center justify-center">+</button>
              </div>
              {!hideDays && onDaysChange && <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Napra:</span>
                <button onClick={() => onDaysChange(Math.max(1, days - 1))} className="bg-background border rounded w-5 h-5 flex items-center justify-center">-</button>
                <span className="font-bold">{days}</span>
                <button onClick={() => onDaysChange(Math.min(7, days + 1))} className="bg-background border rounded w-5 h-5 flex items-center justify-center">+</button>
              </div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
