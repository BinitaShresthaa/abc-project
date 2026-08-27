'use client';

import { useState } from 'react';
import { lockIcon, eyeIcon } from './icons';

interface PasswordFieldProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

export default function PasswordField({ placeholder, value, onChange, autoFocus }: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0E76BD]">{lockIcon}</span>
      <input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        className="w-full rounded-full bg-[#F5F4FB] pl-11 pr-10 py-2.5 text-sm text-[#241B3A]
                   placeholder-[#8B87A3] outline-none border border-transparent
                   focus:bg-[#EAF4FB] focus:border-[#A9D4EF] transition-colors"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8B87A3] hover:text-[#0E76BD] transition-colors"
      >
        {eyeIcon}
      </button>
    </div>
  );
}