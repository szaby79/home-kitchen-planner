import { useState } from 'react';
import { useAppContext } from '@/components/Layout';
import { WEEKDAYS, WeekDay } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Plus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { EN_WEEKDAYS } from '@/i18n/labels';

export default function ShoppingPage() {
  const { shoppingList, dailyShoppingList, extraItems, addExtraItem, removeExtraItem, removedItems, toggleRemoved, shoppingNotes, setShoppingNotes } = useAppContext();
  const { isEnglish, tr } = useLanguage();
  const [view, setView] = useState<'weekly' | 'daily'>('weekly');
  const [newItem, setNewItem] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newUnit, setNewUnit] = useState('');

  const handleAdd = () => {
    if (!newItem.trim()) return;
    addExtraItem({ name: newItem.trim(), quantity: Number(newQty) || 1, unit: newUnit || (isEnglish ? 'pc' : 'db'), checked: false, manual: true });
    setNewItem(''); setNewQty(''); setNewUnit('');
  };

  const allItems = [...shoppingList, ...extraItems];
  const hasItems = allItems.length > 0;

  return (
    <div className="page-container max-w-3xl">
      <Link to="/planner" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {tr('Vissza a menühöz', 'Back to menu')}
      </Link>
      <h1 className="section-title">{tr('Bevásárlólista', 'Shopping list')}</h1>
      <p className="mb-4 text-sm text-muted-foreground">{tr('A lista a menü és az ételcserék alapján automatikusan frissül.', 'The list updates automatically when the menu or a dish changes.')}</p>

      {/* View toggle */}
      <div className="flex gap-2 mb-4">
        <Button variant={view === 'weekly' ? 'default' : 'outline'} size="sm" onClick={() => setView('weekly')}>
          {tr('Heti nézet', 'Weekly view')}
        </Button>
        <Button variant={view === 'daily' ? 'default' : 'outline'} size="sm" onClick={() => setView('daily')}>
          {tr('Napi nézet', 'Daily view')}
        </Button>
      </div>

      {/* Add manual item */}
      <div className="bg-card border rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold mb-2">{tr('Egyéb tétel hozzáadása', 'Add another item')}</h3>
        <div className="flex gap-2 flex-wrap">
          <Input placeholder={tr('Tétel neve', 'Item name')} value={newItem} onChange={e => setNewItem(e.target.value)} className="flex-1 min-w-[150px]" />
          <Input placeholder={tr('Mennyiség', 'Quantity')} value={newQty} onChange={e => setNewQty(e.target.value)} className="w-20" />
          <Input placeholder={tr('Egység', 'Unit')} value={newUnit} onChange={e => setNewUnit(e.target.value)} className="w-20" />
          <Button onClick={handleAdd} size="icon"><Plus className="w-4 h-4" /></Button>
        </div>
      </div>

      {!hasItems && (
        <div className="text-center py-12 text-muted-foreground">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>{tr('A bevásárlólista üres. Állíts össze egy heti menüt!', 'Your shopping list is empty. Create a weekly menu first!')}</p>
        </div>
      )}

      {/* Weekly view */}
      {view === 'weekly' && hasItems && (
        <div className="bg-card border rounded-lg divide-y">
          {allItems.map((item, i) => {
            const key = `${item.name}-${item.unit}`;
            const removed = removedItems.has(key);
            return (
              <div
                key={`${key}-${i}`}
                className={`flex items-center gap-3 px-4 py-3 transition-opacity ${removed ? 'opacity-40' : ''}`}
              >
                <button
                  onClick={() => toggleRemoved(key)}
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    removed ? 'bg-success border-success' : 'border-input hover:border-primary'
                  }`}
                >
                  {removed && <Check className="w-3 h-3 text-success-foreground" />}
                </button>
                <span className={`flex-1 text-sm ${removed ? 'line-through' : ''}`}>{item.name}</span>
                <span className="text-sm text-muted-foreground font-medium">
                  {Math.round(item.quantity * 10) / 10} {item.unit}
                </span>
                {item.manual && (
                  <button onClick={() => removeExtraItem(i - shoppingList.length)} className="text-destructive hover:text-destructive/80">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
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
                    return (
                      <div key={`${key}-${i}`} className={`flex items-center gap-3 px-4 py-2.5 ${removed ? 'opacity-40' : ''}`}>
                        <button
                          onClick={() => toggleRemoved(key)}
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            removed ? 'bg-success border-success' : 'border-input hover:border-primary'
                          }`}
                        >
                          {removed && <Check className="w-3 h-3 text-success-foreground" />}
                        </button>
                        <span className={`flex-1 text-sm ${removed ? 'line-through' : ''}`}>{item.name}</span>
                        <span className="text-sm text-muted-foreground">{Math.round(item.quantity * 10) / 10} {item.unit}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 rounded-lg border bg-card p-4">
        <label htmlFor="shopping-notes" className="mb-1 block text-sm font-semibold">{tr('Saját jegyzet', 'Personal notes')}</label>
        <p className="mb-3 text-xs text-muted-foreground">{tr('Írj ide bármit, amit még nem szeretnél elfelejteni. A jegyzet automatikusan mentődik.', 'Write down anything else you do not want to forget. Notes save automatically.')}</p>
        <Textarea
          id="shopping-notes"
          value={shoppingNotes}
          onChange={event => setShoppingNotes(event.target.value)}
          placeholder={tr('Például:\nChips\nÜdítő\nKutyakaja', 'For example:\nChips\nSoft drinks\nDog food')}
          className="min-h-36 resize-y"
        />
      </div>
    </div>
  );
}
