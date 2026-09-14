import { supabase } from '@/lib/supabase';

export const DATA_EXPORT_VERSION = 'plan-and-pan-export-v1';

export type PrivacyAcceptance = {
  noticeVersion: string;
  acceptedAt: string;
};

export type StoredDataBundle = {
  profile: {
    privacyNoticeVersion: string | null;
    privacyNoticeAcceptedAt: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  privacyAcceptances: PrivacyAcceptance[];
  familySettings: {
    settings: unknown;
    createdAt: string;
    updatedAt: string;
  } | null;
  weeklyPlans: Array<{
    weekStart: string;
    menuData: unknown;
    shoppingList: unknown;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type StoredDataSummary = {
  hasFamilySettings: boolean;
  weeklyPlanCount: number;
  shoppingListCount: number;
  mostRecentUpdate: string | null;
};

function requireSupabase() {
  if (!supabase) throw new Error('CLOUD_UNAVAILABLE');
  return supabase;
}

export async function fetchStoredDataBundle(userId: string): Promise<StoredDataBundle> {
  const client = requireSupabase();
  const [profileResult, acceptanceResult, familyResult, plansResult] = await Promise.all([
    client.from('profiles').select('privacy_notice_version, privacy_notice_accepted_at, created_at, updated_at').eq('id', userId).maybeSingle(),
    client.from('privacy_notice_acceptances').select('notice_version, accepted_at').eq('user_id', userId).order('accepted_at', { ascending: true }),
    client.from('family_settings').select('settings, created_at, updated_at').eq('user_id', userId).maybeSingle(),
    client.from('weekly_plans').select('week_start, menu_data, shopping_list, is_active, created_at, updated_at').eq('user_id', userId).order('week_start', { ascending: false }),
  ]);

  if (profileResult.error || acceptanceResult.error || familyResult.error || plansResult.error) {
    throw new Error('CLOUD_UNAVAILABLE');
  }

  const profile = profileResult.data;
  const family = familyResult.data;
  return {
    profile: profile ? {
      privacyNoticeVersion: profile.privacy_notice_version,
      privacyNoticeAcceptedAt: profile.privacy_notice_accepted_at,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
    } : null,
    privacyAcceptances: (acceptanceResult.data ?? []).map(item => ({
      noticeVersion: item.notice_version,
      acceptedAt: item.accepted_at,
    })),
    familySettings: family ? {
      settings: family.settings,
      createdAt: family.created_at,
      updatedAt: family.updated_at,
    } : null,
    weeklyPlans: (plansResult.data ?? []).map(item => ({
      weekStart: item.week_start,
      menuData: item.menu_data,
      shoppingList: item.shopping_list,
      isActive: item.is_active,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    })),
  };
}

export function summarizeStoredData(bundle: StoredDataBundle): StoredDataSummary {
  const updates = [
    bundle.profile?.updatedAt,
    bundle.familySettings?.updatedAt,
    ...bundle.weeklyPlans.map(plan => plan.updatedAt),
  ].filter((value): value is string => Boolean(value));
  updates.sort((a, b) => b.localeCompare(a));
  return {
    hasFamilySettings: Boolean(bundle.familySettings),
    weeklyPlanCount: bundle.weeklyPlans.length,
    shoppingListCount: bundle.weeklyPlans.filter(plan => Boolean(plan.shoppingList)).length,
    mostRecentUpdate: updates[0] ?? null,
  };
}

export function createDataExport(email: string, accountCreatedAt: string, bundle: StoredDataBundle) {
  return {
    exportVersion: DATA_EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    account: { email, createdAt: accountCreatedAt },
    profile: bundle.profile,
    privacyAcceptances: bundle.privacyAcceptances,
    familySettings: bundle.familySettings,
    weeklyPlans: bundle.weeklyPlans,
  };
}

export async function deleteMySavedData() {
  const client = requireSupabase();
  const { error } = await client.rpc('delete_my_plan_pan_data');
  if (error) throw new Error('DELETE_FAILED');
}

export async function permanentlyDeleteAccount(accessToken: string) {
  const response = await fetch('/api/delete-account', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: '{}',
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('SESSION_EXPIRED');
    throw new Error('DELETE_FAILED');
  }
}
