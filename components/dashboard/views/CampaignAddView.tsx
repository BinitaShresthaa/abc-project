"use client";

import { useState } from "react";
import { clubList } from "@/lib/club-data";
import { useToast } from "@/lib/toast-context";
import { validateLaunchDate } from "@/lib/validation";

export default function CampaignAddView() {
  const { showToast } = useToast();
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"UPCOMING" | "ACTIVE">("UPCOMING");
  const [launchDate, setLaunchDate] = useState("");
const launchDateError = launchDate ? (!validateLaunchDate(launchDate).valid ? validateLaunchDate(launchDate).message : undefined) : undefined;
  const formRef = useState<HTMLFormElement | null>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (launchDate && !validateLaunchDate(launchDate).valid) {
    showToast(validateLaunchDate(launchDate).message!, "error");
    return;
  }
  const form = e.currentTarget;
  const formData = new FormData(form);
  // ...rest unchanged
    setSubmitting(true);
    try {
      const res = await fetch("/api/campaigns", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save.");
      showToast("Added successfully");
      form.reset();
      setPreview("");
      setStatus("UPCOMING");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Something went wrong.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-base font-bold text-slate-800 dark:text-white">Add Campaign</h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Photo</label>
          <input type="file" name="image" accept="image/*" onChange={handlePhotoChange} required className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/20 dark:text-slate-300" />
          {preview && <img src={preview} alt="Preview" className="mt-3 h-32 w-full rounded-lg object-cover" />}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Title</label>
          <input name="title" required className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Description</label>
          <textarea name="description" required rows={3} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Club</label>
            <select name="faculty" required defaultValue="" className="max-h-60 w-full overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
              <option value="" disabled>Select club</option>
              {clubList.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Status</label>
            <select name="status" value={status} onChange={(e) => setStatus(e.target.value as "UPCOMING" | "ACTIVE")} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
              <option value="UPCOMING">Upcoming</option>
              <option value="ACTIVE">Active</option>
            </select>
          </div>
        </div>
       {status === "UPCOMING" && (
  <div>
    <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Launch Date (optional)</label>
    <input
      type="date"
      name="launchDate"
      value={launchDate}
      onChange={(e) => setLaunchDate(e.target.value)}
      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
    />
    {launchDateError && (
      <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><circle cx="12" cy="12" r="10" /></svg>
        {launchDateError}
      </p>
    )}
  </div>
)}
        <div className="flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <button type="submit" disabled={submitting} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Saving..." : "Save Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
}