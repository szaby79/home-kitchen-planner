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
  'main-16': { preparationTime: 15, cookingTime: 55, restingTime: 5, commonAllergens: [], note: 'Fűszeres, ropogós bőrű csirkecomb sült burgonyával' },
  'main-17': { preparationTime: 15, cookingTime: 140, restingTime: 10, difficulty: 'medium', commonAllergens: ['gluten'], note: 'Lassan sült, mézes-mustáros oldalas friss kenyérrel' },
  'main-18': { preparationTime: 15, cookingTime: 35, commonAllergens: ['milk', 'lactose'], note: 'Pirult kolbász krémes, házi burgonyapürével' },
  'main-19': { preparationTime: 15, cookingTime: 35, commonAllergens: [], note: 'Szaftos, kolbászos paprikás krumpli egy lábasban' },
  'main-20': { preparationTime: 10, cookingTime: 20, commonAllergens: ['milk', 'lactose', 'gluten', 'egg'], note: 'Krémes túrós csusza ropogós szalonnával' },
  'main-21': { preparationTime: 15, cookingTime: 35, restingTime: 20, commonAllergens: ['gluten', 'egg'], note: 'Aranybarnára pirított káposzta fodros nagykockával' },
  'main-22': { preparationTime: 20, cookingTime: 90, difficulty: 'medium', commonAllergens: ['milk', 'lactose', 'gluten'], note: 'Lassan főtt sertéshús savanyú káposztával és tejföllel' },
  'main-23': { preparationTime: 15, cookingTime: 40, difficulty: 'medium', commonAllergens: [], note: 'Paradicsomos káposzta pirított darált hússal és rizzsel' },
  'main-28': { preparationTime: 15, cookingTime: 25, restingTime: 5, commonAllergens: ['milk', 'lactose'], note: 'Vajas-borsós rizs szaftos csirkemellkockákkal' },
  'main-29': { preparationTime: 15, cookingTime: 25, restingTime: 10, difficulty: 'medium', commonAllergens: ['fish', 'gluten'], note: 'Lisztes kérgű sült hekk citrommal és párolt rizzsel' },
  'main-30': { preparationTime: 20, cookingTime: 30, difficulty: 'medium', commonAllergens: ['fish', 'gluten', 'egg', 'milk', 'lactose'], note: 'Ropogós bundájú harcsafilé krémes burgonyapürével' },
  'main-31': { preparationTime: 30, cookingTime: 50, restingTime: 15, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'], note: 'Szaftos csirkepaprikással töltött, tejfölös palacsinta' },
  'main-32': { preparationTime: 15, cookingTime: 30, commonAllergens: ['milk', 'lactose'], note: 'Szaftos csirkemell krémes gombamártással és rizzsel' },
  'main-33': { preparationTime: 25, cookingTime: 45, difficulty: 'medium', commonAllergens: ['milk', 'lactose', 'gluten', 'egg'], note: 'Tejfölös-gombás sertésszelet friss nokedlivel' },
  'main-34': { preparationTime: 30, cookingTime: 40, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'], note: 'Rántott sertésborda sonkás-gombás milánói spagettivel' },
  'main-35': { preparationTime: 15, cookingTime: 45, commonAllergens: ['gluten', 'milk', 'lactose'], note: 'Lassan főtt marhahúsos paradicsomragu spagettivel' },
  'main-36': { preparationTime: 20, cookingTime: 40, restingTime: 15, difficulty: 'medium', commonAllergens: [], note: 'Sertéstarjából, fokhagymásan' },
  'main-37': { preparationTime: 25, cookingTime: 30, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'], note: 'Bundás hús tejföllel és sajttal' },
  'main-38': { preparationTime: 30, cookingTime: 165, difficulty: 'advanced', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'], note: 'Klasszikus ünnepi fogás' },
  'main-39': { preparationTime: 20, cookingTime: 165, restingTime: 10, difficulty: 'medium', commonAllergens: [], note: 'Sütőben készülő hétvégi étel' },
  'main-40': { preparationTime: 25, cookingTime: 55, restingTime: 10, difficulty: 'medium', commonAllergens: ['milk', 'lactose'], note: 'Tejfölös, darált húsos egytálétel' },
  'main-41': { preparationTime: 20, cookingTime: 55, restingTime: 10, difficulty: 'medium', commonAllergens: ['milk', 'lactose'], note: 'Könnyű, darált húsos rakottas' },
  'main-42': { preparationTime: 15, cookingTime: 70, restingTime: 10, difficulty: 'medium', commonAllergens: ['gluten', 'egg'], note: 'Egyszerű, egyedényes családi ebéd' },
  'main-43': { preparationTime: 15, cookingTime: 70, restingTime: 10, difficulty: 'medium', commonAllergens: [], note: 'Paprikás sertéshús rizzsel' },
  'main-44': { preparationTime: 15, cookingTime: 35, restingTime: 5, commonAllergens: ['gluten', 'egg'], note: 'Kolbászos-burgonyás egytálétel' },
  'main-45': { preparationTime: 15, cookingTime: 45, difficulty: 'medium', commonAllergens: ['gluten', 'egg'], note: 'Alföldi bográcsétel otthoni változatban' },
  'main-46': { preparationTime: 20, cookingTime: 20, difficulty: 'medium', commonAllergens: ['gluten', 'egg'], note: 'Klasszikus tavaszi fogás' },
  'main-47': { preparationTime: 10, cookingTime: 25, commonAllergens: ['gluten', 'egg'], note: 'Olcsó, gyors hétköznapi étel' },
  'main-48': { preparationTime: 20, cookingTime: 35, restingTime: 15, commonAllergens: ['gluten', 'egg'], note: 'Édeskés-sós magyar tésztaétel' },
  'main-49': { preparationTime: 25, cookingTime: 25, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'], note: 'Szalonnás felvidéki kedvenc' },
  'main-50': { preparationTime: 20, cookingTime: 40, difficulty: 'medium', commonAllergens: ['gluten', 'milk', 'lactose'], note: 'Zalai burgonyás étel pirított hagymával' },
  'main-57': { preparationTime: 25, cookingTime: 30, restingTime: 15, difficulty: 'medium', commonAllergens: ['gluten', 'egg'], note: 'Húsmentes, ropogós fogás' },
  'main-58': { preparationTime: 30, cookingTime: 105, restingTime: 15, difficulty: 'advanced', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'], note: 'Petrezselymes-zsemlés töltelékkel' },
  'main-59': { preparationTime: 20, cookingTime: 110, restingTime: 10, difficulty: 'medium', commonAllergens: [], note: 'Ünnepi magyar főétel' },
  'main-60': { preparationTime: 20, cookingTime: 30, difficulty: 'medium', commonAllergens: ['fish', 'milk', 'lactose', 'gluten', 'egg'], note: 'Paprikás hal klasszikus körettel' },
  'main-61': { preparationTime: 25, cookingTime: 55, difficulty: 'medium', commonAllergens: ['fish', 'milk', 'lactose'], note: 'Paprikás-tejfölös hal burgonyával' },
  'main-62': { preparationTime: 20, cookingTime: 45, difficulty: 'medium', commonAllergens: [], note: 'Szaftos hús paprikával és paradicsommal' },
  'main-63': { preparationTime: 20, cookingTime: 65, difficulty: 'medium', commonAllergens: [], note: 'Savanyú uborkás sertésragu' },
  'main-64': { preparationTime: 20, cookingTime: 30, difficulty: 'medium', commonAllergens: [], note: 'Hagymás máj főtt burgonyával' },
  'main-65': { preparationTime: 20, cookingTime: 160, restingTime: 10, difficulty: 'medium', commonAllergens: [], note: 'Hosszú főzésű magyar klasszikus' },
  'main-66': { preparationTime: 20, cookingTime: 220, restingTime: 10, difficulty: 'medium', commonAllergens: [], note: 'Sűrű szaftú, hagyományos étel' },
  'main-67': { preparationTime: 25, cookingTime: 190, difficulty: 'medium', commonAllergens: ['gluten', 'egg'], note: 'Lassan főtt ünnepi pörkölt' },
  'main-68': { preparationTime: 25, cookingTime: 35, difficulty: 'medium', commonAllergens: ['milk', 'lactose', 'gluten'], note: 'Karfiolos, sajtos sült csirke' },
  'main-69': { preparationTime: 20, cookingTime: 40, difficulty: 'medium', commonAllergens: ['milk', 'lactose', 'gluten'], note: 'Zöldbabos, tejfölös sertésragu' },
  'main-70': { preparationTime: 20, cookingTime: 140, restingTime: 10, difficulty: 'medium', commonAllergens: [], note: 'Ünnepi, ropogósra sült fogás' },
  'main-91': { preparationTime: 15, cookingTime: 30, commonAllergens: [], note: 'Vegán egytálétel sok zöldséggel' },
  'main-92': { preparationTime: 15, cookingTime: 30, commonAllergens: [], note: 'Vegán, tartalmas családi főétel' },
  'main-93': { preparationTime: 15, cookingTime: 65, commonAllergens: ['milk', 'lactose'], note: 'Vegetáriánus tepsis főétel' },
  'main-94': { preparationTime: 15, cookingTime: 30, commonAllergens: ['milk', 'lactose'], note: 'Vegetáriánus és keto tepsis vacsora' },
  'main-95': { preparationTime: 15, cookingTime: 25, restingTime: 3, difficulty: 'medium', commonAllergens: ['milk', 'lactose'], note: 'Keto családi főétel' },
  'main-96': { preparationTime: 10, cookingTime: 15, commonAllergens: ['milk', 'lactose', 'fish'], note: 'Gyors keto halétel' },
  'main-97': { preparationTime: 20, cookingTime: 25, difficulty: 'medium', commonAllergens: ['egg'], note: 'Könnyű keto egytálétel' },
  'main-98': { preparationTime: 15, cookingTime: 20, commonAllergens: ['soy'], note: 'Vegán és keto serpenyős étel' },
  'main-99': { preparationTime: 15, cookingTime: 35, difficulty: 'medium', commonAllergens: [], note: 'Vegán és keto fűszeres főétel' },
  'main-100': { preparationTime: 20, cookingTime: 20, restingTime: 5, commonAllergens: ['milk', 'lactose', 'egg'], note: 'Vegetáriánus és keto gyors vacsora' },
  'main-101': { preparationTime: 15, cookingTime: 25, restingTime: 5, commonAllergens: [], note: 'Vegán, tartalmas egyedényes főétel' },
  'main-102': { preparationTime: 25, cookingTime: 30, restingTime: 5, difficulty: 'medium', commonAllergens: ['nuts'], note: 'Vegán tepsis főétel ropogós dióval' },
  'main-103': { preparationTime: 20, cookingTime: 35, difficulty: 'medium', commonAllergens: [], note: 'Vegán és keto sült zöldséges főétel' },
  'main-104': { preparationTime: 15, cookingTime: 35, difficulty: 'medium', commonAllergens: ['milk', 'lactose', 'egg'], note: 'Vegetáriánus és keto paradicsomos tojásétel' },
  'main-105': { preparationTime: 25, cookingTime: 35, restingTime: 10, difficulty: 'advanced', commonAllergens: ['milk', 'lactose', 'egg'], note: 'Vegetáriánus és keto könnyű felfújt' },
  'main-106': { preparationTime: 15, cookingTime: 22, commonAllergens: ['milk', 'lactose'], note: 'Szaftos, caprese ízvilágú töltött portobello' },
  'main-107': { preparationTime: 15, cookingTime: 33, commonAllergens: [], note: 'Káposztás, marhahúsos egyserpenyős családi főétel' },
  'main-108': { preparationTime: 20, cookingTime: 12, commonAllergens: ['milk', 'lactose', 'nuts'], note: 'Friss pestós csirke könnyű cukkinimetélttel' },
  'main-109': { preparationTime: 15, cookingTime: 25, restingTime: 3, commonAllergens: ['milk', 'lactose'], note: 'Pirult sertésszűz krémes gombamártással' },
  'main-110': { preparationTime: 15, cookingTime: 27, commonAllergens: ['fish'], note: 'Mediterrán sült tőkehal paradicsommal és olívával' },
  'main-111': { preparationTime: 20, cookingTime: 40, restingTime: 10, difficulty: 'medium', commonAllergens: ['milk', 'lactose'], note: 'Szaftos marhahús könnyű karfiolpüré alatt' },
  'main-112': { preparationTime: 12, cookingTime: 24, commonAllergens: [], note: 'Paradicsomos fehérbab frissen fonnyasztott spenóttal' },
  'main-113': { preparationTime: 15, cookingTime: 20, commonAllergens: ['soy'], note: 'Pirult tempeh roppanós káposztával és lime-mal' },
  'main-114': { preparationTime: 20, cookingTime: 40, difficulty: 'medium', commonAllergens: [], note: 'Mediterrán zöldségekkel töltött, elősütött cukkini' },
  'main-115': { preparationTime: 15, cookingTime: 35, commonAllergens: ['milk', 'lactose'], note: 'Krémes hajdina pirult gombával és parmezánnal' },
  'main-116': { preparationTime: 20, cookingTime: 11, commonAllergens: ['milk', 'lactose'], note: 'Pirult halloumi friss, citromos karfioltabuléval' },
  'main-117': { preparationTime: 15, cookingTime: 55, restingTime: 5, commonAllergens: [], note: 'Ropogós bőrű rozmaringos csirkecomb zöldbabbal' },
  'main-118': { preparationTime: 25, cookingTime: 63, restingTime: 15, difficulty: 'medium', commonAllergens: ['milk', 'lactose'], note: 'Jól szeletelhető, tészta nélküli cukkinilasagne' },
  'main-119': { preparationTime: 20, cookingTime: 35, restingTime: 3, commonAllergens: ['milk', 'lactose'], note: 'Szaftos sertéskaraj krémes, köményes káposztával' },
  'main-120': { preparationTime: 20, cookingTime: 33, restingTime: 5, commonAllergens: ['egg'], note: 'Sütőben pirult, szaftos pulykafasírt spenóttal' },
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
