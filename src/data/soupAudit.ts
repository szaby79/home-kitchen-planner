import { FoodRestriction, Recipe, RecipeDifficulty } from '@/types/recipe';

type SoupAudit = {
  preparationTime: number;
  cookingTime: number;
  restingTime?: number;
  difficulty?: RecipeDifficulty;
  commonAllergens: FoodRestriction[];
  note?: string;
};

const soupAudit: Record<string, SoupAudit> = {
  'soup-1': { preparationTime: 20, cookingTime: 105, commonAllergens: ['gluten', 'egg'], note: 'Lassan gyöngyözve főtt, tiszta családi leves' },
  'soup-2': { preparationTime: 25, cookingTime: 110, difficulty: 'medium', commonAllergens: ['gluten', 'egg'], note: 'Tartalmas gulyásleves házi csipetkével' },
  'soup-3': { preparationTime: 20, cookingTime: 110, restingTime: 480, commonAllergens: ['milk', 'lactose', 'gluten'], note: 'Füstölt húsos bableves, előző esti áztatással' },
  'soup-4': { preparationTime: 25, cookingTime: 115, restingTime: 480, difficulty: 'medium', commonAllergens: ['milk', 'lactose', 'gluten', 'egg'], note: 'Gazdag Jókai bableves csipetkével' },
  'soup-5': { preparationTime: 15, cookingTime: 30, commonAllergens: ['milk', 'lactose'], note: 'Kellemesen savanykás, krémes vöröslencseleves' },
  'soup-6': { preparationTime: 15, cookingTime: 70, restingTime: 240, commonAllergens: [], note: 'Sűrű, kolbászos sárgaborsóleves' },
  'soup-7': { preparationTime: 20, cookingTime: 30, commonAllergens: ['gluten', 'egg'], note: 'Könnyű zöldségleves külön főtt cérnametélttel' },
  'soup-8': { preparationTime: 15, cookingTime: 20, commonAllergens: ['milk', 'lactose', 'gluten'], note: 'Selymes, petrezselymes karfiolleves' },
  'soup-9': { preparationTime: 15, cookingTime: 25, commonAllergens: ['milk', 'lactose'], note: 'Krémes brokkolileves finom szerecsendióval' },
  'soup-10': { preparationTime: 15, cookingTime: 35, commonAllergens: ['milk', 'lactose', 'gluten'], note: 'Hagyományos, tejfölös burgonyaleves' },
  'soup-11': { preparationTime: 15, cookingTime: 40, commonAllergens: ['milk', 'lactose', 'gluten'], note: 'Tejfölös gombaleves friss petrezselyemmel' },
  'soup-12': { preparationTime: 15, cookingTime: 35, commonAllergens: ['milk', 'lactose', 'gluten', 'egg'], note: 'Házi paradicsomleves tarhonyával' },
  'soup-13': { preparationTime: 10, cookingTime: 15, commonAllergens: ['gluten', 'egg'], note: 'Gyors, köményes magyar tojásleves' },
  'soup-14': { preparationTime: 15, cookingTime: 35, commonAllergens: ['milk', 'lactose', 'gluten'], note: 'Zöldséges, tejfölös csirkeraguleves' },
  'soup-15': { preparationTime: 15, cookingTime: 60, commonAllergens: ['milk', 'lactose', 'gluten'], note: 'Illatos tárkonyos csirkeleves' },
  'soup-16': { preparationTime: 25, cookingTime: 65, difficulty: 'medium', commonAllergens: ['fish'], note: 'Hagyományos pontyhalászlé, óvatosan kezelt halszeletekkel' },
  'soup-17': { preparationTime: 15, cookingTime: 50, commonAllergens: ['milk', 'lactose', 'gluten'], note: 'Savanyú káposztás, kolbászos leves' },
  'soup-18': { preparationTime: 10, cookingTime: 35, commonAllergens: ['milk', 'lactose', 'gluten'], note: 'Kellemesen savanykás, tejfölös krumplileves' },
  'soup-19': { preparationTime: 10, cookingTime: 30, commonAllergens: ['milk', 'lactose'], note: 'Selymes kukoricakrémleves egész kukoricaszemekkel' },
  'soup-20': { preparationTime: 15, cookingTime: 30, commonAllergens: ['milk', 'lactose', 'gluten'], note: 'Lágy fokhagymakrémleves ropogós kenyérkockával' },
  'soup-21': { preparationTime: 20, cookingTime: 75, commonAllergens: ['milk', 'lactose', 'gluten'] },
  'soup-22': { preparationTime: 15, cookingTime: 35, commonAllergens: ['milk', 'lactose', 'gluten'] },
  'soup-23': { preparationTime: 15, cookingTime: 30, commonAllergens: ['milk', 'lactose'] },
  'soup-24': { preparationTime: 10, cookingTime: 30, commonAllergens: ['milk', 'lactose'], note: 'Gyors, üde zöldborsókrémleves' },
  'soup-25': { preparationTime: 15, cookingTime: 35, commonAllergens: ['gluten', 'egg'] },
  'soup-26': { preparationTime: 15, cookingTime: 45, commonAllergens: ['milk', 'lactose', 'gluten'] },
  'soup-27': { preparationTime: 20, cookingTime: 190, commonAllergens: ['gluten', 'egg'] },
  'soup-28': { preparationTime: 25, cookingTime: 40, restingTime: 10, difficulty: 'medium', commonAllergens: ['gluten', 'egg'] },
  'soup-29': { preparationTime: 15, cookingTime: 15, restingTime: 150, commonAllergens: ['milk', 'lactose', 'gluten'] },
  'soup-30': { preparationTime: 15, cookingTime: 25, commonAllergens: ['milk', 'lactose'], note: 'Friss, élénk spenótkrémleves' },
  'soup-31': { preparationTime: 10, cookingTime: 25, commonAllergens: [] },
  'soup-32': { preparationTime: 10, cookingTime: 20, commonAllergens: [] },
  'soup-33': { preparationTime: 10, cookingTime: 22, commonAllergens: [] },
  'soup-34': { preparationTime: 15, cookingTime: 40, restingTime: 10, commonAllergens: ['nuts'] },
  'soup-35': { preparationTime: 12, cookingTime: 26, commonAllergens: [] },
  'soup-36': { preparationTime: 15, cookingTime: 0, restingTime: 30, commonAllergens: [] },
  'soup-37': { preparationTime: 15, cookingTime: 25, commonAllergens: [] },
  'soup-38': { preparationTime: 15, cookingTime: 32, commonAllergens: [] },
  'soup-39': { preparationTime: 15, cookingTime: 25, restingTime: 15, commonAllergens: ['nuts'] },
};

export const applySoupAudit = (recipe: Recipe): Recipe => {
  if (recipe.category !== 'soup') return recipe;

  const audit = soupAudit[recipe.id];
  if (!audit) throw new Error(`Missing soup audit metadata for ${recipe.id}`);

  const restingTime = audit.restingTime ?? 0;
  const totalTime = audit.preparationTime + audit.cookingTime + restingTime;

  return {
    ...recipe,
    note: audit.note ?? recipe.note,
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

export const auditedSoupIds = Object.keys(soupAudit);
