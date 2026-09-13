import { beforeEach, describe, expect, it } from 'vitest';
import { clearGuestPlanPanData, clearUserCloudCaches, markCloudDataDeleted, wasCloudDataDeleted } from '@/lib/localPlanPanData';

describe('scoped Plan & Pan local-data cleanup', () => {
  beforeEach(() => localStorage.clear());

  it('clears only the selected user pending queues', () => {
    localStorage.setItem('plan-pan-family-settings-pending-v1:user-a', 'private-a');
    localStorage.setItem('plan-pan-weekly-plan-pending-v1:user-a:2026-09-07', 'private-a');
    localStorage.setItem('plan-pan-family-settings-pending-v1:user-b', 'private-b');
    localStorage.setItem('unrelated-app-setting', 'keep');
    clearUserCloudCaches('user-a');
    expect(localStorage.getItem('plan-pan-family-settings-pending-v1:user-a')).toBeNull();
    expect(localStorage.getItem('plan-pan-weekly-plan-pending-v1:user-a:2026-09-07')).toBeNull();
    expect(localStorage.getItem('plan-pan-family-settings-pending-v1:user-b')).toBe('private-b');
    expect(localStorage.getItem('unrelated-app-setting')).toBe('keep');
  });

  it('marks cloud deletion after clearing pending writes to prevent recreation', () => {
    localStorage.setItem('plan-pan-weekly-plan-pending-v1:user-a:2026-09-07', 'stale');
    markCloudDataDeleted('user-a');
    expect(wasCloudDataDeleted('user-a')).toBe(true);
    expect(localStorage.getItem('plan-pan-weekly-plan-pending-v1:user-a:2026-09-07')).toBeNull();
  });

  it('guest reset removes Plan & Pan data but leaves unrelated browser storage intact', () => {
    localStorage.setItem('plan-pan-weekplan', 'guest');
    localStorage.setItem('plan-pan-checked-items', 'guest');
    localStorage.setItem('another-product-setting', 'keep');
    clearGuestPlanPanData();
    expect(localStorage.getItem('plan-pan-weekplan')).toBeNull();
    expect(localStorage.getItem('plan-pan-checked-items')).toBeNull();
    expect(localStorage.getItem('another-product-setting')).toBe('keep');
  });
});
