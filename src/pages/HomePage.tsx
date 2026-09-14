import { Link } from 'react-router-dom';
import { BookOpen, CalendarDays, ShoppingCart, WalletCards, ChefHat, ArrowRight, Heart, Sparkles, Users, CircleHelp } from 'lucide-react';
import { useAppContext } from '@/components/Layout';
import { CATEGORY_LABELS, Category } from '@/types/recipe';
import { useLanguage } from '@/i18n/LanguageContext';
import { EN_CATEGORY_LABELS } from '@/i18n/labels';

export default function HomePage() {
  const { recipes } = useAppContext();
  const { isEnglish, tr } = useLanguage();
  const features = [
    { to: '/planner', icon: CalendarDays, title: tr('Heti menütervező', 'Weekly meal planner'), desc: tr('Készíts ebéd- és vacsoratervet néhány kattintással', 'Plan family lunches and dinners in just a few clicks'), color: 'bg-[#F7D8C8] text-[#B74624]', card: 'bg-[#FFF1E8] border-[#E9BDA7]' },
    { to: '/shopping', icon: ShoppingCart, title: tr('Bevásárlólista', 'Shopping list'), desc: tr('A menü alapján automatikusan összeállítva', 'Created automatically from your meal plan'), color: 'bg-[#DCE8D7] text-[#526A4B]', card: 'bg-[#F2F7EF] border-[#C8D8C1]' },
    { to: '/recipes', icon: BookOpen, title: tr('Receptek', 'Recipes'), desc: tr('Kezdőknek is érthető receptek, lépésről lépésre', 'Clear, step-by-step recipes for beginners'), color: 'bg-[#F3E2C7] text-[#775A35]', card: 'bg-[#FFF8EC] border-[#E7D1AD]' },
    { to: '/budget', icon: WalletCards, title: 'Budget', desc: tr('Becsült heti költség és keretfigyelés', 'Estimated weekly costs and budget tracking'), color: 'bg-[#E7E2D8] text-[#5F554A]', card: 'bg-[#F8F5EF] border-[#D9D0C2]' },
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
      <section className="relative overflow-hidden text-center py-12 sm:py-16 rounded-3xl bg-gradient-to-br from-[#FFE8D7] via-[#FFF8EE] to-[#E3EDDE] border border-[#E6C4A8] px-5 mb-10 shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F6D0BD] mb-4 shadow-sm">
          <ChefHat className="w-8 h-8 text-primary" />
        </div>
        <h1 className="section-title text-3xl sm:text-4xl mb-5">Plan & Pan</h1>
        <h2 className="mx-auto mb-5 max-w-3xl font-display text-[32px] font-semibold leading-[1.1] text-[#3A2E2A] sm:text-[46px]">
          {isEnglish ? (
            <>
              <span className="block">Less planning.</span>
              <span className="block">Less rushing.</span>
              <span className="block">More time together.</span>
            </>
          ) : (
            <>
              <span className="block">Kevesebb tervezés.</span>
              <span className="block">Kevesebb kapkodás.</span>
              <span className="block">Több idő együtt.</span>
            </>
          )}
        </h2>
        <p className="mx-auto mb-7 max-w-2xl text-[20px] font-medium leading-[1.5] text-[#5A4A44]">
          {tr(
            'A Plan & Pan megtervezi a heti étkezést, segít a főzésben, és automatikusan összeállítja a bevásárlólistát — a családodhoz igazítva.',
            'Plan & Pan plans your weekly meals, helps with cooking, and automatically creates the shopping list — tailored to your family.',
          )}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto">
          <Link to="/planner" className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
            <Sparkles className="w-4 h-4" /> {tr('Autopilot', 'Autopilot')} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/family-settings" className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-accent bg-[#F2F7EF] px-5 py-3 font-semibold text-accent transition hover:bg-[#E3EDDE]">
            <Users className="w-4 h-4" /> {tr('Családi beállítások', 'Family preferences')}
          </Link>
        </div>
        <p className="mt-3 text-sm font-medium text-muted-foreground">{tr('Az Autopilot megnyitása után először átnézheted a családi beállításokat, majd összeállíthatod a hetet.', 'After opening Autopilot, you can review family preferences first, then build your week.')}</p>
        <Link to="/help" className="mx-auto mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-card/80 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <CircleHelp className="h-5 w-5" aria-hidden="true" />
          {tr('Először jársz itt? Ismerd meg a Plan & Pant', 'New here? Learn how Plan & Pan works')}
        </Link>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 max-w-5xl mx-auto mb-10">
        {(Object.keys(CATEGORY_LABELS) as Category[]).map(cat => (
          <Link key={cat} to={`/recipes?category=${cat}`} className="bg-[#FFF1E2] rounded-lg p-4 text-center card-hover border border-[#E8C9AA]">
            <p className="text-2xl font-bold text-primary">{counts[cat]}</p>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">{isEnglish ? EN_CATEGORY_LABELS[cat] : CATEGORY_LABELS[cat]}</p>
          </Link>
        ))}
      </section>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8 leading-relaxed font-medium">
        <Heart className="w-4 h-4 text-primary" /> {tr('Jelöld meg a kedvenc ételeidet, hogy később könnyen megtaláld őket.', 'Mark favourite dishes so you can find them easily later.')}
      </div>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {features.map(f => (
          <Link key={f.to} to={f.to} className={`border rounded-xl p-5 card-hover group ${f.card}`}>
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${f.color}`}><f.icon className="w-5 h-5" /></div>
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">{f.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
