'use client';

import { useState } from 'react';
import { userIcon, lockIcon, eyeIcon, logOutIcon, chevronRightIcon, arrowLeftIcon } from './icons';
import PasswordField from './PasswordField';

type View = 'menu' | 'display' | 'password';
type Visibility = 'public' | 'private';

interface ProfileMenuProps {
  userName?: string;
  onViewProfile?: () => void;
  onSetProfile?: () => void;
  onChangePasswordSubmit?: (data: { currentPassword: string; newPassword: string }) => void;
  onVisibilityChange?: (visibility: Visibility) => void;
  onLogOut?: () => void;
}

const visibilityOptions: { key: Visibility; label: string; description: string }[] = [
  {
    key: 'public',
    label: 'Public',
    description: 'Your profile and your activities will display to everyone.',
  },
  {
    key: 'private',
    label: 'Private',
    description: 'Your profile and activities will display or appear only to those connected within the system.',
  },
];

export default function ProfileMenu({
  userName = 'Your Name',
  onViewProfile,
  onSetProfile,
  onChangePasswordSubmit,
  onVisibilityChange,
  onLogOut,
}: ProfileMenuProps) {
  const [view, setView] = useState<View>('menu');
  const [visibility, setVisibility] = useState<Visibility>('public');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const selectVisibility = (v: Visibility) => {
    setVisibility(v);
    onVisibilityChange?.(v);
  };

  const resetPasswordForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordSuccess(false);
  };

  const backToMenu = () => {
    setView('menu');
    resetPasswordForm();
  };

  const mismatch = confirmPassword.length > 0 && confirmPassword !== newPassword;
  const tooShort = newPassword.length > 0 && newPassword.length < 6;
  const canSubmitPassword =
    currentPassword.trim() !== '' &&
    newPassword.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    !mismatch &&
    !tooShort;

  const handlePasswordSubmit = () => {
    if (!canSubmitPassword) return;
    // Placeholder — no real backend call yet. Swap this for a call into
    // lib/auth.ts (or an API route) once real password changes are wired up.
    onChangePasswordSubmit?.({ currentPassword, newPassword });
    setPasswordSuccess(true);
  };

  // --- sub-view: Change Password ---
  if (view === 'password') {
    return (
      <div className="absolute right-0 top-full mt-2 w-[320px] rounded-2xl bg-white shadow-[0_16px_40px_rgba(11,90,147,0.18)] border border-black/5 p-4 z-50">
        <div className="flex items-center gap-3 mb-4">
          <button
            type="button"
            onClick={backToMenu}
            aria-label="Back"
            className="w-9 h-9 rounded-full border-[1.5px] border-[#0E76BD] text-[#0E76BD] flex items-center justify-center hover:bg-[#EAF4FB] transition-colors shrink-0"
          >
            {arrowLeftIcon}
          </button>
          <h3 className="text-[17px] font-bold text-[#241B3A]">Change Password</h3>
        </div>

        {passwordSuccess ? (
          <div className="px-1 py-4 text-center">
            <p className="text-[14px] font-semibold text-[#241B3A] mb-1">Password updated</p>
            <p className="text-[12.5px] text-[#8B87A3] mb-4">Your password has been changed successfully.</p>
            <button
              type="button"
              onClick={backToMenu}
              className="text-[13px] font-semibold text-[#0E76BD] hover:underline"
            >
              Back to menu
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-1">
              <PasswordField
                placeholder="Current password"
                value={currentPassword}
                onChange={setCurrentPassword}
                autoFocus
              />
              <PasswordField
                placeholder="New password"
                value={newPassword}
                onChange={setNewPassword}
              />
              <PasswordField
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            </div>

            {tooShort && (
              <p className="text-[11.5px] text-red-500 mt-2 ml-1">Password must be at least 6 characters.</p>
            )}
            {mismatch && (
              <p className="text-[11.5px] text-red-500 mt-2 ml-1">Passwords do not match.</p>
            )}

            <button
              type="button"
              onClick={handlePasswordSubmit}
              disabled={!canSubmitPassword}
              className="w-full mt-3 rounded-full bg-[linear-gradient(120deg,#0E76BD,#0B5A93)] text-white
                         text-[13px] font-semibold uppercase tracking-[1.5px] py-3
                         shadow-[0_10px_22px_rgba(14,118,189,0.3)]
                         disabled:opacity-40 transition-all"
            >
              Update Password
            </button>
          </>
        )}
      </div>
    );
  }

  // --- sub-view: Display Profile ---
  if (view === 'display') {
    return (
      <div className="absolute right-0 top-full mt-2 w-[320px] rounded-2xl bg-white shadow-[0_16px_40px_rgba(11,90,147,0.18)] border border-black/5 p-4 z-50">
        <div className="flex items-center gap-3 mb-4">
          <button
            type="button"
            onClick={() => setView('menu')}
            aria-label="Back"
            className="w-9 h-9 rounded-full border-[1.5px] border-[#0E76BD] text-[#0E76BD] flex items-center justify-center hover:bg-[#EAF4FB] transition-colors shrink-0"
          >
            {arrowLeftIcon}
          </button>
          <h3 className="text-[17px] font-bold text-[#241B3A]">Display Profile</h3>
        </div>

        <p className="text-[13px] text-[#8B87A3] mb-3 px-1">
          How would you like to display your profile?
        </p>

        <div className="space-y-1">
          {visibilityOptions.map((opt) => {
            const selected = visibility === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => selectVisibility(opt.key)}
                className="w-full flex items-start justify-between gap-3 px-2 py-3 rounded-xl hover:bg-[#F5F4FB] transition-colors text-left"
              >
                <div>
                  <p className="text-[14px] font-semibold text-[#241B3A]">{opt.label}</p>
                  <p className="text-[12.5px] text-[#8B87A3] mt-0.5 leading-snug">{opt.description}</p>
                </div>
                <span
                  className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                             ${selected ? 'border-[#0E76BD]' : 'border-black/20'}`}
                >
                  {selected && <span className="w-2.5 h-2.5 rounded-full bg-[#0E76BD]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // --- main menu ---
  const menuItems = [
    { icon: userIcon, label: 'Set Profile', onClick: onSetProfile },
    { icon: lockIcon, label: 'Change Password', onClick: () => setView('password') },
    { icon: eyeIcon, label: 'Display Profile', onClick: () => setView('display') },
  ];

  return (
    <div className="absolute right-0 top-full mt-2 w-[320px] rounded-2xl bg-white shadow-[0_16px_40px_rgba(11,90,147,0.18)] border border-black/5 p-3 z-50">

      <div className="flex items-center gap-3 px-2 pt-1 pb-3">
        <div className="w-12 h-12 rounded-full bg-[#EAF4FB] overflow-hidden flex items-center justify-center shrink-0">
          {/* e.g. <img src="/avatar.jpg" alt="" className="w-full h-full object-cover" /> */}
        </div>
        <p className="text-[15px] font-semibold text-[#241B3A] truncate">{userName}</p>
      </div>

      <div className="h-px bg-black/10 mx-2" />

      <button
        type="button"
        onClick={onViewProfile}
        className="w-full flex items-center justify-center gap-2 mt-3 mb-2 py-2.5 rounded-xl bg-[#F0F2F5] hover:bg-[#E7EAEE] text-sm font-semibold text-[#241B3A] transition-colors"
      >
        {userIcon}
        View Profile
      </button>

      <div className="py-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-[#F5F4FB] transition-colors text-left"
          >
            <span className="w-9 h-9 rounded-full bg-[#F0F2F5] flex items-center justify-center text-[#241B3A] shrink-0">
              {item.icon}
            </span>
            <span className="flex-1 text-sm font-medium text-[#241B3A]">{item.label}</span>
            <span className="text-[#8B87A3]">{chevronRightIcon}</span>
          </button>
        ))}
      </div>

      <div className="h-px bg-black/10 mx-2 my-1" />

      <button
        type="button"
        onClick={onLogOut}
        className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-[#F5F4FB] transition-colors text-left"
      >
        <span className="w-9 h-9 rounded-full bg-[#F0F2F5] flex items-center justify-center text-[#241B3A] shrink-0">
          {logOutIcon}
        </span>
        <span className="flex-1 text-sm font-medium text-[#241B3A]">Log out</span>
      </button>
    </div>
  );
}