import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/components/Layout';
import { WEEKDAYS, WeekDay } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, ChevronDown, Plus, Trash2, ShoppingCart, WalletCards } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { EN_WEEKDAYS } from '@/i18n/labels';
import SavedWeeksBar from '@/components/SavedWeeksBar';
import { localizeIngredient } from '@/i18n/recipeLocalization';
import HelpLink from '@/components/HelpLink';
import AppBackLink from '@/components/AppBackLink';

export default function ShoppingPage() {
  const { shoppingList, dailyShoppingList, extraItems, addExtraItem, removeExtraItem, removedItems, toggleRemoved, shoppingNotes, setShoppingNotes } = useAppContext();
  const { isEnglish, tr } = useLanguage();
  const [view, setView] = useState<'weekly' | 'daily'>('weekly');
  const [newItem, setNewItem] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newUnit, setNewUnit] = useState('');
  const [showPersonalTools, setShowPersonalTools] = useState(false);

  const handleAdd = () => {
    if (!newItem.trim()) return;
    addExtraItem({ name: newItem.trim(), quantity: Number(newQty) || 1, unit: newUnit || (isEnglish ? 'pc' : 'db'), checked: false, manual: true });
    setNewItem(''); setNewQty(''); setNewUnit('');
  };

  const allItems = [...shoppingList, ...extraItems];
  const hasItems = allItems.length > 0;
  const checkedCount = allItems.reduce((count, item) => count + Number(removedItems.has(`${item.name}-${item.unit}`)), 0);

  return (
    <div className="page-container max-w-3xl">
      <AppBackLink fallback="/planner/week" className="mb-4 inline-flex flex-wrap items-center gap-1 text-sm text-muted-foreground hover:text-foreground leading-relaxed font-medium">
        {tr('Vissza a menühöz', 'Back to menu')}
      </AppBackLink>
      <div className="flex items-center gap-1">
        <h1 className="section-title">{tr('Bevásárlólista', 'Shopping list')}</h1>
        <HelpLink section={view === 'weekly' ? 'weekly-shopping' : 'daily-shopping'} label={tr(`${view === 'weekly' ? 'Heti' : 'Napi'} bevásárlólista`, `${view === 'weekly' ? 'Weekly' : 'Daily'} shopping list`)} />
      </div>
      <SavedWeeksBar />
      <p className="mb-4 text-sm text-muted-foreground leading-relaxed font-medium">{tr('A lista csak az aktuális terv hozzávalóit és a saját tételeidet tartalmazza. Új terv vagy ételcsere után automatikusan frissül.', 'The list contains only ingredients for the active plan and your manually added items. It updates automatically after a new plan or a dish replacement.')}</p>

      {/* View toggle */}
      <div className="flex gap-2 mb-4">
        <Button variant={view === 'weekly' ? 'default' : 'outline'} size="sm" onClick={() => setView('weekly')}>
          {tr('Heti nézet', 'Weekly view')}
        </Button>
        <Button variant={view === 'daily' ? 'default' : 'outline'} size="sm" onClick={() => setView('daily')}>
          {tr('Napi nézet', 'Daily view')}
        </Button>
        <Button asChild variant="ghost" size="sm" className="ml-auto gap-1.5">
          <Link to="/budget"><WalletCards className="h-4 w-4" />{tr('Heti keret', 'Weekly budget')}</Link>
        </Button>
      </div>

      {!hasItems && (
        <div className="text-center py-12 text-muted-foreground">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="mb-4">{tr('A bevásárlólista üres. Állíts össze egy heti menüt!', 'Your shopping list is empty. Create a weekly menu first!')}</p>
          <Button type="button" variant="outline" onClick={() => setShowPersonalTools(true)}>{tr('Saját tétel hozzáadása', 'Add a personal item')}</Button>
        </div>
      )}

      {/* Weekly view */}
      {view === 'weekly' && hasItems && (
        <section aria-label={tr('Heti bevásárlólista', 'Weekly shopping list')}>
          <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold" aria-live="polite">
            <span>{tr(`${checkedCount}/${allItems.length} tétel kész`, `${checkedCount}/${allItems.length} items done`)}</span>
            <span className="text-muted-foreground">{tr(`${allItems.length - checkedCount} van hátra`, `${allItems.length - checkedCount} remaining`)}</span>
          </div>
          <div className="divide-y rounded-lg border bg-card">
            {allItems.map((item, i) => {
              const key = `${item.name}-${item.unit}`;
              const removed = removedItems.has(key);
              const display = item.manual ? { name: item.name, unit: item.unit } : localizeIngredient(item.name, item.unit, isEnglish);
              return (
                <div
                  key={`${key}-${i}`}
                  className={`flex min-h-12 items-center gap-3 px-4 py-3 transition-opacity ${removed ? 'opacity-40' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleRemoved(key)}
                    aria-label={removed ? tr(`${display.name} visszaállítása`, `Mark ${display.name} as not done`) : tr(`${display.name} kipipálása`, `Mark ${display.name} as done`)}
                    aria-pressed={removed}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border transition-colors ${
                      removed ? 'border-success bg-success' : 'border-input hover:border-primary'
                    }`}
                  >
                    {removed && <Check className="h-4 w-4 text-success-foreground" />}
                  </button>
                  <span className={`flex-1 text-sm ${removed ? 'line-through' : ''}`}>{display.name}</span>
                  <span className="text-sm font-medium leading-relaxed text-muted-foreground">
                    {Math.round(item.quantity * 10) / 10} {display.unit}
                  </span>
                  {item.manual && (
                    <button type="button" aria-label={tr(`${display.name} törlése`, `Delete ${display.name}`)} onClick={() => removeExtraItem(i - shoppingList.length)} className="text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Daily view */}
      {view === 'daily' && (
        <div className="space-y-4">
          {WEEKDAYS.map(day => {
            const items = dailyShoppingList[day];
            if (!items || items.length === 0) return null;
            return (
              <div key={day} className="bg-card border rounded-lg">
                <div className="px-4 py-3 border-b bg-secondary/30">
                  <h3 className="font-display font-semibold">{isEnglish ? EN_WEEKDAYS[day] : day}</h3>
                </div>
                <div className="divide-y">
                  {items.map((item, i) => {
                    const key = `${item.name}-${item.unit}`;
                    const removed = removedItems.has(key);
                    const display = localizeIngredient(item.name, item.unit, isEnglish);
                    return (
                      <div key={`${key}-${i}`} className={`flex items-center gap-3 px-4 py-2.5 ${removed ? 'opacity-40' : ''}`}>
                        <button
                          type="button"
                          onClick={() => toggleRemoved(key)}
                          aria-label={removed ? tr(`${display.name} visszaállítása`, `Mark ${display.name} as not done`) : tr(`${display.name} kipipálása`, `Mark ${display.name} as done`)}
                          aria-pressed={removed}
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border transition-colors ${
                            removed ? 'border-success bg-success' : 'border-input hover:border-primary'
                          }`}
                        >
                          {removed && <Check className="h-4 w-4 text-success-foreground" />}
                        </button>
                        <span className={`flex-1 text-sm ${removed ? 'line-through' : ''}`}>{display.name}</span>
                        <span className="text-sm text-muted-foreground leading-relaxed font-medium">{Math.round(item.quantity * 10) / 10} {display.unit}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <section className="mt-6 overflow-hidden rounded-lg border bg-card" data-testid="shopping-personal-tools">
        <button
          type="button"
          className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left"
          aria-expanded={showPersonalTools}
          aria-controls="shopping-personal-tools-content"
          onClick={() => setShowPersonalTools(open => !open)}
        >
          <Plus className="h-5 w-5 shrink-0 text-primary" />
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">{tr('Saját tételek és jegyzet', 'Personal items and notes')}</span>
            <span className="block text-sm font-medium text-muted-foreground">{
              extraItems.length || shoppingNotes.trim()
                ? tr(`${extraItems.length} saját tétel${shoppingNotes.trim() ? ' • jegyzet mentve' : ''}`, `${extraItems.length} personal items${shoppingNotes.trim() ? ' • note saved' : ''}`)
                : tr('Csak akkor nyisd meg, ha hozzáadnál valamit.', 'Open only when you want to add something.')
            }</span>
          </span>
          <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${showPersonalTools ? 'rotate-180' : ''}`} />
        </button>

        {showPersonalTools && <div id="shopping-personal-tools-content" className="space-y-5 border-t p-4">
          <div>
            <h3 className="mb-2 text-sm font-semibold">{tr('Egyéb tétel hozzáadása', 'Add another item')}</h3>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <Input aria-label={tr('Tétel neve', 'Item name')} placeholder={tr('Tétel neve', 'Item name')} value={newItem} onChange={e => setNewItem(e.target.value)} className="col-span-3" />
              <Input aria-label={tr('Mennyiség', 'Quantity')} inputMode="decimal" placeholder={tr('Mennyiség', 'Quantity')} value={newQty} onChange={e => setNewQty(e.target.value)} />
              <Input aria-label={tr('Egység', 'Unit')} placeholder={tr('Egység', 'Unit')} value={newUnit} onChange={e => setNewUnit(e.target.value)} />
              <Button type="button" onClick={handleAdd} size="icon" aria-label={tr('Tétel hozzáadása', 'Add item')}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="border-t pt-5">
            <label htmlFor="shopping-notes" className="mb-1 block text-sm font-semibold">{tr('Saját jegyzet', 'Personal notes')}</label>
            <p className="mb-3 text-sm font-medium leading-relaxed text-muted-foreground">{tr('Írj ide bármit, amit még nem szeretnél elfelejteni. A jegyzet automatikusan mentődik.', 'Write down anything else you do not want to forget. Notes save automatically.')}</p>
            <Textarea
              id="shopping-notes"
              value={shoppingNotes}
              onChange={event => setShoppingNotes(event.target.value)}
              placeholder={tr('Például:\nChips\nÜdítő\nKutyakaja', 'For example:\nChips\nSoft drinks\nDog food')}
              className="min-h-28 resize-y"
            />
          </div>
        </div>}
      </section>
    </div>
  );
}
