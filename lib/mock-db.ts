import type { Role, DashboardUser } from "./roles";

export const mockRoles: Role[] = [
  { id: "role-admin", name: "admin", label: "Administrator", isSystem: true },
  { id: "role-contact", name: "contact_person", label: "Contact Person", isSystem: false },
  { id: "role-faculty", name: "faculty", label: "Faculty", isSystem: false },
  { id: "role-student", name: "student", label: "Student", isSystem: false },
];

export const mockPermissions: Record<string, Set<string>> = {
  "role-admin": new Set([
    "dashboard",
    "campus-admin", "campus-admin-add", "campus-admin-list",
    "contact", "contact-add", "contact-list",
    "student", "student-add", "student-list", "student-left","passout-student-list",
    "campaign", "campaign-add", "campaign-list","campaign-highlight","campaign-donation", "campaign-past",
    "alumni", "alumni-list", "alumni-story", "alumni-verification","notification",
    "settings",
  ]),
<<<<<<< HEAD
"role-contact": new Set(["dashboard", "student-list", "student-left", "passout-student-list"]),
=======
  "role-hod": new Set([
    "dashboard", "student", "student-list", "student-left","passout-student-list",
  ]),
  "role-authorized": new Set(["dashboard", "student", "student-list"]),
>>>>>>> 7a0e40ca5096c231f4bec9ba5d42e7b839161bf2
  "role-faculty": new Set(["dashboard", "campaign", "campaign-list"]),
  "role-student": new Set(["dashboard"]),
};

// Only Admin and HOD have working logins for now.
// Add more entries here later (authorized_person, faculty, student) when needed.
export const mockUsers: DashboardUser[] = [
  {
<<<<<<< HEAD
    id: "user-1", name: "John Doe", email: "john@example.com",
    role: mockRoles.find((r) => r.id === "role-admin")!,
  },
  {
    id: "user-2", name: "Bimal Giri", email: "bimal.giri@aadikavicampus.edu.np",
    role: mockRoles.find((r) => r.id === "role-contact")!,
    assignedFaculty: "BICTE", // this Contact Person only ever sees BICTE students
  },
];

// Switch this to "user-2" to preview the Contact Person experience.
=======
    id: "user-1",
    name: "John Doe",
    email: "admin@example.com",
    avatarUrl: undefined,
    role: mockRoles.find((r) => r.id === "role-admin")!,
  },
  {
    id: "user-2",
    name: "Hari Bahadur Thapa",
    email: "hod@example.com",
    avatarUrl: undefined,
    role: mockRoles.find((r) => r.id === "role-hod")!,
  },
];

// email -> password + which mockUsers entry it logs into.
// Swap this out for real (hashed) password lookups against a database later.
export const mockCredentials: Record<string, { password: string; userId: string }> = {
  "admin@example.com": { password: "admin123", userId: "user-1" },
  "hod@example.com": { password: "hod123", userId: "user-2" },
};

// Fallback user used only when no login cookie is present yet.
// Once someone actually logs in via /login, the session cookie (see lib/auth.ts) takes over.
>>>>>>> 7a0e40ca5096c231f4bec9ba5d42e7b839161bf2
export const CURRENT_USER_ID = "user-1";