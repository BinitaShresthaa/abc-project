'use client';

import { useEffect, useMemo, useState } from 'react';
import { mockAlumni, type Alumni } from '@/lib/mock-alumni';

const dotsIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

const avatarPlaceholderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);

const selectClass =
  'rounded-full bg-[#F0F2F5] px-4 py-2 text-sm text-[#241B3A] outline-none border border-transparent focus:bg-white focus:border-[#A9D4EF] transition-colors';

export default function AlumniListView() {
  const [batch, setBatch] = useState('');
  const [faculty, setFaculty] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!(e.target as Element).closest('[data-alumni-menu]')) setOpenMenuId(null);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const batchOptions = useMemo(
    () => Array.from(new Set(mockAlumni.map((a) => a.batch))).sort(),
    []
  );
  const facultyOptions = useMemo(
    () => Array.from(new Set(mockAlumni.map((a) => a.faculty))).sort(),
    []
  );

  const filtered = mockAlumni.filter((a) => {
    if (batch && a.batch !== batch) return false;
    if (faculty && a.faculty !== faculty) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)]">
      {/* header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-black/5">
        <h2 className="text-[22px] font-bold text-[#241B3A]">Alumni List</h2>

        <div className="flex flex-wrap items-center gap-2">
          <select value={batch} onChange={(e) => setBatch(e.target.value)} className={selectClass}>
            <option value="">All Batch</option>
            {batchOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <select value={faculty} onChange={(e) => setFaculty(e.target.value)} className={selectClass}>
            <option value="">All Faculty</option>
            {facultyOptions.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      {/* card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 p-4">
        {filtered.map((alumni) => (
          <AlumniCard
            key={alumni.id}
            alumni={alumni}
            menuOpen={openMenuId === alumni.id}
            onToggleMenu={() => setOpenMenuId((id) => (id === alumni.id ? null : alumni.id))}
          />
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-[#8B87A3] py-10">
            No alumni match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
}

function AlumniCard({
  alumni,
  menuOpen,
  onToggleMenu,
}: {
  alumni: Alumni;
  menuOpen: boolean;
  onToggleMenu: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-[#F5F4FB] transition-colors">
      <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-[#EAF4FB] flex items-center justify-center">
        {alumni.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={alumni.photo} alt={alumni.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[#8B87A3]">{avatarPlaceholderIcon}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-[#241B3A] truncate">{alumni.name}</p>
        <p className="text-[13px] text-[#8B87A3] truncate">{alumni.currentJob}</p>
      </div>

      <div className="relative shrink-0" data-alumni-menu>
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label="More options"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#8B87A3] hover:bg-[#EAF4FB] transition-colors"
        >
          {dotsIcon}
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 w-44 rounded-xl bg-white shadow-[0_16px_40px_rgba(11,90,147,0.18)] border border-black/5 py-1 z-10">
            <button
              onClick={() => { console.log('View profile', alumni.id); onToggleMenu(); }}
              className="w-full text-left px-4 py-2 text-sm text-[#241B3A] hover:bg-[#F5F4FB] transition-colors"
            >
              View Profile
            </button>
            <button
              onClick={() => { console.log('Message', alumni.id); onToggleMenu(); }}
              className="w-full text-left px-4 py-2 text-sm text-[#241B3A] hover:bg-[#F5F4FB] transition-colors"
            >
              Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}