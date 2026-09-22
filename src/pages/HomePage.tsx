import { Link } from 'react-router-dom';
import { BookOpen, CalendarDays, ShoppingCart, WalletCards, ArrowRight, Heart, Sparkles, Users, ChevronDown } from 'lucide-react';
import { useAppContext } from '@/components/Layout';
import { CATEGORY_LABELS, Category, WEEKDAYS } from '@/types/recipe';
import { useLanguage } from '@/i18n/LanguageContext';
import { EN_CATEGORY_LABELS } from '@/i18n/labels';
import { hasPlanMeals } from '@/lib/weeklyPlanValidation';

export default function HomePage() {
  const { recipes, weekPlan } = useAppContext();
  const { isEnglish, tr } = useLanguage();
  const hasSavedPlan = hasPlanMeals(weekPlan);
  const plannedDays = WEEKDAYS.filter(day => weekPlan[day].lunch || weekPlan[day].dinner).length;
  const plannedMeals = WEEKDAYS.reduce((count, day) => count + Number(Boolean(weekPlan[day].lunch)) + Number(Boolean(weekPlan[day].dinner)), 0);
  const features = [
    { to: '/planner', icon: CalendarDays, title: tr('Heti menütervező', 'Weekly meal planner'), desc: tr('Készíts ebéd- és vacsoratervet néhány kattintással', 'Plan family lunches and dinners in just a few clicks'), color: 'bg-[#F7D8C8] text-[#B74624]', card: 'bg-[#FFF1E8] border-[#E9BDA7]' },
    { to: '/shopping', icon: ShoppingCart, title: tr('Bevásárlólista', 'Shopping list'), desc: tr('A menü alapján automatikusan összeállítva', 'Created automatically from your meal plan'), color: 'bg-[#DCE8D7] text-[#526A4B]', card: 'bg-[#F2F7EF] border-[#C8D8C1]' },
    { to: '/recipes', icon: BookOpen, title: tr('Receptek', 'Recipes'), desc: tr('Kezdőknek is érthető receptek, lépésről lépésre', 'Clear, step-by-step recipes for beginners'), color: 'bg-[#F3E2C7] text-[#775A35]', card: 'bg-[#FFF8EC] border-[#E7D1AD]' },
    { to: '/budget', icon: WalletCards, title: tr('Heti keret', 'Weekly budget'), desc: tr('Becsült heti költség és keretfigyelés', 'Estimated weekly costs and budget tracking'), color: 'bg-[#E7E2D8] text-[#5F554A]', card: 'bg-[#F8F5EF] border-[#D9D0C2]' },
  ];

  const counts: Record<Category, number> = {
    soup: recipes.filter(r => r.category === 'soup').length,
    main: recipes.filter(r => r.category === 'main').length,
    stew: recipes.filter(r => r.category === 'stew').length,
    side: recipes.filter(r => r.category === 'side').length,
    pickle: recipes.filter(r => r.category === 'pickle').length,
    salad: recipes.filter(r => r.category === 'salad').length,
    dessert: recipes.filter(r => r.category === 'dessert').length,
  };

  return (
    <div className="page-container">
      <section className="relative overflow-hidden rounded-3xl border border-[#E6C4A8] bg-gradient-to-br from-[#FFE8D7] via-[#FFF8EE] to-[#E3EDDE] px-5 py-8 text-center shadow-sm sm:px-8 sm:py-12">
        <h1 className="mx-auto mb-4 max-w-3xl font-display text-[34px] font-semibold leading-[1.08] text-[#3A2E2A] sm:text-[46px]">
          {isEnglish ? (
            <>
              <span className="block">Less planning.</span>
              <span className="block">More time together.</span>
            </>
          ) : (
            <>
              <span className="block">Kevesebb tervezés.</span>
              <span className="block">Több idő együtt.</span>
            </>
          )}
        </h1>
        <p className="mx-auto mb-6 max-w-xl text-lg font-medium leading-relaxed text-[#5A4A44]">
          {tr(
            'Megtervezi a heti étkezést, és automatikusan összeállítja a bevásárlólistát a családodhoz igazítva.',
            'Plans your weekly meals and automatically creates your shopping list for your family.',
          )}
        </p>
        {hasSavedPlan && (
          <p className="mb-3 text-sm font-bold text-[#526A4B]">
            {tr(`${plannedDays} nap • ${plannedMeals} étkezés elmentve`, `${plannedDays} days • ${plannedMeals} meals saved`)}
          </p>
        )}
        <div className="mx-auto flex max-w-xl flex-col gap-3">
          <Link to="/planner" className="mx-auto inline-flex min-h-11 w-full max-w-md items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
            <Sparkles className="h-5 w-5" />
            {tr('Autopilot', 'Autopilot')}
            <ArrowRight className="h-5 w-5" />
          </Link>

          <figure className="overflow-hidden rounded-2xl border border-[#E6C4A8] bg-[#FFF8EE] shadow-sm">
            <img
              src="/images/home-family-meal.webp"
              alt={tr('Frissen elkészült, tartalmas családi étel', 'A freshly prepared, hearty family meal')}
              className="h-44 w-full object-cover sm:h-64"
              width="1200"
              height="800"
              loading="eager"
              decoding="async"
            />
          </figure>

          <Link to="/family-settings" className="mx-auto inline-flex min-h-11 w-full max-w-md items-center justify-center gap-2 rounded-lg border border-accent bg-[#F2F7EF]/80 px-4 py-2.5 font-semibold text-accent transition hover:bg-[#E3EDDE]">
            <Users className="h-4 w-4" /> {tr('Családi beállítások', 'Family preferences')}
          </Link>
        </div>
        <Link to="/help" className="mx-auto mt-4 inline-flex min-h-11 items-center justify-center px-3 text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          {tr('Hogyan működik?', 'How does it work?')}
        </Link>
      </section>

      <details className="group mx-auto mt-4 max-w-5xl rounded-lg border bg-card/80">
        <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-sm font-semibold marker:hidden">
          <span>{tr('További lehetőségek', 'More options')}</span>
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="space-y-8 border-t p-4 sm:p-6">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(f => (
              <Link key={f.to} to={f.to} className={`group/card rounded-xl border p-5 card-hover ${f.card}`}>
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${f.color}`}><f.icon className="h-5 w-5" /></div>
                <h2 className="mb-1 font-semibold">{f.title}</h2>
                <p className="text-sm font-medium leading-relaxed text-muted-foreground">{f.desc}</p>
              </Link>
            ))}
          </section>

          <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {(Object.keys(CATEGORY_LABELS) as Category[]).map(cat => (
              <Link key={cat} to={`/recipes?category=${cat}`} className="rounded-lg border border-[#E8C9AA] bg-[#FFF1E2] p-4 text-center card-hover">
                <p className="text-2xl font-bold text-primary">{counts[cat]}</p>
                <p className="text-sm font-medium leading-relaxed text-muted-foreground">{isEnglish ? EN_CATEGORY_LABELS[cat] : CATEGORY_LABELS[cat]}</p>
              </Link>
            ))}
          </section>

          <div className="flex items-center justify-center gap-2 text-sm font-medium leading-relaxed text-muted-foreground">
            <Heart className="h-4 w-4 text-primary" /> {tr('Jelöld meg a kedvenc ételeidet, hogy később könnyen megtaláld őket.', 'Mark favourite dishes so you can find them easily later.')}
          </div>
        </div>
      </details>
    </div>
  );
}
