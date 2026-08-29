"use client";

import { useEffect, useState } from "react";
import { clubList } from "@/lib/club-data";
import type { Campaign } from "@/lib/campaigns/types";

export default function CampaignEditView({ campaignId }: { campaignId: string }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/campaigns").then((r) => r.json()).then((all: Campaign[]) => setCampaign(all.find((c) => c.id === campaignId) ?? null));
  }, [campaignId]);

  if (!campaign) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading...</div>;
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/campaigns/${campaignId}`, { method: "PATCH", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update.");
      setCampaign(data);
      setSuccessMsg(`"${data.title}" has been updated.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-base font-bold text-slate-800 dark:text-white">Edit Campaign</h2>

      {successMsg && <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400">{successMsg}</div>}
      {error && <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-500/10 dark:text-red-400">{error}</div>}

      <form key={campaign.id} onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Photo</label>
          <img src={preview || campaign.image} alt="Current" className="mb-2 h-32 w-full rounded-lg object-cover" />
          <input type="file" name="image" accept="image/*" onChange={handlePhotoChange} className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/20 dark:text-slate-300" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Title</label>
          <input name="title" defaultValue={campaign.title} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Description</label>
          <textarea name="description" defaultValue={campaign.description} rows={3} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
  <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Club</label>
  <select name="faculty" defaultValue={campaign.faculty} className="max-h-60 w-full overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
    {clubList.map((c) => (<option key={c} value={c}>{c}</option>))}
  </select>
</div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Status</label>
            <select name="status" defaultValue={campaign.status} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
              <option value="UPCOMING">Upcoming</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Launch Date (optional)</label>
<input type="date" name="launchDate" defaultValue={/* Edit only */ campaign?.launchDate ?? ""} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />        </div>
        <div className="flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <button type="submit" disabled={submitting} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Updating..." : "Update Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
}