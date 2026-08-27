import { cookies } from "next/headers";
import { mockUsers, mockCredentials, CURRENT_USER_ID } from "./mock-db";
import { mockAlumni, mockAlumniCredentials, type Alumni } from "./mock-alumni";
import type { DashboardUser } from "./roles";

export const DASHBOARD_SESSION_COOKIE = "dashboard_session_user_id";
export const ALUMNI_SESSION_COOKIE = "almuni_session_alumni_id";

/**
 * Staff / student dashboard auth (admin, hod, faculty, student, etc.)
 * getCurrentUser() is what dal.ts's requirePermission() calls, so once a
 * cookie is set at login, permission checks reflect the logged-in role.
 */

export async function getCurrentUser(): Promise<DashboardUser | null> {
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value ?? CURRENT_USER_ID;
  return mockUsers.find((u) => u.id === sessionUserId) ?? null;
}

export async function verifyDashboardCredentials(
  email: string,
  password: string
): Promise<DashboardUser | null> {
  const cred = mockCredentials[email.trim().toLowerCase()];
  if (!cred || cred.password !== password) return null;
  return mockUsers.find((u) => u.id === cred.userId) ?? null;
}

/**
 * Alumni portal auth — separate identity/session from the dashboard above.
 */

export async function getCurrentAlumni(): Promise<Alumni | null> {
  const cookieStore = await cookies();
  const alumniId = cookieStore.get(ALUMNI_SESSION_COOKIE)?.value;
  if (!alumniId) return null;
  return mockAlumni.find((a) => a.id === alumniId) ?? null;
}

export async function verifyAlumniCredentials(
  email: string,
  password: string
): Promise<Alumni | null> {
  const cred = mockAlumniCredentials[email.trim().toLowerCase()];
  if (!cred || cred.password !== password) return null;
  return mockAlumni.find((a) => a.id === cred.alumniId) ?? null;
}