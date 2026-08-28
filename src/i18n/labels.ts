import { Category, MealType, WeekDay } from '@/types/recipe';

export const EN_CATEGORY_LABELS: Record<Category, string> = {
  soup: 'Soups',
  main: 'Main dishes',
  side: 'Side dishes',
  pickle: 'Pickles',
  salad: 'Salads',
  dessert: 'Desserts',
};

export const EN_MEAL_TYPE_LABELS: Record<MealType, string> = {
  lunch: 'Lunch',
  dinner: 'Dinner',
  both: 'Lunch or dinner',
};

export const EN_WEEKDAYS: Record<WeekDay, string> = {
  Hétfő: 'Monday',
  Kedd: 'Tuesday',
  Szerda: 'Wednesday',
  Csütörtök: 'Thursday',
  Péntek: 'Friday',
  Szombat: 'Saturday',
  Vasárnap: 'Sunday',
};
