export type Category = 'soup' | 'main' | 'side' | 'pickle' | 'salad' | 'dessert';
export type MealType = 'lunch' | 'dinner' | 'both';

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

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
}

export interface DayPlan {
  soup: string | null;        // complete lunch: optional soup
  lunch: string | null;       // complete lunch: main dish
  side: string | null;        // complete lunch: optional side dish
  pickle: string | null;      // complete lunch: optional pickle
  dinner: string | null;      // recipe id
  dessert: string | null;     // optional dessert after lunch on any day
  soupServings: number;
  lunchServings: number;
  sideServings: number;
  pickleServings: number;
  dinnerServings: number;
  dessertServings: number;
  lunchDays: number;          // cook for N days
  dinnerDays: number;
}

export type MenuProfile = 'balanced' | 'soup' | 'simple';

export type MealSlot = 'lunch' | 'dinner';
export type GenerationSelection = Record<WeekDay, Record<MealSlot, boolean>>;

export type WeekDay = 'Hétfő' | 'Kedd' | 'Szerda' | 'Csütörtök' | 'Péntek' | 'Szombat' | 'Vasárnap';

export type WeekPlan = Record<WeekDay, DayPlan>;

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
  return Object.fromEntries(
    WEEKDAYS.map(day => [day, { lunch: selected, dinner: selected }]),
  ) as GenerationSelection;
}
