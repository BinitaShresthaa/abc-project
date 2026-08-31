import { cookies } from "next/headers";
import { mockUsers, CURRENT_USER_ID } from "./mock-db";
import { mockAlumni, type Alumni } from "./mock-alumni";
import type { DashboardUser } from "./roles";

type MockCredential = { password: string; userId: string };
type MockAlumniCredential = { password: string; alumniId: string };

const mockCredentials: Record<string, MockCredential> = Object.fromEntries(
  mockUsers
    .filter((u: any) => typeof u.email === "string" && typeof u.password === "string")
    .map((u: any) => [u.email.trim().toLowerCase(), { password: u.password, userId: u.id }])
) as Record<string, MockCredential>;

const mockAlumniCredentials: Record<string, MockAlumniCredential> = Object.fromEntries(
  mockAlumni
    .filter((a: any) => typeof a.email === "string" && typeof a.password === "string")
    .map((a: any) => [a.email.trim().toLowerCase(), { password: a.password, alumniId: a.id }])
) as Record<string, MockAlumniCredential>;

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