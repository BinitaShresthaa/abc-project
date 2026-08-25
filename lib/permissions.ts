import { mockPermissions } from "./mock-db";

export async function getAllowedFeatureKeys(roleId: string): Promise<Set<string>> {
  return mockPermissions[roleId] ?? new Set();
}

export async function setRolePermission(roleId: string, featureKey: string, allowed: boolean) {
  if (!mockPermissions[roleId]) mockPermissions[roleId] = new Set();
  if (allowed) mockPermissions[roleId].add(featureKey);
  else mockPermissions[roleId].delete(featureKey);
}