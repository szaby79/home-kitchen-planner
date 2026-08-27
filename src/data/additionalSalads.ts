import { Ingredient, Recipe } from '@/types/recipe';

type IngredientRow = [string, number, string];

const makeSalad = (id: number, name: string, note: string, rows: IngredientRow[], steps: string[]): Recipe => ({
  id: `salad-${id}`,
  name,
  category: 'salad',
  mealType: 'both',
  defaultServings: 4,
  note,
  imageUrl: '',
  ingredients: rows.map(([ingredientName, quantity, unit]): Ingredient => ({ name: ingredientName, quantity, unit })),
  description: steps.map((step, index) => `${index + 1}. ${step}`).join('\n\n'),
});

export const additionalSalads: Recipe[] = [
  makeSalad(1, 'Csirkés Cézár-saláta', '25 perc • tartalmas, munkába is vihető', [
    ['csirkemell', 500, 'g'], ['római saláta', 2, 'db'], ['parmezán', 80, 'g'], ['kenyérkocka', 150, 'g'], ['natúr joghurt', 150, 'ml'], ['citrom', 1, 'db'], ['fokhagyma', 1, 'gerezd'], ['olaj', 2, 'ek'], ['só', 0.5, 'tk'],
  ], [
    'A csirkemellet vágd csíkokra, sózd meg, és egy evőkanál olajon süsd 8–10 percig, amíg belül sehol sem rózsaszín.',
    'A kenyérkockákat száraz serpenyőben pirítsd 4–5 percig aranybarnára.',
    'A megmosott, száraz salátát tépd falatnyi darabokra.',
    'A joghurtot keverd össze fél citrom levével, zúzott fokhagymával és egy csipet sóval.',
    'Forgasd össze a salátát az öntettel, tedd rá a csirkét, kenyérkockát és parmezánt. Munkába az öntetet külön vidd.',
  ]),
  makeSalad(2, 'Görög saláta', '15 perc • húsmentes', [
    ['paradicsom', 5, 'db'], ['uborka', 1, 'db'], ['kaliforniai paprika', 2, 'db'], ['lilahagyma', 1, 'db'], ['feta sajt', 200, 'g'], ['olívabogyó', 120, 'g'], ['olívaolaj', 3, 'ek'], ['citrom', 1, 'db'], ['oregánó', 1, 'tk'],
  ], [
    'Mosd meg a zöldségeket. A paradicsomot vágd cikkekre, az uborkát félkarikákra, a paprikát csíkokra.',
    'A lilahagymát szeleteld nagyon vékonyra, hogy ne legyen túl erős.',
    'Tedd a zöldségeket és az olívabogyót egy nagy tálba.',
    'Keverd össze az olívaolajat fél citrom levével és az oregánóval.',
    'Öntsd a salátára, óvatosan forgasd össze, végül morzsold rá a fetát.',
  ]),
  makeSalad(3, 'Tonhalas kukoricasaláta', '10 perc • főzés nélkül', [
    ['tonhalkonzerv', 3, 'doboz'], ['csemegekukorica', 300, 'g'], ['jégsaláta', 1, 'db'], ['paradicsom', 4, 'db'], ['uborka', 1, 'db'], ['natúr joghurt', 150, 'ml'], ['citrom', 1, 'db'], ['só', 0.5, 'tk'],
  ], [
    'A tonhalról és a kukoricáról öntsd le a levet, majd hagyd őket alaposan lecsepegni.',
    'A salátát tépd falatnyi darabokra, a paradicsomot és uborkát vágd fel.',
    'A joghurtot keverd össze fél citrom levével és kevés sóval.',
    'Tedd a zöldségeket, tonhalat és kukoricát egy tálba.',
    'Csak tálalás előtt forgasd össze az öntettel; munkába az öntetet külön dobozban vidd.',
  ]),
  makeSalad(4, 'Avokádós csirkesaláta', '25 perc • fehérjedús', [
    ['csirkemell', 500, 'g'], ['avokádó', 2, 'db'], ['salátakeverék', 300, 'g'], ['koktélparadicsom', 300, 'g'], ['uborka', 1, 'db'], ['lime', 1, 'db'], ['olívaolaj', 2, 'ek'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
  ], [
    'A csirkemellet vágd vékony szeletekre, sózd, borsozd, és serpenyőben süsd oldalanként 4–5 percig.',
    'A salátát mosd meg és szárítsd le, a paradicsomot felezd, az uborkát karikázd fel.',
    'Az avokádót vágd félbe, vedd ki a magját, kanalazd ki, majd szeleteld fel.',
    'Keverd össze a lime levét az olívaolajjal és egy csipet sóval.',
    'Rendezd tálba a zöldségeket, tedd rá a csirkét és avokádót, majd locsold meg az öntettel.',
  ]),
  makeSalad(5, 'Tojásos zöldsaláta', '20 perc • húsmentes, laktató', [
    ['tojás', 8, 'db'], ['salátakeverék', 350, 'g'], ['retek', 2, 'csomag'], ['uborka', 1, 'db'], ['újhagyma', 1, 'csomag'], ['natúr joghurt', 150, 'ml'], ['mustár', 1, 'tk'], ['citrom', 0.5, 'db'], ['só', 0.5, 'tk'],
  ], [
    'A tojásokat tedd hideg vízbe, forrástól számítva főzd 10 percig, majd hideg vízben hűtsd le.',
    'Mosd meg és szárítsd le a salátát. A retket, uborkát és újhagymát szeleteld fel.',
    'Hámozd meg a tojásokat, és vágd őket negyedekre.',
    'A joghurtot keverd össze a mustárral, citromlével és kevés sóval.',
    'A zöldségeket forgasd össze, tedd rá a tojást, és tálaláskor add hozzá az öntetet.',
  ]),
  makeSalad(6, 'Caprese saláta', '10 perc • húsmentes', [
    ['paradicsom', 6, 'db'], ['mozzarella', 400, 'g'], ['friss bazsalikom', 1, 'csokor'], ['olívaolaj', 3, 'ek'], ['balzsamecet', 1, 'ek'], ['só', 0.5, 'tk'], ['bors', 0.25, 'tk'],
  ], [
    'Mosd meg a paradicsomot és bazsalikomot, majd papírtörlővel szárítsd le.',
    'A paradicsomot és mozzarellát vágd hasonló vastagságú szeletekre.',
    'Felváltva rendezd a tányérra a paradicsomot, mozzarellát és bazsalikomleveleket.',
    'Locsold meg olívaolajjal és kevés balzsamecettel.',
    'Közvetlenül tálalás előtt sózd és borsozd, hogy a paradicsom ne engedjen túl sok levet.',
  ]),
  makeSalad(7, 'Almás-diós csirkesaláta', '25 perc • édeskés, ropogós', [
    ['csirkemell', 500, 'g'], ['alma', 2, 'db'], ['salátakeverék', 300, 'g'], ['dió', 100, 'g'], ['zellerszár', 3, 'db'], ['natúr joghurt', 150, 'ml'], ['citrom', 1, 'db'], ['só', 0.5, 'tk'],
  ], [
    'A csirkemellet sózd meg, és serpenyőben süsd oldalanként 5–6 percig. Pihentesd 5 percig, majd szeleteld fel.',
    'Az almát vágd vékony cikkekre, és locsold meg kevés citromlével, hogy ne barnuljon meg.',
    'A zellerszárat szeleteld fel, a diót száraz serpenyőben pirítsd 3 percig.',
    'A joghurtot keverd össze a maradék citromlével és egy csipet sóval.',
    'Rendezd tálba a salátát, almát, zellert és csirkét, szórd rá a diót, az öntetet pedig tálaláskor add hozzá.',
  ]),
  makeSalad(8, 'Kuszkuszos zöldségsaláta', '20 perc • húsmentes, munkába vihető', [
    ['kuszkusz', 300, 'g'], ['forró víz', 300, 'ml'], ['kaliforniai paprika', 2, 'db'], ['uborka', 1, 'db'], ['koktélparadicsom', 300, 'g'], ['petrezselyemzöld', 1, 'csokor'], ['citrom', 1, 'db'], ['olívaolaj', 3, 'ek'], ['só', 0.5, 'tk'],
  ], [
    'Tedd a kuszkuszt tálba, sózd meg, öntsd rá a forró vizet, fedd le, és hagyd állni 8 percig.',
    'Villával lazítsd fel a kuszkuszt, majd hagyd langyosra hűlni.',
    'A paprikát, uborkát és paradicsomot vágd kis kockákra, a petrezselymet aprítsd fel.',
    'Keverd össze a citrom levét az olívaolajjal.',
    'Forgasd össze a kuszkuszt a zöldségekkel és az öntettel. Hűtőben másnapig jól tárolható.',
  ]),
  makeSalad(9, 'Babos kukoricasaláta', '10 perc • húsmentes, főzés nélkül', [
    ['vörösbab konzerv', 2, 'doboz'], ['csemegekukorica', 300, 'g'], ['kaliforniai paprika', 2, 'db'], ['lilahagyma', 1, 'db'], ['koktélparadicsom', 250, 'g'], ['lime', 1, 'db'], ['olívaolaj', 2, 'ek'], ['petrezselyemzöld', 0.5, 'csokor'], ['só', 0.5, 'tk'],
  ], [
    'A babot öntsd szűrőbe, öblítsd át hideg vízzel, majd a kukoricával együtt csepegtesd le.',
    'A paprikát vágd kis kockákra, a paradicsomot felezd, a lilahagymát aprítsd finomra.',
    'Keverd össze a lime levét az olívaolajjal és kevés sóval.',
    'Tedd az összes hozzávalót egy nagy tálba, és óvatosan forgasd össze.',
    'Pihentesd 10 percig, hogy összeérjenek az ízek. Zárt dobozban munkába is vihető.',
  ]),
  makeSalad(10, 'Sonkás-sajtos tésztasaláta', '25 perc • laktató munkahelyi ebéd', [
    ['száraztészta', 350, 'g'], ['főtt sonka', 300, 'g'], ['trappista sajt', 200, 'g'], ['csemegekukorica', 200, 'g'], ['uborka', 1, 'db'], ['natúr joghurt', 200, 'ml'], ['mustár', 1, 'tk'], ['só', 0.5, 'tk'],
  ], [
    'A tésztát főzd meg sós vízben a csomagolás szerint, majd szűrd le és hideg vízzel hűtsd le.',
    'A sonkát, sajtot és uborkát vágd hasonló méretű kis kockákra.',
    'A joghurtot keverd össze a mustárral és kevés sóval.',
    'A teljesen kihűlt tésztát forgasd össze a sonkával, sajttal, kukoricával és uborkával.',
    'Keverd hozzá az öntetet, majd tedd hűtőbe legalább 20 percre. Hűtőtáskában vidd munkába.',
  ]),
];
