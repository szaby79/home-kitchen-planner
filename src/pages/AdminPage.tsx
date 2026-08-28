import { useState } from 'react';
import { useAppContext } from '@/components/Layout';
import { Recipe, Category, MealType, Ingredient, CATEGORY_LABELS, MEAL_TYPE_LABELS } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { EN_CATEGORY_LABELS, EN_MEAL_TYPE_LABELS } from '@/i18n/labels';

export default function AdminPage() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe, resetToDefault } = useAppContext();
  const { isEnglish, tr } = useLanguage();
  const [editing, setEditing] = useState<Recipe | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [filter, setFilter] = useState('');

  const startNew = () => {
    setIsNew(true);
    setEditing({
      id: `recipe-${Date.now()}`,
      name: '',
      category: 'main',
      mealType: 'both',
      ingredients: [{ name: '', quantity: 0, unit: '' }],
      description: '',
      defaultServings: 4,
      note: '',
      imageUrl: '',
    });
  };

  const startEdit = (recipe: Recipe) => {
    setIsNew(false);
    setEditing({ ...recipe, ingredients: recipe.ingredients.map(i => ({ ...i })) });
  };

  const handleSave = () => {
    if (!editing || !editing.name.trim()) return;
    if (isNew) addRecipe(editing);
    else updateRecipe(editing);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm(tr('Biztosan törlöd ezt a receptet?', 'Are you sure you want to delete this recipe?'))) deleteRecipe(id);
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    if (!editing) return;
    const ings = [...editing.ingredients];
    ings[index] = { ...ings[index], [field]: field === 'quantity' ? Number(value) || 0 : value };
    setEditing({ ...editing, ingredients: ings });
  };

  const addIngredient = () => {
    if (!editing) return;
    setEditing({ ...editing, ingredients: [...editing.ingredients, { name: '', quantity: 0, unit: '' }] });
  };

  const removeIngredient = (index: number) => {
    if (!editing) return;
    setEditing({ ...editing, ingredients: editing.ingredients.filter((_, i) => i !== index) });
  };

  const filtered = filter ? recipes.filter(r => r.name.toLowerCase().includes(filter.toLowerCase())) : recipes;

  // Editor
  if (editing) {
    return (
      <div className="page-container max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="section-title">{isNew ? tr('Új recept', 'New recipe') : tr('Recept szerkesztése', 'Edit recipe')}</h1>
          <Button variant="ghost" onClick={() => setEditing(null)}><X className="w-4 h-4" /></Button>
        </div>
        <div className="space-y-4 bg-card border rounded-lg p-5">
          <div>
            <label className="text-sm font-medium mb-1 block">{tr('Név', 'Name')}</label>
            <Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">{tr('Kategória', 'Category')}</label>
              <select
                value={editing.category}
                onChange={e => setEditing({ ...editing, category: e.target.value as Category })}
                className="w-full bg-background border rounded-md px-3 py-2 text-sm"
              >
                {Object.entries(isEnglish ? EN_CATEGORY_LABELS : CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{tr('Étkezés típus', 'Meal type')}</label>
              <select
                value={editing.mealType}
                onChange={e => setEditing({ ...editing, mealType: e.target.value as MealType })}
                className="w-full bg-background border rounded-md px-3 py-2 text-sm"
              >
                {Object.entries(isEnglish ? EN_MEAL_TYPE_LABELS : MEAL_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">{tr('Alapértelmezett adag (fő)', 'Default servings')}</label>
            <Input type="number" value={editing.defaultServings} onChange={e => setEditing({ ...editing, defaultServings: Number(e.target.value) || 4 })} className="w-24" />
          </div>

          {/* Ingredients */}
          <div>
            <label className="text-sm font-medium mb-2 block">{tr('Hozzávalók', 'Ingredients')}</label>
            <div className="space-y-2">
              {editing.ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input placeholder={tr('Név', 'Name')} value={ing.name} onChange={e => updateIngredient(i, 'name', e.target.value)} className="flex-1" />
                  <Input placeholder={tr('Menny.', 'Qty.')} value={ing.quantity || ''} onChange={e => updateIngredient(i, 'quantity', e.target.value)} className="w-20" />
                  <Input placeholder={tr('Egység', 'Unit')} value={ing.unit} onChange={e => updateIngredient(i, 'unit', e.target.value)} className="w-20" />
                  <Button variant="ghost" size="icon" onClick={() => removeIngredient(i)} className="shrink-0"><Trash2 className="w-3 h-3" /></Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={addIngredient} className="mt-2 gap-1">
              <Plus className="w-3 h-3" /> {tr('Hozzáadás', 'Add')}
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">{tr('Leírás / Elkészítés', 'Description / Directions')}</label>
            <Textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={4} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">{tr('Megjegyzés', 'Note')}</label>
            <Input value={editing.note} onChange={e => setEditing({ ...editing, note: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">{tr('Kép URL', 'Image URL')}</label>
            <Input value={editing.imageUrl} onChange={e => setEditing({ ...editing, imageUrl: e.target.value })} placeholder="https://..." />
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} className="gap-1"><Save className="w-4 h-4" /> {tr('Mentés', 'Save')}</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>{tr('Mégse', 'Cancel')}</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title">{tr('Receptek kezelése', 'Manage recipes')}</h1>
        <div className="flex gap-2">
          <Button onClick={startNew} className="gap-1"><Plus className="w-4 h-4" /> {tr('Új recept', 'New recipe')}</Button>
          <Button variant="outline" onClick={() => confirm(tr('Alapértelmezett receptek visszaállítása?', 'Restore default recipes?')) && resetToDefault()}>
            {tr('Visszaállítás', 'Restore')}
          </Button>
        </div>
      </div>

      <Input placeholder={tr('Keresés...', 'Search...')} value={filter} onChange={e => setFilter(e.target.value)} className="mb-4" />

      <div className="bg-card border rounded-lg divide-y">
        {filtered.map(recipe => (
          <div key={recipe.id} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/30 transition-colors">
            <div>
              <span className="font-medium text-sm">{recipe.name}</span>
              <span className="text-xs text-muted-foreground ml-2">{isEnglish ? EN_CATEGORY_LABELS[recipe.category] : CATEGORY_LABELS[recipe.category]}</span>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => startEdit(recipe)}><Pencil className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(recipe.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
