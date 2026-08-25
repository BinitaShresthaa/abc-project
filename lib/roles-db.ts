import { mockRoles, mockPermissions } from "./mock-db";
import type { Role } from "./roles";

export async function getAllRoles(): Promise<Role[]> {
  return mockRoles;
}

export async function createRole(name: string, label: string): Promise<Role> {
  const slug = name.trim().toLowerCase().replace(/\s+/g, "_");
  const newRole: Role = { id: `role-${crypto.randomUUID()}`, name: slug, label, isSystem: false };
  mockRoles.push(newRole);
  mockPermissions[newRole.id] = new Set();
  return newRole;
}

export async function deleteRole(roleId: string): Promise<void> {
  const role = mockRoles.find((r) => r.id === roleId);
  if (!role) throw new Error("Role not found");
  if (role.isSystem) throw new Error("Cannot delete a system role");

  const index = mockRoles.findIndex((r) => r.id === roleId);
  mockRoles.splice(index, 1);
  delete mockPermissions[roleId];
}

export async function renameRole(roleId: string, label: string): Promise<void> {
  const role = mockRoles.find((r) => r.id === roleId);
  if (role) role.label = label;
}