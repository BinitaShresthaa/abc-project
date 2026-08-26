'use client';

import { useState } from 'react';
import { quicksand } from '@/lib/fonts';
import Topbar from '@/components/almuni-dashboard/Topbar';
import Sidebar from '@/components/almuni-dashboard/Sidebar';
import type { NavKey } from '@/components/almuni-dashboard/navItems';

export default function AlmuniDashboardPage() {
  const [active, setActive] = useState<NavKey>('home');

  return (
    <div className={`${quicksand.className} min-h-screen bg-[#F0F2F5]`}>
      <Topbar active={active} onChange={setActive} />
      <div className="max-w-[1600px] mx-auto flex">
        <Sidebar active={active} onChange={setActive} />
        <main className="flex-1 px-4 md:px-6 py-6 min-w-0">
          {/* content goes here next */}
        </main>
      </div>
    </div>
  );
}