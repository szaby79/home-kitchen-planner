import { Ingredient, Recipe } from '@/types/recipe';

type IngredientRow = [string, number, string];

export type DietaryRecipeOptions = {
  id: string;
  name: string;
  category: 'soup' | 'main';
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
  estimatedCostCategory?: Recipe['estimatedCostCategory'];
};

export const makeDietaryRecipe = ({
  id,
  name,
  category,
  note,
  ingredients,
  steps,
  preparationTime,
  cookingTime,
  vegetarian,
  vegan,
  keto,
  commonAllergens = [],
  childFriendly = false,
  estimatedCostCategory = '$$',
}: DietaryRecipeOptions): Recipe => ({
  id,
  name,
  category,
  mealType: 'both',
  defaultServings: 4,
  note,
  imageUrl: '',
  ingredients: ingredients.map(([ingredientName, quantity, unit]): Ingredient => ({
    name: ingredientName,
    quantity,
    unit,
  })),
  description: steps.map((step, index) => `${index + 1}. ${step}`).join('\n\n'),
  preparationTime,
  cookingTime,
  totalTime: preparationTime + cookingTime,
  difficulty: 'easy',
  estimatedCostCategory,
  childFriendly,
  suitableForLeftovers: true,
  reheatsWell: true,
  vegetarian,
  vegan,
  keto,
  commonAllergens,
});

export const dietaryRecipePackOne: Recipe[] = [
  makeDietaryRecipe({
    id: 'soup-31',
    name: 'Vöröslencse-kókuszleves',
    category: 'soup',
    note: 'Vegán, krémes és laktató leves',
    ingredients: [
      ['vöröslencse', 250, 'g'], ['kókusztej', 400, 'ml'], ['sárgarépa', 2, 'db'],
      ['vöröshagyma', 1, 'db'], ['fokhagyma', 2, 'gerezd'], ['gyömbér', 1, 'tk'],
      ['paradicsompüré', 1, 'ek'], ['olívaolaj', 1, 'ek'], ['víz', 900, 'ml'],
      ['só', 1, 'tk'], ['lime', 1, 'db'],
    ],
    steps: [
      'A lencsét szűrőben mosd át. A hagymát és fokhagymát aprítsd fel, a répát vágd vékony karikákra.',
      'Melegítsd fel az olajat, párold a hagymát 5 percig, majd add hozzá a fokhagymát és a gyömbért 30 másodpercre.',
      'Keverd hozzá a paradicsompürét, a lencsét, a répát és a vizet. Forrald fel, majd kis lángon főzd 18–20 percig.',
      'Amikor a lencse teljesen puha, öntsd hozzá a kókusztejet, sózd meg, és melegítsd további 3 percig.',
      'A leves felét botmixerrel krémesítsd, majd keverd össze a darabos résszel. Lime-lével, kóstolva állítsd be az ízét.',
    ],
    preparationTime: 10,
    cookingTime: 25,
    vegetarian: true,
    vegan: true,
    childFriendly: true,
    estimatedCostCategory: '$',
  }),
  makeDietaryRecipe({
    id: 'soup-32',
    name: 'Brokkoli-kókuszkrémleves',
    category: 'soup',
    note: 'Vegán és keto krémleves',
    ingredients: [
      ['brokkoli', 700, 'g'], ['kókusztej', 300, 'ml'], ['vöröshagyma', 1, 'db'],
      ['fokhagyma', 2, 'gerezd'], ['olívaolaj', 1, 'ek'], ['víz', 700, 'ml'],
      ['citrom', 0.5, 'db'], ['só', 1, 'tk'], ['bors', 0.5, 'tk'],
    ],
    steps: [
      'A brokkolit szedd kisebb rózsákra, a meghámozott szárát kockázd fel. A hagymát és fokhagymát aprítsd fel.',
      'Az olajon párold a hagymát 5 percig, add hozzá a fokhagymát 30 másodpercre, majd tedd bele a brokkoliszárat.',
      'Öntsd hozzá a vizet, forrald fel, és főzd 5 percig. Add hozzá a brokkolirózsákat, majd főzd még 7–8 percig.',
      'Vedd le a tűzről, add hozzá a kókusztejet, és botmixerrel turmixold teljesen simára.',
      'Sózd, borsozd, és kevés citromlével frissítsd. Kis lángon melegítsd át, de már ne forrald erősen.',
    ],
    preparationTime: 10,
    cookingTime: 20,
    vegetarian: true,
    vegan: true,
    keto: true,
    childFriendly: true,
    estimatedCostCategory: '$',
  }),
  makeDietaryRecipe({
    id: 'main-91',
    name: 'Mediterrán csicseriborsó-ragu',
    category: 'main',
    note: 'Vegán egytálétel sok zöldséggel',
    ingredients: [
      ['csicseriborsó konzerv', 800, 'g'], ['darabolt paradicsom', 400, 'g'],
      ['cukkini', 1, 'db'], ['kaliforniai paprika', 1, 'db'], ['vöröshagyma', 1, 'db'],
      ['fokhagyma', 2, 'gerezd'], ['olívaolaj', 2, 'ek'], ['oregánó', 1, 'tk'],
      ['só', 1, 'tk'], ['petrezselyemzöld', 0.5, 'csokor'],
    ],
    steps: [
      'A két konzerv csicseriborsót csepegtesd le és öblítsd át; így körülbelül 480 g marad. A cukkinit és paprikát vágd falatnyi darabokra, a hagymát és fokhagymát aprítsd fel.',
      'Az olívaolajon párold a hagymát 5 percig. Add hozzá a paprikát és a cukkinit, majd pirítsd további 6 percig.',
      'Keverd hozzá a fokhagymát és az oregánót, 30 másodperc után pedig add hozzá a paradicsomot és a csicseriborsót.',
      'Sózd meg, és fedő nélkül, kis lángon főzd 15 percig, amíg a ragu besűrűsödik, a zöldség pedig megpuhul.',
      'Kóstold meg, szükség esetén sózd, majd aprított petrezselyemmel tálald.',
    ],
    preparationTime: 15,
    cookingTime: 30,
    vegetarian: true,
    vegan: true,
    childFriendly: true,
    estimatedCostCategory: '$',
  }),
  makeDietaryRecipe({
    id: 'main-92',
    name: 'Gombás lencseragu karfiolpürével',
    category: 'main',
    note: 'Vegán, tartalmas családi főétel',
    ingredients: [
      ['főtt lencse', 500, 'g'], ['csiperke gomba', 400, 'g'], ['karfiol', 800, 'g'],
      ['vöröshagyma', 1, 'db'], ['fokhagyma', 3, 'gerezd'], ['paradicsompüré', 1, 'ek'],
      ['zöldségalaplé', 300, 'ml'], ['olívaolaj', 2, 'ek'], ['kakukkfű', 1, 'tk'],
      ['só', 1.5, 'tk'], ['bors', 0.5, 'tk'],
    ],
    steps: [
      'A karfiolt szedd rózsákra, és sós vízben főzd 12–15 perc alatt egészen puhára.',
      'Közben szeleteld fel a gombát, aprítsd fel a hagymát és fokhagymát. Az olaj felén párold a hagymát 5 percig.',
      'Add hozzá a gombát, és széles edényben, erősebb lángon pirítsd 8 percig, hogy ne csak párolódjon. Keverd bele a fokhagymát, paradicsompürét és kakukkfüvet.',
      'Öntsd hozzá az alaplevet és a lencsét. Sózd, borsozd, majd kis lángon főzd 12 percig.',
      'A karfiolt szűrd le, 1 dl főzővizet tegyél félre. A maradék olajjal turmixold pürésre, és csak annyi főzővizet adj hozzá, hogy krémes legyen. Tálald a sűrű lencseragu mellé.',
    ],
    preparationTime: 15,
    cookingTime: 30,
    vegetarian: true,
    vegan: true,
    estimatedCostCategory: '$',
  }),
  makeDietaryRecipe({
    id: 'main-93',
    name: 'Spenótos-fetás töltött édesburgonya',
    category: 'main',
    note: 'Vegetáriánus tepsis főétel',
    ingredients: [
      ['édesburgonya', 4, 'db'], ['friss spenót', 300, 'g'], ['feta sajt', 180, 'g'],
      ['fokhagyma', 2, 'gerezd'], ['olívaolaj', 1, 'ek'], ['citrom', 0.5, 'db'],
      ['só', 0.5, 'tk'], ['bors', 0.5, 'tk'],
    ],
    steps: [
      'Melegítsd elő a sütőt 200 °C-ra. Válassz hasonló méretű, közepes édesburgonyákat, mosd meg, szurkáld meg villával, és tedd sütőpapíros tepsire.',
      'Süsd mérettől függően 45–60 percig, amíg a közepe késsel könnyen átszúrható. Közben aprítsd fel a fokhagymát.',
      'Az olajon futtasd meg a fokhagymát 30 másodpercig, add hozzá a spenótot, és fonnyaszd 3–4 percig.',
      'A burgonyákat hosszában vágd fel, a belsejüket lazítsd fel villával, majd oszd el rajtuk a spenótot és a morzsolt fetát.',
      'Tedd vissza a sütőbe 5 percre. Citromlével és frissen őrölt borssal tálald.',
    ],
    preparationTime: 15,
    cookingTime: 65,
    vegetarian: true,
    commonAllergens: ['milk'],
    childFriendly: true,
  }),
  makeDietaryRecipe({
    id: 'main-94',
    name: 'Halloumis tepsis zöldségek',
    category: 'main',
    note: 'Vegetáriánus és keto tepsis vacsora',
    ingredients: [
      ['halloumi sajt', 300, 'g'], ['cukkini', 2, 'db'], ['kaliforniai paprika', 2, 'db'],
      ['padlizsán', 1, 'db'], ['koktélparadicsom', 250, 'g'], ['olívaolaj', 3, 'ek'],
      ['oregánó', 1, 'tk'], ['citrom', 0.5, 'db'], ['bors', 0.5, 'tk'],
    ],
    steps: [
      'Melegítsd elő a sütőt 210 °C-ra. A zöldségeket vágd hasonló méretű, körülbelül 2 cm-es darabokra.',
      'Oszd el őket két sütőpapíros tepsin egy rétegben, locsold meg olívaolajjal, szórd meg oregánóval és borssal, majd forgasd össze.',
      'Süsd 18 percig; félidőben keverd át a zöldségeket és cseréld meg a tepsiket. A halloumit vágd 1 cm vastag szeletekre.',
      'Oszd el a sajtot a zöldségek között, és süsd további 10–12 percig, amíg a széle aranybarna lesz.',
      'Citromlével meglocsolva tálald. Külön só általában nem kell, mert a halloumi sós.',
    ],
    preparationTime: 15,
    cookingTime: 30,
    vegetarian: true,
    keto: true,
    commonAllergens: ['milk'],
  }),
  makeDietaryRecipe({
    id: 'main-95',
    name: 'Citromos csirke karfiolpürével',
    category: 'main',
    note: 'Keto családi főétel',
    ingredients: [
      ['csirkemell', 650, 'g'], ['karfiol', 900, 'g'], ['vaj', 40, 'g'],
      ['tejszín', 100, 'ml'], ['citrom', 1, 'db'], ['fokhagyma', 2, 'gerezd'],
      ['olívaolaj', 1, 'ek'], ['só', 1.5, 'tk'], ['bors', 0.5, 'tk'],
    ],
    steps: [
      'A karfiolt szedd rózsákra, és sós vízben főzd 12–15 perc alatt teljesen puhára.',
      'A csirkemellet vágd egyforma szeletekre, sózd és borsozd. Serpenyőben, olívaolajon süsd oldalanként 4–5 percig.',
      'Add a serpenyőhöz a zúzott fokhagymát, fél citrom levét és 50 ml vizet. Lefedve párold még 4 percig.',
      'A karfiolt alaposan csepegtesd le, majd vajjal és tejszínnel turmixold simára. Kóstolás után sózd.',
      'A csirke legvastagabb része érje el a 74 °C-ot. Hagyd 3 percig pihenni, majd tálald a karfiolpürével és citromszeletekkel.',
    ],
    preparationTime: 15,
    cookingTime: 25,
    vegetarian: false,
    keto: true,
    commonAllergens: ['milk'],
    childFriendly: true,
  }),
  makeDietaryRecipe({
    id: 'main-96',
    name: 'Fokhagymás lazac cukkinivel',
    category: 'main',
    note: 'Gyors keto halétel',
    ingredients: [
      ['lazacfilé', 600, 'g'], ['cukkini', 3, 'db'], ['vaj', 40, 'g'],
      ['fokhagyma', 3, 'gerezd'], ['citrom', 1, 'db'], ['kapor', 0.5, 'csokor'],
      ['só', 1, 'tk'], ['bors', 0.5, 'tk'],
    ],
    steps: [
      'A lazacot töröld szárazra és vágd négy adagra. A cukkinit vágd fél centi vastag karikákra.',
      'A vaj felét melegítsd fel nagy serpenyőben. A lazacot sózd, borsozd, és ha van bőre, bőrös oldalával lefelé süsd 4 percig.',
      'Fordítsd meg, és süsd további 3–4 percig. Akkor biztonságos, ha a legvastagabb része eléri a 63 °C-ot; hőmérő nélkül a közepe legyen opálos és villával könnyen lemezesedjen. Vedd ki egy tányérra.',
      'A serpenyőbe tedd a maradék vajat és a cukkinit. Pirítsd 5–6 percig, majd add hozzá a fokhagymát 30 másodpercre.',
      'Tedd vissza a lazacot, locsold meg citromlével, szórd meg kaporral, és azonnal tálald.',
    ],
    preparationTime: 10,
    cookingTime: 15,
    vegetarian: false,
    keto: true,
    commonAllergens: ['milk', 'fish'],
    estimatedCostCategory: '$$$',
  }),
  makeDietaryRecipe({
    id: 'main-97',
    name: 'Pulykagombóc paradicsomos cukkinivel',
    category: 'main',
    note: 'Könnyű keto egytálétel',
    ingredients: [
      ['darált pulykahús', 600, 'g'], ['tojás', 1, 'db'], ['cukkini', 3, 'db'],
      ['darabolt paradicsom', 400, 'g'], ['vöröshagyma', 1, 'db'], ['fokhagyma', 2, 'gerezd'],
      ['olívaolaj', 2, 'ek'], ['oregánó', 1, 'tk'], ['só', 1, 'tk'], ['bors', 0.5, 'tk'],
    ],
    steps: [
      'A pulykahúst keverd össze a tojással, az oregánó felével, fél teáskanál sóval és borssal.',
      'Nedves kézzel formázz 16 kisebb gombócot. Az olaj felén, közepes lángon pirítsd körbe 7–8 perc alatt, majd tedd félre.',
      'A maradék olajon párold az aprított hagymát 5 percig, add hozzá a fokhagymát, majd a paradicsomot.',
      'Tedd vissza a gombócokat, és lefedve főzd 12 percig. Közben a cukkinit vágd vékony csíkokra vagy félkarikákra.',
      'Add hozzá a cukkinit az utolsó 5 percre. A legnagyobb gombóc közepe érje el a 74 °C-ot; a színe önmagában nem megbízható ellenőrzés.',
    ],
    preparationTime: 20,
    cookingTime: 25,
    vegetarian: false,
    keto: true,
    commonAllergens: ['egg'],
    childFriendly: true,
  }),
  makeDietaryRecipe({
    id: 'main-98',
    name: 'Gyömbéres tofu brokkolival',
    category: 'main',
    note: 'Vegán és keto serpenyős étel',
    ingredients: [
      ['kemény tofu', 500, 'g'], ['brokkoli', 600, 'g'], ['gluténmentes tamari', 3, 'ek'],
      ['gyömbér', 1, 'ek'], ['fokhagyma', 2, 'gerezd'], ['olívaolaj', 2, 'ek'],
      ['lime', 1, 'db'], ['víz', 100, 'ml'],
    ],
    steps: [
      'A tofut papírtörlő között nyomkodd szárazra, majd vágd 2 cm-es kockákra. A brokkolit szedd kis rózsákra.',
      'Az olaj felét forrósítsd fel, és a tofut 8–10 perc alatt pirítsd körbe. Ne kevergesd folyamatosan, hogy kérget kapjon.',
      'Vedd ki a tofut. A serpenyőbe tedd a brokkolit és a vizet, fedd le, és párold 5 percig.',
      'Add hozzá a maradék olajat, a gyömbért és fokhagymát. Fél perc után tedd vissza a tofut és öntsd rá a tamarit.',
      'Forgasd össze 2 perc alatt, majd lime-lével tálald. Külön sózás előtt kóstold meg, mert a tamari sós.',
    ],
    preparationTime: 15,
    cookingTime: 20,
    vegetarian: true,
    vegan: true,
    keto: true,
    commonAllergens: ['soy'],
  }),
  makeDietaryRecipe({
    id: 'main-99',
    name: 'Padlizsános kókuszcurry karfiolrizzsel',
    category: 'main',
    note: 'Vegán és keto fűszeres főétel',
    ingredients: [
      ['padlizsán', 2, 'db'], ['karfiol', 800, 'g'], ['kókusztej', 400, 'ml'],
      ['darabolt paradicsom', 200, 'g'], ['vöröshagyma', 1, 'db'], ['fokhagyma', 2, 'gerezd'],
      ['currypor', 2, 'tk'], ['olívaolaj', 4, 'ek'], ['só', 1.5, 'tk'], ['lime', 1, 'db'],
    ],
    steps: [
      'A padlizsánt vágd 2 cm-es kockákra. A karfiolt aprítógépben, több részletben dolgozd rizsszem méretűre.',
      'Az olaj felén párold az aprított hagymát 5 percig. Add hozzá a fokhagymát és curryport 30 másodpercre.',
      'Tedd bele a padlizsánt, pirítsd 6 percig, majd add hozzá a paradicsomot, a kókusztejet és a sót.',
      'Fedő nélkül, kis lángon főzd 18–20 percig, amíg a padlizsán puha és a mártás sűrű.',
      'A maradék olajon pirítsd a karfiolrizst 6–7 percig. Sózd enyhén, és a curryvel, lime-lével tálald.',
    ],
    preparationTime: 15,
    cookingTime: 35,
    vegetarian: true,
    vegan: true,
    keto: true,
  }),
  makeDietaryRecipe({
    id: 'main-100',
    name: 'Cukkinis tojáslepény fetával',
    category: 'main',
    note: 'Vegetáriánus és keto gyors vacsora',
    ingredients: [
      ['tojás', 8, 'db'], ['cukkini', 2, 'db'], ['feta sajt', 150, 'g'],
      ['újhagyma', 3, 'db'], ['olívaolaj', 1, 'ek'], ['petrezselyemzöld', 0.5, 'csokor'],
      ['só', 0.5, 'tk'], ['bors', 0.5, 'tk'],
    ],
    steps: [
      'Melegítsd elő a sütőt 190 °C-ra. A cukkinit reszeld durvára, enyhén sózd, majd 10 perc után nyomkodd ki a levét.',
      'A tojásokat verd fel borssal. Keverd hozzá a cukkinit, a karikázott újhagymát, az aprított petrezselymet és a feta felét.',
      'Egy sütőbe tehető serpenyőt kenj ki olajjal, öntsd bele a keveréket, és közepes lángon süsd 4 percig.',
      'Szórd rá a maradék fetát, majd tedd a sütőbe 12–15 percre, amíg a közepe megszilárdul.',
      'Akkor kész, ha a közepe megszilárdult és eléri a 71 °C-ot. Pihentesd 5 percig, majd szeleteld.',
    ],
    preparationTime: 20,
    cookingTime: 20,
    vegetarian: true,
    keto: true,
    commonAllergens: ['milk', 'egg'],
    childFriendly: true,
    estimatedCostCategory: '$',
  }),
];

export const dietaryRecipePackOneEnglishInstructions: Record<string, string> = {
  'soup-31': `1. Rinse the red lentils. Finely chop the onion and garlic and thinly slice the carrots.

2. Heat the oil and cook the onion for 5 minutes. Add the garlic and ginger for 30 seconds.

3. Stir in the tomato paste, lentils, carrots, and water. Bring to a boil, then simmer for 18–20 minutes.

4. When the lentils are completely soft, add the coconut milk and salt and warm for another 3 minutes.

5. Blend half the soup, stir it back into the chunky half, and add lime juice gradually to taste.`,
  'soup-32': `1. Divide the broccoli into small florets and dice the peeled stem. Finely chop the onion and garlic.

2. Cook the onion in oil for 5 minutes, add the garlic for 30 seconds, then add the broccoli stem.

3. Add the water and simmer for 5 minutes. Add the florets and cook for another 7–8 minutes.

4. Remove from the heat, add the coconut milk, and blend until completely smooth.

5. Season with salt, pepper, and a little lemon juice. Warm gently without a hard boil.`,
  'main-91': `1. Drain and rinse the two cans of chickpeas; about 480 g should remain. Cut the zucchini and pepper into bite-sized pieces and chop the onion and garlic.

2. Cook the onion in olive oil for 5 minutes. Add the pepper and zucchini and cook for another 6 minutes.

3. Add the garlic and oregano, then after 30 seconds stir in the tomatoes and chickpeas.

4. Season and simmer uncovered for 15 minutes, until the sauce thickens and the vegetables are tender.

5. Taste, adjust the salt, and finish with chopped parsley.`,
  'main-92': `1. Divide the cauliflower into florets and boil in salted water for 12–15 minutes, until very soft.

2. Slice the mushrooms and chop the onion and garlic. Cook the onion in half the oil for 5 minutes.

3. Add the mushrooms and cook in a wide pan over higher heat for 8 minutes so they brown instead of only steaming. Stir in the garlic, tomato paste, and thyme.

4. Add the stock and lentils. Season and simmer for 12 minutes.

5. Drain the cauliflower, reserving 100 ml cooking water. Blend it with the remaining oil, adding only enough cooking water to make it creamy. Serve with the thick lentil ragout.`,
  'main-93': `1. Heat the oven to 200 °C. Choose similar medium sweet potatoes, scrub them, prick them with a fork, and place on a lined tray.

2. Bake for 45–60 minutes depending on size, until easily pierced with a knife. Meanwhile, finely chop the garlic.

3. Cook the garlic in oil for 30 seconds, add the spinach, and wilt for 3–4 minutes.

4. Split the potatoes lengthwise, fluff the centres with a fork, and top with spinach and crumbled feta.

5. Return to the oven for 5 minutes, then finish with lemon juice and black pepper.`,
  'main-94': `1. Heat the oven to 210 °C. Cut the vegetables into similar 2 cm pieces.

2. Spread them in one layer across two lined trays, add olive oil, oregano, and pepper, and toss well.

3. Roast for 18 minutes, stirring and swapping the trays halfway. Slice the halloumi about 1 cm thick.

4. Divide the cheese among the vegetables and roast for another 10–12 minutes, until golden at the edges.

5. Finish with lemon juice. Taste before adding salt because halloumi is already salty.`,
  'main-95': `1. Divide the cauliflower into florets and boil in salted water for 12–15 minutes, until completely soft.

2. Cut the chicken into even cutlets, season, and cook in olive oil for 4–5 minutes per side.

3. Add the crushed garlic, juice of half the lemon, and 50 ml water. Cover and cook for another 4 minutes.

4. Drain the cauliflower thoroughly and blend with the butter and cream until smooth. Taste before adding more salt.

5. The thickest part of the chicken must reach 74 °C. Rest for 3 minutes, then serve with the cauliflower purée and lemon.`,
  'main-96': `1. Pat the salmon dry and cut into four portions. Slice the zucchini into 5 mm rounds.

2. Heat half the butter. Season the salmon and, if it has skin, cook it skin-side down for 4 minutes.

3. Turn and cook for another 3–4 minutes. It is safe when the thickest part reaches 63 °C; without a thermometer, the centre should be opaque and flake easily. Transfer to a plate.

4. Add the remaining butter and zucchini to the pan. Cook for 5–6 minutes, then add the garlic for 30 seconds.

5. Return the salmon, add lemon juice and dill, and serve immediately.`,
  'main-97': `1. Mix the turkey with the egg, half the oregano, half a teaspoon of salt, and pepper.

2. With wet hands, shape 16 small meatballs. Brown them in half the oil for 7–8 minutes, then set aside.

3. Cook the chopped onion in the remaining oil for 5 minutes, add the garlic, then add the tomatoes.

4. Return the meatballs, cover, and simmer for 12 minutes. Meanwhile, slice the zucchini into thin strips or half-moons.

5. Add the zucchini for the final 5 minutes. The centre of the largest meatball must reach 74 °C; colour alone is not a reliable check.`,
  'main-98': `1. Press the tofu dry between paper towels and cut into 2 cm cubes. Divide the broccoli into small florets.

2. Heat half the oil and brown the tofu for 8–10 minutes. Leave it undisturbed between turns so it forms a crust.

3. Remove the tofu. Add the broccoli and water to the pan, cover, and steam for 5 minutes.

4. Add the remaining oil, ginger, and garlic. After 30 seconds return the tofu and pour in the gluten-free tamari.

5. Toss for 2 minutes and finish with lime juice. Taste before salting because tamari is salty.`,
  'main-99': `1. Cut the eggplant into 2 cm cubes. Pulse the cauliflower in batches until it resembles grains of rice.

2. Cook the chopped onion in half the oil for 5 minutes. Add the garlic and curry powder for 30 seconds.

3. Add the eggplant and cook for 6 minutes, then add the tomatoes, coconut milk, and salt.

4. Simmer uncovered for 18–20 minutes, until the eggplant is soft and the sauce has thickened.

5. Cook the cauliflower rice in the remaining oil for 6–7 minutes. Season lightly and serve with the curry and lime.`,
  'main-100': `1. Heat the oven to 190 °C. Coarsely grate the zucchini, salt lightly, and squeeze out the liquid after 10 minutes.

2. Beat the eggs with pepper. Mix in the zucchini, sliced green onions, chopped parsley, and half the feta.

3. Oil an oven-safe skillet, pour in the mixture, and cook over medium heat for 4 minutes.

4. Add the remaining feta and bake for 12–15 minutes, until the centre is set.

5. It is ready when the centre is set and reaches 71 °C. Rest for 5 minutes before slicing.`,
};
