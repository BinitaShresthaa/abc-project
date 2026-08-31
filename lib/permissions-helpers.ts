import type { DashboardUser } from "./roles";

export function isContactPerson(user: DashboardUser): boolean {
  return user.role.name === "contact_person";
}