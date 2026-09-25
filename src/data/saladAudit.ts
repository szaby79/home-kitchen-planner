import { FoodRestriction, Recipe } from '@/types/recipe';

type SaladAudit = {
  preparationTime: number;
  cookingTime: number;
  restingTime?: number;
  commonAllergens: FoodRestriction[];
  note: string;
  englishNote: string;
  hungarianSteps: string[];
  englishSteps: string[];
};

const saladAudit: Record<string, SaladAudit> = {
  'salad-1': {
    preparationTime: 15, cookingTime: 10, restingTime: 5, commonAllergens: ['milk', 'lactose', 'gluten'],
    note: 'Tartalmas joghurtos Cézár-saláta frissen sült csirkével', englishNote: 'Filling yogurt Caesar salad with freshly cooked chicken',
    hungarianSteps: [
      'A csirkemellet vágd egyforma, körülbelül 2 cm-es csíkokra, sózd meg. A római salátát mosd meg, majd szárítsd le alaposan, hogy az öntet ne vizeződjön fel.',
      'Egy evőkanál olajon, közepesen erős lángon süsd a csirkét 8–10 percig, közben többször fordítsd át. A legvastagabb darab közepe érje el a 74 °C-ot, majd tedd félre 5 percre.',
      'Közben a kenyérkockákat száraz serpenyőben, gyakran megforgatva pirítsd 4–5 percig aranybarnára. Hagyd kissé hűlni, hogy ropogós maradjon.',
      'A joghurtot keverd össze fél citrom levével, a zúzott fokhagymával, a maradék olajjal és egy csipet sóval. Kóstold meg, és szükség szerint adj hozzá még kevés citromlevet.',
      'A salátát csak közvetlenül tálalás előtt forgasd össze az öntettel, majd tedd rá a csirkét, a kenyérkockát és a parmezánt. Munkába az öntetet külön, a salátát pedig hűtve vidd.',
    ],
    englishSteps: [
      'Cut the chicken into even strips about 2 cm thick and season with salt. Wash the romaine and dry it thoroughly so the dressing does not become watery.',
      'Cook the chicken in 1 tablespoon oil over medium-high heat for 8–10 minutes, turning several times. The centre of the thickest piece should reach 74 °C. Set aside for 5 minutes.',
      'Meanwhile, toast the bread cubes in a dry pan for 4–5 minutes, turning often, until golden. Let them cool slightly so they stay crisp.',
      'Mix the yogurt with the juice of half the lemon, crushed garlic, remaining oil, and a pinch of salt. Taste and add a little more lemon juice if needed.',
      'Toss the lettuce with the dressing only just before serving, then add the chicken, croutons, and Parmesan. For work, pack the dressing separately and keep the salad chilled.',
    ],
  },
  'salad-2': {
    preparationTime: 15, cookingTime: 0, commonAllergens: ['milk', 'lactose'],
    note: 'Friss, ropogós görög saláta fetával és olívabogyóval', englishNote: 'Fresh, crisp Greek salad with feta and olives',
    hungarianSteps: [
      'Mosd meg és szárítsd le a zöldségeket. A paradicsomot vágd cikkekre, az uborkát félkarikákra, a paprikát falatnyi csíkokra.',
      'A lilahagymát szeleteld nagyon vékonyra. Ha túl erősnek érzed, áztasd 5 percre hideg vízbe, majd csepegtesd le.',
      'Tedd a paradicsomot, uborkát, paprikát, hagymát és olívabogyót egy nagy tálba.',
      'Az olívaolajat keverd össze fél citrom levével és az oregánóval. Először csak az öntet kétharmadát add a zöldségekhez, majd óvatosan forgasd össze.',
      'Morzsold rá a fetát, kóstold meg, és csak szükség esetén adj hozzá további öntetet vagy sót, mert a feta és az olívabogyó is sós lehet.',
    ],
    englishSteps: [
      'Wash and dry the vegetables. Cut the tomatoes into wedges, the cucumber into half-moons, and the peppers into bite-sized strips.',
      'Slice the red onion very thinly. If it tastes too strong, soak it in cold water for 5 minutes, then drain.',
      'Put the tomatoes, cucumber, peppers, onion, and olives in a large bowl.',
      'Mix the olive oil with the juice of half the lemon and the oregano. Add only two-thirds of the dressing at first, then toss gently.',
      'Crumble over the feta, taste, and add more dressing or salt only if needed because the feta and olives may already be salty.',
    ],
  },
  'salad-3': {
    preparationTime: 12, cookingTime: 0, commonAllergens: ['fish', 'milk', 'lactose'],
    note: 'Gyors tonhalas-kukoricás saláta friss joghurtos öntettel', englishNote: 'Quick tuna and corn salad with a fresh yogurt dressing',
    hungarianSteps: [
      'A tonhalat és a kukoricát öntsd külön szűrőbe, és hagyd alaposan lecsepegni, hogy a saláta ne legyen vizes.',
      'A jégsalátát mosd meg és szárítsd le, majd tépd falatnyi darabokra. A paradicsomot és az uborkát vágd hasonló méretű darabokra.',
      'A joghurtot keverd össze fél citrom levével és kevés sóval. Kóstold meg, és szükség szerint adj hozzá még citromlevet.',
      'Tedd a zöldségeket, a tonhalat és a kukoricát egy nagy tálba, majd óvatosan forgasd össze, hogy a tonhal ne törjön teljesen péppé.',
      'Az öntetet csak tálalás előtt add hozzá. Munkába külön dobozban vidd, és a tonhalas salátát jégakkuval ellátott hűtőtáskában tartsd.',
    ],
    englishSteps: [
      'Drain the tuna and corn separately and thoroughly so the salad does not become watery.',
      'Wash and dry the iceberg lettuce, then tear it into bite-sized pieces. Cut the tomatoes and cucumber into similarly sized pieces.',
      'Mix the yogurt with the juice of half the lemon and a little salt. Taste and add more lemon juice if needed.',
      'Put the vegetables, tuna, and corn in a large bowl and toss gently so the tuna does not break down completely.',
      'Add the dressing only just before serving. Pack it separately for work and keep the tuna salad in an insulated bag with an ice pack.',
    ],
  },
  'salad-4': {
    preparationTime: 15, cookingTime: 12, restingTime: 5, commonAllergens: [],
    note: 'Friss avokádós saláta szaftos, lime-os csirkével', englishNote: 'Fresh avocado salad with juicy lime-dressed chicken',
    hungarianSteps: [
      'A csirkemellet vágd négy hasonló vastagságú, vékony szeletre, majd sózd és borsozd. A salátakeveréket mosd meg és szárítsd le.',
      'Egy evőkanál olívaolajon, közepesen erős lángon süsd a csirkét oldalanként 4–6 percig, a vastagságától függően. A közepe érje el a 74 °C-ot, majd pihentesd 5 percig.',
      'Közben felezd el a paradicsomot, karikázd fel az uborkát. Az avokádót csak a végén vágd fel, és forgasd össze fél lime levével, hogy lassabban barnuljon.',
      'A maradék olívaolajat keverd össze a maradék lime levével és egy csipet sóval. A pihentetett csirkét szeleteld fel.',
      'Rendezd tálba a zöldségeket és az avokádót, tedd rá a csirkét, majd locsold meg az öntettel. Frissen a legjobb; munkába hűtve vidd.',
    ],
    englishSteps: [
      'Cut the chicken breast into four thin pieces of similar thickness, then season with salt and pepper. Wash and dry the salad leaves.',
      'Cook the chicken in 1 tablespoon olive oil over medium-high heat for 4–6 minutes per side, depending on thickness. The centre should reach 74 °C. Rest for 5 minutes.',
      'Meanwhile, halve the tomatoes and slice the cucumber. Cut the avocado last and toss with the juice of half the lime to slow browning.',
      'Mix the remaining olive oil with the remaining lime juice and a pinch of salt. Slice the rested chicken.',
      'Arrange the vegetables and avocado in a bowl, add the chicken, and drizzle with the dressing. It is best fresh; keep it chilled if taking it to work.',
    ],
  },
  'salad-5': {
    preparationTime: 12, cookingTime: 10, restingTime: 10, commonAllergens: ['egg', 'milk', 'lactose'],
    note: 'Ropogós zöldsaláta főtt tojással és könnyű joghurtos öntettel', englishNote: 'Crisp green salad with boiled eggs and a light yogurt dressing',
    hungarianSteps: [
      'Tedd a tojásokat egy lábasba, önts rájuk hideg vizet, majd forrald fel. Forrástól számítva főzd 9–10 percig.',
      'A tojásokat tedd hideg vízbe legalább 5 percre, majd hámozd meg és vágd negyedekre.',
      'Közben mosd meg és szárítsd le a salátát. A retket és uborkát szeleteld fel, az újhagymát karikázd vékonyra.',
      'A joghurtot keverd össze a mustárral, a citromlével és kevés sóval. Kóstold meg, mielőtt további mustárt vagy sót adnál hozzá.',
      'A zöldségeket forgasd össze az öntettel, majd óvatosan rendezd rá a tojást. Ha nem rögtön eszitek meg, az öntetet külön és az egészet hűtve tartsd.',
    ],
    englishSteps: [
      'Put the eggs in a saucepan, cover with cold water, and bring to a boil. Cook for 9–10 minutes once the water boils.',
      'Transfer the eggs to cold water for at least 5 minutes, then peel and quarter them.',
      'Meanwhile, wash and dry the salad leaves. Slice the radishes and cucumber and thinly slice the spring onions.',
      'Mix the yogurt with the mustard, lemon juice, and a little salt. Taste before adding more mustard or salt.',
      'Toss the vegetables with the dressing, then gently arrange the eggs on top. If not serving immediately, keep the dressing separate and everything chilled.',
    ],
  },
  'salad-6': {
    preparationTime: 10, cookingTime: 0, commonAllergens: ['milk', 'lactose'],
    note: 'Egyszerű caprese érett paradicsommal és mozzarellával', englishNote: 'Simple caprese with ripe tomatoes and mozzarella',
    hungarianSteps: [
      'Mosd meg a paradicsomot és a bazsalikomot, majd szárítsd le. A mozzarellát csepegtesd le alaposan.',
      'A paradicsomot és a mozzarellát vágd hasonló, körülbelül fél centi vastag szeletekre.',
      'Felváltva rendezd egy tálra a paradicsomot és a mozzarellát, a bazsalikomleveleket pedig tűzd közéjük.',
      'Locsold meg az olívaolajjal és a balzsamecettel. Először csak kevés balzsamecetet használj, hogy ne nyomja el a paradicsom ízét.',
      'Közvetlenül tálalás előtt sózd és borsozd, így a paradicsom nem enged túl sok levet. Frissen tálald.',
    ],
    englishSteps: [
      'Wash the tomatoes and basil and pat them dry. Drain the mozzarella thoroughly.',
      'Cut the tomatoes and mozzarella into similar slices about 5 mm thick.',
      'Alternate the tomato and mozzarella on a serving plate and tuck the basil leaves between them.',
      'Drizzle with the olive oil and balsamic vinegar. Start with only a little vinegar so it does not overpower the tomatoes.',
      'Season with salt and pepper only just before serving so the tomatoes do not release too much liquid. Serve fresh.',
    ],
  },
  'salad-7': {
    preparationTime: 15, cookingTime: 15, restingTime: 5, commonAllergens: ['nuts', 'milk', 'lactose'],
    note: 'Ropogós almás-diós saláta pihentetett sült csirkével', englishNote: 'Crisp apple and walnut salad with rested cooked chicken',
    hungarianSteps: [
      'A csirkemellet vágd négy hasonló vastagságú szeletre, és sózd meg. A salátakeveréket mosd meg, majd szárítsd le alaposan.',
      'Melegítsd fel az olajat, és a csirkét közepesen erős lángon süsd oldalanként 4–6 percig. A közepe érje el a 74 °C-ot, majd pihentesd 5 percig és szeleteld fel.',
      'Közben az almát vágd vékony cikkekre, és forgasd össze kevés citromlével. A zellerszárat szeleteld fel, a diót pedig száraz serpenyőben pirítsd 2–3 percig; ne hagyd megégni.',
      'A joghurtot keverd össze a maradék citromlével és egy csipet sóval. Kóstold meg, és szükség szerint igazíts az ízén.',
      'Rendezd tálba a salátát, almát, zellert és csirkét, majd szórd rá a kihűlt diót. Az öntetet csak tálaláskor add hozzá; munkába mindent hűtve vigyél.',
    ],
    englishSteps: [
      'Cut the chicken breast into four pieces of similar thickness and season with salt. Wash the salad leaves and dry them thoroughly.',
      'Heat the oil and cook the chicken over medium-high heat for 4–6 minutes per side. The centre should reach 74 °C. Rest for 5 minutes, then slice.',
      'Meanwhile, cut the apples into thin wedges and toss with a little lemon juice. Slice the celery and toast the walnuts in a dry pan for 2–3 minutes without letting them burn.',
      'Mix the yogurt with the remaining lemon juice and a pinch of salt. Taste and adjust as needed.',
      'Arrange the leaves, apple, celery, and chicken in a bowl and scatter over the cooled walnuts. Add the dressing only when serving and keep everything chilled for work.',
    ],
  },
  'salad-8': {
    preparationTime: 10, cookingTime: 0, restingTime: 10, commonAllergens: ['gluten'],
    note: 'Citromos kuszkuszsaláta sok friss zöldséggel', englishNote: 'Lemony couscous salad with plenty of fresh vegetables',
    hungarianSteps: [
      'Tedd a kuszkuszt hőálló tálba a sóval. Öntsd rá a 3 dl forrásban lévő vizet, fedd le szorosan, és hagyd állni 8–10 percig.',
      'Villával alaposan lazítsd fel, terítsd szét a tálban, és hagyd langyosra hűlni, hogy a zöldségek ropogósak maradjanak.',
      'Közben a paprikát és uborkát vágd kis kockákra, a paradicsomot felezd, a petrezselymet aprítsd fel.',
      'A citrom levét keverd össze az olívaolajjal. Először csak az öntet kétharmadát add a kuszkuszhoz, majd forgasd össze a zöldségekkel.',
      'Kóstold meg, és szükség szerint add hozzá a maradék öntetet vagy kevés sót. Lefedve, hűtőben tárold; munkába hűtőtáskában vidd.',
    ],
    englishSteps: [
      'Put the couscous in a heatproof bowl with the salt. Pour over the 300 ml boiling water, cover tightly, and leave for 8–10 minutes.',
      'Fluff thoroughly with a fork, spread it out in the bowl, and cool until lukewarm so the vegetables stay crisp.',
      'Meanwhile, dice the peppers and cucumber, halve the tomatoes, and finely chop the parsley.',
      'Mix the lemon juice with the olive oil. Add only two-thirds of the dressing to the couscous at first, then fold in the vegetables.',
      'Taste and add the remaining dressing or a little salt if needed. Store covered in the refrigerator and use an insulated bag for work.',
    ],
  },
  'salad-9': {
    preparationTime: 12, cookingTime: 0, restingTime: 10, commonAllergens: [],
    note: 'Színes babos-kukoricás saláta friss lime-os öntettel', englishNote: 'Colourful bean and corn salad with a fresh lime dressing',
    hungarianSteps: [
      'A babot öntsd szűrőbe, öblítsd át hideg vízzel, majd a kukoricával együtt csepegtesd le alaposan.',
      'A paprikát vágd kis kockákra, a paradicsomot felezd, a lilahagymát és a petrezselymet aprítsd finomra.',
      'A lime levét keverd össze az olívaolajjal és kevés sóval. Kóstold meg: a lime savasságától függően nem biztos, hogy az egész levére szükség lesz.',
      'Tedd az összes hozzávalót egy nagy tálba, öntsd rá az öntetet, és óvatosan forgasd össze, hogy a bab ne törjön össze.',
      'Pihentesd 10 percig, majd kóstold meg újra. Zárt dobozban, hűtve munkába is vihető.',
    ],
    englishSteps: [
      'Drain the beans in a sieve, rinse under cold water, then drain thoroughly together with the corn.',
      'Dice the peppers, halve the tomatoes, and finely chop the red onion and parsley.',
      'Mix the lime juice with the olive oil and a little salt. Taste it: depending on the lime, you may not need all the juice.',
      'Put everything in a large bowl, pour over the dressing, and toss gently so the beans do not break apart.',
      'Rest for 10 minutes, then taste again. It can be packed for work in a sealed container and kept chilled.',
    ],
  },
  'salad-10': {
    preparationTime: 15, cookingTime: 12, restingTime: 20, commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Laktató sonkás-sajtos tésztasaláta munkába vagy könnyű vacsorára', englishNote: 'Filling ham and cheese pasta salad for work or an easy dinner',
    hungarianSteps: [
      'A tésztát főzd meg bő, sós vízben a csomagoláson jelzett ideig. Akkor jó, ha puha, de még van tartása.',
      'Szűrd le, öblítsd át röviden hideg vízzel, majd terítsd szét egy nagy tálban, hogy teljesen kihűljön. Meleg tésztához ne add hozzá a sonkát és a sajtot.',
      'Közben a sonkát, sajtot és uborkát vágd hasonló méretű kis kockákra, a kukoricát csepegtesd le. A joghurtot keverd össze a mustárral és kevés sóval.',
      'A kihűlt tésztát forgasd össze a sonkával, sajttal, kukoricával, uborkával és az öntettel. Ellenőrizd a tészta csomagolását, ha tojásallergiát kell kerülni.',
      'Tedd hűtőbe legalább 20 percre, majd kóstold meg. Munkába jégakkuval ellátott hűtőtáskában vidd, és fogyasztásig tartsd hidegen.',
    ],
    englishSteps: [
      'Cook the pasta in plenty of salted water for the time stated on the packet. It should be tender but still have a little bite.',
      'Drain, rinse briefly under cold water, then spread in a large bowl to cool completely. Do not add the ham and cheese to warm pasta.',
      'Meanwhile, dice the ham, cheese, and cucumber into similarly sized pieces and drain the corn. Mix the yogurt with the mustard and a little salt.',
      'Toss the cooled pasta with the ham, cheese, corn, cucumber, and dressing. Check the pasta label if egg allergy needs to be avoided.',
      'Refrigerate for at least 20 minutes, then taste. For work, use an insulated bag with an ice pack and keep it cold until eating.',
    ],
  },
};

export const auditedSaladIds = Object.keys(saladAudit);
export const auditedSaladEnglishInstructions = Object.fromEntries(
  Object.entries(saladAudit).map(([id, audit]) => [id, audit.englishSteps.map((step, index) => `${index + 1}. ${step}`).join('\n\n')]),
);
export const auditedSaladEnglishNotes = Object.fromEntries(
  Object.values(saladAudit).map(audit => [audit.note, audit.englishNote]),
);

export const applySaladAudit = (recipe: Recipe): Recipe => {
  if (recipe.category !== 'salad') return recipe;

  const audit = saladAudit[recipe.id];
  if (!audit) throw new Error(`Missing salad audit metadata for ${recipe.id}`);

  const restingTime = audit.restingTime ?? 0;
  const totalTime = audit.preparationTime + audit.cookingTime + restingTime;

  return {
    ...recipe,
    description: audit.hungarianSteps.map((step, index) => `${index + 1}. ${step}`).join('\n\n'),
    note: audit.note,
    preparationTime: audit.preparationTime,
    cookingTime: audit.cookingTime,
    restingTime,
    totalTime,
    difficulty: 'easy',
    commonAllergens: audit.commonAllergens,
    quickMeal: totalTime <= 30,
    qualityAuditStatus: 'code-reviewed',
  };
};
