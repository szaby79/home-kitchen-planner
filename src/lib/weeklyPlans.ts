import { supabase } from '@/lib/supabase';
import { normalizeWeeklyPlanRecord, StoredWeeklyPlan, WeeklyPlanPayload } from '@/lib/weeklyPlanValidation';

export async function fetchWeeklyPlans(userId: string): Promise<StoredWeeklyPlan[]> {
  if (!supabase) throw new Error('CLOUD_UNAVAILABLE');
  const { data, error } = await supabase
    .from('weekly_plans')
    .select('id, week_start, menu_data, shopping_list, created_at, updated_at')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('week_start', { ascending: false });
  if (error) throw new Error('CLOUD_UNAVAILABLE');
  const records = (data ?? []).map(normalizeWeeklyPlanRecord);
  if (records.some(record => !record)) throw new Error('CLOUD_UNAVAILABLE');
  return records as StoredWeeklyPlan[];
}

export async function upsertWeeklyPlan(userId: string, weekStart: string, payload: WeeklyPlanPayload): Promise<StoredWeeklyPlan> {
  if (!supabase) throw new Error('CLOUD_UNAVAILABLE');
  const { data, error } = await supabase
    .from('weekly_plans')
    .upsert({
      user_id: userId,
      week_start: weekStart,
      menu_data: { weekPlan: payload.weekPlan },
      shopping_list: {
        items: payload.shoppingItems,
        extraItems: payload.extraItems,
        checkedItemKeys: payload.checkedItemKeys,
        notes: payload.shoppingNotes,
      },
      is_active: true,
    }, { onConflict: 'user_id,week_start' })
    .select('id, week_start, menu_data, shopping_list, created_at, updated_at')
    .single();
  if (error) throw new Error('CLOUD_UNAVAILABLE');
  const record = normalizeWeeklyPlanRecord(data);
  if (!record) throw new Error('CLOUD_UNAVAILABLE');
  return record;
}
