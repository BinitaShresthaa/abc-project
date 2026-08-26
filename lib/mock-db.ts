import type { Role, DashboardUser } from "./roles";

export const mockRoles: Role[] = [
  { id: "role-admin", name: "admin", label: "Administrator", isSystem: true },
  { id: "role-hod", name: "hod", label: "Head of Department", isSystem: false },
  { id: "role-authorized", name: "authorized_person", label: "Authorized Person", isSystem: false },
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
  "role-hod": new Set([
    "dashboard", "teacher", "teacher-list", "student", "student-list", "student-add", "campaign", "campaign-list",
  ]),
  "role-authorized": new Set(["dashboard", "student", "student-list"]),
  "role-faculty": new Set(["dashboard", "campaign", "campaign-list"]),
  "role-student": new Set(["dashboard"]),
};

export const mockUsers: DashboardUser[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: undefined,
    role: mockRoles.find((r) => r.id === "role-admin")!,
  },
];

// change this to preview a different user/role's sidebar + permissions
export const CURRENT_USER_ID = "user-1";