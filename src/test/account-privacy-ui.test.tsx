import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AccountPrivacyPage from '@/pages/AccountPrivacyPage';
import { LanguageProvider } from '@/i18n/LanguageContext';

const authState = vi.hoisted(() => ({
  user: null as null | { id: string; email: string; created_at: string },
  profile: null as null | { privacy_notice_version: string | null; privacy_notice_accepted_at: string | null },
  loading: false,
  profileUnavailable: false,
  acceptPrivacyNotice: vi.fn(),
  signOut: vi.fn(),
}));

const account = vi.hoisted(() => ({
  fetch: vi.fn(),
  summarize: vi.fn(),
  createExport: vi.fn(),
  deleteSaved: vi.fn(),
  deleteAccount: vi.fn(),
}));

vi.mock('@/auth/AuthContext', async importOriginal => ({
  ...await importOriginal<typeof import('@/auth/AuthContext')>(),
  useAuth: () => authState,
}));
vi.mock('@/components/Layout', () => ({ useAppContext: () => ({ cloudSyncStatus: 'saved' }) }));
vi.mock('@/hooks/useMenuPreferences', () => ({ useMenuPreferences: () => ({ syncStatus: 'saved' }) }));
vi.mock('@/lib/accountData', () => ({
  fetchStoredDataBundle: account.fetch,
  summarizeStoredData: account.summarize,
  createDataExport: account.createExport,
  deleteMySavedData: account.deleteSaved,
  permanentlyDeleteAccount: account.deleteAccount,
}));
vi.mock('@/lib/supabase', () => ({ supabase: { auth: { getSession: vi.fn(), signOut: vi.fn() } } }));

function renderPage(initialEntry = '/account') {
  return render(<MemoryRouter initialEntries={[initialEntry]}><LanguageProvider><AccountPrivacyPage /></LanguageProvider></MemoryRouter>);
}

describe('Account and Privacy screen', () => {
  beforeEach(() => {
    localStorage.clear();
    authState.user = { id: 'user-a', email: 'tester@example.com', created_at: '2026-09-01T08:00:00.000Z' };
    authState.profile = { privacy_notice_version: 'beta-2026-09-v2', privacy_notice_accepted_at: '2026-09-13T08:00:00.000Z' };
    authState.loading = false;
    authState.profileUnavailable = false;
    authState.acceptPrivacyNotice.mockReset().mockResolvedValue(undefined);
    authState.signOut.mockReset().mockResolvedValue(undefined);
    account.fetch.mockReset().mockResolvedValue({ weeklyPlans: [] });
    account.summarize.mockReset().mockReturnValue({ hasFamilySettings: true, weeklyPlanCount: 2, shoppingListCount: 2, mostRecentUpdate: '2026-09-13T10:00:00.000Z' });
    account.createExport.mockReset().mockReturnValue({ exportVersion: 'plan-and-pan-export-v1' });
    account.deleteSaved.mockReset().mockRejectedValue(new Error('offline'));
    account.deleteAccount.mockReset().mockRejectedValue(new Error('offline'));
  });

  it('shows current-account metadata and current-user storage summary in Hungarian', async () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Fiók és adatvédelem' })).toBeInTheDocument();
    expect(screen.getByText('tester@example.com')).toBeInTheDocument();
    await waitFor(() => expect(account.fetch).toHaveBeenCalledWith('user-a'));
    expect(screen.getAllByText('2', { selector: 'p' })).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Adataim letöltése' })).toBeInTheDocument();
  });

  it('renders English privacy and session controls without horizontal-only actions', async () => {
    localStorage.setItem('plan-pan-language', 'en');
    renderPage();
    expect(screen.getByRole('heading', { name: 'Account and Privacy' })).toBeInTheDocument();
    expect(screen.getByText('Plan & Pan is a free beta. This summary does not replace the future professionally reviewed Privacy Policy and Terms.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign out on this device' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign out on all devices' })).toBeInTheDocument();
    await waitFor(() => expect(account.fetch).toHaveBeenCalledWith('user-a'));
  });

  it('keeps destructive confirmation disabled until the localized word is typed', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Mentett adatok törlése' }));
    const finalButton = screen.getAllByRole('button', { name: 'Mentett adatok törlése' }).at(-1)!;
    expect(finalButton).toBeDisabled();
    fireEvent.change(screen.getByLabelText('TÖRLÉS'), { target: { value: 'TÖRLÉS' } });
    expect(finalButton).toBeEnabled();
    fireEvent.click(finalButton);
    await waitFor(() => expect(account.deleteSaved).toHaveBeenCalledTimes(1));
    expect(await screen.findByText('A művelet most nem sikerült. Az adataid nem lettek törölve.')).toBeInTheDocument();
  });

  it('passes the selected device scope to Supabase sign-out', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Kijelentkezés ezen az eszközön' }));
    await waitFor(() => expect(authState.signOut).toHaveBeenCalledWith('local'));
    fireEvent.click(screen.getByRole('button', { name: 'Kijelentkezés minden eszközről' }));
    await waitFor(() => expect(authState.signOut).toHaveBeenCalledWith('global'));
  });

  it('requires typed confirmation for permanent account deletion', async () => {
    renderPage();
    await waitFor(() => expect(account.fetch).toHaveBeenCalledWith('user-a'));
    fireEvent.click(screen.getByRole('button', { name: 'Fiók végleges törlése' }));
    const finalButton = screen.getAllByRole('button', { name: 'Fiók végleges törlése' }).at(-1)!;
    expect(finalButton).toBeDisabled();
    fireEvent.change(screen.getByLabelText('TÖRLÉS'), { target: { value: 'TÖRLÉS' } });
    expect(finalButton).toBeEnabled();
  });

  it('shows guest-local controls but hides cloud and account deletion actions', () => {
    authState.user = null;
    authState.profile = null;
    renderPage();
    expect(screen.getByText('Vendégként a menüterv és a bevásárlólista ezen az eszközön marad. Fiók nélkül is használhatod a Plan & Pant.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Adataim letöltése' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Fiók végleges törlése' })).not.toBeInTheDocument();
  });
});
