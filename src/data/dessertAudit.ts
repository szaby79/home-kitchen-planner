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

const dessertAudit: Record<string, DessertAudit> = {
  'dessert-1': {
    preparationTime: 10, cookingTime: 25, restingTime: 20, commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Vékony, könnyen süthető palacsinta lekvárral', englishNote: 'Thin, easy-to-cook pancakes filled with jam',
    hungarianSteps: [
      'A lisztet keverd össze a cukorral és a sóval. Add hozzá a tojásokat és a tej felét, majd kézi habverővel dolgozd csomómentesre.',
      'Keverd hozzá a maradék tejet, a szódavizet és 1 evőkanál olajat. A tészta legyen hígan folyó; ha sűrűnek tűnik, adj hozzá még kevés szódavizet.',
      'Pihentesd 20 percig. Ezután keverd át, mert a liszt közben leülepedhet és a tészta kissé besűrűsödhet.',
      'Forrósíts fel egy 22–24 cm-es tapadásmentes serpenyőt, és az első palacsinta előtt kend ki vékonyan a maradék olajjal. Adagonként körülbelül fél merőkanál tésztát oszlass el benne.',
      'Süsd az első oldalát körülbelül 1 percig, amíg a széle elválik, majd fordítsd meg és süsd még 20–30 másodpercig. Töltsd meg lekvárral, tekerd fel, és csak tálaláskor szórd meg porcukorral.',
    ],
    englishSteps: [
      'Mix the flour with the sugar and salt. Add the eggs and half the milk, then whisk until smooth.',
      'Whisk in the remaining milk, sparkling water, and 1 tablespoon oil. The batter should pour easily; add a little more sparkling water if it seems thick.',
      'Rest for 20 minutes, then stir again because the flour may settle and the batter may thicken slightly.',
      'Heat a 22–24 cm non-stick frying pan and lightly coat it with the remaining oil before the first pancake. Swirl about half a ladle of batter around the pan.',
      'Cook the first side for about 1 minute, until the edge releases, then turn and cook for another 20–30 seconds. Fill with jam, roll up, and dust with icing sugar only when serving.',
    ],
  },
  'dessert-2': {
    preparationTime: 25, cookingTime: 40, restingTime: 20, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Sütőben összesült túrós palacsinta vaníliás tejföllel', englishNote: 'Baked cottage cheese pancakes with vanilla sour cream',
    hungarianSteps: [
      'Két tojást keverj simára a liszttel, a tejjel, a szódavízzel, a sóval és 1 evőkanál olajjal, majd pihentesd a híg tésztát 20 percig.',
      'Forró, 22–24 cm-es tapadásmentes serpenyőben süss 8–10 vékony palacsintát. Az első előtt használd a maradék olajat, és a kész palacsintákat tartsd letakarva.',
      'A túrót keverd össze a harmadik tojással, a cukor kétharmadával, a vaníliás cukorral és a mazsolával. A tejfölhöz keverd a maradék cukrot.',
      'Melegítsd elő a sütőt 180 °C-ra. Oszd el a tölteléket a palacsintákon, tekerd fel őket, és szorosan rendezd egy kisebb sütőtálba.',
      'Kend rá az édes tejfölt, és süsd 18–22 percig, amíg a teteje enyhén pirul és a töltelék átforrósodik. Tálalás előtt pihentesd 5 percig.',
    ],
    englishSteps: [
      'Whisk 2 eggs with the flour, milk, sparkling water, salt, and 1 tablespoon oil until smooth, then rest the thin batter for 20 minutes.',
      'Cook 8–10 thin pancakes in a hot 22–24 cm non-stick pan. Use the remaining oil before the first one and keep the cooked pancakes covered.',
      'Mix the cottage cheese with the third egg, two-thirds of the sugar, vanilla sugar, and raisins. Mix the remaining sugar into the sour cream.',
      'Heat the oven to 180 °C. Divide the filling between the pancakes, roll them up, and arrange snugly in a small baking dish.',
      'Spread over the sweetened sour cream and bake for 18–22 minutes, until lightly golden and hot through. Rest for 5 minutes before serving.',
    ],
  },
  'dessert-3': {
    preparationTime: 35, cookingTime: 45, restingTime: 80, difficulty: 'advanced', commonAllergens: ['gluten', 'egg', 'milk', 'lactose', 'nuts'],
    note: 'Diós aranygaluska puha kelt tésztával és vaníliasodóval', englishNote: 'Walnut pull-apart buns with soft yeast dough and vanilla custard',
    hungarianSteps: [
      'Melegíts 250 ml tejet langyosra, keverj bele 1 teáskanál cukrot és az élesztőt, majd hagyd 8–10 percig habosodni. Ha nem habzik, ne kezdd el vele a tésztát.',
      'A lisztet keverd össze a sóval. Add hozzá az élesztős tejet, a tojásokat, 30 g olvasztott vajat és 30 g cukrot, majd dagaszd 8–10 percig, amíg puha, rugalmas tésztát kapsz.',
      'Letakarva keleszd 45–60 percig, amíg közel a kétszeresére nő. Formázz belőle diónyi golyókat, forgasd a maradék olvasztott vajba, majd a darált dió és 20 g cukor keverékébe.',
      'Rétegezd kivajazott, körülbelül 22 cm-es formába, és pihentesd letakarva még 20 percig. Közben melegítsd elő a sütőt 180 °C-ra, majd süsd 30–35 percig; a közepe se maradjon nyers tésztás.',
      'A pudingport keverd simára a maradék 450 ml tejjel és 30 g cukorral, majd közepes lángon, folyamatosan keverve főzd selymes sodóvá. A kisült aranygaluskát pihentesd 10 percig, és meleg sodóval tálald.',
    ],
    englishSteps: [
      'Warm 250 ml milk until lukewarm, stir in 1 teaspoon sugar and the yeast, and leave for 8–10 minutes until foamy. If it does not foam, do not use it for the dough.',
      'Mix the flour with the salt. Add the yeast mixture, eggs, 30 g melted butter, and 30 g sugar, then knead for 8–10 minutes until soft and elastic.',
      'Cover and rise for 45–60 minutes, until nearly doubled. Shape into walnut-sized balls, dip them in the remaining melted butter, then coat in the ground walnuts mixed with 20 g sugar.',
      'Layer in a buttered pan about 22 cm wide and rest, covered, for another 20 minutes. Heat the oven to 180 °C and bake for 30–35 minutes; the centre should no longer look like raw dough.',
      'Whisk the custard powder with the remaining 450 ml milk and 30 g sugar, then cook over medium heat, stirring constantly, until silky. Rest the baked buns for 10 minutes and serve with the warm custard.',
    ],
  },
  'dessert-4': {
    preparationTime: 12, cookingTime: 20, restingTime: 5, commonAllergens: ['gluten', 'milk', 'lactose'],
    note: 'Szaftos mákos guba, amelyben a kifli nem ázik péppé', englishNote: 'Moist poppy seed bread pudding without soggy rolls',
    hungarianSteps: [
      'Melegítsd elő a sütőt 180 °C-ra. A lehetőleg egynapos kifliket vágd 1,5–2 cm-es karikákra, a mákot pedig keverd össze a cukorral.',
      'A tejet melegítsd fel a vaníliás cukorral, de ne forrald. Öntsd a kiflire több részletben, közben óvatosan forgasd át; csak annyit használj, amennyit felszív anélkül, hogy pépessé válna.',
      'Vajazz ki egy kisebb sütőtálat. Rétegezd bele a kifli felét, szórd meg a cukros mák felével, majd ismételd meg a maradékkal.',
      'A tetejére tedd a megmaradt vaj apró darabjait, és süsd 15–20 percig, amíg átforrósodik, a széle pedig enyhén pirulni kezd.',
      'Pihentesd 5 percig, majd melegen tálald. Ha a kifli nagyon friss vagy puha, előtte néhány percig szárítsd a sütőben.',
    ],
    englishSteps: [
      'Heat the oven to 180 °C. Cut preferably day-old crescent rolls into 1.5–2 cm slices and mix the poppy seeds with the sugar.',
      'Warm the milk with the vanilla sugar without boiling. Pour it over the rolls gradually, tossing gently; use only as much as they absorb without becoming mushy.',
      'Butter a small baking dish. Layer in half the rolls and half the sweetened poppy seeds, then repeat with the remainder.',
      'Dot the remaining butter over the top and bake for 15–20 minutes, until hot through and lightly golden around the edges.',
      'Rest for 5 minutes and serve warm. If the rolls are very fresh or soft, dry them in the oven for a few minutes first.',
    ],
  },
  'dessert-5': {
    preparationTime: 35, cookingTime: 15, restingTime: 150, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose', 'nuts'],
    note: 'Egyszerűsített somlói kész piskótával, dióval és csokoládéöntettel', englishNote: 'Simplified Somlói trifle with prepared sponge, walnuts, and chocolate sauce',
    hungarianSteps: [
      'A pudingport keverd simára 700 ml hideg tejjel és 70 g cukorral, majd közepes lángon, folyamatos keverés mellett főzd sűrűre. Fedd le a felszínét, és hagyd langyosra hűlni.',
      'A vizet forrald fel 20 g cukorral, majd húzd le a tűzről és keverd hozzá a rumot. Gyerekeknek szánt adaghoz a rumot hagyd el, vagy használj alkoholmentes rumaromát.',
      'A piskótát vágd 2–3 cm-es kockákra. Rétegezd egy tálba a piskótát, locsold meg kevés sziruppal, majd adj hozzá pudingot, diót és mazsolát; ismételd, amíg minden elfogy.',
      'Fedd le és tedd hűtőbe legalább 2 órára. Közben az étcsokoládét olvaszd össze a maradék 100 ml tejjel és 10 g cukorral, majd hűtsd langyosra; a hideg tejszínt verd lágy habbá.',
      'Tálaláskor kanállal szaggass galuskákat a tálba, locsold meg a csokoládéöntettel, és tegyél rá tejszínhabot. Hűtőben tárold, és ne hagyd szobahőmérsékleten 2 óránál tovább.',
    ],
    englishSteps: [
      'Whisk the custard powder with 700 ml cold milk and 70 g sugar, then cook over medium heat, stirring constantly, until thick. Cover the surface and cool until lukewarm.',
      'Bring the water to a boil with 20 g sugar, remove from the heat, and stir in the rum. For children, omit the rum or use alcohol-free rum flavouring.',
      'Cut the sponge into 2–3 cm cubes. Layer sponge in a bowl, drizzle with a little syrup, then add custard, walnuts, and raisins; repeat until everything is used.',
      'Cover and refrigerate for at least 2 hours. Meanwhile, melt the dark chocolate with the remaining 100 ml milk and 10 g sugar, then cool until lukewarm; whip the cold cream to soft peaks.',
      'Spoon portions into bowls, drizzle with chocolate sauce, and top with whipped cream. Keep refrigerated and do not leave at room temperature for more than 2 hours.',
    ],
  },
  'dessert-6': {
    preparationTime: 20, cookingTime: 30, restingTime: 120, difficulty: 'advanced', commonAllergens: ['egg', 'milk', 'lactose'],
    note: 'Hűtött madártej lágy habgaluskával és biztonságosan főzött sodóval', englishNote: 'Chilled floating islands with tender meringue and safely cooked custard',
    hungarianSteps: [
      'Válaszd szét a tojásokat tiszta, száraz tálakba. A fehérjét verd lágy habbá, majd fokozatosan adj hozzá 50 g cukrot, és verd fényes, tartós habbá.',
      'A tejet melegítsd a vaníliás cukorral gyöngyözésig, de ne forrald erősen. Két kanállal formázz kisebb habgaluskákat, és oldalanként 30–45 másodpercig főzd őket; ne zsúfold tele a lábast.',
      'A megfőtt habgaluskákat szűrőkanállal szedd tálcára. A tejet szűrd át, majd tedd vissza kis lángra.',
      'A tojássárgáját keverd simára a maradék 100 g cukorral. Fokozatosan adj hozzá két merőkanál forró tejet, majd öntsd vissza a lábasba, és állandó keverés mellett melegítsd 82–84 °C-ig; ne forrald.',
      'A sodót öntsd tiszta tálba, tedd rá a habgaluskákat, majd hűtsd le mielőbb és legalább 2 órára tedd hűtőbe. Hidegen tálald, és végig tartsd hűtve.',
    ],
    englishSteps: [
      'Separate the eggs into clean, dry bowls. Beat the whites to soft peaks, gradually add 50 g sugar, and continue until glossy and firm.',
      'Heat the milk with the vanilla sugar until gently steaming, without a hard boil. Shape small meringues with 2 spoons and poach for 30–45 seconds per side without crowding the pan.',
      'Lift the cooked meringues onto a tray with a slotted spoon. Strain the milk and return it to low heat.',
      'Whisk the yolks with the remaining 100 g sugar. Gradually whisk in 2 ladles of hot milk, return to the pan, and heat to 82–84 °C while stirring constantly; do not boil.',
      'Pour the custard into a clean bowl, place the meringues on top, cool promptly, and refrigerate for at least 2 hours. Serve cold and keep refrigerated.',
    ],
  },
  'dessert-7': {
    preparationTime: 20, cookingTime: 65, restingTime: 35, difficulty: 'medium', commonAllergens: ['egg', 'milk', 'lactose'],
    note: 'Könnyű rizskoch krémes tejberizzsel és levegős tojáshabbal', englishNote: 'Light baked rice pudding with creamy rice and airy egg whites',
    hungarianSteps: [
      'A rizst öblítsd át, majd tedd lábasba a vízzel és a sóval. Kis lángon főzd 8–10 percig, amíg a víz nagy részét felszívja.',
      'Add hozzá a tejet és a vaníliás cukrot, majd kis lángon, gyakran megkeverve főzd 20–25 percig, amíg a rizs megpuhul. Ha túl hamar sűrűsödik, adj hozzá kevés tejet.',
      'Húzd le a tűzről, és hagyd 20 percig langyosra hűlni. Közben melegítsd elő a sütőt 180 °C-ra, és a vajjal kenj ki egy körülbelül 20 cm-es sütőtálat.',
      'A tojássárgáját keverd habosra a cukorral és a citromhéjjal, majd dolgozd a langyos rizsbe. A fehérjét verd kemény habbá, és két részletben, óvatosan forgasd bele.',
      'Simítsd a formába, és süsd 30–35 percig, amíg a teteje aranyszínű, a közepe pedig megszilárdul. Pihentesd 15 percig, majd langyosan szeleteld.',
    ],
    englishSteps: [
      'Rinse the rice and put it in a saucepan with the water and salt. Cook over low heat for 8–10 minutes, until most of the water is absorbed.',
      'Add the milk and vanilla sugar, then cook over low heat for 20–25 minutes, stirring often, until the rice is tender. Add a little extra milk if it thickens before the rice softens.',
      'Remove from the heat and cool for 20 minutes until lukewarm. Meanwhile, heat the oven to 180 °C and butter a baking dish about 20 cm wide.',
      'Beat the yolks with the sugar and lemon zest until pale, then mix into the lukewarm rice. Beat the whites to firm peaks and fold them in gently in 2 additions.',
      'Spread in the dish and bake for 30–35 minutes, until golden on top and set in the centre. Rest for 15 minutes before slicing warm.',
    ],
  },
  'dessert-8': {
    preparationTime: 5, cookingTime: 10, restingTime: 5, commonAllergens: ['gluten', 'milk', 'lactose'],
    note: 'Krémes tejbegríz csomómentesen, lekvárral tálalva', englishNote: 'Creamy, lump-free semolina pudding served with jam',
    hungarianSteps: [
      'A tejet öntsd vastag aljú lábasba, és közepes lángon melegítsd fel a vaníliás cukorral. Időnként keverd meg, hogy ne kapjon le.',
      'Amikor már gőzölög, de még nem forr erősen, vékony sugárban szórd bele a grízt, közben kézi habverővel folyamatosan keverd.',
      'Vedd kis lángra, és 5–7 percig főzd gyakori keverés mellett. Akkor jó, ha krémes és a grízszemek megpuhultak; hűlés közben még sűrűsödni fog.',
      'Húzd le a tűzről, keverd hozzá a cukrot és a vajat, majd kóstold meg. Ha túl sűrű, kevés meleg tejjel lazítsd.',
      'Pihentesd 5 percig, oszd tálkákba, és lekvárral tálald. Kisgyermeknek csak kellemesen melegre hűtve add.',
    ],
    englishSteps: [
      'Pour the milk into a heavy-based saucepan and heat over medium heat with the vanilla sugar. Stir occasionally so it does not catch.',
      'When steaming but not boiling hard, sprinkle in the semolina in a thin stream while whisking continuously.',
      'Reduce to low heat and cook for 5–7 minutes, stirring often. It is ready when creamy and the grains are tender; it will thicken further as it cools.',
      'Remove from the heat, stir in the sugar and butter, and taste. Loosen with a little warm milk if it is too thick.',
      'Rest for 5 minutes, divide between bowls, and serve with jam. For young children, let it cool until comfortably warm.',
    ],
  },
  'dessert-9': {
    preparationTime: 30, cookingTime: 45, restingTime: 45, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Omlós almás pite lédús, de nem ázott töltelékkel', englishNote: 'Tender apple pie with a juicy filling and a crisp base',
    hungarianSteps: [
      'A lisztet keverd össze a sütőporral, a sóval és 60 g cukorral. Morzsold el benne a hideg vajat, majd add hozzá a tojást és annyi tejfölt, hogy gyorsan összeálló, puha tésztát kapj.',
      'Oszd két részre, csomagold be, és tedd hűtőbe 20 percre. Közben hámozd meg és reszeld le az almát, keverd össze a maradék cukorral és a fahéjjal, majd 10 perc után finoman nyomd ki a felesleges levét.',
      'Melegítsd elő a sütőt 180 °C-ra. Nyújtsd ki az egyik tésztalapot, és bélelj ki vele egy körülbelül 20×30 cm-es, sütőpapíros tepsit. Szurkáld meg villával, és szórd meg a zsemlemorzsával.',
      'Oszlasd el rajta az almát, majd fedd be a másik kinyújtott lappal. A széleket nyomd össze, a tetejét szurkáld meg, és süsd 40–45 percig, amíg egyenletesen aranybarna lesz.',
      'Hagyd legalább 25 percig hűlni, hogy szépen szeletelhető legyen. Csak teljes kihűlés után szórd meg porcukorral.',
    ],
    englishSteps: [
      'Mix the flour with the baking powder, salt, and 60 g sugar. Rub in the cold butter, then add the egg and enough sour cream to bring it quickly into a soft dough.',
      'Divide in 2, wrap, and refrigerate for 20 minutes. Meanwhile, peel and grate the apples, mix with the remaining sugar and cinnamon, then gently squeeze out excess juice after 10 minutes.',
      'Heat the oven to 180 °C. Roll out one piece of dough and line a roughly 20×30 cm baking tin with parchment. Prick with a fork and sprinkle with the breadcrumbs.',
      'Spread the apples over the base and cover with the second rolled sheet. Seal the edges, prick the top, and bake for 40–45 minutes, until evenly golden.',
      'Cool for at least 25 minutes so it slices cleanly. Dust with icing sugar only once completely cool.',
    ],
  },
  'dessert-10': {
    preparationTime: 30, cookingTime: 40, restingTime: 45, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk', 'lactose'],
    note: 'Omlós meggyes pite jól lecsepegtetett, savanykás gyümölccsel', englishNote: 'Tender sour cherry pie with well-drained fruit',
    hungarianSteps: [
      'A lisztet keverd össze a sütőporral, a sóval és 80 g cukorral. Morzsold el benne a hideg vajat, majd add hozzá a tojásokat és annyi tejfölt, hogy puha, de nem ragacsos tésztát kapj.',
      'Oszd két részre, csomagold be, és hűtsd 20 percig. A kimagozott friss, fagyasztott vagy befőtt meggyet közben csepegtesd le nagyon alaposan, majd keverd össze a maradék cukorral.',
      'Melegítsd elő a sütőt 180 °C-ra. Nyújtsd ki az egyik tésztalapot egy körülbelül 20×30 cm-es, sütőpapíros tepsi méretére, tedd bele, szurkáld meg, és szórd meg a zsemlemorzsával.',
      'Oszlasd el rajta a meggyet úgy, hogy ne kerüljön rá felesleges lé, majd fedd be a másik tésztalappal. Zárd le a széleket, és a tetejét szurkáld meg.',
      'Süsd 35–40 percig, amíg aranybarna lesz. Hagyd legalább 25 percig hűlni, hogy a gyümölcslé megkössön, majd kihűlve szórd meg porcukorral.',
    ],
    englishSteps: [
      'Mix the flour with the baking powder, salt, and 80 g sugar. Rub in the cold butter, then add the eggs and enough sour cream to make a soft but non-sticky dough.',
      'Divide in 2, wrap, and chill for 20 minutes. Meanwhile, drain pitted fresh, frozen, or preserved sour cherries very thoroughly, then mix with the remaining sugar.',
      'Heat the oven to 180 °C. Roll one piece of dough to fit a roughly 20×30 cm tin lined with parchment, place it in the tin, prick with a fork, and sprinkle with the breadcrumbs.',
      'Spread over the cherries without adding excess juice, then cover with the second sheet of dough. Seal the edges and prick the top.',
      'Bake for 35–40 minutes, until golden. Cool for at least 25 minutes so the fruit juices set, then dust with icing sugar once cool.',
    ],
  },
};

export const auditedDessertIds = Object.keys(dessertAudit);
export const auditedDessertEnglishInstructions = Object.fromEntries(
  Object.entries(dessertAudit).map(([id, audit]) => [id, audit.englishSteps.map((step, index) => `${index + 1}. ${step}`).join('\n\n')]),
);
export const auditedDessertEnglishNotes = Object.fromEntries(
  Object.values(dessertAudit).map(audit => [audit.note, audit.englishNote]),
);

export const applyDessertAudit = (recipe: Recipe): Recipe => {
  const audit = dessertAudit[recipe.id];
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
