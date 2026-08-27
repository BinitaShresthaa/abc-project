import { facultyList } from "@/lib/faculty-data";
import type { NewContactInput } from "@/lib/mock-contacts";
import FormField from "./FormField";
import PhotoUploadField from "./PhotoUploadField";
import PasswordField from "./PasswordField";
import { inputClass } from "./StudentFormFields";
import GenderSelect from "./GenderSelect";

export default function ContactFormFields({
  form,
  update,
}: {
  form: NewContactInput;
  update: <K extends keyof NewContactInput>(key: K, value: NewContactInput[K]) => void;
}) {
  return (
    <>
      <FormField label="Photo">
        <PhotoUploadField name={form.name} value={form.photo} onChange={(url) => update("photo", url)} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Full Name" required>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
        </FormField>

        <FormField label="Assigned Faculty" required hint="This person will only see students from this faculty.">
          <select value={form.assignedFaculty} onChange={(e) => update("assignedFaculty", e.target.value)} className={inputClass}>
            <option value="" disabled>Select faculty</option>
            {facultyList.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </FormField>
<FormField label="Gender" required>
  <GenderSelect value={form.gender} onChange={(g) => update("gender", g)} />
</FormField>
        <FormField label="Email" required>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
        </FormField>

        <FormField label="Contact No." required>
          <input value={form.contactNo} onChange={(e) => update("contactNo", e.target.value)} className={inputClass} />
        </FormField>

        <FormField label="Password" required hint="Stored in plain text only because there's no backend yet — must be hashed once one exists.">
          <PasswordField value={form.password} onChange={(v) => update("password", v)} />
        </FormField>

        <FormField label="Position">
          <input
            value={form.position}
            onChange={(e) => update("position", e.target.value)}
            placeholder="e.g. Faculty Focal Person — BICTE"
            className={inputClass}
          />
        </FormField>
      </div>
    </>
  );
}