import { describe, expect, it } from 'vitest';
import { reconcileAutopilotFamilySize } from '@/lib/autopilotSettings';
import { createDefaultAutopilotSettings, WEEKDAYS } from '@/types/recipe';

describe('Autopilot household size reconciliation', () => {
  it('updates old uniform day values when the saved family size changes', () => {
    const oldSettings = createDefaultAutopilotSettings(6);
    delete oldSettings.defaultFamilySize;
    WEEKDAYS.forEach(day => { delete oldSettings.days[day].peopleCustomized; });

    const reconciled = reconcileAutopilotFamilySize(oldSettings, 3);

    expect(reconciled.defaultFamilySize).toBe(3);
    WEEKDAYS.forEach(day => {
      expect(reconciled.days[day].people).toBe(3);
      expect(reconciled.days[day].peopleCustomized).toBe(false);
    });
  });

  it('preserves an intentionally customized day while updating defaults', () => {
    const oldSettings = createDefaultAutopilotSettings(6);
    oldSettings.days.Szombat.people = 8;
    oldSettings.days.Szombat.peopleCustomized = true;

    const reconciled = reconcileAutopilotFamilySize(oldSettings, 3);

    expect(reconciled.days.Hétfő.people).toBe(3);
    expect(reconciled.days.Szombat.people).toBe(8);
    expect(reconciled.days.Szombat.peopleCustomized).toBe(true);
  });
});
