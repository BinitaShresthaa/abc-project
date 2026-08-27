'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { mockAlumni, CURRENT_ALUMNI_ID, updateAlumniProfile } from '@/lib/mock-alumni';

const avatarPlaceholderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);

const inputClass =
  'w-full rounded-xl bg-[#F0F2F5] px-4 py-2.5 text-sm text-[#241B3A] placeholder-[#8B87A3] outline-none border border-transparent focus:bg-white focus:border-[#A9D4EF] transition-colors';

const labelClass = 'block text-[13px] font-semibold text-[#241B3A] mb-1.5';

export default function SetProfileView() {
  // Stand-in for "the logged-in alumni" until real alumni sessions are wired
  // up (see getCurrentAlumni() in lib/auth.ts) — swap this lookup out then.
  const currentAlumni = mockAlumni.find((a) => a.id === CURRENT_ALUMNI_ID) ?? mockAlumni[0];

  const [photoPreview, setPhotoPreview] = useState<string | undefined>(currentAlumni.photo);
  const [contact, setContact] = useState(currentAlumni.contact);
  const [email, setEmail] = useState(currentAlumni.email);
  const [currentJob, setCurrentJob] = useState(currentAlumni.currentJob);
  const [address, setAddress] = useState(currentAlumni.address ?? '');
  const [saved, setSaved] = useState(false);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Local-preview only for now — wire this up to real file storage/upload later.
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateAlumniProfile(currentAlumni.id, {
      photo: photoPreview,
      contact,
      email,
      currentJob,
      address,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)]">
      <div className="px-5 py-4 border-b border-black/5">
        <h2 className="text-[22px] font-bold text-[#241B3A]">Set Profile</h2>
        <p className="text-[13px] text-[#8B87A3] mt-1">
          Update your profile photo and contact details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 max-w-xl">
        {/* photo */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-[#EAF4FB] flex items-center justify-center shrink-0">
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreview} alt={currentAlumni.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#8B87A3]">{avatarPlaceholderIcon}</span>
            )}
          </div>
          <label className="cursor-pointer text-sm font-semibold text-[#0E76BD] hover:underline">
            Change Photo
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={inputClass}
              placeholder="+977-98XXXXXXXX"
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className={labelClass}>Current Job</label>
          <input
            type="text"
            value={currentJob}
            onChange={(e) => setCurrentJob(e.target.value)}
            className={inputClass}
            placeholder="Job title, Organization"
          />
        </div>

        <div className="mb-6">
          <label className={labelClass}>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={inputClass}
            placeholder="City, District"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-full bg-[#0E76BD] text-white text-sm font-semibold hover:bg-[#0b5f99] transition-colors"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-[13px] text-green-600 font-medium">Profile updated.</span>
          )}
        </div>
      </form>
    </div>
  );
}