'use client';

import { useState } from 'react';
import { mockAlumni } from '@/lib/mock-alumni';
import { mockStories, type AlumniStory } from '@/lib/mock-stories';

const avatarPlaceholderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);

const TEXT_TRUNCATE_LENGTH = 180;

function getAlumni(alumniId: string) {
  return mockAlumni.find((a) => a.id === alumniId);
}

export default function StoryView() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {mockStories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}

function StoryCard({ story }: { story: AlumniStory }) {
  const alumni = getAlumni(story.alumniId);
  const [expanded, setExpanded] = useState(false);
  const isLong = story.text.length > TEXT_TRUNCATE_LENGTH;
  const displayText =
    expanded || !isLong ? story.text : story.text.slice(0, TEXT_TRUNCATE_LENGTH).trimEnd() + '…';

  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)] overflow-hidden">
      {/* header — same layout for every card */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-[#EAF4FB] flex items-center justify-center shrink-0">
          {alumni?.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={alumni.photo} alt={alumni.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#8B87A3]">{avatarPlaceholderIcon}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[14.5px] font-semibold text-[#241B3A] truncate">
            {alumni?.name ?? 'Alumni'}
          </p>
          <p className="text-[12px] text-[#8B87A3] truncate">
            {story.postedAt}
            {alumni ? ` · ${alumni.faculty}, Batch ${alumni.batch}` : ''}
          </p>
        </div>
      </div>

      {/* text — only this part grows on "See more" */}
      {story.text && (
        <div className="px-4 pb-3">
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

      {/* image — same fixed aspect ratio for every card, so cards stay uniform */}
      {story.image && (
        <div className="w-full aspect-video bg-[#F0F2F5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={story.image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}