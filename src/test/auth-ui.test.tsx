import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AuthDialog from '@/components/AuthDialog';
import { LanguageProvider } from '@/i18n/LanguageContext';

const authState = vi.hoisted(() => ({
  configured: true,
  loading: false,
  user: null as { email?: string } | null,
  profileUnavailable: false,
  sendMagicLink: vi.fn<() => Promise<void>>(),
  signOut: vi.fn<() => Promise<void>>(),
}));

vi.mock('@/auth/AuthContext', () => ({
  useAuth: () => authState,
}));

function renderDialog(onOpenChange = vi.fn()) {
  render(
    <LanguageProvider>
      <AuthDialog open onOpenChange={onOpenChange} />
    </LanguageProvider>,
  );
  return onOpenChange;
}

describe('account dialog', () => {
  beforeEach(() => {
    localStorage.clear();
    authState.configured = true;
    authState.loading = false;
    authState.user = null;
    authState.profileUnavailable = false;
    authState.sendMagicLink.mockReset().mockResolvedValue(undefined);
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
});
