import { FoodRestriction, Recipe, RecipeDifficulty } from '@/types/recipe';

type DessertAudit = {
  preparationTime: number;
  cookingTime: number;
  restingTime?: number;
  difficulty?: RecipeDifficulty;
  commonAllergens: FoodRestriction[];
  note: string;
  englishNote: string;
  hungarianSteps: string[];
  englishSteps: string[];
};

const dessertAuditSecondBatch: Record<string, DessertAudit> = {
  'dessert-11': {
    preparationTime: 30, cookingTime: 25, restingTime: 85, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Puha kakaós csiga valós kelesztési idővel', englishNote: 'Soft cocoa rolls with realistic rising time',
    hungarianSteps: [
      'Langyosítsd meg a tejet; kézmeleg legyen, ne forró. Keverj bele 1 teáskanál cukrot és az élesztőt, majd várj 8–10 percet, amíg habos lesz.',
      'A lisztet keverd össze a sóval és a maradék kristálycukorral. Add hozzá az élesztős tejet, a tojásokat és 40 g olvasztott vajat, majd dagaszd 8–10 percig. Letakarva keleszd 50–60 percig, közel a kétszeresére.',
      'Nyújtsd a tésztát körülbelül 5 mm vastag téglalappá. Kend meg a maradék olvasztott vajjal, és egyenletesen szórd meg a kakaó és porcukor keverékével.',
      'A hosszabb oldalától tekerd fel, vágd 2–3 cm-es szeletekre, és tedd sütőpapíros tepsire hézagot hagyva. Letakarva keleszd még 20–25 percig; közben melegítsd elő a sütőt 180 °C-ra.',
      'Süsd 20–25 percig, amíg világos aranybarna lesz. Ne süsd sötétre, mert kiszárad; rácson hagyd legalább 10 percig hűlni.',
    ],
    englishSteps: [
      'Warm the milk until lukewarm, not hot. Stir in 1 teaspoon sugar and the yeast and wait 8–10 minutes, until foamy.',
      'Mix the flour with the salt and remaining granulated sugar. Add the yeast mixture, eggs, and 40 g melted butter and knead for 8–10 minutes. Cover and rise for 50–60 minutes, until nearly doubled.',
      'Roll the dough into a rectangle about 5 mm thick. Brush with the remaining melted butter and scatter the cocoa and icing sugar mixture evenly over it.',
      'Roll up from a long side, cut into 2–3 cm slices, and place apart on a lined tray. Cover and rise for another 20–25 minutes while heating the oven to 180 °C.',
      'Bake for 20–25 minutes, until light golden. Do not bake dark or the rolls will dry out; cool on a rack for at least 10 minutes.',
    ],
  },
  'dessert-12': {
    preparationTime: 20, cookingTime: 20, restingTime: 40, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Puha túrógombóc biztos állaggal és aranyszínű morzsával', englishNote: 'Tender cottage cheese dumplings with reliable texture and golden crumbs',
    hungarianSteps: [
      'A túrót törd át villával, majd keverd össze a grízzel, tojással, cukorral és sóval. Fedd le, és tedd hűtőbe legalább 30–40 percre, hogy a gríz felszívja a nedvességet.',
      'A vajat olvaszd fel széles serpenyőben, add hozzá a zsemlemorzsát, és közepes-kis lángon, folyamatosan keverve pirítsd 5–7 percig aranyszínűre. Húzd le a tűzről.',
      'Forralj fel egy nagy fazék enyhén sós vizet, majd vedd vissza gyöngyözőre. Nedves kézzel formázz 12 egyforma gombócot; először egy próbagombócot főzz ki.',
      'Ha a próbagombóc szétesik, keverj a masszához még 1 evőkanál grízt, és pihentesd 10 percig. A többi gombócot gyöngyöző vízben főzd: feljövés után még 4–5 percig.',
      'Szűrőkanállal emeld ki, csepegtesd le, és óvatosan forgasd a pirított morzsába. Tejföllel és porcukorral, frissen tálald.',
    ],
    englishSteps: [
      'Break up the cottage cheese with a fork, then mix with the semolina, eggs, sugar, and salt. Cover and refrigerate for at least 30–40 minutes so the semolina absorbs moisture.',
      'Melt the butter in a wide pan, add the breadcrumbs, and toast over medium-low heat for 5–7 minutes, stirring constantly, until golden. Remove from the heat.',
      'Bring a large pot of lightly salted water to a boil, then reduce to a gentle simmer. With wet hands, shape 12 equal dumplings and cook one test dumpling first.',
      'If the test dumpling falls apart, mix another tablespoon of semolina into the mixture and rest for 10 minutes. Simmer the remaining dumplings for 4–5 minutes after they rise.',
      'Lift out with a slotted spoon, drain, and gently coat in the toasted crumbs. Serve fresh with sour cream and icing sugar.',
    ],
  },
  'dessert-13': {
    preparationTime: 35, cookingTime: 30, restingTime: 90, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Puha lekváros bukta sűrű töltelékkel és valós kelesztéssel', englishNote: 'Soft jam buns with thick filling and realistic rising time',
    hungarianSteps: [
      'A tejből 200 ml-t langyosíts meg, keverj bele 1 teáskanál cukrot és az élesztőt, majd hagyd 8–10 percig habosodni. A maradék tejet tartsd félre a tészta állagának beállításához.',
      'A lisztet keverd össze a sóval és a maradék cukorral. Add hozzá az élesztős tejet, a tojásokat és 50 g olvasztott vajat, majd dagaszd 8–10 percig. Ha kemény, fokozatosan add hozzá a félretett tejet. Letakarva keleszd 50–60 percig.',
      'Nyújtsd 5–7 mm vastagra, és vágd körülbelül 10 cm-es négyzetekre. Mindegyik közepére tegyél 1 púpozott teáskanál sűrű lekvárt; a híg lekvár könnyen kifolyik.',
      'Zárd össze alaposan a széleket, és tedd a buktákat zárással lefelé egy kivajazott tepsibe. Kend meg a maradék olvasztott vajjal, majd letakarva keleszd még 25–30 percig.',
      '180 °C-ra előmelegített sütőben süsd 25–30 percig, amíg aranybarna lesz. Pihentesd 10 percig, és csak langyosan szórd meg porcukorral.',
    ],
    englishSteps: [
      'Warm 200 ml of the milk until lukewarm, stir in 1 teaspoon sugar and the yeast, and leave for 8–10 minutes until foamy. Reserve the remaining milk to adjust the dough.',
      'Mix the flour with the salt and remaining sugar. Add the yeast mixture, eggs, and 50 g melted butter and knead for 8–10 minutes. If firm, add the reserved milk gradually. Cover and rise for 50–60 minutes.',
      'Roll 5–7 mm thick and cut into squares about 10 cm wide. Put 1 heaped teaspoon thick jam in the centre of each; runny jam is likely to leak.',
      'Seal the edges well and place seam-side down in a buttered baking dish. Brush with the remaining melted butter, cover, and rise for another 25–30 minutes.',
      'Bake at 180 °C for 25–30 minutes, until golden. Rest for 10 minutes and dust with icing sugar only once warm rather than hot.',
    ],
  },
  'dessert-14': {
    preparationTime: 60, cookingTime: 55, restingTime: 100, difficulty: 'advanced', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Kis méretű, hatlapos Dobos-torta roppanós karamelltetővel', englishNote: 'Small six-layer Dobos cake with a crisp caramel top',
    hungarianSteps: [
      'Melegítsd elő a sütőt 180 °C-ra, és rajzolj hat 15 cm-es kört sütőpapírra. Válaszd szét a tojásokat; a fehérjét verd kemény habbá 30 g cukorral, a sárgáját pedig keverd világosra további 30 g cukorral.',
      'Óvatosan forgasd össze a két habot, majd szitáld bele a lisztet és a sót. Oszd hat egyforma részre, kend a körökbe, és laponként 6–8 perc alatt süsd világos aranyszínűre. A lapokat teljesen hűtsd ki.',
      'Olvaszd meg az étcsokoládét, majd hűtsd langyosra. A puha vajat keverd habosra a porcukorral és a kakaóval, aztán dolgozd bele a csokoládét. Ha túl lágy, tedd hűtőbe 10–15 percre.',
      'Öt lapot kenj meg vékonyan és egyenletesen a krémmel, rakd egymásra, majd vond be a torta oldalát is. Tedd hűtőbe legalább 45 percre.',
      'A maradék 60 g cukrot olvaszd borostyánszínű karamellé, és azonnal simítsd a hatodik lapra. Olajozott késsel még melegen jelöld hat cikkre; a forró karamell súlyos égést okozhat. Dermedés után tedd a tortára.',
    ],
    englishSteps: [
      'Heat the oven to 180 °C and draw six 15 cm circles on parchment. Separate the eggs; beat the whites to firm peaks with 30 g sugar and beat the yolks until pale with another 30 g sugar.',
      'Gently fold the 2 mixtures together, then sift in the flour and salt. Divide equally between the circles and bake each layer for 6–8 minutes, until pale golden. Cool completely.',
      'Melt the dark chocolate and cool until lukewarm. Beat the soft butter with the icing sugar and cocoa, then beat in the chocolate. Chill for 10–15 minutes if too soft.',
      'Spread 5 layers thinly and evenly with cream, stack them, and coat the side of the cake. Refrigerate for at least 45 minutes.',
      'Melt the remaining 60 g sugar to amber caramel and immediately spread it over the sixth layer. Score 6 wedges with an oiled knife while warm; hot caramel can cause severe burns. Place on the cake once set.',
    ],
  },
  'dessert-15': {
    preparationTime: 30, cookingTime: 25, restingTime: 75, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Illatos mézeskalács, amelyet nem sütünk keményre', englishNote: 'Fragrant gingerbread cookies kept tender by careful baking',
    hungarianSteps: [
      'Kis lángon melegítsd össze a mézet, cukrot és vajat, csak amíg egynemű lesz; ne forrald. Hagyd 10–15 percig langyosra hűlni, majd keverd bele a tojást.',
      'A lisztet keverd össze a szódabikarbónával, fahéjjal, szegfűszeggel, gyömbérrel és sóval. Öntsd hozzá a mézes keveréket, és gyúrd össze; csak addig dolgozd, amíg egynemű lesz.',
      'Csomagold be, és tedd hűtőbe legalább 1 órára. Ez a pihenés szükséges ahhoz, hogy a tészta kezelhető legyen.',
      'Melegítsd elő a sütőt 175 °C-ra. Enyhén lisztezett felületen nyújtsd 4–5 mm vastagra, szúrd ki, és tedd sütőpapíros tepsire, egymástól kissé távolabb.',
      'Süsd adagonként 8–10 percig, csak amíg a széle éppen színt kap. Kivételkor még puha; 5 percig a tepsin, majd rácson hűtsd ki. A túlsütéstől kemény lesz.',
    ],
    englishSteps: [
      'Warm the honey, sugar, and butter over low heat only until combined; do not boil. Cool for 10–15 minutes until lukewarm, then mix in the egg.',
      'Mix the flour with the baking soda, cinnamon, cloves, ginger, and salt. Add the honey mixture and knead only until uniform.',
      'Wrap and refrigerate for at least 1 hour. This rest is necessary for a manageable dough.',
      'Heat the oven to 175 °C. Roll 4–5 mm thick on a lightly floured surface, cut into shapes, and place slightly apart on lined trays.',
      'Bake each batch for 8–10 minutes, only until the edges just colour. They should still be soft when removed; cool for 5 minutes on the tray, then on a rack. Overbaking makes them hard.',
    ],
  },
  'dessert-16': {
    preparationTime: 45, cookingTime: 40, restingTime: 195, difficulty: 'advanced', commonAllergens: ['gluten', 'egg', 'milk', 'lactose', 'nuts'],
    note: 'Réteges zserbó dióval, baracklekvárral és dermedő csokoládéval', englishNote: 'Layered Gerbeaud slice with walnuts, apricot jam, and set chocolate',
    hungarianSteps: [
      'A tejet langyosítsd meg, keverj bele 1 teáskanál cukrot és az élesztőt, majd hagyd 8–10 percig habosodni. A lisztet keverd össze a sóval.',
      'A lisztben morzsold el 220 g hideg vajat, majd add hozzá az élesztős tejet, a tojást és 20 g cukrot. Gyorsan gyúrd simára, oszd négy egyforma részre, és pihentesd 15 percig.',
      'A diót keverd össze a maradék 180 g cukorral. Nyújtsd ki az első lapot egy körülbelül 25×35 cm-es tepsi méretére, kend meg a lekvár harmadával, és szórd meg a cukros dió harmadával. Ismételd még kétszer, végül fedd be a negyedik lappal.',
      'Szurkáld meg a tetejét, pihentesd 30 percig, majd 180 °C-on süsd 35–40 percig. A süteményt a tepsiben hagyd teljesen kihűlni legalább 2 órán át.',
      'Az étcsokoládét olvaszd össze a maradék 30 g vajjal, simítsd a hideg süteményre, és hagyd dermedni legalább 45 percig. Meleg, száraz késsel szeleteld.',
    ],
    englishSteps: [
      'Warm the milk, stir in 1 teaspoon sugar and the yeast, and leave for 8–10 minutes until foamy. Mix the flour with the salt.',
      'Rub 220 g cold butter into the flour, then add the yeast mixture, egg, and 20 g sugar. Knead briefly until smooth, divide into 4 equal pieces, and rest for 15 minutes.',
      'Mix the walnuts with the remaining 180 g sugar. Roll the first layer to fit a roughly 25×35 cm tin, spread with one-third of the jam, and scatter with one-third of the sweetened walnuts. Repeat twice and cover with the fourth layer.',
      'Prick the top, rest for 30 minutes, then bake at 180 °C for 35–40 minutes. Cool completely in the tin for at least 2 hours.',
      'Melt the chocolate with the remaining 30 g butter, spread over the cold cake, and leave to set for at least 45 minutes. Slice with a warm, dry knife.',
    ],
  },
  'dessert-17': {
    preparationTime: 45, cookingTime: 50, restingTime: 65, difficulty: 'advanced', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Rákóczi-túrós omlós alappal, lekvárral és könnyű habráccsal', englishNote: 'Rákóczi cottage cheese slice with pastry, jam, and a light meringue lattice',
    hungarianSteps: [
      'A lisztet keverd össze a sütőporral, sóval és 70 g cukorral, majd morzsold el benne a hideg vajat. Válaszd szét a tojásokat. Adj a liszthez 1 tojássárgáját és 30 ml tejfölt, gyúrd össze gyorsan, majd hűtsd 20 percig.',
      'Melegítsd elő a sütőt 180 °C-ra. Nyomkodd a tésztát egy körülbelül 20×30 cm-es, sütőpapíros tepsibe, szurkáld meg, és süsd elő 12–15 percig, amíg a széle éppen színt kap.',
      'A túrót keverd össze a maradék 3 tojássárgájával, 100 g cukorral, 70 ml tejföllel és a citromhéjjal. Az elősütött alapot kend meg a lekvár felével, simítsd rá a túrót, és süsd további 20–25 percig.',
      'A 4 tojásfehérjét verd habosra, majd fokozatosan add hozzá a maradék 50 g cukrot, és verd fényes, kemény habbá. Nyomj vagy kanalazz rácsot a túró tetejére, a közöket pedig töltsd meg a maradék lekvárral.',
      '150 °C-on süsd még 12–15 percig, amíg a hab tapintásra megszilárdul, de nem barnul meg erősen. Hűtsd legalább 45 percig, és hűtve tárold.',
    ],
    englishSteps: [
      'Mix the flour with the baking powder, salt, and 70 g sugar, then rub in the cold butter. Separate the eggs. Add 1 yolk and 30 ml sour cream to the flour, bring together quickly, and chill for 20 minutes.',
      'Heat the oven to 180 °C. Press the pastry into a roughly 20×30 cm tin lined with parchment, prick it, and pre-bake for 12–15 minutes, until the edge just colours.',
      'Mix the cottage cheese with the remaining 3 yolks, 100 g sugar, 70 ml sour cream, and lemon zest. Spread half the jam over the base, add the cheese mixture, and bake for another 20–25 minutes.',
      'Beat the 4 whites until foamy, gradually add the remaining 50 g sugar, and beat to glossy firm peaks. Pipe or spoon a lattice over the cheese and fill the gaps with the remaining jam.',
      'Bake at 150 °C for another 12–15 minutes, until the meringue feels set but is not deeply browned. Cool for at least 45 minutes and store refrigerated.',
    ],
  },
  'dessert-18': {
    preparationTime: 40, cookingTime: 40, restingTime: 95, difficulty: 'advanced', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Képviselőfánk üreges égetett tésztával és hűtött vaníliakrémmel', englishNote: 'Cream puffs with hollow choux shells and chilled vanilla filling',
    hungarianSteps: [
      'Forrald fel a vizet 100 g vajjal és a sóval. Öntsd bele egyszerre a lisztet, és kis lángon, erősen keverve főzd 2–3 percig, amíg gombóccá áll össze és vékony hártyát hagy az edény alján.',
      'Tedd keverőtálba, és hűtsd 10 percig. Egyenként dolgozd bele a tojásokat; a következőt csak akkor add hozzá, amikor az előző teljesen elkeveredett. A kész tészta fényes, sűrű és lassan V alakban esik le a lapátról.',
      'Nyomj vagy kanalazz 10–12 egyforma halmot sütőpapírra. 200 °C-on süsd 15 percig, majd ajtónyitás nélkül 175 °C-on további 15–20 percig. Szúrd meg az oldalukat, és a kikapcsolt, résnyire nyitott sütőben szárítsd még 5 percig.',
      'A pudingport keverd simára a tejjel és cukorral, majd folyamatosan keverve főzd sűrűre. Fóliázd közvetlenül a felszínén, és hűtsd ki teljesen. A hideg tejszínt verd kemény habbá.',
      'A teljesen kihűlt fánkok tetejét vágd le, töltsd meg a vaníliakrémmel és a tejszínhabbal, majd tedd vissza a kalapokat. Tálalásig hűtsd legalább 30 percig, és végig tartsd hűtve.',
    ],
    englishSteps: [
      'Bring the water to a boil with 100 g butter and the salt. Add all the flour at once and cook over low heat for 2–3 minutes, stirring firmly, until it forms a ball and leaves a thin film on the base of the pan.',
      'Transfer to a mixing bowl and cool for 10 minutes. Beat in the eggs one at a time, adding the next only once the previous egg is fully incorporated. The dough should be glossy, thick, and fall slowly from the paddle in a V shape.',
      'Pipe or spoon 10–12 equal mounds onto parchment. Bake at 200 °C for 15 minutes, then without opening the door at 175 °C for another 15–20 minutes. Pierce the sides and dry for 5 minutes in the switched-off oven with the door ajar.',
      'Whisk the custard powder with the milk and sugar and cook until thick, stirring constantly. Cover directly on the surface and cool completely. Whip the cold cream to firm peaks.',
      'Cut the tops from the completely cool shells, fill with vanilla custard and whipped cream, and replace the tops. Chill for at least 30 minutes before serving and keep refrigerated.',
    ],
  },
  'dessert-19': {
    preparationTime: 35, cookingTime: 45, restingTime: 45, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Szilvás gombóc könnyű burgonyatésztával és pirított morzsával', englishNote: 'Plum dumplings with light potato dough and toasted breadcrumbs',
    hungarianSteps: [
      'A burgonyát héjában főzd puhára 25–30 perc alatt. Még melegen hámozd meg, törd teljesen simára, terítsd szét, és hagyd legalább 40–45 percig teljesen kihűlni.',
      'Közben a szilvát magozd ki úgy, hogy lehetőleg egyben maradjon, és keverd össze a cukrot a fahéjjal. A zsemlemorzsát a vajon, közepes-kis lángon pirítsd 6–8 percig aranybarnára.',
      'A hideg burgonyához add a tojást, sót és először 220 g lisztet. Gyorsan gyúrd össze; csak annyi maradék lisztet adj hozzá, amennyi a puha, formázható tésztához kell. Ne dolgozd túl.',
      'Nyújtsd körülbelül fél centi vastagra, vágd 12 négyzetre, és mindegyikbe zárj egy kevés fahéjas cukorral töltött szilvát. A széleket gondosan zárd össze.',
      'Gyöngyöző sós vízben főzd több részletben. Amikor feljönnek, főzd még 3–5 percig, majd emelj ki egyet és vágd félbe próbaként. A kész gombócokat csepegtesd le és forgasd a morzsába.',
    ],
    englishSteps: [
      'Boil the potatoes in their skins for 25–30 minutes, until tender. Peel while warm, mash completely smooth, spread out, and cool fully for at least 40–45 minutes.',
      'Meanwhile, pit the plums while keeping them as whole as possible and mix the sugar with the cinnamon. Toast the breadcrumbs in the butter over medium-low heat for 6–8 minutes, until golden.',
      'Add the egg, salt, and first 220 g flour to the cold potatoes. Knead briefly and add only as much remaining flour as needed for a soft, workable dough. Do not overwork.',
      'Roll about 5 mm thick, cut into 12 squares, and enclose a plum filled with a little cinnamon sugar in each. Seal the edges carefully.',
      'Cook in batches in gently simmering salted water. Once they rise, cook for another 3–5 minutes, then cut one open to test. Drain the cooked dumplings and coat in the crumbs.',
    ],
  },
  'dessert-20': {
    preparationTime: 30, cookingTime: 50, restingTime: 20, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Almás máglyarakás puha kiflivel és biztonságosan átsült habbal', englishNote: 'Apple bread pudding with soft rolls and safely baked meringue',
    hungarianSteps: [
      'Melegítsd elő a sütőt 180 °C-ra. Válaszd szét a tojásokat. A tejet melegítsd langyosra, keverd össze a 4 tojássárgájával és 80 g cukorral, majd fokozatosan öntsd a felkarikázott kiflire; csak annyit adj hozzá egyszerre, amennyit felszív anélkül, hogy péppé válna.',
      'Az almát hámozd meg, szeleteld vékonyra, és 15 g vajon a fahéjjal párold 8–10 percig, amíg kissé megpuhul, de nem esik szét.',
      'A maradék vajjal kenj ki egy körülbelül 20×30 cm-es sütőtálat. Tedd bele a kifli felét, oszd el rajta az almát és a lekvár felét, majd fedd be a maradék kiflivel. Süsd 25 percig.',
      'A tojásfehérjét verd habosra, majd fokozatosan add hozzá a maradék 100 g cukrot, és verd fényes, kemény habbá. Óvatosan forgasd bele a maradék lekvárt, és simítsd az elősült alapra.',
      'Vedd vissza a sütőt 150 °C-ra, és süsd további 12–15 percig, amíg a hab tapintásra megszilárdul és halvány színt kap. Pihentesd 20 percig, majd langyosan tálald.',
    ],
    englishSteps: [
      'Heat the oven to 180 °C and separate the eggs. Warm the milk, whisk with the 4 yolks and 80 g sugar, then pour gradually over the sliced rolls, adding only as much at a time as they absorb without becoming mushy.',
      'Peel and thinly slice the apples and cook in 15 g butter with the cinnamon for 8–10 minutes, until slightly tender but not collapsing.',
      'Butter a roughly 20×30 cm baking dish with the remaining butter. Add half the rolls, spread over the apples and half the jam, then cover with the remaining rolls. Bake for 25 minutes.',
      'Beat the whites until foamy, gradually add the remaining 100 g sugar, and beat to glossy firm peaks. Gently fold in the remaining jam and spread over the baked base.',
      'Reduce the oven to 150 °C and bake for another 12–15 minutes, until the meringue feels set and is lightly coloured. Rest for 20 minutes and serve warm.',
    ],
  },
};

export const auditedDessertSecondBatchIds = Object.keys(dessertAuditSecondBatch);
export const auditedDessertSecondBatchEnglishInstructions = Object.fromEntries(
  Object.entries(dessertAuditSecondBatch).map(([id, audit]) => [id, audit.englishSteps.map((step, index) => `${index + 1}. ${step}`).join('\n\n')]),
);
export const auditedDessertSecondBatchEnglishNotes = Object.fromEntries(
  Object.values(dessertAuditSecondBatch).map(audit => [audit.note, audit.englishNote]),
);

export const applyDessertSecondBatchAudit = (recipe: Recipe): Recipe => {
  const audit = dessertAuditSecondBatch[recipe.id];
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
    difficulty: audit.difficulty ?? 'easy',
    commonAllergens: audit.commonAllergens,
    quickMeal: totalTime <= 30,
    qualityAuditStatus: 'code-reviewed',
  };
};
