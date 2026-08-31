export type Category = 'soup' | 'main' | 'side' | 'pickle' | 'salad' | 'dessert';
export type MealType = 'lunch' | 'dinner' | 'both';

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export type CostCategory = '$' | '$$' | '$$$';
export type RecipeDifficulty = 'easy' | 'medium' | 'advanced';

export interface Recipe {
  id: string;
  name: string;
  category: Category;
  mealType: MealType;
  ingredients: Ingredient[];
  description: string;
  defaultServings: number;
  note: string;
  imageUrl: string;
  preparationTime?: number;
  cookingTime?: number;
  totalTime?: number;
  difficulty?: RecipeDifficulty;
  estimatedCostCategory?: CostCategory;
  childFriendly?: boolean;
  suitableForLeftovers?: boolean;
  reheatsWell?: boolean;
  mainIngredients?: string[];
  cuisine?: string;
  vegetarian?: boolean;
  vegan?: boolean;
  commonAllergens?: string[];
  quickMeal?: boolean;
  weekendMeal?: boolean;
  suitableSideDishes?: string[];
}

export interface DayPlan {
  soup: string | null;
  lunch: string | null;
  side: string | null;
  pickle: string | null;
  dinner: string | null;
  dessert: string | null;
  soupServings: number;
  lunchServings: number;
  sideServings: number;
  pickleServings: number;
  dinnerServings: number;
  dessertServings: number;
  lunchDays: number;
  dinnerDays: number;
}

export type MenuProfile = 'balanced' | 'soup' | 'simple';

export type DietPreference = 'none' | 'vegetarian' | 'vegan';
export type CookingTimePreference = 'any' | '30' | '45' | '60';
export type FoodStylePreference = 'traditional' | 'light' | 'quick' | 'meatless';
export type FoodRestriction = 'gluten' | 'milk' | 'lactose' | 'egg' | 'nuts' | 'fish' | 'soy';

export interface MenuPreferences {
  familySize: number;
  diet: DietPreference;
  allergies: FoodRestriction[];
  intolerances: FoodRestriction[];
  dislikedIngredients: string[];
  preferredStyles: FoodStylePreference[];
  maxCookingTime: CookingTimePreference;
  batchDays: 1 | 2 | 3;
}

export const DEFAULT_MENU_PREFERENCES: MenuPreferences = {
  familySize: 4,
  diet: 'none',
  allergies: [],
  intolerances: [],
  dislikedIngredients: [],
  preferredStyles: [],
  maxCookingTime: 'any',
  batchDays: 1,
};

export type MealSlot = 'lunch' | 'dinner';
export type GenerationSelection = Record<WeekDay, Record<MealSlot, boolean>>;

export type WeekDay = 'Hétfő' | 'Kedd' | 'Szerda' | 'Csütörtök' | 'Péntek' | 'Szombat' | 'Vasárnap';
export type WeekPlan = Record<WeekDay, DayPlan>;

export type WeeklyGoal = 'save-money' | 'cook-fast' | 'family-favourites' | 'use-pantry' | 'eat-healthier' | 'surprise-me';
export type DayMode = 'normal' | 'busy' | 'leftovers' | 'no-meal';

export interface DaySchedule {
  people: number;
  maxCookingTime: number | null;
  mode: DayMode;
}

export interface WeeklyAutopilotSettings {
  goal: WeeklyGoal;
  groceryTarget?: number | null;
  pantryIngredients: string[];
  days: Record<WeekDay, DaySchedule>;
}

export function createDefaultAutopilotSettings(familySize = 4): WeeklyAutopilotSettings {
  return {
    goal: 'cook-fast',
    groceryTarget: null,
    pantryIngredients: [],
    days: Object.fromEntries(WEEKDAYS.map(day => [day, { people: familySize, maxCookingTime: null, mode: 'normal' }])) as Record<WeekDay, DaySchedule>,
  };
}

export interface ShoppingItem {
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  manual?: boolean;
  dayIndex?: number;
}

export const WEEKDAYS: WeekDay[] = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];

export const CATEGORY_LABELS: Record<Category, string> = {
  soup: 'Levesek',
  main: 'Főételek',
  side: 'Köretek',
  pickle: 'Savanyúságok',
  salad: 'Saláták',
  dessert: 'Desszertek',
};

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  lunch: 'Ebéd',
  dinner: 'Vacsora',
  both: 'Mindkettő',
};

export function createEmptyDayPlan(): DayPlan {
  return {
    soup: null,
    lunch: null,
    side: null,
    pickle: null,
    dinner: null,
    dessert: null,
    soupServings: 4,
    lunchServings: 4,
    sideServings: 4,
    pickleServings: 4,
    dinnerServings: 4,
    dessertServings: 4,
    lunchDays: 1,
    dinnerDays: 1,
  };
}

export function createEmptyWeekPlan(): WeekPlan {
  return Object.fromEntries(WEEKDAYS.map(d => [d, createEmptyDayPlan()])) as WeekPlan;
}

export function createGenerationSelection(selected = false): GenerationSelection {
  return Object.fromEntries(WEEKDAYS.map(day => [day, { lunch: selected, dinner: selected }])) as GenerationSelection;
}
