'use client';

import { useState } from 'react';
import { userIcon, lockIcon, eyeIcon, logOutIcon, arrowLeftIcon } from './icons';

type View = 'menu' | 'display';
type Visibility = 'public' | 'private';

interface ProfileMenuProps {
  userName?: string;
  userPhoto?: string;
  onViewProfile?: () => void;
  onSetProfile?: () => void;
  onChangePassword?: () => void;
  onVisibilityChange?: (visibility: Visibility) => void;
  onLogOut?: () => void;
}

const avatarPlaceholderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);

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
  userPhoto,
  onViewProfile,
  onSetProfile,
  onChangePassword,
  onVisibilityChange,
  onLogOut,
}: ProfileMenuProps) {
  const [view, setView] = useState<View>('menu');
  const [visibility, setVisibility] = useState<Visibility>('public');

  const selectVisibility = (v: Visibility) => {
    setVisibility(v);
    onVisibilityChange?.(v);
  };

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

  // --- main menu — blue banner + overlapping photo + plain icon/label list ---
  const menuItems = [
    { icon: userIcon, label: 'View Profile', onClick: onViewProfile },
    { icon: userIcon, label: 'Set Profile', onClick: onSetProfile },
    { icon: lockIcon, label: 'Change Password', onClick: onChangePassword },
    { icon: eyeIcon, label: 'Display Profile', onClick: () => setView('display') },
  ];

  return (
    <div className="absolute right-0 top-full mt-2 w-[320px] rounded-2xl bg-white shadow-[0_16px_40px_rgba(11,90,147,0.18)] border border-black/5 overflow-hidden z-50">
      {/* blue banner with name */}
      <div className="bg-[#0E76BD] pt-6 pb-14 text-center px-4">
        <p className="text-white text-[16px] font-semibold truncate">{userName}</p>
      </div>

      {/* large photo overlapping the banner/white boundary */}
      <div className="flex justify-center -mt-12">
        <div className="w-24 h-24 rounded-full border-4 border-white bg-[#EAF4FB] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center">
          {userPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#8B87A3]">{avatarPlaceholderIcon}</span>
          )}
        </div>
      </div>

      {/* menu list — plain icon + label rows, no chevrons */}
      <div className="px-4 pt-4 pb-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F5F4FB] transition-colors text-left"
            >
              <span className="text-[#0E76BD] shrink-0">{item.icon}</span>
              <span className="text-[15px] font-medium text-[#241B3A]">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="h-px bg-black/10 my-2" />

        <button
          type="button"
          onClick={onLogOut}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 transition-colors text-left"
        >
          <span className="text-red-500 shrink-0">{logOutIcon}</span>
          <span className="text-[15px] font-medium text-red-500">Log out</span>
        </button>
      </div>
    </div>
  );
}