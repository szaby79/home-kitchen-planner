import { FoodRestriction, Recipe, RecipeDifficulty } from '@/types/recipe';

type MainAudit = {
  preparationTime: number;
  cookingTime: number;
  restingTime?: number;
  difficulty?: RecipeDifficulty;
  commonAllergens: FoodRestriction[];
  note: string;
};

const mainAudit: Record<string, MainAudit> = {
  'main-1': { preparationTime: 25, cookingTime: 30, difficulty: 'medium', commonAllergens: ['gluten', 'egg'], note: 'Ropogós panír, szaftos csirkemell és egyszerű burgonyaköret' },
  'main-2': { preparationTime: 25, cookingTime: 35, difficulty: 'medium', commonAllergens: ['gluten', 'egg'], note: 'Klasszikus rántott sertésszelet burgonyával' },
  'main-3': { preparationTime: 25, cookingTime: 20, restingTime: 15, difficulty: 'medium', commonAllergens: ['milk', 'lactose', 'gluten', 'egg'], note: 'Dupla paníros rántott sajt rizzsel és tartármártással' },
  'main-4': { preparationTime: 25, cookingTime: 65, difficulty: 'medium', commonAllergens: ['milk', 'lactose', 'gluten', 'egg'], note: 'Hagyományos csirkepaprikás házi nokedlivel' },
  'main-5': { preparationTime: 20, cookingTime: 85, difficulty: 'medium', commonAllergens: ['gluten', 'egg'], note: 'Sűrű szaftú sertéspörkölt házi nokedlivel' },
  'main-6': { preparationTime: 20, cookingTime: 160, difficulty: 'medium', commonAllergens: ['gluten', 'egg'], note: 'Lassan főtt, omlós marhapörkölt' },
  'main-7': { preparationTime: 20, cookingTime: 80, difficulty: 'medium', commonAllergens: ['milk', 'lactose', 'gluten', 'egg'], note: 'Borsos-gombás marhatokány nokedlivel' },
  'main-8': { preparationTime: 25, cookingTime: 60, restingTime: 10, commonAllergens: ['milk', 'lactose', 'egg'], note: 'Kiegyensúlyozott rétegezésű klasszikus rakott krumpli' },
  'main-9': { preparationTime: 25, cookingTime: 80, restingTime: 10, difficulty: 'medium', commonAllergens: ['milk', 'lactose'], note: 'Szaftos rakott káposzta hússal, rizzsel és tejföllel' },
  'main-10': { preparationTime: 35, cookingTime: 100, difficulty: 'medium', commonAllergens: ['milk', 'lactose', 'egg'], note: 'Lassan főtt töltött káposzta füstölt oldalassal' },
  'main-11': { preparationTime: 25, cookingTime: 55, difficulty: 'medium', commonAllergens: ['egg'], note: 'Töltött paprika házi paradicsomszószban' },
  'main-12': { preparationTime: 15, cookingTime: 30, commonAllergens: ['gluten', 'egg'], note: 'Szaftos lecsó kolbásszal és tojással' },
  'main-13': { preparationTime: 20, cookingTime: 55, difficulty: 'medium', commonAllergens: [], note: 'Pirult sertéshús ropogós burgonyával' },
  'main-14': { preparationTime: 20, cookingTime: 25, restingTime: 10, difficulty: 'medium', commonAllergens: ['gluten', 'egg'], note: 'Kívül pirult, belül szaftos házi fasírt' },
  'main-15': { preparationTime: 25, cookingTime: 80, restingTime: 10, difficulty: 'medium', commonAllergens: ['gluten', 'egg'], note: 'Főtt tojással töltött, szeletelhető vagdalt' },
};

export const applyMainAudit = (recipe: Recipe): Recipe => {
  const audit = mainAudit[recipe.id];
  if (!audit) return recipe;

  const restingTime = audit.restingTime ?? 0;
  const totalTime = audit.preparationTime + audit.cookingTime + restingTime;

  return {
    ...recipe,
    note: audit.note,
    preparationTime: audit.preparationTime,
    cookingTime: audit.cookingTime,
    restingTime,
    totalTime,
    difficulty: audit.difficulty ?? 'easy',
    commonAllergens: audit.commonAllergens,
    quickMeal: totalTime <= 30,
    qualityAuditStatus: 'code-reviewed',
  };
};

export const auditedMainIds = Object.keys(mainAudit);
