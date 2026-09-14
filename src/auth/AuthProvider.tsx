import type { Session } from '@supabase/supabase-js';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { AuthContext, AuthContextValue, PRIVACY_NOTICE_VERSION, UserProfile } from '@/auth/AuthContext';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { clearUserCloudCaches } from '@/lib/localPlanPanData';

const PROFILE_COLUMNS = 'id, privacy_notice_version, privacy_notice_accepted_at, created_at, updated_at';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileUnavailable, setProfileUnavailable] = useState(false);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;

    let active = true;

    const loadProfile = async (nextSession: Session | null) => {
      if (!nextSession) {
        if (active) {
          setProfile(null);
          setProfileUnavailable(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select(PROFILE_COLUMNS)
        .eq('id', nextSession.user.id)
        .maybeSingle();

      if (!active) return;
      setProfile(error ? null : (data as UserProfile | null));
      setProfileUnavailable(Boolean(error || !data));
    };

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      const restoredSession = error ? null : data.session;
      setSession(restoredSession);
      setLoading(false);
      void loadProfile(restoredSession);
    }).catch(() => {
      if (!active) return;
      setSession(null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setLoading(false);
      window.setTimeout(() => void loadProfile(nextSession), 0);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    configured: isSupabaseConfigured,
    loading,
    user: session?.user ?? null,
    profile,
    profileUnavailable,
    sendEmailOtp: async (email: string) => {
      if (!supabase) throw new Error('AUTH_NOT_CONFIGURED');
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          shouldCreateUser: true,
          data: {
            privacy_notice_version: PRIVACY_NOTICE_VERSION,
          },
        },
      });
      if (error) throw error;
    },
    verifyEmailOtp: async (email: string, token: string) => {
      if (!supabase) throw new Error('AUTH_NOT_CONFIGURED');
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: token.trim(),
        type: 'email',
      });
      if (error || !data.session || !data.user) throw error ?? new Error('OTP_VERIFICATION_FAILED');

      setSession(data.session);
      const acceptedAt = new Date().toISOString();
      const { data: acceptedProfile, error: profileError } = await supabase
        .from('profiles')
        .update({
          privacy_notice_version: PRIVACY_NOTICE_VERSION,
          privacy_notice_accepted_at: acceptedAt,
        })
        .eq('id', data.user.id)
        .select(PROFILE_COLUMNS)
        .single();

      if (!profileError && acceptedProfile) {
        setProfile(acceptedProfile as UserProfile);
        setProfileUnavailable(false);
      }
    },
    acceptPrivacyNotice: async () => {
      if (!supabase || !session?.user) throw new Error('AUTH_NOT_CONFIGURED');
      const acceptedAt = new Date().toISOString();
      const { data, error } = await supabase
        .from('profiles')
        .update({ privacy_notice_version: PRIVACY_NOTICE_VERSION, privacy_notice_accepted_at: acceptedAt })
        .eq('id', session.user.id)
        .select(PROFILE_COLUMNS)
        .single();
      if (error || !data) throw new Error('PROFILE_UPDATE_FAILED');
      setProfile(data as UserProfile);
      setProfileUnavailable(false);
    },
    signOut: async (scope = 'local') => {
      if (!supabase) return;
      const userId = session?.user.id;
      const { error } = await supabase.auth.signOut({ scope });
      if (error) throw error;
      if (userId) clearUserCloudCaches(userId);
      setSession(null);
      setProfile(null);
      setProfileUnavailable(false);
    },
  }), [loading, profile, profileUnavailable, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
