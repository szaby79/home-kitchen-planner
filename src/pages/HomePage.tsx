import { Link } from 'react-router-dom';
import { BookOpen, CalendarDays, ShoppingCart, WalletCards, ChefHat, ArrowRight, Heart } from 'lucide-react';
import { useAppContext } from '@/components/Layout';
import { CATEGORY_LABELS, Category } from '@/types/recipe';

const features = [
  { to: '/planner', icon: CalendarDays, title: 'Heti menütervező', desc: 'Készíts ebéd- és vacsoratervet néhány kattintással', color: 'bg-primary/10 text-primary' },
  { to: '/shopping', icon: ShoppingCart, title: 'Bevásárlólista', desc: 'A menü alapján automatikusan összeállítva', color: 'bg-accent/15 text-accent' },
  { to: '/recipes', icon: BookOpen, title: 'Elkészítési segítség', desc: 'Kezdőknek is érthető, lépésről lépésre', color: 'bg-warm/15 text-warm-foreground' },
  { to: '/budget', icon: WalletCards, title: 'Budget', desc: 'Heti étkezési keret tervezése — hamarosan', color: 'bg-secondary text-foreground' },
];

export default function HomePage() {
  const { recipes } = useAppContext();

  const counts: Record<Category, number> = {
    soup: recipes.filter(r => r.category === 'soup').length,
    main: recipes.filter(r => r.category === 'main').length,
    dessert: recipes.filter(r => r.category === 'dessert').length,
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="relative overflow-hidden text-center py-12 sm:py-16 rounded-3xl bg-card border px-5 mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <ChefHat className="w-8 h-8 text-primary" />
        </div>
        <h1 className="section-title text-3xl sm:text-4xl mb-2">Plan & Pan</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
          A Plan & Pan megtervezi a család heti ebédjeit és vacsoráit, segít az ételek elkészítésében, majd egy közös bevásárlólistát készít. Nem csupán receptgyűjtemény: leveszi a heti menütervezés terhét a válladról.
        </p>
        <ButtonLink />
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto mb-10">
        {(Object.keys(CATEGORY_LABELS) as Category[]).map(cat => (
          <Link
            key={cat}
            to={`/recipes?category=${cat}`}
            className="bg-card rounded-lg p-4 text-center card-hover border"
          >
            <p className="text-2xl font-bold text-primary">{counts[cat]}</p>
            <p className="text-sm text-muted-foreground">{CATEGORY_LABELS[cat]}</p>
          </Link>
        ))}
      </section>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
        <Heart className="w-4 h-4 text-primary" /> Jelöld meg a kedvenc ételeidet, hogy később könnyen megtaláld őket.
      </div>

      {/* Feature cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {features.map(f => (
          <Link
            key={f.to}
            to={f.to}
            className="bg-card border rounded-lg p-5 card-hover group"
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${f.color}`}>
              <f.icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

function ButtonLink() {
  return (
    <Link
      to="/planner"
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
    >
      Heti menü készítése <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
