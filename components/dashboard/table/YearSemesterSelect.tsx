"use client";

import { getProgressRange, type ProgressMode, type YearSemesterValue } from "@/lib/academic-progress";
import ScrollDropdown from "@/components/dashboard/forms/ScrollDropdown";

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

      <div className="w-24">
        <ScrollDropdown
          value={value?.value ?? ""}
          options={options.map((n) => ({ value: n, label: String(n) }))}
          placeholder={`Select ${mode}`}
          onChange={(v) => onChange({ mode, value: Number(v) })}
          visibleRows={5}
        />
      </div>
    </div>
  );
}