"use client";

import { useEffect, useState } from "react";
import { clubList } from "@/lib/club-data";
import type { Campaign } from "@/lib/campaigns/types";
import { useToast } from "@/lib/toast-context";
import { validateLaunchDate } from "@/lib/validation";
import NepaliDatePicker from "@/components/dashboard/forms/NepaliDatePicker";
import ScrollDropdown from "@/components/dashboard/forms/ScrollDropdown";

export default function CampaignEditView({
  campaignId,
  onDone,
}: {
  campaignId: string;
  onDone?: () => void;
}) {
  const { showToast } = useToast();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [launchDate, setLaunchDate] = useState("");
  const [status, setStatus] = useState<"UPCOMING" | "ACTIVE" | "COMPLETED">("UPCOMING");
  const [faculty, setFaculty] = useState("");

  useEffect(() => {
    fetch("/api/campaigns").then((r) => r.json()).then((all: Campaign[]) => {
      const found = all.find((c) => c.id === campaignId) ?? null;
      setCampaign(found);
      setLaunchDate(found?.launchDate ?? "");
      setFaculty(found?.faculty ?? "");
      if (found?.status) setStatus(found.status);
    });
  }, [campaignId]);

  if (!campaign) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        Loading...
      </div>
    );
  }

  // `campaign` is narrowed to non-null above, but TypeScript doesn't carry
  // that narrowing into separately-declared nested functions like
  // handleSubmit — capturing it in a fresh `const` fixes that.
  const activeCampaign = campaign;

  const launchDateError = launchDate
    ? (!validateLaunchDate(launchDate, activeCampaign.launchDate).valid
        ? validateLaunchDate(launchDate, activeCampaign.launchDate).message
        : undefined)
    : undefined;

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!faculty) {
      showToast("Please select a club.", "error");
      return;
    }

    // Launch date only matters while a campaign is upcoming — an
    // active/completed campaign shouldn't be blocked by a stale date.
    if (status === "UPCOMING" && launchDate && !validateLaunchDate(launchDate, activeCampaign.launchDate).valid) {
      showToast(validateLaunchDate(launchDate, activeCampaign.launchDate).message!, "error");
      return;
    }
    const formData = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/campaigns/${campaignId}`, { method: "PATCH", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update.");
      setSubmitting(false);
      showToast("Updated successfully");
      onDone?.();
    } catch (err) {
      setSubmitting(false);
      showToast(err instanceof Error ? err.message : "Something went wrong.", "error");
    }
  }

  return (
    <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      {onDone && (
        <button
          onClick={onDone}
          className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      )}

      <h2 className="text-base font-bold text-slate-800 dark:text-white">Edit Campaign</h2>

      <form key={activeCampaign.id} onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Photo</label>
          <img src={preview || activeCampaign.image} alt="Current" className="mb-2 h-32 w-full rounded-lg object-cover" />
          <input type="file" name="image" accept="image/*" onChange={handlePhotoChange} className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/20 dark:text-slate-300" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Title</label>
          <input name="title" defaultValue={activeCampaign.title} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Description</label>
          <textarea name="description" defaultValue={activeCampaign.description} rows={3} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Club</label>
            <ScrollDropdown
              value={faculty}
              options={clubList.map((c) => ({ value: c, label: c }))}
              placeholder="Select club"
              onChange={(v) => setFaculty(String(v))}
            />
            <input type="hidden" name="faculty" value={faculty} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Status</label>
            <ScrollDropdown
              value={status}
              options={[
                { value: "UPCOMING", label: "Upcoming" },
                { value: "ACTIVE", label: "Active" },
                { value: "COMPLETED", label: "Completed" },
              ]}
              placeholder="Select status"
              onChange={(v) => setStatus(v as "UPCOMING" | "ACTIVE" | "COMPLETED")}
            />
            <input type="hidden" name="status" value={status} />
          </div>
        </div>
        {status === "UPCOMING" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Launch Date (optional)</label>
            <NepaliDatePicker value={launchDate} onChange={setLaunchDate} />
            <input type="hidden" name="launchDate" value={launchDate} />
            {launchDateError && (
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><circle cx="12" cy="12" r="10" /></svg>
                {launchDateError}
              </p>
            )}
          </div>
        )}
        <div className="flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <button
            type="submit"
            disabled={submitting || (status === "UPCOMING" && !!launchDateError)}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Updating..." : "Update Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
}