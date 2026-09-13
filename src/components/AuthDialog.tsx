import { FormEvent, useEffect, useState } from 'react';
import { Loader2, Mail, Settings, ShieldCheck, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRIVACY_NOTICE_VERSION, useAuth } from '@/auth/AuthContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const { configured, loading, user, profile, profileUnavailable, sendMagicLink, acceptPrivacyNotice } = useAuth();
  const { tr } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      const authParams = new URLSearchParams(window.location.hash.slice(1));
      if (authParams.has('error')) {
        setError(tr('A bejelentkezési link érvénytelen vagy lejárt. Kérj egy új e-mailt.', 'The sign-in link is invalid or expired. Request a new email.'));
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      }
    } else {
      setEmailSent(false);
      setError('');
      setAccepted(false);
    }
  }, [open, tr]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (!accepted) {
      setError(tr('A folytatáshoz fogadd el a béta adatvédelmi tájékoztatót.', 'Accept the beta privacy notice to continue.'));
      return;
    }

    setSubmitting(true);
    try {
      await sendMagicLink(email);
      setEmailSent(true);
    } catch {
      setError(tr(
        'A bejelentkezési e-mailt most nem sikerült elküldeni. Ellenőrizd a címet, várj egy percet, majd próbáld újra.',
        'We could not send the sign-in email. Check the address, wait one minute, and try again.',
      ));
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrivacyAcceptance = async () => {
    if (!accepted) {
      setError(tr('A folytatáshoz fogadd el a frissített béta adatvédelmi tájékoztatót.', 'Accept the updated beta privacy notice to continue.'));
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await acceptPrivacyNotice();
      onOpenChange(false);
    } catch {
      setError(tr('Az elfogadást most nem sikerült rögzíteni. Próbáld újra.', 'We could not record your acceptance. Please try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserRound className="h-5 w-5 text-primary" />
            {user ? tr('Fiókod', 'Your account') : tr('Fiók létrehozása / Bejelentkezés', 'Create Account / Sign In')}
          </DialogTitle>
          <DialogDescription>
            {user
              ? tr('Bejelentkezve. A fiók- és adatvédelmi beállításokat a profilmenüben kezelheted.', 'You are signed in. You can manage your account and privacy settings from the profile menu.')
              : tr('Adataid mentéséhez jelentkezz be, vagy használd tovább az alkalmazást vendégként.', 'Sign in to save your data, or keep using the app as a guest.')}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground" role="status">
            <Loader2 className="h-5 w-5 animate-spin" /> {tr('Munkamenet ellenőrzése…', 'Checking session…')}
          </div>
        ) : user ? (
          <div className="space-y-4">
            <div className="rounded-lg border bg-secondary/40 p-4">
              <p className="text-sm text-muted-foreground">{tr('Bejelentkezett e-mail-cím', 'Signed-in email')}</p>
              <p className="break-all font-semibold">{user.email}</p>
            </div>
            {profileUnavailable && (
              <Alert>
                <AlertDescription>{tr('A profiladatok most nem érhetők el. A vendég funkciókat továbbra is használhatod.', 'Profile data is temporarily unavailable. Guest features remain available.')}</AlertDescription>
              </Alert>
            )}
            {profile?.privacy_notice_version !== PRIVACY_NOTICE_VERSION && !profileUnavailable && (
              <div className="space-y-3 rounded-lg border border-[#E4C7AA] bg-[#FFF8EE] p-3 text-sm leading-relaxed">
                <p className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-accent" />{tr('Frissített béta adatvédelmi tájékoztató', 'Updated beta privacy notice')}</p>
                <p className="text-muted-foreground">{tr('A családi beállításokat, heti terveket és bevásárlólistákat a szinkronizáláshoz tároljuk. Az adataidat nem adjuk el. A fiók- és adatvédelmi beállításokat a profilmenüben kezelheted.', 'Family settings, weekly plans and shopping lists are stored for synchronisation. We do not sell your data. You can manage your account and privacy settings from the profile menu.')}</p>
                <div className="flex items-start gap-3">
                  <Checkbox id="updated-privacy-acceptance" checked={accepted} onCheckedChange={(value) => setAccepted(value === true)} disabled={submitting} />
                  <Label htmlFor="updated-privacy-acceptance" className="cursor-pointer text-sm font-normal leading-relaxed">{tr('Elolvastam és elfogadom a frissített béta adatvédelmi tájékoztatót.', 'I have read and accept the updated beta privacy notice.')}</Label>
                </div>
                <Button type="button" className="w-full" onClick={handlePrivacyAcceptance} disabled={submitting}>
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{tr('Elfogadás rögzítése', 'Record acceptance')}
                </Button>
              </div>
            )}
            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            <Button type="button" variant="outline" className="w-full" onClick={() => { onOpenChange(false); navigate('/account'); }} disabled={submitting}>
              <Settings className="mr-2 h-4 w-4" />{tr('Fiók és adatvédelem', 'Account and Privacy')}
            </Button>
          </div>
        ) : emailSent ? (
          <div className="space-y-4">
            <Alert className="border-accent/50 bg-[#F2F7EF]">
              <Mail className="h-4 w-4" />
              <AlertDescription>
                <strong>{tr('Ellenőrizd az e-mail-fiókodat.', 'Check Your Email.')}</strong>{' '}
                {tr('A biztonságos bejelentkezési linket elküldtük. A link egyszer használható.', 'We sent a secure, one-time sign-in link.')}
              </AlertDescription>
            </Alert>
            <Button type="button" variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
              {tr('Folytatás vendégként', 'Continue as Guest')}
            </Button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="account-email">{tr('E-mail-cím', 'Email address')}</Label>
              <Input id="account-email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" disabled={!configured || submitting} />
            </div>

            <div className="rounded-lg border border-[#E4C7AA] bg-[#FFF8EE] p-3 text-sm leading-relaxed">
              <p className="mb-2 flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-accent" />{tr('Béta adatvédelmi tájékoztató', 'Beta privacy notice')}</p>
              <p className="text-muted-foreground">
                {tr(
                  'Az e-mail-címedet kizárólag a fiókod eléréséhez használjuk. A Plan & Pan jelenleg ingyenes béta. Csak a működéshez szükséges adatokat gyűjtjük, és az adataidat nem adjuk el. A fiók- és adatvédelmi beállításokat a profilmenüben kezelheted.',
                  'Your email address is used only for account access. Plan & Pan is currently a free beta. We collect only the data needed to operate the app and do not sell your data. You can manage your account and privacy settings from the profile menu.',
                )}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="privacy-acceptance" checked={accepted} onCheckedChange={(value) => setAccepted(value === true)} disabled={!configured || submitting} />
              <Label htmlFor="privacy-acceptance" className="cursor-pointer text-sm font-normal leading-relaxed">
                {tr('Elolvastam és elfogadom a béta adatvédelmi tájékoztatót.', 'I have read and accept the beta privacy notice.')}
              </Label>
            </div>

            {!configured && (
              <Alert>
                <AlertDescription>{tr('A fiókos bejelentkezés beállítása még folyamatban van. Az alkalmazást addig vendégként használhatod.', 'Account sign-in is still being configured. You can use the app as a guest in the meantime.')}</AlertDescription>
              </Alert>
            )}
            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

            <Button type="submit" className="w-full" disabled={!configured || submitting || !email.trim()}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
              {tr('Bejelentkezés e-mail-címmel', 'Sign in with Email')}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
              {tr('Folytatás vendégként', 'Continue as Guest')}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
