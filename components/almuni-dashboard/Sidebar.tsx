'use client';

import { navItems, type NavKey } from './navItems';

interface SidebarProps {
  active: NavKey;
  onChange: (key: NavKey) => void;
  userName?: string;
  onProfileClick?: () => void;
}

export default function Sidebar({ active, onChange, userName = 'Your Name', onProfileClick }: SidebarProps) {
  return (
    <aside className="w-[280px] shrink-0 hidden lg:block sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-3 px-2">

      {/* profile row */}
      <button
        type="button"
        onClick={onProfileClick}
        className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-[#F5F4FB] transition-colors text-left mb-1"
      >
        <div className="w-9 h-9 rounded-full bg-[#EAF4FB] overflow-hidden flex items-center justify-center shrink-0">
          {/* e.g. <img src="/avatar.jpg" alt="" className="w-full h-full object-cover" /> */}
        </div>
        <span className="text-[15px] font-semibold text-[#241B3A] truncate">{userName}</span>
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
      </nav>

    </aside>
  );
}