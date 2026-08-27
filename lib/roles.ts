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
  assignedFaculty?: string; // only meaningful for the "contact_person" role
}