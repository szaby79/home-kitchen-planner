import type { User } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export const PRIVACY_NOTICE_VERSION = 'beta-2026-09-v2';

export type UserProfile = {
  id: string;
  privacy_notice_version: string | null;
  privacy_notice_accepted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AuthContextValue = {
  configured: boolean;
  loading: boolean;
  user: User | null;
  profile: UserProfile | null;
  profileUnavailable: boolean;
  sendMagicLink: (email: string) => Promise<void>;
  acceptPrivacyNotice: () => Promise<void>;
  signOut: (scope?: 'local' | 'global') => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
