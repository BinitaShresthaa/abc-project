'use client';

import { useState, useRef, useEffect } from 'react';
import ProfileMenu from './ProfileMenu';
import type { NavKey } from './navItems';
import { searchIcon } from './icons';

interface TopbarProps {
  // Kept optional so existing callers that still pass these (in sync with
  // the Sidebar) don't need to change. Topbar itself no longer renders nav.
  active?: NavKey;
  onChange?: (key: NavKey) => void;
  onSetProfile?: () => void;
}

const chevronDownIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function Topbar({ onSetProfile }: TopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)]">
      <div className="h-full max-w-[1600px] mx-auto flex items-center justify-between px-4 md:px-6 gap-4">

        {/* LEFT — logo only */}
        <div className="flex items-center shrink-0 w-[56px] md:w-[180px]">
          <div className="w-10 h-10 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0">
            {/* e.g. <img src="/logo.svg" alt="Logo" className="w-6 h-6" /> */}
          </div>
        </div>

        {/* CENTER — search */}
        <div className="flex-1 flex justify-center px-2">
          <div className="relative w-full max-w-[480px]">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B87A3]">
              {searchIcon}
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-full bg-[#F0F2F5] pl-9 pr-4 py-2 text-sm text-[#241B3A]
                         placeholder-[#8B87A3] outline-none border border-transparent
                         focus:bg-white focus:border-[#A9D4EF] transition-colors"
            />
          </div>
        </div>

        {/* RIGHT — profile slot + dropdown */}
        <div className="relative flex items-center w-[120px] shrink-0 justify-end" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full hover:bg-[#F5F4FB] transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#EAF4FB] overflow-hidden flex items-center justify-center">
              {/* e.g. <img src="/avatar.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
            </div>
            <span className="text-[#8B87A3]">{chevronDownIcon}</span>
          </button>

          {profileOpen && (
            <ProfileMenu
              onViewProfile={() => console.log('View Profile')}
              onSetProfile={() => {
                setProfileOpen(false);
                onSetProfile?.();
              }}
              onChangePasswordSubmit={(data) => console.log('Password change submitted:', data)}
              onVisibilityChange={(v) => console.log('Visibility set to:', v)}
              onLogOut={() => console.log('Log out')}
            />
          )}
        </div>

      </div>
    </header>
  );
}