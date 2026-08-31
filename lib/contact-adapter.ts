import type { ContactPerson } from "./mock-contacts";
import type { FacultyMember } from "./types";
import { getFacultyLevel } from "./faculty-data";

// The public Contact page renders FacultyMember-shaped cards; the dashboard
// manages ContactPerson records. This is the one place that translates
// between them, so adding/editing a Contact Person in the dashboard is
// reflected on the public page with zero duplicate data entry.
export function contactPersonToFacultyMember(c: ContactPerson): FacultyMember {
  return {
    id: c.id,
    name: c.name,
    role: "Contact Person", // discarding the old "HOD, X Faculty" wording entirely
    department: c.assignedFaculty,
    email: c.email,
    phone: c.contactNo,
    photo: c.photo,
    level: getFacultyLevel(c.assignedFaculty),
    bio: c.position || undefined, // the position field IS the description now
  };
}