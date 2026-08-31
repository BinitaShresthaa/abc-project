export interface Role {
  id: string;
  name: string;
  label: string;
  isSystem: boolean;
}

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: Role;
  assignedFaculty?: string;
  password?: string; // mock-only; must be hashed once a real DB exists, never returned to the client
}