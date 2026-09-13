const USER_CACHE_PREFIXES = [
  'plan-pan-family-settings-pending-v1:',
  'plan-pan-weekly-plan-pending-v1:',
] as const;

const CLOUD_DATA_DELETED_PREFIX = 'plan-pan-cloud-data-deleted-v1:';

export function cloudDataDeletedKey(userId: string) {
  return `${CLOUD_DATA_DELETED_PREFIX}${userId}`;
}

export function wasCloudDataDeleted(userId: string) {
  return localStorage.getItem(cloudDataDeletedKey(userId)) === 'true';
}

export function markCloudDataDeleted(userId: string) {
  clearUserCloudCaches(userId);
  localStorage.setItem(cloudDataDeletedKey(userId), 'true');
}

export function markCloudDataActive(userId: string) {
  localStorage.removeItem(cloudDataDeletedKey(userId));
}

export function clearUserCloudCaches(userId: string) {
  const keys: string[] = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key && USER_CACHE_PREFIXES.some(prefix => key.startsWith(prefix) && key.includes(userId))) {
      keys.push(key);
    }
  }
  keys.forEach(key => localStorage.removeItem(key));
}

export function clearGuestPlanPanData() {
  const keys: string[] = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key?.startsWith('plan-pan-')) keys.push(key);
  }
  keys.forEach(key => localStorage.removeItem(key));
}
