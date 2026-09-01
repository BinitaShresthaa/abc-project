'use client';

import { useState } from 'react';
import { userIcon, eyeIcon, chevronRightIcon, arrowLeftIcon } from './icons';

type View = 'menu' | 'privacy';
type Visibility = 'public' | 'private';

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

export default function SettingsView({ onSetProfile }: { onSetProfile?: () => void }) {
  const [view, setView] = useState<View>('menu');
  const [visibility, setVisibility] = useState<Visibility>('public');

  // --- sub-view: Profile Privacy ---
  if (view === 'privacy') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)] p-6">
          <div className="flex items-center gap-3 mb-5">
            <button
              type="button"
              onClick={() => setView('menu')}
              aria-label="Back"
              className="w-9 h-9 rounded-full border-[1.5px] border-[#0E76BD] text-[#0E76BD] flex items-center justify-center hover:bg-[#EAF4FB] transition-colors shrink-0"
            >
              {arrowLeftIcon}
            </button>
            <div>
              <h2 className="text-[20px] font-bold text-[#241B3A]">Profile Privacy</h2>
              <p className="text-[13px] text-[#8B87A3] mt-1">
                How would you like to display your profile?
              </p>
            </div>
          </div>

          <div className="space-y-1">
            {visibilityOptions.map((opt) => {
              const selected = visibility === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setVisibility(opt.key)}
                  className="w-full flex items-start justify-between gap-3 px-3 py-3 rounded-xl hover:bg-[#F5F4FB] transition-colors text-left"
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
      </div>
    );
  }

  // --- main settings menu ---
  const menuItems = [
    { icon: eyeIcon, label: 'Profile Privacy', onClick: () => setView('privacy') },
    { icon: userIcon, label: 'Set Profile', onClick: onSetProfile },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)] p-4">
        <h2 className="px-2 pt-2 pb-3 text-[20px] font-bold text-[#241B3A]">Settings</h2>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className="w-full flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-[#F5F4FB] transition-colors text-left"
            >
              <span className="w-9 h-9 rounded-full bg-[#F0F2F5] flex items-center justify-center text-[#241B3A] shrink-0">
                {item.icon}
              </span>
              <span className="flex-1 text-sm font-medium text-[#241B3A]">{item.label}</span>
              <span className="text-[#8B87A3]">{chevronRightIcon}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}