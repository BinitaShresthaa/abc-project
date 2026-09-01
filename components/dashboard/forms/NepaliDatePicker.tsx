"use client";

import { useEffect, useState } from "react";
import NepaliDate from "nepali-date-converter";
import ScrollDropdown from "./ScrollDropdown";

const BS_MONTHS = [
  "Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashoj",
  "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
];

const BS_YEAR_MIN = 2000;
const BS_YEAR_MAX = 2090;

function getDaysInBsMonth(year: number, month: number): number {
  for (let day = 32; day >= 28; day--) {
    try {
      const d = new NepaliDate(year, month, day);
      if (d.getMonth() === month && d.getYear() === year) return day;
    } catch {
      continue;
    }
  }
  return 30;
}

function isoToBsParts(iso: string): { year: number; month: number; day: number } | null {
  if (!iso) return null;
  try {
    const bs = new NepaliDate(new Date(`${iso}T00:00:00`));
    return { year: bs.getYear(), month: bs.getMonth(), day: bs.getDate() };
  } catch {
    return null;
  }
}

function bsPartsToIso(year: number, month: number, day: number): string {
  const bs = new NepaliDate(year, month, day);
  const ad = bs.toJsDate();
  const y = ad.getFullYear();
  const m = String(ad.getMonth() + 1).padStart(2, "0");
  const d = String(ad.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function NepaliDatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (isoDate: string) => void;
}) {
  const [year, setYear] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [day, setDay] = useState<number | "">("");

  useEffect(() => {
    const p = isoToBsParts(value);
    setYear(p?.year ?? "");
    setMonth(p?.month ?? "");
    setDay(p?.day ?? "");
  }, [value]);

  const daysInMonth = typeof year === "number" && typeof month === "number"
    ? getDaysInBsMonth(year, month)
    : 32;

  function commit(nextYear: number | "", nextMonth: number | "", nextDay: number | "") {
    if (typeof nextYear === "number" && typeof nextMonth === "number" && typeof nextDay === "number") {
      const clampedDay = Math.min(nextDay, getDaysInBsMonth(nextYear, nextMonth));
      onChange(bsPartsToIso(nextYear, nextMonth, clampedDay));
    } else {
      onChange("");
    }
  }

  const dayOptions = Array.from({ length: daysInMonth }, (_, i) => ({ value: i + 1, label: String(i + 1) }));
  const monthOptions = BS_MONTHS.map((label, i) => ({ value: i, label }));
  const yearOptions = Array.from({ length: BS_YEAR_MAX - BS_YEAR_MIN + 1 }, (_, i) => {
    const y = BS_YEAR_MIN + i;
    return { value: y, label: String(y) };
  });

  return (
    <div className="grid grid-cols-3 gap-2">
      <ScrollDropdown
        value={day}
        options={dayOptions}
        placeholder="Day"
        onChange={(v) => { const d = Number(v); setDay(d); commit(year, month, d); }}
      />
      <ScrollDropdown
        value={month}
        options={monthOptions}
        placeholder="Month"
        onChange={(v) => { const m = Number(v); setMonth(m); commit(year, m, day); }}
      />
      <ScrollDropdown
        value={year}
        options={yearOptions}
        placeholder="Year"
        onChange={(v) => { const y = Number(v); setYear(y); commit(y, month, day); }}
      />
    </div>
  );
}