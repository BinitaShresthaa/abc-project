import { facultyList } from "@/lib/faculty-data";
import type { NewStudentInput } from "@/lib/mock-students";
import { validateName, validatePhone, validateEmail, validateDob } from "@/lib/validation";
import { assertEmailNotTaken } from "@/lib/identity-registry";
import FormField from "./FormField";
import PhotoUploadField from "./PhotoUploadField";
import GenderSelect from "./GenderSelect";
import YearSemesterSelect from "@/components/dashboard/table/YearSemesterSelect";

export const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200";

function checkEmailTaken(email: string, currentId?: string): string | undefined {
  if (!email) return undefined;
  try {
    assertEmailNotTaken(email, "student", currentId);
    return undefined;
  } catch (err) {
    return err instanceof Error ? err.message : undefined;
  }
}

export default function StudentFormFields({
  form,
  update,
  level,
  onFacultyChange,
  currentId,
}: {
  form: NewStudentInput;
  update: <K extends keyof NewStudentInput>(key: K, value: NewStudentInput[K]) => void;
  level: "bachelor" | "master";
  onFacultyChange: (faculty: string) => void;
  currentId?: string; // pass the student's own id when editing, omit when adding
}) {
  const nameError = form.name && !validateName(form.name, "Full name").valid
    ? validateName(form.name, "Full name").message
    : undefined;

  const contactError = form.contact && !validatePhone(form.contact, "Contact number").valid
    ? validatePhone(form.contact, "Contact number").message
    : undefined;

  const emailFormatError = form.email && !validateEmail(form.email).valid
    ? validateEmail(form.email).message
    : undefined;
  const emailDuplicateError = form.email ? checkEmailTaken(form.email, currentId) : undefined;
  const emailError = emailFormatError ?? emailDuplicateError;

  const dobError = form.dob && !validateDob(form.dob).valid ? validateDob(form.dob).message : undefined;

  const guardianNameError = form.guardianName && !validateName(form.guardianName, "Guardian name").valid
    ? validateName(form.guardianName, "Guardian name").message
    : undefined;

  const guardianContactError = form.guardianContact && !validatePhone(form.guardianContact, "Guardian number").valid
    ? validatePhone(form.guardianContact, "Guardian number").message
    : undefined;

  return (
    <>
      <FormField label="Photo">
        <PhotoUploadField name={form.name} value={form.photo} onChange={(url) => update("photo", url)} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Full Name" required error={nameError}>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Kritika Basnet"
            className={inputClass}
          />
        </FormField>

        <FormField label="Gender" required>
          <GenderSelect value={form.gender} onChange={(g) => update("gender", g)} />
        </FormField>

        <FormField label="Faculty" required>
          <select value={form.faculty} onChange={(e) => onFacultyChange(e.target.value)} className={inputClass}>
            <option value="" disabled>Select faculty</option>
            {facultyList.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Contact No." required error={contactError}>
          <input
            value={form.contact}
            onChange={(e) => update("contact", e.target.value)}
            placeholder="+977-98XXXXXXXX"
            className={inputClass}
          />
        </FormField>

        <FormField label="Email" required error={emailError}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="student@example.com"
            className={inputClass}
          />
        </FormField>

        <FormField label="Date of Birth" error={dobError}>
          <input type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} className={inputClass} />
        </FormField>

        <FormField label="Address">
          <input
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="e.g. Damauli, Tanahun"
            className={inputClass}
          />
        </FormField>

        <FormField label="Guardian Name" error={guardianNameError}>
          <input value={form.guardianName} onChange={(e) => update("guardianName", e.target.value)} className={inputClass} />
        </FormField>

        <FormField label="Guardian Number" error={guardianContactError}>
          <input value={form.guardianContact} onChange={(e) => update("guardianContact", e.target.value)} className={inputClass} />
        </FormField>
      </div>

      <FormField
        label="Year / Semester"
        required
        hint={form.faculty ? undefined : "Select a faculty first to see the correct Year/Semester range."}
      >
        <YearSemesterSelect level={level} value={form.progress} onChange={(value) => update("progress", value)} />
      </FormField>
    </>
  );
}

