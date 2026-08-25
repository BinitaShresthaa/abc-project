'use client';

interface GenderToggleProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  options?: string[];
}

export default function GenderToggle({
  value,
  onChange,
  label = 'Gender',
  options = ['Male', 'Female', 'Other'],
}: GenderToggleProps) {
  return (
    <div>
      <p className="text-[12.5px] text-[#8B87A3] mb-2 ml-1">{label}</p>
      <div className="flex items-center gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`flex-1 rounded-full py-3 text-[12.5px] font-semibold uppercase tracking-[1px] transition-all
                         ${active
                           ? 'bg-[linear-gradient(120deg,#0E76BD,#0B5A93)] text-white shadow-[0_10px_22px_rgba(14,118,189,0.35)]'
                           : 'border border-black/10 text-[#241B3A] hover:bg-black/[0.03]'}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}