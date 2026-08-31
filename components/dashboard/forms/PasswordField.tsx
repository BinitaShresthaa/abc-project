"use client";

import { useState } from "react";
import { inputClass } from "./StudentFormFields";

export default function PasswordField({
  value,
  onChange,
  showRequirements = false,
}: {
  value: string;
  onChange: (value: string) => void;
  showRequirements?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  const hasLength = value.length >= 8;
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-+=[\]/\\~`]/.test(value);

  return (
    <div>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} pr-10`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <path d="M1 1l22 22" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {showRequirements && value.length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
          <RequirementRow met={hasLength} label="At least 8 characters" />
          <RequirementRow met={hasUpper} label="One uppercase letter" />
          <RequirementRow met={hasLower} label="One lowercase letter" />
          <RequirementRow met={hasNumber} label="One number" />
          <RequirementRow met={hasSpecial} label="One special character" />
        </div>
      )}
    </div>
  );
}

function RequirementRow({ met, label }: { met: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs ${met ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
      {met ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /></svg>
      )}
      {label}
    </div>
  );
}