import type { NewCampusAdminInput } from "@/lib/mock-campus-admins";
import { validateName, validatePhone, validateEmail } from "@/lib/validation";
import { assertEmailNotTaken } from "@/lib/identity-registry";
import FormField from "./FormField";
import PhotoUploadField from "./PhotoUploadField";
import PasswordField from "./PasswordField";
import GenderSelect from "./GenderSelect";
import { inputClass } from "./StudentFormFields";

function checkEmailTaken(email: string, currentId?: string): string | undefined {
  if (!email) return undefined;
  try {
    assertEmailNotTaken(email, "campusAdmin", currentId);
    return undefined;
  } catch (err) {
    return err instanceof Error ? err.message : undefined;
  }
}

export default function CampusAdminFormFields({
  form,
  update,
  currentId,
}: {
  form: NewCampusAdminInput;
  update: <K extends keyof NewCampusAdminInput>(key: K, value: NewCampusAdminInput[K]) => void;
  currentId?: string; // pass the admin's own id when editing, omit when adding
}) {
  const nameError = form.name && !validateName(form.name, "Full name").valid
    ? validateName(form.name, "Full name").message
    : undefined;

  const emailFormatError = form.email && !validateEmail(form.email).valid
    ? validateEmail(form.email).message
    : undefined;
  const emailDuplicateError = form.email ? checkEmailTaken(form.email, currentId) : undefined;
  const emailError = emailFormatError ?? emailDuplicateError;

  const contactError = form.contact && !validatePhone(form.contact, "Contact number").valid
    ? validatePhone(form.contact, "Contact number").message
    : undefined;

  return (
    <>
      <FormField label="Photo">
        <PhotoUploadField name={form.name} value={form.photo} onChange={(url) => update("photo", url)} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Full Name" required error={nameError}>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
        </FormField>

        <FormField label="Gender" required>
          <GenderSelect value={form.gender} onChange={(g) => update("gender", g)} />
        </FormField>

        <FormField label="Email" required error={emailError}>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
        </FormField>

        <FormField label="Contact No." required error={contactError}>
          <input value={form.contact} onChange={(e) => update("contact", e.target.value)} className={inputClass} />
        </FormField>

        <FormField label="Password" required hint="Stored in plain text only because there's no backend yet — must be hashed once one exists.">
          <PasswordField value={form.password} onChange={(v) => update("password", v)} showRequirements />
        </FormField>
      </div>
    </>
  );
}