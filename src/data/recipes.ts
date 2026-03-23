import { Recipe } from '@/types/recipe';

export const defaultRecipes: Recipe[] = [
  // ===== SOUPS =====
  {
    id: 'soup-1', name: 'Húsleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'csirkecomb', quantity: 600, unit: 'g' }, { name: 'sárgarépa', quantity: 2, unit: 'db' },
      { name: 'petrezselyemgyökér', quantity: 2, unit: 'db' }, { name: 'zeller', quantity: 1, unit: 'db' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'só', quantity: 1, unit: 'ek' },
      { name: 'bors', quantity: 0.5, unit: 'tk' }, { name: 'cérnametélt', quantity: 100, unit: 'g' },
      { name: 'petrezselyemzöld', quantity: 1, unit: 'csokor' }, { name: 'víz', quantity: 3, unit: 'l' },
    ],
    description: 'A csirkecombot hideg vízzel feltesszük főni. A zöldségeket megtisztítjuk, egészben hozzáadjuk. Sózzuk, borsozzuk. Lassú tűzön 1,5 órát főzzük. A húst kiszedve a levest leszűrjük, a cérnametéltet benne megfőzzük. Petrezselyemzölddel tálaljuk.'
  },
  {
    id: 'soup-2', name: 'Gulyásleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'marhahús', quantity: 500, unit: 'g' }, { name: 'vöröshagyma', quantity: 2, unit: 'db' },
      { name: 'pirospaprika', quantity: 1, unit: 'ek' }, { name: 'burgonya', quantity: 400, unit: 'g' },
      { name: 'sárgarépa', quantity: 2, unit: 'db' }, { name: 'zöldpaprika', quantity: 2, unit: 'db' },
      { name: 'paradicsom', quantity: 2, unit: 'db' }, { name: 'csipetke', quantity: 100, unit: 'g' },
      { name: 'só', quantity: 1, unit: 'ek' }, { name: 'kömény', quantity: 0.5, unit: 'tk' },
      { name: 'fokhagyma', quantity: 2, unit: 'gerezd' }, { name: 'olaj', quantity: 2, unit: 'ek' },
    ],
    description: 'A hagymát apróra vágjuk, olajon megdinszteljük. Hozzáadjuk a kockára vágott húst, pirítjuk. Pirospaprikával megszórjuk, felöntjük vízzel. A zöldségeket kockára vágva hozzáadjuk. Sózzuk, köménymagot adunk hozzá. Amíg a hús megpuhul, kb. 1,5 órát főzzük. A csipetkét az utolsó 10 percben adjuk hozzá.'
  },
  {
    id: 'soup-3', name: 'Bableves füstölt hússal', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'fehérbab', quantity: 300, unit: 'g' }, { name: 'füstölt csülök', quantity: 400, unit: 'g' },
      { name: 'sárgarépa', quantity: 1, unit: 'db' }, { name: 'petrezselyemgyökér', quantity: 1, unit: 'db' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'fokhagyma', quantity: 2, unit: 'gerezd' },
      { name: 'pirospaprika', quantity: 1, unit: 'tk' }, { name: 'tejföl', quantity: 150, unit: 'ml' },
      { name: 'liszt', quantity: 1, unit: 'ek' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'babérlevél', quantity: 2, unit: 'db' },
    ],
    description: 'A babot előző este beáztatjuk. A füstölt hússal együtt feltesszük főni a zöldségekkel. Puháig főzzük (kb. 1,5 óra). A lisztet tejföllel elkeverjük, beteszítjük a levest. Pirospaprikával ízesítjük.'
  },
  {
    id: 'soup-4', name: 'Jókai bableves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'tarkabab', quantity: 300, unit: 'g' }, { name: 'füstölt csülök', quantity: 400, unit: 'g' },
      { name: 'sárgarépa', quantity: 1, unit: 'db' }, { name: 'petrezselyemgyökér', quantity: 1, unit: 'db' },
      { name: 'tejföl', quantity: 200, unit: 'ml' }, { name: 'liszt', quantity: 1, unit: 'ek' },
      { name: 'pirospaprika', quantity: 1, unit: 'tk' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'csipetke', quantity: 80, unit: 'g' }, { name: 'babérlevél', quantity: 2, unit: 'db' },
    ],
    description: 'A babot beáztatjuk, a csülökkel együtt puhára főzzük. Zöldségeket kockázva hozzáadjuk. Tejföllel-liszttel beteszítjük. Csipetkét főzünk bele. Pirospaprikával fűszerezzük.'
  },
  {
    id: 'soup-5', name: 'Lencseleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'vöröslencse', quantity: 250, unit: 'g' }, { name: 'sárgarépa', quantity: 1, unit: 'db' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'fokhagyma', quantity: 2, unit: 'gerezd' },
      { name: 'babérlevél', quantity: 1, unit: 'db' }, { name: 'ecet', quantity: 1, unit: 'ek' },
      { name: 'cukor', quantity: 1, unit: 'tk' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'tejföl', quantity: 100, unit: 'ml' }, { name: 'olaj', quantity: 2, unit: 'ek' },
    ],
    description: 'A lencsét megmossuk, a zöldségekkel együtt puhára főzzük. Rántást készítünk, beteszítjük. Ecettel, cukorral ízesítjük. Tejföllel tálaljuk.'
  },
  {
    id: 'soup-6', name: 'Sárgaborsóleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'sárgaborsó', quantity: 250, unit: 'g' }, { name: 'füstölt kolbász', quantity: 150, unit: 'g' },
      { name: 'sárgarépa', quantity: 1, unit: 'db' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'bors', quantity: 0.5, unit: 'tk' },
      { name: 'babérlevél', quantity: 1, unit: 'db' }, { name: 'olaj', quantity: 1, unit: 'ek' },
    ],
    description: 'A sárgaborsót beáztatjuk, majd a zöldségekkel puhára főzzük. Kolbászt karikázva hozzáadjuk. Sózzuk, borsozzuk.'
  },
  {
    id: 'soup-7', name: 'Zöldségleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'sárgarépa', quantity: 2, unit: 'db' }, { name: 'zeller', quantity: 1, unit: 'db' },
      { name: 'petrezselyemgyökér', quantity: 1, unit: 'db' }, { name: 'karalábé', quantity: 1, unit: 'db' },
      { name: 'zöldborsó', quantity: 100, unit: 'g' }, { name: 'karfiol', quantity: 150, unit: 'g' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'petrezselyemzöld', quantity: 1, unit: 'csokor' },
      { name: 'cérnametélt', quantity: 80, unit: 'g' },
    ],
    description: 'A zöldségeket kockára vágjuk, vízben puhára főzzük. Cérnametéltet beletesszük. Petrezselyemzölddel tálaljuk.'
  },
  {
    id: 'soup-8', name: 'Karfiolleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'karfiol', quantity: 500, unit: 'g' }, { name: 'vaj', quantity: 30, unit: 'g' },
      { name: 'liszt', quantity: 2, unit: 'ek' }, { name: 'tejföl', quantity: 150, unit: 'ml' },
      { name: 'petrezselyemzöld', quantity: 1, unit: 'csokor' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'bors', quantity: 0.5, unit: 'tk' },
    ],
    description: 'A karfiolt rózsáira szedve puhára főzzük. Vajból és lisztből rántást készítünk, beteszítjük. Tejföllel dúsítjuk, petrezselyemmel szórjuk.'
  },
  {
    id: 'soup-9', name: 'Brokkolileves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'brokkoli', quantity: 500, unit: 'g' }, { name: 'burgonya', quantity: 200, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'tejszín', quantity: 100, unit: 'ml' },
      { name: 'vaj', quantity: 20, unit: 'g' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'bors', quantity: 0.5, unit: 'tk' }, { name: 'szerecsendió', quantity: 1, unit: 'csipet' },
    ],
    description: 'A hagymát vajon megdinszteljük. A brokkolit és burgonyát hozzáadjuk, felöntjük vízzel. Puhára főzzük, botmixerrel turmixoljuk. Tejszínnel dúsítjuk.'
  },
  {
    id: 'soup-10', name: 'Burgonyaleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'burgonya', quantity: 500, unit: 'g' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'sárgarépa', quantity: 1, unit: 'db' }, { name: 'babérlevél', quantity: 1, unit: 'db' },
      { name: 'tejföl', quantity: 100, unit: 'ml' }, { name: 'liszt', quantity: 1, unit: 'ek' },
      { name: 'pirospaprika', quantity: 0.5, unit: 'tk' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'olaj', quantity: 1, unit: 'ek' },
    ],
    description: 'Hagymát dinsztelünk, burgonyát kockázzuk, felöntjük vízzel. Puhára főzzük. Tejföllel-liszttel beteszítjük, pirospaprikával fűszerezzük.'
  },
  {
    id: 'soup-11', name: 'Gombaleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'csiperke gomba', quantity: 400, unit: 'g' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'vaj', quantity: 30, unit: 'g' }, { name: 'liszt', quantity: 2, unit: 'ek' },
      { name: 'tejföl', quantity: 150, unit: 'ml' }, { name: 'petrezselyemzöld', quantity: 1, unit: 'csokor' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'bors', quantity: 0.5, unit: 'tk' },
    ],
    description: 'A gombát szeleteljük, hagymával vajon megpároljuk. Liszttel megszórjuk, felöntjük vízzel. Főzzük 20 percig. Tejföllel beteszítjük.'
  },
  {
    id: 'soup-12', name: 'Paradicsomleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'paradicsom', quantity: 800, unit: 'g' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'fokhagyma', quantity: 2, unit: 'gerezd' }, { name: 'cukor', quantity: 1, unit: 'ek' },
      { name: 'tejföl', quantity: 100, unit: 'ml' }, { name: 'olaj', quantity: 2, unit: 'ek' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'tarhonya', quantity: 80, unit: 'g' },
    ],
    description: 'Hagymát, fokhagymát dinsztelünk. A paradicsomot hozzáadjuk, felfőzzük. Turmixoljuk, szűrjük. Cukorral, sóval ízesítjük. Tarhonyát főzünk bele.'
  },
  {
    id: 'soup-13', name: 'Tojásleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'tojás', quantity: 3, unit: 'db' }, { name: 'liszt', quantity: 3, unit: 'ek' },
      { name: 'vaj', quantity: 20, unit: 'g' }, { name: 'petrezselyemzöld', quantity: 1, unit: 'csokor' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'bors', quantity: 0.5, unit: 'tk' },
    ],
    description: 'A tojást liszttel elkeverjük, kanállal a forró levesbe csepegtetjük. Pár percig főzzük. Petrezselyemmel tálaljuk.'
  },
  {
    id: 'soup-14', name: 'Csirkeraguleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'csirkemell', quantity: 400, unit: 'g' }, { name: 'sárgarépa', quantity: 2, unit: 'db' },
      { name: 'zöldborsó', quantity: 100, unit: 'g' }, { name: 'gomba', quantity: 100, unit: 'g' },
      { name: 'vaj', quantity: 30, unit: 'g' }, { name: 'liszt', quantity: 2, unit: 'ek' },
      { name: 'tejföl', quantity: 100, unit: 'ml' }, { name: 'só', quantity: 1, unit: 'tk' },
    ],
    description: 'A csirkemellt kockázzuk, a zöldségekkel együtt megfőzzük. Rántással beteszítjük, tejföllel gazdagítjuk.'
  },
  {
    id: 'soup-15', name: 'Tárkonyos csirkeleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'csirkecomb', quantity: 500, unit: 'g' }, { name: 'sárgarépa', quantity: 1, unit: 'db' },
      { name: 'petrezselyemgyökér', quantity: 1, unit: 'db' }, { name: 'tárkony', quantity: 2, unit: 'ek' },
      { name: 'tejföl', quantity: 150, unit: 'ml' }, { name: 'liszt', quantity: 1, unit: 'ek' },
      { name: 'ecet', quantity: 1, unit: 'tk' }, { name: 'só', quantity: 1, unit: 'tk' },
    ],
    description: 'A csirkét a zöldségekkel puhára főzzük. Tárkonnyal fűszerezzük. Tejföllel-liszttel beteszítjük, ecettel savanyítjuk.'
  },
  {
    id: 'soup-16', name: 'Halászlé', category: 'soup', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'ponty', quantity: 800, unit: 'g' }, { name: 'vöröshagyma', quantity: 3, unit: 'db' },
      { name: 'pirospaprika', quantity: 2, unit: 'ek' }, { name: 'zöldpaprika', quantity: 2, unit: 'db' },
      { name: 'paradicsom', quantity: 2, unit: 'db' }, { name: 'só', quantity: 1, unit: 'ek' },
      { name: 'víz', quantity: 2, unit: 'l' },
    ],
    description: 'A hagymát karikázzuk, a hal fejét és szálkás részeit megfőzzük benne. Leszűrjük, pirospaprikával fűszerezzük. A halszeleteket beletesszük, óvatosan főzzük 15 percig.'
  },
  {
    id: 'soup-17', name: 'Káposztaleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'savanyú káposzta', quantity: 500, unit: 'g' }, { name: 'füstölt kolbász', quantity: 200, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'pirospaprika', quantity: 1, unit: 'tk' },
      { name: 'tejföl', quantity: 100, unit: 'ml' }, { name: 'liszt', quantity: 1, unit: 'ek' },
      { name: 'olaj', quantity: 2, unit: 'ek' }, { name: 'só', quantity: 0.5, unit: 'tk' },
    ],
    description: 'Hagymát dinsztelünk, pirospaprikával fűszerezzük. A káposztát és kolbászt hozzáadjuk. Felöntjük vízzel, puhára főzzük. Tejföllel beteszítjük.'
  },
  {
    id: 'soup-18', name: 'Savanyú krumplileves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'burgonya', quantity: 500, unit: 'g' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'tejföl', quantity: 150, unit: 'ml' }, { name: 'liszt', quantity: 1, unit: 'ek' },
      { name: 'ecet', quantity: 2, unit: 'ek' }, { name: 'babérlevél', quantity: 1, unit: 'db' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'olaj', quantity: 1, unit: 'ek' },
    ],
    description: 'A burgonyát kockázzuk, hagymával együtt puhára főzzük. Tejföllel-liszttel beteszítjük, ecettel savanyítjuk.'
  },
  {
    id: 'soup-19', name: 'Kukoricakrémleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'kukorica konzerv', quantity: 400, unit: 'g' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'burgonya', quantity: 150, unit: 'g' }, { name: 'tejszín', quantity: 100, unit: 'ml' },
      { name: 'vaj', quantity: 20, unit: 'g' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'bors', quantity: 0.5, unit: 'tk' },
    ],
    description: 'Hagymát vajon dinsztelünk, burgonyát és kukoricát hozzáadjuk. Felöntjük vízzel, puhára főzzük. Turmixoljuk, tejszínnel dúsítjuk.'
  },
  {
    id: 'soup-20', name: 'Fokhagymakrémleves', category: 'soup', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'fokhagyma', quantity: 10, unit: 'gerezd' }, { name: 'burgonya', quantity: 200, unit: 'g' },
      { name: 'vaj', quantity: 30, unit: 'g' }, { name: 'tejszín', quantity: 150, unit: 'ml' },
      { name: 'kenyér', quantity: 2, unit: 'szelet' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'bors', quantity: 0.5, unit: 'tk' },
    ],
    description: 'A fokhagymát vajon megpároljuk, burgonyát hozzáadjuk, felöntjük. Puhára főzzük, turmixoljuk. Tejszínnel gazdagítjuk. Pirított kenyérkockával tálaljuk.'
  },

  // ===== MAIN DISHES =====
  {
    id: 'main-1', name: 'Rántott csirke', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'csirkemell', quantity: 600, unit: 'g' }, { name: 'tojás', quantity: 2, unit: 'db' },
      { name: 'liszt', quantity: 100, unit: 'g' }, { name: 'zsemlemorzsa', quantity: 150, unit: 'g' },
      { name: 'olaj', quantity: 300, unit: 'ml' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'burgonya', quantity: 800, unit: 'g' },
    ],
    description: 'A csirkemellt szeleteljük, klopfoljuk, sózzuk. Lisztbe, felvert tojásba, zsemlemorzsába forgatjuk. Bő olajban kisütjük. Burgonyapürével vagy rizzsel tálaljuk.'
  },
  {
    id: 'main-2', name: 'Rántott sertésszelet', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'sertés karaj', quantity: 600, unit: 'g' }, { name: 'tojás', quantity: 2, unit: 'db' },
      { name: 'liszt', quantity: 100, unit: 'g' }, { name: 'zsemlemorzsa', quantity: 150, unit: 'g' },
      { name: 'olaj', quantity: 300, unit: 'ml' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'burgonya', quantity: 800, unit: 'g' },
    ],
    description: 'A karajt szeleteljük, klopfoljuk, sózzuk. Lisztbe, tojásba, zsemlemorzsába forgatjuk. Bő olajban kisütjük. Burgonyapürével tálaljuk.'
  },
  {
    id: 'main-3', name: 'Rántott sajt', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'trappista sajt', quantity: 400, unit: 'g' }, { name: 'tojás', quantity: 2, unit: 'db' },
      { name: 'liszt', quantity: 80, unit: 'g' }, { name: 'zsemlemorzsa', quantity: 120, unit: 'g' },
      { name: 'olaj', quantity: 300, unit: 'ml' }, { name: 'rizs', quantity: 300, unit: 'g' },
      { name: 'tartármártás', quantity: 100, unit: 'ml' },
    ],
    description: 'A sajtot szeleteljük. Lisztbe, tojásba, zsemlemorzsába forgatjuk (duplán panírozzuk). Forró olajban gyorsan kisütjük. Rizzsel és tartárral tálaljuk.'
  },
  {
    id: 'main-4', name: 'Csirkepaprikás', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'csirkecomb', quantity: 800, unit: 'g' }, { name: 'vöröshagyma', quantity: 2, unit: 'db' },
      { name: 'pirospaprika', quantity: 1, unit: 'ek' }, { name: 'tejföl', quantity: 200, unit: 'ml' },
      { name: 'zöldpaprika', quantity: 1, unit: 'db' }, { name: 'paradicsom', quantity: 1, unit: 'db' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'olaj', quantity: 2, unit: 'ek' },
      { name: 'nokedli', quantity: 400, unit: 'g' },
    ],
    description: 'Hagymát dinsztelünk, pirospaprikával fűszerezzük. A csirkét hozzáadjuk, paprikával és paradicsommal, kevés vízzel pároljuk puháig. Tejföllel gazdagítjuk. Nokedlivel tálaljuk.'
  },
  {
    id: 'main-5', name: 'Pörkölt (sertés)', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'sertéshús', quantity: 600, unit: 'g' }, { name: 'vöröshagyma', quantity: 3, unit: 'db' },
      { name: 'pirospaprika', quantity: 1, unit: 'ek' }, { name: 'zöldpaprika', quantity: 1, unit: 'db' },
      { name: 'paradicsom', quantity: 1, unit: 'db' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'olaj', quantity: 2, unit: 'ek' }, { name: 'nokedli', quantity: 400, unit: 'g' },
    ],
    description: 'Sok hagymát dinsztelünk, pirospaprikával fűszerezzük. Kockázott húst hozzáadjuk, kevés vízen puhára pároljuk. Nokedlivel tálaljuk.'
  },
  {
    id: 'main-6', name: 'Marhapörkölt', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'marhahús', quantity: 600, unit: 'g' }, { name: 'vöröshagyma', quantity: 3, unit: 'db' },
      { name: 'pirospaprika', quantity: 1, unit: 'ek' }, { name: 'zöldpaprika', quantity: 1, unit: 'db' },
      { name: 'paradicsom', quantity: 1, unit: 'db' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'olaj', quantity: 2, unit: 'ek' }, { name: 'nokedli', quantity: 400, unit: 'g' },
    ],
    description: 'Sok hagymát dinsztelünk, pirospaprikával fűszerezzük. A marhahúst kockázzuk, lassan puhára pároljuk (kb 2 óra). Nokedlivel tálaljuk.'
  },
  {
    id: 'main-7', name: 'Tokány', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'marhahús', quantity: 500, unit: 'g' }, { name: 'vöröshagyma', quantity: 2, unit: 'db' },
      { name: 'füstölt szalonna', quantity: 100, unit: 'g' }, { name: 'gomba', quantity: 200, unit: 'g' },
      { name: 'tejföl', quantity: 100, unit: 'ml' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'bors', quantity: 0.5, unit: 'tk' }, { name: 'nokedli', quantity: 400, unit: 'g' },
    ],
    description: 'A szalonnát kockázzuk, kisütjük. Hagymát dinsztelünk rajta. Csíkokra vágott húst hozzáadjuk, gombával, tejföllel pároljuk puháig. Nokedlivel tálaljuk.'
  },
  {
    id: 'main-8', name: 'Rakott krumpli', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'burgonya', quantity: 1000, unit: 'g' }, { name: 'tojás', quantity: 6, unit: 'db' },
      { name: 'kolbász', quantity: 300, unit: 'g' }, { name: 'tejföl', quantity: 400, unit: 'ml' },
      { name: 'vaj', quantity: 20, unit: 'g' }, { name: 'só', quantity: 1, unit: 'tk' },
    ],
    description: 'Burgonyát és tojást megfőzzük. Rétegesen egy tepsibe rakjuk: krumpli, tojás, kolbász, tejföl. Sütőben sütjük kb. 30 perc, 180°C-on.'
  },
  {
    id: 'main-9', name: 'Rakott káposzta', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'savanyú káposzta', quantity: 800, unit: 'g' }, { name: 'darált sertéshús', quantity: 500, unit: 'g' },
      { name: 'rizs', quantity: 200, unit: 'g' }, { name: 'tejföl', quantity: 300, unit: 'ml' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'pirospaprika', quantity: 1, unit: 'tk' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'olaj', quantity: 2, unit: 'ek' },
    ],
    description: 'A darált húst hagymával, rizzsel, pirospaprikával összekeverjük. Rétegezzük a káposztával, tejfölt öntünk rá. 180°C-on sütjük 1 órát.'
  },
  {
    id: 'main-10', name: 'Töltött káposzta', category: 'main', mealType: 'lunch', defaultServings: 4, note: 'Több napra is készíthető', imageUrl: '',
    ingredients: [
      { name: 'savanyú káposzta', quantity: 1000, unit: 'g' }, { name: 'darált sertéshús', quantity: 500, unit: 'g' },
      { name: 'rizs', quantity: 200, unit: 'g' }, { name: 'füstölt oldalas', quantity: 300, unit: 'g' },
      { name: 'tejföl', quantity: 200, unit: 'ml' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'pirospaprika', quantity: 1, unit: 'ek' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'tojás', quantity: 1, unit: 'db' },
    ],
    description: 'A darált húst rizzsel, tojással, hagymával, paprikával összegyúrjuk. Káposztalevelekbe töltjük. A maradék káposztával és oldalassal főzzük 1,5 órát. Tejföllel tálaljuk.'
  },
  {
    id: 'main-11', name: 'Töltött paprika', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'tölteni való paprika', quantity: 8, unit: 'db' }, { name: 'darált sertéshús', quantity: 500, unit: 'g' },
      { name: 'rizs', quantity: 150, unit: 'g' }, { name: 'tojás', quantity: 1, unit: 'db' },
      { name: 'paradicsom szósz', quantity: 500, unit: 'ml' }, { name: 'cukor', quantity: 1, unit: 'ek' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
    ],
    description: 'A húst rizzsel, tojással, sóval összegyúrjuk. A paprikákat megtöltjük. Paradicsomszószban főzzük 40 percig.'
  },
  {
    id: 'main-12', name: 'Lecsó kolbásszal', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'zöldpaprika', quantity: 6, unit: 'db' }, { name: 'paradicsom', quantity: 4, unit: 'db' },
      { name: 'vöröshagyma', quantity: 2, unit: 'db' }, { name: 'kolbász', quantity: 300, unit: 'g' },
      { name: 'tojás', quantity: 4, unit: 'db' }, { name: 'olaj', quantity: 2, unit: 'ek' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'cukor', quantity: 0.5, unit: 'tk' },
      { name: 'kenyér', quantity: 4, unit: 'szelet' },
    ],
    description: 'Hagymát dinsztelünk, paprikát, paradicsomot hozzáadjuk. Kolbászt karikázva beleszeljük. Pároljuk 20 percig. Tojást ütünk bele. Kenyérrel tálaljuk.'
  },
  {
    id: 'main-13', name: 'Brassói aprópecsenye', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'sertéshús', quantity: 600, unit: 'g' }, { name: 'burgonya', quantity: 600, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'fokhagyma', quantity: 3, unit: 'gerezd' },
      { name: 'majoránna', quantity: 1, unit: 'tk' }, { name: 'bors', quantity: 0.5, unit: 'tk' },
      { name: 'olaj', quantity: 3, unit: 'ek' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'savanyú uborka', quantity: 4, unit: 'db' },
    ],
    description: 'A húst kockázzuk, erős tűzön kisütjük. A burgonyát hasábra vágjuk, külön kisütjük. Fokhagymával, majoránnával fűszerezzük, összekeverjük. Savanyú uborkával tálaljuk.'
  },
  {
    id: 'main-14', name: 'Fasírt', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'darált sertéshús', quantity: 500, unit: 'g' }, { name: 'zsemle', quantity: 2, unit: 'db' },
      { name: 'tojás', quantity: 1, unit: 'db' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'fokhagyma', quantity: 2, unit: 'gerezd' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'bors', quantity: 0.5, unit: 'tk' }, { name: 'olaj', quantity: 100, unit: 'ml' },
      { name: 'burgonya', quantity: 600, unit: 'g' },
    ],
    description: 'A zsemlyét beáztatjuk, a húshoz keverjük tojással, hagymával, fokhagymával. Fasírtokat formálunk, olajban kisütjük. Burgonyapürével tálaljuk.'
  },
  {
    id: 'main-15', name: 'Stefánia vagdalt', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'darált sertéshús', quantity: 600, unit: 'g' }, { name: 'tojás', quantity: 5, unit: 'db' },
      { name: 'zsemle', quantity: 2, unit: 'db' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'bors', quantity: 0.5, unit: 'tk' },
      { name: 'burgonya', quantity: 600, unit: 'g' },
    ],
    description: '3 tojást keményre főzünk. A masszát (hús, zsemle, 2 tojás, hagyma) rolóba formáljuk, közepébe a főtt tojásokat tesszük. 180°C-on sütjük 50 percig.'
  },
  {
    id: 'main-16', name: 'Sült csirke comb', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'csirkecomb', quantity: 8, unit: 'db' }, { name: 'olaj', quantity: 2, unit: 'ek' },
      { name: 'pirospaprika', quantity: 1, unit: 'tk' }, { name: 'fokhagyma', quantity: 3, unit: 'gerezd' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'bors', quantity: 0.5, unit: 'tk' },
      { name: 'burgonya', quantity: 600, unit: 'g' },
    ],
    description: 'A combokat fűszerezzük, tepsire tesszük. 200°C-on sütjük kb. 45 percig. Sült krumplival tálaljuk.'
  },
  {
    id: 'main-17', name: 'Sült oldalas', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'sertés oldalas', quantity: 1000, unit: 'g' }, { name: 'fokhagyma', quantity: 4, unit: 'gerezd' },
      { name: 'pirospaprika', quantity: 1, unit: 'tk' }, { name: 'kömény', quantity: 0.5, unit: 'tk' },
      { name: 'mustár', quantity: 1, unit: 'ek' }, { name: 'méz', quantity: 1, unit: 'ek' },
      { name: 'só', quantity: 1, unit: 'ek' }, { name: 'kenyér', quantity: 4, unit: 'szelet' },
    ],
    description: 'Az oldalast fűszerekkel bedörzsöljük, fóliába csomagolva 160°C-on sütjük 2 órát. Végén fólia nélkül pirosra sütjük. Kenyérrel tálaljuk.'
  },
  {
    id: 'main-18', name: 'Sült kolbász krumplipürével', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'kolbász', quantity: 600, unit: 'g' }, { name: 'burgonya', quantity: 800, unit: 'g' },
      { name: 'tej', quantity: 100, unit: 'ml' }, { name: 'vaj', quantity: 30, unit: 'g' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'mustár', quantity: 2, unit: 'ek' },
    ],
    description: 'A kolbászt megsütjük. A burgonyát puhára főzzük, vajjal, tejjel pürésítjük. Mustárral tálaljuk.'
  },
  {
    id: 'main-19', name: 'Paprikás krumpli', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'burgonya', quantity: 800, unit: 'g' }, { name: 'kolbász', quantity: 300, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'pirospaprika', quantity: 1, unit: 'ek' },
      { name: 'zöldpaprika', quantity: 1, unit: 'db' }, { name: 'paradicsom', quantity: 1, unit: 'db' },
      { name: 'olaj', quantity: 2, unit: 'ek' }, { name: 'só', quantity: 1, unit: 'tk' },
    ],
    description: 'Hagymát dinsztelünk, paprikával fűszerezzük. Burgonyát kockázzuk, kolbászt karikázzuk, mindent hozzáadunk. Kevés vízen puhára főzzük.'
  },
  {
    id: 'main-20', name: 'Túrós csusza', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'csusza tészta', quantity: 400, unit: 'g' }, { name: 'túró', quantity: 250, unit: 'g' },
      { name: 'tejföl', quantity: 200, unit: 'ml' }, { name: 'szalonna', quantity: 150, unit: 'g' },
      { name: 'só', quantity: 1, unit: 'tk' },
    ],
    description: 'A tésztát kifőzzük. A szalonnát kockázzuk, kisütjük. Rétegezzük: tészta, túró, tejföl, szalonna. Sütőben átmelegítjük.'
  },
  {
    id: 'main-21', name: 'Káposztás tészta', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'fodros nagykocka tészta', quantity: 400, unit: 'g' }, { name: 'fejeskáposzta', quantity: 500, unit: 'g' },
      { name: 'cukor', quantity: 1, unit: 'ek' }, { name: 'olaj', quantity: 3, unit: 'ek' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'bors', quantity: 0.5, unit: 'tk' },
    ],
    description: 'A káposztát levágjuk, sózzuk, kinyomkodjuk. Olajon cukorral karamellizáljuk. A kifőtt tésztát belekeverjük.'
  },
  {
    id: 'main-22', name: 'Székelykáposzta', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'savanyú káposzta', quantity: 600, unit: 'g' }, { name: 'sertéshús', quantity: 400, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'pirospaprika', quantity: 1, unit: 'tk' },
      { name: 'tejföl', quantity: 200, unit: 'ml' }, { name: 'liszt', quantity: 1, unit: 'ek' },
      { name: 'olaj', quantity: 2, unit: 'ek' }, { name: 'só', quantity: 0.5, unit: 'tk' },
    ],
    description: 'A húst kockázzuk, pörköltnek készítjük el. A savanyú káposztát hozzáadjuk, tejföllel összefőzzük.'
  },
  {
    id: 'main-23', name: 'Paradicsomos káposzta hússal', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'fejeskáposzta', quantity: 600, unit: 'g' }, { name: 'darált hús', quantity: 400, unit: 'g' },
      { name: 'paradicsom szósz', quantity: 300, unit: 'ml' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'rizs', quantity: 200, unit: 'g' }, { name: 'pirospaprika', quantity: 1, unit: 'tk' },
      { name: 'olaj', quantity: 2, unit: 'ek' }, { name: 'só', quantity: 1, unit: 'tk' },
    ],
    description: 'Hagymát dinsztelünk, darált húst hozzáadjuk. Káposztát csíkozzuk, paradicsomszósszal összefőzzük. Rizzsel tálaljuk.'
  },
  {
    id: 'main-24', name: 'Zöldbabfőzelék fasírttal', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'zöldbab', quantity: 600, unit: 'g' }, { name: 'darált hús', quantity: 400, unit: 'g' },
      { name: 'liszt', quantity: 2, unit: 'ek' }, { name: 'tejföl', quantity: 150, unit: 'ml' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'fokhagyma', quantity: 2, unit: 'gerezd' },
      { name: 'ecet', quantity: 1, unit: 'ek' }, { name: 'cukor', quantity: 1, unit: 'tk' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'petrezselyemzöld', quantity: 1, unit: 'csokor' },
      { name: 'tojás', quantity: 1, unit: 'db' }, { name: 'zsemle', quantity: 1, unit: 'db' },
    ],
    description: 'A zöldbabot puhára főzzük, rántással beteszítjük, tejföllel, ecettel ízesítjük. A darált húsból fasírtokat formálunk és kisütjük. Együtt tálaljuk.'
  },
  {
    id: 'main-25', name: 'Borsófőzelék pörkölttel', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'zöldborsó', quantity: 500, unit: 'g' }, { name: 'sertéshús', quantity: 400, unit: 'g' },
      { name: 'vöröshagyma', quantity: 2, unit: 'db' }, { name: 'pirospaprika', quantity: 1, unit: 'tk' },
      { name: 'liszt', quantity: 2, unit: 'ek' }, { name: 'tejföl', quantity: 100, unit: 'ml' },
      { name: 'cukor', quantity: 1, unit: 'tk' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'olaj', quantity: 2, unit: 'ek' },
    ],
    description: 'A borsót puhára főzzük, rántással beteszítjük. A húsból pörköltet készítünk. Együtt tálaljuk.'
  },
  {
    id: 'main-26', name: 'Lencsefőzelék sült hússal', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'lencse', quantity: 300, unit: 'g' }, { name: 'sertés karaj', quantity: 400, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'liszt', quantity: 2, unit: 'ek' },
      { name: 'ecet', quantity: 1, unit: 'ek' }, { name: 'cukor', quantity: 1, unit: 'tk' },
      { name: 'babérlevél', quantity: 1, unit: 'db' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'olaj', quantity: 2, unit: 'ek' },
    ],
    description: 'A lencsét puhára főzzük, rántással beteszítjük, ecettel-cukorral ízesítjük. A húst szeleteljük, megsütjük. Együtt tálaljuk.'
  },
  {
    id: 'main-27', name: 'Tökfőzelék fasírttal', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'tök', quantity: 800, unit: 'g' }, { name: 'darált hús', quantity: 400, unit: 'g' },
      { name: 'liszt', quantity: 2, unit: 'ek' }, { name: 'tejföl', quantity: 150, unit: 'ml' },
      { name: 'ecet', quantity: 2, unit: 'ek' }, { name: 'cukor', quantity: 1, unit: 'ek' },
      { name: 'kapor', quantity: 1, unit: 'csokor' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'tojás', quantity: 1, unit: 'db' }, { name: 'zsemle', quantity: 1, unit: 'db' },
    ],
    description: 'A tököt lereszeljük, sózzuk, kinyomkodjuk. Rántással beteszítjük, tejföllel, ecettel, cukorral ízesítjük. Kaporral gazdagítjuk. Fasírttal tálaljuk.'
  },
  {
    id: 'main-28', name: 'Rizi-bizi csirkével', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'rizs', quantity: 300, unit: 'g' }, { name: 'zöldborsó', quantity: 200, unit: 'g' },
      { name: 'csirkemell', quantity: 400, unit: 'g' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'vaj', quantity: 30, unit: 'g' }, { name: 'só', quantity: 1, unit: 'tk' },
    ],
    description: 'A rizst vajon megpirítjuk hagymával. Felöntjük vízzel, borsóval együtt főzzük. A csirkemellt kockázzuk, külön megsütjük. Összekeverjük.'
  },
  {
    id: 'main-29', name: 'Sült hekk', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'hekk filé', quantity: 600, unit: 'g' }, { name: 'liszt', quantity: 80, unit: 'g' },
      { name: 'olaj', quantity: 200, unit: 'ml' }, { name: 'citrom', quantity: 1, unit: 'db' },
      { name: 'só', quantity: 1, unit: 'tk' }, { name: 'rizs', quantity: 300, unit: 'g' },
    ],
    description: 'A halfilét sózzuk, lisztbe forgatjuk, olajon kisütjük. Citrommal és rizzsel tálaljuk.'
  },
  {
    id: 'main-30', name: 'Rántott hal', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'harcsa filé', quantity: 600, unit: 'g' }, { name: 'tojás', quantity: 2, unit: 'db' },
      { name: 'liszt', quantity: 80, unit: 'g' }, { name: 'zsemlemorzsa', quantity: 120, unit: 'g' },
      { name: 'olaj', quantity: 300, unit: 'ml' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'burgonya', quantity: 600, unit: 'g' },
    ],
    description: 'A halat szeleteljük, sózzuk. Lisztbe, tojásba, zsemlemorzsába forgatjuk. Bő olajban kisütjük. Burgonyapürével tálaljuk.'
  },
  {
    id: 'main-31', name: 'Hortobágyi palacsinta', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'liszt', quantity: 200, unit: 'g' }, { name: 'tojás', quantity: 3, unit: 'db' },
      { name: 'tej', quantity: 300, unit: 'ml' }, { name: 'csirkemell', quantity: 400, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'pirospaprika', quantity: 1, unit: 'tk' },
      { name: 'tejföl', quantity: 200, unit: 'ml' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'olaj', quantity: 2, unit: 'ek' },
    ],
    description: 'Palacsintát sütünk. Paprikás csirke raguval megtöltjük, tepsibe rakjuk. Tejfölös-paprikás szósszal leöntjük, sütőben átmelegítjük.'
  },
  {
    id: 'main-32', name: 'Csirkemell tejszínes gombával', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'csirkemell', quantity: 600, unit: 'g' }, { name: 'csiperke gomba', quantity: 300, unit: 'g' },
      { name: 'tejszín', quantity: 200, unit: 'ml' }, { name: 'vöröshagyma', quantity: 1, unit: 'db' },
      { name: 'vaj', quantity: 30, unit: 'g' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'bors', quantity: 0.5, unit: 'tk' }, { name: 'rizs', quantity: 300, unit: 'g' },
    ],
    description: 'A csirkemellet szeleteljük, vajon megsütjük. Gombát, hagymát hozzáadjuk, tejszínnel felöntjük. Pároljuk 15 percig. Rizzsel tálaljuk.'
  },
  {
    id: 'main-33', name: 'Bakonyi sertésszelet', category: 'main', mealType: 'lunch', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'sertés karaj', quantity: 600, unit: 'g' }, { name: 'gomba', quantity: 300, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'zöldpaprika', quantity: 1, unit: 'db' },
      { name: 'tejföl', quantity: 200, unit: 'ml' }, { name: 'liszt', quantity: 1, unit: 'ek' },
      { name: 'pirospaprika', quantity: 1, unit: 'tk' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'olaj', quantity: 2, unit: 'ek' }, { name: 'nokedli', quantity: 400, unit: 'g' },
    ],
    description: 'A karajt szeleteljük, megsütjük. Gombát, hagymát, paprikát dinsztelünk. Tejföllel összefőzzük. Nokedlivel tálaljuk.'
  },
  {
    id: 'main-34', name: 'Milánói sertésborda', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'sertésborda', quantity: 600, unit: 'g' }, { name: 'tojás', quantity: 2, unit: 'db' },
      { name: 'zsemlemorzsa', quantity: 120, unit: 'g' }, { name: 'liszt', quantity: 80, unit: 'g' },
      { name: 'spagetti', quantity: 400, unit: 'g' }, { name: 'paradicsom szósz', quantity: 300, unit: 'ml' },
      { name: 'sajt', quantity: 100, unit: 'g' }, { name: 'olaj', quantity: 200, unit: 'ml' },
      { name: 'só', quantity: 1, unit: 'tk' },
    ],
    description: 'A bordát kirántjuk. Spagettit főzünk, paradicsomszósszal összekeverjük. A rántott húst rátesszük, sajttal megszórjuk.'
  },
  {
    id: 'main-35', name: 'Bolognai spagetti', category: 'main', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'spagetti', quantity: 400, unit: 'g' }, { name: 'darált marhahús', quantity: 400, unit: 'g' },
      { name: 'vöröshagyma', quantity: 1, unit: 'db' }, { name: 'fokhagyma', quantity: 2, unit: 'gerezd' },
      { name: 'sárgarépa', quantity: 1, unit: 'db' }, { name: 'paradicsom szósz', quantity: 400, unit: 'ml' },
      { name: 'olívaolaj', quantity: 2, unit: 'ek' }, { name: 'só', quantity: 1, unit: 'tk' },
      { name: 'bors', quantity: 0.5, unit: 'tk' }, { name: 'parmezán', quantity: 50, unit: 'g' },
    ],
    description: 'Hagymát, fokhagymát, sárgarépát dinsztelünk. Darált húst hozzáadjuk, pirítjuk. Paradicsomszósszal 30 percig főzzük. Kifőtt spagettire tesszük, parmezánnal szórjuk.'
  },

  // ===== DESSERTS =====
  {
    id: 'dessert-1', name: 'Palacsinta', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'liszt', quantity: 200, unit: 'g' }, { name: 'tojás', quantity: 2, unit: 'db' },
      { name: 'tej', quantity: 300, unit: 'ml' }, { name: 'cukor', quantity: 2, unit: 'ek' },
      { name: 'olaj', quantity: 2, unit: 'ek' }, { name: 'lekvár', quantity: 200, unit: 'g' },
      { name: 'porcukor', quantity: 2, unit: 'ek' },
    ],
    description: 'A tésztát összekeverjük, vékony palacsintákat sütünk. Lekvárral töltjük, porcukorral szórjuk.'
  },
  {
    id: 'dessert-2', name: 'Túrós palacsinta', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'liszt', quantity: 200, unit: 'g' }, { name: 'tojás', quantity: 3, unit: 'db' },
      { name: 'tej', quantity: 300, unit: 'ml' }, { name: 'túró', quantity: 250, unit: 'g' },
      { name: 'tejföl', quantity: 200, unit: 'ml' }, { name: 'cukor', quantity: 3, unit: 'ek' },
      { name: 'vanília cukor', quantity: 1, unit: 'csomag' }, { name: 'mazsola', quantity: 50, unit: 'g' },
    ],
    description: 'Palacsintákat sütünk. Túrós töltelékkel megtöltjük, tepsibe rétegezzük. Tejföllel leöntjük, sütőben sütjük 20 percig.'
  },
  {
    id: 'dessert-3', name: 'Aranygaluska', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'liszt', quantity: 500, unit: 'g' }, { name: 'élesztő', quantity: 25, unit: 'g' },
      { name: 'tej', quantity: 200, unit: 'ml' }, { name: 'tojás', quantity: 2, unit: 'db' },
      { name: 'cukor', quantity: 80, unit: 'g' }, { name: 'vaj', quantity: 100, unit: 'g' },
      { name: 'dió', quantity: 100, unit: 'g' }, { name: 'vanília pudingpor', quantity: 1, unit: 'csomag' },
    ],
    description: 'Kelttésztát gyúrunk. Kis golyókat formálunk, olvasztott vajba, cukros-diós keverékbe mártjuk. Kuglóf formába rétegezzük. Kelesztjük, 180°C-on sütjük 35 percig. Vaníliasodóval tálaljuk.'
  },
  {
    id: 'dessert-4', name: 'Mákos guba', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'kifli', quantity: 6, unit: 'db' }, { name: 'mák', quantity: 150, unit: 'g' },
      { name: 'cukor', quantity: 80, unit: 'g' }, { name: 'tej', quantity: 400, unit: 'ml' },
      { name: 'vaj', quantity: 30, unit: 'g' }, { name: 'vanília cukor', quantity: 1, unit: 'csomag' },
    ],
    description: 'A kifliket szeleteljük, forró tejjel leöntjük. Mákot cukorral összekeverjük. Rétegezzük: kifli, mákos cukor, vaj. Sütőben átmelegítjük.'
  },
  {
    id: 'dessert-5', name: 'Somlói galuska', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'piskóta lap', quantity: 3, unit: 'db' }, { name: 'vanília pudingpor', quantity: 2, unit: 'csomag' },
      { name: 'tej', quantity: 800, unit: 'ml' }, { name: 'cukor', quantity: 100, unit: 'g' },
      { name: 'dió', quantity: 80, unit: 'g' }, { name: 'mazsola', quantity: 50, unit: 'g' },
      { name: 'rum', quantity: 2, unit: 'ek' }, { name: 'étcsokoládé', quantity: 100, unit: 'g' },
      { name: 'tejszín', quantity: 200, unit: 'ml' },
    ],
    description: 'Vaníliapudingot főzünk. A piskótákat rétegezzük: puding, dió, mazsola, rum. Tejszínhabbal és csokoládészósszal tálaljuk.'
  },
  {
    id: 'dessert-6', name: 'Madártej', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'tej', quantity: 1000, unit: 'ml' }, { name: 'tojás', quantity: 6, unit: 'db' },
      { name: 'cukor', quantity: 150, unit: 'g' }, { name: 'vanília cukor', quantity: 2, unit: 'csomag' },
    ],
    description: 'A tojásfehérjét kemény habbá verjük cukorral. Kanállal forró tejbe tesszük, megforgatjuk. A sárgájából vaníliasodót főzünk a tejből. A habgolyókat a sodóra tesszük.'
  },
  {
    id: 'dessert-7', name: 'Rizskoch', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'rizs', quantity: 200, unit: 'g' }, { name: 'tej', quantity: 500, unit: 'ml' },
      { name: 'tojás', quantity: 3, unit: 'db' }, { name: 'cukor', quantity: 80, unit: 'g' },
      { name: 'vanília cukor', quantity: 1, unit: 'csomag' }, { name: 'citromhéj', quantity: 1, unit: 'tk' },
      { name: 'vaj', quantity: 20, unit: 'g' },
    ],
    description: 'A rizst tejben puhára főzzük. Tojássárgáját cukorral eldolgozzuk, a rizshez keverjük. A fehérjét habbá verjük, óvatosan beleforgatjuk. 180°C-on sütjük 30 percig.'
  },
  {
    id: 'dessert-8', name: 'Tejbegríz', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'tej', quantity: 600, unit: 'ml' }, { name: 'gríz', quantity: 100, unit: 'g' },
      { name: 'cukor', quantity: 40, unit: 'g' }, { name: 'vaj', quantity: 20, unit: 'g' },
      { name: 'vanília cukor', quantity: 1, unit: 'csomag' }, { name: 'lekvár', quantity: 100, unit: 'g' },
    ],
    description: 'A tejet felforraljuk, a grízt beleszórjuk keverés közben. Cukorral, vajjal ízesítjük. Sűrűre főzzük. Lekvárral tálaljuk.'
  },
  {
    id: 'dessert-9', name: 'Almás pite', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'liszt', quantity: 400, unit: 'g' }, { name: 'vaj', quantity: 150, unit: 'g' },
      { name: 'cukor', quantity: 120, unit: 'g' }, { name: 'tojás', quantity: 2, unit: 'db' },
      { name: 'alma', quantity: 1000, unit: 'g' }, { name: 'fahéj', quantity: 1, unit: 'tk' },
      { name: 'sütőpor', quantity: 1, unit: 'csomag' }, { name: 'porcukor', quantity: 2, unit: 'ek' },
    ],
    description: 'Omlós tésztát gyúrunk. A tészta felét tepsibe nyújtjuk. Reszelt almát fahéjjal szórjuk rá. A másik felét ráterítjük. 180°C-on sütjük 40 percig. Porcukorral szórjuk.'
  },
  {
    id: 'dessert-10', name: 'Meggyes pite', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'liszt', quantity: 300, unit: 'g' }, { name: 'vaj', quantity: 120, unit: 'g' },
      { name: 'cukor', quantity: 120, unit: 'g' }, { name: 'tojás', quantity: 2, unit: 'db' },
      { name: 'meggy', quantity: 500, unit: 'g' }, { name: 'sütőpor', quantity: 1, unit: 'csomag' },
      { name: 'porcukor', quantity: 2, unit: 'ek' },
    ],
    description: 'Tésztát gyúrunk, tepsibe nyújtjuk. Meggyet szórunk rá. 180°C-on sütjük 35 percig. Porcukorral szórjuk.'
  },
  {
    id: 'dessert-11', name: 'Kakaós csiga', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'liszt', quantity: 500, unit: 'g' }, { name: 'élesztő', quantity: 25, unit: 'g' },
      { name: 'tej', quantity: 200, unit: 'ml' }, { name: 'tojás', quantity: 2, unit: 'db' },
      { name: 'cukor', quantity: 80, unit: 'g' }, { name: 'vaj', quantity: 80, unit: 'g' },
      { name: 'kakaó', quantity: 3, unit: 'ek' }, { name: 'porcukor', quantity: 50, unit: 'g' },
    ],
    description: 'Kelttésztát készítünk. Kinyújtjuk, kakaós-cukros keverékkel megszórjuk. Feltekerjük, szeleteljük. Tepsibe rakjuk, kelesztjük. 180°C-on sütjük 25 percig.'
  },
  {
    id: 'dessert-12', name: 'Túrógombóc', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'túró', quantity: 500, unit: 'g' }, { name: 'gríz', quantity: 100, unit: 'g' },
      { name: 'tojás', quantity: 2, unit: 'db' }, { name: 'cukor', quantity: 2, unit: 'ek' },
      { name: 'zsemlemorzsa', quantity: 100, unit: 'g' }, { name: 'vaj', quantity: 50, unit: 'g' },
      { name: 'tejföl', quantity: 200, unit: 'ml' }, { name: 'porcukor', quantity: 2, unit: 'ek' },
    ],
    description: 'A túrót grízzel, tojással, cukorral összegyúrjuk. 30 perc pihentetés után gombócokat formálunk. Sós vízben kifőzzük. Pirított zsemlemorzsába forgatjuk. Tejföllel tálaljuk.'
  },
  {
    id: 'dessert-13', name: 'Lekváros bukta', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'liszt', quantity: 500, unit: 'g' }, { name: 'élesztő', quantity: 25, unit: 'g' },
      { name: 'tej', quantity: 200, unit: 'ml' }, { name: 'tojás', quantity: 2, unit: 'db' },
      { name: 'cukor', quantity: 60, unit: 'g' }, { name: 'vaj', quantity: 80, unit: 'g' },
      { name: 'lekvár', quantity: 200, unit: 'g' }, { name: 'porcukor', quantity: 2, unit: 'ek' },
    ],
    description: 'Kelttésztát készítünk. Négyzetekre vágjuk, lekvárral töltjük. Tepsibe rendezzük, kelesztjük. 180°C-on sütjük 30 percig. Porcukorral szórjuk.'
  },
  {
    id: 'dessert-14', name: 'Dobos torta', category: 'dessert', mealType: 'both', defaultServings: 4, note: 'Ünnepi desszert', imageUrl: '',
    ingredients: [
      { name: 'liszt', quantity: 200, unit: 'g' }, { name: 'tojás', quantity: 6, unit: 'db' },
      { name: 'cukor', quantity: 250, unit: 'g' }, { name: 'vaj', quantity: 250, unit: 'g' },
      { name: 'kakaó', quantity: 3, unit: 'ek' }, { name: 'étcsokoládé', quantity: 100, unit: 'g' },
    ],
    description: 'Vékony piskótalapokat sütünk (6 db). Csokoládés vajkrémmel rétegezzük. A legfelső lapot karamellel vonjuk be. Oldalát morzsával szórjuk.'
  },
  {
    id: 'dessert-15', name: 'Mézeskalács', category: 'dessert', mealType: 'both', defaultServings: 4, note: '', imageUrl: '',
    ingredients: [
      { name: 'liszt', quantity: 500, unit: 'g' }, { name: 'méz', quantity: 200, unit: 'g' },
      { name: 'cukor', quantity: 100, unit: 'g' }, { name: 'tojás', quantity: 1, unit: 'db' },
      { name: 'szódabikarbóna', quantity: 1, unit: 'tk' }, { name: 'fahéj', quantity: 1, unit: 'tk' },
      { name: 'szegfűszeg', quantity: 0.5, unit: 'tk' }, { name: 'gyömbér', quantity: 0.5, unit: 'tk' },
      { name: 'vaj', quantity: 50, unit: 'g' },
    ],
    description: 'A mézet, cukrot, vajat felolvasztjuk. A liszttel, fűszerekkel tésztát gyúrunk. Kinyújtjuk, kiszúrjuk. 180°C-on sütjük 10 percig.'
  },
];
