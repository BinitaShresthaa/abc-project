'use client';

import { useState, useRef, useEffect } from 'react';
import ProfileMenu from './ProfileMenu';
import { navItems, type NavKey } from './navItems';
import { searchIcon } from './icons';

interface TopbarProps {
  active: NavKey;
  onChange: (key: NavKey) => void;
}

const chevronDownIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function Topbar({ active, onChange }: TopbarProps) {
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

        {/* LEFT — logo slot + search */}
        <div className="flex items-center gap-2 shrink-0 w-[140px] md:w-[280px]">
          <div className="w-10 h-10 rounded-full bg-[#EAF4FB] flex items-center justify-center shrink-0">
            {/* e.g. <img src="/logo.svg" alt="Logo" className="w-6 h-6" /> */}
          </div>
          <div className="relative hidden md:block flex-1">
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

        {/* CENTER — nav */}
        <nav className="flex-1 flex items-center justify-center gap-1 max-w-[420px]">
          {navItems.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onChange(item.key)}
                title={item.label}
                className={`relative flex items-center justify-center w-24 md:w-28 h-14 rounded-xl transition-colors
                           ${isActive ? 'text-[#0E76BD]' : 'text-[#8B87A3] hover:bg-[#F5F4FB]'}`}
              >
                {item.icon}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#0E76BD] rounded-t-full" />
                )}
              </button>
            );
          })}
        </nav>

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
              onSetProfile={() => console.log('Set Profile')}
              onChangePassword={() => console.log('Change Password')}
              onVisibilityChange={(v) => console.log('Visibility set to:', v)}
              onLogOut={() => console.log('Log out')}
            />
          )}
        </div>

      </div>
    </header>
  );
}