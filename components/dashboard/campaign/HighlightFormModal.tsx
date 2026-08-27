"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import type { CampaignHighlight, NewHighlightInput } from "@/lib/mock-highlights";

export default function HighlightFormModal({
  highlight,
  onClose,
  onSave,
  onDelete,
}: {
  highlight?: CampaignHighlight; // undefined = creating new
  onClose: () => void;
  onSave: (input: NewHighlightInput) => void;
  onDelete?: () => void;
}) {
  const [name, setName] = useState(highlight?.name ?? "");
  const [photos, setPhotos] = useState<string[]>(highlight?.photos?.length ? highlight.photos : [""]);
  const [error, setError] = useState<string | null>(null);

  function updatePhoto(index: number, value: string) {
    setPhotos((prev) => prev.map((p, i) => (i === index ? value : p)));
  }

  function addPhotoField() {
    setPhotos((prev) => [...prev, ""]);
  }

  function removePhotoField(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSave() {
    const cleanPhotos = photos.map((p) => p.trim()).filter(Boolean);
    if (!name.trim() || cleanPhotos.length === 0) {
      setError("Give it a name and at least one photo URL.");
      return;
    }
    onSave({ name: name.trim(), photos: cleanPhotos, campaignId: highlight?.campaignId });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            {highlight ? "Edit Highlight" : "New Highlight"}
          </h3>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-900 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Library Fund"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Photos</label>
              <button type="button" onClick={addPhotoField} className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                <Plus size={13} /> Add photo
              </button>
            </div>
            <div className="max-h-56 space-y-2 overflow-y-auto styled-scrollbar pr-1">
              {photos.map((photo, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={photo}
                    onChange={(e) => updatePhoto(i, e.target.value)}
                    placeholder="https://..."
                    className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                  {photos.length > 1 && (
                    <button type="button" onClick={() => removePhotoField(i)} aria-label="Remove photo" className="shrink-0 text-red-400 hover:text-red-600">
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          {highlight && onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <Trash2 size={13} /> Delete
            </button>
          ) : <span />}

          <div className="flex items-center gap-2">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800">
              Cancel
            </button>
            <button type="button" onClick={handleSave} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}