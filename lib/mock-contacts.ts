import type { Gender } from "./gender";

export interface ContactPerson {
  id: string;
  contactId: string;
  photo?: string;
  name: string;
  gender: Gender;
  email: string;
  contactNo: string;
  // SECURITY NOTE: plaintext only because there's no backend yet.
  // Once a real database exists, this must be hashed (bcrypt/argon2) at
  // write time and never read back in plaintext — the edit form should
  // let someone SET a new password, not display the existing one.
  password: string;
  position: string; // free-text description of their role/position
  assignedFaculty: string;
}

export const mockContacts: ContactPerson[] = [
  {
    id: "contact-1",
    contactId: "CNT-2024-001",
    name: "Bimal Giri",
    gender: "Male",
    email: "bimal.giri@aadikavicampus.edu.np",
    contactNo: "+977-98160XXXXX",
    password: "changeme123",
    position: "Faculty Focal Person — B.Ed English",
    assignedFaculty: "B.Ed English",
  },
  {
    id: "contact-2",
    contactId: "CNT-2024-001",
    name: "Ghan Bahadur",
    gender: "Male",
    email: "gb.sinjali@aadikavicampus.edu.np",
    contactNo: "+977-98160XXXXX",
    password: "changeme123",
    position: "Faculty Focal Person — BICTE",
    assignedFaculty: "BICTE",
  },
   {
    id: "contact-3",
    contactId: "CNT-2024-001",
    name: "hari thapa",
    gender: "Male",
    email: "hari.thapa@aadikavicampus.edu.np",
    contactNo: "+977-98160XXXXX",
    password: "changeme123",
    position: "Faculty Focal Person — M.Ed English",
    assignedFaculty: "M.Ed English",
  },
];

function generateContactId(): string {
  const year = new Date().getFullYear();
  let count = mockContacts.length + 1;
  let candidate = `CNT-${year}-${String(count).padStart(3, "0")}`;
  while (mockContacts.some((c) => c.contactId === candidate)) {
    count++;
    candidate = `CNT-${year}-${String(count).padStart(3, "0")}`;
  }
  return candidate;
}

export interface NewContactInput {
  name: string;
  gender: Gender;
  email: string;
  contactNo: string;
  password: string;
  position: string;
  assignedFaculty: string;
  photo?: string;
}

export async function createContact(input: NewContactInput): Promise<ContactPerson> {
  const newContact: ContactPerson = {
    id: `contact-${Date.now()}`,
    contactId: generateContactId(),
    ...input,
  };
  mockContacts.push(newContact);
  return newContact;
}

export function getContactById(id: string): ContactPerson | undefined {
  return mockContacts.find((c) => c.id === id);
}

export async function updateContact(id: string, input: NewContactInput): Promise<ContactPerson | undefined> {
  const contact = mockContacts.find((c) => c.id === id);
  if (!contact) return undefined;
  Object.assign(contact, input);
  return contact;
}
function assertUniqueContactEmail(email: string, excludeId?: string) {
  const clash = mockContacts.find(
    (c) => c.email.trim().toLowerCase() === email.trim().toLowerCase() && c.id !== excludeId
  );
  if (clash) throw new Error(`Email "${email}" is already used by another contact.`);
}