import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChefHat, Heart, Zap } from 'lucide-react';
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

  const categories: { value: string; label: string }[] = [
    { value: 'all', label: tr('Összes', 'All') },
    ...Object.entries(isEnglish ? EN_CATEGORY_LABELS : CATEGORY_LABELS).map(([k, v]) => ({ value: k, label: v })),
  ];

  return (
    <div className="page-container">
      <h1 className="section-title">{tr('Receptek', 'Recipes')}</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
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
        <button
          onClick={toggleQuick}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium border transition-colors ${
            quickOnly ? 'bg-accent text-accent-foreground border-accent' : 'bg-card hover:bg-secondary'
          }`}
        >
          <Zap className={`w-4 h-4 ${quickOnly ? 'fill-current' : ''}`} /> {tr('Gyors ételek', 'Quick meals')}
        </button>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={tr('Recept keresése...', 'Search recipes...')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <button
          onClick={() => setFavoritesOnly(current => !current)}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium border transition-colors ${
            favoritesOnly ? 'bg-primary text-primary-foreground border-primary' : 'bg-card hover:bg-secondary'
          }`}
        >
          <Heart className={`w-4 h-4 ${favoritesOnly ? 'fill-current' : ''}`} /> {tr('Kedvencek', 'Favourites')}
        </button>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-medium">{tr('Sorrend:', 'Sort:')}</span>
        {([['category', tr('Kategóriák', 'Categories')], ['abc', 'ABC'], ['random', tr('Véletlenszerű', 'Random')]] as const).map(([mode, label]) => (
          <button key={mode} onClick={() => { setSortMode(mode); if (mode === 'random') setRandomSeed(seed => seed + 1); }} className={`rounded-md border px-3 py-1.5 font-medium ${sortMode === mode ? 'border-primary bg-primary text-primary-foreground' : 'bg-card'}`}>{label}</button>
        ))}
      </div>

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
                <p className="mt-2 text-xs text-muted-foreground">{tr('kb.', 'about')} {estimateRecipeCalories(recipe)} {tr('kcal/adag', 'kcal/serving')}</p>
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
