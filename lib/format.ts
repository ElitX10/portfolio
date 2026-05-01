const MONTH_NAMES_FR_SHORT = [
  "janv.",
  "févr.",
  "mars",
  "avr.",
  "mai",
  "juin",
  "juil.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
] as const;

function parseYearMonth(value: string): { year: number; month: number } {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

function pluralize(value: number, singular: string, plural: string): string {
  return `${value} ${value > 1 ? plural : singular}`;
}

export function formatMonthYear(value: string): string {
  const { year, month } = parseYearMonth(value);
  return `${MONTH_NAMES_FR_SHORT[month - 1]} ${year}`;
}

export function computeDuration(start: string, end: string | null, now: Date = new Date()): string {
  const startDate = parseYearMonth(start);
  const endDate = end
    ? parseYearMonth(end)
    : { year: now.getFullYear(), month: now.getMonth() + 1 };

  const totalMonths = (endDate.year - startDate.year) * 12 + (endDate.month - startDate.month) + 1;

  if (totalMonths < 12) {
    return pluralize(totalMonths, "mois", "mois");
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (months === 0) {
    return pluralize(years, "an", "ans");
  }

  return `${pluralize(years, "an", "ans")} ${pluralize(months, "mois", "mois")}`;
}

export function formatPeriod(start: string, end: string | null, now: Date = new Date()): string {
  const startStr = formatMonthYear(start);
  const endStr = end ? formatMonthYear(end) : "aujourd'hui";
  const duration = computeDuration(start, end, now);
  return `${startStr} — ${endStr} · ${duration}`;
}
