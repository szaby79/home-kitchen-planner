import { FoodRestriction, Recipe } from '@/types/recipe';

type StewAudit = {
  preparationTime: number;
  cookingTime: number;
  restingTime?: number;
  commonAllergens: FoodRestriction[];
  note: string;
  englishNote: string;
  hungarianSteps: string[];
  englishSteps: string[];
};

const stewAudit: Record<string, StewAudit> = {
  'main-24': {
    preparationTime: 20, cookingTime: 30, commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Puha zöldbabfőzelék frissen sült fasírttal', englishNote: 'Tender green bean stew with freshly cooked meat patties',
    hungarianSteps: [
      'A zöldbabot mosd meg, vágd 3–4 cm-es darabokra, a hagymát és a fokhagymát aprítsd fel. A zsemlét áztasd kevés vízbe, majd alaposan nyomkodd ki.',
      'Tedd a babot lábasba kb. 7 dl vízzel és a só felével. Forrald fel, majd kis lángon, fedő alatt főzd 12–18 percig; akkor jó, ha puha, de még tartja a formáját.',
      'Amíg a bab fő, keverd össze a darált húst a kinyomkodott zsemlével, tojással, hagymával, fokhagymával, petrezselyemmel és a maradék sóval. Formázz 8 lapos pogácsát.',
      'Kevés olajon, közepes lángon süsd a pogácsákat oldalanként 4–5 percig, szükség esetén több adagban. A közepük érje el a 71 °C-ot; a serpenyő és a nyers hús után moss kezet és eszközt.',
      'Keverd simára a tejfölt a liszttel és egy merőkanál forró főzőlével. Csorgasd a babhoz, majd kevergetve gyöngyöztesd 2–3 percig. Az ecetet és a cukrot apránként, kóstolva add hozzá, és a fasírttal tálald.',
    ],
    englishSteps: [
      'Rinse the green beans and cut them into 3–4 cm pieces. Finely chop the onion and garlic. Soak the bread roll in a little water, then squeeze it dry.',
      'Put the beans in a saucepan with about 700 ml water and half the salt. Bring to a boil, then cover and simmer for 12–18 minutes, until tender but still holding their shape.',
      'While the beans simmer, mix the ground meat with the squeezed roll, egg, onion, garlic, parsley, and remaining salt. Shape into 8 flat patties.',
      'Cook the patties in a little oil over medium heat for 4–5 minutes per side, in batches if needed. Check that the centre reaches 71 °C. Wash hands and utensils after handling raw meat.',
      'Whisk the sour cream and flour with a ladleful of hot cooking liquid until smooth. Stir it into the beans and simmer gently for 2–3 minutes. Add the vinegar and sugar gradually to taste, then serve with the patties.',
    ],
  },
  'main-25': {
    preparationTime: 20, cookingTime: 60, commonAllergens: ['gluten', 'milk', 'lactose'],
    note: 'Édeskés zöldborsófőzelék lassan puhult sertéspörkölttel', englishNote: 'Gently sweet green pea stew with tender pork pörkölt',
    hungarianSteps: [
      'A sertéshúst vágd kb. 2 cm-es kockákra, a két hagymát aprítsd fel. Készíts elő egy másik lábast is a borsónak.',
      'Egy lábasban melegítsd fel az olaj felét, és párold rajta az egyik hagymát 5 percig. Húzd le a tűzről, keverd bele a pirospaprikát, majd rögtön adj hozzá 2–3 evőkanál vizet, hogy a paprika ne égjen meg.',
      'Tedd bele a húst és a só felét. Önts hozzá annyi vizet, hogy az edény alján legyen kb. 1 dl, fedd le, és kis lángon főzd 45–55 percig. Időnként keverd meg, és csak akkor pótolj kevés vizet, ha a szaft elfőne.',
      'Közben a borsót és a másik hagymát tedd a másik lábasba kb. 5 dl vízzel. Kis lángon főzd 8–12 percig, amíg megpuhul, de nem esik szét.',
      'Keverd csomómentesre a tejfölt a liszttel és egy merőkanál borsólével. Keverd vissza a főzelékbe, majd gyöngyöztesd 2–3 percig. Kóstold meg, és csak ezután add hozzá a cukrot vagy a további sót. A pörkölttel tálald.',
    ],
    englishSteps: [
      'Cut the pork into roughly 2 cm cubes and finely chop both onions. Set out a second saucepan for the peas.',
      'Heat half the oil in one pan and soften one onion for 5 minutes. Take the pan off the heat, stir in the paprika, then immediately add 2–3 tablespoons of water so it does not burn.',
      'Add the pork and half the salt. Add enough water to leave about 100 ml in the bottom of the pan, cover, and simmer gently for 45–55 minutes. Stir occasionally and add a splash of water only if the sauce is drying out.',
      'Meanwhile, put the peas and the other onion in the second pan with about 500 ml water. Simmer for 8–12 minutes, until tender but not falling apart.',
      'Whisk the sour cream and flour with a ladleful of pea cooking liquid until smooth. Stir it back into the peas and simmer gently for 2–3 minutes. Taste before adding sugar or more salt. Serve with the pork pörkölt.',
    ],
  },
  'main-26': {
    preparationTime: 15, cookingTime: 50, restingTime: 3, commonAllergens: ['gluten'],
    note: 'Ecetes-babérleveles lencse serpenyős sertéskarajjal', englishNote: 'Vinegar and bay lentils with pan-seared pork loin',
    hungarianSteps: [
      'A lencsét válogasd át, mosd meg, majd tedd lábasba az aprított hagymával és a babérlevéllel. Előzetes áztatás nem szükséges.',
      'Önts rá kb. 9 dl vizet, forrald fel, majd kis lángon főzd 25–35 percig. A főzés végén ellenőrizd: a lencse legyen puha, de ne főjön szét. A sót a vége felé add hozzá.',
      'Amíg a lencse fő, a karajt vágd négy, nagyjából egyforma szeletre, töröld szárazra és sózd meg. Kevés forró olajon süsd oldalanként 3–5 percig, vastagságtól függően; a közepe érje el a 63 °C-ot, majd pihentesd legalább 3 percig.',
      'Keverd simára a lisztet 3 evőkanál hideg vízzel, majd keverj hozzá egy merőkanál lencselevet. Öntsd vissza a lábasba, és kevergetve forrald 2–3 percig, amíg enyhén besűrűsödik.',
      'Az ecetet és a cukrot kis adagokban, kóstolva add hozzá. Vedd ki a babérlevelet, és a lencsét a pihentetett hússal tálald.',
    ],
    englishSteps: [
      'Sort through and rinse the lentils, then put them in a saucepan with the chopped onion and bay leaf. Soaking is not needed.',
      'Add about 900 ml water, bring to a boil, then simmer for 25–35 minutes. Check near the end: the lentils should be tender but not collapsing. Add the salt toward the end.',
      'While the lentils simmer, cut the pork loin into four even slices, pat dry, and season with salt. Sear in a little hot oil for 3–5 minutes per side, depending on thickness. The centre should reach 63 °C; rest for at least 3 minutes.',
      'Whisk the flour with 3 tablespoons cold water, then whisk in a ladleful of lentil liquid. Stir it back into the pan and simmer, stirring, for 2–3 minutes until lightly thickened.',
      'Add the vinegar and sugar a little at a time, tasting as you go. Remove the bay leaf and serve the lentils with the rested pork.',
    ],
  },
  'main-27': {
    preparationTime: 20, cookingTime: 30, commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Friss kapros tökfőzelék házi fasírttal', englishNote: 'Fresh dill squash stew with homemade meat patties',
    hungarianSteps: [
      'Ha egész tököt használsz, hámozd meg, felezd el, kapard ki a magos közepét, majd reszeld le. A gyalult tököt nem kell kinyomkodni. A zsemlét áztasd be, a kaprot aprítsd fel.',
      'Keverd össze a darált húst a kinyomkodott zsemlével, tojással és a só felével. Formázz 8 lapos pogácsát.',
      'Tedd a tököt lábasba kb. 2 dl vízzel, a kapor felével és kevés sóval. Lefedve, kis lángon főzd 10–15 percig, amíg megpuhul, de nem pépesedik.',
      'Közben kevés olajon, közepes lángon süsd a pogácsákat oldalanként 4–5 percig, szükség esetén több adagban. A közepük érje el a 71 °C-ot.',
      'Keverd simára a tejfölt a liszttel és egy merőkanál meleg töklével. Keverd a főzelékhez, gyöngyöztesd 2–3 percig, majd a maradék kaporral, ecettel és cukorral ízesítsd apránként, kóstolva. Fasírttal tálald.',
    ],
    englishSteps: [
      'If using a whole squash, peel it, halve it, remove the seeded centre, and grate it. Ready-shredded squash does not need squeezing. Soak the bread roll and chop the dill.',
      'Mix the ground meat with the squeezed roll, egg, and half the salt. Shape into 8 flat patties.',
      'Put the squash in a saucepan with about 200 ml water, half the dill, and a little salt. Cover and simmer gently for 10–15 minutes, until tender but not mushy.',
      'Meanwhile, cook the patties in a little oil over medium heat for 4–5 minutes per side, in batches if needed. The centre should reach 71 °C.',
      'Whisk the sour cream and flour with a ladleful of warm squash liquid until smooth. Stir into the squash and simmer gently for 2–3 minutes. Add the remaining dill, vinegar, and sugar gradually to taste. Serve with the patties.',
    ],
  },
  'main-71': {
    preparationTime: 15, cookingTime: 65, commonAllergens: ['gluten'],
    note: 'Sűrű, laktató sárgaborsófőzelék pirult virslivel', englishNote: 'Hearty yellow split-pea stew with browned frankfurters',
    hungarianSteps: [
      'A sárgaborsót válogasd át és öblítsd le. A hagymát aprítsd fel, a fokhagymát zúzd össze.',
      'Melegítsd fel az olajat egy nagy lábasban, és párold rajta a hagymát 4–5 percig. Húzd le a tűzről, add hozzá a fokhagymát, majd keverd bele a borsót és a babérlevelet.',
      'Önts rá kb. 1,5 liter vizet, forrald fel, majd kis lángon, félig lefedve főzd 45–55 percig. Keverd meg időnként; ha túl sűrű, pótolj forró vizet. Akkor jó, ha a borsó teljesen megpuhult.',
      'Keverd csomómentesre a lisztet kb. 100 ml hideg vízzel, majd adj hozzá egy merőkanál főzőlevet. Keverd a főzelékhez és gyöngyöztesd 3 percig. Sózd meg, majd vedd ki a babérlevelet.',
      'A virslit karikázd fel, és serpenyőben, kevés olajon pirítsd 5–7 percig. A főzeléket a virslivel tálald.',
    ],
    englishSteps: [
      'Sort through and rinse the split peas. Finely chop the onion and crush the garlic.',
      'Heat the oil in a large saucepan and soften the onion for 4–5 minutes. Take the pan off the heat, add the garlic, then stir in the peas and bay leaves.',
      'Add about 1.5 litres water and bring to a boil. Partly cover and simmer gently for 45–55 minutes, stirring now and then. Add hot water if it becomes too thick. The peas should be completely soft.',
      'Whisk the flour with about 100 ml cold water, then add a ladleful of hot cooking liquid. Stir into the stew and simmer gently for 3 minutes. Season with salt and remove the bay leaves.',
      'Slice the frankfurters and brown them in a little oil for 5–7 minutes. Serve with the stew.',
    ],
  },
  'main-72': {
    preparationTime: 20, cookingTime: 90, commonAllergens: ['gluten'],
    note: 'Paradicsomos káposzta omlósra sült oldalassal', englishNote: 'Tomato cabbage with slow-roasted, tender pork ribs',
    hungarianSteps: [
      'Melegítsd elő a sütőt 180 °C-ra. Az oldalast sózd meg, tedd egy tepsibe 100 ml vízzel, fedd le szorosan fóliával, és süsd 60 percig.',
      'Közben a káposztát vágd vékony csíkokra, a hagymát aprítsd fel. Egy nagy lábasban melegítsd fel az olajat, és párold a hagymát 4 percig.',
      'Add hozzá a káposztát, a paradicsomszószt, a cukrot és kb. 2 dl vizet. Fedd le, és kis lángon főzd 30–40 percig, közben néhányszor keverd meg.',
      'Vedd le a fóliát az oldalasról, és süsd további 15–25 percig, amíg megpuhul és megpirul. Ha a hús még nem omlós, süsd tovább, szükség esetén ismét lefedve.',
      'Keverd simára a lisztet 3 evőkanál hideg vízzel, forgasd a káposztához, és főzd 2–3 percig. Kóstold meg, állítsd be a sót és a cukrot, majd tálald a sült oldalassal.',
    ],
    englishSteps: [
      'Heat the oven to 180 °C. Season the ribs, place them in a roasting dish with 100 ml water, cover tightly with foil, and roast for 60 minutes.',
      'Meanwhile, finely shred the cabbage and chop the onion. Heat the oil in a large saucepan and soften the onion for 4 minutes.',
      'Add the cabbage, tomato sauce, sugar, and about 200 ml water. Cover and simmer gently for 30–40 minutes, stirring a few times.',
      'Uncover the ribs and roast for another 15–25 minutes, until tender and browned. If they are not tender yet, continue roasting, covered again if needed.',
      'Whisk the flour with 3 tablespoons cold water, stir it into the cabbage, and cook for 2–3 minutes. Taste and adjust the salt and sugar, then serve with the ribs.',
    ],
  },
  'main-73': {
    preparationTime: 20, cookingTime: 90, restingTime: 480, commonAllergens: ['egg', 'milk', 'lactose', 'gluten'],
    note: 'Krémes fehérbabfőzelék frissen sült tükörtojással', englishNote: 'Creamy white bean stew with freshly fried eggs',
    hungarianSteps: [
      'Előző este áztasd be a 300 g száraz babot legalább háromszoros mennyiségű hideg vízbe. Másnap öntsd le és öblítsd át.',
      'Tedd a babot lábasba a babérlevéllel és kb. 1,2 liter friss vízzel. Forrald fel, majd kis lángon, félig lefedve főzd 60–90 percig, amíg teljesen megpuhul. A sót a főzés vége felé add hozzá.',
      'A fokhagymát zúzd össze. Keverd simára a lisztet a tejföllel és egy merőkanál forró főzőlével, majd keverd a babhoz. Kis lángon, kevergetve gyöngyöztesd 3 percig; ne forrald erősen.',
      'Egy serpenyőben kevés olajon süsd meg a tojásokat. Fedd le rövid időre, hogy a fehérje és a sárgája is megszilárduljon.',
      'Vedd ki a babérlevelet, kóstold meg a főzeléket, és szükség szerint sózd. A tükörtojással frissen tálald.',
    ],
    englishSteps: [
      'The night before, soak the 300 g dried beans in at least three times their volume of cold water. The next day, drain and rinse them.',
      'Put the beans in a saucepan with the bay leaves and about 1.2 litres fresh water. Bring to a boil, then partly cover and simmer gently for 60–90 minutes, until completely tender. Add the salt toward the end.',
      'Crush the garlic. Whisk the flour and sour cream with a ladleful of hot bean liquid until smooth, then stir into the beans. Simmer gently, stirring, for 3 minutes; do not boil hard.',
      'Fry the eggs in a little oil. Cover the pan briefly so both the whites and yolks set.',
      'Remove the bay leaves, taste the stew, and add salt if needed. Serve with the fried eggs while they are fresh.',
    ],
  },
  'main-74': {
    preparationTime: 20, cookingTime: 25, commonAllergens: ['egg', 'gluten', 'milk', 'lactose'],
    note: 'Könnyű, kapros cukkinifőzelék sült húspogácsával', englishNote: 'Light dill zucchini stew with browned meat patties',
    hungarianSteps: [
      'A cukkinit mosd meg, nagy lyukú reszelőn reszeld le, majd enyhén sózd meg. A kaprot aprítsd fel.',
      'Keverd össze a darált húst a tojással, zsemlemorzsával és a só egy részével. Nedves kézzel formázz 8 lapos pogácsát.',
      'Tedd a cukkinit lábasba kb. 150 ml vízzel és a kapor felével. Kis lángon, fedő alatt főzd 8–10 percig; a cukkini levet enged, ezért ne önts hozzá több vizet, amíg nem látod, hogy szükséges-e.',
      'Közben süsd a pogácsákat serpenyőben, kevés olajon oldalanként 4–5 percig. A közepük érje el a 71 °C-ot. A nyers hús után moss kezet és eszközt.',
      'Keverd simára a tejfölt a liszttel és egy merőkanál meleg cukkinilével. Keverd a főzelékhez, és gyöngyöztesd 2–3 percig. Add hozzá a maradék kaprot, kóstold meg, majd a húspogácsával tálald.',
    ],
    englishSteps: [
      'Rinse and coarsely grate the zucchini, then season lightly with salt. Chop the dill.',
      'Mix the ground meat with the egg, breadcrumbs, and some of the salt. With damp hands, shape into 8 flat patties.',
      'Put the zucchini in a saucepan with about 150 ml water and half the dill. Cover and simmer gently for 8–10 minutes. Zucchini releases liquid, so wait before adding more water.',
      'Meanwhile, fry the patties in a little oil for 4–5 minutes per side. The centre should reach 71 °C. Wash hands and utensils after handling raw meat.',
      'Whisk the sour cream and flour with a ladleful of warm zucchini liquid until smooth. Stir into the stew and simmer gently for 2–3 minutes. Add the remaining dill, taste, and serve with the patties.',
    ],
  },
  'main-75': {
    preparationTime: 18, cookingTime: 55, commonAllergens: ['milk', 'lactose', 'gluten'],
    note: 'Petrezselymes karfiolfőzelék ropogósra sült csirkecombbal', englishNote: 'Parsley cauliflower stew with oven-roasted chicken thighs',
    hungarianSteps: [
      'Melegítsd elő a sütőt 200 °C-ra. A csirkecombokat töröld szárazra, sózd meg, kend meg olajjal, majd szórd meg pirospaprikával.',
      'Tedd a combokat bőrös felükkel felfelé tepsibe. Süsd 45–55 percig, a combok méretétől függően; a legvastagabb részen, a csontot elkerülve mérve érjék el a 74 °C-ot.',
      'Közben szedd rózsáira a karfiolt. Tedd lábasba annyi vízzel, hogy az alját ellepje, sózd meg, majd lefedve főzd 10–15 percig, amíg villával könnyen átszúrható, de nem esik szét.',
      'A tejfölt keverd csomómentesre a liszttel és egy merőkanál karfiolfőző lével. Keverd vissza, majd kis lángon gyöngyöztesd 2–3 percig.',
      'A petrezselymet aprítsd fel, keverd a főzelékhez, kóstold meg, és szükség szerint sózd. A csirkecombokat a főzelékkel tálald.',
    ],
    englishSteps: [
      'Heat the oven to 200 °C. Pat the chicken thighs dry, season with salt, rub with oil, and sprinkle with paprika.',
      'Place the thighs skin-side up in a roasting dish. Roast for 45–55 minutes, depending on size. Check the thickest part without touching the bone; it should reach 74 °C.',
      'Meanwhile, break the cauliflower into florets. Put it in a saucepan with enough water to cover the bottom, season with salt, and cover. Simmer for 10–15 minutes, until easily pierced but not falling apart.',
      'Whisk the sour cream and flour with a ladleful of cauliflower liquid until smooth. Stir it back into the pan and simmer gently for 2–3 minutes.',
      'Chop the parsley and stir it into the stew. Taste, add salt if needed, and serve with the chicken thighs.',
    ],
  },
  'main-76': {
    preparationTime: 20, cookingTime: 25, commonAllergens: ['milk', 'lactose', 'gluten', 'egg'],
    note: 'Selymes brokkolifőzelék sajtos sertéspogácsával', englishNote: 'Creamy broccoli stew with cheesy pork patties',
    hungarianSteps: [
      'Melegítsd elő a sütőt 200 °C-ra, és bélelj ki egy tepsit sütőpapírral. A brokkolit szedd rózsáira, a fokhagymát zúzd össze.',
      'Keverd össze a darált húst a tojással, a reszelt sajttal, a zsemlemorzsával és a só felével. Formázz 8 kisebb, lapos pogácsát, és tedd őket a tepsire.',
      'Süsd a pogácsákat 18–22 percig, félidőben fordítsd meg őket. A közepük érje el a 71 °C-ot.',
      'Közben a brokkolit és a fokhagymát tedd lábasba kb. 150 ml vízzel. Fedd le, főzd 8–10 percig, amíg a brokkoli megpuhul, de még tartja az alakját.',
      'Keverd csomómentesre a lisztet a hideg tej egy részével, majd öntsd hozzá a maradék tejet. Keverd a brokkolihoz, és kis lángon főzd 2–3 percig, amíg besűrűsödik. Kóstold meg, majd a pogácsával tálald.',
    ],
    englishSteps: [
      'Heat the oven to 200 °C and line a baking tray with parchment. Break the broccoli into florets and crush the garlic.',
      'Mix the ground pork with the egg, grated cheese, breadcrumbs, and half the salt. Shape into 8 small, flat patties and place on the tray.',
      'Bake for 18–22 minutes, turning halfway through. The centre should reach 71 °C.',
      'Meanwhile, put the broccoli and garlic in a saucepan with about 150 ml water. Cover and simmer for 8–10 minutes, until tender but still holding its shape.',
      'Whisk the flour with some of the cold milk until smooth, then whisk in the rest. Stir into the broccoli and cook gently for 2–3 minutes until thickened. Taste and serve with the patties.',
    ],
  },
  'main-77': {
    preparationTime: 15, cookingTime: 30, commonAllergens: ['milk', 'lactose', 'gluten'],
    note: 'Szelíd ízű sárgarépafőzelék szaftos sült csirkemellel', englishNote: 'Mild carrot stew with juicy pan-cooked chicken breast',
    hungarianSteps: [
      'A sárgarépát hámozd meg és vágd kb. fél centis karikákra. A csirkemellet vágd négy vékony szeletre, majd sózd meg.',
      'Tedd a répát lábasba kb. 4 dl vízzel, a só felével és a cukorral. Fedd le, főzd 15–20 percig, amíg megpuhul, de nem mállik szét.',
      'Közben egy serpenyőben hevítsd fel az olaj felét. Süsd a csirkét oldalanként 4–6 percig, a szeletek vastagságától függően; a közepe érje el a 74 °C-ot. Tedd félre pihenni.',
      'A tejfölt keverd simára a liszttel és egy merőkanál répás főzőlével. Keverd vissza a lábasba, és gyöngyöztesd 2–3 percig.',
      'A petrezselymet aprítsd fel, keverd a főzelékhez. Kóstold meg, sózd szükség szerint, és tálald a pihentetett csirkemellel.',
    ],
    englishSteps: [
      'Peel the carrots and cut them into roughly 5 mm rounds. Cut the chicken breast into four thin slices and season with salt.',
      'Put the carrots in a saucepan with about 400 ml water, half the salt, and the sugar. Cover and simmer for 15–20 minutes, until tender but not falling apart.',
      'Meanwhile, heat half the oil in a frying pan. Cook the chicken for 4–6 minutes per side, depending on thickness; the centre should reach 74 °C. Set aside to rest.',
      'Whisk the sour cream and flour with a ladleful of carrot liquid until smooth. Stir it back into the pan and simmer gently for 2–3 minutes.',
      'Chop the parsley and stir it into the stew. Taste, add salt if needed, and serve with the rested chicken.',
    ],
  },
  'main-78': {
    preparationTime: 20, cookingTime: 60, commonAllergens: ['milk', 'lactose', 'gluten'],
    note: 'Paprikás sertéspörkölt puha zellerrel', englishNote: 'Paprika pork pörkölt with tender celeriac',
    hungarianSteps: [
      'A sertéscombot vágd 2 cm-es kockákra, a hagymát aprítsd fel. A zellert hámozd meg, majd vágd kb. 2 cm-es kockákra.',
      'Egy nagy lábasban hevítsd fel az olaj felét, és párold a hagymát 5 percig. Húzd le a tűzről, keverd hozzá a pirospaprikát, majd rögtön adj hozzá 2 evőkanál vizet, hogy ne égjen meg.',
      'Add hozzá a húst és a só felét. Önts hozzá kb. 2 dl vizet, fedd le, és kis lángon főzd 45–55 percig, amíg a hús majdnem puha. Közben keverd meg, és szükség esetén pótolj kevés vizet.',
      'A sertés főzése utolsó 20 percében egy másik lábasban tedd a zellert kb. 3 dl vízbe, és főzd 15–20 percig, amíg megpuhul. A tejfölt keverd simára a liszttel és egy merőkanál zelleres főzőlével.',
      'Keverd a habarást a zellerhez, és gyöngyöztesd 2–3 percig. Kóstold meg, majd a zellerfőzeléket a pörkölttel tálald.',
    ],
    englishSteps: [
      'Cut the pork into 2 cm cubes and chop the onions. Peel the celeriac and cut it into roughly 2 cm cubes.',
      'Heat half the oil in a large pan and soften the onion for 5 minutes. Remove from the heat, stir in the paprika, then immediately add 2 tablespoons water so it does not burn.',
      'Add the pork and half the salt. Pour in about 200 ml water, cover, and simmer gently for 45–55 minutes, until nearly tender. Stir occasionally and add a splash of water if needed.',
      'During the final 20 minutes of the pork cooking time, simmer the celeriac in about 300 ml water in a second pan for 15–20 minutes, until tender. Whisk the sour cream and flour with a ladleful of celeriac liquid until smooth.',
      'Stir the mixture into the celeriac and simmer gently for 2–3 minutes. Taste, then serve the celeriac stew with the pork pörkölt.',
    ],
  },
  'main-79': {
    preparationTime: 15, cookingTime: 25, commonAllergens: ['milk', 'lactose', 'gluten'],
    note: 'Vajas kukoricafőzelék ropogósra sült szalonnával', englishNote: 'Buttery corn stew with crisp bacon',
    hungarianSteps: [
      'Ha konzerv kukoricát használsz, csepegtesd le; a fagyasztottat nem kell előre kiolvasztani. A hagymát aprítsd fel, a petrezselymet vágd finomra.',
      'A szalonnát kockázd fel, majd hideg serpenyőben kezdd melegíteni. Közepes lángon süsd 6–8 percig, amíg ropogós lesz. Szedd ki, a kisült zsírt hagyd a serpenyőben.',
      'A vajat add a szalonnazsírhoz, párold rajta a hagymát 4 percig, majd add hozzá a kukoricát és a só felét. Kevergetve melegítsd át 3–4 perc alatt.',
      'Keverd csomómentesre a lisztet kevés hideg tejjel, majd fokozatosan dolgozd hozzá a maradék tejet. Öntsd a kukoricára, és kis lángon, kevergetve főzd 5–7 percig, amíg krémesre sűrűsödik.',
      'A petrezselymet keverd hozzá, kóstold meg, és szükség szerint sózd. A ropogós szalonnával tálald.',
    ],
    englishSteps: [
      'If using canned corn, drain it; frozen corn can go in straight from the freezer. Chop the onion and finely chop the parsley.',
      'Dice the bacon and start it in a cold frying pan. Cook over medium heat for 6–8 minutes until crisp. Remove it, leaving the rendered fat in the pan.',
      'Add the butter to the bacon fat and soften the onion for 4 minutes. Add the corn and half the salt, then stir and heat through for 3–4 minutes.',
      'Whisk the flour with a little cold milk until smooth, then gradually whisk in the rest. Pour over the corn and cook gently, stirring, for 5–7 minutes until creamy.',
      'Stir in the parsley, taste, and add salt if needed. Serve topped with the crisp bacon.',
    ],
  },
  'main-80': {
    preparationTime: 15, cookingTime: 25, commonAllergens: ['milk', 'lactose', 'gluten'],
    note: 'Gyors csicseriborsó-főzelék pirult füstölt kolbásszal', englishNote: 'Quick chickpea stew with browned smoked sausage',
    hungarianSteps: [
      'A konzerv csicseriborsót öntsd szűrőbe, öblítsd le, majd csepegtesd le. A fokhagymát zúzd össze, a babérlevelet készítsd elő.',
      'A kolbászt karikázd fel, és száraz serpenyőben pirítsd mindkét oldalán 2–3 percig. Tedd félre.',
      'Egy lábasban melegítsd fel az olajat. Húzd le a tűzről, keverd bele a pirospaprikát, majd rögtön add hozzá a csicseriborsót, fokhagymát, babérlevelet és kb. 3 dl vizet.',
      'Forrald fel, majd kis lángon főzd 8–10 percig. A tejfölt keverd simára a liszttel és egy merőkanál forró lével, majd keverd a főzelékhez. Gyöngyöztesd 2–3 percig.',
      'Vedd ki a babérlevelet, kóstold meg, és szükség szerint sózd. A pirult kolbásszal tálald.',
    ],
    englishSteps: [
      'Tip the canned chickpeas into a sieve, rinse, and drain well. Crush the garlic and set out the bay leaves.',
      'Slice the sausage and brown it in a dry frying pan for 2–3 minutes per side. Set aside.',
      'Heat the oil in a saucepan. Take it off the heat, stir in the paprika, then immediately add the chickpeas, garlic, bay leaves, and about 300 ml water.',
      'Bring to a boil and simmer gently for 8–10 minutes. Whisk the sour cream and flour with a ladleful of hot liquid, then stir into the stew. Simmer gently for 2–3 minutes.',
      'Remove the bay leaves, taste, and add salt if needed. Serve with the browned sausage.',
    ],
  },
  'main-81': {
    preparationTime: 12, cookingTime: 30, commonAllergens: ['egg'],
    note: 'Sűrű vöröslencse-főzelék főtt tojással', englishNote: 'Thick red lentil stew with boiled eggs',
    hungarianSteps: [
      'A vöröslencsét öblítsd át. A hagymát aprítsd fel, a fokhagymát zúzd össze; a tojásokat külön lábasban tedd fel főni.',
      'A tojásokat forrástól számítva főzd 9–10 percig, majd hűtsd le hideg vízben és hámozd meg.',
      'Egy lábasban hevítsd fel az olajat, párold a hagymát 4–5 percig. Húzd le a tűzről, keverd bele a paradicsompürét és a fokhagymát, majd add hozzá a lencsét, babérlevelet és kb. 8 dl vizet.',
      'Forrald fel, majd kis lángon főzd 18–22 percig, időnként megkeverve. A lencse puhulás közben besűríti a főzeléket; ha túl sűrű, adj hozzá kevés forró vizet. A sót a vége felé add hozzá.',
      'Vedd ki a babérlevelet, kóstold meg, és a félbevágott főtt tojással tálald.',
    ],
    englishSteps: [
      'Rinse the red lentils. Chop the onion and crush the garlic; put the eggs in a separate saucepan to cook.',
      'Once the water boils, cook the eggs for 9–10 minutes. Cool them in cold water, then peel.',
      'Heat the oil in a saucepan and soften the onion for 4–5 minutes. Remove from the heat, stir in the tomato paste and garlic, then add the lentils, bay leaf, and about 800 ml water.',
      'Bring to a boil and simmer gently for 18–22 minutes, stirring occasionally. The lentils thicken the stew as they soften; add a little hot water if it gets too thick. Season with salt toward the end.',
      'Remove the bay leaf, taste, and serve with the boiled eggs halved.',
    ],
  },
};

export const auditedStewIds = Object.keys(stewAudit);
export const auditedStewEnglishInstructions = Object.fromEntries(
  Object.entries(stewAudit).map(([id, audit]) => [id, audit.englishSteps.map((step, index) => `${index + 1}. ${step}`).join('\n\n')]),
);
export const auditedStewEnglishNotes = Object.fromEntries(
  Object.values(stewAudit).map(audit => [audit.note, audit.englishNote]),
);

export const applyStewAudit = (recipe: Recipe): Recipe => {
  if (recipe.category !== 'stew') return recipe;

  const audit = stewAudit[recipe.id];
  if (!audit) return recipe;

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
