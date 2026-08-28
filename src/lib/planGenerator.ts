import { createEmptyWeekPlan, GenerationSelection, MenuProfile, Recipe, WEEKDAYS, WeekPlan } from '@/types/recipe';
import { isQuickRecipe, isSundayRecipe, recipeNeedsSeparateSide } from '@/lib/recipeScheduling';

function shuffled<T>(items: T[]): T[] { return [...items].sort(() => Math.random() - 0.5); }

function pickId(recipes: Recipe[], usedIds: Set<string>): string | null {
  const unused = recipes.filter(recipe => !usedIds.has(recipe.id));
  const selected = shuffled(unused.length ? unused : recipes)[0]?.id ?? null;
  if (selected) usedIds.add(selected);
  return selected;
}

function compatibleSideIds(main?: Recipe): string[] {
  const name = main?.name.toLocaleLowerCase('hu') ?? '';
  if (!recipeNeedsSeparateSide(main)) return [];
  if (/kacsa|liba/.test(name)) return ['side-9', 'side-6', 'side-1'];
  if (/pörkölt|paprikás|tokány|vadas/.test(name)) return ['side-4', 'side-5', 'side-3'];
  if (/rántott|fasírt|pecsenye|sült/.test(name)) return ['side-1', 'side-2', 'side-7', 'side-3'];
  if (/hal/.test(name)) return ['side-1', 'side-3', 'side-8'];
  return ['side-1', 'side-2', 'side-3', 'side-5', 'side-8', 'side-10'];
}

function pickCompatibleSide(recipes: Recipe[], main?: Recipe): string | null {
  const allowed = new Set(compatibleSideIds(main));
  if (allowed.size === 0) return null;
  return shuffled(recipes.filter(recipe => allowed.has(recipe.id)))[0]?.id ?? null;
}

function soupForDay(index: number, profile: MenuProfile, soups: Recipe[], usedSoups: Set<string>, pairedSoups: Map<number, string | null>) {
  const pairStart = profile === 'balanced' && index >= 5 ? 5 : (index % 2 === 0 ? index : index - 1);
  const wantsSoup = profile === 'soup' || (profile === 'balanced' && (index < 2 || index >= 5));
  if (!wantsSoup) return null;
  if (!pairedSoups.has(pairStart)) pairedSoups.set(pairStart, pickId(soups, usedSoups));
  return pairedSoups.get(pairStart) ?? null;
}

export function generateWeekPlan(recipes: Recipe[], numLunches: number, numDinners: number, profile: MenuProfile = 'balanced'): WeekPlan {
  const mains = recipes.filter(recipe => recipe.category === 'main' && (recipe.mealType === 'lunch' || recipe.mealType === 'both'));
  const weekdayMains = mains.filter(recipe => !isSundayRecipe(recipe));
  const saturdayMains = mains.filter(recipe => !isSundayRecipe(recipe));
  const sundayMains = mains.filter(isSundayRecipe);
  const dinners = recipes.filter(recipe => (recipe.category === 'main' || recipe.category === 'salad') && isQuickRecipe(recipe) && (recipe.mealType === 'dinner' || recipe.mealType === 'both'));
  const soups = recipes.filter(recipe => recipe.category === 'soup');
  const sides = recipes.filter(recipe => recipe.category === 'side');
  const pickles = recipes.filter(recipe => recipe.category === 'pickle');
  const desserts = recipes.filter(recipe => recipe.category === 'dessert');
  const plan = createEmptyWeekPlan();
  const usedMeals = new Set<string>();
  const usedSoups = new Set<string>();
  const usedDesserts = new Set<string>();
  const pairedSoups = new Map<number, string | null>();
  let sharedWeekendDessert: string | null = null;

  WEEKDAYS.forEach((day, index) => {
    if (index < numLunches) {
      let dayMains = weekdayMains.length ? weekdayMains : mains.filter(recipe => !isSundayRecipe(recipe));
      if (day === 'Szombat') dayMains = saturdayMains;
      if (day === 'Vasárnap') dayMains = sundayMains.length ? sundayMains : mains;
      const lunch = pickId(dayMains, usedMeals);
      const isWeekend = day === 'Szombat' || day === 'Vasárnap';
      let dessert = profile !== 'simple' && isWeekend ? pickId(desserts, usedDesserts) : null;
      if (profile !== 'simple' && isWeekend) {
        sharedWeekendDessert ||= dessert;
        dessert = sharedWeekendDessert;
      }
      plan[day] = {
        ...plan[day], soup: soupForDay(index, profile, soups, usedSoups, pairedSoups), lunch,
        side: pickCompatibleSide(sides, recipes.find(recipe => recipe.id === lunch)),
        pickle: profile !== 'simple' && isWeekend ? shuffled(pickles)[0]?.id ?? null : null, dessert,
      };
    }
    if (index < numDinners) plan[day].dinner = pickId(dinners, usedMeals);
  });
  return plan;
}

export function generateSelectedPlan(recipes: Recipe[], currentPlan: WeekPlan, selection: GenerationSelection, profile: MenuProfile = 'balanced'): WeekPlan {
  const generated = generateWeekPlan(recipes, 7, 7, profile);
  const next = Object.fromEntries(WEEKDAYS.map(day => [day, { ...currentPlan[day] }])) as WeekPlan;
  WEEKDAYS.forEach(day => {
    if (selection[day].lunch) next[day] = { ...next[day], soup: generated[day].soup, lunch: generated[day].lunch, side: generated[day].side, pickle: generated[day].pickle, dessert: generated[day].dessert, lunchDays: 1 };
    if (selection[day].dinner) next[day] = { ...next[day], dinner: generated[day].dinner, dinnerDays: 1 };
  });
  return next;
}
