import { CalendarDays, Cloud, CloudOff, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { formatWeekLabel } from '@/lib/weekDates';

export default function SavedWeeksBar() {
  const {
    cloudSyncEnabled, cloudSyncStatus, savedWeeks, displayedWeekStart, currentWeekStart,
    openSavedWeek, returnToCurrentWeek, canSwitchWeeks, missingRecipeIds,
  } = useAppContext();
  const { isEnglish, tr } = useLanguage();
  const status = syncLabel(cloudSyncStatus, tr);

  return (
    <section className="mb-5 rounded-xl border bg-card p-3" aria-label={tr('Mentett hetek', 'Saved weeks')}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <CalendarDays className="h-5 w-5 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="text-sm font-bold">{displayedWeekStart === currentWeekStart ? tr('Aktuális hét', 'Current week') : tr('Korábbi hét', 'Previous week')}</p>
            <p className="text-sm text-muted-foreground">{formatWeekLabel(displayedWeekStart, isEnglish)}</p>
          </div>
        </div>
        {cloudSyncEnabled && (
          <div className={`flex items-center gap-1.5 text-sm font-semibold ${cloudSyncStatus === 'error' ? 'text-destructive' : 'text-primary'}`} role={cloudSyncStatus === 'error' ? 'alert' : 'status'}>
            {cloudSyncStatus === 'error' ? <CloudOff className="h-4 w-4" /> : <Cloud className="h-4 w-4" />}{status}
          </div>
        )}
      </div>

      {cloudSyncEnabled && savedWeeks.length > 0 && (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <label className="flex-1 text-sm font-semibold">
            {tr('Mentett hét megnyitása', 'Open a saved week')}
            <select
              className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm font-medium"
              value={savedWeeks.some(week => week.weekStart === displayedWeekStart) ? displayedWeekStart : ''}
              disabled={!canSwitchWeeks}
              onChange={event => { if (event.target.value) openSavedWeek(event.target.value); }}
            >
              <option value="">{tr('Válassz hetet…', 'Choose a week…')}</option>
              {savedWeeks.map(week => <option key={week.id} value={week.weekStart}>{week.weekStart === currentWeekStart ? `${tr('Aktuális', 'Current')} · ` : ''}{formatWeekLabel(week.weekStart, isEnglish)}</option>)}
            </select>
          </label>
          {displayedWeekStart !== currentWeekStart && <Button variant="outline" className="self-end gap-2" disabled={!canSwitchWeeks} onClick={returnToCurrentWeek}><RotateCcw className="h-4 w-4" />{tr('Vissza az aktuális héthez', 'Return to current week')}</Button>}
        </div>
      )}

      {cloudSyncStatus === 'pending' && <p className="mt-2 text-sm text-muted-foreground">{tr('A módosítások mentésre várnak.', 'Changes waiting to sync.')}</p>}
      {cloudSyncStatus === 'error' && <p className="mt-2 text-sm text-destructive">{tr('A felhőmentés most nem érhető el. Adataid ezen az eszközön megmaradnak.', 'Cloud saving is currently unavailable. Your data remains on this device.')}</p>}
      {missingRecipeIds.length > 0 && <p className="mt-2 text-sm font-semibold text-destructive" role="alert">{tr('A mentett terv egyik receptje már nem található. A többi étel változatlan maradt.', 'One recipe in this saved plan is no longer available. The other meals remain unchanged.')}</p>}
    </section>
  );
}

function syncLabel(status: ReturnType<typeof useAppContext>['cloudSyncStatus'], tr: (hu: string, en: string) => string) {
  if (status === 'loading') return tr('Betöltés…', 'Loading…');
  if (status === 'pending') return tr('Mentésre vár', 'Waiting to sync');
  if (status === 'saving') return tr('Mentés…', 'Saving…');
  if (status === 'saved') return tr('Mentve', 'Saved');
  if (status === 'error') return tr('A felhőmentés nem érhető el', 'Cloud saving unavailable');
  return tr('Még nincs mentett terv', 'No saved plan yet');
}
