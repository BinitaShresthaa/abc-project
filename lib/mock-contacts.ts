import type { Gender } from "./gender";
import { assertEmailNotTaken } from "./identity-registry";

export interface ContactPerson {
  id: string;
  contactId: string;
  photo?: string;
  name: string;
  gender: Gender;
  email: string;
  contactNo: string;
  password: string;
  position: string;
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
    contactId: "CNT-2024-002",
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
    contactId: "CNT-2024-003",
    name: "Hari Thapa",
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
  assertEmailNotTaken(input.email, "contact");
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
  assertEmailNotTaken(input.email, "contact", id);
  Object.assign(contact, input);
  return contact;
}