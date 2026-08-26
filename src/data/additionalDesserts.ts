import { Ingredient, Recipe } from '@/types/recipe';

type IngredientRow = [string, number, string];
const makeDessert = (id: number, name: string, note: string, rows: IngredientRow[], steps: string[]): Recipe => ({
  id: `dessert-${id}`, name, category: 'dessert', mealType: 'both', defaultServings: 4, note, imageUrl: '',
  ingredients: rows.map(([ingredientName, quantity, unit]): Ingredient => ({ name: ingredientName, quantity, unit })),
  description: steps.map((step, index) => `${index + 1}. ${step}`).join('\n\n'),
});

export const additionalDesserts: Recipe[] = [
  makeDessert(16, 'Zserbó', 'Diós-baracklekváros ünnepi sütemény', [
    ['finomliszt', 500, 'g'], ['vaj', 250, 'g'], ['tej', 100, 'ml'], ['élesztő', 25, 'g'], ['cukor', 200, 'g'], ['darált dió', 300, 'g'], ['baracklekvár', 350, 'g'], ['étcsokoládé', 150, 'g'],
  ], [
    'A langyos tejbe morzsold az élesztőt egy teáskanál cukorral, és hagyd 10 percig habosodni. A tej ne legyen forró.',
    'A lisztet morzsold össze a puha vajjal, add hozzá az élesztős tejet, és gyúrj sima tésztát. Oszd négy részre.',
    'Nyújtsd ki az első lapot tepsi méretűre, kend meg lekvárral, szórd meg cukros dióval. Ismételd meg még kétszer, végül fedd be a negyedik lappal.',
    'Szurkáld meg villával, pihentesd 30 percig, majd 180 °C-on süsd 35–40 percig. Hagyd teljesen kihűlni.',
    'Olvaszd meg a csokoládét, simítsd a tetejére, és csak dermedés után szeleteld fel.',
  ]),
  makeDessert(17, 'Rákóczi túrós', 'Túrós sütemény habrácsos tetővel', [
    ['finomliszt', 300, 'g'], ['vaj', 150, 'g'], ['tojás', 5, 'db'], ['cukor', 220, 'g'], ['túró', 600, 'g'], ['tejföl', 100, 'ml'], ['baracklekvár', 150, 'g'], ['citromhéj', 1, 'tk'],
  ], [
    'A lisztet, vajat, 70 g cukrot és 1 tojássárgáját gyorsan gyúrd össze. Nyomkodd sütőpapíros tepsibe, és 180 °C-on süsd elő 12 percig.',
    'A túrót törd át villával, keverd össze 3 tojássárgájával, 100 g cukorral, tejföllel és citromhéjjal.',
    'Simítsd a túrót az elősütött tésztára, és süsd további 20 percig.',
    'A megmaradt 4 tojásfehérjét verd kemény habbá, közben fokozatosan add hozzá az 50 g cukrot. Töltsd habzsákba.',
    'Nyomj rácsot a süteményre, a közöket töltsd lekvárral, majd 150 °C-on süsd még 12–15 percig.',
  ]),
  makeDessert(18, 'Képviselőfánk', 'Vaníliakrémes égetett tészta', [
    ['víz', 250, 'ml'], ['vaj', 100, 'g'], ['finomliszt', 150, 'g'], ['tojás', 5, 'db'], ['tej', 600, 'ml'], ['vanília pudingpor', 2, 'csomag'], ['cukor', 120, 'g'], ['tejszín', 250, 'ml'],
  ], [
    'Forrald fel a vizet a vajjal. Öntsd bele egyszerre a lisztet, és kis lángon keverd 2 percig, amíg a tészta elválik az edény falától.',
    'Hagyd langyosra hűlni, majd egyenként dolgozd bele a tojásokat. Csak akkor add a következőt, amikor az előző teljesen elkeveredett.',
    'Kanállal tegyél diónyi halmokat sütőpapírra. 200 °C-on süsd 15 percig, majd 175 °C-on még 15 percig; közben ne nyisd ki a sütőt.',
    'A pudingport főzd sűrűre a tejjel és cukorral, majd fóliával lefedve hűtsd ki. A tejszínt verd kemény habbá.',
    'A kihűlt fánkok tetejét vágd le, töltsd meg vaníliakrémmel és tejszínhabbal, majd tedd vissza a kalapjukat.',
  ]),
  makeDessert(19, 'Szilvás gombóc', 'Burgonyatésztás magyar desszert', [
    ['burgonya', 800, 'g'], ['finomliszt', 250, 'g'], ['tojás', 1, 'db'], ['szilva', 12, 'db'], ['fahéj', 1, 'tk'], ['cukor', 80, 'g'], ['zsemlemorzsa', 200, 'g'], ['vaj', 50, 'g'],
  ], [
    'A burgonyát héjában főzd puhára, még melegen hámozd meg és törd össze, majd hagyd teljesen kihűlni.',
    'Gyorsan gyúrd össze a burgonyát a liszttel és tojással. Ne dolgozd túl, mert a tészta ragacsossá válik.',
    'Nyújtsd fél centi vastagra és vágd 12 négyzetre. Mindegyik közepére tegyél kimagozott, fahéjas cukorral megszórt szilvát.',
    'Zárd össze a tésztát és formázz gombócot. Gyöngyöző sós vízben főzd addig, amíg feljön, majd még 3 percig.',
    'A zsemlemorzsát vajon pirítsd aranybarnára, és forgasd bele a lecsöpögtetett gombócokat.',
  ]),
  makeDessert(20, 'Máglyarakás', 'Almás, habos kenyérpuding', [
    ['kifli', 8, 'db'], ['tej', 700, 'ml'], ['tojás', 5, 'db'], ['cukor', 180, 'g'], ['alma', 700, 'g'], ['baracklekvár', 150, 'g'], ['fahéj', 1, 'tk'], ['vaj', 30, 'g'],
  ], [
    'A kiflit karikázd fel. A tejet melegítsd langyosra, keverd össze 4 tojássárgájával és 80 g cukorral, majd öntsd a kiflire.',
    'Az almát hámozd meg, szeleteld vékonyra, és kevés vajon fahéjjal párold 8–10 percig.',
    'Vajazz ki egy sütőtálat, terítsd bele a kifli felét, erre az almát, majd a maradék kiflit. 180 °C-on süsd 25 percig.',
    'Az 5 tojásfehérjét verd kemény habbá a maradék cukorral, majd óvatosan forgasd bele a lekvárt.',
    'Simítsd a habot az elősült alapra, és 150 °C-on süsd még 12–15 percig, amíg a teteje halvány aranyszínű.',
  ]),
];
