import { FoodRestriction, Recipe } from '@/types/recipe';

type SideAudit = {
  preparationTime: number;
  cookingTime: number;
  restingTime?: number;
  commonAllergens: FoodRestriction[];
  note: string;
  englishNote: string;
  hungarianSteps: string[];
  englishSteps: string[];
};

const sideAudit: Record<string, SideAudit> = {
  'side-1': {
    preparationTime: 12, cookingTime: 20, commonAllergens: ['milk', 'lactose'],
    note: 'Vajas, friss petrezselymes burgonya egyszerű családi köretnek', englishNote: 'Buttery parsley potatoes for an easy family side dish',
    hungarianSteps: [
      'Hámozd meg a burgonyát, és vágd egyforma, 3–4 cm-es darabokra. A petrezselymet mosd meg, szárítsd le és aprítsd fel.',
      'Tedd a burgonyát lábasba, önts rá annyi hideg vizet, amennyi éppen ellepi, majd add hozzá a sót.',
      'Forrald fel, majd közepes lángon főzd 15–20 percig. Akkor jó, ha a villa könnyen belemegy, de a darabok még nem esnek szét.',
      'Szűrd le alaposan, tedd vissza a meleg lábasba, és hagyd fél percig kigőzölögni, hogy ne legyen vizes a köret.',
      'Add hozzá a vajat és a petrezselymet, majd óvatosan forgasd össze. Kóstold meg, és melegen tálald.',
    ],
    englishSteps: [
      'Peel the potatoes and cut them into even 3–4 cm pieces. Rinse, dry, and finely chop the parsley.',
      'Put the potatoes in a saucepan, add just enough cold water to cover them, then add the salt.',
      'Bring to a boil and cook over medium heat for 15–20 minutes. They are ready when a fork slides in easily but the pieces are not falling apart.',
      'Drain thoroughly, return them to the warm pan, and let the steam escape for 30 seconds so the side dish does not become watery.',
      'Add the butter and parsley and toss gently. Taste and serve warm.',
    ],
  },
  'side-2': {
    preparationTime: 12, cookingTime: 22, commonAllergens: ['milk', 'lactose'],
    note: 'Selymes burgonyapüré meleg tejjel és vajjal', englishNote: 'Silky mashed potatoes with warm milk and butter',
    hungarianSteps: [
      'Hámozd meg a burgonyát, vágd egyforma, 3 cm-es kockákra, és tedd hideg, sós vízbe.',
      'Forrald fel, majd közepes lángon főzd 18–22 percig. Akkor jó, ha a burgonya villával könnyen szétnyomható.',
      'Közben melegítsd fel a tejet, de ne forrald. A burgonyát szűrd le alaposan, majd a meleg lábasban hagyd fél percig kigőzölögni.',
      'Burgonyatörővel törd simára. Botmixert ne használj, mert attól a püré könnyen ragacsossá válik.',
      'Dolgozd bele a vajat, majd a meleg tejet több részletben. Kóstold meg, és csak annyi további tejet adj hozzá, amennyitől kellemesen krémes lesz.',
    ],
    englishSteps: [
      'Peel the potatoes, cut them into even 3 cm cubes, and place them in cold salted water.',
      'Bring to a boil and cook over medium heat for 18–22 minutes. They are ready when they crush easily with a fork.',
      'Meanwhile, warm the milk without boiling it. Drain the potatoes thoroughly and let them steam in the warm pan for 30 seconds.',
      'Mash until smooth with a potato masher. Do not use a blender because it can make the potatoes gluey.',
      'Work in the butter, then add the warm milk gradually. Taste and add only enough extra milk to reach a pleasantly creamy texture.',
    ],
  },
  'side-3': {
    preparationTime: 5, cookingTime: 15, restingTime: 10, commonAllergens: [],
    note: 'Pergős párolt rizs pontos vízmennyiséggel', englishNote: 'Fluffy steamed rice with a measured amount of water',
    hungarianSteps: [
      'A rizst öblítsd át szűrőben hideg vízzel, amíg a lefolyó víz majdnem tiszta, majd csepegtesd le.',
      'Melegítsd fel az olajat egy jól záródó fedővel rendelkező lábasban. Add hozzá a rizst, és kevergetve pirítsd 1 percig.',
      'Öntsd fel a kimért 6 dl vízzel, add hozzá a sót, és forrald fel.',
      'Fedd le, vedd a legkisebb lángra, és főzd 12 percig. Közben ne emeld fel a fedőt és ne keverd meg.',
      'Zárd el a hőt, hagyd fedő alatt pihenni 10 percig, majd villával óvatosan lazítsd fel. Ha a rizsed csomagolása más vízarányt ír, azt kövesd.',
    ],
    englishSteps: [
      'Rinse the rice in a sieve under cold water until the water runs almost clear, then drain.',
      'Heat the oil in a saucepan with a tight-fitting lid. Add the rice and stir for 1 minute.',
      'Pour in the measured 600 ml water, add the salt, and bring to a boil.',
      'Cover, reduce to the lowest heat, and cook for 12 minutes. Do not lift the lid or stir during cooking.',
      'Turn off the heat, leave covered for 10 minutes, then fluff gently with a fork. Follow the packet ratio if your type of rice requires a different amount of water.',
    ],
  },
  'side-4': {
    preparationTime: 10, cookingTime: 15, commonAllergens: ['gluten', 'egg'],
    note: 'Puha házi nokedli rövid, biztos elkészítéssel', englishNote: 'Tender homemade Hungarian dumplings with clear, reliable steps',
    hungarianSteps: [
      'Tegyél fel egy nagy fazék enyhén sós vizet forrni. Készíts a közelébe szűrőt vagy szűrőkanalat.',
      'A lisztet, tojást és sót keverd össze. A vizet fokozatosan add hozzá, amíg sűrűn folyó, ragacsos tésztát kapsz; csak addig keverd, amíg összeáll.',
      'A tésztát nokedliszaggatóval, kisebb adagokban szaggasd a gyöngyözve forró vízbe, hogy a víz ne hűljön le túlságosan.',
      'Amikor a nokedlik feljönnek a felszínre, főzd őket még körülbelül 1 percig. Vágj félbe egyet: a közepe ne legyen lisztes vagy nyers.',
      'Szedd ki, csepegtesd le alaposan, és forgasd össze az olajjal, hogy ne tapadjon össze. Frissen tálald.',
    ],
    englishSteps: [
      'Bring a large pot of lightly salted water to a boil. Set a sieve or slotted spoon nearby.',
      'Mix the flour, eggs, and salt. Add the water gradually until you have a thick, sticky batter; mix only until combined.',
      'Press the batter through a dumpling maker into gently boiling water in small batches so the water does not cool too much.',
      'Once the dumplings rise to the surface, cook for about 1 minute more. Cut one open: the centre should not look floury or raw.',
      'Remove, drain thoroughly, and toss with the oil so they do not stick together. Serve fresh.',
    ],
  },
  'side-5': {
    preparationTime: 5, cookingTime: 20, restingTime: 5, commonAllergens: ['gluten', 'egg'],
    note: 'Aranybarnára pirított, pergős tarhonya', englishNote: 'Golden toasted egg barley with a fluffy texture',
    hungarianSteps: [
      'Mérd ki a vizet, és készítsd a lábas mellé. Melegítsd fel az olajat közepes lángon.',
      'Add hozzá a tarhonyát, és folyamatosan keverve pirítsd 4–6 percig, amíg egyenletesen világosbarna lesz. Ne hagyd sötétre égni.',
      'Vedd kisebbre a lángot, és óvatosan öntsd hozzá a vizet, mert a forró edény erősen gőzölhet. Add hozzá a sót, majd forrald fel.',
      'Fedd le, és a legkisebb lángon főzd 12–15 percig. A vége felé ellenőrizd: akkor jó, ha puha és felszívta a vizet.',
      'Zárd el, pihentesd fedő alatt 5 percig, majd villával lazítsd fel. Ha még kemény, adj hozzá kevés forró vizet, és főzd további néhány percig.',
    ],
    englishSteps: [
      'Measure the water and keep it beside the pan. Heat the oil over medium heat.',
      'Add the egg barley and toast for 4–6 minutes, stirring constantly, until evenly light golden. Do not let it burn dark.',
      'Reduce the heat and carefully pour in the water because the hot pan may steam vigorously. Add the salt and bring to a boil.',
      'Cover and cook over the lowest heat for 12–15 minutes. Check near the end: it should be tender and the water should be absorbed.',
      'Turn off the heat, rest covered for 5 minutes, then fluff with a fork. If still firm, add a splash of hot water and cook a few minutes longer.',
    ],
  },
  'side-6': {
    preparationTime: 15, cookingTime: 22, commonAllergens: [],
    note: 'Rusztikus tört burgonya lassan pirított hagymával', englishNote: 'Rustic crushed potatoes with gently browned onions',
    hungarianSteps: [
      'Hámozd meg a burgonyát, vágd egyforma, 3 cm-es kockákra, és tedd hideg, sós vízbe. A hagymát aprítsd fel.',
      'Forrald fel a burgonyát, majd közepes lángon főzd 18–22 percig, amíg villával könnyen szétnyomható.',
      'Közben melegítsd fel az olajat, és a hagymát közepes-kis lángon, gyakran megkeverve pirítsd 10–12 percig. Legyen aranybarna, ne megégett.',
      'A burgonyát szűrd le alaposan, majd törd össze rusztikusra; maradhatnak benne kisebb darabok.',
      'Forgasd bele a pirított hagymát az olajával együtt. Kóstold meg, szükség szerint sózd, és melegen tálald.',
    ],
    englishSteps: [
      'Peel the potatoes, cut them into even 3 cm cubes, and place them in cold salted water. Finely chop the onions.',
      'Bring the potatoes to a boil and cook over medium heat for 18–22 minutes, until they crush easily with a fork.',
      'Meanwhile, heat the oil and cook the onions over medium-low heat for 10–12 minutes, stirring often. They should be golden, not burnt.',
      'Drain the potatoes thoroughly, then crush them roughly, leaving a few small pieces for texture.',
      'Fold in the browned onions with their oil. Taste, add salt if needed, and serve warm.',
    ],
  },
  'side-7': {
    preparationTime: 10, cookingTime: 45, commonAllergens: [],
    note: 'Kívül pirult, belül puha sütőburgonya', englishNote: 'Oven-roasted potatoes that are crisp outside and tender inside',
    hungarianSteps: [
      'Melegítsd elő a sütőt 210 °C-ra, légkeverésnél 200 °C-ra. Bélelj ki egy nagy tepsit sütőpapírral.',
      'A burgonyát alaposan mosd meg, szükség szerint hámozd meg, majd vágd egyforma, körülbelül 3 cm-es gerezdekre. Töröld szárazra.',
      'Forgasd össze az olajjal, sóval és pirospaprikával úgy, hogy minden darabot vékonyan bevonjon.',
      'Terítsd egy rétegben a tepsire, hagyj helyet a darabok között, majd süsd 35–45 percig. Félidőben fordítsd át.',
      'Akkor jó, ha kívül aranybarna, belül pedig villával könnyen átszúrható. Kóstold meg, és frissen tálald.',
    ],
    englishSteps: [
      'Heat the oven to 210 °C, or 200 °C fan. Line a large baking tray with parchment.',
      'Scrub the potatoes well, peel if needed, and cut into even wedges about 3 cm thick. Pat them dry.',
      'Toss with the oil, salt, and paprika until every piece has a thin coating.',
      'Spread in a single layer with space between the pieces and roast for 35–45 minutes, turning halfway through.',
      'They are ready when golden outside and easily pierced with a fork inside. Taste and serve fresh.',
    ],
  },
  'side-8': {
    preparationTime: 10, cookingTime: 15, commonAllergens: ['milk', 'lactose'],
    note: 'Színes, enyhén roppanós zöldségköret vajjal', englishNote: 'Colourful, lightly crisp mixed vegetables finished with butter',
    hungarianSteps: [
      'Hámozd meg a sárgarépát, és vágd vékony karikákra. A brokkolit szedd hasonló méretű, kisebb rózsákra.',
      'Tedd a répát egy széles serpenyőbe 4 evőkanál vízzel. Fedd le, és közepes-kis lángon párold 5 percig.',
      'Add hozzá a brokkolit és a zöldborsót, majd fedd vissza. Ha a serpenyő kiszáradt, adj hozzá még 1–2 evőkanál vizet.',
      'Párold további 6–8 percig, amíg a zöldségek megpuhulnak, de még van egy kis tartásuk. A brokkoli maradjon élénk színű.',
      'Öntsd le az esetleges maradék vizet, keverd hozzá a vajat és a sót, majd kóstold meg és rögtön tálald.',
    ],
    englishSteps: [
      'Peel the carrots and cut them into thin rounds. Divide the broccoli into small, similarly sized florets.',
      'Put the carrots in a wide pan with 4 tablespoons water. Cover and steam over medium-low heat for 5 minutes.',
      'Add the broccoli and peas and cover again. If the pan has dried out, add another 1–2 tablespoons water.',
      'Steam for another 6–8 minutes, until tender but still with a little bite. The broccoli should remain brightly coloured.',
      'Pour off any remaining water, stir in the butter and salt, then taste and serve straight away.',
    ],
  },
  'side-9': {
    preparationTime: 15, cookingTime: 40, restingTime: 10, commonAllergens: [],
    note: 'Kellemesen édes-savanyú párolt lilakáposzta almával', englishNote: 'Gently sweet-and-sour braised red cabbage with apple',
    hungarianSteps: [
      'Szeleteld a káposztát vékonyra, szórd meg a sóval, és hagyd állni 10 percig. Közben az almát hámozd meg és reszeld le.',
      'Egy nagy lábasban melegítsd fel az olajat, szórd bele a cukrot, és közepes-kis lángon hagyd világos karamellszínűre olvadni. Ne várd meg, amíg sötét és keserű lesz.',
      'Add hozzá óvatosan a káposztát és az almát, mert a nedvességtől gőz csaphat fel. Keverd át 2–3 percig.',
      'Önts alá fél deci vizet, fedd le, és kis lángon párold 30–35 percig. Időnként keverd meg, és ha kiszáradna, adj hozzá kevés vizet.',
      'Amikor puha, de még nem pépes, add hozzá az ecetet több részletben. Kóstold meg, és az alma édességéhez igazítsd az édes-savanyú egyensúlyt.',
    ],
    englishSteps: [
      'Shred the cabbage finely, sprinkle with the salt, and leave for 10 minutes. Meanwhile, peel and grate the apple.',
      'Heat the oil in a large saucepan, add the sugar, and let it melt over medium-low heat until pale caramel. Do not let it turn dark and bitter.',
      'Carefully add the cabbage and apple because the moisture may release hot steam. Stir for 2–3 minutes.',
      'Add 50 ml water, cover, and braise over low heat for 30–35 minutes. Stir occasionally and add a splash of water if the pan becomes dry.',
      'When tender but not mushy, add the vinegar gradually. Taste and adjust the sweet-and-sour balance to suit the sweetness of the apple.',
    ],
  },
  'side-10': {
    preparationTime: 8, cookingTime: 15, restingTime: 10, commonAllergens: ['milk', 'lactose'],
    note: 'Pergős vajas rizs átmelegített csemegekukoricával', englishNote: 'Fluffy buttered rice with sweet corn warmed through',
    hungarianSteps: [
      'A rizst öblítsd át szűrőben, amíg a lefolyó víz majdnem tiszta, majd csepegtesd le. A kukoricát is szűrd le.',
      'Olvaszd fel a vaj felét egy jól záródó fedővel rendelkező lábasban. Add hozzá a rizst, és kevergetve pirítsd 1 percig.',
      'Öntsd fel a kimért 6 dl vízzel, add hozzá a sót, és forrald fel. Fedd le, majd a legkisebb lángon főzd 9 percig.',
      'Gyorsan szórd rá a kukoricát, fedd vissza, és főzd további 3 percig anélkül, hogy megkevernéd. Ezután zárd el a hőt, és hagyd fedő alatt pihenni 10 percig.',
      'Add hozzá a maradék vajat, és villával óvatosan lazítsd fel. Ellenőrizd, hogy a kukorica mindenhol átmelegedett-e, majd tálald.',
    ],
    englishSteps: [
      'Rinse the rice in a sieve until the water runs almost clear, then drain. Drain the corn as well.',
      'Melt half the butter in a saucepan with a tight-fitting lid. Add the rice and stir for 1 minute.',
      'Pour in the measured 600 ml water, add the salt, and bring to a boil. Cover and cook over the lowest heat for 9 minutes.',
      'Quickly scatter the corn over the rice, cover again, and cook for 3 more minutes without stirring. Turn off the heat and leave covered for 10 minutes.',
      'Add the remaining butter and fluff gently with a fork. Check that the corn is hot throughout, then serve.',
    ],
  },
};

export const auditedSideIds = Object.keys(sideAudit);
export const auditedSideEnglishInstructions = Object.fromEntries(
  Object.entries(sideAudit).map(([id, audit]) => [id, audit.englishSteps.map((step, index) => `${index + 1}. ${step}`).join('\n\n')]),
);
export const auditedSideEnglishNotes = Object.fromEntries(
  Object.values(sideAudit).map(audit => [audit.note, audit.englishNote]),
);

export const applySideAudit = (recipe: Recipe): Recipe => {
  if (recipe.category !== 'side') return recipe;

  const audit = sideAudit[recipe.id];
  if (!audit) throw new Error(`Missing side audit metadata for ${recipe.id}`);

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
