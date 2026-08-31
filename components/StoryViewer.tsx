"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { HighlightEntry } from "./CampaignStories";

const DURATION = 5000; // ms per photo, like IG/FB stories

export default function StoryViewer({
  entries,
  startIndex,
  onClose,
  onDonate,
  contained = false,
}: {
  entries: HighlightEntry[];
  startIndex: number;
  onClose: () => void;
  onDonate?: (campaign: HighlightEntry["campaign"]) => void;
  contained?: boolean;
}) {
  const [entryIndex, setEntryIndex] = useState(startIndex);
  const [photoIndex, setPhotoIndex] = useState(0);
  const entry = entries[entryIndex];
  const photos = entry?.photos ?? [];

  function goNext() {
    if (photoIndex < photos.length - 1) {
      setPhotoIndex((i) => i + 1);
    } else if (entryIndex < entries.length - 1) {
      setEntryIndex((i) => i + 1);
      setPhotoIndex(0);
    } else if (!contained) {
      onClose();
    }
  }

  function goPrev() {
    if (photoIndex > 0) {
      setPhotoIndex((i) => i - 1);
    } else if (entryIndex > 0) {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      goNext();
    }, DURATION);
    return () => clearTimeout(timer);
  }, [entryIndex, photoIndex]);

  if (!entry) return null;
  const { campaign } = entry;

  const card = (
    <div
      className={
        contained
          ? "relative aspect-[9/16] w-full max-w-xs overflow-hidden rounded-2xl bg-black shadow-2xl"
          : "relative h-full w-full max-w-md overflow-hidden bg-black sm:h-[90vh] sm:rounded-2xl"
      }
    >
      <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 p-3">
        {photos.map((_, i) => (
          <div key={`${entryIndex}-${i}`} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
            {i < photoIndex ? (
              <div className="h-full w-full rounded-full bg-white" />
            ) : i === photoIndex ? (
              <div
                key={`${entryIndex}-${photoIndex}-active`}
                className="h-full rounded-full bg-white"
                style={{ animation: `story-fill ${DURATION}ms linear forwards` }}
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className="absolute left-3 top-8 z-20">
        <span className="text-sm font-bold text-white drop-shadow">{campaign.title}</span>
      </div>
      <button type="button" onClick={onClose} className="absolute right-3 top-7 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white">
        <X size={18} />
      </button>

      <img src={photos[photoIndex]} alt={campaign.title} className="h-full w-full object-contain" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 pb-6">
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">{campaign.faculty}</p>
        <p className="mt-1 line-clamp-3 text-xs leading-5 text-white/90">{campaign.description}</p>
      </div>

      <button type="button" aria-label="Previous photo" onClick={goPrev} className="absolute left-0 top-0 h-full w-1/3" />
      <button type="button" aria-label="Next photo" onClick={goNext} className="absolute right-0 top-0 h-full w-1/3" />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-sm p-4">
      {card}
    </div>
  );
}