"use client";

import { useState } from "react";
import { getStudentById, updateStudent, type NewStudentInput, type Student } from "@/lib/mock-students";
import { getFacultyLevel } from "@/lib/faculty-data";
import { validateName, validatePhone, validateEmail, validateDob } from "@/lib/validation";
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
  const { showToast } = useToast();

  const student = getStudentById(studentId);

  const [form, setForm] = useState<NewStudentInput>(() =>
    student ? toFormInput(student) : ({} as NewStudentInput)
  );
  const [submitting, setSubmitting] = useState(false);

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
      await updateStudent(studentId, form);
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
      <h2 className="text-base font-bold text-slate-800 dark:text-white">Edit Student</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Registration No. <span className="font-mono">{student.regNo}</span> — batch and status are not editable here.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <StudentFormFields
          form={form}
          update={update}
          level={level}
          onFacultyChange={handleFacultyChange}
          currentId={studentId}
        />
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