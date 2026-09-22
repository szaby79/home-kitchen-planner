import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChefHat, Heart, Zap, Settings, SlidersHorizontal, ChevronDown, RotateCcw } from 'lucide-react';
import { useAppContext } from '@/components/Layout';
import { Category, CATEGORY_LABELS, MEAL_TYPE_LABELS } from '@/types/recipe';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { sortRecipesByCategory } from '@/lib/recipeSort';
import { isQuickRecipe } from '@/lib/recipeScheduling';
import { estimateRecipeCalories } from '@/lib/calorieCalculator';
import { useLanguage } from '@/i18n/LanguageContext';
import { EN_CATEGORY_LABELS, EN_MEAL_TYPE_LABELS } from '@/i18n/labels';

export default function RecipesPage() {
  const { recipes, isFavorite, toggleFavorite } = useAppContext();
  const { isEnglish, tr } = useLanguage();
  const [params, setParams] = useSearchParams();
  const activeCategory = (params.get('category') as Category) || 'all';
  const [search, setSearch] = useState('');
  const quickOnly = params.get('quick') === '1';
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortMode, setSortMode] = useState<'category' | 'abc' | 'random'>('category');
  const [randomSeed, setRandomSeed] = useState(1);
  const activeAdvancedFilters = Number(quickOnly) + Number(favoritesOnly) + Number(sortMode !== 'category');

  const categoryCounts = useMemo(() => recipes.reduce<Partial<Record<Category, number>>>((counts, recipe) => {
    counts[recipe.category] = (counts[recipe.category] ?? 0) + 1;
    return counts;
  }, {}), [recipes]);

  const filtered = useMemo(() => {
    let list = recipes;
    if (activeCategory !== 'all') list = list.filter(r => r.category === activeCategory);
    if (quickOnly) list = list.filter(isQuickRecipe);
    if (favoritesOnly) list = list.filter(r => isFavorite(r.id));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q));
    }
    if (sortMode === 'abc') return [...list].sort((a, b) => a.name.localeCompare(b.name, 'hu'));
    if (sortMode === 'random') return [...list].sort((a, b) => hash(`${a.id}-${randomSeed}`) - hash(`${b.id}-${randomSeed}`));
    return sortRecipesByCategory(list);
  }, [recipes, activeCategory, search, favoritesOnly, quickOnly, isFavorite, sortMode, randomSeed]);

  const setCategory = (category: string) => {
    const next = new URLSearchParams(params);
    next.delete('quick');
    if (category === 'all') next.delete('category');
    else next.set('category', category);
    setParams(next);
  };

  const toggleQuick = () => {
    const next = new URLSearchParams(params);
    if (quickOnly) next.delete('quick');
    else {
      next.delete('category');
      next.set('quick', '1');
    }
    setParams(next);
  };

  const resetAdvancedFilters = () => {
    const next = new URLSearchParams(params);
    next.delete('quick');
    setParams(next);
    setFavoritesOnly(false);
    setSortMode('category');
  };

  const categories: { value: string; label: string; count: number }[] = [
    { value: 'all', label: tr('Összes', 'All'), count: recipes.length },
    ...Object.entries(isEnglish ? EN_CATEGORY_LABELS : CATEGORY_LABELS).map(([k, v]) => ({
      value: k,
      label: v,
      count: categoryCounts[k as Category] ?? 0,
    })),
  ];

  return (
    <div className="page-container">
      <h1 className="section-title mb-4">{tr('Receptek', 'Recipes')}</h1>

      <div className="mb-4 space-y-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={tr('Recept keresése...', 'Search recipes...')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="group" aria-label={tr('Receptkategóriák', 'Recipe categories')}>
          <div className="flex w-max gap-2">
            {categories.map(c => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                aria-label={tr(`${c.label}: ${c.count} recept`, `${c.label}: ${c.count} recipes`)}
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeCategory === c.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <span>{c.label}</span>
                <span
                  aria-hidden="true"
                  className={`rounded-full px-1.5 py-0.5 text-xs tabular-nums ${
                    activeCategory === c.value ? 'bg-primary-foreground/20' : 'bg-background/80'
                  }`}
                >
                  {c.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <details className="group mb-5 rounded-xl border bg-card">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-semibold marker:hidden">
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            {tr('Szűrés és rendezés', 'Filter and sort')}
            {activeAdvancedFilters > 0 && (
              <Badge className="text-xs">{tr(`${activeAdvancedFilters} aktív`, `${activeAdvancedFilters} active`)}</Badge>
            )}
          </span>
          <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="space-y-5 border-t p-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={toggleQuick}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                quickOnly ? 'border-accent bg-accent text-accent-foreground' : 'bg-card hover:bg-secondary'
              }`}
            >
              <Zap className={`h-4 w-4 ${quickOnly ? 'fill-current' : ''}`} /> {tr('Gyors ételek', 'Quick meals')}
            </button>
            <button
              type="button"
              onClick={() => setFavoritesOnly(current => !current)}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                favoritesOnly ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-secondary'
              }`}
            >
              <Heart className={`h-4 w-4 ${favoritesOnly ? 'fill-current' : ''}`} /> {tr('Kedvencek', 'Favourites')}
            </button>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">{tr('Sorrend', 'Sort')}</p>
            <div className="flex flex-wrap gap-2">
              {([['category', tr('Kategóriák', 'Categories')], ['abc', 'ABC'], ['random', tr('Véletlenszerű', 'Random')]] as const).map(([mode, label]) => (
                <button type="button" key={mode} onClick={() => { setSortMode(mode); if (mode === 'random') setRandomSeed(seed => seed + 1); }} className={`min-h-10 rounded-md border px-3 py-1.5 text-sm font-medium ${sortMode === mode ? 'border-primary bg-primary text-primary-foreground' : 'bg-card'}`}>{label}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t pt-3 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/admin" className="flex min-h-10 items-center gap-2 rounded-md px-2 text-sm font-semibold text-primary hover:bg-secondary">
              <Settings className="h-4 w-4" />{tr('Receptek kezelése', 'Manage recipes')}
            </Link>
            {activeAdvancedFilters > 0 && (
              <button type="button" onClick={resetAdvancedFilters} className="inline-flex min-h-10 items-center gap-2 rounded-md px-2 text-sm font-semibold text-muted-foreground hover:bg-secondary">
                <RotateCcw className="h-4 w-4" />{tr('Szűrők törlése', 'Clear filters')}
              </button>
            )}
          </div>
        </div>
      </details>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(recipe => (
          <div key={recipe.id} className="relative bg-card border rounded-lg overflow-hidden card-hover group">
            <button
              type="button"
              aria-label={isFavorite(recipe.id) ? tr(`${recipe.name} eltávolítása a kedvencekből`, `Remove ${recipe.name} from favourites`) : tr(`${recipe.name} hozzáadása a kedvencekhez`, `Add ${recipe.name} to favourites`)}
              onClick={() => toggleFavorite(recipe.id)}
              className="absolute top-2 right-2 z-10 w-9 h-9 rounded-full bg-background/90 border shadow-sm flex items-center justify-center text-primary hover:scale-105 transition"
            >
              <Heart className={`w-5 h-5 ${isFavorite(recipe.id) ? 'fill-current' : ''}`} />
            </button>
            <Link to={`/recipes/${recipe.id}`} className="block">
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
                  <Badge variant="secondary" className="text-xs">{isEnglish ? EN_CATEGORY_LABELS[recipe.category] : CATEGORY_LABELS[recipe.category]}</Badge>
                  <Badge variant="outline" className="text-xs">{isEnglish ? EN_MEAL_TYPE_LABELS[recipe.mealType] : MEAL_TYPE_LABELS[recipe.mealType]}</Badge>
                  {isQuickRecipe(recipe) && <Badge className="text-xs bg-accent text-accent-foreground">{tr('Gyors', 'Quick')}</Badge>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed font-medium">{tr('kb.', 'about')} {estimateRecipeCalories(recipe)} {tr('kcal/adag', 'kcal/serving')}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">{tr('Nincs találat.', 'No recipes found.')}</p>
      )}
    </div>
  );
}

function hash(value: string) {
  return [...value].reduce((total, char) => ((total << 5) - total + char.charCodeAt(0)) | 0, 0);
}
