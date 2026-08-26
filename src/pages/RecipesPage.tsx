import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChefHat } from 'lucide-react';
import { useAppContext } from '@/components/Layout';
import { Category, CATEGORY_LABELS, MEAL_TYPE_LABELS } from '@/types/recipe';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { sortRecipesByCategory } from '@/lib/recipeSort';

export default function RecipesPage() {
  const { recipes } = useAppContext();
  const [params, setParams] = useSearchParams();
  const activeCategory = (params.get('category') as Category) || 'all';
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = recipes;
    if (activeCategory !== 'all') list = list.filter(r => r.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q));
    }
    return sortRecipesByCategory(list);
  }, [recipes, activeCategory, search]);

  const categories: { value: string; label: string }[] = [
    { value: 'all', label: 'Összes' },
    ...Object.entries(CATEGORY_LABELS).map(([k, v]) => ({ value: k, label: v })),
  ];

  return (
    <div className="page-container">
      <h1 className="section-title">Receptek</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c.value}
              onClick={() => setParams(c.value === 'all' ? {} : { category: c.value })}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeCategory === c.value || (c.value === 'all' && activeCategory === 'all')
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Recept keresése..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(recipe => (
          <Link
            key={recipe.id}
            to={`/recipes/${recipe.id}`}
            className="bg-card border rounded-lg overflow-hidden card-hover group"
          >
            <div className="h-32 bg-secondary flex items-center justify-center">
              {recipe.imageUrl ? (
                <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
              ) : (
                <ChefHat className="w-10 h-10 text-muted-foreground/40" />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{recipe.name}</h3>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">{CATEGORY_LABELS[recipe.category]}</Badge>
                <Badge variant="outline" className="text-xs">{MEAL_TYPE_LABELS[recipe.mealType]}</Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">Nincs találat.</p>
      )}
    </div>
  );
}
