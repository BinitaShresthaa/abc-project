export type AcademicLevel = "bachelor" | "master";

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  photo?: string;
  level: AcademicLevel;
  // shown in the detail popup only — all optional
  bio?: string;
  officeHours?: string;
  education?: string;
}