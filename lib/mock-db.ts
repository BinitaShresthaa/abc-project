import type { Role, DashboardUser } from "./roles";

export const mockRoles: Role[] = [
  { id: "role-admin", name: "admin", label: "Administrator", isSystem: true },
  { id: "role-campus-admin", name: "campus_admin", label: "Campus Administrator", isSystem: false },
  { id: "role-contact", name: "contact_person", label: "Contact Person", isSystem: false },
  { id: "role-faculty", name: "faculty", label: "Faculty", isSystem: false },
  { id: "role-student", name: "student", label: "Student", isSystem: false },
];

export const mockPermissions: Record<string, Set<string>> = {
  "role-admin": new Set([
    "dashboard",
    "campus-admin", "campus-admin-add", "campus-admin-list",
    "contact", "contact-add", "contact-list",
    "student", "student-add", "student-list", "student-left", "passout-student-list",
    "campaign", "campaign-add", "campaign-list", "campaign-highlight", "campaign-donation", "campaign-past",
    "alumni", "alumni-list", "alumni-story", "alumni-verification", "notification",
    "settings",
  ]),
  // Campus Administrator: identical to Admin, MINUS the three campus-admin
  // management keys — only the true system Admin can add/see/edit other
  // Campus Administrators.
  "role-campus-admin": new Set([
    "dashboard",
    "contact", "contact-add", "contact-list",
    "student", "student-add", "student-list", "student-left", "passout-student-list",
    "campaign", "campaign-add", "campaign-list", "campaign-highlight", "campaign-donation", "campaign-past",
    "alumni", "alumni-list", "alumni-story", "alumni-verification", "notification",
    "settings",
  ]),
"role-contact": new Set([
  "dashboard","student",
  "student-list", "student-left", "passout-student-list",
  "campaign", "campaign-list", "campaign-past",
]),
  "role-faculty": new Set(["dashboard", "campaign", "campaign-list"]),
  "role-student": new Set(["dashboard"]),
  
};

// Only Admin and Contact Person have working logins for now.
// Add more entries here later (faculty, student) when needed — just add a
// user with a `password` field; lib/auth.ts derives its login map from
// this array automatically, no second credentials list to keep in sync.
export const mockUsers: DashboardUser[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "admin@example.com",
    password: "admin123",
    avatarUrl: undefined,
    role: mockRoles.find((r) => r.id === "role-admin")!,
  },
  {
    id: "user-2",
    name: "Hari Bahadur Thapa",
    email: "hod@example.com",
    password: "hod123",
    avatarUrl: undefined,
    role: mockRoles.find((r) => r.id === "role-contact")!,
    assignedFaculty: "BICTE",
  },
];

// Fallback user used only when no login cookie is present yet.
// Once someone actually logs in via /login, the session cookie (see lib/auth.ts) takes over.
export const CURRENT_USER_ID = "user-1";