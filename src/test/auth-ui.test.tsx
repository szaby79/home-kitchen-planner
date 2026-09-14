import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AuthDialog from '@/components/AuthDialog';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { MemoryRouter } from 'react-router-dom';

const authState = vi.hoisted(() => ({
  configured: true,
  loading: false,
  user: null as { email?: string } | null,
  profile: null as { privacy_notice_version: string | null } | null,
  profileUnavailable: false,
  sendEmailOtp: vi.fn<() => Promise<void>>(),
  verifyEmailOtp: vi.fn<() => Promise<void>>(),
  acceptPrivacyNotice: vi.fn<() => Promise<void>>(),
  signOut: vi.fn<() => Promise<void>>(),
}));

vi.mock('@/auth/AuthContext', () => ({
  PRIVACY_NOTICE_VERSION: 'beta-2026-09-v2',
  useAuth: () => authState,
}));

function renderDialog(onOpenChange = vi.fn()) {
  render(
    <MemoryRouter>
      <LanguageProvider>
        <AuthDialog open onOpenChange={onOpenChange} />
      </LanguageProvider>
    </MemoryRouter>,
  );
  return onOpenChange;
}

async function requestOtp() {
  fireEvent.change(screen.getByLabelText('E-mail-cím'), { target: { value: 'tester@example.com' } });
  fireEvent.click(screen.getByLabelText('Elolvastam és elfogadom a béta adatvédelmi tájékoztatót.'));
  fireEvent.click(screen.getByRole('button', { name: 'Belépési kód küldése' }));
  await screen.findByLabelText('Belépési kód');
}

describe('account dialog', () => {
  beforeEach(() => {
    localStorage.clear();
    authState.configured = true;
    authState.loading = false;
    authState.user = null;
    authState.profile = null;
    authState.profileUnavailable = false;
    authState.sendEmailOtp.mockReset().mockResolvedValue(undefined);
    authState.verifyEmailOtp.mockReset().mockResolvedValue(undefined);
    authState.acceptPrivacyNotice.mockReset().mockResolvedValue(undefined);
    authState.signOut.mockReset().mockResolvedValue(undefined);
  });

  it('keeps guest mode available', () => {
    const onOpenChange = renderDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Folytatás vendégként' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('shows a restoring state before deciding whether the user is signed in', () => {
    authState.loading = true;
    renderDialog();

    expect(screen.getByRole('status')).toHaveTextContent('Munkamenet visszaállítása…');
    expect(screen.queryByLabelText('E-mail-cím')).not.toBeInTheDocument();
  });

  it('requires explicit privacy acceptance before requesting a code', () => {
    renderDialog();
    fireEvent.change(screen.getByLabelText('E-mail-cím'), { target: { value: 'tester@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Belépési kód küldése' }));

    expect(screen.getByText('A folytatáshoz fogadd el a béta adatvédelmi tájékoztatót.')).toBeInTheDocument();
    expect(authState.sendEmailOtp).not.toHaveBeenCalled();
  });

  it('requests an email code and keeps verification inside the dialog', async () => {
    renderDialog();
    await requestOtp();

    expect(authState.sendEmailOtp).toHaveBeenCalledWith('tester@example.com');
    expect(screen.getByRole('heading', { name: 'Ellenőrizd az e-mailed' })).toBeInTheDocument();
    expect(screen.getByText(/tester@example.com/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Kód újraküldése/ })).toBeDisabled();
  });

  it('verifies the email OTP and closes after successful sign-in', async () => {
    const onOpenChange = renderDialog();
    await requestOtp();
    fireEvent.change(screen.getByLabelText('Belépési kód'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Belépés' }));

    await waitFor(() => expect(authState.verifyEmailOtp).toHaveBeenCalledWith('tester@example.com', '123456'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('shows a safe Hungarian rate-limit message', async () => {
    authState.sendEmailOtp.mockRejectedValueOnce({ status: 429, message: 'rate limit' });
    renderDialog();
    fireEvent.change(screen.getByLabelText('E-mail-cím'), { target: { value: 'tester@example.com' } });
    fireEvent.click(screen.getByLabelText('Elolvastam és elfogadom a béta adatvédelmi tájékoztatót.'));
    fireEvent.click(screen.getByRole('button', { name: 'Belépési kód küldése' }));

    expect(await screen.findByText(/Túl sok belépési kérést/)).toBeInTheDocument();
    expect(screen.queryByLabelText('Belépési kód')).not.toBeInTheDocument();
  });

  it('shows the English OTP sign-in text', () => {
    localStorage.setItem('plan-pan-language', 'en');
    renderDialog();

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByText('Beta privacy notice')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send sign-in code' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue as Guest' })).toBeInTheDocument();
  });

  it('does not silently accept an updated notice for an existing signed-in user', async () => {
    authState.user = { email: 'tester@example.com' };
    authState.profile = { privacy_notice_version: 'beta-2026-09-v1' };
    renderDialog();

    expect(screen.getByText('Frissített béta adatvédelmi tájékoztató')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Elfogadás rögzítése' }));
    expect(authState.acceptPrivacyNotice).not.toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText('Elolvastam és elfogadom a frissített béta adatvédelmi tájékoztatót.'));
    fireEvent.click(screen.getByRole('button', { name: 'Elfogadás rögzítése' }));
    await waitFor(() => expect(authState.acceptPrivacyNotice).toHaveBeenCalledTimes(1));
  });
});
