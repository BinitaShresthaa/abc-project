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
"role-contact": new Set(["dashboard", "student-list", "student-left", "passout-student-list"]),
  "role-faculty": new Set(["dashboard", "campaign", "campaign-list"]),
  "role-student": new Set(["dashboard"]),
};

export const mockUsers: DashboardUser[] = [
  {
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
export const CURRENT_USER_ID = "user-1";