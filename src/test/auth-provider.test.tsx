import { act, render, waitFor } from '@testing-library/react';
import type { User } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthProvider } from '@/auth/AuthProvider';
import { PRIVACY_NOTICE_VERSION, type AuthContextValue, useAuth } from '@/auth/AuthContext';

const supabaseMocks = vi.hoisted(() => ({
  getSession: vi.fn(),
  onAuthStateChange: vi.fn(),
  signInWithOtp: vi.fn(),
  verifyOtp: vi.fn(),
  signOut: vi.fn(),
  from: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: {
    auth: {
      getSession: supabaseMocks.getSession,
      onAuthStateChange: supabaseMocks.onAuthStateChange,
      signInWithOtp: supabaseMocks.signInWithOtp,
      verifyOtp: supabaseMocks.verifyOtp,
      signOut: supabaseMocks.signOut,
    },
    from: supabaseMocks.from,
  },
}));

vi.mock('@/lib/localPlanPanData', () => ({ clearUserCloudCaches: vi.fn() }));

let authValue: AuthContextValue | null = null;

function AuthProbe() {
  authValue = useAuth();
  return null;
}

describe('AuthProvider email OTP integration', () => {
  beforeEach(() => {
    authValue = null;
    supabaseMocks.getSession.mockReset().mockResolvedValue({ data: { session: null }, error: null });
    supabaseMocks.onAuthStateChange.mockReset().mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
    supabaseMocks.signInWithOtp.mockReset().mockResolvedValue({ error: null });
    supabaseMocks.verifyOtp.mockReset();
    supabaseMocks.signOut.mockReset().mockResolvedValue({ error: null });
    supabaseMocks.from.mockReset();
  });

  it('requests an in-app OTP with trimmed email and explicit privacy metadata', async () => {
    render(<AuthProvider><AuthProbe /></AuthProvider>);
    await waitFor(() => expect(authValue?.loading).toBe(false));

    await act(async () => authValue?.sendEmailOtp('  tester@example.com  '));

    expect(supabaseMocks.signInWithOtp).toHaveBeenCalledWith({
      email: 'tester@example.com',
      options: {
        shouldCreateUser: true,
        data: { privacy_notice_version: PRIVACY_NOTICE_VERSION },
      },
    });
  });

  it('verifies the code and records acceptance only on the authenticated user profile', async () => {
    const user = { id: 'otp-user-id', email: 'tester@example.com' } as User;
    const session = { user };
    const acceptedProfile = {
      id: user.id,
      privacy_notice_version: PRIVACY_NOTICE_VERSION,
      privacy_notice_accepted_at: '2026-09-18T00:00:00.000Z',
      created_at: '2026-09-18T00:00:00.000Z',
      updated_at: '2026-09-18T00:00:00.000Z',
    };
    const single = vi.fn().mockResolvedValue({ data: acceptedProfile, error: null });
    const select = vi.fn().mockReturnValue({ single });
    const eq = vi.fn().mockReturnValue({ select });
    const update = vi.fn().mockReturnValue({ eq });
    supabaseMocks.from.mockReturnValue({ update });
    supabaseMocks.verifyOtp.mockResolvedValue({ data: { session, user }, error: null });

    render(<AuthProvider><AuthProbe /></AuthProvider>);
    await waitFor(() => expect(authValue?.loading).toBe(false));
    await act(async () => authValue?.verifyEmailOtp(' tester@example.com ', ' 123456 '));

    expect(supabaseMocks.verifyOtp).toHaveBeenCalledWith({
      email: 'tester@example.com',
      token: '123456',
      type: 'email',
    });
    expect(supabaseMocks.from).toHaveBeenCalledWith('profiles');
    expect(update).toHaveBeenCalledWith(expect.objectContaining({
      privacy_notice_version: PRIVACY_NOTICE_VERSION,
      privacy_notice_accepted_at: expect.any(String),
    }));
    expect(eq).toHaveBeenCalledWith('id', user.id);
    expect(authValue?.user?.id).toBe(user.id);
    expect(authValue?.profile).toEqual(acceptedProfile);
  });
});
