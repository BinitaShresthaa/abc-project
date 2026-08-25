import { mockUsers, CURRENT_USER_ID } from "./mock-db";
import type { DashboardUser } from "./roles";

export async function getCurrentUser(): Promise<DashboardUser | null> {
  return mockUsers.find((u) => u.id === CURRENT_USER_ID) ?? null;
}
