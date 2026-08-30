import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CookingTimePreference, DietPreference, FoodRestriction, FoodStylePreference, MenuPreferences, Recipe } from '@/types/recipe';
import { countMatchingMainRecipes } from '@/lib/menuPreferences';
import { useLanguage } from '@/i18n/LanguageContext';

type Props = {
  preferences: MenuPreferences;
  hasSavedPreferences: boolean;
  recipes: Recipe[];
  onSave: (preferences: MenuPreferences) => void;
};

const allergyOptions: FoodRestriction[] = ['gluten', 'milk', 'egg', 'nuts', 'fish', 'soy'];
const intoleranceOptions: FoodRestriction[] = ['lactose', 'gluten'];
const styleOptions: FoodStylePreference[] = ['traditional', 'light', 'quick', 'meatless'];

export default function MenuPreferencesPanel({ preferences, hasSavedPreferences, recipes, onSave }: Props) {
  const { tr } = useLanguage();
  const [open, setOpen] = useState(!hasSavedPreferences);
  const [draft, setDraft] = useState(preferences);
  const [dislikedText, setDislikedText] = useState(preferences.dislikedIngredients.join(', '));

  useEffect(() => {
    setDraft(preferences);
    setDislikedText(preferences.dislikedIngredients.join(', '));
  }, [preferences]);

  const matchingCount = countMatchingMainRecipes(recipes, {
    ...draft,
    dislikedIngredients: splitIngredients(dislikedText),
  });
  const save = () => {
    onSave({ ...draft, dislikedIngredients: splitIngredients(dislikedText) });
    setOpen(false);
  };
  const summary = preferenceSummary(preferences, tr);

  return <section className="mb-6 overflow-hidden rounded-xl border border-primary/25 bg-card shadow-sm" data-testid="menu-preferences">
    <button type="button" onClick={() => setOpen(value => !value)} className="flex w-full items-center gap-3 p-4 text-left sm:p-5" aria-expanded={open}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Users className="h-5 w-5" /></span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-bold sm:text-lg">{tr('Családi beállítások', 'Family preferences')}</span>
        <span className="block text-sm text-muted-foreground leading-relaxed font-medium">{hasSavedPreferences ? summary : tr('Mondd el röviden, mit szeret a család. Ezt csak egyszer kell beállítani.', 'Tell us what your family enjoys. You only need to set this up once.')}</span>
      </span>
      {open ? <ChevronUp className="h-5 w-5 shrink-0" /> : <ChevronDown className="h-5 w-5 shrink-0" />}
    </button>

    {open && <div className="space-y-6 border-t p-4 sm:p-5">
      <PreferenceStep number="1" title={tr('Hány főre főztök?', 'How many people are you cooking for?')}>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" size="lg" aria-label={tr('Egy fővel kevesebb', 'One fewer person')} onClick={() => setDraft(value => ({ ...value, familySize: Math.max(1, value.familySize - 1) }))}>−</Button>
          <strong className="min-w-20 text-center text-xl">{draft.familySize} {tr('fő', 'people')}</strong>
          <Button type="button" variant="outline" size="lg" aria-label={tr('Egy fővel több', 'One more person')} onClick={() => setDraft(value => ({ ...value, familySize: Math.min(12, value.familySize + 1) }))}>+</Button>
        </div>
      </PreferenceStep>

      <PreferenceStep number="2" title={tr('Van különleges étrend?', 'Do you follow a special diet?')}>
        <ChoiceRow options={(['none', 'vegetarian', 'vegan'] as DietPreference[])} selected={[draft.diet]} labels={{ none: tr('Nincs', 'No restriction'), vegetarian: tr('Vegetáriánus', 'Vegetarian'), vegan: tr('Vegán', 'Vegan') }} onToggle={value => setDraft(current => ({ ...current, diet: value }))} single />
      </PreferenceStep>

      <PreferenceStep number="3" title={tr('Van ételallergia?', 'Are there any food allergies?')} hint={tr('Többet is kijelölhetsz. Ha nincs, hagyd üresen.', 'Choose all that apply. Leave blank if there are none.')}>
        <ChoiceRow options={allergyOptions} selected={draft.allergies} labels={restrictionLabels(tr)} onToggle={value => setDraft(current => ({ ...current, allergies: toggle(current.allergies, value) }))} />
      </PreferenceStep>

      <PreferenceStep number="4" title={tr('Van ételintolerancia?', 'Are there any food intolerances?')}>
        <ChoiceRow options={intoleranceOptions} selected={draft.intolerances} labels={restrictionLabels(tr)} onToggle={value => setDraft(current => ({ ...current, intolerances: toggle(current.intolerances, value) }))} />
      </PreferenceStep>

      <PreferenceStep number="5" title={tr('Mit nem szerettek?', 'Which ingredients do you dislike?')} hint={tr('Vesszővel válaszd el. Példa: gomba, máj, kapor', 'Separate items with commas. Example: mushrooms, liver, dill')}>
        <textarea value={dislikedText} onChange={event => setDislikedText(event.target.value)} rows={2} className="w-full rounded-lg border bg-background px-3 py-3 text-base placeholder:text-muted-foreground" placeholder={tr('Például: gomba, máj, kapor', 'For example: mushrooms, liver, dill')} />
      </PreferenceStep>

      <PreferenceStep number="6" title={tr('Milyen ételeket szerettek?', 'What kind of meals do you enjoy?')} hint={tr('Ez csak előnyben részesíti ezeket, más ételeket nem tilt le.', 'These choices are preferred, but other suitable meals can still appear.')}>
        <ChoiceRow options={styleOptions} selected={draft.preferredStyles} labels={{ traditional: tr('Hagyományos magyar', 'Traditional Hungarian'), light: tr('Könnyű és friss', 'Light and fresh'), quick: tr('Gyors és egyszerű', 'Quick and simple'), meatless: tr('Húsmentes', 'Meatless') }} onToggle={value => setDraft(current => ({ ...current, preferredStyles: toggle(current.preferredStyles, value) }))} />
      </PreferenceStep>

      <PreferenceStep number="7" title={tr('Legfeljebb mennyi idő legyen a főzés?', 'What is your preferred maximum cooking time?')}>
        <ChoiceRow options={(['30', '45', '60', 'any'] as CookingTimePreference[])} selected={[draft.maxCookingTime]} labels={{ '30': tr('30 perc', '30 minutes'), '45': tr('45 perc', '45 minutes'), '60': tr('60 perc', '60 minutes'), any: tr('Mindegy', 'Any time') }} onToggle={value => setDraft(current => ({ ...current, maxCookingTime: value }))} single />
      </PreferenceStep>

      <PreferenceStep number="8" title={tr('Általában hány napra főzzünk ugyanabból?', 'How many days should one batch usually cover?')}>
        <ChoiceRow options={[1, 2, 3] as const} selected={[draft.batchDays]} labels={{ 1: tr('1 napra', '1 day'), 2: tr('2 napra', '2 days'), 3: tr('3 napra', '3 days') }} onToggle={value => setDraft(current => ({ ...current, batchDays: value }))} single />
      </PreferenceStep>

      <div className={`rounded-lg border p-3 text-sm ${matchingCount ? 'border-accent/40 bg-accent/10' : 'border-destructive/40 bg-destructive/10'}`}>
        <strong>{matchingCount ? tr(`${matchingCount} megfelelő főételt találtunk.`, `${matchingCount} suitable main dishes found.`) : tr('Nincs a feltételeknek megfelelő főétel.', 'No main dishes match these choices.')}</strong>
        {!matchingCount && <p>{tr('Válassz hosszabb főzési időt, vagy vegyél ki egy korlátozást.', 'Choose a longer cooking time or remove one restriction.')}</p>}
      </div>

      <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex max-w-xl gap-2 text-sm text-muted-foreground leading-relaxed font-medium"><ShieldCheck className="h-4 w-4 shrink-0" /> {tr('Súlyos allergia esetén mindig ellenőrizd a recept hozzávalóit és a termékek csomagolását is.', 'For serious allergies, always check the recipe ingredients and product labels as well.')}</p>
        <Button type="button" size="lg" onClick={save} disabled={!matchingCount} className="min-w-48">{tr('Beállítások mentése', 'Save preferences')}</Button>
      </div>
    </div>}
  </section>;
}

function PreferenceStep({ number, title, hint, children }: { number: string; title: string; hint?: string; children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-[2rem_1fr]">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{number}</span>
    <div><h3 className="mb-1 font-semibold">{title}</h3>{hint && <p className="mb-3 text-sm text-muted-foreground leading-relaxed font-medium">{hint}</p>}<div className="mt-2">{children}</div></div>
  </div>;
}

function ChoiceRow<T extends string | number>({ options, selected, labels, onToggle, single = false }: { options: readonly T[]; selected: T[]; labels: Record<T, string>; onToggle: (value: T) => void; single?: boolean }) {
  return <div className="flex flex-wrap gap-2">{options.map(option => {
    const active = selected.includes(option);
    return <button key={option} type="button" role={single ? 'radio' : 'checkbox'} aria-checked={active} onClick={() => onToggle(option)} className={`min-h-11 rounded-lg border px-4 py-2 text-sm font-medium transition ${active ? 'border-primary bg-primary text-primary-foreground' : 'bg-background hover:border-primary/60'}`}>{active ? '✓ ' : ''}{labels[option]}</button>;
  })}</div>;
}

function toggle<T>(items: T[], value: T) { return items.includes(value) ? items.filter(item => item !== value) : [...items, value]; }
function splitIngredients(value: string) { return value.split(',').map(item => item.trim()).filter(Boolean); }

function restrictionLabels(tr: (hu: string, en: string) => string): Record<FoodRestriction, string> {
  return { gluten: tr('Glutén / búza', 'Gluten / wheat'), milk: tr('Tej', 'Milk'), lactose: tr('Laktóz', 'Lactose'), egg: tr('Tojás', 'Egg'), nuts: tr('Diófélék', 'Tree nuts'), fish: tr('Hal', 'Fish'), soy: tr('Szója', 'Soy') };
}

function preferenceSummary(preferences: MenuPreferences, tr: (hu: string, en: string) => string) {
  const parts = [tr(`${preferences.familySize} fő`, `${preferences.familySize} people`)];
  if (preferences.diet === 'vegetarian') parts.push(tr('vegetáriánus', 'vegetarian'));
  if (preferences.diet === 'vegan') parts.push(tr('vegán', 'vegan'));
  if (preferences.allergies.length || preferences.intolerances.length) parts.push(tr('korlátozások beállítva', 'dietary restrictions set'));
  if (preferences.maxCookingTime !== 'any') parts.push(tr(`max. ${preferences.maxCookingTime} perc`, `up to ${preferences.maxCookingTime} minutes`));
  if (preferences.batchDays > 1) parts.push(tr(`${preferences.batchDays} napra főzés`, `${preferences.batchDays}-day batches`));
  return parts.join(' • ');
}
