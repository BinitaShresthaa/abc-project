"use client";

import { getProgressRange, type ProgressMode, type YearSemesterValue } from "@/lib/academic-progress";

export default function YearSemesterSelect({
  level,
  value,
  onChange,
}: {
  level: "bachelor" | "master";
  value: YearSemesterValue | null;
  onChange: (value: YearSemesterValue) => void;
}) {
  const range = getProgressRange(level);
  const mode: ProgressMode = value?.mode ?? "year";
  const max = mode === "year" ? range.yearMax : range.semesterMax;
  const options = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className="flex gap-2">
      <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-700">
        {(["year", "semester"] as ProgressMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onChange({ mode: m, value: 1 })}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
              mode === m ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <select
        value={value?.value ?? ""}
        onChange={(e) => onChange({ mode, value: Number(e.target.value) })}
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
      >
        <option value="" disabled>Select {mode}</option>
        {options.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
    </div>
  );
}