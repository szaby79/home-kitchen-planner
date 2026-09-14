import React, { createContext, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, BookOpen, CalendarDays, ShoppingCart, Settings, Menu, X, WalletCards, UserRound, CircleHelp } from 'lucide-react';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { usePlannerStore, WeeklyPlanSyncStatus } from '@/hooks/usePlannerStore';
import { DayPlan, Recipe, WeekPlan, WeekDay, ShoppingItem, GenerationSelection, MenuPreferences, MenuProfile, WeeklyAutopilotSettings } from '@/types/recipe';
import { useFavorites } from '@/hooks/useFavorites';
import { useLanguage } from '@/i18n/LanguageContext';
import { localizeRecipe } from '@/i18n/recipeLocalization';
import { PRIVACY_NOTICE_VERSION, useAuth } from '@/auth/AuthContext';
import AuthDialog from '@/components/AuthDialog';
import type { StoredWeeklyPlan } from '@/lib/weeklyPlanValidation';

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
  plannerReady: boolean;
  cloudSyncEnabled: boolean;
  cloudSyncStatus: WeeklyPlanSyncStatus;
  savedWeeks: StoredWeeklyPlan[];
  displayedWeekStart: string;
  currentWeekStart: string;
  openSavedWeek: (weekStart: string) => boolean;
  returnToCurrentWeek: () => boolean;
  canSwitchWeeks: boolean;
  missingRecipeIds: string[];
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
  const { user, profile, loading: authLoading } = useAuth();
  const plannerStore = usePlannerStore(recipeStore.recipes, { userId: user?.id ?? null, authLoading });
  const favoritesStore = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [authOpen, setAuthOpen] = React.useState(() => new URLSearchParams(window.location.hash.slice(1)).has('error'));

  React.useEffect(() => {
    const wantsSignIn = new URLSearchParams(location.search).has('signin');
    if (!user && wantsSignIn) setAuthOpen(true);
  }, [location.search, user]);

  React.useEffect(() => {
    if (user && profile && profile.privacy_notice_version !== PRIVACY_NOTICE_VERSION) setAuthOpen(true);
  }, [profile, user]);
  const navItems = [
    { to: '/', icon: UtensilsCrossed, label: tr('Főoldal', 'Home') },
    { to: '/recipes', icon: BookOpen, label: tr('Receptek', 'Recipes') },
    { to: '/planner', icon: CalendarDays, label: tr('Heti terv', 'Weekly plan') },
    { to: '/shopping', icon: ShoppingCart, label: tr('Bevásárlólista', 'Shopping list') },
    { to: '/budget', icon: WalletCards, label: tr('Budget', 'Budget') },
    { to: '/help', icon: CircleHelp, label: tr('Súgó', 'Help') },
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
            <button
              type="button"
              onClick={() => user ? navigate('/account') : setAuthOpen(true)}
              className="mr-1 inline-flex max-w-[9rem] items-center gap-1.5 rounded-md border bg-card px-2.5 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              aria-label={user ? tr('Fiók megnyitása', 'Open account') : tr('Bejelentkezés e-mail-címmel', 'Sign in with Email')}
            >
              <UserRound className="h-4 w-4 shrink-0" />
              <span className="hidden max-w-[6rem] truncate sm:inline">
                {authLoading ? tr('Betöltés…', 'Loading…') : user?.email ?? tr('Belépés', 'Sign in')}
              </span>
            </button>
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? tr('Menü bezárása', 'Close menu') : tr('Menü megnyitása', 'Open menu')} aria-expanded={mobileOpen}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {mobileOpen && (
            <nav className="lg:hidden border-t px-4 pb-3 pt-2 flex flex-col gap-1 animate-fade-in">
              {navItems.map(item => (
                <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={`flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${location.pathname === item.to ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}>
                  <item.icon className="w-4 h-4" />{item.label}
                </Link>
              ))}
            </nav>
          )}
        </header>
        <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#E4C7AA] bg-[#FFF3E3] py-4 text-center text-sm text-muted-foreground leading-relaxed font-medium">
          Plan & Pan v1.36.0 © {new Date().getFullYear()} — {tr('Családi étel-autopilóta', 'Family food autopilot')}
        </footer>
      </div>
    </AppContext.Provider>
  );
}
