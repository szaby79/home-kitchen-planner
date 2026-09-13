import { describe, expect, it } from 'vitest';
import { createDataExport, DATA_EXPORT_VERSION, StoredDataBundle, summarizeStoredData } from '@/lib/accountData';

const bundle: StoredDataBundle = {
  profile: { privacyNoticeVersion: 'beta-2026-09-v2', privacyNoticeAcceptedAt: '2026-09-13T08:00:00.000Z', createdAt: '2026-09-01T08:00:00.000Z', updatedAt: '2026-09-13T08:00:00.000Z' },
  privacyAcceptances: [
    { noticeVersion: 'beta-2026-09-v1', acceptedAt: '2026-09-01T08:00:00.000Z' },
    { noticeVersion: 'beta-2026-09-v2', acceptedAt: '2026-09-13T08:00:00.000Z' },
  ],
  familySettings: { settings: { familySize: 5, allergies: ['milk'] }, createdAt: '2026-09-01T08:00:00.000Z', updatedAt: '2026-09-12T09:00:00.000Z' },
  weeklyPlans: [{ weekStart: '2026-09-07', menuData: { monday: { lunch: 'soup-2' } }, shoppingList: { checkedItemKeys: ['milk-l'] }, isActive: true, createdAt: '2026-09-07T08:00:00.000Z', updatedAt: '2026-09-13T10:00:00.000Z' }],
};

describe('account data summary and export', () => {
  it('summarizes only the supplied current-user bundle', () => {
    expect(summarizeStoredData(bundle)).toEqual({ hasFamilySettings: true, weeklyPlanCount: 1, shoppingListCount: 1, mostRecentUpdate: '2026-09-13T10:00:00.000Z' });
  });

  it('exports readable application data without authentication secrets or row IDs', () => {
    const exported = createDataExport('tester@example.com', '2026-09-01T08:00:00.000Z', bundle);
    const json = JSON.stringify(exported);
    expect(exported.exportVersion).toBe(DATA_EXPORT_VERSION);
    expect(exported.account).toEqual({ email: 'tester@example.com', createdAt: '2026-09-01T08:00:00.000Z' });
    expect(json).toContain('soup-2');
    expect(json).toContain('milk');
    expect(json).not.toMatch(/access.?token|refresh.?token|service.?role|password|userId|"id"/i);
  });
});
