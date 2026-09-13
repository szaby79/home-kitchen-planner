import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Cloud, Database, Download, Loader2, LogIn, LogOut, ShieldCheck, Trash2, UserRound, Users } from 'lucide-react';
import { useAuth, PRIVACY_NOTICE_VERSION } from '@/auth/AuthContext';
import { useAppContext } from '@/components/Layout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMenuPreferences } from '@/hooks/useMenuPreferences';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  createDataExport,
  deleteMySavedData,
  fetchStoredDataBundle,
  permanentlyDeleteAccount,
  StoredDataSummary,
  summarizeStoredData,
} from '@/lib/accountData';
import { clearGuestPlanPanData, clearUserCloudCaches, markCloudDataDeleted } from '@/lib/localPlanPanData';
import { supabase } from '@/lib/supabase';

type Action = 'privacy' | 'export' | 'delete-data' | 'signout-local' | 'signout-global' | 'delete-account' | 'clear-guest' | null;

function TypedConfirmation({
  children,
  title,
  description,
  expected,
  confirmLabel,
  cancelLabel,
  busy,
  onConfirm,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  expected: string;
  confirmLabel: string;
  cancelLabel: string;
  busy: boolean;
  onConfirm: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <AlertDialog open={open} onOpenChange={(nextOpen) => {
      if (busy) return;
      setOpen(nextOpen);
      if (!nextOpen) setValue('');
    }}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-h-[90vh] max-w-md overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="leading-relaxed">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2">
          <Label htmlFor={`confirmation-${expected}`}>{expected}</Label>
          <Input
            id={`confirmation-${expected}`}
            autoComplete="off"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={expected}
            disabled={busy}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={busy || value !== expected}
            onClick={(event) => {
              event.preventDefault();
              void onConfirm();
            }}
          >
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function AccountPrivacyPage() {
  const { user, profile, loading, profileUnavailable, acceptPrivacyNotice, signOut } = useAuth();
  const { cloudSyncStatus } = useAppContext();
  const { syncStatus: familySyncStatus } = useMenuPreferences();
  const { language, tr } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [summary, setSummary] = useState<StoredDataSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [action, setAction] = useState<Action>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const privacyAccepted = profile?.privacy_notice_version === PRIVACY_NOTICE_VERSION;
  const expectedConfirmation = tr('TÖRLÉS', 'DELETE');

  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(language === 'hu' ? 'hu-HU' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  }), [language]);
  const formatDate = (value: string | null | undefined) => value ? dateFormatter.format(new Date(value)) : tr('Nem érhető el', 'Not available');

  const loadSummary = useCallback(async () => {
    if (!user) return;
    setSummaryLoading(true);
    setError('');
    try {
      setSummary(summarizeStoredData(await fetchStoredDataBundle(user.id)));
    } catch {
      setError(tr('A felhőben tárolt adatok összesítése most nem érhető el.', 'Your cloud data summary is currently unavailable.'));
    } finally {
      setSummaryLoading(false);
    }
  }, [tr, user]);

  useEffect(() => { void loadSummary(); }, [loadSummary]);

  useEffect(() => {
    if (searchParams.has('saved-data-deleted')) setMessage(tr('A mentett adatok törölve.', 'Saved data deleted.'));
    if (searchParams.has('guest-data-cleared')) setMessage(tr('A vendégadatok törölve.', 'Guest data cleared.'));
  }, [searchParams, tr]);

  const runAction = async (nextAction: Exclude<Action, null>, task: () => Promise<void>) => {
    if (action) return;
    setAction(nextAction);
    setError('');
    setMessage('');
    try {
      await task();
    } catch (caught) {
      if (caught instanceof Error && caught.message === 'SESSION_EXPIRED') {
        setError(tr('A munkamenet lejárt. Jelentkezz be újra; semmi nem lett törölve.', 'Your session expired. Sign in again; nothing was deleted.'));
      } else if (nextAction === 'export') {
        setError(tr('Az adatok letöltése most nem sikerült.', 'Your data could not be downloaded.'));
      } else if (nextAction === 'signout-local' || nextAction === 'signout-global') {
        setError(tr('A kijelentkezés most nem sikerült. Próbáld újra.', 'Sign-out could not be completed. Please try again.'));
      } else if (nextAction === 'privacy') {
        setError(tr('Az elfogadás most nem rögzíthető. Próbáld újra.', 'Your acceptance could not be recorded. Please try again.'));
      } else {
        setError(tr('A művelet most nem sikerült. Az adataid nem lettek törölve.', 'The action could not be completed. Your data was not deleted.'));
      }
    } finally {
      setAction(null);
    }
  };

  const handleExport = () => runAction('export', async () => {
    if (!user?.email) throw new Error('SESSION_EXPIRED');
    const bundle = await fetchStoredDataBundle(user.id);
    const payload = createDataExport(user.email, user.created_at, bundle);
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    try {
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `plan-and-pan-data-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setMessage(tr('Az adatok letöltése elkészült.', 'Your data download is ready.'));
    } finally {
      URL.revokeObjectURL(url);
    }
  });

  const handleDeleteSavedData = () => runAction('delete-data', async () => {
    if (!user) throw new Error('SESSION_EXPIRED');
    await deleteMySavedData();
    markCloudDataDeleted(user.id);
    window.location.replace('/account?saved-data-deleted=1');
  });

  const handleSignOut = (scope: 'local' | 'global') => runAction(scope === 'local' ? 'signout-local' : 'signout-global', async () => {
    await signOut(scope);
    navigate('/', { replace: true });
  });

  const handleDeleteAccount = () => runAction('delete-account', async () => {
    if (!supabase || !user) throw new Error('SESSION_EXPIRED');
    const { data, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !data.session?.access_token || data.session.user.id !== user.id) throw new Error('SESSION_EXPIRED');
    await permanentlyDeleteAccount(data.session.access_token);
    clearUserCloudCaches(user.id);
    await supabase.auth.signOut({ scope: 'local' }).catch(() => undefined);
    window.location.replace('/?account-deleted=1');
  });

  const handleClearGuest = () => runAction('clear-guest', async () => {
    clearGuestPlanPanData();
    window.location.replace('/account?guest-data-cleared=1');
  });

  const cloudStatus = [cloudSyncStatus, familySyncStatus].some(status => status === 'error')
    ? tr('A módosítások mentésre várnak.', 'Changes waiting to sync.')
    : [cloudSyncStatus, familySyncStatus].some(status => status === 'loading' || status === 'saving' || status === 'pending')
      ? tr('Mentés…', 'Saving…')
      : tr('Mentve', 'Saved');

  if (loading) return <div className="page-container flex min-h-[50vh] items-center justify-center"><Loader2 className="h-7 w-7 animate-spin text-primary" aria-label={tr('Betöltés…', 'Loading…')} /></div>;

  if (!user) {
    return (
      <div className="page-container max-w-3xl">
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-primary"><ShieldCheck className="h-5 w-5" /><span className="text-sm font-bold uppercase tracking-wide">{tr('Helyi vendégmód', 'Local guest mode')}</span></div>
          <h1 className="section-title mb-2">{tr('Fiók és adatvédelem', 'Account and Privacy')}</h1>
          <p className="text-muted-foreground">{tr('Vendégként a menüterv és a bevásárlólista ezen az eszközön marad. Fiók nélkül is használhatod a Plan & Pant.', 'As a guest, your meal plan and shopping list stay on this device. You can use Plan & Pan without an account.')}</p>
        </div>
        {message && <Alert className="mb-4 border-accent/50 bg-[#F2F7EF]"><AlertDescription>{message}</AlertDescription></Alert>}
        {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
        <Card>
          <CardHeader><CardTitle>{tr('Vendégadatok', 'Guest data')}</CardTitle><CardDescription>{tr('Csak a Plan & Pan helyi adatai törlődnek; más webhelyek adatait nem érinti.', 'Only local Plan & Pan data is removed; data from other websites is not affected.')}</CardDescription></CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => navigate('/?signin=1')}><LogIn className="mr-2 h-4 w-4" />{tr('Bejelentkezés', 'Sign in')}</Button>
            <TypedConfirmation title={tr('Vendégadatok törlése', 'Delete guest data')} description={tr(`Írd be ezt: ${expectedConfirmation}. A helyi menüterv és bevásárlólista végleg törlődik.`, `Type ${expectedConfirmation}. Your local meal plan and shopping list will be permanently removed.`)} expected={expectedConfirmation} confirmLabel={tr('Vendégadatok törlése', 'Delete guest data')} cancelLabel={tr('Mégse', 'Cancel')} busy={action === 'clear-guest'} onConfirm={handleClearGuest}>
              <Button variant="outline" disabled={Boolean(action)}><Trash2 className="mr-2 h-4 w-4" />{tr('Helyi vendégadatok törlése', 'Clear local guest data')}</Button>
            </TypedConfirmation>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container max-w-4xl">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2 text-primary"><ShieldCheck className="h-5 w-5" /><span className="text-sm font-bold uppercase tracking-wide">{tr('Saját adatok', 'Your data')}</span></div>
        <h1 className="section-title mb-2">{tr('Fiók és adatvédelem', 'Account and Privacy')}</h1>
        <p className="text-muted-foreground">{tr('Itt átnézheted, letöltheted vagy törölheted a Plan & Pan által tárolt adataidat.', 'Review, download or delete the data Plan & Pan stores for you.')}</p>
      </div>

      {message && <Alert className="mb-4 border-accent/50 bg-[#F2F7EF]"><AlertDescription>{message}</AlertDescription></Alert>}
      {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
      {profileUnavailable && <Alert className="mb-4"><AlertDescription>{tr('A profiladatok most nem érhetők el. A törlési műveleteket csak érvényes munkamenettel végezzük el.', 'Profile data is currently unavailable. Destructive actions only run with a valid session.')}</AlertDescription></Alert>}

      <div className="grid gap-5">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><UserRound className="h-5 w-5 text-primary" />{tr('Fiókadatok', 'Account details')}</CardTitle></CardHeader>
          <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
            <div><p className="text-muted-foreground">{tr('Bejelentkezett e-mail-cím', 'Signed-in email')}</p><p className="break-all font-semibold">{user.email}</p></div>
            <div><p className="text-muted-foreground">{tr('Fiók létrehozása', 'Account created')}</p><p className="font-semibold">{formatDate(user.created_at)}</p></div>
            <div><p className="text-muted-foreground">{tr('Adatvédelmi tájékoztató verziója', 'Privacy notice version')}</p><p className="font-semibold">{profile?.privacy_notice_version ?? tr('Nincs rögzítve', 'Not recorded')}</p></div>
            <div><p className="text-muted-foreground">{tr('Elfogadás időpontja', 'Accepted at')}</p><p className="font-semibold">{formatDate(profile?.privacy_notice_accepted_at)}</p></div>
            <div><p className="text-muted-foreground">{tr('Felhőmentés állapota', 'Cloud-saving status')}</p><p className="font-semibold">{cloudStatus}</p></div>
          </CardContent>
        </Card>

        {!privacyAccepted && (
          <Card className="border-primary/40 bg-[#FFF8EE]">
            <CardHeader><CardTitle className="text-lg">{tr('Frissített béta adatvédelmi tájékoztató', 'Updated beta privacy notice')}</CardTitle><CardDescription>{tr('A módosított tájékoztatót nem jelöljük elfogadottnak a jóváhagyásod nélkül.', 'We will not mark the updated notice as accepted without your approval.')}</CardDescription></CardHeader>
            <CardContent><Button disabled={Boolean(action)} onClick={() => void runAction('privacy', async () => { await acceptPrivacyNotice(); setMessage(tr('Az adatvédelmi tájékoztató elfogadása rögzítve.', 'Privacy notice acceptance recorded.')); })}>{action === 'privacy' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{tr('Elolvastam és elfogadom', 'I have read and accept')}</Button></CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" />{tr('Rövid adatvédelmi összefoglaló', 'Privacy summary')}</CardTitle><CardDescription>{tr('A Plan & Pan ingyenes béta. Ez az összefoglaló nem helyettesíti a későbbi, szakmailag felülvizsgált adatvédelmi szabályzatot és felhasználási feltételeket.', 'Plan & Pan is a free beta. This summary does not replace the future professionally reviewed Privacy Policy and Terms.')}</CardDescription></CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>{tr('Az e-mail-címedet a fiók eléréséhez használjuk.', 'Your email address is used for account access.')}</li>
              <li>{tr('A személyre szabáshoz tároljuk a családi beállításokat; az étrendi preferenciák, allergiák és intoleranciák érzékeny adatok lehetnek.', 'Family settings are stored for personalisation; dietary preferences, allergies and intolerances may be sensitive information.')}</li>
              <li>{tr('A heti terveket és bevásárlólistákat az eszközök közötti szinkronizáláshoz tároljuk.', 'Weekly plans and shopping lists are stored for synchronisation across devices.')}</li>
              <li>{tr('Az adatokat nem adjuk el, és nem használunk reklámkövetést vagy a működéshez nem szükséges analitikát.', 'We do not sell your data or add advertising tracking or unrelated analytics.')}</li>
              <li>{tr('Az adataidat letöltheted vagy törölheted. A vendégadatok az eszközödön maradnak, kivéve ha bejelentkezés után felhőbe költözteted őket.', 'You can export or delete your data. Guest data stays on your device unless migrated after sign-in.')}</li>
              <li>{tr('Az alkalmazás működtetéséhez a Supabase és a Vercel szolgáltatásait használjuk.', 'Supabase and Vercel are used to operate the application.')}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Database className="h-5 w-5 text-primary" />{tr('Tárolt adatok összesítése', 'Stored data summary')}</CardTitle></CardHeader>
          <CardContent>
            {summaryLoading ? <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />{tr('Betöltés…', 'Loading…')}</div> : summary ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg border bg-secondary/30 p-3"><Users className="mb-2 h-4 w-4 text-primary" /><p className="text-xl font-bold">{summary.hasFamilySettings ? tr('Igen', 'Yes') : tr('Nem', 'No')}</p><p className="text-xs text-muted-foreground">{tr('Családi beállítás', 'Family settings')}</p></div>
                <div className="rounded-lg border bg-secondary/30 p-3"><p className="text-xl font-bold">{summary.weeklyPlanCount}</p><p className="text-xs text-muted-foreground">{tr('Mentett hét', 'Saved weeks')}</p></div>
                <div className="rounded-lg border bg-secondary/30 p-3"><p className="text-xl font-bold">{summary.shoppingListCount}</p><p className="text-xs text-muted-foreground">{tr('Bevásárlólista', 'Shopping lists')}</p></div>
                <div className="rounded-lg border bg-secondary/30 p-3"><Cloud className="mb-2 h-4 w-4 text-primary" /><p className="text-xs font-semibold leading-relaxed">{formatDate(summary.mostRecentUpdate)}</p><p className="text-xs text-muted-foreground">{tr('Legutóbbi frissítés', 'Latest update')}</p></div>
              </div>
            ) : <Button variant="outline" onClick={() => void loadSummary()}>{tr('Újrapróbálás', 'Try again')}</Button>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{tr('Adataid kezelése', 'Manage your data')}</CardTitle><CardDescription>{tr('A letöltés ember által olvasható UTF-8 JSON-fájlt készít, amely nem tartalmaz tokent vagy jelszót.', 'The download creates a human-readable UTF-8 JSON file with no tokens or passwords.')}</CardDescription></CardHeader>
          <CardContent className="flex flex-col items-start gap-3">
            <Button variant="outline" onClick={() => void handleExport()} disabled={Boolean(action)}>{action === 'export' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}{tr('Adataim letöltése', 'Download my data')}</Button>
            <TypedConfirmation title={tr('Mentett adatok törlése', 'Delete saved data')} description={tr(`A családi beállítások, heti tervek és bevásárlólisták törlődnek. A fiókod megmarad. Írd be: ${expectedConfirmation}`, `Family settings, weekly plans and shopping lists will be deleted. Your account will remain. Type: ${expectedConfirmation}`)} expected={expectedConfirmation} confirmLabel={tr('Mentett adatok törlése', 'Delete saved data')} cancelLabel={tr('Mégse', 'Cancel')} busy={action === 'delete-data'} onConfirm={handleDeleteSavedData}>
              <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10" disabled={Boolean(action)}><Trash2 className="mr-2 h-4 w-4" />{tr('Mentett adatok törlése', 'Delete saved data')}</Button>
            </TypedConfirmation>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{tr('Munkamenetek', 'Sessions')}</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-start gap-3 sm:flex-row">
            <Button variant="outline" disabled={Boolean(action)} onClick={() => void handleSignOut('local')}>{action === 'signout-local' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}{tr('Kijelentkezés ezen az eszközön', 'Sign out on this device')}</Button>
            <Button variant="outline" disabled={Boolean(action)} onClick={() => void handleSignOut('global')}>{action === 'signout-global' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}{tr('Kijelentkezés minden eszközről', 'Sign out on all devices')}</Button>
          </CardContent>
        </Card>

        <Card className="border-destructive/50">
          <CardHeader><CardTitle className="text-destructive">{tr('Veszélyes művelet', 'Danger zone')}</CardTitle><CardDescription>{tr('A végleges fióktörlés nem vonható vissza. A fiók és minden hozzá tartozó Plan & Pan-adat törlődik.', 'Permanent account deletion cannot be undone. Your account and all related Plan & Pan data will be deleted.')}</CardDescription></CardHeader>
          <CardContent>
            <TypedConfirmation title={tr('Fiók végleges törlése', 'Permanently delete account')} description={tr(`Ez végleg törli a fiókodat, profilodat, családi beállításaidat, heti terveidet és bevásárlólistáidat. Írd be: ${expectedConfirmation}`, `This permanently deletes your account, profile, family settings, weekly plans and shopping lists. Type: ${expectedConfirmation}`)} expected={expectedConfirmation} confirmLabel={tr('Fiók végleges törlése', 'Permanently delete account')} cancelLabel={tr('Mégse', 'Cancel')} busy={action === 'delete-account'} onConfirm={handleDeleteAccount}>
              <Button variant="destructive" disabled={Boolean(action)}><Trash2 className="mr-2 h-4 w-4" />{tr('Fiók végleges törlése', 'Permanently delete account')}</Button>
            </TypedConfirmation>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
