export function getWeekStart(date = new Date()): string {
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const mondayOffset = (local.getDay() + 6) % 7;
  local.setDate(local.getDate() - mondayOffset);
  return formatDateKey(local);
}

export function formatWeekLabel(weekStart: string, english: boolean): string {
  const start = parseDateKey(weekStart);
  if (!start) return weekStart;
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const locale = english ? 'en-CA' : 'hu-HU';
  const monthDay = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' });
  return `${monthDay.format(start)} – ${monthDay.format(end)}`;
}

export function isDateKey(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Boolean(parseDateKey(value));
}

function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateKey(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
}
