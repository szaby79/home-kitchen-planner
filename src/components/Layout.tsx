import React, { createContext, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, BookOpen, CalendarDays, ShoppingCart, Settings, Menu, X, WalletCards } from 'lucide-react';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { usePlannerStore } from '@/hooks/usePlannerStore';
import { DayPlan, Recipe, WeekPlan, WeekDay, ShoppingItem, GenerationSelection, MenuProfile } from '@/types/recipe';
import { useFavorites } from '@/hooks/useFavorites';

interface AppContextType {
  recipes: Recipe[];
  addRecipe: (r: Recipe) => void;
  updateRecipe: (r: Recipe) => void;
  deleteRecipe: (id: string) => void;
  getRecipe: (id: string) => Recipe | null;
  getByCategory: (c: string) => Recipe[];
  resetToDefault: () => void;
  weekPlan: WeekPlan;
  updateDay: (day: WeekDay, updates: Partial<DayPlan>) => void;
  clearPlan: () => void;
  generateRandomPlan: (selection: GenerationSelection, profile: MenuProfile) => void;
  shoppingList: ShoppingItem[];
  dailyShoppingList: Record<WeekDay, ShoppingItem[]>;
  extraItems: ShoppingItem[];
  addExtraItem: (item: ShoppingItem) => void;
  removeExtraItem: (index: number) => void;
  removedItems: Set<string>;
  toggleRemoved: (key: string) => void;
  shoppingNotes: string;
  setShoppingNotes: (notes: string) => void;
  favoriteIds: string[];
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);
export const useAppContext = () => useContext(AppContext)!;

const navItems = [
  { to: '/', icon: UtensilsCrossed, label: 'Főoldal' },
  { to: '/recipes', icon: BookOpen, label: 'Receptek' },
  { to: '/planner', icon: CalendarDays, label: 'Heti terv' },
  { to: '/shopping', icon: ShoppingCart, label: 'Bevásárlólista' },
  { to: '/budget', icon: WalletCards, label: 'Budget' },
  { to: '/admin', icon: Settings, label: 'Admin' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const recipeStore = useRecipeStore();
  const plannerStore = usePlannerStore(recipeStore.recipes);
  const favoritesStore = useFavorites();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const ctx: AppContextType = { ...recipeStore, ...plannerStore, ...favoritesStore };

  return (
    <AppContext.Provider value={ctx}>
      <div className="min-h-screen flex flex-col">
        {/* Top nav */}
        <header className="bg-[#FFF8EE]/95 backdrop-blur border-b border-[#E4C7AA] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
              <UtensilsCrossed className="w-6 h-6" />
              Plan & Pan
            </Link>
            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.to
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
            {/* Mobile toggle */}
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {/* Mobile nav */}
          {mobileOpen && (
            <nav className="lg:hidden border-t px-4 pb-3 pt-2 flex flex-col gap-1 animate-fade-in">
              {navItems.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.to
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-[#E4C7AA] bg-[#FFF3E3] py-4 text-center text-xs text-muted-foreground">
          Plan & Pan v1.10 © {new Date().getFullYear()} — Magyar családi ételtervező
        </footer>
      </div>
    </AppContext.Provider>
  );
}
