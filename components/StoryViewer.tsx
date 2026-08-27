"use client";

import { useEffect, useState } from "react";
import { X, Heart } from "lucide-react";
import type { HighlightEntry } from "./CampaignStories";

export default function StoryViewer({ entries, startIndex, onClose, onDonate }: {
  entries: HighlightEntry[]; startIndex: number; onClose: () => void; onDonate: (campaign: HighlightEntry["campaign"]) => void;
}) {
  const [entryIndex, setEntryIndex] = useState(startIndex);
  const [photoIndex, setPhotoIndex] = useState(0);
  const entry = entries[entryIndex];
  const photos = entry?.photos ?? [];

  useEffect(() => { setPhotoIndex(0); }, [entryIndex]);

  function goNext() {
    if (photoIndex < photos.length - 1) setPhotoIndex((i) => i + 1);
    else if (entryIndex < entries.length - 1) setEntryIndex((i) => i + 1);
    else onClose();
  }
  function goPrev() {
    if (photoIndex > 0) setPhotoIndex((i) => i - 1);
    else if (entryIndex > 0) {
      const prevPhotos = entries[entryIndex - 1].photos;
      setEntryIndex((i) => i - 1);
      setPhotoIndex(Math.max(0, prevPhotos.length - 1));
    }
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  if (!entry) return null;
  const { campaign } = entry;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-0 sm:p-4">
      <div className="relative h-full w-full max-w-md overflow-hidden bg-black sm:h-[90vh] sm:rounded-2xl">
        <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 p-3">
          {photos.map((_, i) => (
            <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              <div className={`h-full rounded-full bg-white transition-all ${i <= photoIndex ? "w-full" : "w-0"}`} />
            </div>
          ))}
        </div>
        <div className="absolute left-3 top-8 z-20"><span className="text-sm font-bold text-white drop-shadow">{campaign.title}</span></div>
        <button type="button" onClick={onClose} className="absolute right-3 top-7 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white"><X size={18} /></button>

        <img src={photos[photoIndex]} alt={campaign.title} className="h-full w-full object-cover" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-white/70">{campaign.faculty}</p>
          <p className="mt-1 line-clamp-3 text-sm leading-6 text-white/90">{campaign.description}</p>
          {campaign.status !== "COMPLETED" && (
            <button type="button" onClick={() => onDonate(campaign)} className="pointer-events-auto mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600">
              <Heart size={16} fill="currentColor" /> Donate Now
            </button>
          )}
        </div>

        <button type="button" aria-label="Previous photo" onClick={goPrev} className="absolute left-0 top-0 h-full w-1/3" />
        <button type="button" aria-label="Next photo" onClick={goNext} className="absolute right-0 top-0 h-full w-1/3" />
      </div>
    </div>
  );
}