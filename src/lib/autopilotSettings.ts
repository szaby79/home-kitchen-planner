import { createDefaultAutopilotSettings, WEEKDAYS } from '@/types/recipe';
import type { WeekDay, WeeklyAutopilotSettings } from '@/types/recipe';

export const AUTOPILOT_STORAGE_KEY = 'plan-pan-weekly-autopilot';

function safePeople(value: unknown, fallback: number) {
  return Number.isInteger(value) && Number(value) >= 1 && Number(value) <= 12 ? Number(value) : fallback;
}

function inferPreviousFamilySize(settings: Partial<WeeklyAutopilotSettings>, fallback: number) {
  if (Number.isInteger(settings.defaultFamilySize)) return safePeople(settings.defaultFamilySize, fallback);

  const counts = new Map<number, number>();
  WEEKDAYS.forEach(day => {
    const people = safePeople(settings.days?.[day]?.people, 0);
    if (people) counts.set(people, (counts.get(people) ?? 0) + 1);
  });

  let mostCommon = fallback;
  let highestCount = 0;
  counts.forEach((count, people) => {
    if (count > highestCount) {
      mostCommon = people;
      highestCount = count;
    }
  });
  return mostCommon;
}

export function reconcileAutopilotFamilySize(
  stored: Partial<WeeklyAutopilotSettings> | null | undefined,
  familySize: number,
): WeeklyAutopilotSettings {
  const nextFamilySize = safePeople(familySize, 4);
  const defaults = createDefaultAutopilotSettings(nextFamilySize);
  if (!stored) return defaults;

  const previousFamilySize = inferPreviousFamilySize(stored, nextFamilySize);
  const hadRecordedDefault = Number.isInteger(stored.defaultFamilySize);

  return {
    ...defaults,
    ...stored,
    defaultFamilySize: nextFamilySize,
    days: Object.fromEntries(WEEKDAYS.map(day => {
      const savedDay = stored.days?.[day];
      const savedPeople = safePeople(savedDay?.people, previousFamilySize);
      const peopleCustomized = savedDay?.peopleCustomized === true
        || (!hadRecordedDefault && savedPeople !== previousFamilySize);

      return [day, {
        ...defaults.days[day],
        ...savedDay,
        people: peopleCustomized ? savedPeople : nextFamilySize,
        peopleCustomized,
      }];
    })) as Record<WeekDay, WeeklyAutopilotSettings['days'][WeekDay]>,
  };
}

export function loadAutopilotSettings(familySize: number): WeeklyAutopilotSettings {
  try {
    const stored = localStorage.getItem(AUTOPILOT_STORAGE_KEY);
    return reconcileAutopilotFamilySize(stored ? JSON.parse(stored) : null, familySize);
  } catch {
    return createDefaultAutopilotSettings(familySize);
  }
}
