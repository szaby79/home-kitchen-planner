import type { Session } from '@supabase/supabase-js';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { AuthContext, AuthContextValue, PRIVACY_NOTICE_VERSION, UserProfile } from '@/auth/AuthContext';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { clearUserCloudCaches } from '@/lib/localPlanPanData';

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
        .select('id, privacy_notice_version, privacy_notice_accepted_at, created_at, updated_at')
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
    sendMagicLink: async (email: string) => {
      if (!supabase) throw new Error('AUTH_NOT_CONFIGURED');
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: window.location.origin,
          shouldCreateUser: true,
          data: {
            privacy_notice_version: PRIVACY_NOTICE_VERSION,
          },
        },
      });
      if (error) throw error;
    },
    acceptPrivacyNotice: async () => {
      if (!supabase || !session?.user) throw new Error('AUTH_NOT_CONFIGURED');
      const acceptedAt = new Date().toISOString();
      const { data, error } = await supabase
        .from('profiles')
        .update({ privacy_notice_version: PRIVACY_NOTICE_VERSION, privacy_notice_accepted_at: acceptedAt })
        .eq('id', session.user.id)
        .select('id, privacy_notice_version, privacy_notice_accepted_at, created_at, updated_at')
        .single();
      if (error || !data) throw new Error('PROFILE_UPDATE_FAILED');
      setProfile(data as UserProfile);
      setProfileUnavailable(false);
    },
    signOut: async (scope = 'local') => {
      if (!supabase) return;
      const { error } = await supabase.auth.signOut({ scope });
      if (error) throw error;
      if (session?.user.id) clearUserCloudCaches(session.user.id);
    },
  }), [loading, profile, profileUnavailable, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
