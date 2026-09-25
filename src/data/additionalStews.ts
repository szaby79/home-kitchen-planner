import { Ingredient, Recipe } from '@/types/recipe';

type IngredientRow = [string, number, string];

type Stew = {
  id: number;
  name: string;
  base: string;
  topping: string;
  cook: string;
  toppingStep: string;
  ingredients: IngredientRow[];
};

const stews: Stew[] = [
  { id: 71, name: 'Sárgaborsófőzelék sült virslivel', base: 'sárgaborsót', topping: 'sült virslivel', cook: '45–55 percig', toppingStep: 'A virsliket kevés olajon süsd körbe 6–8 perc alatt.', ingredients: [['sárgaborsó',500,'g'],['virsli',8,'db'],['vöröshagyma',1,'db'],['fokhagyma',2,'gerezd'],['babérlevél',2,'db'],['liszt',2,'ek'],['olaj',2,'ek'],['só',1,'tk']] },
  { id: 72, name: 'Paradicsomos káposztafőzelék sült oldalassal', base: 'felcsíkozott káposztát és a paradicsomszószt', topping: 'sült oldalassal', cook: '25 percig', toppingStep: 'Az oldalast 190 °C-on lefedve süsd 50 percig, majd fedő nélkül pirítsd még 20 percig.', ingredients: [['fejeskáposzta',1000,'g'],['paradicsom szósz',500,'ml'],['sertés oldalas',800,'g'],['vöröshagyma',1,'db'],['liszt',2,'ek'],['cukor',1,'ek'],['olaj',2,'ek'],['só',1,'tk']] },
  { id: 73, name: 'Fehérbabfőzelék tükörtojással', base: 'egy éjszakára beáztatott fehérbabot', topping: 'tükörtojással', cook: '60–80 percig', toppingStep: 'Kevés olajon süss négy tükörtojást, amíg a fehérje megszilárdul.', ingredients: [['fehérbab',300,'g'],['tojás',4,'db'],['tejföl',200,'ml'],['liszt',2,'ek'],['fokhagyma',2,'gerezd'],['babérlevél',2,'db'],['olaj',2,'ek'],['só',1,'tk']] },
  { id: 74, name: 'Cukkinifőzelék húspogácsával', base: 'lereszelt cukkinit', topping: 'húspogácsával', cook: '8–10 percig', toppingStep: 'A húst keverd össze tojással és morzsával, formázz pogácsákat, majd süsd teljesen át.', ingredients: [['cukkini',1000,'g'],['darált hús',500,'g'],['tojás',1,'db'],['zsemlemorzsa',80,'g'],['tejföl',200,'ml'],['liszt',2,'ek'],['kapor',0.5,'csokor'],['só',1,'tk'],['olaj',2,'ek']] },
  { id: 75, name: 'Karfiolfőzelék sült csirkecombbal', base: 'rózsákra szedett karfiolt', topping: 'sült csirkecombbal', cook: '10–12 percig', toppingStep: 'A sózott, paprikázott csirkecombokat 190 °C-on süsd 45–55 percig, amíg átsülnek.', ingredients: [['karfiol',1000,'g'],['csirkecomb',4,'db'],['tejföl',200,'ml'],['liszt',2,'ek'],['petrezselyemzöld',1,'csokor'],['pirospaprika',1,'tk'],['olaj',2,'ek'],['só',1,'tk']] },
  { id: 76, name: 'Brokkolifőzelék sajtos húspogácsával', base: 'rózsákra szedett brokkolit', topping: 'sajtos húspogácsával', cook: '8–10 percig', toppingStep: 'A húst keverd össze tojással, sajttal és morzsával, formázz pogácsákat, majd süsd teljesen át.', ingredients: [['brokkoli',1000,'g'],['darált sertéshús',500,'g'],['reszelt sajt',120,'g'],['tojás',1,'db'],['zsemlemorzsa',80,'g'],['tej',400,'ml'],['liszt',2,'ek'],['fokhagyma',2,'gerezd'],['só',1,'tk']] },
  { id: 77, name: 'Sárgarépafőzelék sült csirkemellel', base: 'felkarikázott sárgarépát', topping: 'sült csirkemellel', cook: '15–18 percig', toppingStep: 'A sózott csirkeszeleteket kevés olajon süsd oldalanként 5–6 percig, amíg átsülnek.', ingredients: [['sárgarépa',1000,'g'],['csirkemell',600,'g'],['tejföl',150,'ml'],['liszt',2,'ek'],['petrezselyemzöld',1,'csokor'],['cukor',1,'tk'],['olaj',2,'ek'],['só',1,'tk']] },
  { id: 78, name: 'Zellerfőzelék sertéspörkölttel', base: 'felkockázott zellert', topping: 'sertéspörkölttel', cook: '15–20 percig', toppingStep: 'A hagyma felén készíts paprikás alapot, add hozzá a felkockázott húst, és főzd puhára 45 perc alatt.', ingredients: [['zeller',1000,'g'],['sertéscomb',600,'g'],['vöröshagyma',2,'db'],['tejföl',150,'ml'],['liszt',2,'ek'],['pirospaprika',1,'tk'],['olaj',2,'ek'],['só',1,'tk']] },
  { id: 79, name: 'Kukoricafőzelék ropogós szalonnával', base: 'kukoricát és az aprított hagymát', topping: 'ropogós szalonnával', cook: '8 percig', toppingStep: 'A felkockázott szalonnát süsd ropogósra, majd papírtörlőn csepegtesd le.', ingredients: [['csemegekukorica',1000,'g'],['füstölt szalonna',250,'g'],['tej',400,'ml'],['liszt',2,'ek'],['vöröshagyma',1,'db'],['petrezselyemzöld',1,'csokor'],['vaj',30,'g'],['só',1,'tk']] },
  { id: 80, name: 'Csicseriborsó-főzelék sült kolbásszal', base: 'leöblített csicseriborsót', topping: 'sült kolbásszal', cook: '12–15 percig', toppingStep: 'A kolbászt karikázd fel, és száraz serpenyőben süsd mindkét oldalán barnára.', ingredients: [['csicseriborsó konzerv (lecsöpögtetve)',700,'g'],['füstölt kolbász',350,'g'],['tejföl',200,'ml'],['liszt',2,'ek'],['fokhagyma',2,'gerezd'],['babérlevél',2,'db'],['pirospaprika',1,'tk'],['olaj',2,'ek'],['só',1,'tk']] },
  { id: 81, name: 'Vöröslencse-főzelék főtt tojással', base: 'átmosott vöröslencsét', topping: 'főtt tojással', cook: '18–20 percig', toppingStep: 'A tojásokat forrástól számítva 10 percig főzd, hűtsd le, hámozd meg és vágd félbe.', ingredients: [['vöröslencse',350,'g'],['tojás',4,'db'],['vöröshagyma',1,'db'],['fokhagyma',2,'gerezd'],['paradicsompüré',2,'ek'],['babérlevél',1,'db'],['olaj',2,'ek'],['só',1,'tk']] },
  { id: 82, name: 'Káposztafőzelék fasírttal', base: 'felcsíkozott káposztát', topping: 'fasírttal', cook: '20 percig', toppingStep: 'A húst keverd a beáztatott zsemlével, tojással és hagymával, formázz fasírtokat, majd süsd át.', ingredients: [['fejeskáposzta',1000,'g'],['darált sertéshús',500,'g'],['tojás',1,'db'],['zsemle',1,'db'],['vöröshagyma',1,'db'],['liszt',2,'ek'],['kömény',1,'tk'],['só',1,'tk']] },
  { id: 83, name: 'Savanyúkáposzta-főzelék sült tarjával', base: 'szükség szerint átöblített savanyú káposztát', topping: 'sült tarjával', cook: '25 percig', toppingStep: 'A sózott tarjaszeleteket kevés olajon süsd oldalanként 5–6 percig, majd pihentesd.', ingredients: [['savanyú káposzta',1000,'g'],['sertéstarja',700,'g'],['tejföl',200,'ml'],['liszt',2,'ek'],['vöröshagyma',1,'db'],['pirospaprika',1,'tk'],['olaj',2,'ek'],['só',0.5,'tk']] },
  { id: 84, name: 'Zöldborsó-burgonyafőzelék vagdalttal', base: 'felkockázott burgonyát és zöldborsót', topping: 'vagdalttal', cook: '18 percig', toppingStep: 'A húst keverd tojással és morzsával, formázd cipóvá, és 180 °C-on süsd 40–45 percig.', ingredients: [['zöldborsó',600,'g'],['burgonya',500,'g'],['darált hús',600,'g'],['tojás',2,'db'],['zsemlemorzsa',100,'g'],['tej',300,'ml'],['liszt',2,'ek'],['só',1,'tk']] },
  { id: 85, name: 'Tarkababfőzelék füstölt hússal', base: 'egy éjszakára beáztatott tarkababot', topping: 'füstölt hússal', cook: '60–80 percig', toppingStep: 'A füstölt csülköt külön kezdd főzni 60 perccel korábban, majd a puha húst vágd darabokra.', ingredients: [['tarkabab',500,'g'],['füstölt csülök',700,'g'],['tejföl',200,'ml'],['liszt',2,'ek'],['fokhagyma',2,'gerezd'],['babérlevél',2,'db'],['pirospaprika',1,'tk'],['só',0.5,'tk']] },
  { id: 86, name: 'Karalábé-borsófőzelék sült csirkével', base: 'felkockázott karalábét és zöldborsót', topping: 'sült csirkével', cook: '18 percig', toppingStep: 'A sózott csirkeszeleteket kevés olajon süsd oldalanként 5–6 percig, amíg átsülnek.', ingredients: [['karalábé',700,'g'],['zöldborsó',400,'g'],['csirkemell',600,'g'],['tejföl',180,'ml'],['liszt',2,'ek'],['petrezselyemzöld',1,'csokor'],['olaj',2,'ek'],['só',1,'tk']] },
  { id: 87, name: 'Burgonyás tökfőzelék sült kolbásszal', base: 'felkockázott burgonyát és gyalult tököt', topping: 'sült kolbásszal', cook: '20 percig', toppingStep: 'A felkarikázott kolbászt száraz serpenyőben süsd mindkét oldalán barnára.', ingredients: [['tök',700,'g'],['burgonya',500,'g'],['füstölt kolbász',350,'g'],['tejföl',200,'ml'],['liszt',2,'ek'],['kapor',0.5,'csokor'],['ecet',1,'ek'],['só',1,'tk']] },
  { id: 88, name: 'Lencsés burgonyafőzelék sült tarjával', base: 'beáztatott lencsét és felkockázott burgonyát', topping: 'sült tarjával', cook: '35–40 percig', toppingStep: 'A sózott tarjaszeleteket serpenyőben süsd oldalanként 5–6 percig, majd pihentesd.', ingredients: [['lencse',350,'g'],['burgonya',600,'g'],['sertéstarja',700,'g'],['tejföl',180,'ml'],['liszt',2,'ek'],['babérlevél',2,'db'],['mustár',1,'ek'],['só',1,'tk']] },
  { id: 89, name: 'Zöldbab-burgonyafőzelék főtt tojással', base: 'feldarabolt zöldbabot és felkockázott burgonyát', topping: 'főtt tojással', cook: '20–23 percig', toppingStep: 'A tojásokat forrástól számítva 10 percig főzd, hűtsd le, hámozd meg és vágd félbe.', ingredients: [['zöldbab',700,'g'],['burgonya',500,'g'],['tojás',4,'db'],['tejföl',200,'ml'],['liszt',2,'ek'],['fokhagyma',2,'gerezd'],['petrezselyemzöld',1,'csokor'],['só',1,'tk']] },
  { id: 90, name: 'Vegyes zöldségfőzelék húsgombóccal', base: 'felkockázott sárgarépát, karalábét és zöldborsót', topping: 'húsgombóccal', cook: '25 percig', toppingStep: 'A húst keverd tojással és rizzsel, nedves kézzel formázz gombócokat, és a zöldségekkel együtt főzd át.', ingredients: [['sárgarépa',400,'g'],['karalábé',400,'g'],['zöldborsó',300,'g'],['darált sertéshús',500,'g'],['tojás',1,'db'],['rizs',80,'g'],['tejföl',200,'ml'],['liszt',2,'ek']] },
];

const hungarianSteps = ({ base, topping, cook, toppingStep }: Stew) => [
  `Készítsd elő a hozzávalókat: a zöldségeket tisztítsd meg, mosd meg és darabold a receptnek megfelelően.`,
  `A ${base} tedd fazékba, önts rá annyi vizet, hogy éppen ellepje, enyhén sózd, és főzd ${cook}.`,
  'A tejfölt vagy tejet keverd csomómentesre a liszttel és egy merőkanál főzőlével, majd lassan keverd a főzelékhez.',
  toppingStep,
  `A főzeléket forrald még 3 percig, kóstold meg, állítsd be az ízét, majd ${topping} tálald.`,
];

const englishSteps = ({ topping, cook }: Stew) => [
  'Prepare, wash, and cut all vegetables as required by the recipe.',
  `Put the vegetables in a pot, barely cover with water, season lightly, and simmer for ${cook}.`,
  'Whisk the sour cream or milk with flour and a ladleful of cooking liquid, then slowly stir it into the stew.',
  'Prepare the named topping separately and make sure any meat or egg is fully cooked.',
  `Simmer the stew for 3 more minutes, adjust the seasoning, and serve with ${topping}.`,
];

export const additionalStews: Recipe[] = stews.map(stew => ({
  id: `main-${stew.id}`, name: stew.name, category: 'stew', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
  ingredients: stew.ingredients.map(([name, quantity, unit]): Ingredient => ({ name, quantity, unit })),
  description: hungarianSteps(stew).map((step, index) => `${index + 1}. ${step}`).join('\n\n'),
}));

export const additionalStewEnglishInstructions: Record<string, string> = Object.fromEntries(
  stews.map(stew => [`main-${stew.id}`, englishSteps(stew).map((step, index) => `${index + 1}. ${step}`).join('\n\n')]),
);
