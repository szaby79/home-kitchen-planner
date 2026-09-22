import { Ingredient, Recipe } from '@/types/recipe';

type IngredientRow = [string, number, string];

type BreakfastRecipeOptions = {
  id: string;
  name: string;
  note: string;
  ingredients: IngredientRow[];
  steps: string[];
  preparationTime: number;
  cookingTime: number;
  vegetarian?: boolean;
  vegan?: boolean;
  keto?: boolean;
  commonAllergens?: Recipe['commonAllergens'];
  childFriendly?: boolean;
  suitableForLeftovers?: boolean;
  reheatsWell?: boolean;
  estimatedCostCategory?: Recipe['estimatedCostCategory'];
};

const makeBreakfastRecipe = ({
  id,
  name,
  note,
  ingredients,
  steps,
  preparationTime,
  cookingTime,
  vegetarian = true,
  vegan = false,
  keto = false,
  commonAllergens = [],
  childFriendly = true,
  suitableForLeftovers = false,
  reheatsWell = false,
  estimatedCostCategory = '$',
}: BreakfastRecipeOptions): Recipe => ({
  id,
  name,
  category: 'breakfast',
  mealType: 'breakfast',
  ingredients: ingredients.map(([ingredientName, quantity, unit]): Ingredient => ({
    name: ingredientName,
    quantity,
    unit,
  })),
  description: steps.map((step, index) => `${index + 1}. ${step}`).join('\n\n'),
  defaultServings: 4,
  note,
  imageUrl: '',
  preparationTime,
  cookingTime,
  totalTime: preparationTime + cookingTime,
  difficulty: 'easy',
  estimatedCostCategory,
  childFriendly,
  suitableForLeftovers,
  reheatsWell,
  vegetarian,
  vegan,
  keto,
  commonAllergens,
  quickMeal: preparationTime + cookingTime <= 30,
});

export const breakfastRecipes: Recipe[] = [
  makeBreakfastRecipe({
    id: 'breakfast-1', name: 'Rántotta zöldségekkel', note: '15 perces, Keto-kompatibilis meleg reggeli',
    ingredients: [
      ['tojás', 8, 'db'], ['kaliforniai paprika', 1, 'db'], ['paradicsom', 2, 'db'],
      ['újhagyma', 2, 'db'], ['vaj', 1, 'ek'], ['reszelt sajt', 80, 'g'],
      ['petrezselyemzöld', 0.25, 'csokor'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'A paprikát és paradicsomot vágd kis kockákra, az újhagymát karikázd fel, a petrezselymet aprítsd finomra.',
      'A tojásokat üsd egy tálba, add hozzá a sót és borsot, majd villával keverd egyneműre.',
      'Olvaszd fel a vajat egy nagy serpenyőben. Párold a paprikát 3 percig, majd add hozzá a paradicsomot és az újhagymát.',
      'Öntsd rá a tojást, és kis-közepes lángon, spatulával lassan mozgatva süsd 3–4 percig, amíg éppen megszilárdul.',
      'Szórd rá a sajtot és a petrezselymet, hajtsd át néhányszor, majd azonnal tálald.',
    ],
    preparationTime: 7, cookingTime: 8, keto: true, commonAllergens: ['egg', 'milk'],
  }),
  makeBreakfastRecipe({
    id: 'breakfast-2', name: 'Almás-fahéjas zabkása', note: 'Meleg, rostos családi reggeli',
    ingredients: [
      ['zabpehely', 240, 'g'], ['tej', 700, 'ml'], ['alma', 2, 'db'], ['méz', 2, 'ek'],
      ['dió', 60, 'g'], ['fahéj', 1, 'tk'], ['citrom', 0.5, 'db'], ['só', 1, 'csipet'],
    ],
    steps: [
      'Az almát mosd meg, magozd ki, majd az egyik felét reszeld le, a másikat vágd apró kockákra.',
      'Tedd a zabpelyhet, a tejet, a reszelt almát, a fahéjat és a sót egy lábasba.',
      'Közepes lángon forrald fel, majd kis lángon, gyakran megkeverve főzd 6–8 percig.',
      'Ha a zab megpuhult és a kása krémes, vedd le a tűzről, majd keverd bele a mézet és kevés citromlevet.',
      'Oszd tálkákba, és a kockázott almával, valamint durvára vágott dióval tálald.',
    ],
    preparationTime: 7, cookingTime: 8, commonAllergens: ['gluten', 'milk', 'nuts'],
  }),
  makeBreakfastRecipe({
    id: 'breakfast-3', name: 'Bogyós éjszakai zabkása', note: 'Előző este összeállítható, főzés nélküli reggeli',
    ingredients: [
      ['zabpehely', 240, 'g'], ['natúr joghurt', 300, 'g'], ['tej', 300, 'ml'],
      ['fagyasztott bogyós gyümölcs', 240, 'g'], ['chia mag', 3, 'ek'], ['méz', 2, 'ek'],
      ['fahéj', 0.5, 'tk'], ['dió', 50, 'g'], ['citromhéj', 1, 'tk'],
    ],
    steps: [
      'Egy nagy, zárható edényben keverd össze a zabpelyhet, a chia magot és a fahéjat.',
      'Add hozzá a joghurtot, a tejet, a mézet és a citromhéjat, majd keverd simára.',
      'Forgasd bele a fagyasztott bogyós gyümölcs kétharmadát, és zárd le az edényt.',
      'Tedd hűtőbe legalább 6 órára vagy egész éjszakára; reggel keverd át, és szükség esetén lazítsd kevés tejjel.',
      'Oszd négy adagba, és a maradék gyümölccsel, valamint durvára vágott dióval tálald.',
    ],
    preparationTime: 10, cookingTime: 1, commonAllergens: ['gluten', 'milk', 'nuts'], suitableForLeftovers: true,
  }),
  makeBreakfastRecipe({
    id: 'breakfast-4', name: 'Gyümölcsös chia puding', note: 'Vegán, előre elkészíthető reggeli',
    ingredients: [
      ['chia mag', 120, 'g'], ['cukrozatlan kókusztej', 700, 'ml'], ['banán', 2, 'db'],
      ['fagyasztott bogyós gyümölcs', 240, 'g'], ['alma', 1, 'db'], ['fahéj', 0.5, 'tk'],
      ['citrom', 0.5, 'db'], ['szeletelt mandula', 50, 'g'],
    ],
    steps: [
      'Az egyik banánt törd pépesre egy nagy tálban, majd keverd hozzá a kókusztejet, a fahéjat és a citromlevet.',
      'Szórd bele a chia magot, habverővel alaposan keverd el, majd 10 perc múlva keverd át ismét, hogy ne csomósodjon.',
      'Fedd le, és tedd hűtőbe legalább 4 órára vagy egész éjszakára, amíg puding állagú lesz.',
      'Tálalás előtt szeleteld fel a másik banánt és az almát; a bogyós gyümölcsöt hagyd kissé felengedni.',
      'Oszd négy pohárba a pudingot, rétegezd rá a gyümölcsöket, és szórd meg mandulával.',
    ],
    preparationTime: 12, cookingTime: 1, vegan: true, commonAllergens: ['nuts'], suitableForLeftovers: true,
  }),
  makeBreakfastRecipe({
    id: 'breakfast-5', name: 'Görög joghurt granolával és gyümölccsel', note: '5 perces, friss joghurtos reggeli',
    ingredients: [
      ['görög joghurt', 700, 'g'], ['granola', 240, 'g'], ['alma', 1, 'db'],
      ['fagyasztott bogyós gyümölcs', 200, 'g'], ['méz', 2, 'ek'], ['dió', 50, 'g'],
      ['fahéj', 0.5, 'tk'], ['citromhéj', 1, 'tk'],
    ],
    steps: [
      'A bogyós gyümölcsöt vedd ki a fagyasztóból 10 perccel tálalás előtt, hogy kissé felengedjen.',
      'Az almát mosd meg, magozd ki, és vágd apró kockákra; a diót vágd durvára.',
      'A joghurtot keverd össze a mézzel, a fahéjjal és a finomra reszelt citromhéjjal.',
      'Oszd a joghurt felét négy pohárba, rétegezd rá az almát és a bogyós gyümölcsöt, majd add hozzá a maradék joghurtot.',
      'Közvetlenül tálalás előtt szórd meg granolával és dióval, hogy ropogós maradjon.',
    ],
    preparationTime: 5, cookingTime: 1, commonAllergens: ['gluten', 'milk', 'nuts'], estimatedCostCategory: '$$',
  }),
  makeBreakfastRecipe({
    id: 'breakfast-6', name: 'Avokádós pirítós főtt tojással', note: '20 perces, tartalmas pirítós',
    ingredients: [
      ['teljes kiőrlésű kenyér', 8, 'szelet'], ['avokádó', 2, 'db'], ['tojás', 4, 'db'],
      ['paradicsom', 2, 'db'], ['citrom', 0.5, 'db'], ['olívaolaj', 1, 'ek'],
      ['chilipehely', 0.25, 'tk'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'Tedd a tojásokat hideg vízbe, forrald fel, majd közepes lángon főzd 8 percig. Hűtsd le hideg vízben és hámozd meg.',
      'Az avokádót kanalazd tálba, add hozzá a citromlevet, az olívaolajat, a sót és a borsot, majd villával törd darabos krémmé.',
      'A kenyérszeleteket pirítsd aranybarnára kenyérpirítóban vagy száraz serpenyőben.',
      'Kend meg a pirítósokat az avokádókrémmel, majd tedd rá a felszeletelt paradicsomot és főtt tojást.',
      'Szórd meg chilipehellyel és kevés borssal, majd még ropogósan tálald.',
    ],
    preparationTime: 8, cookingTime: 12, commonAllergens: ['gluten', 'egg'], estimatedCostCategory: '$$',
  }),
  makeBreakfastRecipe({
    id: 'breakfast-7', name: 'Sonkás-sajtos melegszendvics', note: 'Gyors, ropogós családi reggeli',
    ingredients: [
      ['kenyér', 8, 'szelet'], ['főtt sonka', 160, 'g'], ['sajt', 160, 'g'],
      ['vaj', 30, 'g'], ['paradicsom', 2, 'db'], ['mustár', 2, 'tk'],
      ['oregánó', 0.5, 'tk'], ['só', 0.25, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'Melegítsd elő a sütőt 210 °C-ra, és bélelj ki egy tepsit sütőpapírral.',
      'A kenyérszeleteket vékonyan kend meg vajjal és mustárral, majd fektesd a tepsire.',
      'Oszd el rajtuk a sonkát, a vékony paradicsomszeleteket és a reszelt sajtot.',
      'Szórd meg oregánóval és borssal, majd süsd 8–10 percig, amíg a sajt megolvad és enyhén pirul.',
      'A sütőből kivéve hagyd állni 2 percig, majd óvatosan, melegen tálald.',
    ],
    preparationTime: 8, cookingTime: 10, vegetarian: false, commonAllergens: ['gluten', 'milk'],
  }),
  makeBreakfastRecipe({
    id: 'breakfast-8', name: 'Zöldséges tojásmuffin', note: 'Keto, előre elkészíthető tojásos reggeli',
    ingredients: [
      ['tojás', 8, 'db'], ['kaliforniai paprika', 1, 'db'], ['bébispenót', 100, 'g'],
      ['reszelt sajt', 120, 'g'], ['újhagyma', 3, 'db'], ['tej', 100, 'ml'],
      ['olívaolaj', 1, 'ek'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'Melegítsd elő a sütőt 190 °C-ra, és vékonyan olajozz ki 12 mélyedést egy muffinformában.',
      'A paprikát kockázd apróra, az újhagymát karikázd fel, a spenótot pedig vágd durvára.',
      'A tojásokat keverd össze a tejjel, a sóval és a borssal, majd forgasd bele a zöldségeket és a sajt felét.',
      'Oszd el a keveréket a formában, szórd rá a maradék sajtot, és süsd 16–18 percig.',
      'A muffin akkor kész, ha a közepe is szilárd. Pihentesd 5 percig, majd emeld ki a formából.',
    ],
    preparationTime: 12, cookingTime: 18, keto: true, commonAllergens: ['egg', 'milk'], suitableForLeftovers: true, reheatsWell: true,
  }),
  makeBreakfastRecipe({
    id: 'breakfast-9', name: 'Körözött friss zöldségekkel', note: 'Keto, főzés nélküli magyaros reggeli',
    ingredients: [
      ['túró', 500, 'g'], ['tejföl', 150, 'g'], ['vöröshagyma', 0.5, 'db'],
      ['pirospaprika', 1, 'tk'], ['kömény', 0.5, 'tk'], ['retek', 1, 'csokor'],
      ['kígyóuborka', 1, 'db'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'A vöröshagymát vágd nagyon apróra. A retket és az uborkát mosd meg, majd szeleteld fel.',
      'A túrót villával törd át egy tálban, majd keverd hozzá a tejfölt.',
      'Add hozzá a vöröshagymát, a pirospaprikát, a köményt, a sót és a borsot.',
      'Keverd krémesre, majd tedd hűtőbe 15 percre, hogy az ízek összeérjenek.',
      'Kóstold meg, szükség esetén igazítsd a fűszerezést, és a friss retekkel, valamint uborkával tálald.',
    ],
    preparationTime: 10, cookingTime: 1, keto: true, commonAllergens: ['milk'], suitableForLeftovers: true,
  }),
  makeBreakfastRecipe({
    id: 'breakfast-10', name: 'Banános zabpalacsinta', note: 'Gyerekbarát, hozzáadott cukor nélküli reggeli',
    ingredients: [
      ['zabpehely', 220, 'g'], ['banán', 3, 'db'], ['tojás', 3, 'db'], ['tej', 200, 'ml'],
      ['sütőpor', 1, 'tk'], ['fahéj', 0.5, 'tk'], ['vaj', 1, 'ek'],
      ['natúr joghurt', 200, 'g'], ['fagyasztott bogyós gyümölcs', 160, 'g'],
    ],
    steps: [
      'A zabpelyhet turmixold finom lisztté. Két banánt törj pépesre, a harmadikat szeleteld fel a tálaláshoz.',
      'Keverd össze a zabot, a banánpépet, a tojást, a tejet, a sütőport és a fahéjat, majd pihentesd 5 percig.',
      'Tapadásmentes serpenyőt kenj ki kevés vajjal, és közepes lángon melegítsd fel.',
      'Adagonként két evőkanál tésztából süss kis palacsintákat oldalanként 2–3 percig; akkor fordítsd meg, amikor buborékos a tetejük.',
      'A kész palacsintákat natúr joghurttal, banánszeletekkel és felengedett bogyós gyümölccsel tálald.',
    ],
    preparationTime: 10, cookingTime: 20, commonAllergens: ['gluten', 'egg', 'milk'],
  }),
  makeBreakfastRecipe({
    id: 'breakfast-11', name: 'Sajtos-gombás omlett', note: '20 perces, Keto-kompatibilis omlett',
    ingredients: [
      ['tojás', 8, 'db'], ['csiperke gomba', 300, 'g'], ['cheddar sajt', 120, 'g'],
      ['vaj', 1, 'ek'], ['újhagyma', 2, 'db'], ['bébispenót', 80, 'g'],
      ['petrezselyemzöld', 0.25, 'csokor'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'A gombát szeleteld fel, az újhagymát karikázd, a petrezselymet aprítsd finomra. A tojásokat sóval és borssal verd fel.',
      'A vaj felén, közepes-erős lángon pirítsd a gombát 6–7 percig, amíg a leve elpárolog.',
      'Add hozzá az újhagymát és a spenótot, forgasd át 1 percig, majd tedd félre a tölteléket.',
      'A maradék vajon süsd meg a tojást két adagban, kis-közepes lángon, amíg a teteje már csak enyhén nedves.',
      'Oszd el rajta a gombát és a sajtot, hajtsd félbe, majd petrezselyemmel megszórva tálald.',
    ],
    preparationTime: 8, cookingTime: 12, keto: true, commonAllergens: ['egg', 'milk'], estimatedCostCategory: '$$',
  }),
  makeBreakfastRecipe({
    id: 'breakfast-12', name: 'Tofurántotta zöldségekkel', note: 'Vegán és Keto-kompatibilis meleg reggeli',
    ingredients: [
      ['kemény tofu', 600, 'g'], ['kaliforniai paprika', 1, 'db'], ['csiperke gomba', 250, 'g'],
      ['bébispenót', 120, 'g'], ['paradicsom', 2, 'db'], ['olívaolaj', 2, 'ek'],
      ['kurkuma', 0.5, 'tk'], ['fokhagyma', 1, 'gerezd'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'A tofut csepegtesd le, majd tiszta konyharuhában óvatosan nyomkodd ki, és villával morzsold darabosra.',
      'A paprikát és paradicsomot kockázd fel, a gombát szeleteld, a fokhagymát aprítsd finomra.',
      'Az olívaolajon pirítsd a gombát és a paprikát 6 percig, amíg enyhén megpirulnak.',
      'Add hozzá a tofut, a fokhagymát, a kurkumát, a sót és a borsot, majd süsd 5 percig, közben többször átforgatva.',
      'Forgasd bele a spenótot és a paradicsomot, melegítsd további 2 percig, majd azonnal tálald.',
    ],
    preparationTime: 10, cookingTime: 13, vegan: true, keto: true, commonAllergens: ['soy'], estimatedCostCategory: '$$',
  }),
];

export const breakfastRecipeEnglishInstructions: Record<string, string> = {
  'breakfast-1': `1. Dice the pepper and tomatoes, slice the green onions, and finely chop the parsley.\n\n2. Crack the eggs into a bowl, add the salt and pepper, and whisk until combined.\n\n3. Melt the butter in a large frying pan. Cook the pepper for 3 minutes, then add the tomatoes and green onions.\n\n4. Pour in the eggs and cook over low-medium heat for 3–4 minutes, moving them slowly with a spatula until just set.\n\n5. Sprinkle over the cheese and parsley, fold a few times, and serve immediately.`,
  'breakfast-2': `1. Wash and core the apples. Grate one half and cut the rest into small cubes.\n\n2. Put the oats, milk, grated apple, cinnamon, and salt in a saucepan.\n\n3. Bring to a simmer over medium heat, then cook over low heat for 6–8 minutes, stirring often.\n\n4. When the oats are tender and creamy, remove from the heat and stir in the honey and a little lemon juice.\n\n5. Divide among bowls and serve with the diced apple and roughly chopped walnuts.`,
  'breakfast-3': `1. Mix the oats, chia seeds, and cinnamon in a large sealable container.\n\n2. Add the yogurt, milk, honey, and lemon zest, then stir until evenly combined.\n\n3. Fold in two-thirds of the frozen berries and seal the container.\n\n4. Refrigerate for at least 6 hours or overnight. Stir in the morning and loosen with a little milk if needed.\n\n5. Divide into four portions and serve with the remaining berries and roughly chopped walnuts.`,
  'breakfast-4': `1. Mash one banana in a large bowl, then mix in the coconut milk, cinnamon, and lemon juice.\n\n2. Whisk in the chia seeds. Stir again after 10 minutes so the mixture does not form lumps.\n\n3. Cover and refrigerate for at least 4 hours or overnight, until it has a pudding-like texture.\n\n4. Before serving, slice the remaining banana and apple and let the berries thaw slightly.\n\n5. Divide the pudding among four glasses, layer with the fruit, and sprinkle with the almonds.`,
  'breakfast-5': `1. Take the berries from the freezer 10 minutes before serving so they can thaw slightly.\n\n2. Wash, core, and dice the apple, then roughly chop the walnuts.\n\n3. Mix the yogurt with the honey, cinnamon, and finely grated lemon zest.\n\n4. Divide half the yogurt among four glasses, layer with the apple and berries, then add the remaining yogurt.\n\n5. Add the granola and walnuts immediately before serving so they stay crisp.`,
  'breakfast-6': `1. Put the eggs in cold water, bring to a boil, then cook over medium heat for 8 minutes. Cool in cold water and peel.\n\n2. Scoop the avocados into a bowl. Add the lemon juice, olive oil, salt, and pepper, then mash to a chunky spread.\n\n3. Toast the bread until golden in a toaster or dry frying pan.\n\n4. Spread the avocado over the toast, then top with the sliced tomatoes and boiled eggs.\n\n5. Sprinkle with chilli flakes and a little pepper, then serve while the toast is still crisp.`,
  'breakfast-7': `1. Heat the oven to 210°C and line a baking tray with baking paper.\n\n2. Spread the bread slices thinly with butter and mustard, then place them on the tray.\n\n3. Divide the ham, thinly sliced tomatoes, and grated cheese among the bread.\n\n4. Sprinkle with oregano and pepper, then bake for 8–10 minutes, until the cheese melts and begins to brown.\n\n5. Leave to stand for 2 minutes after removing from the oven, then serve carefully while hot.`,
  'breakfast-8': `1. Heat the oven to 190°C and lightly oil 12 cups of a muffin tin.\n\n2. Finely dice the pepper, slice the green onions, and roughly chop the spinach.\n\n3. Whisk the eggs with the milk, salt, and pepper, then fold in the vegetables and half the cheese.\n\n4. Divide the mixture among the cups, add the remaining cheese, and bake for 16–18 minutes.\n\n5. The muffins are ready when their centres are fully set. Rest for 5 minutes, then lift them from the tin.`,
  'breakfast-9': `1. Finely chop the red onion. Wash and slice the radishes and cucumber.\n\n2. Mash the cottage cheese with a fork in a bowl, then stir in the sour cream.\n\n3. Add the red onion, paprika, caraway seeds, salt, and pepper.\n\n4. Mix until creamy, then refrigerate for 15 minutes so the flavours can develop.\n\n5. Taste and adjust the seasoning if needed, then serve with the fresh radishes and cucumber.`,
  'breakfast-10': `1. Blend the oats into a fine flour. Mash two bananas and slice the third for serving.\n\n2. Mix the oats, mashed banana, eggs, milk, baking powder, and cinnamon, then rest the batter for 5 minutes.\n\n3. Lightly grease a non-stick frying pan with butter and heat it over medium heat.\n\n4. Use two tablespoons of batter for each small pancake and cook for 2–3 minutes per side, turning when bubbles appear on top.\n\n5. Serve the pancakes with plain yogurt, banana slices, and thawed berries.`,
  'breakfast-11': `1. Slice the mushrooms and green onions and finely chop the parsley. Whisk the eggs with the salt and pepper.\n\n2. Cook the mushrooms in half the butter over medium-high heat for 6–7 minutes, until their liquid has evaporated.\n\n3. Add the green onions and spinach, cook for 1 minute, then set the filling aside.\n\n4. Use the remaining butter to cook the eggs in two batches over low-medium heat, until the tops are only slightly moist.\n\n5. Divide the mushrooms and cheese over the omelettes, fold in half, and serve sprinkled with parsley.`,
  'breakfast-12': `1. Drain the tofu, gently press out excess moisture in a clean kitchen towel, and crumble it with a fork.\n\n2. Dice the pepper and tomatoes, slice the mushrooms, and finely chop the garlic.\n\n3. Cook the mushrooms and pepper in the olive oil for 6 minutes, until lightly browned.\n\n4. Add the tofu, garlic, turmeric, salt, and pepper and cook for 5 minutes, turning several times.\n\n5. Fold in the spinach and tomatoes, heat for 2 minutes more, and serve immediately.`,
};
