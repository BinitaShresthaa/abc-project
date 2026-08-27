"use client";

import { useState } from "react";
import { createContact, type NewContactInput } from "@/lib/mock-contacts";
import type { Gender } from "@/lib/gender";
import ContactFormFields from "@/components/dashboard/forms/ContactFormFields";

const emptyForm: NewContactInput = {
  name: "", gender: "" as Gender, email: "", contactNo: "", password: "", position: "", assignedFaculty: "", photo: undefined,
};

export default function ContactAddView() {
  const [form, setForm] = useState<NewContactInput>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof NewContactInput>(key: K, value: NewContactInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.email || !form.assignedFaculty || !form.password || !form.gender) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await createContact(form);
      setSuccessMsg("Added successfully");
      setForm(emptyForm);
    } catch {
      setError("Something went wrong while saving. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-base font-bold text-slate-800 dark:text-white">Add Contact Person</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        This person will be able to log in and view only the student list for their assigned faculty.
      </p>

      {successMsg && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <ContactFormFields form={form} update={update} />
        <div className="flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Contact"}
          </button>
          <button
            type="button"
            onClick={() => setForm(emptyForm)}
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}