'use client';

import { useState } from 'react';
import { quicksand } from '@/lib/fonts';
import Topbar from '@/components/almuni-dashboard/Topbar';
import Sidebar from '@/components/almuni-dashboard/Sidebar';
import AlumniListView from '@/components/almuni-dashboard/AlmuniListView';
import type { NavKey } from '@/components/almuni-dashboard/navItems';
import SetProfileView from '@/components/almuni-dashboard/SetProfileview';
import ChangePasswordView from '@/components/almuni-dashboard/ChangePasswordView';

export default function AlmuniDashboardPage() {
  const [active, setActive] = useState<NavKey>('home');
  const [showSetProfile, setShowSetProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Any sidebar/topbar nav click takes you out of Set Profile / Change
  // Password and back to a tab.
  const handleNavChange = (key: NavKey) => {
    setShowSetProfile(false);
    setShowChangePassword(false);
    setActive(key);
  };

  return (
    <div className={`${quicksand.className} min-h-screen bg-[#F0F2F5]`}>
      <Topbar
        active={active}
        onChange={handleNavChange}
        onSetProfile={() => {
          setShowChangePassword(false);
          setShowSetProfile(true);
        }}
        onChangePassword={() => {
          setShowSetProfile(false);
          setShowChangePassword(true);
        }}
      />
      <div className="max-w-[1600px] mx-auto flex">
        <Sidebar active={active} onChange={handleNavChange} />
        <main className="flex-1 px-4 md:px-6 py-6 min-w-0">
          {showSetProfile ? (
            <SetProfileView />
          ) : showChangePassword ? (
            <ChangePasswordView />
          ) : (
            <>
              {active === 'home' && (
                <div className="text-center text-[#8B87A3] py-20">Home — coming soon</div>
              )}
              {active === 'story' && (
                <div className="text-center text-[#8B87A3] py-20">Story — coming soon</div>
              )}
              {active === 'alumni' && <AlumniListView />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}