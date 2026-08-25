"use client";

import { useEffect, useRef, useState } from "react";
import { getYearOptions } from "@/lib/year-range";
import { adYearToBs } from "@/lib/nepali-date";

export default function YearScrollSelect({
  value,
  onChange,
  placeholder = "Select year",
  yearsBack = 80,
}: {
  value: string;
  onChange: (year: string) => void;
  placeholder?: string;
  yearsBack?: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const years = getYearOptions(yearsBack);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
      >
        <span>{value ? `${adYearToBs(value)} BS (${value} AD)` : placeholder}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="styled-scrollbar absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => { onChange(""); setOpen(false); }}
            className="block w-full px-3 py-2 text-left text-sm text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            All years
          </button>
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => { onChange(y); setOpen(false); }}
              className={`block w-full px-3 py-2 text-left text-sm transition-colors ${
                value === y ? "bg-primary/10 font-medium text-primary" : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {adYearToBs(y)} BS <span className="text-xs text-slate-400">({y} AD)</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}