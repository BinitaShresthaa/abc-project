'use client';

import { useState } from 'react';
import { mockAlumni } from '@/lib/mock-alumni';
import type { AlumniStory } from '@/lib/mock-stories';

const avatarPlaceholderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);

const closeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 6 6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

const TEXT_TRUNCATE_LENGTH = 180;

export function getAlumni(alumniId: string) {
  return mockAlumni.find((a) => a.id === alumniId);
}

export default function StoryCard({
  story,
  onDismiss,
}: {
  story: AlumniStory;
  onDismiss: () => void;
}) {
  const alumni = getAlumni(story.alumniId);
  const [expanded, setExpanded] = useState(false);
  const isLong = story.text.length > TEXT_TRUNCATE_LENGTH;
  const displayText =
    expanded || !isLong ? story.text : story.text.slice(0, TEXT_TRUNCATE_LENGTH).trimEnd() + '…';

  return (
    <div className="rounded-2xl bg-[#0E76BD] py-1 px-1.5 shadow-[0_6px_18px_rgba(14,118,189,0.25)]">
      {/* header — items-end for avatar/text, but the close button opts out with self-start */}
      <div className="flex items-end gap-3 px-2 pb-3 pt-2">
        <div className="w-16 h-16 ml-2 rounded-full bg-white overflow-hidden flex items-center justify-center shrink-0">
          {alumni?.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={alumni.photo} alt={alumni.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#8B87A3]">{avatarPlaceholderIcon}</span>
          )}
        </div>

        <div className="flex-1 min-w-0 mb-1.5">
          <p className="text-[15px] font-bold text-white truncate">{alumni?.name ?? 'Alumni'}</p>
          {alumni && <p className="text-[12px] text-white/80 truncate">{alumni.faculty}</p>}
          <p className="text-[11.5px] text-white/70 truncate">{story.postedAt}</p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss story"
          className="self-start shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:bg-white/15 hover:text-white transition-colors"
        >
          {closeIcon}
        </button>
      </div>

      {/* white post box */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="px-4 pt-3 pb-2">
          <p className="text-[15px] font-bold text-[#241B3A] text-center">{story.title}</p>
        </div>

        {story.image && (
          <div className="relative w-full aspect-video overflow-hidden bg-[#F0F2F5]">
            {/* blurred, zoomed copy fills the box so there's no bare gray/black gap */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={story.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
            />
            {/* actual image, shown at its own aspect ratio, never cropped */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={story.image} alt="" className="relative w-full h-full object-contain" />
          </div>
        )}

        {story.text && (
          <div className="px-4 py-3">
            <p className="text-[14px] text-[#241B3A] leading-relaxed whitespace-pre-line">
              {displayText}
              {isLong && (
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="ml-1 text-[#0E76BD] font-semibold hover:underline"
                >
                  {expanded ? 'See less' : 'See more'}
                </button>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}