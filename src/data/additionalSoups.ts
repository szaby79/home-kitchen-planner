import { Recipe } from '@/types/recipe';

export const additionalSoups: Recipe[] = [
  {
    id: 'soup-21', name: 'Palócleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: 'Tartalmas, egytálételnek is megfelelő leves', imageUrl: '',
    ingredients: [
      { name: 'sertéscomb', quantity: 500, unit: 'g' }, { name: 'zöldbab', quantity: 300, unit: 'g' },
      { name: 'burgonya', quantity: 400, unit: 'g' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'fokhagyma', quantity: 2, unit: 'gerezd' }, { name: 'pirospaprika', quantity: 1, unit: 'tk' },
      { name: 'tejföl', quantity: 200, unit: 'ml' }, { name: 'liszt', quantity: 1, unit: 'ek' },
      { name: 'kapor', quantity: 0.5, unit: 'csokor' }, { name: 'olaj', quantity: 2, unit: 'ek' },
      { name: 'só', quantity: 1, unit: 'tk' },
    ],
    description: `1. A húst vágd 2 cm-es kockákra, a hagymát és fokhagymát aprítsd fel, a burgonyát hámozd meg és kockázd fel, a zöldbabot darabold 3–4 cm-esre.

2. Az olajon párold a hagymát 5 percig. Húzd le a fazekat a tűzről, keverd bele a pirospaprikát, majd azonnal önts hozzá 1 dl vizet, hogy a paprika ne égjen meg.

3. Add hozzá a húst, fokhagymát és sót. Lefedve, kis lángon párold 35–40 percig; ha elfő a leve, kevés vizet pótolj.

4. Tedd bele a burgonyát és zöldbabot, önts rá kb. 1,2 liter vizet, majd főzd 20 percig, amíg minden puha.

5. A tejfölt keverd simára a liszttel és 1 merőkanál forró levessel. Öntsd vissza keverés közben, forrald 3 percig, majd add hozzá az aprított kaprot.`,
  },
  {
    id: 'soup-22', name: 'Frankfurti leves', category: 'soup', mealType: 'both', defaultServings: 4, note: 'Gyors, laktató vacsora', imageUrl: '',
    ingredients: [
      { name: 'kelkáposzta', quantity: 500, unit: 'g' }, { name: 'virsli', quantity: 4, unit: 'db' },
      { name: 'burgonya', quantity: 300, unit: 'g' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'fokhagyma', quantity: 2, unit: 'gerezd' }, { name: 'tejföl', quantity: 150, unit: 'ml' },
      { name: 'liszt', quantity: 1, unit: 'ek' }, { name: 'majoránna', quantity: 1, unit: 'tk' },
      { name: 'pirospaprika', quantity: 1, unit: 'tk' }, { name: 'olaj', quantity: 1, unit: 'ek' },
      { name: 'só', quantity: 1, unit: 'tk' },
    ],
    description: `1. A kelkáposztát vágd vékony csíkokra, a burgonyát kockákra, a hagymát és fokhagymát apróra, a virslit karikákra.

2. Az olajon párold a hagymát 5 percig. Húzd le a tűzről, keverd bele a pirospaprikát, majd rögtön önts hozzá 1 dl vizet.

3. Add hozzá a burgonyát, káposztát, fokhagymát, majoránnát, sót és kb. 1,5 liter vizet. Forrald fel, majd kis lángon főzd 20 percig.

4. Tedd bele a virslit, és főzd még 5 percig. A burgonya legyen puha, a káposzta ne legyen nyers.

5. A tejfölt keverd simára a liszttel és kevés forró levessel. Öntsd vissza, kevergetve forrald 3 percig, majd kóstold meg.`,
  },
  {
    id: 'soup-23', name: 'Sütőtökkrémleves', category: 'soup', mealType: 'both', defaultServings: 4, note: 'Vegetáriánus', imageUrl: '',
    ingredients: [
      { name: 'sütőtök', quantity: 800, unit: 'g' }, { name: 'burgonya', quantity: 200, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'fokhagyma', quantity: 2, unit: 'gerezd' },
      { name: 'tejszín', quantity: 150, unit: 'ml' }, { name: 'vaj', quantity: 30, unit: 'g' },
      { name: 'szerecsendió', quantity: 1, unit: 'csipet' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'bors', quantity: 0.5, unit: 'tk' },
    ],
    description: `1. A sütőtököt és burgonyát hámozd meg, majd vágd 2 cm-es kockákra. A hagymát és fokhagymát aprítsd fel.

2. Olvaszd meg a vajat fazékban. Közepes lángon párold a hagymát 5 percig, a fokhagymát további 30 másodpercig.

3. Add hozzá a tököt és burgonyát, önts rá kb. 1,2 liter vizet, sózd és borsozd. Forrald fel, majd kis lángon főzd 20 percig.

4. Amikor a zöldségek villával könnyen átszúrhatók, vedd le a tűzről és botmixerrel turmixold simára.

5. Keverd hozzá a tejszínt és szerecsendiót. Kis lángon melegítsd 2–3 percig, de ne forrald erősen.`,
  },
  {
    id: 'soup-24', name: 'Zöldborsókrémleves', category: 'soup', mealType: 'both', defaultServings: 4, note: '30 percen belül elkészül', imageUrl: '',
    ingredients: [
      { name: 'zöldborsó', quantity: 500, unit: 'g' }, { name: 'burgonya', quantity: 150, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'tejszín', quantity: 100, unit: 'ml' },
      { name: 'vaj', quantity: 20, unit: 'g' }, { name: 'petrezselyemzöld', quantity: 0.5, unit: 'csokor' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'bors', quantity: 0.5, unit: 'tk' },
    ],
    description: `1. A hagymát aprítsd fel, a burgonyát hámozd meg és kockázd fel. A fagyasztott borsót nem kell kiolvasztani.

2. Olvaszd meg a vajat fazékban, és közepes lángon párold a hagymát 5 percig.

3. Add hozzá a burgonyát és kb. 1 liter vizet. Forrald fel, majd főzd 10 percig. Add hozzá a borsót, és főzd még 6–8 percig.

4. Vedd le a tűzről, add hozzá a petrezselymet, és botmixerrel turmixold simára. A mixer feje maradjon a folyadék alatt, hogy ne fröccsenjen.

5. Keverd hozzá a tejszínt, sót és borsot. Melegítsd át, de ne főzd tovább sokáig, különben a borsó elveszíti élénk színét.`,
  },
  {
    id: 'soup-25', name: 'Lebbencsleves', category: 'soup', mealType: 'both', defaultServings: 4, note: 'Szalonnás, burgonyás alföldi leves', imageUrl: '',
    ingredients: [
      { name: 'lebbencstészta', quantity: 250, unit: 'g' }, { name: 'füstölt szalonna', quantity: 150, unit: 'g' },
      { name: 'burgonya', quantity: 500, unit: 'g' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'pirospaprika', quantity: 1, unit: 'tk' }, { name: 'kömény', quantity: 0.5, unit: 'tk' },
      { name: 'só', quantity: 1, unit: 'tk' },
    ],
    description: `1. A szalonnát kockázd fel, a hagymát aprítsd, a burgonyát hámozd meg és vágd 2 cm-es kockákra. A tésztát törd nagyobb darabokra.

2. Fazékban süsd ki a szalonna zsírját, majd a pörcöt tedd félre. A zsíron pirítsd világosbarnára a lebbencstésztát.

3. Add hozzá a hagymát. Amikor megpuhult, húzd le a fazekat a tűzről, keverd bele a pirospaprikát, majd azonnal önts hozzá 1 dl vizet.

4. Tedd bele a burgonyát, köményt és sót, önts rá 1,5 liter vizet, majd kis lángon főzd 20 percig.

5. Akkor kész, ha a burgonya és a tészta puha. Kóstold meg, és a félretett szalonnapörccel tálald.`,
  },
  {
    id: 'soup-26', name: 'Korhelyleves', category: 'soup', mealType: 'both', defaultServings: 4, note: 'Savanyú káposztás, kolbászos leves', imageUrl: '',
    ingredients: [
      { name: 'savanyú káposzta', quantity: 700, unit: 'g' }, { name: 'füstölt kolbász', quantity: 300, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'fokhagyma', quantity: 2, unit: 'gerezd' },
      { name: 'tejföl', quantity: 200, unit: 'ml' }, { name: 'liszt', quantity: 1, unit: 'ek' },
      { name: 'pirospaprika', quantity: 1, unit: 'tk' }, { name: 'babérlevél', quantity: 2, unit: 'db' }, { name: 'olaj', quantity: 1, unit: 'ek' },
    ],
    description: `1. Ha a káposzta nagyon savanyú, egyszer öblítsd át és nyomkodd ki. A kolbászt karikázd, a hagymát és fokhagymát aprítsd fel.

2. Az olajon párold a hagymát 5 percig. Húzd le a fazekat a tűzről, keverd bele a pirospaprikát, majd rögtön önts hozzá 1 dl vizet.

3. Add hozzá a káposztát, kolbászt, fokhagymát és babérlevelet, majd önts rá 1,5 liter vizet.

4. Forrald fel, majd kis lángon főzd 30 percig, amíg a káposzta puha és a kolbász átfőtt.

5. A tejfölt keverd simára a liszttel és egy merőkanál forró levessel. Öntsd vissza, kevergetve forrald 3 percig, majd kóstold meg.`,
  },
  {
    id: 'soup-27', name: 'Csontleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: 'Lassan főtt, tiszta ünnepi leves', imageUrl: '',
    ingredients: [
      { name: 'marhacsont', quantity: 1200, unit: 'g' }, { name: 'sárgarépa', quantity: 3, unit: 'db' },
      { name: 'petrezselyemgyökér', quantity: 2, unit: 'db' }, { name: 'zeller', quantity: 0.5, unit: 'db' },
      { name: 'karalábé', quantity: 1, unit: 'db' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'egész bors', quantity: 10, unit: 'szem' }, { name: 'cérnametélt', quantity: 100, unit: 'g' }, { name: 'só', quantity: 1, unit: 'tk' },
    ],
    description: `1. A csontot öblítsd le, tedd nagy fazékba, és önts rá 3 liter hideg vizet. Lassan kezdd melegíteni.

2. Amikor hab jelenik meg a tetején, kanállal szedd le. Ne forrald erősen: csak apró buborékok legyenek, így marad tiszta a leves.

3. Add hozzá az egész, megtisztított zöldségeket, hagymát, borsot és sót. Kis lángon főzd fedő nélkül 3 órán át.

4. Vedd ki a csontot és zöldségeket, majd a levest finom szűrőn szűrd át. A zöldségeket szeleteld fel.

5. A cérnametéltet külön, sós vízben főzd meg a csomagolás szerint. Tálaláskor tedd a levesbe a zöldségekkel együtt.`,
  },
  {
    id: 'soup-28', name: 'Májgombócleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: 'Házi májgombóccal', imageUrl: '',
    ingredients: [
      { name: 'csirkemáj', quantity: 300, unit: 'g' }, { name: 'tojás', quantity: 1, unit: 'db' },
      { name: 'zsemlemorzsa', quantity: 100, unit: 'g' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'sárgarépa', quantity: 2, unit: 'db' }, { name: 'petrezselyemgyökér', quantity: 1, unit: 'db' },
      { name: 'petrezselyemzöld', quantity: 0.5, unit: 'csokor' }, { name: 'majoránna', quantity: 0.5, unit: 'tk' },
      { name: 'olaj', quantity: 1, unit: 'ek' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'bors', quantity: 0.5, unit: 'tk' },
    ],
    description: `1. A répát és gyökeret hámozd meg, karikázd fel, majd 1,5 liter enyhén sós vízben főzd kis lángon 20 percig.

2. A hagymát aprítsd fel és az olajon párold 5 percig. A májat tisztítsd meg, vágd nagyon apróra vagy daráld le.

3. Keverd össze a májat, hagymát, tojást, majoránnát, borsot, aprított petrezselymet és 70 g morzsát. Pihentesd 10 percig; ha túl lágy, adj hozzá még morzsát.

4. Nedves kézzel formázz kis, diónyi gombócokat. Egy próbagombócot tegyél a gyöngyöző levesbe; ha szétesik, keverj még morzsát a masszába.

5. Főzd a gombócokat kis lángon 12–15 percig. Vágj ketté egyet: belül ne legyen nyers vagy véres.`,
  },
  {
    id: 'soup-29', name: 'Hideg meggyleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: 'Nyári, hidegen tálalandó leves', imageUrl: '',
    ingredients: [
      { name: 'magozott meggy', quantity: 600, unit: 'g' }, { name: 'cukor', quantity: 80, unit: 'g' },
      { name: 'tejföl', quantity: 200, unit: 'ml' }, { name: 'liszt', quantity: 1, unit: 'ek' },
      { name: 'fahéj', quantity: 1, unit: 'tk' }, { name: 'szegfűszeg', quantity: 4, unit: 'db' },
      { name: 'citrom', quantity: 0.5, unit: 'db' }, { name: 'vaníliás cukor', quantity: 1, unit: 'csomag' },
    ],
    description: `1. Tedd a meggyet fazékba 1 liter vízzel, a cukor felével, fahéjjal, szegfűszeggel és vaníliás cukorral.

2. Forrald fel, majd kis lángon főzd 8–10 percig. Ne főzd szét teljesen a gyümölcsöt.

3. A tejfölt keverd teljesen simára a liszttel. Adj hozzá fokozatosan 2 merőkanál forró levet, majd öntsd vissza a fazékba keverés közben.

4. Forrald még 2–3 percig. Vedd ki a szegfűszeget, facsard bele a citrom levét, és kóstolás után add hozzá a maradék cukrot, ha szükséges.

5. Hűtsd szobahőmérsékletűre, majd tedd hűtőbe legalább 2 órára. Melegen ne tedd közvetlenül a hűtőbe.`,
  },
  {
    id: 'soup-30', name: 'Spenótkrémleves', category: 'soup', mealType: 'both', defaultServings: 4, note: 'Vegetáriánus, 25 perces leves', imageUrl: '',
    ingredients: [
      { name: 'spenót', quantity: 500, unit: 'g' }, { name: 'burgonya', quantity: 200, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'fokhagyma', quantity: 2, unit: 'gerezd' },
      { name: 'tejszín', quantity: 100, unit: 'ml' }, { name: 'vaj', quantity: 20, unit: 'g' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'bors', quantity: 0.5, unit: 'tk' },
      { name: 'szerecsendió', quantity: 1, unit: 'csipet' },
    ],
    description: `1. A burgonyát hámozd meg és kockázd fel, a hagymát és fokhagymát aprítsd. A friss spenótot mosd meg alaposan.

2. A vajon párold a hagymát 5 percig, majd add hozzá a fokhagymát 30 másodpercre.

3. Add hozzá a burgonyát és 1 liter vizet. Sózd, forrald fel, majd főzd 12–15 percig, amíg a burgonya puha.

4. Add hozzá a spenótot, és főzd csak 2–3 percig, amíg összeesik. Vedd le a tűzről és turmixold simára.

5. Keverd hozzá a tejszínt, borsot és szerecsendiót. Melegítsd át, de ne forrald sokáig, hogy megmaradjon a zöld színe.`,
  },
];
