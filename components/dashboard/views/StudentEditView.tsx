"use client";

import { useState } from "react";
import { getStudentById, updateStudent, type NewStudentInput, type Student } from "@/lib/mock-students";
import { getFacultyLevel } from "@/lib/faculty-data";
import StudentFormFields from "@/components/dashboard/forms/StudentFormFields";
import { useToast } from "@/lib/toast-context";

function toFormInput(student: Student): NewStudentInput {
  const { name, gender, contact, email, dob, address, guardianName, guardianContact, faculty, progress, photo } = student;
  return { name, gender, contact, email, dob, address, guardianName, guardianContact, faculty, progress, photo };
}

export default function StudentEditView({
  studentId,
  onDone,
}: {
  studentId: string;
  onDone?: () => void;
}) {
  const { showToast } = useToast(); // ✅ inside the component now

  const student = getStudentById(studentId);

  // ✅ hooks below must run every time, so give them a safe fallback instead
  // of returning before they're called.
  const [form, setForm] = useState<NewStudentInput>(() =>
    student ? toFormInput(student) : ({} as NewStudentInput)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!student) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        Student not found. It may have been removed.
      </div>
    );
  }

  const originalForm = toFormInput(student);
  const level = form.faculty ? getFacultyLevel(form.faculty) : "bachelor";

  function update<K extends keyof NewStudentInput>(key: K, value: NewStudentInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFacultyChange(faculty: string) {
    setForm((prev) => {
      const changedLevel = getFacultyLevel(faculty) !== getFacultyLevel(prev.faculty || faculty);
      return { ...prev, faculty, progress: changedLevel ? { mode: "year", value: 1 } : prev.progress };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
if (!form.name || !form.email || !form.faculty || !form.contact || !form.gender) {      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await updateStudent(studentId, form);
      showToast("Updated successfully");
      onDone?.();
    } catch {
      setError("Something went wrong while saving. Please try again.");
      setSubmitting(false);
    }
  }

  function handleReset() {
    setForm(originalForm);
    setError(null);
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
      <h2 className="text-base font-bold text-slate-800 dark:text-white">Edit Student</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Registration No. <span className="font-mono">{student.regNo}</span> — batch and status are not editable here.
      </p>

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
            {submitting ? "Updating..." : "Update Student"}
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