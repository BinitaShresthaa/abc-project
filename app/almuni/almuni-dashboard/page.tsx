'use client';

import { useState } from 'react';
import { quicksand } from '@/lib/fonts';
import Topbar from '@/components/almuni-dashboard/Topbar';
import Sidebar from '@/components/almuni-dashboard/Sidebar';
import HomeView from '@/components/almuni-dashboard/HomeView';
import AlumniListView from '@/components/almuni-dashboard/AlmuniListView';
import SetProfileView from '@/components/almuni-dashboard/SetProfileview';
import ChangePasswordView from '@/components/almuni-dashboard/ChangePasswordView';
import ProfileView from '@/components/almuni-dashboard/ProfileView';
import StoryView from '@/components/almuni-dashboard/StoryView';
import PrivacyView from '@/components/almuni-dashboard/PrivacyView';
import type { NavKey } from '@/components/almuni-dashboard/navItems';

export default function AlmuniDashboardPage() {
  const [active, setActive] = useState<NavKey>('home');
  const [showSetProfile, setShowSetProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showViewProfile, setShowViewProfile] = useState(false);

  // Any sidebar/topbar nav click takes you out of Set Profile / Change
  // Password / View Profile and back to a tab.
  const handleNavChange = (key: NavKey) => {
    setShowSetProfile(false);
    setShowChangePassword(false);
    setShowViewProfile(false);
    setActive(key);
  };

  return (
    <div className={`${quicksand.className} min-h-screen bg-[#F0F2F5]`}>
      <Topbar
        active={active}
        onChange={handleNavChange}
        onViewProfile={() => {
          setShowSetProfile(false);
          setShowChangePassword(false);
          setShowViewProfile(true);
        }}
        onSetProfile={() => {
          setShowChangePassword(false);
          setShowViewProfile(false);
          setShowSetProfile(true);
        }}
        onChangePassword={() => {
          setShowSetProfile(false);
          setShowViewProfile(false);
          setShowChangePassword(true);
        }}
      />

      {showViewProfile ? (
        // Full width, no sidebar, for the profile page.
        <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6">
          <ProfileView
            onClose={() => setShowViewProfile(false)}
            onEditProfile={() => {
              setShowViewProfile(false);
              setShowSetProfile(true);
            }}
          />
        </main>
      ) : (
        <div className="max-w-[1600px] mx-auto flex">
          <Sidebar
            active={active}
            onChange={handleNavChange}
            onProfileClick={() => {
              setShowSetProfile(false);
              setShowChangePassword(false);
              setShowViewProfile(true);
            }}
            onSetProfile={() => {
              setShowChangePassword(false);
              setShowViewProfile(false);
              setShowSetProfile(true);
            }}
          />
          <main className="flex-1 px-4 md:px-6 py-6 min-w-0">
            {showSetProfile ? (
              <SetProfileView onClose={() => setShowSetProfile(false)} />
            ) : showChangePassword ? (
              <ChangePasswordView onClose={() => setShowChangePassword(false)} />
            ) : (
              <>
                {active === 'home' && <HomeView />}
                {active === 'story' && <StoryView />}
                {active === 'alumni' && <AlumniListView />}
                {active === 'privacy' && <PrivacyView />}
              </>
            )}
          </main>
        </div>
      )}
    </div>
  );
}