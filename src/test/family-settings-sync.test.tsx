import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PREFERENCES_KEY, useMenuPreferences } from '@/hooks/useMenuPreferences';
import { MenuPreferencesProvider } from '@/providers/MenuPreferencesProvider';
import { DEFAULT_MENU_PREFERENCES, MenuPreferences } from '@/types/recipe';

const authState = vi.hoisted(() => ({
  loading: false,
  user: null as { id: string } | null,
}));

const cloud = vi.hoisted(() => ({
  fetch: vi.fn(),
  upsert: vi.fn(),
}));

vi.mock('@/auth/AuthContext', () => ({
  useAuth: () => authState,
}));

vi.mock('@/lib/familySettings', () => ({
  fetchFamilySettings: cloud.fetch,
  upsertFamilySettings: cloud.upsert,
}));

function preferences(familySize: number): MenuPreferences {
  return { ...DEFAULT_MENU_PREFERENCES, familySize };
}

function Probe() {
  const { preferences: value, savePreferences, syncStatus } = useMenuPreferences();
  return <>
    <span data-testid="family-size">{value.familySize}</span>
    <span data-testid="sync-status">{syncStatus}</span>
    <button type="button" onClick={() => savePreferences(preferences(5))}>save-five</button>
    <button type="button" onClick={() => savePreferences(preferences(6))}>save-six</button>
  </>;
}

function renderProvider() {
  return render(<MenuPreferencesProvider><Probe /></MenuPreferencesProvider>);
}

describe('family settings storage selection and sync', () => {
  beforeEach(() => {
    localStorage.clear();
    authState.loading = false;
    authState.user = null;
    cloud.fetch.mockReset().mockResolvedValue(null);
    cloud.upsert.mockReset().mockImplementation(async (_userId: string, settings: MenuPreferences) => ({
      settings,
      updatedAt: '2026-09-11T12:00:00.000Z',
    }));
  });

  it('keeps guest settings local and never writes them to Supabase', async () => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences(3)));
    renderProvider();

    expect(screen.getByTestId('family-size')).toHaveTextContent('3');
    fireEvent.click(screen.getByRole('button', { name: 'save-five' }));

    expect(JSON.parse(localStorage.getItem(PREFERENCES_KEY)!).familySize).toBe(5);
    expect(cloud.fetch).not.toHaveBeenCalled();
    expect(cloud.upsert).not.toHaveBeenCalled();
  });

  it('uploads valid local settings when the signed-in account has no cloud record', async () => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify({ familySize: 3 }));
    authState.user = { id: 'user-a' };
    renderProvider();

    await waitFor(() => expect(screen.getByTestId('family-size')).toHaveTextContent('3'));
    await waitFor(() => expect(cloud.upsert).toHaveBeenCalledWith('user-a', preferences(3)), { timeout: 1500 });
    expect(screen.getByTestId('sync-status')).toHaveTextContent('saved');
  });

  it('treats an existing cloud record as authoritative over guest data', async () => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences(3)));
    authState.user = { id: 'user-a' };
    cloud.fetch.mockResolvedValue({ settings: preferences(6), updatedAt: '2026-09-11T11:00:00.000Z' });
    renderProvider();

    await waitFor(() => expect(screen.getByTestId('family-size')).toHaveTextContent('6'));
    expect(screen.getByTestId('sync-status')).toHaveTextContent('saved');
    expect(cloud.upsert).not.toHaveBeenCalled();
    expect(JSON.parse(localStorage.getItem(PREFERENCES_KEY)!).familySize).toBe(3);
  });

  it('debounces rapid signed-in changes into one cloud write', async () => {
    authState.user = { id: 'user-a' };
    cloud.fetch.mockResolvedValue({ settings: preferences(4), updatedAt: '2026-09-11T11:00:00.000Z' });
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('sync-status')).toHaveTextContent('saved'));

    fireEvent.click(screen.getByRole('button', { name: 'save-five' }));
    fireEvent.click(screen.getByRole('button', { name: 'save-six' }));
    expect(screen.getByTestId('sync-status')).toHaveTextContent('saving');

    await waitFor(() => expect(cloud.upsert).toHaveBeenCalledTimes(1), { timeout: 1500 });
    expect(cloud.upsert).toHaveBeenCalledWith('user-a', preferences(6));
  });

  it('does not write defaults before the authoritative cloud load finishes', async () => {
    authState.user = { id: 'user-a' };
    let finishLoad: (value: { settings: MenuPreferences; updatedAt: string }) => void = () => undefined;
    cloud.fetch.mockReturnValue(new Promise(resolve => { finishLoad = resolve; }));
    renderProvider();

    fireEvent.click(screen.getByRole('button', { name: 'save-five' }));
    await new Promise(resolve => window.setTimeout(resolve, 750));
    expect(cloud.upsert).not.toHaveBeenCalled();

    await act(async () => finishLoad({ settings: preferences(6), updatedAt: '2026-09-11T11:00:00.000Z' }));
    await waitFor(() => expect(cloud.upsert).toHaveBeenCalledWith('user-a', preferences(5)), { timeout: 1500 });
  });

  it('restores the separate guest state immediately after sign-out', async () => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences(3)));
    authState.user = { id: 'user-a' };
    cloud.fetch.mockResolvedValue({ settings: preferences(6), updatedAt: '2026-09-11T11:00:00.000Z' });
    const view = renderProvider();
    await waitFor(() => expect(screen.getByTestId('family-size')).toHaveTextContent('6'));

    authState.user = null;
    await act(async () => view.rerender(<MenuPreferencesProvider><Probe /></MenuPreferencesProvider>));

    await waitFor(() => expect(screen.getByTestId('family-size')).toHaveTextContent('3'));
    expect(screen.getByTestId('sync-status')).toHaveTextContent('idle');

    authState.user = { id: 'user-a' };
    await act(async () => view.rerender(<MenuPreferencesProvider><Probe /></MenuPreferencesProvider>));
    await waitFor(() => expect(screen.getByTestId('family-size')).toHaveTextContent('6'));
    expect(cloud.fetch).toHaveBeenCalledTimes(2);
  });

  it('loads the same cloud settings after a provider remount like a refresh or another device', async () => {
    authState.user = { id: 'user-a' };
    cloud.fetch.mockResolvedValue({ settings: preferences(6), updatedAt: '2026-09-11T11:00:00.000Z' });
    const firstView = renderProvider();
    await waitFor(() => expect(screen.getByTestId('family-size')).toHaveTextContent('6'));
    firstView.unmount();

    renderProvider();
    await waitFor(() => expect(screen.getByTestId('family-size')).toHaveTextContent('6'));
    expect(cloud.fetch).toHaveBeenCalledTimes(2);
  });

  it('keeps a failed account change user-scoped for a later retry', async () => {
    authState.user = { id: 'user-a' };
    cloud.fetch.mockResolvedValue({ settings: preferences(4), updatedAt: '2026-09-11T11:00:00.000Z' });
    cloud.upsert.mockRejectedValueOnce(new Error('offline'));
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('sync-status')).toHaveTextContent('saved'));

    fireEvent.click(screen.getByRole('button', { name: 'save-five' }));
    await waitFor(() => expect(screen.getByTestId('sync-status')).toHaveTextContent('error'), { timeout: 1500 });

    expect(localStorage.getItem('plan-pan-family-settings-pending-v1:user-a')).toContain('"familySize":5');
    expect(JSON.parse(localStorage.getItem(PREFERENCES_KEY) ?? 'null')).toBeNull();
  });
});
