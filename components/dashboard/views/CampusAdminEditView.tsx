"use client";

import { useState } from "react";
import { getCampusAdminById, updateCampusAdmin, type NewCampusAdminInput, type CampusAdmin } from "@/lib/mock-campus-admins";
import { validateName, validatePhone, validateEmail, validatePassword } from "@/lib/validation";
import CampusAdminFormFields from "@/components/dashboard/forms/CampusAdminFormFields";
import { useToast } from "@/lib/toast-context";

function toFormInput(a: CampusAdmin): NewCampusAdminInput {
  const { name, gender, email, contact, password, photo } = a;
  return { name, gender, email, contact, password, photo };
}

export default function CampusAdminEditView({
  campusAdminId,
  onDone,
}: {
  campusAdminId: string;
  onDone?: () => void;
}) {
  const { showToast } = useToast();
  const admin = getCampusAdminById(campusAdminId);

  if (!admin) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        Campus Administrator not found. They may have been removed.
        {onDone && (
          <button onClick={onDone} className="mt-3 block text-sm font-medium text-primary hover:underline">
            ← Back
          </button>
        )}
      </div>
    );
  }

  const originalForm = toFormInput(admin);
  const [form, setForm] = useState<NewCampusAdminInput>(originalForm);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof NewCampusAdminInput>(key: K, value: NewCampusAdminInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function runValidation(): string | null {
    if (!form.gender) return "Please select a gender.";

    const checks = [
      validateName(form.name, "Full name"),
      validateEmail(form.email),
      validatePhone(form.contact, "Contact number"),
      validatePassword(form.password),
    ];
    const failed = checks.find((c) => !c.valid);
    return failed ? failed.message! : null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationError = runValidation();
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setSubmitting(true);
    try {
      await updateCampusAdmin(campusAdminId, form);
      setSubmitting(false);
      showToast("Updated successfully");
      onDone?.();
    } catch (err) {
      setSubmitting(false);
      showToast(err instanceof Error ? err.message : "Something went wrong while saving.", "error");
    }
  }

  function handleReset() {
    setForm(originalForm);
  }

  return (
    <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
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

      <h2 className="text-base font-bold text-slate-800 dark:text-white">Edit Campus Administrator</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        ID <span className="font-mono">{admin.campusAdminId}</span>
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <CampusAdminFormFields form={form} update={update} currentId={campusAdminId} />
        <div className="flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Updating..." : "Update Administrator"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}