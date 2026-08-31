import { createDefaultAutopilotSettings, createEmptyWeekPlan, DEFAULT_MENU_PREFERENCES, GenerationSelection, MenuPreferences, MenuProfile, Recipe, WEEKDAYS, WeekDay, WeekPlan, WeeklyAutopilotSettings } from '@/types/recipe';
import { isQuickRecipe, isSundayRecipe, recipeNeedsSeparateSide } from '@/lib/recipeScheduling';
import { recipeMatchesSafetyPreferences, recipePreferenceScore } from '@/lib/menuPreferences';

function shuffled<T>(items: T[]): T[] { return [...items].sort(() => Math.random() - 0.5); }

function normalizedIngredients(recipe: Recipe): string[] {
  return (recipe.mainIngredients?.length ? recipe.mainIngredients : recipe.ingredients.map(item => item.name))
    .map(value => value.toLocaleLowerCase('hu'));
}

function estimatedMinutes(recipe: Recipe): number {
  if (recipe.totalTime) return recipe.totalTime;
  if (recipe.preparationTime || recipe.cookingTime) return (recipe.preparationTime ?? 0) + (recipe.cookingTime ?? 0);
  if (isQuickRecipe(recipe)) return 25;
  if (isSundayRecipe(recipe)) return 75;
  return 45;
}

function inferredCost(recipe: Recipe): number {
  if (recipe.estimatedCostCategory === '$') return 1;
  if (recipe.estimatedCostCategory === '$$$') return 3;
  if (recipe.estimatedCostCategory === '$$') return 2;
  const text = normalizedIngredients(recipe).join(' ');
  if (/bélszín|marha|kacsa|liba|lazac|hal|borjú/.test(text)) return 3;
  if (/csirke|sertés|sajt|tejszín/.test(text)) return 2;
  return 1;
}

function goalScore(recipe: Recipe, settings: WeeklyAutopilotSettings, favoriteIds: Set<string>, reusedIngredients: Set<string>): number {
  const ingredients = normalizedIngredients(recipe);
  const pantry = settings.pantryIngredients.map(item => item.toLocaleLowerCase('hu').trim()).filter(Boolean);
  const overlap = ingredients.filter(ingredient => [...reusedIngredients].some(used => ingredient.includes(used) || used.includes(ingredient))).length;
  let score = overlap * 2;
  switch (settings.goal) {
    case 'save-money': score += (4 - inferredCost(recipe)) * 4; break;
    case 'cook-fast': score += Math.max(0, 60 - estimatedMinutes(recipe)) / 8; break;
    case 'family-favourites': score += favoriteIds.has(recipe.id) ? 12 : 0; break;
    case 'use-pantry': score += pantry.filter(item => ingredients.some(ingredient => ingredient.includes(item) || item.includes(ingredient))).length * 8; break;
    case 'eat-healthier': score += recipe.category === 'salad' ? 10 : /zöldség|saláta|brokkoli|répa|káposzta|paprika|paradicsom/.test(ingredients.join(' ')) ? 4 : 0; break;
    case 'surprise-me': score += Math.random() * 5; break;
  }
  return score;
}

function pickId(recipes: Recipe[], usedIds: Set<string>, preferences: MenuPreferences, favoriteIds: Set<string>, previousIds: Set<string>, settings?: WeeklyAutopilotSettings, reusedIngredients = new Set<string>()): string | null {
  const unused = recipes.filter(recipe => !usedIds.has(recipe.id));
  const notRecentlyUsed = unused.filter(recipe => !previousIds.has(recipe.id));
  const pool = notRecentlyUsed.length ? notRecentlyUsed : (unused.length ? unused : recipes);
  const selectedRecipe = shuffled(pool).sort((a, b) => {
    const preference = recipePreferenceScore(b, preferences.preferredStyles, favoriteIds) - recipePreferenceScore(a, preferences.preferredStyles, favoriteIds);
    const goal = settings ? goalScore(b, settings, favoriteIds, reusedIngredients) - goalScore(a, settings, favoriteIds, reusedIngredients) : 0;
    return preference + goal;
  })[0];
  if (selectedRecipe) usedIds.add(selectedRecipe.id);
  return selectedRecipe?.id ?? null;
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

function soupForDay(index: number, profile: MenuProfile, soups: Recipe[], usedSoups: Set<string>, pairedSoups: Map<number, string | null>, preferences: MenuPreferences, favoriteIds: Set<string>, previousIds: Set<string>, settings?: WeeklyAutopilotSettings, reusedIngredients?: Set<string>) {
  const pairStart = profile === 'balanced' && index >= 5 ? 5 : (index % 2 === 0 ? index : index - 1);
  const wantsSoup = profile === 'soup' || (profile === 'balanced' && (index < 2 || index >= 5));
  if (!wantsSoup) return null;
  if (!pairedSoups.has(pairStart)) pairedSoups.set(pairStart, pickId(soups, usedSoups, preferences, favoriteIds, previousIds, settings, reusedIngredients));
  return pairedSoups.get(pairStart) ?? null;
}

function filterForDay(recipes: Recipe[], day: WeekDay, settings: WeeklyAutopilotSettings): Recipe[] {
  const schedule = settings.days[day];
  const limit = schedule.maxCookingTime ?? (schedule.mode === 'busy' ? 30 : null);
  if (!limit) return recipes;
  const withinLimit = recipes.filter(recipe => estimatedMinutes(recipe) <= limit);
  return withinLimit.length ? withinLimit : recipes.filter(isQuickRecipe);
}

function addRecipeIngredients(recipeId: string | null, recipes: Recipe[], reused: Set<string>) {
  const recipe = recipes.find(item => item.id === recipeId);
  if (!recipe) return;
  normalizedIngredients(recipe).slice(0, 8).forEach(ingredient => reused.add(ingredient));
}

export function generateWeekPlan(recipes: Recipe[], numLunches: number, numDinners: number, profile: MenuProfile = 'balanced', preferences: MenuPreferences = DEFAULT_MENU_PREFERENCES, favoriteIds: string[] = [], previousRecipeIds: string[] = [], autopilot?: WeeklyAutopilotSettings): WeekPlan {
  const settings = autopilot ?? createDefaultAutopilotSettings(preferences.familySize);
  const eligibleRecipes = recipes.filter(recipe => recipeMatchesSafetyPreferences(recipe, preferences));
  const mains = eligibleRecipes.filter(recipe => recipe.category === 'main' && (recipe.mealType === 'lunch' || recipe.mealType === 'both'));
  const weekdayMains = mains.filter(recipe => !isSundayRecipe(recipe));
  const saturdayMains = mains.filter(recipe => !isSundayRecipe(recipe));
  const sundayMains = mains.filter(isSundayRecipe);
  const dinners = eligibleRecipes.filter(recipe => (recipe.category === 'main' || recipe.category === 'salad') && (recipe.mealType === 'dinner' || recipe.mealType === 'both'));
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
  const reusedIngredients = new Set<string>();
  let sharedWeekendDessert: string | null = null;

  WEEKDAYS.forEach((day, index) => {
    const schedule = settings.days[day];
    if (schedule.mode === 'no-meal') return;
    const people = Math.max(1, schedule.people || preferences.familySize);

    if (schedule.mode === 'leftovers' && index > 0) {
      const previous = plan[WEEKDAYS[index - 1]];
      if (index < numLunches && previous.lunch) {
        plan[day] = { ...plan[day], lunch: previous.lunch, side: previous.side, lunchServings: people, sideServings: people, lunchFromLeftovers: true };
        previous.lunchServings += people;
        if (previous.side) previous.sideServings += people;
      }
      if (index < numDinners && previous.dinner) {
        plan[day].dinner = previous.dinner;
        plan[day].dinnerServings = people;
        plan[day].dinnerFromLeftovers = true;
        previous.dinnerServings += people;
      }
      return;
    }

    if (index < numLunches) {
      let dayMains = weekdayMains.length ? weekdayMains : mains.filter(recipe => !isSundayRecipe(recipe));
      if (day === 'Szombat') dayMains = saturdayMains;
      if (day === 'Vasárnap') dayMains = sundayMains.length ? sundayMains : mains;
      dayMains = filterForDay(dayMains, day, settings);
      const lunch = pickId(dayMains, usedMeals, preferences, favoriteSet, previousIds, settings, reusedIngredients);
      const isWeekend = day === 'Szombat' || day === 'Vasárnap';
      let dessert = profile !== 'simple' && isWeekend ? pickId(desserts, usedDesserts, preferences, favoriteSet, previousIds, settings, reusedIngredients) : null;
      if (profile !== 'simple' && isWeekend) {
        sharedWeekendDessert ||= dessert;
        dessert = sharedWeekendDessert;
      }
      plan[day] = {
        ...plan[day], soup: soupForDay(index, profile, soups, usedSoups, pairedSoups, preferences, favoriteSet, previousIds, settings, reusedIngredients), lunch,
        side: pickCompatibleSide(sides, recipes.find(recipe => recipe.id === lunch)),
        pickle: profile !== 'simple' && isWeekend ? shuffled(pickles)[0]?.id ?? null : null, dessert,
        soupServings: people, lunchServings: people, sideServings: people,
        pickleServings: people, dessertServings: people, lunchDays: 1,
      };
      addRecipeIngredients(lunch, recipes, reusedIngredients);
    }

    if (index < numDinners) {
      let dayDinners = filterForDay(dinners, day, settings);
      if (schedule.mode === 'busy' || settings.goal === 'cook-fast') {
        const quick = dayDinners.filter(isQuickRecipe);
        if (quick.length) dayDinners = quick;
      }
      plan[day].dinner = pickId(dayDinners, usedMeals, preferences, favoriteSet, previousIds, settings, reusedIngredients);
      plan[day].dinnerServings = people;
      plan[day].dinnerDays = 1;
      addRecipeIngredients(plan[day].dinner, recipes, reusedIngredients);
    }
  });
  return plan;
}

export function generateSelectedPlan(recipes: Recipe[], currentPlan: WeekPlan, selection: GenerationSelection, profile: MenuProfile = 'balanced', preferences: MenuPreferences = DEFAULT_MENU_PREFERENCES, favoriteIds: string[] = [], autopilot?: WeeklyAutopilotSettings): WeekPlan {
  if (!WEEKDAYS.some(day => selection[day].lunch || selection[day].dinner)) return currentPlan;
  const previousRecipeIds = WEEKDAYS.flatMap(day => [currentPlan[day].soup, currentPlan[day].lunch, currentPlan[day].side, currentPlan[day].pickle, currentPlan[day].dinner, currentPlan[day].dessert]).filter(Boolean) as string[];
  const generated = generateWeekPlan(recipes, 7, 7, profile, preferences, favoriteIds, previousRecipeIds, autopilot);
  const next = createEmptyWeekPlan();
  WEEKDAYS.forEach(day => {
    const noMeal = autopilot?.days[day].mode === 'no-meal';
    const leftoverDay = autopilot?.days[day].mode === 'leftovers';
    if (!noMeal && !leftoverDay && ((selection[day].lunch && !generated[day].lunch) || (selection[day].dinner && !generated[day].dinner))) {
      throw new Error('No suitable recipe for a selected meal');
    }
    if (selection[day].lunch && generated[day].lunch) next[day] = {
      ...next[day], soup: generated[day].soup, lunch: generated[day].lunch, side: generated[day].side,
      pickle: generated[day].pickle, dessert: generated[day].dessert, lunchDays: generated[day].lunchDays,
      soupServings: generated[day].soupServings, lunchServings: generated[day].lunchServings,
      sideServings: generated[day].sideServings, pickleServings: generated[day].pickleServings,
      dessertServings: generated[day].dessertServings, lunchFromLeftovers: generated[day].lunchFromLeftovers,
    };
    if (selection[day].dinner && generated[day].dinner) next[day] = {
      ...next[day], dinner: generated[day].dinner, dinnerDays: generated[day].dinnerDays,
      dinnerServings: generated[day].dinnerServings, dinnerFromLeftovers: generated[day].dinnerFromLeftovers,
    };
  });
  return next;
}
