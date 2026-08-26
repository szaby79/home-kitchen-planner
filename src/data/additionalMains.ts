import { Ingredient, Recipe } from '@/types/recipe';

type IngredientRow = [string, number, string];

const makeMain = (id: number, name: string, note: string, rows: IngredientRow[], steps: string[]): Recipe => ({
  id: `main-${id}`,
  name,
  category: 'main',
  mealType: 'both',
  defaultServings: 4,
  note,
  imageUrl: '',
  ingredients: rows.map(([ingredientName, quantity, unit]): Ingredient => ({ name: ingredientName, quantity, unit })),
  description: steps.map((step, index) => `${index + 1}. ${step}`).join('\n\n'),
});

export const additionalMains: Recipe[] = [
  makeMain(36, 'Cigánypecsenye', 'Sertéstarjából, fokhagymásan', [
    ['sertéstarja', 600, 'g'], ['füstölt szalonna', 150, 'g'], ['fokhagyma', 4, 'gerezd'], ['pirospaprika', 1, 'tk'], ['olaj', 2, 'ek'], ['só', 1, 'tk'], ['bors', 0.5, 'tk'], ['burgonya', 800, 'g'],
  ], [
    'A tarját vágd négy egyforma szeletre, enyhén klopfold ki, majd mindkét oldalát sózd és borsozd.',
    'A fokhagymát zúzd össze, keverd az olajhoz, és kend a húsra. Hagyd állni 15 percig.',
    'A szalonnaszeleteket vagdosd be, majd serpenyőben süsd ropogósra. Tedd félre a kisült zsírral együtt.',
    'A húst közepesen erős lángon süsd oldalanként 4–5 percig. Akkor jó, ha belül már nem rózsaszín.',
    'Szórd meg kevés pirospaprikával csak a tűzről levéve, tedd rá a szalonnát, és sült burgonyával tálald.',
  ]),
  makeMain(37, 'Mátrai borzaska', 'Bundás hús tejföllel és sajttal', [
    ['sertéskaraj', 600, 'g'], ['burgonya', 600, 'g'], ['tojás', 2, 'db'], ['liszt', 4, 'ek'], ['tejföl', 200, 'ml'], ['reszelt sajt', 150, 'g'], ['fokhagyma', 2, 'gerezd'], ['olaj', 300, 'ml'], ['só', 1, 'tk'],
  ], [
    'A karajszeleteket klopfold körülbelül fél centi vastagra, majd mindkét oldalukat sózd meg.',
    'A burgonyát hámozd meg, reszeld le, nyomkodd ki a levét, majd keverd össze a tojással és 2 evőkanál liszttel.',
    'A húst forgasd a maradék lisztbe, aztán nyomj mindkét oldalára egyenletes burgonyás masszát.',
    'Közepesen forró olajban süsd oldalanként 5–6 percig. Ne legyen túl forró az olaj, mert a bunda megég, mielőtt a hús átsül.',
    'Papírtörlőn csepegtesd le, kend meg fokhagymás tejföllel, és szórd meg sajttal.',
  ]),
  makeMain(38, 'Vadas marha zsemlegombóccal', 'Klasszikus ünnepi fogás', [
    ['marhalábszár', 700, 'g'], ['sárgarépa', 3, 'db'], ['petrezselyemgyökér', 2, 'db'], ['vöröshagyma', 1, 'db'], ['tejföl', 200, 'ml'], ['mustár', 1, 'ek'], ['babérlevél', 2, 'db'], ['zsemle', 4, 'db'], ['tojás', 2, 'db'], ['liszt', 150, 'g'], ['só', 1, 'tk'],
  ], [
    'A húst vágd nagyobb szeletekre, a zöldségeket karikázd fel, a hagymát vágd négybe.',
    'Tedd fazékba a húst, zöldségeket, babérlevelet és sót. Öntsd fel annyi vízzel, hogy ellepje, majd kis lángon főzd 2–2,5 órát.',
    'Vedd ki a puha húst és a babérlevelet. A zöldséges levet turmixold simára, keverd hozzá a tejfölt és mustárt, majd melegítsd össze.',
    'A gombóchoz a felkockázott zsemlét keverd össze tojással, liszttel és kevés vízzel. Nedves kézzel formázz gombócokat.',
    'A gombócokat gyöngyöző sós vízben főzd 10–12 percig, majd a hússal és a mártással tálald.',
  ]),
  makeMain(39, 'Csülök pékné módra', 'Sütőben készülő hétvégi étel', [
    ['sertéscsülök', 1200, 'g'], ['burgonya', 1000, 'g'], ['vöröshagyma', 3, 'db'], ['fokhagyma', 5, 'gerezd'], ['olaj', 2, 'ek'], ['kömény', 1, 'tk'], ['só', 1.5, 'tk'], ['bors', 0.5, 'tk'],
  ], [
    'A csülköt tedd fazékba, öntsd fel vízzel, adj hozzá sót, és kis lángon főzd 75 percig.',
    'A burgonyát vágd nagyobb cikkekre, a hagymát negyedekre, a fokhagymát hagyd egészben.',
    'Tedd a zöldségeket tepsibe, locsold meg olajjal, szórd meg sóval, borssal és köménnyel.',
    'Fektesd rá az előfőzött csülköt, önts alá 2 dl főzőlevet, és 190 °C-on süsd 60 percig.',
    'Sütés közben kétszer locsold meg a levével. Akkor kész, ha a bőr pirult, a burgonya pedig könnyen átszúrható.',
  ]),
  makeMain(40, 'Rakott kelkáposzta', 'Tejfölös, darált húsos egytálétel', [
    ['kelkáposzta', 800, 'g'], ['darált sertéshús', 500, 'g'], ['rizs', 200, 'g'], ['vöröshagyma', 1, 'db'], ['tejföl', 300, 'ml'], ['pirospaprika', 1, 'tk'], ['olaj', 2, 'ek'], ['só', 1, 'tk'],
  ], [
    'A rizst főzd félpuhára 12 perc alatt. A kelkáposzta leveleit sós vízben főzd 5 percig, majd csepegtesd le.',
    'Az aprított hagymát párold olajon 5 percig, húzd le a tűzről, keverd bele a pirospaprikát, majd rögtön add hozzá a húst.',
    'Tedd vissza a tűzre, sózd, és kevergetve pirítsd 8–10 percig, amíg a hús már sehol sem rózsaszín.',
    'Egy kiolajozott tálba rétegezz káposztát, rizst, húst és tejfölt; ismételd meg, a tetejére káposzta és tejföl kerüljön.',
    '180 °C-ra előmelegített sütőben süsd 35 percig, majd szeletelés előtt pihentesd 10 percig.',
  ]),
  makeMain(41, 'Rakott karfiol', 'Könnyű, darált húsos rakottas', [
    ['karfiol', 900, 'g'], ['darált sertéshús', 500, 'g'], ['rizs', 180, 'g'], ['vöröshagyma', 1, 'db'], ['tejföl', 300, 'ml'], ['pirospaprika', 1, 'tk'], ['olaj', 2, 'ek'], ['só', 1, 'tk'],
  ], [
    'A karfiolt szedd rózsákra, és sós, gyöngyöző vízben főzd 7 percig; maradjon kissé roppanós.',
    'A rizst főzd félpuhára. Az aprított hagymát párold olajon 5 percig.',
    'Húzd le a hagymát a tűzről, keverd bele a pirospaprikát, add hozzá a húst és sót, majd pirítsd 8–10 percig.',
    'Rétegezd egy tálba a karfiol felét, a rizst, a húst, kevés tejfölt, végül a maradék karfiolt és tejfölt.',
    '180 °C-on süsd 30–35 percig, amíg a teteje világosbarnára pirul.',
  ]),
  makeMain(42, 'Tarhonyás hús', 'Egyszerű, egyedényes családi ebéd', [
    ['sertéscomb', 600, 'g'], ['tarhonya', 300, 'g'], ['vöröshagyma', 1, 'db'], ['zöldpaprika', 1, 'db'], ['paradicsom', 1, 'db'], ['pirospaprika', 1, 'tk'], ['olaj', 2, 'ek'], ['só', 1, 'tk'],
  ], [
    'A húst vágd 2 cm-es kockákra, a hagymát apróra, a paprikát és paradicsomot kisebb darabokra.',
    'Párold a hagymát olajon 5 percig. Húzd le a tűzről, keverd bele a pirospaprikát, és rögtön önts hozzá fél deci vizet.',
    'Add hozzá a húst, paprikát, paradicsomot és sót. Lefedve, kis lángon párold 40 percig; kevés vizet pótolj, ha szükséges.',
    'Külön lábasban szárazon pirítsd aranybarnára a tarhonyát, majd keverd a húshoz.',
    'Önts rá kb. 6 dl forró vizet, és lefedve főzd 15–18 percig. Kapcsold le, majd pihentesd 10 percig.',
  ]),
  makeMain(43, 'Bácskai rizses hús', 'Paprikás sertéshús rizzsel', [
    ['sertéscomb', 600, 'g'], ['rizs', 300, 'g'], ['vöröshagyma', 1, 'db'], ['zöldpaprika', 1, 'db'], ['paradicsom', 1, 'db'], ['pirospaprika', 1, 'tk'], ['olaj', 2, 'ek'], ['só', 1, 'tk'],
  ], [
    'A húst kockázd fel, a hagymát aprítsd, a paprikát és paradicsomot vágd kis darabokra. A rizst mosd át.',
    'Párold a hagymát olajon, húzd le a tűzről, keverd bele a pirospaprikát, és azonnal adj hozzá kevés vizet.',
    'Tedd bele a húst, zöldpaprikát, paradicsomot és sót. Lefedve főzd kis lángon 40 percig.',
    'Keverd hozzá a rizst, és önts rá annyi forró vizet, hogy körülbelül 1 cm-rel ellepje.',
    'Lefedve főzd 15 percig, majd a tűzről levéve pihentesd 10 percet. Ne kevergesd, mert a rizs összetörik.',
  ]),
  makeMain(44, 'Pásztortarhonya', 'Kolbászos-burgonyás egytálétel', [
    ['tarhonya', 300, 'g'], ['burgonya', 600, 'g'], ['füstölt kolbász', 250, 'g'], ['vöröshagyma', 1, 'db'], ['zöldpaprika', 1, 'db'], ['pirospaprika', 1, 'tk'], ['olaj', 2, 'ek'], ['só', 1, 'tk'],
  ], [
    'A burgonyát hámozd meg és kockázd fel, a kolbászt karikázd, a hagymát és paprikát vágd apróra.',
    'A tarhonyát az olaj felén közepes lángon pirítsd aranybarnára, majd tedd félre.',
    'A maradék olajon párold a hagymát. Húzd le a tűzről, keverd bele a pirospaprikát, és rögtön önts hozzá fél deci vizet.',
    'Add hozzá a burgonyát, kolbászt, paprikát, tarhonyát és sót, majd önts rá kb. 8 dl forró vizet.',
    'Lefedve, kis lángon főzd 20 percig. Ha a tarhonya puha, kapcsold le, és pihentesd 5 percig.',
  ]),
  makeMain(45, 'Slambuc', 'Alföldi bográcsétel otthoni változatban', [
    ['lebbencstészta', 350, 'g'], ['burgonya', 700, 'g'], ['füstölt szalonna', 180, 'g'], ['vöröshagyma', 1, 'db'], ['pirospaprika', 1, 'tk'], ['só', 1, 'tk'],
  ], [
    'A szalonnát kockázd, a hagymát aprítsd, a burgonyát hámozd meg és vágd 2 cm-es kockákra.',
    'Süsd ki a szalonna zsírját, majd a pörcöt tedd félre. A zsíron pirítsd világosbarnára a tört lebbencstésztát.',
    'Add hozzá a hagymát. Amikor puha, húzd le a tűzről, keverd bele a pirospaprikát, majd önts hozzá kevés vizet.',
    'Tedd bele a burgonyát és sót, önts rá annyi vizet, hogy éppen ellepje, és főzd kis lángon 20 percig.',
    'Fedő nélkül süsd-főzd tovább, közben óvatosan fordítsd át néhányszor. A szalonnapörccel tálald.',
  ]),
  makeMain(46, 'Tojásos nokedli fejes salátával', 'Klasszikus tavaszi fogás', [
    ['finomliszt', 400, 'g'], ['tojás', 8, 'db'], ['víz', 220, 'ml'], ['só', 1, 'tk'], ['olaj', 1, 'ek'], ['fejes saláta', 1, 'db'], ['ecet', 2, 'ek'], ['cukor', 1, 'ek'],
  ], [
    'A salátaléhez keverj össze 4 dl vizet, ecetet, cukrot és egy csipet sót. A megmosott salátaleveleket csak tálalás előtt tedd bele.',
    'Forralj nagy fazék sós vizet. A lisztet keverd össze 4 tojással, sóval és fokozatosan annyi vízzel, hogy lágy, ragacsos tésztát kapj.',
    'Nokedliszaggatóval szaggasd a tésztát a gyöngyöző vízbe. Amikor feljön a felszínre, főzd még 1 percig, majd szűrd le.',
    'Serpenyőben melegíts olajat, add hozzá a nokedlit. A maradék 4 tojást verd fel kevés sóval, és öntsd rá.',
    'Közepes lángon kevergesd 2–3 percig; akkor jó, amikor a tojás megszilárdult, de még szaftos. Salátával tálald.',
  ]),
  makeMain(47, 'Krumplis tészta', 'Olcsó, gyors hétköznapi étel', [
    ['kockatészta', 400, 'g'], ['burgonya', 700, 'g'], ['vöröshagyma', 1, 'db'], ['pirospaprika', 1, 'tk'], ['olaj', 2, 'ek'], ['só', 1, 'tk'], ['bors', 0.5, 'tk'],
  ], [
    'A burgonyát hámozd meg és vágd kis kockákra, a hagymát aprítsd fel.',
    'Párold a hagymát olajon 5 percig. Húzd le a tűzről, keverd bele a pirospaprikát, és rögtön önts hozzá fél deci vizet.',
    'Add hozzá a burgonyát és sót, önts rá annyi vizet, hogy éppen ellepje, majd főzd 15–20 percig puhára.',
    'Közben főzd ki a tésztát sós vízben a csomagolás szerint, majd szűrd le.',
    'A puha burgonyát törd össze kissé a levében, forgasd össze a tésztával, és frissen őrölt borssal tálald.',
  ]),
  makeMain(48, 'Káposztás kocka borsosan', 'Édeskés-sós magyar tésztaétel', [
    ['kockatészta', 400, 'g'], ['fejeskáposzta', 900, 'g'], ['cukor', 1, 'ek'], ['olaj', 3, 'ek'], ['só', 1, 'tk'], ['bors', 1, 'tk'],
  ], [
    'A káposztát reszeld le, keverd össze a sóval, és hagyd állni 15 percig, majd nyomkodd ki a levét.',
    'Melegíts olajat nagy serpenyőben, szórd bele a cukrot, és várd meg, amíg világosbarnára karamellizálódik.',
    'Add hozzá a káposztát óvatosan, mert gőz csap fel. Közepes lángon, gyakran keverve pirítsd 25–30 percig barnára.',
    'Főzd ki a tésztát sós vízben a csomagolás szerint, majd alaposan szűrd le.',
    'Forgasd össze a pirított káposztával, borsozd meg, és kóstolás után sózd, ha szükséges.',
  ]),
  makeMain(49, 'Juhtúrós sztrapacska', 'Szalonnás felvidéki kedvenc', [
    ['burgonya', 700, 'g'], ['finomliszt', 300, 'g'], ['tojás', 1, 'db'], ['juhtúró', 250, 'g'], ['tejföl', 150, 'ml'], ['füstölt szalonna', 180, 'g'], ['só', 1, 'tk'],
  ], [
    'A szalonnát kockázd fel, süsd ropogósra, majd a pörcöt szedd ki, a zsírját hagyd a serpenyőben.',
    'A nyers burgonyát hámozd meg és reszeld finomra. Keverd össze tojással, sóval és fokozatosan a liszttel.',
    'Forralj sós vizet, és nokedliszaggatóval szaggasd bele a tésztát. Amikor feljön, főzd még 2 percig.',
    'Szűrd le, majd még forrón forgasd össze a juhtúróval, tejföllel és 2 evőkanál szalonnazsírral.',
    'A ropogós szalonnapörccel megszórva, azonnal tálald.',
  ]),
  makeMain(50, 'Dödölle', 'Zalai burgonyás étel pirított hagymával', [
    ['burgonya', 900, 'g'], ['finomliszt', 250, 'g'], ['vöröshagyma', 3, 'db'], ['olaj', 4, 'ek'], ['tejföl', 200, 'ml'], ['só', 1, 'tk'],
  ], [
    'A burgonyát hámozd meg, kockázd fel, és sós vízben főzd puhára úgy, hogy a víz éppen ellepje.',
    'Ne öntsd le a főzővizet. Törd össze benne a burgonyát, majd kis lángon fokozatosan dolgozd bele a lisztet.',
    'Erős fakanállal keverd 5–8 percig, amíg nagyon sűrű, az edény falától elváló massza lesz.',
    'A hagymát vágd félkarikára és olajon pirítsd aranybarnára. Olajos kanállal szaggass dödölléket a serpenyőbe.',
    'Pirítsd körbe a darabokat 8–10 perc alatt, majd tejföllel és a hagymával tálald.',
  ]),
  makeMain(51, 'Krumplifőzelék fasírttal', 'Babérleveles főzelék klasszikus feltéttel', [
    ['burgonya', 900, 'g'], ['tejföl', 200, 'ml'], ['liszt', 2, 'ek'], ['babérlevél', 2, 'db'], ['darált sertéshús', 500, 'g'], ['zsemle', 1, 'db'], ['tojás', 1, 'db'], ['vöröshagyma', 1, 'db'], ['olaj', 250, 'ml'], ['só', 1, 'tk'],
  ], [
    'A burgonyát karikázd fel, tedd fazékba babérlevéllel és sóval, majd önts rá annyi vizet, hogy éppen ellepje. Főzd 15 percig.',
    'A fasírthoz áztasd be a zsemlét vízbe, nyomkodd ki, és keverd a húshoz tojással, fél aprított hagymával és sóval.',
    'Nedves kézzel formázz lapos pogácsákat, és közepesen forró olajban süsd oldalanként 5–6 percig.',
    'A tejfölt keverd simára a liszttel és egy merőkanál főzőlével, majd lassan öntsd a puha burgonyához.',
    'Kevergetve forrald 3 percig. Ha túl sűrű, adj hozzá kevés vizet, majd a fasírttal tálald.',
  ]),
  makeMain(52, 'Babfőzelék füstölt kolbásszal', 'Tartalmas, tejfölös főzelék', [
    ['szárazbab', 500, 'g'], ['füstölt kolbász', 300, 'g'], ['tejföl', 200, 'ml'], ['liszt', 2, 'ek'], ['fokhagyma', 2, 'gerezd'], ['babérlevél', 2, 'db'], ['pirospaprika', 1, 'tk'], ['só', 1, 'tk'],
  ], [
    'A babot előző este áztasd be bő hideg vízbe. Másnap öntsd le róla az áztatóvizet és öblítsd át.',
    'Tedd fazékba friss vízzel, babérlevéllel és fokhagymával, majd kis lángon főzd 60–80 percig puhára.',
    'Az utolsó 15 percben add hozzá a karikára vágott kolbászt. Csak ezután sózd, mert a kolbász is sós.',
    'A tejfölt keverd simára liszttel, pirospaprikával és egy merőkanál főzőlével.',
    'Öntsd a babhoz, kevergetve forrald 3–4 percig. A végén kóstold meg és állítsd be a sót.',
  ]),
  makeMain(53, 'Spenótfőzelék tükörtojással', 'Gyors, húsmentes ebéd', [
    ['fagyasztott spenót', 700, 'g'], ['tej', 500, 'ml'], ['zsemle', 2, 'db'], ['fokhagyma', 3, 'gerezd'], ['liszt', 2, 'ek'], ['olaj', 2, 'ek'], ['tojás', 4, 'db'], ['só', 1, 'tk'],
  ], [
    'A zsemlét tépd darabokra, áztasd a tej felébe 10 percre, majd villával nyomkodd szét.',
    'Melegíts olajat, add hozzá a lisztet, és kis lángon keverd 1 percig. Add hozzá a zúzott fokhagymát még 20 másodpercre.',
    'Fokozatosan öntsd hozzá a maradék tejet, közben habverővel keverd csomómentesre.',
    'Add hozzá a spenótot és az áztatott zsemlét. Kis lángon, gyakran keverve főzd 8–10 percig, majd sózd.',
    'Kevés olajon süss négy tükörtojást addig, amíg a fehérje megszilárdul, majd tedd a főzelék tetejére.',
  ]),
  makeMain(54, 'Sóskafőzelék főtt tojással', 'Édeskés-savanykás, húsmentes étel', [
    ['sóska', 700, 'g'], ['tej', 400, 'ml'], ['tejföl', 150, 'ml'], ['liszt', 2, 'ek'], ['cukor', 2, 'ek'], ['olaj', 2, 'ek'], ['tojás', 4, 'db'], ['só', 0.5, 'tk'],
  ], [
    'A tojásokat tedd hideg vízbe, forrástól számítva főzd 10 percig, majd hideg vízben hűtsd le és hámozd meg.',
    'A sóskát mosd meg, a vastag szárakat csípd le. Melegíts olajat, add hozzá a leveleket, és fonnyaszd 4–5 percig.',
    'Szórd rá a lisztet, keverd el, majd fokozatosan öntsd hozzá a tejet, hogy ne legyen csomós.',
    'Kis lángon főzd 5 percig, majd botmixerrel turmixold simára. A mixer fejét tartsd a folyadék alatt.',
    'Keverd hozzá a tejfölt, cukrot és sót, melegítsd át, majd félbevágott főtt tojással tálald.',
  ]),
  makeMain(55, 'Karalábéfőzelék húsgombóccal', 'Kapros, könnyű tavaszi fogás', [
    ['karalábé', 900, 'g'], ['darált sertéshús', 500, 'g'], ['tojás', 1, 'db'], ['rizs', 80, 'g'], ['tejföl', 200, 'ml'], ['liszt', 2, 'ek'], ['kapor', 0.5, 'csokor'], ['só', 1, 'tk'],
  ], [
    'A karalábét hámozd meg és vágd 1 cm-es kockákra. Tedd fazékba, önts rá annyi vizet, hogy ellepje, és sózd meg.',
    'A húst keverd össze tojással, megmosott rizzsel és fél teáskanál sóval, majd nedves kézzel formázz kis gombócokat.',
    'Tedd a gombócokat a karalábéhoz, és kis lángon, fedő alatt főzd 25 percig. Ne keverd erősen, nehogy szétesjenek.',
    'A tejfölt keverd simára liszttel és egy merőkanál főzőlével, majd öntsd vissza a fazékba.',
    'Óvatosan keverve forrald 3 percig, végül add hozzá az aprított kaprot.',
  ]),
  makeMain(56, 'Kelkáposzta-főzelék fasírttal', 'Köményes, fokhagymás klasszikus', [
    ['kelkáposzta', 800, 'g'], ['burgonya', 500, 'g'], ['fokhagyma', 3, 'gerezd'], ['liszt', 2, 'ek'], ['kömény', 1, 'tk'], ['darált sertéshús', 500, 'g'], ['zsemle', 1, 'db'], ['tojás', 1, 'db'], ['olaj', 250, 'ml'], ['só', 1, 'tk'],
  ], [
    'A káposztát csíkozd, a burgonyát kockázd fel. Tedd fazékba köménnyel, sóval és annyi vízzel, hogy majdnem ellepje.',
    'Főzd kis lángon 20 percig, amíg a burgonya puha, de nem esik szét.',
    'A fasírthoz keverd össze a húst a beáztatott, kinyomkodott zsemlével, tojással és sóval. Formázz pogácsákat.',
    'Közepesen forró olajban süsd a fasírtokat oldalanként 5–6 percig, majd papírtörlőn csepegtesd le.',
    'Kevés olajból és lisztből készíts világos rántást, add hozzá a fokhagymát, majd keverd a főzelékhez és forrald 3 percig.',
  ]),
  makeMain(57, 'Rántott karfiol petrezselymes krumplival', 'Húsmentes, ropogós fogás', [
    ['karfiol', 900, 'g'], ['finomliszt', 150, 'g'], ['tojás', 3, 'db'], ['zsemlemorzsa', 250, 'g'], ['olaj', 500, 'ml'], ['burgonya', 800, 'g'], ['petrezselyemzöld', 1, 'csokor'], ['só', 1, 'tk'],
  ], [
    'A karfiolt szedd közepes rózsákra, és sós, gyöngyöző vízben főzd 5 percig. Szűrd le és hagyd teljesen kihűlni.',
    'Készíts elő három tálat: lisztet, felvert tojást és zsemlemorzsát. A száraz karfiolt ebben a sorrendben forgasd meg.',
    'Közepesen forró olajban süsd több adagban 4–5 percig, amíg aranybarna. Ne zsúfold tele a lábast.',
    'A burgonyát kockázd és sós vízben főzd puhára 15–18 perc alatt, majd szűrd le.',
    'Forgasd össze aprított petrezselyemmel, és a lecsöpögtetett rántott karfiollal tálald.',
  ]),
  makeMain(58, 'Töltött csirke', 'Petrezselymes-zsemlés töltelékkel', [
    ['egész csirke', 1600, 'g'], ['zsemle', 3, 'db'], ['tojás', 2, 'db'], ['csirkemáj', 200, 'g'], ['vöröshagyma', 1, 'db'], ['petrezselyemzöld', 1, 'csokor'], ['vaj', 50, 'g'], ['só', 1.5, 'tk'], ['bors', 0.5, 'tk'],
  ], [
    'Melegítsd elő a sütőt 180 °C-ra. A csirkét papírtörlővel szárítsd meg, kívül-belül sózd és borsozd.',
    'A zsemlét áztasd vízbe, majd nyomkodd ki. A hagymát és májat aprítsd fel, vajon pirítsd 5 percig, majd hűtsd langyosra.',
    'Keverd össze a zsemlét, májat, tojást és petrezselymet. A töltelék ne legyen folyós.',
    'Töltsd lazán a csirke hasüregébe; ne nyomd tele, mert sütés közben dagad. A nyílást fogpiszkálóval zárd le.',
    'Süsd 80–90 percig, félidőben locsold meg a levével. Akkor kész, ha a combnál megszúrva tiszta lé folyik ki.',
  ]),
  makeMain(59, 'Kacsacomb párolt lilakáposztával', 'Ünnepi magyar főétel', [
    ['kacsacomb', 4, 'db'], ['lilakáposzta', 900, 'g'], ['vöröshagyma', 1, 'db'], ['alma', 1, 'db'], ['cukor', 1, 'ek'], ['ecet', 2, 'ek'], ['kömény', 1, 'tk'], ['só', 1, 'tk'],
  ], [
    'A kacsacomb bőrét néhány helyen szúrd meg, de a húsba ne vágj bele. Mindkét oldalát sózd meg.',
    'Tedd bőrrel felfelé tepsibe, önts alá 1 dl vizet, fedd le, és 170 °C-on süsd 75 percig.',
    'A káposztát csíkozd, a hagymát szeleteld. Kevés kisült kacsazsíron párold a hagymát, majd add hozzá a cukrot és köményt.',
    'Add hozzá a káposztát és reszelt almát, sózd, önts rá ecetet, és fedő alatt párold 35–40 percig.',
    'Vedd le a fóliát a combról, emeld a sütőt 210 °C-ra, és pirítsd 15–20 percig ropogósra. Káposztával tálald.',
  ]),
  makeMain(60, 'Harcsapaprikás túrós csuszával', 'Paprikás hal klasszikus körettel', [
    ['harcsafilé', 700, 'g'], ['vöröshagyma', 1, 'db'], ['tejföl', 250, 'ml'], ['pirospaprika', 1, 'tk'], ['csuszatészta', 400, 'g'], ['túró', 250, 'g'], ['füstölt szalonna', 150, 'g'], ['olaj', 1, 'ek'], ['só', 1, 'tk'],
  ], [
    'A halat vágd 3 cm-es kockákra és enyhén sózd. A hagymát aprítsd, a szalonnát kockázd fel.',
    'Párold a hagymát olajon 5 percig, húzd le a tűzről, keverd bele a pirospaprikát, majd azonnal adj hozzá 1 dl vizet.',
    'Tedd bele a halat, és kis lángon főzd 8–10 percig. Csak rázd meg az edényt, ne keverd, mert a hal szétesik.',
    'A tejfölt keverd simára kevés forró szafttal, majd add a halhoz, és melegítsd 2 percig erős forralás nélkül.',
    'Főzd ki a tésztát, forgasd össze túróval és kisütött szalonnával, majd tálald a paprikás mellé.',
  ]),
  makeMain(61, 'Rácponty', 'Paprikás-tejfölös hal burgonyával', [
    ['pontyfilé', 800, 'g'], ['burgonya', 800, 'g'], ['zöldpaprika', 2, 'db'], ['paradicsom', 3, 'db'], ['vöröshagyma', 2, 'db'], ['tejföl', 250, 'ml'], ['pirospaprika', 1, 'tk'], ['só', 1, 'tk'],
  ], [
    'A burgonyát karikázd fel, és sós vízben főzd 8 percig, majd szűrd le. A halat ellenőrizd szálkákra és sózd meg.',
    'A hagymát, paprikát és paradicsomot szeleteld fel. Egy sütőtál aljára terítsd a burgonya felét.',
    'Tedd rá a zöldségek felét és a halat, majd fedd be a maradék zöldséggel és burgonyával.',
    'A tejfölt keverd össze a pirospaprikával és 2 evőkanál vízzel, majd kend a tetejére.',
    '180 °C-on süsd 35–40 percig. Akkor kész, ha a hal könnyen lemezekre válik, a burgonya pedig puha.',
  ]),
  makeMain(62, 'Lecsós sertésszelet', 'Szaftos hús paprikával és paradicsommal', [
    ['sertéskaraj', 600, 'g'], ['zöldpaprika', 4, 'db'], ['paradicsom', 4, 'db'], ['vöröshagyma', 2, 'db'], ['füstölt szalonna', 120, 'g'], ['pirospaprika', 1, 'tk'], ['olaj', 1, 'ek'], ['só', 1, 'tk'],
  ], [
    'A húst vágd négy szeletre, enyhén klopfold ki és sózd meg. A szalonnát kockázd, a zöldségeket szeleteld fel.',
    'Süsd ki a szalonnát, majd a húsokat a zsírjában oldalanként 3 percig pirítsd. Tedd őket félre.',
    'A hagymát párold meg ugyanabban a serpenyőben. Húzd le a tűzről, keverd bele a pirospaprikát, majd add hozzá a paprikát és paradicsomot.',
    'Tedd vissza a hússzeleteket, önts alá 1 dl vizet, és fedő alatt, kis lángon párold 30 percig.',
    'Akkor kész, ha a hús könnyen átszúrható. Főtt rizzsel vagy tarhonyával tálald.',
  ]),
  makeMain(63, 'Hentes tokány', 'Savanyú uborkás sertésragu', [
    ['sertéscomb', 700, 'g'], ['füstölt sonka', 150, 'g'], ['savanyú uborka', 200, 'g'], ['vöröshagyma', 1, 'db'], ['paradicsompüré', 1, 'ek'], ['mustár', 1, 'ek'], ['olaj', 2, 'ek'], ['só', 1, 'tk'], ['bors', 1, 'tk'],
  ], [
    'A húst, sonkát és uborkát vágd vékony csíkokra, a hagymát aprítsd fel.',
    'Párold a hagymát olajon 5 percig, add hozzá a húst, és erősebb lángon pirítsd 6–8 percig.',
    'Sózd, borsozd, keverd hozzá a paradicsompürét, majd önts alá 2 dl vizet.',
    'Fedő alatt, kis lángon párold 35–40 percig. Ha a hús még kemény, adj hozzá kevés vizet és főzd tovább.',
    'Add hozzá a sonkát, uborkát és mustárt, majd főzd fedő nélkül még 5 percig. Rizzsel tálald.',
  ]),
  makeMain(64, 'Resztelt csirkemáj', 'Hagymás máj főtt burgonyával', [
    ['csirkemáj', 700, 'g'], ['vöröshagyma', 3, 'db'], ['majoránna', 1, 'tk'], ['pirospaprika', 1, 'tk'], ['olaj', 3, 'ek'], ['bors', 0.5, 'tk'], ['só', 1, 'tk'], ['burgonya', 800, 'g'],
  ], [
    'A májat tisztítsd meg az erektől, vágd félbe, és papírtörlővel szárítsd meg. A hagymát szeleteld vékonyra.',
    'Az olajon közepes lángon párold a hagymát 10 percig, amíg puha és világosbarna.',
    'Húzd le a serpenyőt a tűzről, keverd bele a pirospaprikát, majd rögtön add hozzá a májat.',
    'Tedd vissza erős lángra, szórd meg majoránnával és borssal, és süsd 8–10 percig. Belül se maradjon véres.',
    'Csak a végén sózd, így kevésbé keményedik meg. Főtt burgonyával tálald.',
  ]),
  makeMain(65, 'Pacalpörkölt', 'Hosszú főzésű magyar klasszikus', [
    ['előfőzött pacal', 1000, 'g'], ['vöröshagyma', 3, 'db'], ['fokhagyma', 4, 'gerezd'], ['pirospaprika', 2, 'tk'], ['kömény', 1, 'tk'], ['zöldpaprika', 1, 'db'], ['paradicsom', 1, 'db'], ['sertészsír', 2, 'ek'], ['só', 1.5, 'tk'],
  ], [
    'Az előfőzött pacalt öblítsd át és vágd ujjnyi csíkokra. A hagymát és fokhagymát aprítsd fel.',
    'A zsíron kis lángon párold a hagymát 8 percig. Húzd le a tűzről, keverd bele a pirospaprikát, majd önts hozzá 1 dl vizet.',
    'Add hozzá a pacalt, fokhagymát, köményt, paprikát, paradicsomot és sót.',
    'Önts rá annyi vizet, hogy majdnem ellepje, és fedő alatt, kis lángon főzd 2–2,5 órán át. Félóránként ellenőrizd.',
    'Akkor kész, ha a pacal puha, a szaft sűrű. Főtt burgonyával és savanyúsággal tálald.',
  ]),
  makeMain(66, 'Körömpörkölt', 'Sűrű szaftú, hagyományos étel', [
    ['sertésköröm', 1600, 'g'], ['vöröshagyma', 3, 'db'], ['fokhagyma', 4, 'gerezd'], ['pirospaprika', 2, 'tk'], ['zöldpaprika', 1, 'db'], ['paradicsom', 1, 'db'], ['sertészsír', 2, 'ek'], ['só', 1.5, 'tk'], ['kömény', 1, 'tk'],
  ], [
    'A hentessel daraboltasd fel a megtisztított körmöt. Otthon alaposan mosd meg hideg vízben.',
    'A zsíron párold az aprított hagymát 8 percig. Húzd le a tűzről, keverd bele a pirospaprikát, és rögtön önts hozzá 1 dl vizet.',
    'Tedd bele a körmöt, fokhagymát, köményt, paprikát, paradicsomot és sót, majd önts rá annyi vizet, hogy félig ellepje.',
    'Fedő alatt, nagyon kis lángon főzd 3–3,5 órát. Időnként fordítsd át, és csak kevés vizet pótolj.',
    'Akkor jó, ha a hús leválik a csontról és a szaft ragacsosan sűrű. Főtt burgonyával tálald.',
  ]),
  makeMain(67, 'Kakaspörkölt nokedlivel', 'Lassan főtt ünnepi pörkölt', [
    ['darabolt kakas', 1400, 'g'], ['vöröshagyma', 3, 'db'], ['pirospaprika', 2, 'tk'], ['zöldpaprika', 1, 'db'], ['paradicsom', 1, 'db'], ['sertészsír', 2, 'ek'], ['finomliszt', 400, 'g'], ['tojás', 2, 'db'], ['só', 1.5, 'tk'],
  ], [
    'A húsdarabokat mosd meg és szárítsd le. A hagymát aprítsd, a paprikát és paradicsomot vágd fel.',
    'A zsíron párold a hagymát, húzd le a tűzről, keverd bele a pirospaprikát, majd azonnal önts hozzá kevés vizet.',
    'Add hozzá a húst és zöldségeket, sózd, majd fedő alatt, kis lángon főzd 2–2,5 órán át. Csak kevés vizet pótolj.',
    'A nokedlihez keverd össze a lisztet, tojást, sót és kb. 2,5 dl vizet, majd szaggasd gyöngyöző sós vízbe.',
    'Amikor a nokedli feljön, főzd még 1 percig és szűrd le. A puha kakaspörkölttel tálald.',
  ]),
  makeMain(68, 'Dubarry csirkemell', 'Karfiolos, sajtos sült csirke', [
    ['csirkemell', 700, 'g'], ['karfiol', 700, 'g'], ['tej', 500, 'ml'], ['vaj', 50, 'g'], ['liszt', 3, 'ek'], ['reszelt sajt', 180, 'g'], ['olaj', 1, 'ek'], ['só', 1, 'tk'], ['bors', 0.5, 'tk'],
  ], [
    'A karfiolt szedd rózsákra és sós vízben főzd 5 percig, majd szűrd le. A csirkét szeleteld, sózd és borsozd.',
    'Forró olajon süsd a csirkeszeleteket oldalanként 3 percig, majd fektesd őket egy sütőtálba.',
    'Olvaszd meg a vajat, keverd bele a lisztet 1 percre, majd fokozatosan öntsd hozzá a tejet és keverd simára.',
    'Tedd a karfiolt a húsra, öntsd rá a sűrű mártást, és szórd meg reszelt sajttal.',
    '200 °C-on süsd 20–25 percig, amíg a sajt aranybarna és a csirke közepe teljesen fehér.',
  ]),
  makeMain(69, 'Temesvári sertésszelet', 'Zöldbabos, tejfölös sertésragu', [
    ['sertéskaraj', 700, 'g'], ['zöldbab', 500, 'g'], ['vöröshagyma', 1, 'db'], ['tejföl', 200, 'ml'], ['liszt', 1, 'ek'], ['pirospaprika', 1, 'tk'], ['olaj', 2, 'ek'], ['só', 1, 'tk'],
  ], [
    'A karajt vágd négy szeletre, enyhén klopfold ki és sózd. A hagymát aprítsd, a zöldbabot darabold fel.',
    'Forró olajon pirítsd a hússzeleteket oldalanként 3 percig, majd tedd félre.',
    'Ugyanabban az edényben párold a hagymát. Húzd le a tűzről, keverd bele a pirospaprikát, és adj hozzá 1 dl vizet.',
    'Tedd vissza a húst, add hozzá a zöldbabot, és fedő alatt, kis lángon főzd 25–30 percig.',
    'A tejfölt keverd simára a liszttel és kevés szafttal, öntsd az ételhez, majd forrald 3 percig. Nokedlivel tálald.',
  ]),
  makeMain(70, 'Libacomb párolt káposztával', 'Ünnepi, ropogósra sült fogás', [
    ['libacomb', 4, 'db'], ['lilakáposzta', 900, 'g'], ['alma', 1, 'db'], ['vöröshagyma', 1, 'db'], ['cukor', 1, 'ek'], ['ecet', 2, 'ek'], ['kömény', 1, 'tk'], ['só', 1, 'tk'],
  ], [
    'A libacombokat papírtörlővel szárítsd meg, a bőrt néhány helyen szúrd meg, majd mindkét oldalt sózd.',
    'Tedd bőrrel felfelé tepsibe, önts alá 1 dl vizet, fedd le, és 160 °C-on süsd 2 órán át.',
    'A káposztát csíkozd, a hagymát szeleteld. Kevés kisült libazsíron párold meg a hagymát, add hozzá a cukrot és köményt.',
    'Tedd bele a káposztát és reszelt almát, sózd, öntsd rá az ecetet, és fedő alatt párold 35–40 percig.',
    'Vedd le a fóliát, emeld a sütőt 210 °C-ra, és pirítsd a combokat 15–20 percig ropogósra. A káposztával tálald.',
  ]),
];
