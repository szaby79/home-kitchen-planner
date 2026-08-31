import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { useMenuPreferences } from '@/hooks/useMenuPreferences';
import MenuPreferencesPanel from '@/components/MenuPreferencesPanel';

export default function FamilySettingsPage() {
  const { recipes } = useAppContext();
  const { tr } = useLanguage();
  const { preferences, savePreferences, hasSavedPreferences } = useMenuPreferences();

  return (
    <div className="page-container max-w-4xl">
      <div className="mb-6 max-w-2xl">
        <div className="mb-2 flex items-center gap-2 text-primary"><Users className="h-5 w-5" /><span className="text-sm font-bold uppercase tracking-wide">{tr('Családi profil', 'Family profile')}</span></div>
        <h1 className="section-title mb-2">{tr('Családi beállítások', 'Family preferences')}</h1>
        <p className="text-sm font-medium leading-relaxed text-muted-foreground">{tr('Itt állíthatod be, hány főre főztök, milyen étrendet követtek, mit nem szerettek és mennyi időt szánnátok a főzésre. Az Autopilot ezeket automatikusan használja.', 'Set your family size, diet, dislikes and preferred cooking time here. Autopilot will use these automatically.')}</p>
      </div>

      <MenuPreferencesPanel preferences={preferences} hasSavedPreferences={hasSavedPreferences} recipes={recipes} onSave={savePreferences} />

      <div className="flex justify-end">
        <Button asChild size="lg" className="gap-2">
          <Link to="/planner">{tr('Tovább az Autopilothoz', 'Continue to Autopilot')} <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}
