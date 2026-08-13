export type AcademicLevel = "bachelor" | "master";

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  /**
   * Path to the photo, relative to /public.
   * Drop your image into /public/images/faculty/ and update this path
   * — e.g. "/images/faculty/basanta-kandel.jpg".
   * Leave as the placeholder to fall back to an initials avatar.
   */
  photo?: string;
  level: AcademicLevel;
}
