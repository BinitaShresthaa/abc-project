import { facultyList } from "@/lib/faculty-data";
import type { NewStudentInput } from "@/lib/mock-students";
import FormField from "./FormField";
import PhotoUploadField from "./PhotoUploadField";
import YearSemesterSelect from "@/components/dashboard/table/YearSemesterSelect";

export const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200";

export default function StudentFormFields({
  form,
  update,
  level,
  onFacultyChange,
}: {
  form: NewStudentInput;
  update: <K extends keyof NewStudentInput>(key: K, value: NewStudentInput[K]) => void;
  level: "bachelor" | "master";
  onFacultyChange: (faculty: string) => void;
}) {
  return (
    <>
      <FormField label="Photo">
        <PhotoUploadField name={form.name} value={form.photo} onChange={(url) => update("photo", url)} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Full Name" required>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Kritika Basnet"
            className={inputClass}
          />
        </FormField>

        <FormField label="Faculty" required>
          <select value={form.faculty} onChange={(e) => onFacultyChange(e.target.value)} className={inputClass}>
            <option value="" disabled>Select faculty</option>
            {facultyList.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Contact No." required>
          <input
            value={form.contact}
            onChange={(e) => update("contact", e.target.value)}
            placeholder="+977-98XXXXXXXX"
            className={inputClass}
          />
        </FormField>

        <FormField label="Email" required>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="student@example.com"
            className={inputClass}
          />
        </FormField>

        <FormField label="Date of Birth">
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

        <FormField label="Guardian Name">
          <input value={form.guardianName} onChange={(e) => update("guardianName", e.target.value)} className={inputClass} />
        </FormField>

        <FormField label="Guardian Number">
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