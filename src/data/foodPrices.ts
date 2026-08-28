export interface FoodPriceRule {
  id: string;
  label: string;
  patterns: string[];
  price: number;
  quantity: number;
  unit: 'g' | 'ml' | 'db';
  source: 'statcan' | 'estimate';
}

export const FOOD_PRICE_PERIOD = '2026. június';
export const FOOD_PRICE_REGION = 'kanadai átlagáras tervezés (Ontario alapbeállítás)';
export const STATCAN_TABLE = '18-10-0245-01';

// The StatCan rows below use the latest values shown in the Food Price Data Hub.
// Extra rules fill gaps in the official basket so every Plan & Pan recipe can be estimated.
export const FOOD_PRICE_RULES: FoodPriceRule[] = [
  { id: 'milk', label: 'Tej', patterns: ['tej'], price: 5.50, quantity: 2000, unit: 'ml', source: 'statcan' },
  { id: 'bread', label: 'Fehér kenyér', patterns: ['kenyér', 'zsemle', 'kifli'], price: 3.61, quantity: 675, unit: 'g', source: 'statcan' },
  { id: 'rice', label: 'Rizs', patterns: ['rizs'], price: 9.46, quantity: 2000, unit: 'g', source: 'statcan' },
  { id: 'butter', label: 'Vaj', patterns: ['vaj'], price: 5.94, quantity: 454, unit: 'g', source: 'statcan' },
  { id: 'ground-beef', label: 'Darált marhahús', patterns: ['darált marha'], price: 16.61, quantity: 1000, unit: 'g', source: 'statcan' },
  { id: 'chicken-breast', label: 'Csirkemell', patterns: ['csirkemell'], price: 14.63, quantity: 1000, unit: 'g', source: 'statcan' },
  { id: 'eggs', label: 'Tojás', patterns: ['tojás'], price: 4.88, quantity: 12, unit: 'db', source: 'statcan' },
  { id: 'apple', label: 'Alma', patterns: ['alma'], price: 6.33, quantity: 1000, unit: 'g', source: 'statcan' },
  { id: 'banana', label: 'Banán', patterns: ['banán'], price: 1.87, quantity: 1000, unit: 'g', source: 'statcan' },
  { id: 'potato', label: 'Burgonya', patterns: ['burgonya', 'krumpli'], price: 5.18, quantity: 1000, unit: 'g', source: 'statcan' },
  { id: 'tomato', label: 'Paradicsom', patterns: ['paradicsom'], price: 5.03, quantity: 1000, unit: 'g', source: 'statcan' },
  { id: 'oil', label: 'Étolaj', patterns: ['olaj'], price: 10.12, quantity: 3000, unit: 'ml', source: 'statcan' },

  { id: 'pork', label: 'Sertéshús', patterns: ['sertés', 'karaj', 'tarja', 'sonka', 'kolbász', 'szalonna'], price: 13.50, quantity: 1000, unit: 'g', source: 'estimate' },
  { id: 'beef', label: 'Marhahús', patterns: ['marha'], price: 19.00, quantity: 1000, unit: 'g', source: 'estimate' },
  { id: 'chicken', label: 'Csirkehús', patterns: ['csirke'], price: 10.50, quantity: 1000, unit: 'g', source: 'estimate' },
  { id: 'fish', label: 'Hal', patterns: ['hal', 'tonhal', 'lazac'], price: 18.00, quantity: 1000, unit: 'g', source: 'estimate' },
  { id: 'cheese', label: 'Sajt', patterns: ['sajt', 'mozzarella', 'feta', 'parmezán'], price: 18.00, quantity: 1000, unit: 'g', source: 'estimate' },
  { id: 'dairy', label: 'Tejtermék', patterns: ['tejföl', 'tejszín', 'joghurt', 'túró'], price: 7.00, quantity: 1000, unit: 'g', source: 'estimate' },
  { id: 'flour', label: 'Liszt', patterns: ['liszt'], price: 2.30, quantity: 1000, unit: 'g', source: 'estimate' },
  { id: 'pasta', label: 'Tészta', patterns: ['tészta', 'spagetti', 'tarhonya'], price: 4.00, quantity: 1000, unit: 'g', source: 'estimate' },
  { id: 'vegetables', label: 'Zöldség', patterns: ['paprika', 'uborka', 'hagyma', 'répa', 'káposzta', 'saláta', 'gomba', 'brokkoli', 'karfiol', 'zeller', 'retek', 'cukkini', 'borsó', 'bab', 'kukorica'], price: 5.50, quantity: 1000, unit: 'g', source: 'estimate' },
  { id: 'fruit', label: 'Gyümölcs', patterns: ['citrom', 'narancs', 'meggy', 'szilva', 'barack', 'eper', 'málna', 'körte', 'avokádó'], price: 6.50, quantity: 1000, unit: 'g', source: 'estimate' },
  { id: 'pantry', label: 'Szárazáru', patterns: ['cukor', 'morzsa', 'zab', 'dió', 'mák', 'kakaó', 'csokoládé', 'keksz', 'kuszkusz'], price: 7.00, quantity: 1000, unit: 'g', source: 'estimate' },
];
