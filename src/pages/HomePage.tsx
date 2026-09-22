import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users } from 'lucide-react';
import { useAppContext } from '@/components/Layout';
import { WEEKDAYS } from '@/types/recipe';
import { useLanguage } from '@/i18n/LanguageContext';
import { hasPlanMeals } from '@/lib/weeklyPlanValidation';

export default function HomePage() {
  const { weekPlan } = useAppContext();
  const { isEnglish, tr } = useLanguage();
  const hasSavedPlan = hasPlanMeals(weekPlan);
  const plannedDays = WEEKDAYS.filter(day => weekPlan[day].lunch || weekPlan[day].dinner).length;
  const plannedMeals = WEEKDAYS.reduce((count, day) => count + Number(Boolean(weekPlan[day].lunch)) + Number(Boolean(weekPlan[day].dinner)), 0);

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
    </div>
  );
}
