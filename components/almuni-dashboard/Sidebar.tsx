'use client';

import { useState } from 'react';
import { navItems, settingsGroup, type NavKey } from './navItems';
import { chevronDownIcon } from './icons';
import { mockAlumni, CURRENT_ALUMNI_ID } from '@/lib/mock-alumni';

interface SidebarProps {
  active: NavKey;
  onChange: (key: NavKey) => void;
  onProfileClick?: () => void;
  onSetProfile?: () => void;
}

const avatarPlaceholderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);

export default function Sidebar({
  active,
  onChange,
  onProfileClick,
  onSetProfile,
}: SidebarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Stand-in for "the logged-in alumni" until real alumni sessions are wired
  // up (see getCurrentAlumni() in lib/auth.ts) — same approach used elsewhere.
  const currentAlumni = mockAlumni.find((a) => a.id === CURRENT_ALUMNI_ID);

  return (
    <aside className="w-[280px] shrink-0 hidden lg:block sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-3 px-2">

      {/* profile row — links to View Profile, shows the real alumni's name/photo */}
      <button
        type="button"
        onClick={onProfileClick}
        className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-[#F5F4FB] transition-colors text-left mb-1"
      >
        <div className="w-9 h-9 rounded-full bg-[#EAF4FB] overflow-hidden flex items-center justify-center shrink-0">
          {currentAlumni?.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentAlumni.photo} alt={currentAlumni.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#8B87A3]">{avatarPlaceholderIcon}</span>
          )}
        </div>
        <span className="text-[15px] font-semibold text-[#241B3A] truncate">
          {currentAlumni?.name ?? 'Your Name'}
        </span>
      </button>

      <div className="h-px bg-black/10 mx-2 my-2" />

      {/* nav — same items/icons as the topbar, with labels */}
      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChange(item.key)}
              className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-xl transition-colors text-left
                         ${isActive ? 'bg-[#EAF4FB] text-[#0E76BD]' : 'text-[#241B3A] hover:bg-[#F5F4FB]'}`}
            >
              <span className={isActive ? 'text-[#0E76BD]' : 'text-[#241B3A]'}>{item.icon}</span>
              <span className="text-[15px] font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Settings — collapsible group */}
        <button
          type="button"
          onClick={() => setSettingsOpen((o) => !o)}
          className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl transition-colors text-left text-[#241B3A] hover:bg-[#F5F4FB]"
        >
          <span className="text-[#241B3A]">{settingsGroup.icon}</span>
          <span className="text-[15px] font-medium flex-1">{settingsGroup.label}</span>
          <span
            className={`text-[#8B87A3] transition-transform duration-150 ${settingsOpen ? 'rotate-180' : ''}`}
          >
            {chevronDownIcon}
          </span>
        </button>

        {settingsOpen && (
          <div className="ml-[19px] pl-3 border-l border-black/10 flex flex-col gap-0.5 my-1">
            <button
              type="button"
              onClick={() => onChange('privacy')}
              className={`text-left px-2 py-2 rounded-lg text-[14px] transition-colors
                         ${active === 'privacy' ? 'text-[#0E76BD] bg-[#EAF4FB] font-medium' : 'text-[#241B3A] hover:bg-[#F5F4FB]'}`}
            >
              Profile Privacy
            </button>
            <button
              type="button"
              onClick={onSetProfile}
              className="text-left px-2 py-2 rounded-lg text-[14px] text-[#241B3A] hover:bg-[#F5F4FB] transition-colors"
            >
              Set Profile
            </button>
          </div>
        )}
      </nav>

    </aside>
  );
}