import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, ChefHat, Minus, Plus } from 'lucide-react';
import { useAppContext } from '@/components/Layout';
import { CATEGORY_LABELS, MEAL_TYPE_LABELS } from '@/types/recipe';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getRecipe } = useAppContext();
  const recipe = getRecipe(id || '');
  const [servings, setServings] = useState(recipe?.defaultServings || 4);

  if (!recipe) {
    return (
      <div className="page-container text-center py-16">
        <p className="text-muted-foreground">Recept nem található.</p>
        <Link to="/recipes" className="text-primary underline mt-2 inline-block">Vissza a receptekhez</Link>
      </div>
    );
  }

  const multiplier = servings / recipe.defaultServings;

  return (
    <div className="page-container max-w-3xl">
      <Link to="/recipes" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Vissza
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
          <h1 className="section-title mb-2">{recipe.name}</h1>
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary">{CATEGORY_LABELS[recipe.category]}</Badge>
            <Badge variant="outline">{MEAL_TYPE_LABELS[recipe.mealType]}</Badge>
          </div>

          {/* Servings adjuster */}
          <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3 w-fit">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Adag:</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setServings(Math.max(1, servings - 1))}>
              <Minus className="w-3 h-3" />
            </Button>
            <span className="font-bold text-lg w-6 text-center">{servings}</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setServings(servings + 1)}>
              <Plus className="w-3 h-3" />
            </Button>
            <span className="text-sm text-muted-foreground">fő</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Ingredients */}
        <div className="bg-card border rounded-lg p-5">
          <h2 className="font-display text-lg font-semibold mb-3">Hozzávalók</h2>
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
          <h2 className="font-display text-lg font-semibold mb-3">Elkészítés</h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{recipe.description}</p>
          {recipe.note && (
            <div className="mt-4 p-3 bg-warm/10 rounded-md text-sm">
              <strong>Megjegyzés:</strong> {recipe.note}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
