import { mockStudents } from "./mock-students";
import { mockContacts } from "./mock-contacts";
import { mockCampusAdmins } from "./mock-campus-admins";

export type PersonType = "student" | "contact" | "campusAdmin";

interface EmailOwner {
  type: PersonType;
  id: string;
  email: string;
}

function allKnownEmails(): EmailOwner[] {
  return [
    ...mockStudents.map((s) => ({ type: "student" as const, id: s.id, email: s.email })),
    ...mockContacts.map((c) => ({ type: "contact" as const, id: c.id, email: c.email })),
    ...mockCampusAdmins.map((a) => ({ type: "campusAdmin" as const, id: a.id, email: a.email })),
  ];
}

const typeLabels: Record<PersonType, string> = {
  student: "a student",
  contact: "a contact person",
  campusAdmin: "a campus administrator",
};

/**
 * Throws if `email` is already used by ANY person across Students, Contacts,
 * or Campus Administrators — regardless of role. One email = one person,
 * system-wide, not just "unique within this one table."
 *
 * Pass `excludeType`/`excludeId` when checking during an EDIT, so a person
 * isn't flagged as colliding with their own existing record.
 */
export function assertEmailNotTaken(
  email: string,
  excludeType?: PersonType,
  excludeId?: string
): void {
  const normalized = email.trim().toLowerCase();
  const clash = allKnownEmails().find(
    (o) =>
      o.email.trim().toLowerCase() === normalized &&
      !(o.type === excludeType && o.id === excludeId)
  );
  if (clash) {
    throw new Error(`This email is already registered as ${typeLabels[clash.type]}.`);
  }
}