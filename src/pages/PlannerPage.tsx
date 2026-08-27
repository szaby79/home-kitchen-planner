import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/components/Layout';
import { WEEKDAYS, WeekDay, CATEGORY_LABELS, Recipe, WeekendDessertMode } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Shuffle, Trash2, Minus, Plus, Zap } from 'lucide-react';
import { isQuickRecipe } from '@/lib/recipeScheduling';

export default function PlannerPage() {
  const { recipes, weekPlan, updateDay, clearPlan, generateRandomPlan } = useAppContext();
  const [numLunches, setNumLunches] = useState(7);
  const [numDinners, setNumDinners] = useState(7);
  const [weekendDessertMode, setWeekendDessertMode] = useState<WeekendDessertMode>('same');

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
      <div className="bg-card border rounded-lg p-4 mb-6 flex flex-wrap items-end gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Ebédek száma</label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setNumLunches(Math.max(0, numLunches - 1))}><Minus className="w-3 h-3" /></Button>
            <span className="w-6 text-center font-bold">{numLunches}</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setNumLunches(Math.min(7, numLunches + 1))}><Plus className="w-3 h-3" /></Button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Vacsorák száma</label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setNumDinners(Math.max(0, numDinners - 1))}><Minus className="w-3 h-3" /></Button>
            <span className="w-6 text-center font-bold">{numDinners}</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setNumDinners(Math.min(7, numDinners + 1))}><Plus className="w-3 h-3" /></Button>
          </div>
        </div>
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
        <Button onClick={() => generateRandomPlan(numLunches, numDinners, weekendDessertMode)} className="gap-2">
          <Shuffle className="w-4 h-4" /> Generálás
        </Button>
        <Button variant="outline" onClick={clearPlan} className="gap-2">
          <Trash2 className="w-4 h-4" /> Törlés
        </Button>
      </div>

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
