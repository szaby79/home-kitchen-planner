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
  sendMagicLink: vi.fn<() => Promise<void>>(),
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

describe('account dialog', () => {
  beforeEach(() => {
    localStorage.clear();
    authState.configured = true;
    authState.loading = false;
    authState.user = null;
    authState.profile = null;
    authState.profileUnavailable = false;
    authState.sendMagicLink.mockReset().mockResolvedValue(undefined);
    authState.acceptPrivacyNotice.mockReset().mockResolvedValue(undefined);
    authState.signOut.mockReset().mockResolvedValue(undefined);
  });

  it('keeps guest mode available', () => {
    const onOpenChange = renderDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Folytatás vendégként' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('requires explicit privacy acceptance before requesting a link', () => {
    renderDialog();
    fireEvent.change(screen.getByLabelText('E-mail-cím'), { target: { value: 'tester@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Bejelentkezés e-mail-címmel' }));

    expect(screen.getByText('A folytatáshoz fogadd el a béta adatvédelmi tájékoztatót.')).toBeInTheDocument();
    expect(authState.sendMagicLink).not.toHaveBeenCalled();
  });

  it('requests a magic link and shows the success state', async () => {
    renderDialog();
    fireEvent.change(screen.getByLabelText('E-mail-cím'), { target: { value: 'tester@example.com' } });
    fireEvent.click(screen.getByLabelText('Elolvastam és elfogadom a béta adatvédelmi tájékoztatót.'));
    fireEvent.click(screen.getByRole('button', { name: 'Bejelentkezés e-mail-címmel' }));

    await waitFor(() => expect(authState.sendMagicLink).toHaveBeenCalledWith('tester@example.com'));
    expect(await screen.findByText('Ellenőrizd az e-mail-fiókodat.')).toBeInTheDocument();
  });

  it('shows the English account and privacy text', () => {
    localStorage.setItem('plan-pan-language', 'en');
    renderDialog();

    expect(screen.getByRole('heading', { name: 'Create Account / Sign In' })).toBeInTheDocument();
    expect(screen.getByText('Beta privacy notice')).toBeInTheDocument();
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
