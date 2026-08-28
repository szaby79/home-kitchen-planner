import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, BarChart3, CalendarDays, CheckCircle2, ExternalLink, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/components/Layout';
import { estimateRecipe, estimateShoppingList } from '@/lib/budgetCalculator';
import { FOOD_PRICE_PERIOD, FOOD_PRICE_REGION, STATCAN_TABLE } from '@/data/foodPrices';
import { WEEKDAYS } from '@/types/recipe';

const BUDGET_KEY = 'plan-pan-weekly-budget';
const cad = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' });

export default function BudgetPage() {
  const { shoppingList, dailyShoppingList, recipes, weekPlan } = useAppContext();
  const [weeklyBudget, setWeeklyBudget] = useState(() => Number(localStorage.getItem(BUDGET_KEY)) || 150);

  const estimate = useMemo(() => estimateShoppingList(shoppingList), [shoppingList]);
  const dailyTotals = useMemo(
    () => WEEKDAYS.map(day => ({ day, total: estimateShoppingList(dailyShoppingList[day]).total })),
    [dailyShoppingList],
  );

  const plannedMeals = useMemo(() => {
    const meals = WEEKDAYS.flatMap(day => {
      const plan = weekPlan[day];
      return [
        { id: plan.soup, servings: plan.soupServings, label: `${day} leves` },
        { id: plan.lunch, servings: plan.lunchServings, label: `${day} főétel` },
        { id: plan.side, servings: plan.sideServings, label: `${day} köret` },
        { id: plan.pickle, servings: plan.pickleServings, label: `${day} savanyúság` },
        { id: plan.dinner, servings: plan.dinnerServings, label: `${day} vacsora` },
        { id: plan.dessert, servings: plan.dessertServings, label: `${day} desszert` },
      ];
    }).filter(meal => meal.id);

    return meals.map(meal => {
      const recipe = recipes.find(item => item.id === meal.id)!;
      return { ...meal, name: recipe.name, cost: estimateRecipe(recipe, meal.servings) };
    });
  }, [recipes, weekPlan]);

  const mostExpensive = [...plannedMeals].sort((a, b) => b.cost - a.cost).slice(0, 3);
  const totalServings = plannedMeals.reduce((sum, meal) => sum + meal.servings, 0);
  const remaining = weeklyBudget - estimate.total;
  const budgetPercent = weeklyBudget > 0 ? Math.min((estimate.total / weeklyBudget) * 100, 100) : 100;
  const hasMenu = shoppingList.length > 0;

  const updateBudget = (value: number) => {
    const safeValue = Math.max(0, value || 0);
    setWeeklyBudget(safeValue);
    localStorage.setItem(BUDGET_KEY, String(safeValue));
  };

  return (
    <div className="page-container max-w-5xl">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="section-title flex items-center gap-2"><WalletCards className="h-7 w-7 text-primary" /> Heti Budget</h1>
          <p className="text-sm text-muted-foreground">A heti menü hozzávalóinak becsült költsége kanadai átlagárak alapján.</p>
        </div>
        <Button asChild variant="outline"><Link to="/planner"><CalendarDays className="mr-2 h-4 w-4" /> Menü módosítása</Link></Button>
      </div>

      <section className="mb-6 rounded-xl border bg-card p-5">
        <label htmlFor="weekly-budget" className="mb-2 block text-sm font-semibold">Heti keret</label>
        <div className="flex max-w-xs items-center gap-2">
          <span className="text-lg font-semibold">$</span>
          <Input id="weekly-budget" type="number" min="0" step="5" value={weeklyBudget} onChange={event => updateBudget(Number(event.target.value))} />
          <span className="text-sm text-muted-foreground">CAD</span>
        </div>
      </section>

      {!hasMenu ? (
        <div className="rounded-xl border bg-card p-10 text-center">
          <BarChart3 className="mx-auto mb-3 h-12 w-12 text-muted-foreground/40" />
          <h2 className="font-semibold">Még nincs kiszámítható menü</h2>
          <p className="mb-5 text-sm text-muted-foreground">Először készíts menüt, utána itt megjelenik a várható költség.</p>
          <Button asChild><Link to="/planner">Menü készítése</Link></Button>
        </div>
      ) : (
        <>
          <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard label="Becsült heti költség" value={cad.format(estimate.total)} />
            <SummaryCard label="Heti keret" value={cad.format(weeklyBudget)} />
            <SummaryCard label="Becsült havi költség" value={cad.format(estimate.total * 4.33)} />
            <SummaryCard label="Átlag egy adagra" value={cad.format(totalServings ? estimate.total / totalServings : 0)} />
          </section>

          <section className={`mb-6 rounded-xl border p-5 ${remaining >= 0 ? 'border-success/40 bg-success/10' : 'border-destructive/40 bg-destructive/10'}`}>
            <div className="mb-3 flex items-center gap-2 font-semibold">
              {remaining >= 0 ? <CheckCircle2 className="h-5 w-5 text-success" /> : <AlertTriangle className="h-5 w-5 text-destructive" />}
              {remaining >= 0 ? `${cad.format(remaining)} marad a heti keretből` : `${cad.format(Math.abs(remaining))} összeggel túllépi a keretet`}
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-background/80">
              <div className={`h-full rounded-full ${remaining >= 0 ? 'bg-success' : 'bg-destructive'}`} style={{ width: `${budgetPercent}%` }} />
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border bg-card p-5">
              <h2 className="mb-4 font-display text-lg font-semibold">Napi bontás</h2>
              <div className="space-y-3">
                {dailyTotals.filter(item => item.total > 0).map(item => (
                  <div key={item.day} className="flex items-center justify-between border-b pb-2 text-sm last:border-0">
                    <span>{item.day}</span><strong>{cad.format(item.total)}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border bg-card p-5">
              <h2 className="mb-4 font-display text-lg font-semibold">Legdrágább tervezett ételek</h2>
              <div className="space-y-3">
                {mostExpensive.map(meal => (
                  <div key={`${meal.label}-${meal.id}`} className="flex items-start justify-between gap-3 border-b pb-2 text-sm last:border-0">
                    <div><p className="font-medium">{meal.name}</p><p className="text-xs text-muted-foreground">{meal.label}</p></div>
                    <strong>{cad.format(meal.cost)}</strong>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      )}

      <section className="mt-6 rounded-xl border bg-secondary/20 p-4 text-xs text-muted-foreground">
        <p><strong>Árbecslés:</strong> {FOOD_PRICE_REGION}, {FOOD_PRICE_PERIOD}. A hivatalosan elérhető termékeknél Statistics Canada átlagárat, a hiányzó hozzávalóknál jelzett tervezési becslést használunk. Ez nem pénztári végösszeg.</p>
        {hasMenu && <p className="mt-1">A heti becslés {Math.round(estimate.statcanCoverage)}%-a közvetlen Statistics Canada-áron alapul.</p>}
        <a className="mt-2 inline-flex items-center gap-1 text-primary hover:underline" href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810024501" target="_blank" rel="noreferrer">
          Forrás: Statistics Canada, {STATCAN_TABLE} <ExternalLink className="h-3 w-3" />
        </a>
      </section>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border bg-card p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-xl font-bold text-primary">{value}</p></div>;
}
