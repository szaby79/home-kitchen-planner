import { Link } from 'react-router-dom';
import { BookOpen, CalendarDays, ShoppingCart, Settings, ChefHat } from 'lucide-react';
import { useAppContext } from '@/components/Layout';
import { CATEGORY_LABELS, Category } from '@/types/recipe';

const features = [
  { to: '/recipes', icon: BookOpen, title: 'Receptek', desc: 'Böngéssz magyar receptek között', color: 'bg-primary/10 text-primary' },
  { to: '/planner', icon: CalendarDays, title: 'Heti terv', desc: 'Tervezd meg a heti menüt', color: 'bg-accent/10 text-accent' },
  { to: '/shopping', icon: ShoppingCart, title: 'Bevásárlólista', desc: 'Automatikus lista generálás', color: 'bg-warm/10 text-warm' },
  { to: '/admin', icon: Settings, title: 'Admin', desc: 'Receptek kezelése', color: 'bg-muted text-muted-foreground' },
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
      <section className="text-center py-12 sm:py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <ChefHat className="w-8 h-8 text-primary" />
        </div>
        <h1 className="section-title text-3xl sm:text-4xl mb-2">Plan & Pan</h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Magyar családi ételtervező és bevásárlólista alkalmazás
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
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
