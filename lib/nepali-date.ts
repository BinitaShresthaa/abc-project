import NepaliDate from "nepali-date-converter";

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

const BS_MONTHS = [
  "Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashoj",
  "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
];

/**
 * Full AD → BS date conversion using an accurate lookup-table-backed
 * library (not an approximation) — takes an ISO date string like
 * "2026-09-15" (exactly what <input type="date"> produces) and returns
 * a display string like "Ashoj 30, 2083".
 *
 * This is the ONE place launch-date formatting happens — every component
 * that shows a launch date should import this, so the form input and the
 * public-facing display can never drift out of sync.
 */
export function formatLaunchDateBS(isoDate: string): string {
  try {
    const bs = new NepaliDate(new Date(isoDate));
    const month = BS_MONTHS[bs.getMonth()]; // 0-indexed
    return `${month} ${bs.getDate()}, ${bs.getYear()}`;
  } catch {
    return isoDate; // fall back to raw value if conversion fails
  }
}