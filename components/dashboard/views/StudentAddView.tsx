"use client";

import { useState } from "react";
import { createStudent, type NewStudentInput } from "@/lib/mock-students";
import { getFacultyLevel } from "@/lib/faculty-data";
import type { Gender } from "@/lib/gender";
import { validateName, validatePhone, validateEmail, validateDob } from "@/lib/validation";
import StudentFormFields from "@/components/dashboard/forms/StudentFormFields";
import { useToast } from "@/lib/toast-context";

const emptyForm: NewStudentInput = {
  name: "", gender: "" as Gender, contact: "", email: "", dob: "", address: "",
  guardianName: "", guardianContact: "", faculty: "",
  progress: { mode: "year", value: 1 }, photo: undefined,
};

export default function StudentAddView() {
  const { showToast } = useToast();
  const [form, setForm] = useState<NewStudentInput>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const level = form.faculty ? getFacultyLevel(form.faculty) : "bachelor";

  function update<K extends keyof NewStudentInput>(key: K, value: NewStudentInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFacultyChange(faculty: string) {
    setForm((prev) => ({ ...prev, faculty, progress: { mode: "year", value: 1 } }));
  }

  function runValidation(): string | null {
    if (!form.faculty) return "Please select a faculty.";
    if (!form.gender) return "Please select a gender.";

    const checks = [
      validateName(form.name, "Full name"),
      validatePhone(form.contact, "Contact number"),
      validateEmail(form.email),
      validateDob(form.dob),
    ];
    if (form.guardianName) checks.push(validateName(form.guardianName, "Guardian name"));
    if (form.guardianContact) checks.push(validatePhone(form.guardianContact, "Guardian number"));

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
      await createStudent(form);
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
      <h2 className="text-base font-bold text-slate-800 dark:text-white">Add Student</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Registration number and batch year are generated automatically once saved.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <StudentFormFields form={form} update={update} level={level} onFacultyChange={handleFacultyChange} />

        <div className="flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Student"}
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