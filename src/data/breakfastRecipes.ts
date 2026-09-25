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
  restingTime?: number;
  difficulty?: Recipe['difficulty'];
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
  restingTime = 0,
  difficulty = 'easy',
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
  restingTime,
  totalTime: preparationTime + cookingTime + restingTime,
  difficulty,
  estimatedCostCategory,
  childFriendly,
  suitableForLeftovers,
  reheatsWell,
  vegetarian,
  vegan,
  keto,
  commonAllergens,
  quickMeal: preparationTime + cookingTime + restingTime <= 30,
  qualityAuditStatus: 'code-reviewed',
});

export const breakfastRecipes: Recipe[] = [
  makeBreakfastRecipe({
    id: 'breakfast-1', name: 'Rántotta zöldségekkel', note: 'Puha, sajtos rántotta friss zöldségekkel',
    ingredients: [
      ['tojás', 8, 'db'], ['kaliforniai paprika', 1, 'db'], ['paradicsom', 2, 'db'],
      ['újhagyma', 2, 'db'], ['vaj', 1, 'ek'], ['reszelt sajt', 80, 'g'],
      ['petrezselyemzöld', 0.25, 'csokor'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'Készíts elő mindent: a paprikát és a paradicsomot vágd kis kockákra, az újhagymát karikázd fel, a petrezselymet pedig aprítsd finomra.',
      'A tojásokat üsd egy tálba, add hozzá a sót és a borsot, majd villával keverd egyneműre.',
      'Egy nagy, tapadásmentes serpenyőben olvaszd fel a vajat közepes lángon. Párold rajta a paprikát 3 percig, majd add hozzá a paradicsomot és az újhagymát, és süsd még 1 percig.',
      'Vedd kisebbre a lángot, öntsd a tojást a zöldségekre, és spatulával lassan húzd a megszilárduló részeket a serpenyő közepe felé.',
      'Amikor már nem látszik folyós tojás, de a rántotta még puha, 3–4 perc után szórd rá a sajtot és a petrezselymet. Forgasd át, és tálald rögtön, hogy ne száradjon ki.',
    ],
    preparationTime: 10, cookingTime: 8, keto: true, commonAllergens: ['egg', 'milk'],
  }),
  makeBreakfastRecipe({
    id: 'breakfast-2', name: 'Almás-fahéjas zabkása', note: 'Meleg, rostos családi reggeli',
    ingredients: [
      ['zabpehely', 240, 'g'], ['tej', 700, 'ml'], ['alma', 2, 'db'], ['méz', 2, 'ek'],
      ['dió', 60, 'g'], ['fahéj', 1, 'tk'], ['citrom', 0.5, 'db'], ['só', 1, 'csipet'],
    ],
    steps: [
      'Mosd meg és magozd ki az almákat. Az egyik almát reszeld le, a másikat vágd apró kockákra; a diót vágd durvára.',
      'Tedd a zabpelyhet, a tejet, a reszelt almát, a fahéjat és a sót egy lábasba.',
      'Közepes lángon, időnként megkeverve melegítsd forrásközeli állapotig. Vedd kis lángra, és gyakran megkeverve főzd 6–8 percig, hogy ne kapjon le.',
      'Amikor a zab megpuhult és a kása krémes, vedd le a tűzről. Keverd bele a mézet és a fél citrom kifacsart levéből 1 evőkanálnyit.',
      'Ha túl sűrű lett, lazítsd kevés tejjel. Oszd tálkákba, és a kockázott almával, valamint a dióval tálald.',
    ],
    preparationTime: 10, cookingTime: 10, commonAllergens: ['gluten', 'milk', 'nuts'],
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
      'Forgasd bele a fagyasztott bogyós gyümölcs kétharmadát, zárd le az edényt, és tedd azonnal hűtőbe.',
      'Pihentesd legalább 6 órán át vagy egész éjszaka. Reggel keverd át; ha sűrűbb a kívántnál, lazítsd néhány evőkanál tejjel.',
      'Oszd négy adagba, és a maradék bogyós gyümölccsel, valamint a durvára vágott dióval tálald. Végig tartsd hűtve.',
    ],
    preparationTime: 10, cookingTime: 0, restingTime: 360, commonAllergens: ['gluten', 'milk', 'nuts'], suitableForLeftovers: true,
  }),
  makeBreakfastRecipe({
    id: 'breakfast-4', name: 'Gyümölcsös chia puding', note: 'Vegán, előre elkészíthető reggeli',
    ingredients: [
      ['chia mag', 80, 'g'], ['cukrozatlan kókuszital', 700, 'ml'], ['banán', 2, 'db'],
      ['fagyasztott bogyós gyümölcs', 240, 'g'], ['alma', 1, 'db'], ['fahéj', 0.5, 'tk'],
      ['citrom', 0.5, 'db'], ['szeletelt mandula', 50, 'g'],
    ],
    steps: [
      'Az egyik banánt törd pépesre egy nagy tálban, majd keverd hozzá a kókuszitalt, a fahéjat és a fél citrom kifacsart levét.',
      'Szórd bele a chia magot, habverővel alaposan keverd el, majd 10 perc múlva keverd át ismét, hogy ne csomósodjon.',
      'Fedd le, tedd azonnal hűtőbe, és pihentesd legalább 4 órán át vagy egész éjszaka, amíg puding állagú lesz.',
      'Tálalás előtt szeleteld fel a másik banánt és az almát; a bogyós gyümölcsöt hagyd kissé felengedni.',
      'Keverd át a pudingot; ha túl sűrű, adj hozzá kevés kókuszitalt. Oszd négy pohárba, rétegezd rá a gyümölcsöket, és szórd meg mandulával.',
    ],
    preparationTime: 12, cookingTime: 0, restingTime: 240, vegan: true, commonAllergens: ['nuts'], suitableForLeftovers: true,
  }),
  makeBreakfastRecipe({
    id: 'breakfast-5', name: 'Görög joghurt granolával és gyümölccsel', note: 'Friss, ropogós joghurtos reggeli körülbelül 10 perc alatt',
    ingredients: [
      ['görög joghurt', 700, 'g'], ['granola', 240, 'g'], ['alma', 1, 'db'],
      ['fagyasztott bogyós gyümölcs', 200, 'g'], ['méz', 2, 'ek'], ['dió', 50, 'g'],
      ['fahéj', 0.5, 'tk'], ['citromhéj', 1, 'tk'],
    ],
    steps: [
      'A bogyós gyümölcsöt tedd egy tálba 10 perccel tálalás előtt, hogy kissé felengedjen. Ha előző este a hűtőbe teszed, reggel nem kell várnod.',
      'Az almát mosd meg, magozd ki, és vágd apró kockákra; a diót vágd durvára.',
      'A joghurtot keverd össze a mézzel, a fahéjjal és a finomra reszelt citromhéjjal.',
      'Oszd a joghurt felét négy pohárba, rétegezd rá az almát és a bogyós gyümölcsöt, majd add hozzá a maradék joghurtot.',
      'Közvetlenül tálalás előtt szórd meg granolával és dióval, így kellemesen ropogós marad.',
    ],
    preparationTime: 10, cookingTime: 0, restingTime: 10, commonAllergens: ['gluten', 'milk', 'nuts'], estimatedCostCategory: '$$',
  }),
  makeBreakfastRecipe({
    id: 'breakfast-6', name: 'Avokádós pirítós főtt tojással', note: 'Krémes, tartalmas pirítós főtt tojással',
    ingredients: [
      ['teljes kiőrlésű kenyér', 8, 'szelet'], ['avokádó', 2, 'db'], ['tojás', 4, 'db'],
      ['paradicsom', 2, 'db'], ['citrom', 0.5, 'db'], ['olívaolaj', 1, 'ek'],
      ['chilipehely', 0.25, 'tk'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'Tedd a tojásokat egy kisebb lábasba, és önts rájuk annyi hideg vizet, hogy ellepje őket. Forrald fel, majd közepes lángon főzd 9 percig. Hűtsd le hideg vízben és hámozd meg.',
      'Az avokádót kanalazd tálba, add hozzá a citromlevet, az olívaolajat, a sót és a borsot, majd villával törd darabos krémmé.',
      'A kenyérszeleteket pirítsd aranybarnára kenyérpirítóban vagy száraz serpenyőben.',
      'Kend meg a pirítósokat az avokádókrémmel, majd tedd rá a felszeletelt paradicsomot és főtt tojást.',
      'Szórd meg ízlés szerint chilipehellyel és kevés borssal, majd még ropogósan tálald.',
    ],
    preparationTime: 10, cookingTime: 12, commonAllergens: ['gluten', 'egg'], estimatedCostCategory: '$$',
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
      'A kenyérszeleteket vékonyan kend meg vajjal és mustárral, majd fektesd őket a tepsire.',
      'Oszd el rajtuk a sonkát és a vékony paradicsomszeleteket. A paradicsomot enyhén sózd meg, majd szórd rá a reszelt sajtot.',
      'Szórd meg oregánóval és borssal, majd süsd 8–10 percig, amíg a sajt megolvad és enyhén pirul.',
      'A sütőből kivéve hagyd állni 2 percig. Ezután könnyebb lesz megfogni, de a sajt még kellemesen olvadt marad.',
    ],
    preparationTime: 10, cookingTime: 10, restingTime: 2, vegetarian: false, commonAllergens: ['gluten', 'milk'],
  }),
  makeBreakfastRecipe({
    id: 'breakfast-8', name: 'Zöldséges tojásmuffin', note: 'Keto, előre elkészíthető tojásos reggeli',
    ingredients: [
      ['tojás', 8, 'db'], ['kaliforniai paprika', 1, 'db'], ['bébispenót', 100, 'g'],
      ['reszelt sajt', 120, 'g'], ['újhagyma', 3, 'db'], ['tej', 100, 'ml'],
      ['olívaolaj', 1, 'ek'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'Melegítsd elő a sütőt 190 °C-ra alsó-felső sütésen, és vékonyan olajozz ki 12 mélyedést egy hagyományos muffinformában.',
      'A paprikát kockázd apróra, az újhagymát karikázd fel, a spenótot pedig vágd durvára.',
      'A tojásokat keverd össze a tejjel, a sóval és a borssal, majd forgasd bele a zöldségeket és a sajt felét.',
      'Oszd el a keveréket a formában úgy, hogy a mélyedéseket legfeljebb háromnegyedig töltsd. Szórd rá a maradék sajtot, és süsd 16–18 percig.',
      'A muffin akkor kész, ha a közepe is teljesen megszilárdult, és finom nyomásra visszarugózik. Pihentesd 5 percig, majd egy tompa késsel lazítsd körbe és emeld ki a formából.',
    ],
    preparationTime: 15, cookingTime: 18, restingTime: 5, keto: true, commonAllergens: ['egg', 'milk'], suitableForLeftovers: true, reheatsWell: true,
  }),
  makeBreakfastRecipe({
    id: 'breakfast-9', name: 'Körözött friss zöldségekkel', note: 'Keto, főzés nélküli magyaros reggeli',
    ingredients: [
      ['túró', 500, 'g'], ['tejföl', 150, 'g'], ['vöröshagyma', 0.5, 'db'],
      ['pirospaprika', 1, 'tk'], ['kömény', 0.5, 'tk'], ['retek', 1, 'csokor'],
      ['kígyóuborka', 1, 'db'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'A vöröshagymát vágd nagyon apróra. A retket és az uborkát mosd meg, majd szeleteld fel, hogy tálaláskor minden kéznél legyen.',
      'A túrót villával törd át egy tálban, majd keverd hozzá a tejfölt.',
      'Add hozzá a vöröshagymát, a pirospaprikát, a köményt, a sót és a borsot.',
      'Keverd krémesre, fedd le, majd tedd hűtőbe 15 percre, hogy az ízek összeérjenek.',
      'Kóstold meg, és ha szükséges, igazítsd a fűszerezést. A friss retekkel és uborkával tálald; kenyér nélkül is tartalmas reggeli.',
    ],
    preparationTime: 15, cookingTime: 0, restingTime: 15, keto: true, commonAllergens: ['milk'], suitableForLeftovers: true,
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
      'Egy nagy tapadásmentes serpenyőt kenj ki kevés vajjal, és közepes lángon melegítsd fel. Ha a vaj gyorsan barnul, vedd kisebbre a lángot.',
      'Adagonként két evőkanál tésztából süss kis palacsintákat. Amikor a szélük megszilárdul és az aljuk aranybarna, körülbelül 2–3 perc után fordítsd meg őket, majd süsd a másik oldalt 1–2 percig.',
      'A kész palacsintákat tartsd melegen, amíg a többi is megsül, majd natúr joghurttal, banánszeletekkel és felengedett bogyós gyümölccsel tálald.',
    ],
    preparationTime: 10, cookingTime: 20, restingTime: 5, commonAllergens: ['gluten', 'egg', 'milk'],
  }),
  makeBreakfastRecipe({
    id: 'breakfast-11', name: 'Sajtos-gombás omlett', note: 'Szaftos gombával töltött, Keto-kompatibilis omlett',
    ingredients: [
      ['tojás', 8, 'db'], ['csiperke gomba', 300, 'g'], ['cheddar sajt', 120, 'g'],
      ['vaj', 1, 'ek'], ['újhagyma', 2, 'db'], ['bébispenót', 80, 'g'],
      ['petrezselyemzöld', 0.25, 'csokor'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'A gombát szeleteld fel, az újhagymát karikázd, a petrezselymet aprítsd finomra. A tojásokat sóval és borssal verd fel; két egyenlő adagra lesz szükséged.',
      'A vaj felén, közepes-erős lángon pirítsd a gombát 6–7 percig, amíg a leve elpárolog.',
      'Add hozzá az újhagymát és a spenótot, forgasd át 1 percig, majd tedd félre a tölteléket.',
      'A maradék vaj felét olvaszd fel, majd öntsd a serpenyőbe a tojás egyik felét. Kis-közepes lángon süsd 3–4 percig; közben egy spatulával óvatosan húzd be a szélét, hogy a folyós tojás alá tudjon folyni.',
      'Amikor a teteje már csak enyhén nedves, tedd rá a gombás töltelék és a sajt felét, majd hajtsd félbe. A vaj utolsó részével készítsd el ugyanígy a második nagy omlettet is, és petrezselyemmel megszórva tálald.',
    ],
    preparationTime: 10, cookingTime: 18, keto: true, commonAllergens: ['egg', 'milk'], estimatedCostCategory: '$$',
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
      'Egy nagy serpenyőben melegítsd fel az olívaolajat közepes-erős lángon. Pirítsd rajta a gombát és a paprikát 6–8 percig, amíg a gomba leve elpárolog és a zöldségek enyhén megpirulnak.',
      'Add hozzá a tofut, a fokhagymát, a kurkumát, a sót és a borsot, majd süsd 5 percig, közben többször átforgatva.',
      'Forgasd bele a spenótot és a paradicsomot, és melegítsd további 2–3 percig, amíg a spenót összeesik, a paradicsom pedig átmelegszik. Kóstold meg, majd tálald rögtön.',
    ],
    preparationTime: 12, cookingTime: 16, vegan: true, keto: true, commonAllergens: ['soy'], estimatedCostCategory: '$$',
  }),
  makeBreakfastRecipe({
    id: 'breakfast-13', name: 'Tükörtojás sült szalonnával és paradicsommal', note: 'Klasszikus magyaros, Keto-kompatibilis reggeli',
    ingredients: [
      ['tojás', 8, 'db'], ['szalonna', 200, 'g'], ['paradicsom', 4, 'db'],
      ['kaliforniai paprika', 1, 'db'], ['újhagyma', 2, 'db'],
      ['petrezselyemzöld', 0.25, 'csokor'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'A paradicsomot felezd el, a paprikát vágd csíkokra, az újhagymát pedig karikázd fel. Készíts elő egy tányért a megsült szalonnának és zöldségeknek.',
      'A szalonnát tedd hideg serpenyőbe, majd közepes lángon süsd 6–8 perc alatt ropogósra. Emeld tányérra.',
      'A visszamaradt zsiradékon süsd a paradicsomot és a paprikát 3–4 percig, amíg kissé megpirulnak, majd tedd őket is a tányérra.',
      'Üsd a tojásokat a széles serpenyőbe. Ha nem férnek el kényelmesen, süsd őket két adagban. Közepes lángon süsd 3–5 percig, amíg a fehérje teljesen megszilárdul; kisgyerekeknek és várandósoknak a sárgáját is süsd át.',
      'Sózd és borsozd a tojást, szórd meg újhagymával és petrezselyemmel, majd a ropogós szalonnával és a meleg zöldségekkel tálald.',
    ],
    preparationTime: 10, cookingTime: 18, vegetarian: false, keto: true, commonAllergens: ['egg'], estimatedCostCategory: '$$',
  }),
  makeBreakfastRecipe({
    id: 'breakfast-14', name: 'Bundás kenyér fokhagymás tejföllel', note: 'Ropogós magyar reggeli fokhagymás tejföllel',
    ingredients: [
      ['kenyér', 8, 'szelet'], ['tojás', 5, 'db'], ['tej', 100, 'ml'], ['tejföl', 250, 'g'],
      ['fokhagyma', 2, 'gerezd'], ['reszelt sajt', 100, 'g'], ['olaj', 4, 'ek'],
      ['só', 0.75, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'A tejfölt keverd össze a zúzott fokhagymával, negyed teáskanál sóval és kevés borssal, majd tedd félre.',
      'A tojásokat verd fel a tejjel és a maradék sóval egy széles tálban.',
      'Az olajat közepes lángon melegítsd fel egy nagy serpenyőben. Egy kenyérszeletet röviden forgass meg a tojásban, majd emeld ki, és hagyd a felesleget visszacsöpögni a tálba.',
      'Süsd a kenyereket több adagban, oldalanként 2–3 percig. Akkor jók, ha kívül aranybarnák, a tojásbevonat pedig mindenhol megszilárdult. Ha túl gyorsan barnulnak, vedd kisebbre a lángot.',
      'Papírtörlőn röviden csepegtesd le őket, majd még melegen kínáld a fokhagymás tejföllel és a reszelt sajttal.',
    ],
    preparationTime: 10, cookingTime: 15, commonAllergens: ['gluten', 'egg', 'milk'],
  }),
  makeBreakfastRecipe({
    id: 'breakfast-15', name: 'Lecsós tojás kolbásszal', note: 'Tartalmas, magyaros serpenyős reggeli',
    ingredients: [
      ['tojás', 8, 'db'], ['kolbász', 240, 'g'], ['zöldpaprika', 4, 'db'],
      ['paradicsom', 4, 'db'], ['vöröshagyma', 1, 'db'], ['olaj', 1, 'ek'],
      ['pirospaprika', 0.5, 'tk'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'A kolbászt karikázd fel, a hagymát aprítsd, a paprikát csíkozd, a paradicsomot pedig vágd cikkekre.',
      'Az olajon pirítsd a kolbászt 3–4 percig, majd add hozzá a hagymát, és párold további 4 percig.',
      'Húzd le röviden a tűzről, keverd bele a pirospaprikát, majd azonnal add hozzá a paprikát és a paradicsomot.',
      'Közepes lángon, fedő alatt főzd 10–12 percig. Közben a tojásokat sóval és borssal verd fel. Ha a lecsó túl leveses, a végén fedő nélkül főzd még 2–3 percig.',
      'Öntsd a tojást a lecsóra, és kis-közepes lángon, kevergetve süsd 3–4 percig, amíg nem marad benne folyós tojás. Tálald rögtön, hogy szaftos maradjon.',
    ],
    preparationTime: 12, cookingTime: 25, vegetarian: false, keto: true, commonAllergens: ['egg'], estimatedCostCategory: '$$',
  }),
  makeBreakfastRecipe({
    id: 'breakfast-16', name: 'Tojáskrém friss paprikával', note: 'Keto, előre elkészíthető tojáskrém',
    ingredients: [
      ['tojás', 8, 'db'], ['tejföl', 120, 'g'], ['mustár', 2, 'tk'],
      ['újhagyma', 3, 'db'], ['kaliforniai paprika', 2, 'db'], ['kígyóuborka', 1, 'db'],
      ['pirospaprika', 0.5, 'tk'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'Tedd a tojásokat egy lábasba, önts rájuk annyi hideg vizet, hogy ellepje őket, majd forrald fel. Közepes lángon főzd 9 percig, ezután hideg vízben hűtsd le és hámozd meg.',
      'Hat tojást villával törj össze, kettőt pedig vágj apró kockákra, hogy a krémnek maradjon tartása.',
      'Keverd hozzá a tejfölt, a mustárt, a pirospaprikát, a sót, a borsot és a karikázott újhagymát.',
      'Fedd le, és tedd hűtőbe legalább 20 percre. Közben a paprikát csíkozd, az uborkát szeleteld fel.',
      'Kóstold meg a tojáskrémet, és ha szükséges, igazítsd a fűszerezést. A friss zöldségekkel tálald, a maradékot pedig két órán belül tedd vissza a hűtőbe.',
    ],
    preparationTime: 15, cookingTime: 15, restingTime: 20, keto: true, commonAllergens: ['egg', 'milk'], suitableForLeftovers: true,
  }),
  makeBreakfastRecipe({
    id: 'breakfast-17', name: 'Tepertőkrém lilahagymával', note: 'Hagyományos magyar hideg reggeli',
    ingredients: [
      ['tepertő', 400, 'g'], ['lilahagyma', 1, 'db'], ['mustár', 2, 'tk'],
      ['tejföl', 80, 'g'], ['pirospaprika', 0.5, 'tk'], ['kenyér', 8, 'szelet'],
      ['retek', 1, 'csokor'], ['só', 0.25, 'tk'], ['bors', 0.5, 'tk'],
    ],
    steps: [
      'A tepertőt ellenőrizd, és ha nagyobb kemény bőrdarab van rajta, távolítsd el. A lilahagymát vágd nagyon apróra.',
      'A tepertőt késes aprítóban, rövid szakaszokban dolgozd kenhetőre. Állj meg néhányszor, és kapard le az edény oldalát; így egyenletesebb lesz, és nem melegszik fel túlságosan.',
      'Keverd hozzá a lilahagyma kétharmadát, a mustárt, a tejfölt, a pirospaprikát és a borsot.',
      'Először kóstold meg, és csak ezután sózd, mert a tepertő önmagában is sós lehet. Fedd le, majd tedd hűtőbe legalább 30 percre, hogy az ízek összeérjenek.',
      'Tálalás előtt hagyd 5 percig szobahőmérsékleten, hogy könnyebben kenhető legyen. Kend kenyérre, szórd meg a maradék lilahagymával, és friss retekkel kínáld.',
    ],
    preparationTime: 15, cookingTime: 0, restingTime: 35, vegetarian: false, commonAllergens: ['gluten', 'milk'], suitableForLeftovers: true,
  }),
  makeBreakfastRecipe({
    id: 'breakfast-18', name: 'Virslis-tojásos serpenyő', note: 'Gyors, laktató meleg reggeli',
    ingredients: [
      ['tojás', 8, 'db'], ['virsli', 6, 'db'], ['kaliforniai paprika', 1, 'db'],
      ['paradicsom', 2, 'db'], ['újhagyma', 3, 'db'], ['olaj', 1, 'ek'],
      ['mustár', 2, 'tk'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
    ],
    steps: [
      'A virslit karikázd fel, a paprikát és paradicsomot kockázd, az újhagymát pedig szeleteld vékonyra.',
      'Egy nagy serpenyőben melegítsd fel az olajat közepes lángon, és pirítsd rajta a virslit 4–5 percig, amíg átforrósodik és a széle enyhén megpirul.',
      'Add hozzá a paprikát, és süsd 3 percig, majd forgasd bele a paradicsomot és az újhagyma felét.',
      'A tojásokat verd fel sóval és borssal, öntsd a serpenyőbe, majd kis-közepes lángon, kevergetve süsd 3–4 percig, amíg nem marad benne folyós tojás.',
      'Szórd meg a maradék újhagymával, és kevés mustárral tálald. Ha a virsli csomagolása eltérő elkészítést ír elő, azt kövesd.',
    ],
    preparationTime: 10, cookingTime: 15, vegetarian: false, keto: true, commonAllergens: ['egg'],
  }),
  makeBreakfastRecipe({
    id: 'breakfast-19', name: 'Kakaós tejbegríz', note: 'Klasszikus, meleg magyar családi reggeli',
    ingredients: [
      ['tej', 1, 'l'], ['gríz', 120, 'g'], ['cukor', 3, 'ek'],
      ['vaníliás cukor', 1, 'csomag'], ['kakaó', 2, 'ek'], ['vaj', 20, 'g'],
      ['fahéj', 0.25, 'tk'], ['só', 1, 'csipet'],
    ],
    steps: [
      'A tejet öntsd vastag aljú lábasba, add hozzá a sót, és közepes lángon kezdd melegíteni.',
      'Amikor a tej már gőzölög, de még nem forr, folyamatos keverés mellett lassan, vékony sugárban szórd bele a grízt. Így kisebb eséllyel lesz csomós.',
      'Vedd kis lángra, és állandóan keverve főzd 5–7 percig, amíg krémesre sűrűsödik és a dara teljesen megpuhul. Ha túl gyorsan sűrűsödik, adj hozzá kevés tejet.',
      'Keverd bele a cukrot, a vaníliás cukrot és a vajat, majd vedd le a tűzről. Pihentesd 2 percig; közben még kissé sűrűsödni fog.',
      'Oszd tálkákba, keverd össze a kakaót a fahéjjal, és egyenletesen szórd a tetejére. Melegen a legkrémesebb.',
    ],
    preparationTime: 5, cookingTime: 12, restingTime: 2, commonAllergens: ['gluten', 'milk'],
  }),
  makeBreakfastRecipe({
    id: 'breakfast-20', name: 'Fahéjas-almás tejberizs', note: 'Krémes, gyümölcsös meleg reggeli',
    ingredients: [
      ['rizs', 240, 'g'], ['tej', 900, 'ml'], ['víz', 330, 'ml'], ['alma', 3, 'db'],
      ['cukor', 2, 'ek'], ['vaníliás cukor', 1, 'csomag'], ['fahéj', 1, 'tk'],
      ['vaj', 20, 'g'], ['só', 1, 'csipet'],
    ],
    steps: [
      'A rizst öblítsd át, majd tedd egy vastag aljú lábasba 300 ml vízzel és a sóval. Kis lángon főzd 8–10 percig, amíg a vizet majdnem teljesen felszívja.',
      'Öntsd hozzá a tej körülbelül egyharmadát. Kis lángon főzd tovább, és amikor a rizs felszívta, két részletben add hozzá a maradék tejet is.',
      'Gyakran keverd meg, különösen a főzés vége felé, hogy ne kapjon le. A tej hozzáadása után körülbelül 25–30 perc kell ahhoz, hogy a rizs teljesen puha és krémes legyen.',
      'Keverd bele a cukrot, a vaníliás cukrot és a vajat, majd vedd le a tűzről, fedd le, és pihentesd 5 percig. Ha túlságosan besűrűsödik, lazítsd kevés tejjel.',
      'Amíg a rizs fő, magozd ki és vágd kis kockákra az almákat. Egy serpenyőben a maradék két evőkanál vízzel és a fahéjjal párold 6–8 percig, amíg megpuhulnak, de nem esnek szét.',
      'Oszd a tejberizst tálkákba, kanalazd rá a meleg fahéjas almát, és tálald. A kihűlt maradékot két órán belül tedd hűtőbe.',
    ],
    preparationTime: 10, cookingTime: 40, restingTime: 5, commonAllergens: ['milk'], suitableForLeftovers: true, reheatsWell: true,
  }),
  makeBreakfastRecipe({
    id: 'breakfast-21', name: 'Túrós batyu', note: 'Citromos-vaníliás túróval töltött magyar péksütemény',
    ingredients: [
      ['finomliszt', 500, 'g'], ['tej', 250, 'ml'], ['élesztő', 25, 'g'], ['vaj', 80, 'g'],
      ['tojás', 2, 'db'], ['túró', 500, 'g'], ['tejföl', 50, 'g'], ['gríz', 2, 'ek'], ['cukor', 5, 'ek'],
      ['vaníliás cukor', 1, 'csomag'], ['citromhéj', 1, 'tk'], ['só', 0.5, 'tk'],
    ],
    steps: [
      'A tej felét langyosítsd kézmelegre. Keverj el benne egy evőkanál cukrot és az élesztőt, majd hagyd 8–10 percig állni, amíg habos lesz. Ha nem indul el, használj friss élesztőt.',
      'A lisztet keverd össze a sóval. Add hozzá az élesztős tejet, a maradék langyos tejet, az olvasztott, de már nem forró vajat és egy tojást. Dagaszd 8–10 percig, amíg sima és rugalmas lesz.',
      'Fedd le a tésztát, és langyos, huzatmentes helyen keleszd körülbelül 45 percig, amíg láthatóan megnő. Közben a túrót csepegtesd le, ha nedves.',
      'A töltelékhez keverd össze a túrót, a tejfölt, a grízt, a maradék cukrot, a vaníliás cukrot, a citromhéjat és a második felvert tojás felét. A másik felét tedd félre a kenéshez.',
      'Nyújtsd a tésztát körülbelül fél centiméter vastagra, és vágd 12 egyforma négyzetre. Oszd el rajtuk a tölteléket, majd minden négyzet négy sarkát húzd középre, és csípd össze erősen.',
      'Tedd a batyukat sütőpapíros tepsire, fedd le lazán, és pihentesd 15 percig. Közben melegítsd elő a sütőt 190 °C-ra alsó-felső sütésen.',
      'Kend meg a batyukat a félretett tojással, majd süsd 18–22 percig, amíg egyenletesen aranybarnák lesznek. Rácson hűtsd legalább 15 percig, hogy a töltelék megszilárduljon.',
    ],
    preparationTime: 35, cookingTime: 22, restingTime: 85, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk'], suitableForLeftovers: true, reheatsWell: true, estimatedCostCategory: '$$',
  }),
  makeBreakfastRecipe({
    id: 'breakfast-22', name: 'Sajtos pogácsa friss zöldségekkel', note: 'Házi magyar péksütemény reggelire',
    ingredients: [
      ['finomliszt', 500, 'g'], ['vaj', 180, 'g'], ['tejföl', 200, 'g'], ['élesztő', 25, 'g'],
      ['tej', 100, 'ml'], ['tojás', 2, 'db'], ['reszelt sajt', 180, 'g'],
      ['cukor', 1, 'tk'], ['só', 1.5, 'tk'], ['kaliforniai paprika', 2, 'db'], ['kígyóuborka', 1, 'db'],
    ],
    steps: [
      'A tejet langyosítsd kézmelegre, keverd el benne a cukrot és az élesztőt, majd hagyd 8–10 percig állni, amíg habos lesz.',
      'A lisztet morzsold össze a hideg, felkockázott vajjal. Add hozzá a tejfölt, egy tojást, a sót és az élesztős tejet, majd gyúrd 6–8 perc alatt puha, egynemű tésztává.',
      'Fedd le, és langyos, huzatmentes helyen keleszd körülbelül 40 percig, amíg láthatóan megnő.',
      'A sajt felét finoman gyúrd a tésztába. Nyújtsd 2 centiméter vastagra, a tetejét késsel sekélyen rácsozd be, majd 5 centiméteres szaggatóval szúrd ki.',
      'Tedd sütőpapíros tepsire, fedd le lazán, és pihentesd 15 percig. Közben melegítsd elő a sütőt 200 °C-ra alsó-felső sütésen.',
      'Kend meg a pogácsákat a második felvert tojással úgy, hogy az oldalukra ne folyjon le, majd szórd rájuk a maradék sajtot.',
      'Süsd 15–18 percig, amíg szépen megemelkednek és aranybarnák lesznek. Rácson hűtsd legalább 10 percig, majd csíkokra vágott paprikával és uborkával tálald.',
    ],
    preparationTime: 30, cookingTime: 18, restingTime: 75, difficulty: 'medium', commonAllergens: ['gluten', 'egg', 'milk'], suitableForLeftovers: true, reheatsWell: true,
  }),
  makeBreakfastRecipe({
    id: 'breakfast-23', name: 'Magyaros reggelizőtál főtt tojással', note: 'Bőséges magyaros hidegtál családi reggelihez',
    ingredients: [
      ['tojás', 4, 'db'], ['füstölt szalonna', 80, 'g'], ['szárazkolbász', 120, 'g'],
      ['főtt sonka', 120, 'g'], ['trappista sajt', 120, 'g'], ['kaliforniai paprika', 2, 'db'],
      ['paradicsom', 3, 'db'], ['kígyóuborka', 1, 'db'], ['újhagyma', 1, 'csokor'],
      ['kenyér', 8, 'szelet'], ['mustár', 2, 'ek'],
    ],
    steps: [
      'Tedd a tojásokat egy lábasba, önts rájuk annyi hideg vizet, hogy ellepje őket, majd forrald fel. Közepes lángon főzd 9 percig, ezután hideg vízben hűtsd le és hámozd meg.',
      'Ellenőrizd, hogy a szalonna, a kolbász és a sonka csomagolása szerint fogyasztásra kész. Vágd őket és a sajtot vékony, könnyen tálalható szeletekre.',
      'A paprikát, paradicsomot és uborkát mosd meg és szeleteld fel, az újhagymát tisztítsd meg.',
      'A tojásokat felezd el, majd a húsfélékkel, sajttal és zöldségekkel rendezd el egy nagy tálon úgy, hogy mindenből könnyű legyen venni.',
      'Friss kenyérrel és külön kínált mustárral tálald. Ez egy irányadó összeállítás: mindenki abból és annyit választhat, amit szívesen eszik.',
    ],
    preparationTime: 20, cookingTime: 15, vegetarian: false, commonAllergens: ['gluten', 'egg', 'milk'], estimatedCostCategory: '$$$',
  }),
];

export const breakfastRecipeEnglishInstructions: Record<string, string> = {
  'breakfast-1': `1. Get everything ready: cut the pepper and tomatoes into small dice, slice the green onions, and finely chop the parsley.\n\n2. Crack the eggs into a bowl, add the salt and pepper, and beat with a fork until evenly combined.\n\n3. Melt the butter in a large non-stick frying pan over medium heat. Cook the pepper for 3 minutes, then add the tomatoes and green onions and cook for 1 minute more.\n\n4. Turn the heat down to low-medium and pour in the eggs. Slowly draw the setting egg towards the centre with a spatula so the uncooked egg can flow underneath.\n\n5. After 3–4 minutes, when no liquid egg remains but the eggs are still soft, add the cheese and parsley. Fold gently and serve straight away so the eggs do not dry out.`,
  'breakfast-2': `1. Wash and core the apples. Grate one apple and cut the other into small dice; roughly chop the walnuts.\n\n2. Put the oats, milk, grated apple, cinnamon, and salt in a saucepan.\n\n3. Heat over medium heat, stirring occasionally, until nearly simmering. Turn the heat to low and cook for 6–8 minutes, stirring often so it does not catch.\n\n4. When the oats are tender and creamy, remove the pan from the heat. Stir in the honey and 1 tablespoon of juice squeezed from the half lemon.\n\n5. If the oatmeal is too thick, loosen it with a little milk. Divide among bowls and serve with the diced apple and walnuts.`,
  'breakfast-3': `1. Mix the oats, chia seeds, and cinnamon in a large sealable container.\n\n2. Add the yogurt, milk, honey, and lemon zest, then stir until evenly combined.\n\n3. Fold in two-thirds of the frozen berries, seal the container, and refrigerate it immediately.\n\n4. Chill for at least 6 hours or overnight. Stir in the morning; if it is thicker than you like, loosen it with a few tablespoons of milk.\n\n5. Divide into four portions and serve with the remaining berries and roughly chopped walnuts. Keep it refrigerated until serving.`,
  'breakfast-4': `1. Mash one banana in a large bowl, then mix in the coconut drink, cinnamon, and the juice squeezed from the half lemon.\n\n2. Whisk in the chia seeds, then stir again after 10 minutes so the mixture does not form lumps.\n\n3. Cover, refrigerate immediately, and chill for at least 4 hours or overnight, until it has a pudding-like texture.\n\n4. Before serving, slice the remaining banana and apple and let the berries thaw slightly.\n\n5. Stir the pudding; if it is too thick, add a little coconut drink. Divide among four glasses, layer with the fruit, and sprinkle with the almonds.`,
  'breakfast-5': `1. Put the berries in a bowl 10 minutes before serving so they can thaw slightly. If you move them to the refrigerator the night before, there is no need to wait in the morning.\n\n2. Wash, core, and dice the apple, then roughly chop the walnuts.\n\n3. Mix the yogurt with the honey, cinnamon, and finely grated lemon zest.\n\n4. Divide half the yogurt among four glasses, layer with the apple and berries, then add the remaining yogurt.\n\n5. Add the granola and walnuts immediately before serving so they stay pleasantly crisp.`,
  'breakfast-6': `1. Put the eggs in a small saucepan and cover them with cold water. Bring to a boil, then cook over medium heat for 9 minutes. Cool in cold water and peel.\n\n2. Scoop the avocados into a bowl. Add the lemon juice, olive oil, salt, and pepper, then mash to a chunky spread.\n\n3. Toast the bread until golden in a toaster or dry frying pan.\n\n4. Spread the avocado over the toast, then top with the sliced tomatoes and boiled eggs.\n\n5. Add chilli flakes to taste and a little pepper, then serve while the toast is still crisp.`,
  'breakfast-7': `1. Heat the oven to 210°C and line a baking tray with baking paper.\n\n2. Spread the bread slices thinly with butter and mustard, then place them on the tray.\n\n3. Divide the ham and thinly sliced tomatoes among the bread. Lightly salt the tomatoes, then add the grated cheese.\n\n4. Sprinkle with oregano and pepper, then bake for 8–10 minutes, until the cheese has melted and begun to brown.\n\n5. Leave the sandwiches to stand for 2 minutes. They will be easier to handle while the cheese remains pleasantly melted.`,
  'breakfast-8': `1. Heat the oven to 190°C using conventional top and bottom heat, and lightly oil 12 cups of a standard muffin tin.\n\n2. Finely dice the pepper, slice the green onions, and roughly chop the spinach.\n\n3. Whisk the eggs with the milk, salt, and pepper, then fold in the vegetables and half the cheese.\n\n4. Fill each cup no more than three-quarters full, add the remaining cheese, and bake for 16–18 minutes.\n\n5. The muffins are ready when their centres are fully set and spring back when lightly pressed. Rest for 5 minutes, then loosen the edges with a blunt knife and lift them from the tin.`,
  'breakfast-9': `1. Finely chop the red onion. Wash and slice the radishes and cucumber so everything is ready for serving.\n\n2. Mash the cottage cheese with a fork in a bowl, then stir in the sour cream.\n\n3. Add the red onion, paprika, caraway seeds, salt, and pepper.\n\n4. Mix until creamy, cover, and refrigerate for 15 minutes so the flavours can develop.\n\n5. Taste and adjust the seasoning if needed. Serve with the fresh radishes and cucumber; it is filling even without bread.`,
  'breakfast-10': `1. Blend the oats into a fine flour. Mash two bananas and slice the third for serving.\n\n2. Mix the oats, mashed banana, eggs, milk, baking powder, and cinnamon, then rest the batter for 5 minutes.\n\n3. Lightly grease a large non-stick frying pan with butter and heat it over medium heat. If the butter browns quickly, turn the heat down.\n\n4. Use two tablespoons of batter for each small pancake. When the edges are set and the underside is golden, turn after about 2–3 minutes and cook the second side for 1–2 minutes.\n\n5. Keep the cooked pancakes warm while you finish the batch, then serve with plain yogurt, banana slices, and thawed berries.`,
  'breakfast-11': `1. Slice the mushrooms and green onions and finely chop the parsley. Whisk the eggs with the salt and pepper; you will need two equal portions.\n\n2. Cook the mushrooms in half the butter over medium-high heat for 6–7 minutes, until their liquid has evaporated.\n\n3. Add the green onions and spinach, cook for 1 minute, then set the filling aside.\n\n4. Melt half the remaining butter and add half the eggs. Cook over low-medium heat for 3–4 minutes, gently drawing in the edges so uncooked egg can flow underneath.\n\n5. When the top is only slightly moist, add half the mushrooms and cheese and fold the omelette. Use the last of the butter to make the second large omelette in the same way, then serve sprinkled with parsley.`,
  'breakfast-12': `1. Drain the tofu, gently press out excess moisture in a clean kitchen towel, and crumble it with a fork.\n\n2. Dice the pepper and tomatoes, slice the mushrooms, and finely chop the garlic.\n\n3. Heat the olive oil in a large frying pan over medium-high heat. Cook the mushrooms and pepper for 6–8 minutes, until the mushroom liquid has evaporated and the vegetables are lightly browned.\n\n4. Add the tofu, garlic, turmeric, salt, and pepper and cook for 5 minutes, turning several times.\n\n5. Fold in the spinach and tomatoes and cook for another 2–3 minutes, until the spinach wilts and the tomatoes are warm. Taste and serve straight away.`,
  'breakfast-13': `1. Halve the tomatoes, cut the pepper into strips, and slice the green onions. Set out a plate for the cooked bacon and vegetables.\n\n2. Put the bacon in a cold frying pan and cook over medium heat for 6–8 minutes, until crisp. Transfer it to the plate.\n\n3. Cook the tomatoes and pepper in the rendered fat for 3–4 minutes, until lightly browned, then transfer them to the plate as well.\n\n4. Crack the eggs into the wide pan. If they do not fit comfortably, cook them in two batches. Cook over medium heat for 3–5 minutes, until the whites are fully set; for young children and pregnant people, cook the yolks through as well.\n\n5. Season the eggs, add the green onions and parsley, and serve with the crisp bacon and warm vegetables.`,
  'breakfast-14': `1. Mix the sour cream with the crushed garlic, a quarter teaspoon of salt, and a little pepper, then set aside.\n\n2. Beat the eggs with the milk and remaining salt in a wide bowl.\n\n3. Heat the oil in a large frying pan over medium heat. Briefly dip one bread slice at a time in the egg, then lift it out and let the excess drip back into the bowl.\n\n4. Cook in batches for 2–3 minutes per side. The bread is ready when golden and the egg coating is fully set. If it browns too quickly, turn the heat down.\n\n5. Drain briefly on paper towel, then serve while still warm with the garlic sour cream and grated cheese.`,
  'breakfast-15': `1. Slice the sausage, chop the onion, cut the peppers into strips, and cut the tomatoes into wedges.\n\n2. Brown the sausage in the oil for 3–4 minutes, add the onion, and cook for another 4 minutes.\n\n3. Briefly remove the pan from the heat, stir in the paprika, then immediately add the peppers and tomatoes so the paprika does not burn.\n\n4. Cover and cook over medium heat for 10–12 minutes. Meanwhile, beat the eggs with the salt and pepper. If the lecsó is watery, uncover and cook for another 2–3 minutes.\n\n5. Pour in the eggs and cook over low-medium heat, stirring, for 3–4 minutes until no liquid egg remains. Serve straight away so it stays moist.`,
  'breakfast-16': `1. Put the eggs in a saucepan and cover them with cold water. Bring to a boil, then cook over medium heat for 9 minutes. Cool in cold water and peel.\n\n2. Mash six eggs with a fork and finely dice the other two so the spread retains some texture.\n\n3. Mix in the sour cream, mustard, paprika, salt, pepper, and sliced green onions.\n\n4. Cover and refrigerate for at least 20 minutes. Meanwhile, cut the peppers into strips and slice the cucumber.\n\n5. Taste and adjust the seasoning if needed, then serve with the fresh vegetables. Return leftovers to the refrigerator within two hours.`,
  'breakfast-17': `1. Check the cracklings and remove any large, hard pieces of rind. Finely chop the red onion.\n\n2. Process the cracklings in short pulses until spreadable. Stop a few times to scrape down the bowl so the mixture stays even and does not become too warm.\n\n3. Mix in two-thirds of the onion, the mustard, sour cream, paprika, and pepper.\n\n4. Taste before adding salt because the cracklings may already be salty. Cover and refrigerate for at least 30 minutes so the flavours can develop.\n\n5. Let the spread stand at room temperature for 5 minutes so it is easier to spread. Serve on bread with the remaining red onion and fresh radishes.`,
  'breakfast-18': `1. Slice the wieners and green onions and dice the pepper and tomatoes.\n\n2. Heat the oil in a large frying pan over medium heat and cook the wieners for 4–5 minutes, until piping hot and lightly browned around the edges.\n\n3. Add the pepper and cook for 3 minutes, then fold in the tomatoes and half the green onions.\n\n4. Beat the eggs with the salt and pepper, pour them into the pan, and cook over low-medium heat, stirring, for 3–4 minutes until no liquid egg remains.\n\n5. Sprinkle with the remaining green onions and serve with a little mustard. If the wiener package gives different heating instructions, follow those.`,
  'breakfast-19': `1. Pour the milk into a heavy-based saucepan, add the salt, and begin heating over medium heat.\n\n2. When the milk is steaming but not yet boiling, slowly sprinkle in the semolina while stirring continuously. This helps prevent lumps.\n\n3. Turn the heat to low and cook for 5–7 minutes, stirring constantly, until creamy and fully tender. If it thickens too quickly, add a little milk.\n\n4. Stir in the sugar, vanilla sugar, and butter, then remove from the heat. Rest for 2 minutes; it will thicken a little more.\n\n5. Divide among bowls, mix the cocoa with the cinnamon, and sprinkle evenly over the top. It is creamiest when served warm.`,
  'breakfast-20': `1. Rinse the rice, then put it in a heavy-based saucepan with 300 ml of the water and the salt. Cook over low heat for 8–10 minutes, until almost all the water has been absorbed.\n\n2. Add about one-third of the milk. Continue cooking over low heat; when the rice has absorbed it, add the remaining milk in two more stages.\n\n3. Stir often, especially towards the end, so the rice does not catch. After adding the milk, allow about 25–30 minutes for the rice to become completely tender and creamy.\n\n4. Stir in the sugar, vanilla sugar, and butter. Remove from the heat, cover, and rest for 5 minutes. If it becomes too thick, loosen it with a little milk.\n\n5. While the rice cooks, core and dice the apples. Cook them in a frying pan with the remaining two tablespoons of water and the cinnamon for 6–8 minutes, until tender but not falling apart.\n\n6. Divide the rice pudding among bowls, spoon over the warm apples, and serve. Refrigerate cooled leftovers within two hours.`,
  'breakfast-21': `1. Warm half the milk until it feels lukewarm, not hot. Mix in one tablespoon of sugar and the yeast, then leave for 8–10 minutes, until foamy. If it does not foam, start again with fresh yeast.\n\n2. Mix the flour with the salt. Add the yeast mixture, remaining lukewarm milk, melted but no longer hot butter, and one egg. Knead for 8–10 minutes, until smooth and elastic.\n\n3. Cover and leave in a warm, draught-free place for about 45 minutes, until visibly larger. Meanwhile, drain the cottage cheese if it is wet.\n\n4. Mix the cottage cheese, sour cream, semolina, remaining sugar, vanilla sugar, lemon zest, and half the second beaten egg. Reserve the other half for brushing.\n\n5. Roll the dough to about 5 mm thick and cut into 12 equal squares. Divide the filling among them, bring the four corners of each square to the centre, and pinch firmly together.\n\n6. Place on a lined baking tray, cover loosely, and rest for 15 minutes. Meanwhile, heat the oven to 190°C using conventional top and bottom heat.\n\n7. Brush with the reserved egg and bake for 18–22 minutes, until evenly golden. Cool on a rack for at least 15 minutes so the filling can set.`,
  'breakfast-22': `1. Warm the milk until it feels lukewarm, not hot. Mix in the sugar and yeast, then leave for 8–10 minutes, until foamy.\n\n2. Rub the cold diced butter into the flour. Add the sour cream, one egg, salt, and yeast mixture, then knead for 6–8 minutes into a soft, even dough.\n\n3. Cover and leave in a warm, draught-free place for about 40 minutes, until visibly larger.\n\n4. Gently knead half the cheese into the dough. Roll to 2 cm thick, score a shallow crosshatch on top, and cut out rounds with a 5 cm cutter.\n\n5. Place on a lined baking tray, cover loosely, and rest for 15 minutes. Meanwhile, heat the oven to 200°C using conventional top and bottom heat.\n\n6. Brush with the second beaten egg without letting it run down the sides, then add the remaining cheese.\n\n7. Bake for 15–18 minutes, until well risen and golden. Cool on a rack for at least 10 minutes, then serve with strips of pepper and cucumber.`,
  'breakfast-23': `1. Put the eggs in a saucepan and cover them with cold water. Bring to a boil, then cook over medium heat for 9 minutes. Cool in cold water and peel.\n\n2. Check that the bacon, sausage, and ham are labelled ready to eat. Cut them and the cheese into thin, easy-to-serve slices.\n\n3. Wash and slice the peppers, tomatoes, and cucumber and trim the green onions.\n\n4. Halve the eggs and arrange them on a large platter with the meats, cheese, and vegetables so everything is easy to reach.\n\n5. Serve with fresh bread and mustard on the side. The selection is only a guide: everyone can choose what and how much they would enjoy.`,
};
