'use client';

import { useState, type ReactNode } from 'react';
import { mockAlumni, CURRENT_ALUMNI_ID } from '@/lib/mock-alumni';
import { mockStories, removeStory, type AlumniStory } from '@/lib/mock-stories';
import { arrowLeftIcon } from './icons';
import StoryCard from './StoryCard';

const avatarPlaceholderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);

function ProfileSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)] p-4">
      <p className="text-[13px] font-semibold text-[#8B87A3] mb-3">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11.5px] text-[#8B87A3]">{label}</p>
      <p className="text-[14px] font-medium text-[#241B3A]">{value}</p>
    </div>
  );
}

export default function ProfileView({
  onClose,
  onEditProfile,
}: {
  onClose?: () => void;
  onEditProfile?: () => void;
}) {
  const [stories, setStories] = useState<AlumniStory[]>(() => [...mockStories]);

  // Stand-in for "the logged-in alumni" until real alumni sessions are wired
  // up (see getCurrentAlumni() in lib/auth.ts) — same approach as SetProfileView.
  const alumni = mockAlumni.find((a) => a.id === CURRENT_ALUMNI_ID) ?? mockAlumni[0];
  const myStories = stories.filter((s) => s.alumniId === alumni.id);

  const handleDismiss = (id: string) => {
    removeStory(id);
    setStories([...mockStories]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* back — same convention as Set Profile / Change Password */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Back"
        className="w-9 h-9 rounded-full border-[1.5px] border-[#0E76BD] text-[#0E76BD] flex items-center justify-center hover:bg-[#EAF4FB] transition-colors shrink-0"
      >
        {arrowLeftIcon}
      </button>

      {/* header — plain solid blue box, flush white strip at the bottom */}
      <div className="rounded-2xl bg-[#0E76BD] overflow-hidden shadow-[0_6px_18px_rgba(14,118,189,0.25)]">
        <div className="flex items-center gap-4 flex-wrap px-5 pt-5 pb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
            {alumni.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={alumni.photo} alt={alumni.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#8B87A3]">{avatarPlaceholderIcon}</span>
            )}
          </div>

          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[20px] font-bold text-white">{alumni.name}</h2>
              <span className="text-[12px] font-semibold text-[#0E76BD] bg-white px-3 py-1 rounded-full">
                Passout {alumni.passoutYear}
              </span>
            </div>

            <div className="border-b-2 border-black mt-2 mb-2.5 max-w-[280px]" />

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[12px] font-medium text-[#241B3A] bg-white px-3 py-1 rounded-full">
                {alumni.faculty}
              </span>
              <span className="text-[12px] font-medium text-[#241B3A] bg-white px-3 py-1 rounded-full">
                Batch {alumni.batch}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onEditProfile}
            className="shrink-0 px-5 py-2.5 rounded-full bg-white text-[#241B3A] text-sm font-semibold hover:bg-[#F0F2F5] transition-colors"
          >
            Edit Profile
          </button>
        </div>

        {/* explicit rounded-b-2xl on the strip itself — same proven technique
            used on StoryCard's bottom, rather than relying on the parent to
            clip it, which wasn't rendering the curve reliably. */}
        <div className="bg-white rounded-b-2xl h-2.5" />
      </div>

      {/* two-column body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* left column */}
        <div className="space-y-4">
          <ProfileSection title="Personal Detail">
            <ProfileRow label="Birth Date" value={alumni.dob ?? '—'} />
            <ProfileRow label="Gender" value={alumni.gender ?? '—'} />
            <ProfileRow label="Location" value={alumni.address ?? '—'} />
          </ProfileSection>

          <ProfileSection title="Contact Details">
            <ProfileRow label="Email" value={alumni.email} />
            <ProfileRow label="Phone No." value={alumni.contact} />
          </ProfileSection>

          <ProfileSection title="Current Status">
            <ProfileRow label="Job" value={alumni.currentJob} />
          </ProfileSection>
        </div>

        {/* right column */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)] p-4">
            <p className="text-[13px] font-semibold text-[#8B87A3] mb-2">Photo / Video</p>
            {alumni.photo ? (
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#F0F2F5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={alumni.photo} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-full aspect-video rounded-xl bg-[#F0F2F5] flex items-center justify-center text-[#8B87A3] text-sm">
                No media yet
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-bold text-[#241B3A]">Story</p>
              <span className="text-[13px] font-semibold text-[#0E76BD]">More Posts</span>
            </div>
            <p className="text-[13px] text-[#8B87A3] mt-1">
              {myStories.length} {myStories.length === 1 ? 'story' : 'stories'} shared
            </p>
          </div>

          <div>
            <p className="text-[15px] font-bold text-[#241B3A] mb-2 px-1">Own Shared Post</p>
            <div className="space-y-4">
              {myStories.map((story) => (
                <StoryCard key={story.id} story={story} onDismiss={() => handleDismiss(story.id)} />
              ))}
              {myStories.length === 0 && (
                <p className="text-center text-sm text-[#8B87A3] bg-white rounded-2xl border border-black/5 py-8">
                  No posts yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}