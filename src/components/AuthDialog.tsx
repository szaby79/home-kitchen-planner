import { FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, KeyRound, Loader2, Mail, Settings, ShieldCheck, UserRound } from 'lucide-react';
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

const RESEND_COOLDOWN_SECONDS = 60;

function isRateLimitError(error: unknown) {
  if (!error || typeof error !== 'object') return false;
  const candidate = error as { status?: number; code?: string; message?: string };
  return candidate.status === 429
    || candidate.code === 'over_email_send_rate_limit'
    || /rate limit|too many|seconds/i.test(candidate.message ?? '');
}

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const { configured, loading, user, profile, profileUnavailable, sendEmailOtp, verifyEmailOtp, acceptPrivacyNotice } = useAuth();
  const { tr } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setEmail('');
      setOtp('');
      setOtpRequested(false);
      setCooldown(0);
      setError('');
      setAccepted(false);
    }
  }, [open]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(() => {
      setCooldown((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  const sendCode = async () => {
    setError('');
    setSubmitting(true);
    try {
      await sendEmailOtp(email);
      setOtpRequested(true);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (sendError) {
      setError(isRateLimitError(sendError)
        ? tr(
          'Túl sok belépési kérést küldtünk rövid időn belül. Kérlek, várj egy kicsit, majd próbáld újra.',
          'Too many sign-in requests were sent in a short time. Please wait a little and try again.',
        )
        : tr(
          'A belépési kódot most nem sikerült elküldeni. Ellenőrizd a címet, majd próbáld újra.',
          'We could not send the sign-in code. Check the address and try again.',
        ));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!accepted) {
      setError(tr('A folytatáshoz fogadd el a béta adatvédelmi tájékoztatót.', 'Accept the beta privacy notice to continue.'));
      return;
    }
    await sendCode();
  };

  const handleOtpSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (otp.length < 6) {
      setError(tr('Írd be az e-mailben kapott teljes belépési kódot.', 'Enter the complete sign-in code from your email.'));
      return;
    }

    setSubmitting(true);
    try {
      await verifyEmailOtp(email, otp);
      onOpenChange(false);
    } catch {
      setError(tr(
        'A belépési kód hibás vagy lejárt. Ellenőrizd a kódot, vagy kérj újat.',
        'The sign-in code is incorrect or expired. Check the code or request a new one.',
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
            {user
              ? tr('Fiókod', 'Your account')
              : otpRequested
                ? tr('Ellenőrizd az e-mailed', 'Check your email')
                : tr('Belépés', 'Sign in')}
          </DialogTitle>
          <DialogDescription>
            {user
              ? tr('Bejelentkezve. A fiók- és adatvédelmi beállításokat a profilmenüben kezelheted.', 'You are signed in. You can manage your account and privacy settings from the profile menu.')
              : otpRequested
                ? tr(`Elküldtünk egy belépési kódot erre a címre: ${email}`, `We sent a sign-in code to: ${email}`)
                : tr('Adataid mentéséhez jelentkezz be, vagy használd tovább az alkalmazást vendégként.', 'Sign in to save your data, or keep using the app as a guest.')}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground" role="status">
            <Loader2 className="h-5 w-5 animate-spin" /> {tr('Munkamenet visszaállítása…', 'Restoring session…')}
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
        ) : otpRequested ? (
          <form className="space-y-4" onSubmit={handleOtpSubmit}>
            <div className="space-y-2">
              <Label htmlFor="account-otp">{tr('Belépési kód', 'Sign-in code')}</Label>
              <Input
                id="account-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]*"
                minLength={6}
                maxLength={8}
                required
                value={otp}
                onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 8))}
                placeholder="123456"
                className="h-12 text-center text-2xl tracking-[0.3em]"
                disabled={submitting}
              />
            </div>
            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            <Button type="submit" className="w-full" disabled={submitting || otp.length < 6}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
              {tr('Belépés', 'Sign in')}
            </Button>
            <Button type="button" variant="outline" className="w-full" disabled={submitting || cooldown > 0} onClick={() => void sendCode()}>
              <Mail className="mr-2 h-4 w-4" />
              {cooldown > 0
                ? tr(`Kód újraküldése (${cooldown} mp)`, `Resend code (${cooldown}s)`)
                : tr('Kód újraküldése', 'Resend code')}
            </Button>
            <Button type="button" variant="ghost" className="w-full" disabled={submitting} onClick={() => { setOtpRequested(false); setOtp(''); setError(''); }}>
              <ArrowLeft className="mr-2 h-4 w-4" />{tr('Másik e-mail-cím használata', 'Use another email address')}
            </Button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleEmailSubmit}>
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
              {tr('Belépési kód küldése', 'Send sign-in code')}
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
