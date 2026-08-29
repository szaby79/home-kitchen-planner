import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, ChefHat, Minus, Plus, Heart, PlayCircle } from 'lucide-react';
import { useAppContext } from '@/components/Layout';
import { CATEGORY_LABELS, MEAL_TYPE_LABELS } from '@/types/recipe';
import { estimateRecipeCalories } from '@/lib/calorieCalculator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { EN_CATEGORY_LABELS, EN_MEAL_TYPE_LABELS } from '@/i18n/labels';
import RecipeNarrator from '@/components/RecipeNarrator';

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getRecipe, isFavorite, toggleFavorite } = useAppContext();
  const { isEnglish, tr } = useLanguage();
  const recipe = getRecipe(id || '');
  const [servings, setServings] = useState(recipe?.defaultServings || 4);

  if (!recipe) {
    return (
      <div className="page-container text-center py-16">
        <p className="text-muted-foreground">{tr('Recept nem található.', 'Recipe not found.')}</p>
        <Link to="/recipes" className="text-primary underline mt-2 inline-block">{tr('Vissza a receptekhez', 'Back to recipes')}</Link>
      </div>
    );
  }

  const multiplier = servings / recipe.defaultServings;
  const showsBreadingVideo = ['main-1', 'main-2', 'main-3'].includes(recipe.id);

  return (
    <div className="page-container max-w-3xl">
      <Link to="/recipes" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> {tr('Vissza', 'Back')}
      </Link>

      {/* Header */}
      <div className="bg-card border rounded-lg overflow-hidden mb-6">
        <div className="h-48 bg-secondary flex items-center justify-center">
          {recipe.imageUrl ? (
            <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
          ) : (
            <ChefHat className="w-16 h-16 text-muted-foreground/30" />
          )}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h1 className="section-title mb-2">{recipe.name}</h1>
            <Button
              variant="outline"
              size="icon"
              aria-label={isFavorite(recipe.id) ? tr('Eltávolítás a kedvencekből', 'Remove from favourites') : tr('Hozzáadás a kedvencekhez', 'Add to favourites')}
              onClick={() => toggleFavorite(recipe.id)}
              className="shrink-0 text-primary"
            >
              <Heart className={`w-5 h-5 ${isFavorite(recipe.id) ? 'fill-current' : ''}`} />
            </Button>
          </div>
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary">{isEnglish ? EN_CATEGORY_LABELS[recipe.category] : CATEGORY_LABELS[recipe.category]}</Badge>
            <Badge variant="outline">{tr('kb.', 'about')} {estimateRecipeCalories(recipe)} {tr('kcal/adag', 'kcal/serving')}</Badge>
            <Badge variant="outline">{isEnglish ? EN_MEAL_TYPE_LABELS[recipe.mealType] : MEAL_TYPE_LABELS[recipe.mealType]}</Badge>
          </div>

          {/* Servings adjuster */}
          <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3 w-fit">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{tr('Adag:', 'Servings:')}</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setServings(Math.max(1, servings - 1))}>
              <Minus className="w-3 h-3" />
            </Button>
            <span className="font-bold text-lg w-6 text-center">{servings}</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setServings(servings + 1)}>
              <Plus className="w-3 h-3" />
            </Button>
            <span className="text-sm text-muted-foreground">{tr('fő', 'people')}</span>
          </div>
        </div>
      </div>

      {recipe.id === 'soup-2' && <RecipeNarrator recipeName={recipe.name} description={recipe.description} />}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Ingredients */}
        <div className="bg-card border rounded-lg p-5">
          <h2 className="font-display text-lg font-semibold mb-3">{tr('Hozzávalók', 'Ingredients')}</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex justify-between text-sm py-1 border-b border-border/50 last:border-0">
                <span>{ing.name}</span>
                <span className="text-muted-foreground font-medium">
                  {Math.round(ing.quantity * multiplier * 10) / 10} {ing.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Description */}
        <div className="bg-card border rounded-lg p-5">
          <h2 className="font-display text-lg font-semibold mb-3">{tr('Elkészítés', 'Directions')}</h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{recipe.description}</p>
          {recipe.note && (
            <div className="mt-4 p-3 bg-warm/10 rounded-md text-sm">
              <strong>{tr('Megjegyzés:', 'Note:')}</strong> {recipe.note}
            </div>
          )}
        </div>
      </div>

      {showsBreadingVideo && (
        <section className="mt-6 overflow-hidden rounded-xl border bg-card">
          <div className="p-5 pb-3">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <PlayCircle className="h-5 w-5 text-primary" /> {tr('AI-próbavideó: panírozás', 'AI demo video: breading')}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{tr('Rövid vizuális segítség kezdőknek: liszt, tojás, zsemlemorzsa, majd sütés.', 'A short visual guide for beginners: flour, egg, breadcrumbs, then frying.')}</p>
          </div>
          <video
            controls
            playsInline
            preload="metadata"
            poster="/videos/panirozas-ai-storyboard.jpg"
            className="mx-auto mb-5 aspect-[9/16] max-h-[620px] w-auto max-w-full rounded-lg bg-black"
          >
            <source src="/videos/panirozas-ai-proba.mp4" type="video/mp4" />
            {tr('A böngésződ nem tudja lejátszani ezt a videót.', 'Your browser cannot play this video.')}
          </video>
        </section>
      )}
    </div>
  );
}
