import { getAllowedFeatureKeys } from "./permissions";

export type NavIconName =
  | "grid" | "users" | "userCheck" | "book" | "wallet" | "megaphone" | "settings" | "shield";

export interface NavItem {
  key: string;
  label: string;
  href?: string;        // only needed for leaf items (no children) that actually navigate
  icon: NavIconName;
  children?: NavItem[];
}

export const navStructure: NavItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: "grid" },
  {
    key: "campus-admin", label: "Campus Administrator", icon: "shield",
    children: [
      { key: "campus-admin-add", label: "Add Campus Administrator", href: "/dashboard/campus-admin/new", icon: "shield" },
      { key: "campus-admin-list", label: "Campus Administrator List", href: "/dashboard/campus-admin", icon: "shield" },
    ],
  },
  {
    key: "contact", label: "Contact", icon: "userCheck",
    children: [
      { key: "contact-add", label: "Add Contact", href: "/dashboard/teacher/new", icon: "userCheck" },
      { key: "contact-list", label: "Contact List", href: "/dashboard/teacher", icon: "userCheck" },
    ],
  },
  {
    key: "student", label: "Student", icon: "users",
    children: [
      { key: "student-add", label: "Add Student", href: "/dashboard/student/new", icon: "users" },
      { key: "student-list", label: "Student List", href: "/dashboard/student", icon: "users" },
      { key: "student-left", label: "Left Student", href: "/dashboard/student/left", icon: "users" },
      { key: "passout-student-list", label: "Passout List", href: "/dashboard/student/left", icon: "users" },
    ],
  },
  {
    key: "campaign", label: "Campaign", icon: "megaphone",
    children: [
      { key: "campaign-add", label: "Add Campaign", href: "/dashboard/campaign/new", icon: "megaphone" },
      { key: "campaign-list", label: "Campaign List", href: "/dashboard/campaign", icon: "megaphone" },
      { key: "campaign-past", label: "Campaign (Past)", href: "/dashboard/campaign/past", icon: "megaphone" },
    ],
  },
  {
    key: "alumni", label: "Alumni", icon: "book",
    children: [
      { key: "alumni-list", label: "Alumni List", href: "/dashboard/alumni", icon: "book" },
      { key: "alumni-story", label: "Alumni Story", href: "/dashboard/alumni/story", icon: "book" },
      { key: "alumni-verification", label: "Alumni Verification", href: "/dashboard/alumni/verification", icon: "book" },
    ],
  },
  { key: "settings", label: "Settings", href: "/dashboard/settings", icon: "settings" },
];

export async function getVisibleNavItems(roleId: string): Promise<NavItem[]> {
  const allowed = await getAllowedFeatureKeys(roleId);
  return navStructure
    .filter((item) => allowed.has(item.key))
    .map((item) => ({
      ...item,
      children: item.children?.filter((c) => allowed.has(c.key)),
    }));
}