// Generates year options dynamically from the current year backward.
// No hardcoded end date — "today" always comes from the real clock,
// so this never needs updating as years pass.

export function getYearOptions(yearsBack: number = 80): string[] {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  for (let y = currentYear; y >= currentYear - yearsBack; y--) {
    years.push(String(y));
  }
  return years; // newest first
}