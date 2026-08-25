'use client';

import { useState, useRef, useEffect } from 'react';
import { chevronDownIcon } from './icons';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectGroup {
  label: string;
  options: SelectOption[];
}

interface SelectFieldProps {
  icon?: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options?: SelectOption[];
  groups?: SelectGroup[];
}

export default function SelectField({ icon, placeholder, value, onChange, options, groups }: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const flatOptions = groups ? groups.flatMap((g) => g.options) : options ?? [];
  const selectedLabel = flatOptions.find((o) => o.value === value)?.label;

  const renderOption = (opt: SelectOption) => (
    <button
      key={opt.value}
      type="button"
      onClick={() => {
        onChange(opt.value);
        setOpen(false);
      }}
      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#F5F4FB] transition-colors
                 ${opt.value === value ? 'text-[#0E76BD] font-semibold' : 'text-[#241B3A]'}`}
    >
      {opt.label}
    </button>
  );

  return (
    <div className="relative" ref={wrapRef}>
      {icon && (
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0E76BD] pointer-events-none z-10">{icon}</span>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between rounded-full bg-[#F5F4FB] ${icon ? 'pl-[50px] pr-4' : 'pl-4 pr-3'} py-4 text-sm text-left
                   ${value ? 'text-[#241B3A]' : 'text-[#8B87A3]'}
                   shadow-[0_10px_25px_rgba(76,57,163,0.10)] outline-none
                   border ${open ? 'border-[#A9D4EF] bg-[#EAF4FB]' : 'border-transparent'}
                   transition-colors`}
      >
        <span className="truncate">{selectedLabel ?? placeholder}</span>
        <span className={`ml-2 shrink-0 text-[#8B87A3] transition-transform ${open ? 'rotate-180' : ''}`}>
          {chevronDownIcon}
        </span>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full max-h-[200px] overflow-y-auto rounded-2xl bg-white shadow-[0_16px_34px_rgba(28,15,74,0.18)] border border-black/5 py-1">
          {groups
            ? groups.map((group) => (
                <div key={group.label}>
                  <p className="px-4 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8B87A3]">
                    {group.label}
                  </p>
                  {group.options.map(renderOption)}
                </div>
              ))
            : options?.map(renderOption)}
        </div>
      )}
    </div>
  );
}