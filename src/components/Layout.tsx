import React, { createContext, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, BookOpen, CalendarDays, ShoppingCart, Menu, X, UserRound, CircleHelp, UsersRound, WalletCards, Settings } from 'lucide-react';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { usePlannerStore, WeeklyPlanSyncStatus } from '@/hooks/usePlannerStore';
import { DayPlan, Recipe, WeekPlan, WeekDay, ShoppingItem, GenerationSelection, MenuPreferences, MenuProfile, WeeklyAutopilotSettings } from '@/types/recipe';
import { useFavorites } from '@/hooks/useFavorites';
import { useLanguage } from '@/i18n/LanguageContext';
import { localizeRecipe } from '@/i18n/recipeLocalization';
import { PRIVACY_NOTICE_VERSION, useAuth } from '@/auth/AuthContext';
import AuthDialog from '@/components/AuthDialog';
import { hasPlanMeals, type StoredWeeklyPlan } from '@/lib/weeklyPlanValidation';
import packageMetadata from '../../package.json';

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
  const hasWeeklyPlan = hasPlanMeals(plannerStore.weekPlan);
  const weeklyPlanPath = hasWeeklyPlan ? '/planner/week' : '/planner';

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
    { to: weeklyPlanPath, icon: CalendarDays, label: tr('Heti terv', 'Weekly plan') },
    { to: '/shopping', icon: ShoppingCart, label: tr('Bevásárlólista', 'Shopping list') },
  ];
  const secondaryNavItems = [
    { to: '/family-settings', icon: UsersRound, label: tr('Családi beállítások', 'Family preferences') },
    { to: '/budget', icon: WalletCards, label: tr('Budget', 'Budget') },
    { to: '/help', icon: CircleHelp, label: tr('Súgó', 'Help') },
    { to: '/admin', icon: Settings, label: tr('Receptek kezelése', 'Manage recipes') },
  ];
  const isPrimaryActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/recipes') return location.pathname.startsWith('/recipes');
    if (path === weeklyPlanPath) return location.pathname.startsWith('/planner');
    return location.pathname === path;
  };

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
      <div className="min-h-screen flex flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <header className="bg-[#FFF8EE]/95 backdrop-blur border-b border-[#E4C7AA] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
            <Link to="/" className="flex min-w-0 items-center gap-1 font-display text-lg font-bold text-primary sm:gap-2 sm:text-xl">
              <UtensilsCrossed className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
              Plan & Pan
            </Link>
            <nav aria-label={tr('Elsődleges navigáció', 'Primary navigation')} className="hidden lg:flex items-center gap-1">
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
            <Link
              to="/help"
              aria-label={tr('Súgó megnyitása', 'Open Help Centre')}
              title={tr('Súgó', 'Help')}
              className={`mr-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:inline-flex ${location.pathname === '/help' ? 'bg-primary text-primary-foreground' : 'bg-card text-primary hover:bg-secondary'}`}
            >
              <CircleHelp className="h-5 w-5" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => user ? navigate('/account') : setAuthOpen(true)}
              className="mr-1 inline-flex h-10 w-10 shrink-0 items-center justify-center gap-1.5 rounded-md border bg-card text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:h-auto lg:w-auto lg:max-w-[9rem] lg:px-2.5 lg:py-1.5"
              aria-label={user ? tr('Fiók megnyitása', 'Open account') : tr('Bejelentkezés e-mail-címmel', 'Sign in with Email')}
            >
              <UserRound className="h-5 w-5 shrink-0 lg:h-4 lg:w-4" />
              <span className="hidden max-w-[6rem] truncate lg:inline">
                {authLoading ? tr('Betöltés…', 'Loading…') : user?.email ?? tr('Belépés', 'Sign in')}
              </span>
            </button>
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? tr('Menü bezárása', 'Close menu') : tr('Menü megnyitása', 'Open menu')} aria-expanded={mobileOpen}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {mobileOpen && (
            <nav aria-label={tr('További lehetőségek', 'More options')} className="lg:hidden border-t px-4 pb-3 pt-2 flex flex-col gap-1 animate-fade-in">
              {secondaryNavItems.map(item => (
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
          Plan & Pan v{packageMetadata.version} © {new Date().getFullYear()} — {tr('Családi étel-autopilóta', 'Family food autopilot')}
        </footer>
        <nav aria-label={tr('Mobil főmenü', 'Mobile main menu')} className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-[#E4C7AA] bg-[#FFF8EE]/95 px-1 pt-1.5 pb-[max(env(safe-area-inset-bottom),0.35rem)] shadow-[0_-4px_18px_rgba(66,48,38,0.08)] backdrop-blur lg:hidden">
          {navItems.map(item => {
            const active = isPrimaryActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-14 min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-1 text-[10px] font-semibold leading-tight transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                <span className="max-w-full truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </AppContext.Provider>
  );
}
