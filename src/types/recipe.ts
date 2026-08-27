export type Category = 'soup' | 'main' | 'salad' | 'dessert';
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
  lunch: string | null;       // recipe id
  dinner: string | null;      // recipe id
  dessert: string | null;     // weekend dessert served after lunch
  lunchServings: number;
  dinnerServings: number;
  dessertServings: number;
  lunchDays: number;          // cook for N days
  dinnerDays: number;
}

export type WeekendDessertMode = 'same' | 'different';

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
    lunch: null,
    dinner: null,
    dessert: null,
    lunchServings: 4,
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
