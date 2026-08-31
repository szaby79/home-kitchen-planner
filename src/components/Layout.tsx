import React, { createContext, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, BookOpen, CalendarDays, ShoppingCart, Settings, Menu, X, WalletCards } from 'lucide-react';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { usePlannerStore } from '@/hooks/usePlannerStore';
import { DayPlan, Recipe, WeekPlan, WeekDay, ShoppingItem, GenerationSelection, MenuPreferences, MenuProfile, WeeklyAutopilotSettings } from '@/types/recipe';
import { useFavorites } from '@/hooks/useFavorites';
import { useLanguage } from '@/i18n/LanguageContext';
import { localizeRecipe } from '@/i18n/recipeLocalization';

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
  generateRandomPlan: (selection: GenerationSelection, profile: MenuProfile, preferences: MenuPreferences, favoriteIds: string[], autopilot?: WeeklyAutopilotSettings) => boolean;
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

export default function Layout({ children }: { children: React.ReactNode }) {
  const recipeStore = useRecipeStore();
  const { language, isEnglish, setLanguage, tr } = useLanguage();
  const recipes = React.useMemo(() => recipeStore.recipes.map(recipe => localizeRecipe(recipe, isEnglish)), [recipeStore.recipes, isEnglish]);
  const plannerStore = usePlannerStore(recipes);
  const favoritesStore = useFavorites();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navItems = [
    { to: '/', icon: UtensilsCrossed, label: tr('Főoldal', 'Home') },
    { to: '/recipes', icon: BookOpen, label: tr('Receptek', 'Recipes') },
    { to: '/planner', icon: CalendarDays, label: tr('Heti terv', 'Weekly plan') },
    { to: '/shopping', icon: ShoppingCart, label: tr('Bevásárlólista', 'Shopping list') },
    { to: '/budget', icon: WalletCards, label: tr('Budget', 'Budget') },
    { to: '/admin', icon: Settings, label: tr('Admin', 'Admin') },
  ];

  const ctx: AppContextType = {
    ...recipeStore,
    ...plannerStore,
    ...favoritesStore,
    recipes,
    getRecipe: (id: string) => recipes.find(recipe => recipe.id === id) ?? null,
    getByCategory: (category: string) => recipes.filter(recipe => recipe.category === category),
  };

  return (
    <AppContext.Provider value={ctx}>
      <div className="min-h-screen flex flex-col">
        <header className="bg-[#FFF8EE]/95 backdrop-blur border-b border-[#E4C7AA] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
              <UtensilsCrossed className="w-6 h-6" />
              Plan & Pan
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <Link key={item.to} to={item.to} className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.to ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
                  <item.icon className="w-4 h-4" />{item.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto mr-1 flex rounded-md border bg-card p-0.5 lg:ml-2">
              <button type="button" onClick={() => setLanguage('hu')} className={`rounded px-2 py-1 text-xs font-bold ${language === 'hu' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`} aria-label="Magyar nyelv">HU</button>
              <button type="button" onClick={() => setLanguage('en')} className={`rounded px-2 py-1 text-xs font-bold ${language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`} aria-label="English language">EN</button>
            </div>
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {mobileOpen && (
            <nav className="lg:hidden border-t px-4 pb-3 pt-2 flex flex-col gap-1 animate-fade-in">
              {navItems.map(item => (
                <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.to ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}>
                  <item.icon className="w-4 h-4" />{item.label}
                </Link>
              ))}
            </nav>
          )}
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#E4C7AA] bg-[#FFF3E3] py-4 text-center text-sm text-muted-foreground leading-relaxed font-medium">
          Plan & Pan v1.26 © {new Date().getFullYear()} — {tr('Családi étel-autopilóta', 'Family food autopilot')}
        </footer>
      </div>
    </AppContext.Provider>
  );
}
