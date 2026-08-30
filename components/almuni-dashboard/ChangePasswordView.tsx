'use client';

import { useState, type FormEvent } from 'react';
import { lockIcon, eyeIcon, arrowLeftIcon } from './icons';

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  autoFocus,
  error,
  helper,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
  error?: string;
  helper?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#241B3A] mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0E76BD]">{lockIcon}</span>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full rounded-full bg-[#F5F4FB] pl-11 pr-11 py-3 text-sm text-[#241B3A]
                     placeholder-[#8B87A3] outline-none border border-transparent
                     focus:bg-[#EAF4FB] focus:border-[#A9D4EF] transition-colors"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B87A3] hover:text-[#0E76BD] transition-colors"
        >
          {eyeIcon}
        </button>
      </div>
      {error ? (
        <p className="text-[12px] text-red-500 mt-1.5 ml-1">{error}</p>
      ) : helper ? (
        <p className="text-[12px] text-[#8B87A3] mt-1.5 ml-1">{helper}</p>
      ) : null}
    </div>
  );
}

export default function ChangePasswordView({ onClose }: { onClose?: () => void }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState(false);

  const mismatch = confirmPassword.length > 0 && confirmPassword !== newPassword;
  const tooShort = newPassword.length > 0 && newPassword.length < 6;
  const canSubmit =
    currentPassword.trim() !== '' &&
    newPassword.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    !mismatch &&
    !tooShort;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // Placeholder — no real backend call yet. Swap this for a call into
    // lib/auth.ts (or an API route) once real password changes are wired up.
    console.log('Password change submitted:', { currentPassword, newPassword });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)]">
      <div className="flex items-center gap-3 px-8 py-6 border-b border-black/5">
        <button
          type="button"
          onClick={onClose}
          aria-label="Back"
          className="w-9 h-9 rounded-full border-[1.5px] border-[#0E76BD] text-[#0E76BD] flex items-center justify-center hover:bg-[#EAF4FB] transition-colors shrink-0"
        >
          {arrowLeftIcon}
        </button>
        <div>
          <h2 className="text-[22px] font-bold text-[#241B3A]">Change Password</h2>
          <p className="text-[13px] text-[#8B87A3] mt-1">
            Update the password used to sign in to your account.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-8 py-8">
        <div className="space-y-6 mb-2">
          <PasswordInput
            label="Current Password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={setCurrentPassword}
            autoFocus
            helper="Enter the password you currently use to sign in."
          />
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={setNewPassword}
            error={tooShort ? 'Password must be at least 6 characters.' : undefined}
            helper={!tooShort ? 'Use at least 6 characters.' : undefined}
          />
          <PasswordInput
            label="Confirm New Password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={mismatch ? 'Passwords do not match.' : undefined}
            helper={!mismatch ? 'Re-enter your new password to confirm.' : undefined}
          />
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            type="submit"
            disabled={!canSubmit}
            className="px-6 py-3 rounded-full bg-[linear-gradient(120deg,#0E76BD,#0B5A93)] text-white
                       text-[13px] font-semibold uppercase tracking-[1px]
                       shadow-[0_10px_22px_rgba(14,118,189,0.3)]
                       hover:shadow-[0_14px_28px_rgba(14,118,189,0.4)] hover:-translate-y-0.5
                       disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-[0_10px_22px_rgba(14,118,189,0.3)]
                       transition-all"
          >
            Update Password
          </button>
          {saved && (
            <span className="text-[13px] text-green-600 font-medium">Password updated.</span>
          )}
        </div>
      </form>
    </div>
  );
}