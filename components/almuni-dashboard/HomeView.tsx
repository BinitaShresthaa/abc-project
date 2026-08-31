'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { mockAlumni, CURRENT_ALUMNI_ID } from '@/lib/mock-alumni';
import { mockStories, addStory, removeStory, type AlumniStory } from '@/lib/mock-stories';
import StoryCard from './StoryCard';

const inputClass =
  'w-full rounded-xl bg-[#F0F2F5] px-4 py-2.5 text-sm text-[#241B3A] placeholder-[#8B87A3] outline-none border border-transparent focus:bg-white focus:border-[#A9D4EF] transition-colors';

const labelClass = 'block text-[13px] font-semibold text-[#241B3A] mb-1.5';

const avatarPlaceholderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);

const photoIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

export default function HomeView() {
  const [stories, setStories] = useState<AlumniStory[]>(() => [...mockStories]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | undefined>();

  // Stand-in for "the logged-in alumni" until real alumni sessions are wired
  // up (see getCurrentAlumni() in lib/auth.ts) — same approach as SetProfileView.
  const currentAlumni = mockAlumni.find((a) => a.id === CURRENT_ALUMNI_ID);
  const firstName = currentAlumni?.name.split(' ')[0] ?? 'there';
  const myStories = stories.filter((s) => s.alumniId === CURRENT_ALUMNI_ID);

  const handleDismiss = (id: string) => {
    removeStory(id);
    setStories([...mockStories]);
  };

  const resetForm = () => {
    setTitle('');
    setText('');
    setImage(undefined);
  };

  const handleImagePick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Local-preview only — wire this up to real file storage/upload later.
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !text.trim() && !image) return;

    addStory({
      id: `story-${Date.now()}`,
      alumniId: CURRENT_ALUMNI_ID,
      title: title.trim() || 'Untitled',
      text: text.trim(),
      image,
      postedAt: 'Just now',
    });
    setStories([...mockStories]);
    resetForm();
    setModalOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Facebook-style composer bar */}
      <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)] px-4 py-3 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-[#EAF4FB] flex items-center justify-center shrink-0">
          {currentAlumni?.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentAlumni.photo} alt={currentAlumni.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#8B87A3]">{avatarPlaceholderIcon}</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex-1 text-left rounded-full bg-[#F0F2F5] px-4 py-2.5 text-[15px] text-[#8B87A3] hover:bg-[#EAF4FB] transition-colors truncate"
        >
          What&apos;s on your mind, {firstName}?
        </button>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          aria-label="Add photo"
          className="w-10 h-10 rounded-full flex items-center justify-center text-green-500 hover:bg-[#F5F4FB] transition-colors shrink-0"
        >
          {photoIcon}
        </button>
      </div>

      {/* only this alumni's own posts */}
      {myStories.map((story) => (
        <StoryCard key={story.id} story={story} onDismiss={() => handleDismiss(story.id)} />
      ))}

      {myStories.length === 0 && (
        <p className="text-center text-sm text-[#8B87A3] py-10">
          You haven&apos;t shared anything yet. Tap above to post your first story.
        </p>
      )}

      {/* compose modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-[17px] font-bold text-[#241B3A]">Share your story</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#8B87A3] hover:bg-[#F5F4FB] transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className={labelClass}>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your story a title"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  placeholder="What's your story?"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {image && (
                <div className="relative rounded-xl overflow-hidden aspect-video bg-[#F0F2F5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="" className="w-full h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => setImage(undefined)}
                    aria-label="Remove photo"
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white text-sm flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <label className="cursor-pointer text-sm font-semibold text-[#0E76BD] hover:underline">
                  Add Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
                </label>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#0E76BD] text-white text-sm font-semibold hover:bg-[#0b5f99] transition-colors"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}