import { useEffect, useState } from 'react';
import { BookOpenCheck, CircleHelp, Cloud, ListChecks, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/i18n/LanguageContext';
import packageMetadata from '../../package.json';

type HelpSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const SECTION_IDS = [
  'overview', 'autopilot', 'family-settings', 'weekly-plan', 'day-view', 'weekly-shopping',
  'daily-shopping', 'leftovers-batch', 'portions', 'favourites', 'replacement', 'guest-mode',
  'signed-in-account', 'cloud-saving', 'account-privacy', 'troubleshooting',
];

export default function HelpPage() {
  const { isEnglish, tr } = useLanguage();
  const location = useLocation();
  const requestedSection = location.hash.slice(1);
  const initialSection = SECTION_IDS.includes(requestedSection) ? requestedSection : 'overview';
  const [openSections, setOpenSections] = useState<string[]>([initialSection]);
  const sections = getHelpSections(isEnglish);

  useEffect(() => {
    if (!SECTION_IDS.includes(requestedSection)) return;
    setOpenSections(current => current.includes(requestedSection) ? current : [...current, requestedSection]);
    window.requestAnimationFrame?.(() => document.getElementById(requestedSection)?.scrollIntoView?.({ block: 'start' }));
  }, [requestedSection]);

  return (
    <div className="page-container max-w-4xl overflow-x-hidden">
      <header className="mb-6 rounded-2xl border border-primary/25 bg-gradient-to-br from-[#FFF1E2] to-[#F2F7EF] p-5 sm:p-7">
        <div className="mb-2 flex items-center gap-2 text-primary">
          <CircleHelp className="h-6 w-6" aria-hidden="true" />
          <span className="text-sm font-bold uppercase tracking-wide">{tr('Ismertető és segítség', 'Guide and support')}</span>
        </div>
        <h1 className="section-title mb-2">{tr('Súgó', 'Help Centre')}</h1>
        <p className="max-w-2xl text-sm font-medium leading-relaxed text-muted-foreground">
          {tr('Itt röviden elolvashatod, hogyan működnek a Plan & Pan jelenlegi funkciói. A tervezett, de még el nem készült lehetőségeket nem mutatjuk működő funkcióként.', 'Learn how the current Plan & Pan features work. Planned features that are not yet available are not presented as working features.')}
        </p>
        <nav className="mt-4 flex flex-wrap gap-2" aria-label={tr('Gyakori súgótémák', 'Popular help topics')}>
          <QuickLink to="/help#autopilot" icon={BookOpenCheck} label={tr('Autopilot', 'Autopilot')} />
          <QuickLink to="/help#weekly-plan" icon={ListChecks} label={tr('Heti terv', 'Weekly plan')} />
          <QuickLink to="/help#weekly-shopping" icon={ShoppingCart} label={tr('Bevásárlólisták', 'Shopping lists')} />
          <QuickLink to="/help#cloud-saving" icon={Cloud} label={tr('Felhőmentés', 'Cloud saving')} />
        </nav>
      </header>

      <Accordion type="multiple" value={openSections} onValueChange={setOpenSections} className="overflow-hidden rounded-xl border bg-card px-4 sm:px-5">
        {sections.map(section => (
          <AccordionItem key={section.id} id={section.id} value={section.id} className="scroll-mt-20 last:border-b-0">
            <AccordionTrigger className="min-h-14 text-left text-base font-bold sm:text-lg">{section.title}</AccordionTrigger>
            <AccordionContent className="space-y-3 text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul className="list-disc space-y-2 pl-5">{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="mt-6 text-center text-xs font-medium text-muted-foreground/70">
        {tr('Alkalmazásverzió', 'App version')}: {packageMetadata.version}
      </p>
    </div>
  );
}

function QuickLink({ to, icon: Icon, label }: { to: string; icon: typeof Cloud; label: string }) {
  return <Link to={to} className="inline-flex min-h-11 items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"><Icon className="h-4 w-4 text-primary" aria-hidden="true" />{label}</Link>;
}

function getHelpSections(english: boolean): HelpSection[] {
  if (english) return [
    { id: 'overview', title: 'Plan & Pan overview', paragraphs: ['Plan & Pan helps create a weekly lunch and dinner plan from the built-in recipes and builds a linked shopping list. You can use it without an account.'] },
    { id: 'autopilot', title: 'Autopilot', paragraphs: ['Autopilot uses your saved family preferences and the details you set for the current week. Choose a weekly priority, adjust unusual days, then generate the menu.'], bullets: ['Busy days use the selected cooking-time limit.', '“No meal needed” leaves that day out.', 'The grocery target guides recipe selection; it is not an exact store-price calculation.', '“Use what I already have” prioritises recipes using the ingredient names you enter. It does not track quantities or pantry stock.'] },
    { id: 'family-settings', title: 'Family Settings', paragraphs: ['Set family size, diet, allergies, intolerances, disliked ingredients, preferred meal styles, cooking time and usual batch length. Autopilot uses these choices when finding suitable recipes.', 'For a serious allergy, always check the full recipe and product packaging. Plan & Pan is a planning aid, not medical advice.'] },
    { id: 'weekly-plan', title: 'Weekly plan', paragraphs: ['Choose the lunches and dinners you want to plan. Generating creates a new active plan containing only those selected meals. A lunch can include soup, main dish, side, pickles and dessert where the selected profile supports them.', 'On desktop, active days appear together. The saved-week control shows which calendar week is open and lets signed-in users open earlier saved weeks.'] },
    { id: 'day-view', title: 'Daily plan and day view', paragraphs: ['On a phone, the weekly plan focuses on one active day at a time. Use the day buttons to move between days or open Week overview to scan the planned week. The desktop view shows all active days in sections.', 'Day view is a way to read and edit the same weekly plan; it is not a separate plan.'] },
    { id: 'weekly-shopping', title: 'Weekly shopping list', paragraphs: ['Weekly view combines recipe ingredients for the active plan. Matching ingredient names with the same unit are combined, and quantities reflect portions and batch length.', 'Manually added items and personal notes are part of the weekly list. Checking an item is saved with the current guest or signed-in storage state.'] },
    { id: 'daily-shopping', title: 'Daily shopping list', paragraphs: ['Daily view separates the generated recipe ingredients into sections for each planned day. It is useful when shopping one day at a time or checking what is needed next.', 'Manual extra items remain on Weekly view. A checkmark is shared by ingredient name and unit, so the same item is also shown checked in the other view. Daily view is not a pantry or inventory system.'] },
    { id: 'leftovers-batch', title: 'Leftovers and batch cooking', paragraphs: ['Marking a day as Leftovers reuses the previous day’s lunch or dinner and includes the extra portions in the earlier cooking quantity.', 'The family batch preference can repeat a meal across two or three compatible consecutive days. Days with different household sizes are not combined into the same batch. The linked shopping list counts the required batch quantity once.'] },
    { id: 'portions', title: 'Portions', paragraphs: ['Change the serving count beside a meal when more or fewer people will eat. The shopping-list quantities update automatically.', 'The “days” control records how many days that cooked batch should cover.'] },
    { id: 'favourites', title: 'Favourites', paragraphs: ['Use the heart on a recipe to mark it as a favourite. You can filter recipes to favourites, move favourites to the front during planning, or let the Family favourites Autopilot goal prefer them.', 'Favourites currently stay in this browser’s local Plan & Pan data; they are not part of cloud synchronisation.'] },
    { id: 'replacement', title: 'Replacing dishes and regenerating', paragraphs: ['You can replace an individual meal from the plan. Only that selection changes, and the linked shopping list recalculates automatically.', 'Generating again replaces the current valid plan only after confirmation. If generation cannot find suitable meals, the existing plan and shopping list remain unchanged.'] },
    { id: 'guest-mode', title: 'Guest mode', paragraphs: ['Guest mode requires no registration. Plans, shopping state, family settings and other local choices stay in this browser on this device.', 'Guest data does not synchronise to another device. When you sign out, Plan & Pan removes account data from memory and returns to the separate guest state.'] },
    { id: 'signed-in-account', title: 'Signed-in account', paragraphs: ['Email magic-link sign-in adds cloud saving for family settings, weekly plans and their shopping-list state. If the account has no matching cloud week, a valid local current-week plan can be uploaded once.', 'When a matching cloud plan already exists, that cloud record is authoritative and is not replaced by empty defaults.'] },
    { id: 'cloud-saving', title: 'Cloud saving and synchronisation', paragraphs: ['After sign-in and cloud loading finish, menu edits, portions, replacements, manual shopping items, checkmarks and notes save automatically after a short delay. Saved weeks can be opened again.', 'An internet connection is required to reach Supabase. If saving temporarily fails, the displayed plan remains usable and pending changes stay on this device for a safe retry. Wait for “Saved” before relying on another device to have the latest state.'] },
    { id: 'account-privacy', title: 'Account and Privacy', paragraphs: ['Open the profile control, then Account and Privacy, to view safe account details and stored-data counts. Signed-in users can download a UTF-8 JSON export, delete saved application data while keeping the account, sign out on this or all devices, or permanently delete the account after strong confirmation.', 'Guests see only local-data information, a scoped Plan & Pan guest reset and the sign-in option.'] },
    { id: 'troubleshooting', title: 'Common questions and troubleshooting', paragraphs: [], bullets: ['Why did my menu remain the same after reopening? A saved plan is intentionally restored instead of generating a different one.', 'What is the difference between the lists? Weekly view combines the active week and manual items; Daily view separates generated ingredients by planned day.', 'Are checkmarks saved? Yes—locally for guests and with the weekly cloud record for signed-in users.', 'What changes when I sign in? Family settings and weekly plan/shopping state can synchronise across devices after cloud loading and saving.', 'Why is internet needed? Cloud synchronisation must reach Supabase; guest/local use remains available without cloud access.', 'Does Plan & Pan track pantry inventory or deduct ingredients from next week? No. That is not currently implemented.', 'Where do I change family size or restrictions? Open Family Settings from the home page or Autopilot.', 'How do I export or delete data? Open the profile control, then Account and Privacy.', 'What if cloud saving fails? Keep using the visible plan, reconnect, and wait for the status to change to Saved before checking another device.'] },
  ];

  return [
    { id: 'overview', title: 'A Plan & Pan röviden', paragraphs: ['A Plan & Pan a beépített receptekből segít összeállítani a heti ebéd- és vacsoratervet, majd ehhez kapcsolódó bevásárlólistát készít. Fiók nélkül is használható.'] },
    { id: 'autopilot', title: 'Autopilot', paragraphs: ['Az Autopilot a mentett családi beállításokat és az adott hétre megadott részleteket használja. Válassz heti célt, módosítsd a szokatlan napokat, majd generáld a menüt.'], bullets: ['A „Sűrű nap” figyelembe veszi a kiválasztott főzési időt.', 'A „Nem kell étkezés” kihagyja az adott napot.', 'A heti bevásárlási cél csak irányt ad a receptválasztásnak; nem pontos bolti árkalkuláció.', 'A „Használjuk, ami otthon van” a beírt alapanyagok neve alapján részesít előnyben recepteket. Mennyiséget és kamrakészletet nem tart nyilván.'] },
    { id: 'family-settings', title: 'Családi beállítások', paragraphs: ['Itt állíthatod be a létszámot, étrendet, allergiákat, intoleranciákat, nem kedvelt hozzávalókat, ételstílust, főzési időt és a szokásos többnapos főzést. Az Autopilot ezek alapján keres megfelelő recepteket.', 'Súlyos allergia esetén mindig ellenőrizd a teljes receptet és a termék csomagolását. A Plan & Pan tervezési segítség, nem orvosi tanács.'] },
    { id: 'weekly-plan', title: 'Heti terv', paragraphs: ['Jelöld ki, mely ebédekre és vacsorákra szeretnél tervet. A generálás új aktív tervet készít, amely csak a kijelölt étkezéseket tartalmazza. Az ebéd a választott profiltól függően levesből, főételből, köretből, savanyúságból és desszertből is állhat.', 'Asztali nézetben az aktív napok együtt jelennek meg. A mentett hét vezérlő mutatja a megnyitott naptári hetet, és bejelentkezve korábbi mentett hetek is megnyithatók.'] },
    { id: 'day-view', title: 'Napi terv és napi megjelenítés', paragraphs: ['Telefonon a heti terv egyszerre egy aktív napra összpontosít. A napgombokkal válthatsz, a „Heti áttekintés” pedig megmutatja a megtervezett hetet. Asztali nézetben minden aktív nap külön szakaszban látható.', 'A napi megjelenítés ugyanannak a heti tervnek az olvasására és szerkesztésére szolgál; nem külön menüterv.'] },
    { id: 'weekly-shopping', title: 'Heti bevásárlólista', paragraphs: ['A heti nézet összevonja az aktív terv receptjeinek hozzávalóit. Az azonos nevű és azonos mértékegységű hozzávalók mennyisége összeadódik, figyelembe véve az adagokat és a többnapos főzést.', 'A kézzel hozzáadott tételek és a saját jegyzet a heti listához tartoznak. A kipipálás a vendég- vagy a bejelentkezett mentési mód szerint megmarad.'] },
    { id: 'daily-shopping', title: 'Napi bevásárlólista', paragraphs: ['A napi nézet a generált receptek hozzávalóit a megtervezett napok szerint külön szakaszokban mutatja. Akkor hasznos, ha naponta vásárolsz, vagy azt nézed meg, mi kell legközelebb.', 'A kézzel felvett extra tételek a heti nézeten maradnak. A pipa a hozzávaló neve és mértékegysége szerint közös, ezért a másik nézetben is látszik. A napi lista nem kamra- vagy készletnyilvántartás.'] },
    { id: 'leftovers-batch', title: 'Maradék és többnapos főzés', paragraphs: ['Ha egy napot „Maradék” módra állítasz, az előző napi ebédet vagy vacsorát használja fel, és a szükséges pluszadagot az előző főzés mennyiségéhez számolja.', 'A családi beállításban választott többnapos főzés két vagy három egymást követő, összeillő napra ismételhet egy ételt. Eltérő létszámú napokat nem von össze egy adagba. A kapcsolódó bevásárlólista egyszer számolja a teljes szükséges mennyiséget.'] },
    { id: 'portions', title: 'Adagok', paragraphs: ['Az étel mellett módosíthatod az adagok számát, ha többen vagy kevesebben esznek. A bevásárlólista mennyisége automatikusan frissül.', 'A „napra” érték azt rögzíti, hány napot fed le az elkészített adag.'] },
    { id: 'favourites', title: 'Kedvencek', paragraphs: ['A receptnél lévő szívvel jelölheted kedvencnek az ételt. Szűrhetsz a kedvencekre, előre sorolhatod őket tervezéskor, illetve a „Családi kedvencek” Autopilot-cél előnyben részesítheti őket.', 'A kedvencek jelenleg ennek a böngészőnek a helyi Plan & Pan-adatai között maradnak; nem részei a felhőszinkronnak.'] },
    { id: 'replacement', title: 'Ételcsere és újragenerálás', paragraphs: ['A tervben egyetlen ételt is lecserélhetsz. Csak az adott választás változik, a kapcsolódó bevásárlólista pedig automatikusan újraszámolódik.', 'A teljes újragenerálás csak jóváhagyás után cseréli le az érvényes tervet. Ha nem található minden feltételnek megfelelő étel, a meglévő terv és bevásárlólista változatlan marad.'] },
    { id: 'guest-mode', title: 'Vendégmód', paragraphs: ['A vendégmódhoz nem kell regisztráció. A menü, a bevásárlási állapot, a családi beállítások és más helyi választások ezen az eszközön, ebben a böngészőben maradnak.', 'A vendégadat nem szinkronizálódik másik eszközre. Kijelentkezéskor a Plan & Pan eltávolítja a fiók adatait a memóriából, és visszatér a külön vendégállapothoz.'] },
    { id: 'signed-in-account', title: 'Bejelentkezett fiók', paragraphs: ['Az e-mailes belépési linkkel történő bejelentkezés felhőmentést ad a családi beállításokhoz, a heti tervekhez és a hozzájuk tartozó bevásárlólista-állapothoz. Ha a fiókban nincs megfelelő felhőrekord, az érvényes helyi aktuális heti terv egyszer feltölthető.', 'Ha már van azonos heti felhőterv, az a mérvadó, és üres alapadat nem írja felül.'] },
    { id: 'cloud-saving', title: 'Felhőmentés és szinkronizálás', paragraphs: ['Bejelentkezés és a felhőbetöltés befejezése után a menüváltoztatások, adagok, cserék, kézi bevásárlótételek, pipák és jegyzetek rövid késleltetéssel automatikusan mentődnek. A mentett hetek később újra megnyithatók.', 'A Supabase eléréséhez internetkapcsolat kell. Átmeneti hiba esetén a megjelenített terv használható marad, a függő módosítások pedig ezen az eszközön várnak biztonságos újrapróbálásra. Másik eszköz használata előtt várd meg a „Mentve” állapotot.'] },
    { id: 'account-privacy', title: 'Fiók és adatvédelem', paragraphs: ['A profilvezérlőből megnyitható „Fiók és adatvédelem” oldalon biztonságos fiókadatokat és tárolási összesítést láthatsz. Bejelentkezve letöltheted az adataidat UTF-8 JSON-fájlban, törölheted a mentett alkalmazásadatokat a fiók megtartásával, kijelentkezhetsz ezen vagy minden eszközön, illetve erős megerősítés után végleg törölheted a fiókot.', 'Vendégként csak a helyi adatok ismertetője, a kizárólag Plan & Pan-adatokat törlő vendég-visszaállítás és a bejelentkezési lehetőség jelenik meg.'] },
    { id: 'troubleshooting', title: 'Gyakori kérdések és hibaelhárítás', paragraphs: [], bullets: ['Miért maradt ugyanaz a menü újranyitás után? Mert a mentett terv szándékosan visszatöltődik egy másik véletlen terv generálása helyett.', 'Mi a különbség a listák között? A heti nézet összevonja az aktív hetet és mutatja a kézi tételeket; a napi nézet napokra bontja a generált hozzávalókat.', 'Megmaradnak a pipák? Igen: vendégként helyben, bejelentkezve a heti felhőrekord részeként.', 'Mi változik bejelentkezéskor? A családi beállítások és a heti tervhez kapcsolódó bevásárlási állapot a felhőbetöltés és mentés után eszközök között is szinkronizálható.', 'Miért kell internet? A felhőszinkronnak el kell érnie a Supabase-t; a vendég- és helyi használat felhő nélkül is elérhető.', 'Kezeli a Plan & Pan a kamrakészletet vagy levonja a következő heti alapanyagokat? Nem. Ez jelenleg nincs megvalósítva.', 'Hol módosíthatom a létszámot vagy korlátozásokat? Nyisd meg a Családi beállításokat a főoldalról vagy az Autopilotból.', 'Hogyan exportálhatom vagy törölhetem az adataimat? Nyisd meg a profilvezérlőt, majd a Fiók és adatvédelem oldalt.', 'Mit tegyek, ha nem működik a felhőmentés? Használd tovább a látható tervet, állítsd helyre a kapcsolatot, és másik eszköz ellenőrzése előtt várd meg a „Mentve” állapotot.'] },
  ];
}
