import { Recipe } from '@/types/recipe';

const pickle = (id: number, name: string, ingredients: Recipe['ingredients'], description: string): Recipe => ({
  id: `pickle-${id}`, name, category: 'pickle', mealType: 'lunch', defaultServings: 4,
  note: 'Magyaros savanyúság', imageUrl: '', ingredients, description,
});

export const additionalPickles: Recipe[] = [
  pickle(1, 'Csemege uborka', [{ name: 'csemege uborka', quantity: 400, unit: 'g' }], `1. Válassz ropogós csemege uborkát.\n2. Felbontás előtt töröld tisztára az üveg tetejét.\n3. Tiszta villával vegyél ki személyenként 2–3 darabot.\n4. Hagyd fél percig lecsepegni, majd tedd külön tálkába.\n5. A maradékot zárd vissza, és felbontás után tartsd hűtőben.`),
  pickle(2, 'Vegyes darabos savanyúság', [{ name: 'vegyes darabos savanyúság', quantity: 500, unit: 'g' }], `1. Felbontás előtt rázd meg óvatosan az üveget.\n2. Tiszta villával emelj ki többféle zöldséget.\n3. Számolj személyenként körülbelül 100–120 grammal.\n4. Csepegtesd le, majd rendezd egy tálba.\n5. A maradékot mindig lével együtt, lezárva tartsd hűtőben.`),
  pickle(3, 'Csalamádé', [{ name: 'csalamádé', quantity: 500, unit: 'g' }], `1. Nyisd ki az üveget, és ellenőrizd, hogy friss, savanykás illata van-e.\n2. Tiszta villával szedj ki személyenként egy kisebb adagot.\n3. Csepegtesd le, de ne nyomkodd ki teljesen.\n4. Tálald külön tálkában a főétel mellé.\n5. A maradékot lezárva, a levében tartsd hűtőben.`),
  pickle(4, 'Ecetes almapaprika', [{ name: 'ecetes almapaprika', quantity: 400, unit: 'g' }], `1. Tiszta villával vedd ki az almapaprikákat az üvegből.\n2. Hagyd őket röviden lecsepegni.\n3. Ha nagyok, vágd félbe őket egy tányéron.\n4. Számolj személyenként 1–2 darabbal, és külön tálald.\n5. A maradékot tartsd a saját levében, hűtőben.`),
  pickle(5, 'Ecetes cékla', [{ name: 'ecetes cékla', quantity: 500, unit: 'g' }], `1. Nyisd fel a céklát, és tiszta villával emeld ki a szeleteket.\n2. Számolj személyenként 4–5 szelettel.\n3. Hagyd röviden lecsepegni, hogy ne áztassa el a tányért.\n4. Tálald külön kis tálban; világos ruhára könnyen foltot hagy.\n5. A maradékot zárd le, és tartsd hűtőben a levével együtt.`),
  pickle(6, 'Kovászos uborka', [{ name: 'kovászos uborka', quantity: 500, unit: 'g' }], `1. Tiszta villával vedd ki az uborkákat a léből.\n2. Számolj személyenként 1–2 darabbal.\n3. A nagyobb uborkákat hosszában félbevághatod.\n4. Hidegen, külön tálkában kínáld.\n5. A maradékot mindig a levében, lefedve tartsd hűtőben.`),
  pickle(7, 'Savanyú káposzta', [{ name: 'savanyú káposzta', quantity: 500, unit: 'g' }, { name: 'olaj', quantity: 1, unit: 'ek' }], `1. Kóstold meg a savanyú káposztát.\n2. Ha túl sós vagy savanyú, gyorsan öblítsd át hideg vízzel, majd nyomkodd ki.\n3. Lazítsd fel villával, hogy ne maradjon tömbben.\n4. Ízlés szerint keverj hozzá kevés olajat.\n5. Hidegen, külön tálban tálald a főétel mellé.`),
  pickle(8, 'Ecetes gyöngyhagyma', [{ name: 'ecetes gyöngyhagyma', quantity: 350, unit: 'g' }], `1. Nyisd ki az üveget, és tiszta villával vegyél ki a hagymákból.\n2. Számolj személyenként 4–6 darabbal.\n3. Hagyd őket röviden lecsepegni.\n4. Tálald külön kis tálkában, hogy mindenki ízlés szerint vehessen.\n5. A maradékot a saját levében, lezárva tartsd hűtőben.`),
];
