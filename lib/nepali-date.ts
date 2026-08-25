// Simplified AD → BS (Bikram Sambat) year conversion.
// Nepali New Year (1 Baisakh) falls around mid-April, so one AD year spans
// two BS years. With only a year (no month/day) stored, we use the common
// +57 approximation — correct for most of the year, off by one for
// Jan–mid-April dates.

export function adYearToBs(adYear: string | number): string {
  const year = typeof adYear === "string" ? parseInt(adYear, 10) : adYear;
  if (Number.isNaN(year)) return String(adYear);
  return String(year + 57);
}