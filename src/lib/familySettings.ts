import { supabase } from '@/lib/supabase';
import { normalizePreferences } from '@/lib/menuPreferencesValidation';
import type { MenuPreferences } from '@/types/recipe';

export type CloudFamilySettings = {
  settings: MenuPreferences;
  updatedAt: string;
};

export async function fetchFamilySettings(userId: string): Promise<CloudFamilySettings | null> {
  if (!supabase) throw new Error('CLOUD_UNAVAILABLE');

  const { data, error } = await supabase
    .from('family_settings')
    .select('settings, updated_at')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw new Error('CLOUD_UNAVAILABLE');
  if (!data) return null;

  const settings = normalizePreferences(data.settings);
  if (!settings || typeof data.updated_at !== 'string') throw new Error('CLOUD_UNAVAILABLE');
  return { settings, updatedAt: data.updated_at };
}

export async function upsertFamilySettings(userId: string, settings: MenuPreferences): Promise<CloudFamilySettings> {
  if (!supabase) throw new Error('CLOUD_UNAVAILABLE');

  const { data, error } = await supabase
    .from('family_settings')
    .upsert({ user_id: userId, settings }, { onConflict: 'user_id' })
    .select('settings, updated_at')
    .single();

  if (error) throw new Error('CLOUD_UNAVAILABLE');
  const savedSettings = normalizePreferences(data?.settings);
  if (!savedSettings || typeof data?.updated_at !== 'string') throw new Error('CLOUD_UNAVAILABLE');
  return { settings: savedSettings, updatedAt: data.updated_at };
}
