import { createEmptyWeekPlan, DEFAULT_MENU_PREFERENCES, GenerationSelection, MenuPreferences, MenuProfile, Recipe, WEEKDAYS, WeekPlan } from '@/types/recipe';
import { isQuickRecipe, isSundayRecipe, recipeNeedsSeparateSide } from '@/lib/recipeScheduling';
import { recipeMatchesSafetyPreferences, recipePreferenceScore } from '@/lib/menuPreferences';

function shuffled<T>(items: T[]): T[] { return [...items].sort(() => Math.random() - 0.5); }

function pickId(recipes: Recipe[], usedIds: Set<string>, preferences: MenuPreferences, favoriteIds: Set<string>, previousIds: Set<string>): string | null {
  const unused = recipes.filter(recipe => !usedIds.has(recipe.id));
  const notRecentlyUsed = unused.filter(recipe => !previousIds.has(recipe.id));
  const pool = notRecentlyUsed.length ? notRecentlyUsed : (unused.length ? unused : recipes);
  const selected = shuffled(pool).sort((a, b) => recipePreferenceScore(b, preferences.preferredStyles, favoriteIds) - recipePreferenceScore(a, preferences.preferredStyles, favoriteIds))[0]?.id ?? null;
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

function soupForDay(index: number, profile: MenuProfile, soups: Recipe[], usedSoups: Set<string>, pairedSoups: Map<number, string | null>, preferences: MenuPreferences, favoriteIds: Set<string>, previousIds: Set<string>) {
  const pairStart = profile === 'balanced' && index >= 5 ? 5 : (index % 2 === 0 ? index : index - 1);
  const wantsSoup = profile === 'soup' || (profile === 'balanced' && (index < 2 || index >= 5));
  if (!wantsSoup) return null;
  if (!pairedSoups.has(pairStart)) pairedSoups.set(pairStart, pickId(soups, usedSoups, preferences, favoriteIds, previousIds));
  return pairedSoups.get(pairStart) ?? null;
}

export function generateWeekPlan(recipes: Recipe[], numLunches: number, numDinners: number, profile: MenuProfile = 'balanced', preferences: MenuPreferences = DEFAULT_MENU_PREFERENCES, favoriteIds: string[] = [], previousRecipeIds: string[] = []): WeekPlan {
  const eligibleRecipes = recipes.filter(recipe => recipeMatchesSafetyPreferences(recipe, preferences));
  const mains = eligibleRecipes.filter(recipe => recipe.category === 'main' && (recipe.mealType === 'lunch' || recipe.mealType === 'both'));
  const weekdayMains = mains.filter(recipe => !isSundayRecipe(recipe));
  const saturdayMains = mains.filter(recipe => !isSundayRecipe(recipe));
  const sundayMains = mains.filter(isSundayRecipe);
  const dinners = eligibleRecipes.filter(recipe => (recipe.category === 'main' || recipe.category === 'salad') && isQuickRecipe(recipe) && (recipe.mealType === 'dinner' || recipe.mealType === 'both'));
  const soups = eligibleRecipes.filter(recipe => recipe.category === 'soup');
  const sides = eligibleRecipes.filter(recipe => recipe.category === 'side');
  const pickles = eligibleRecipes.filter(recipe => recipe.category === 'pickle');
  const desserts = eligibleRecipes.filter(recipe => recipe.category === 'dessert');
  const plan = createEmptyWeekPlan();
  const usedMeals = new Set<string>();
  const usedSoups = new Set<string>();
  const usedDesserts = new Set<string>();
  const pairedSoups = new Map<number, string | null>();
  const favoriteSet = new Set(favoriteIds);
  const previousIds = new Set(previousRecipeIds);
  let sharedWeekendDessert: string | null = null;

  WEEKDAYS.forEach((day, index) => {
    if (index < numLunches) {
      let dayMains = weekdayMains.length ? weekdayMains : mains.filter(recipe => !isSundayRecipe(recipe));
      if (day === 'Szombat') dayMains = saturdayMains;
      if (day === 'Vasárnap') dayMains = sundayMains.length ? sundayMains : mains;
      const startsNewBatch = index === 0 || index % preferences.batchDays === 0;
      const priorLunch = index > 0 ? plan[WEEKDAYS[index - 1]].lunch : null;
      const lunch = !startsNewBatch && priorLunch ? priorLunch : pickId(dayMains, usedMeals, preferences, favoriteSet, previousIds);
      const batchSize = Math.min(preferences.batchDays, numLunches - index);
      const isWeekend = day === 'Szombat' || day === 'Vasárnap';
      let dessert = profile !== 'simple' && isWeekend ? pickId(desserts, usedDesserts, preferences, favoriteSet, previousIds) : null;
      if (profile !== 'simple' && isWeekend) {
        sharedWeekendDessert ||= dessert;
        dessert = sharedWeekendDessert;
      }
      plan[day] = {
        ...plan[day], soup: soupForDay(index, profile, soups, usedSoups, pairedSoups, preferences, favoriteSet, previousIds), lunch,
        side: pickCompatibleSide(sides, recipes.find(recipe => recipe.id === lunch)),
        pickle: profile !== 'simple' && isWeekend ? shuffled(pickles)[0]?.id ?? null : null, dessert,
        soupServings: preferences.familySize, lunchServings: preferences.familySize, sideServings: preferences.familySize,
        pickleServings: preferences.familySize, dessertServings: preferences.familySize, lunchDays: batchSize,
      };
    }
    if (index < numDinners) {
      const startsNewBatch = index === 0 || index % preferences.batchDays === 0;
      const priorDinner = index > 0 ? plan[WEEKDAYS[index - 1]].dinner : null;
      plan[day].dinner = !startsNewBatch && priorDinner ? priorDinner : pickId(dinners, usedMeals, preferences, favoriteSet, previousIds);
      plan[day].dinnerServings = preferences.familySize;
      plan[day].dinnerDays = Math.min(preferences.batchDays, numDinners - index);
    }
  });
  return plan;
}

export function generateSelectedPlan(recipes: Recipe[], currentPlan: WeekPlan, selection: GenerationSelection, profile: MenuProfile = 'balanced', preferences: MenuPreferences = DEFAULT_MENU_PREFERENCES, favoriteIds: string[] = []): WeekPlan {
  if (!WEEKDAYS.some(day => selection[day].lunch || selection[day].dinner)) return currentPlan;
  const previousRecipeIds = WEEKDAYS.flatMap(day => [currentPlan[day].soup, currentPlan[day].lunch, currentPlan[day].side, currentPlan[day].pickle, currentPlan[day].dinner, currentPlan[day].dessert]).filter(Boolean) as string[];
  const generated = generateWeekPlan(recipes, 7, 7, profile, preferences, favoriteIds, previousRecipeIds);
  // Generate replaces the active plan; the previous plan is only a variety hint.
  // Build and validate the entire result before the store commits it.
  const next = createEmptyWeekPlan();
  WEEKDAYS.forEach(day => {
    if ((selection[day].lunch && !generated[day].lunch) || (selection[day].dinner && !generated[day].dinner)) {
      throw new Error('No suitable recipe for a selected meal');
    }
    if (selection[day].lunch) next[day] = {
      ...next[day], soup: generated[day].soup, lunch: generated[day].lunch, side: generated[day].side,
      pickle: generated[day].pickle, dessert: generated[day].dessert, lunchDays: generated[day].lunchDays,
      soupServings: generated[day].soupServings, lunchServings: generated[day].lunchServings,
      sideServings: generated[day].sideServings, pickleServings: generated[day].pickleServings,
      dessertServings: generated[day].dessertServings,
    };
    if (selection[day].dinner) next[day] = {
      ...next[day], dinner: generated[day].dinner, dinnerDays: generated[day].dinnerDays,
      dinnerServings: generated[day].dinnerServings,
    };
  });
  WEEKDAYS.forEach((day, index) => {
    if (selection[day].lunch && next[day].lunch) next[day].lunchDays = selectedRunLength(next, selection, index, 'lunch');
    if (selection[day].dinner && next[day].dinner) next[day].dinnerDays = selectedRunLength(next, selection, index, 'dinner');
  });
  return next;
}

function selectedRunLength(plan: WeekPlan, selection: GenerationSelection, index: number, slot: 'lunch' | 'dinner') {
  const recipeId = plan[WEEKDAYS[index]][slot];
  let start = index;
  let end = index;
  while (start > 0 && selection[WEEKDAYS[start - 1]][slot] && plan[WEEKDAYS[start - 1]][slot] === recipeId) start -= 1;
  while (end < WEEKDAYS.length - 1 && selection[WEEKDAYS[end + 1]][slot] && plan[WEEKDAYS[end + 1]][slot] === recipeId) end += 1;
  return end - start + 1;
}
