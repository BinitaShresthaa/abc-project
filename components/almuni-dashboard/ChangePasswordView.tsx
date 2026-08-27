'use client';

import { useState, type FormEvent } from 'react';

const inputClass =
  'w-full rounded-xl bg-[#F0F2F5] px-4 py-2.5 text-sm text-[#241B3A] placeholder-[#8B87A3] outline-none border border-transparent focus:bg-white focus:border-[#A9D4EF] transition-colors';

const labelClass = 'block text-[13px] font-semibold text-[#241B3A] mb-1.5';

export default function ChangePasswordView() {
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
    <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)]">
      <div className="px-5 py-4 border-b border-black/5">
        <h2 className="text-[22px] font-bold text-[#241B3A]">Change Password</h2>
        <p className="text-[13px] text-[#8B87A3] mt-1">
          Update the password used to sign in to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 max-w-xl">
        <div className="mb-4">
          <label className={labelClass}>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputClass}
            placeholder="Enter current password"
          />
        </div>

        <div className="mb-4">
          <label className={labelClass}>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
            placeholder="Enter new password"
          />
          {tooShort && (
            <p className="text-[12px] text-red-500 mt-1.5">Password must be at least 6 characters.</p>
          )}
        </div>

        <div className="mb-6">
          <label className={labelClass}>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
            placeholder="Re-enter new password"
          />
          {mismatch && (
            <p className="text-[12px] text-red-500 mt-1.5">Passwords do not match.</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!canSubmit}
            className="px-5 py-2.5 rounded-full bg-[#0E76BD] text-white text-sm font-semibold hover:bg-[#0b5f99] disabled:opacity-40 disabled:hover:bg-[#0E76BD] transition-colors"
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