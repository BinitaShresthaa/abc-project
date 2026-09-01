"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom dropdown that always opens downward and shows a fixed number of
 * rows before scrolling — native <select> elements can't do this (browsers
 * decide open direction and dropdown height themselves, sometimes flipping
 * upward and covering the rest of the form). Used by NepaliDatePicker for
 * Day/Month/Year so all three behave identically and predictably.
 */
export default function ScrollDropdown({
  value,
  options,
  placeholder,
  onChange,
  visibleRows = 5,
}: {
  value: string | number | "";
  options: { value: string | number; label: string }[];
  placeholder: string;
  onChange: (value: string | number) => void;
  visibleRows?: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll the currently-selected row into view when opening.
  useEffect(() => {
    if (open && listRef.current) {
      const selected = listRef.current.querySelector('[data-selected="true"]') as HTMLElement | null;
      selected?.scrollIntoView({ block: "nearest" });
    }
  }, [open]);

  const selectedLabel = options.find((o) => String(o.value) === String(value))?.label ?? placeholder;
  const rowHeight = 36; // px, matches py-2 + text-sm line-height below

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
      >
        <span className={value === "" ? "text-slate-400 dark:text-slate-500" : ""}>{selectedLabel}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          style={{ maxHeight: rowHeight * visibleRows }}
          className="absolute left-0 top-full z-30 mt-1 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
          {options.map((opt) => {
            const isSelected = String(opt.value) === String(value);
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  data-selected={isSelected}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`block w-full px-3 py-2 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}