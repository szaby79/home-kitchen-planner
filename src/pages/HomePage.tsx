import { Link } from 'react-router-dom';
import { BookOpen, CalendarDays, ShoppingCart, WalletCards, ChefHat, ArrowRight, Heart, Zap, Sparkles, Clock3, PackageOpen } from 'lucide-react';
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

  const autopilotBenefits = [
    { icon: CalendarDays, title: tr('A hetedhez igazodik', 'Adapts to your week'), desc: tr('Más lehet a létszám, az idő és a nap típusa minden nap.', 'People, available time and day type can be different each day.') },
    { icon: Clock3, title: tr('Figyeli, mennyi időd van', 'Plans around your time'), desc: tr('A sűrű napokra gyorsabb ételeket választ.', 'Busy days get faster meal choices.') },
    { icon: PackageOpen, title: tr('Használja, ami otthon van', 'Uses what you already have'), desc: tr('A meglévő hozzávalókat és a maradékokat is beépíti a hétbe.', 'Pantry ingredients and leftovers can be built into the week.') },
    { icon: ShoppingCart, title: tr('Okos bevásárlás', 'Smart shopping'), desc: tr('Kevesebb felesleges hozzávaló, jobban összehangolt heti bevásárlás.', 'Fewer unnecessary ingredients and a better coordinated weekly shop.') },
  ];

  const counts: Record<Category, number> = {
    soup: recipes.filter(r => r.category === 'soup').length,
    main: recipes.filter(r => r.category === 'main').length,
    side: recipes.filter(r => r.category === 'side').length,
    pickle: recipes.filter(r => r.category === 'pickle').length,
    salad: recipes.filter(r => r.category === 'salad').length,
    dessert: recipes.filter(r => r.category === 'dessert').length,
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="relative overflow-hidden text-center py-12 sm:py-16 rounded-3xl bg-gradient-to-br from-[#FFE8D7] via-[#FFF8EE] to-[#E3EDDE] border border-[#E6C4A8] px-5 mb-8 shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F6D0BD] mb-4 shadow-sm">
          <ChefHat className="w-8 h-8 text-primary" />
        </div>
        <h1 className="section-title text-3xl sm:text-4xl mb-2">Plan & Pan</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
          {tr('A Plan & Pan megtervezi a család heti ebédjeit és vacsoráit, segít az ételek elkészítésében, majd egy közös bevásárlólistát készít. Nem csupán receptgyűjtemény: leveszi a heti menütervezés terhét a válladról.', 'Plan & Pan plans your family’s weekly lunches and dinners, helps you cook each dish, and creates one combined shopping list. It is more than a recipe collection—it takes the work out of weekly meal planning.')}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink label={tr('Heti menü készítése', 'Create a weekly menu')} />
          <Link
            to="/recipes?quick=1"
            className="inline-flex items-center gap-2 rounded-lg border border-accent bg-[#F2F7EF] px-5 py-3 font-semibold text-accent transition hover:bg-[#E3EDDE]"
          >
            <Zap className="w-4 h-4" /> {tr('Gyors ételek', 'Quick meals')}
          </Link>
        </div>
      </section>

      {/* Autopilot introduction */}
      <section className="max-w-5xl mx-auto mb-10 rounded-2xl border border-[#E6C4A8] bg-[#FFF9F3] p-5 sm:p-7 shadow-sm">
        <div className="text-center max-w-3xl mx-auto mb-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F7D8C8] px-3 py-1 text-sm font-bold text-[#B74624] mb-3">
            <Sparkles className="w-4 h-4" /> {tr('Új: Family Food Autopilot', 'New: Family Food Autopilot')}
          </div>
          <h2 className="section-title text-2xl sm:text-3xl mb-2">{tr('Mondd meg, milyen hetetek lesz. Mi megtervezzük hozzá az étkezést.', 'Tell us what your week looks like. We will plan the food around it.')}</h2>
          <p className="text-muted-foreground font-medium leading-relaxed">{tr('Az Autopilot figyelembe veszi, hányan esztek, mennyi időd van főzni, mikor legyen maradék, mi van már otthon, és milyen legyen a hét fő célja.', 'Autopilot considers how many people are eating, how much time you have, when leftovers make sense, what is already at home, and what matters most this week.')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {autopilotBenefits.map(item => (
            <div key={item.title} className="rounded-xl border border-[#E9D3C2] bg-white/70 p-4">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#F2F7EF] text-[#526A4B] mb-3">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 text-center">
          <Link to="/planner" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
            {tr('Autopilot indítása', 'Start Autopilot')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto mb-10">
        {(Object.keys(CATEGORY_LABELS) as Category[]).map(cat => (
          <Link
            key={cat}
            to={`/recipes?category=${cat}`}
            className="bg-[#FFF1E2] rounded-lg p-4 text-center card-hover border border-[#E8C9AA]"
          >
            <p className="text-2xl font-bold text-primary">{counts[cat]}</p>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">{isEnglish ? EN_CATEGORY_LABELS[cat] : CATEGORY_LABELS[cat]}</p>
          </Link>
        ))}
      </section>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8 leading-relaxed font-medium">
        <Heart className="w-4 h-4 text-primary" /> {tr('Jelöld meg a kedvenc ételeidet, hogy később könnyen megtaláld őket.', 'Mark favourite dishes so you can find them easily later.')}
      </div>

      {/* Feature cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {features.map(f => (
          <Link
            key={f.to}
            to={f.to}
            className={`border rounded-xl p-5 card-hover group ${f.card}`}
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${f.color}`}>
              <f.icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">{f.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

function ButtonLink({ label }: { label: string }) {
  return (
    <Link
      to="/planner"
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
    >
      {label} <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
