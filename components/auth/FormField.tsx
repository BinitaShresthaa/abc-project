'use client';

import { useState } from 'react';
import { eyeIcon } from './icons';

interface FormFieldProps {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  isPassword?: boolean;
  autoFocus?: boolean;
}

export default function FormField({
  icon,
  type,
  placeholder,
  value,
  onChange,
  isPassword = false,
  autoFocus = false,
}: FormFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0E76BD]">{icon}</span>
      <input
        type={isPassword ? (show ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        className={`w-full rounded-full bg-[#F5F4FB] pl-[50px] ${isPassword ? 'pr-12' : 'pr-5'} py-4 text-sm text-[#241B3A]
                   placeholder-[#8B87A3] shadow-[0_10px_25px_rgba(76,57,163,0.10)] outline-none
                   border border-transparent focus:bg-[#EAF4FB] focus:border-[#A9D4EF]
                   transition-colors`}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8B87A3] hover:text-[#0E76BD] transition-colors"
        >
          {eyeIcon}
        </button>
      )}
    </div>
  );
}