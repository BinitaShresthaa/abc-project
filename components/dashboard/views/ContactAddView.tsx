"use client";

import { useState } from "react";
import { createContact, type NewContactInput } from "@/lib/mock-contacts";
import type { Gender } from "@/lib/gender";
import { validateName, validatePhone, validateEmail, validatePassword } from "@/lib/validation";
import ContactFormFields from "@/components/dashboard/forms/ContactFormFields";
import { useToast } from "@/lib/toast-context";

const emptyForm: NewContactInput = {
  name: "", gender: "" as Gender, email: "", contactNo: "", password: "", position: "", assignedFaculty: "", photo: undefined,
};

export default function ContactAddView() {
  const { showToast } = useToast();
  const [form, setForm] = useState<NewContactInput>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof NewContactInput>(key: K, value: NewContactInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function runValidation(): string | null {
    if (!form.assignedFaculty) return "Please select an assigned faculty.";
    if (!form.gender) return "Please select a gender.";

    const checks = [
      validateName(form.name, "Full name"),
      validateEmail(form.email),
      validatePhone(form.contactNo, "Contact number"),
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
      await createContact(form);
      showToast("Added successfully");
      setForm(emptyForm);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Something went wrong while saving.", "error");
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