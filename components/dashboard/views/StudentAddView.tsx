"use client";

import { useState } from "react";
import { createStudent, type NewStudentInput } from "@/lib/mock-students";
import { getFacultyLevel } from "@/lib/faculty-data";
import type { Gender } from "@/lib/gender";
import StudentFormFields from "@/components/dashboard/forms/StudentFormFields";

const emptyForm: NewStudentInput = {
  name: "", gender: "" as Gender, contact: "", email: "", dob: "", address: "",
  guardianName: "", guardianContact: "", faculty: "",
  progress: { mode: "year", value: 1 }, photo: undefined,
};

export default function StudentAddView() {
  const [form, setForm] = useState<NewStudentInput>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const level = form.faculty ? getFacultyLevel(form.faculty) : "bachelor";

  function update<K extends keyof NewStudentInput>(key: K, value: NewStudentInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFacultyChange(faculty: string) {
    setForm((prev) => ({ ...prev, faculty, progress: { mode: "year", value: 1 } }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.email || !form.faculty || !form.contact || !form.gender) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await createStudent(form);
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
      <h2 className="text-base font-bold text-slate-800 dark:text-white">Add Student</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Registration number and batch year are generated automatically once saved.
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