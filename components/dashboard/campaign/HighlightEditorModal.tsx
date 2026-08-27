"use client";

import { useEffect, useState } from "react";
import { X, Trash2, Upload } from "lucide-react";
import type { Campaign, CampaignHighlight } from "@/lib/campaigns/types";

export default function HighlightEditorModal({
  campaign,           // known already (opened via a card's "Highlight" button)
  availableCampaigns, // used only when campaign is not yet known (opened via top "Add Highlight")
  onClose,
  onSaved,
}: {
  campaign?: Campaign;
  availableCampaigns?: Campaign[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [activeCampaign, setActiveCampaign] = useState<Campaign | undefined>(campaign);
  const [highlight, setHighlight] = useState<CampaignHighlight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (campaign) ensureHighlight(campaign.id);
  }, [campaign]);

  async function ensureHighlight(campaignId: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/highlights", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ campaignId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to start highlight.");
      setHighlight(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectCampaign(id: string) {
    const found = availableCampaigns?.find((c) => c.id === id);
    setActiveCampaign(found);
    if (found) ensureHighlight(found.id);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !activeCampaign) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.set("image", file);
    try {
      const res = await fetch(`/api/highlights/${activeCampaign.id}/photos`, { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload photo.");
      setHighlight(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  async function removePhoto(index: number) {
    if (!activeCampaign) return;
    const res = await fetch(`/api/highlights/${activeCampaign.id}/photos/${index}`, { method: "DELETE" });
    if (res.ok) setHighlight(await res.json());
  }

  async function handleRemoveHighlight() {
    if (!activeCampaign) return;
    if (!confirm(`Remove "${activeCampaign.title}" from Highlights?`)) return;
    await fetch(`/api/highlights/${activeCampaign.id}`, { method: "DELETE" });
    onSaved();
    onClose();
  }

  function handleDone() {
    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="max-h-[85vh] w-full max-w-md overflow-y-auto styled-scrollbar rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">Edit Highlight</h3>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={18} /></button>
        </div>

        {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-900 dark:bg-red-500/10 dark:text-red-400">{error}</div>}

        {!activeCampaign ? (
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Select campaign</label>
            <select onChange={(e) => handleSelectCampaign(e.target.value)} defaultValue="" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
              <option value="" disabled>Choose a campaign to highlight</option>
              {availableCampaigns?.map((c) => (<option key={c.id} value={c.id}>{c.title}</option>))}
            </select>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-2 dark:border-slate-800">
              <img src={activeCampaign.image} alt={activeCampaign.title} className="h-12 w-12 rounded-lg object-cover" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{activeCampaign.title}</span>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Extra photos ({highlight?.photos.length ?? 0})</label>
              <div className="grid grid-cols-4 gap-2">
                {highlight?.photos.map((photo, i) => (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-lg">
                    <img src={photo} alt="" className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removePhoto(i)} className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"><X size={12} /></button>
                  </div>
                ))}
              </div>
            </div>

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-3 text-sm font-medium text-slate-500 hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-400">
              <Upload size={15} /> {loading ? "Uploading..." : "Add a photo"}
              <input type="file" accept="image/*" onChange={handleUpload} disabled={loading} className="hidden" />
            </label>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          {activeCampaign ? (
            <button type="button" onClick={handleRemoveHighlight} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"><Trash2 size={13} /> Remove from Highlights</button>
          ) : <span />}
          <button type="button" onClick={handleDone} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">Done</button>
        </div>
      </div>
    </div>
  );
}