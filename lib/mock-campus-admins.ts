import type { Gender } from "./gender";

export interface CampusAdmin {
  id: string;
  campusAdminId: string;
  photo?: string;
  name: string;
  gender: Gender;
  email: string;
  contact: string;
  password: string;
}

export const mockCampusAdmins: CampusAdmin[] = [
  {
    id: "campus-admin-1",
    campusAdminId: "ADM-2024-001",
    name: "Suresh Lama",
    gender: "Male",
    email: "suresh.lama@aadikavicampus.edu.np",
    contact: "+977-98010XXXXX",
    password: "changeme123",
  },
];

function generateCampusAdminId(): string {
  const year = new Date().getFullYear();
  let count = mockCampusAdmins.length + 1;
  let candidate = `ADM-${year}-${String(count).padStart(3, "0")}`;
  while (mockCampusAdmins.some((a) => a.campusAdminId === candidate)) {
    count++;
    candidate = `ADM-${year}-${String(count).padStart(3, "0")}`;
  }
  return candidate;
}
function assertUniqueCampusAdminEmail(email: string, excludeId?: string) {
  const clash = mockCampusAdmins.find(
    (a) => a.email.trim().toLowerCase() === email.trim().toLowerCase() && a.id !== excludeId
  );
  if (clash) throw new Error(`Email "${email}" is already used by another Campus Administrator.`);
}

export interface NewCampusAdminInput {
  name: string;
  gender: Gender;
  email: string;
  contact: string;
  password: string;
  photo?: string;
}

export async function createCampusAdmin(input: NewCampusAdminInput): Promise<CampusAdmin> {
  assertUniqueCampusAdminEmail(input.email);
  const newAdmin: CampusAdmin = {
    id: `campus-admin-${Date.now()}`,
    campusAdminId: generateCampusAdminId(),
    ...input,
  };
  mockCampusAdmins.push(newAdmin);
  return newAdmin;
}

export function getCampusAdminById(id: string): CampusAdmin | undefined {
  return mockCampusAdmins.find((a) => a.id === id);
}

export async function updateCampusAdmin(id: string, input: NewCampusAdminInput): Promise<CampusAdmin | undefined> {
  const admin = mockCampusAdmins.find((a) => a.id === id);
  if (!admin) return undefined;
  assertUniqueCampusAdminEmail(input.email, id);
  Object.assign(admin, input);
  return admin;
}