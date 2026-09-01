'use client';

import { mockAlumni, CURRENT_ALUMNI_ID } from '@/lib/mock-alumni';
import { arrowLeftIcon } from './icons';

const avatarPlaceholderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);

export default function ProfileView({
  onClose,
  onEditProfile,
}: {
  onClose?: () => void;
  onEditProfile?: () => void;
}) {
  // Stand-in for "the logged-in alumni" until real alumni sessions are wired
  // up (see getCurrentAlumni() in lib/auth.ts) — same approach as SetProfileView.
  const alumni = mockAlumni.find((a) => a.id === CURRENT_ALUMNI_ID) ?? mockAlumni[0];

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

      {/* single card — LinkedIn-style: solid blue cover, avatar hanging over
          the boundary on the left, name + Edit Profile on one row, with
          room below the name for the rest of the details. */}
      <div className="rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(11,90,147,0.06)]">
        <div className="bg-[#0E76BD] h-32" />

        <div className="bg-white px-6 pb-6 flow-root">
          {/* avatar hanging over the boundary, left-aligned */}
          <div style={{ marginTop: '-48px' }} className="mb-3">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-[#EAF4FB] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center">
              {alumni.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={alumni.photo} alt={alumni.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#8B87A3]">{avatarPlaceholderIcon}</span>
              )}
            </div>
          </div>

          {/* name + Edit Profile, same line */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="text-[20px] font-bold text-[#241B3A] truncate">{alumni.name}</h2>
            <button
              type="button"
              onClick={onEditProfile}
              className="shrink-0 px-5 py-2 rounded-full bg-[#F0F2F5] text-[#241B3A] text-sm font-semibold hover:bg-[#E7EAEE] transition-colors"
            >
              Edit Profile
            </button>
          </div>

          {/* space under the name for the rest of the details */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] font-medium text-[#241B3A] bg-[#F0F2F5] px-3 py-1 rounded-full">
              {alumni.faculty}
            </span>
            <span className="text-[12px] font-medium text-[#241B3A] bg-[#F0F2F5] px-3 py-1 rounded-full">
              Batch {alumni.batch}
            </span>
            <span className="text-[12px] font-semibold text-[#0E76BD] bg-[#EAF4FB] px-3 py-1 rounded-full">
              Passout {alumni.passoutYear}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}