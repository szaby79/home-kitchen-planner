import { FoodRestriction, FoodStylePreference, MenuPreferences, Recipe } from '@/types/recipe';
import { isQuickRecipe, isSundayRecipe } from '@/lib/recipeScheduling';

const RESTRICTION_WORDS: Record<FoodRestriction, RegExp> = {
  gluten: /liszt|zsemle|kenyér|morzsa|tészta|tarhonya|csusza|galuska|nokedli|búza|flour|bread|breadcrumb|pasta|noodle|wheat/i,
  milk: /tej|tejföl|tejszín|sajt|vaj|túró|joghurt|milk|sour cream|cream|cheese|butter|cottage cheese|yogurt/i,
  lactose: /tej|tejföl|tejszín|sajt|vaj|túró|joghurt|milk|sour cream|cream|cheese|butter|cottage cheese|yogurt/i,
  egg: /tojás|egg/i,
  nuts: /dió|mogyoró|mandula|nut|walnut|hazelnut|almond/i,
  fish: /hal|ponty|harcsa|tonhal|lazac|fish|carp|catfish|tuna|salmon/i,
  soy: /szója|soy/i,
};

const MEAT_WORDS = /hús(?!mentes)|csirke|pulyka|sertés|marha|borjú|bárány|kacsa|liba|kolbász|szalonna|sonka|máj|virsli|hal|ponty|harcsa|tonhal|meat(?!less)|chicken|turkey|pork|beef|veal|lamb|duck|goose|sausage|bacon|ham|liver|fish|carp|catfish|tuna/i;
const ANIMAL_WORDS = /tojás|tej|tejföl|tejszín|sajt|vaj|túró|joghurt|méz|egg|milk|cream|cheese|butter|cottage cheese|yogurt|honey/i;

const RESTRICTIONS = Object.keys(RESTRICTION_WORDS) as FoodRestriction[];

function recipeText(recipe: Recipe) {
  return `${recipe.name} ${recipe.note} ${recipe.ingredients.map(item => item.name).join(' ')}`;
}

export function isVegetarianRecipe(recipe: Recipe) {
  if (recipe.vegan === true) return true;
  if (recipe.vegetarian !== undefined) return recipe.vegetarian;
  return !MEAT_WORDS.test(recipeText(recipe));
}

export function isVeganRecipe(recipe: Recipe) {
  if (recipe.vegan !== undefined) return recipe.vegan;
  const text = recipeText(recipe);
  return !MEAT_WORDS.test(text) && !ANIMAL_WORDS.test(text);
}

export function isKetoRecipe(recipe: Recipe) {
  return recipe.keto === true;
}

export function recipeAllergens(recipe: Recipe) {
  const text = recipeText(recipe);
  const allergens = new Set(recipe.commonAllergens ?? []);
  RESTRICTIONS.forEach(restriction => {
    if (RESTRICTION_WORDS[restriction].test(text)) allergens.add(restriction);
  });
  return allergens;
}

export function estimatedCookingMinutes(recipe: Recipe) {
  const match = recipe.note.match(/(\d+)\s*(?:perc|minute)/i);
  if (match) return Number(match[1]);
  if (isQuickRecipe(recipe)) return 30;
  if (isSundayRecipe(recipe)) return 90;
  return 60;
}

export function recipeMatchesSafetyPreferences(recipe: Recipe, preferences: MenuPreferences) {
  const text = recipeText(recipe);
  const restrictions = new Set([...preferences.allergies, ...preferences.intolerances]);
  const allergens = recipeAllergens(recipe);
  if ([...restrictions].some(restriction => allergens.has(restriction))) return false;
  if (preferences.diet === 'vegetarian' && !isVegetarianRecipe(recipe)) return false;
  if (preferences.diet === 'vegan' && !isVeganRecipe(recipe)) return false;
  if (preferences.diet === 'keto' && !isKetoRecipe(recipe)) return false;
  const normalized = text.toLocaleLowerCase();
  if (preferences.dislikedIngredients.some(item => item.trim() && normalized.includes(item.trim().toLocaleLowerCase()))) return false;
  if (preferences.maxCookingTime !== 'any' && estimatedCookingMinutes(recipe) > Number(preferences.maxCookingTime)) return false;
  return true;
}

export function recipePreferenceScore(recipe: Recipe, styles: FoodStylePreference[], favoriteIds: Set<string>) {
  let score = favoriteIds.has(recipe.id) ? 12 : 0;
  if (styles.includes('quick') && isQuickRecipe(recipe)) score += 5;
  if (styles.includes('meatless') && isVegetarianRecipe(recipe)) score += 5;
  if (styles.includes('light') && (recipe.category === 'salad' || /zöldség|főzelék|krémleves|saláta|vegetable|salad/i.test(recipeText(recipe)))) score += 5;
  if (styles.includes('traditional') && (recipe.category === 'main' || recipe.category === 'stew' || recipe.category === 'soup') && !isQuickRecipe(recipe)) score += 4;
  return score;
}

export function countMatchingMainRecipes(recipes: Recipe[], preferences: MenuPreferences) {
  return recipes.filter(recipe => (recipe.category === 'main' || recipe.category === 'stew') && recipeMatchesSafetyPreferences(recipe, preferences)).length;
}
