import type { YearSemesterValue } from "./academic-progress";
import { getFacultyLevel } from "./faculty-data";
import type { Gender } from "./gender";

export type StudentStatus = "active" | "left" | "passout";

export interface Student {
  id: string;
  regNo: string;
  photo?: string;
  name: string;
  gender: Gender;
  contact: string;
  email: string;
  dob: string;
  address: string;
  guardianName: string;
  guardianContact: string;
  faculty: string;
  batch: string;
  progress: YearSemesterValue;
  status: StudentStatus;
}

export const mockStudents: Student[] = [
  {
    id: "1", regNo: "STU-2023-014", name: "Kritika Basnet", gender: "Female",
    contact: "+977-9840000001", email: "kritika.b@example.com",
    dob: "2004-03-12", address: "Damauli, Tanahun",
    guardianName: "Ram Basnet", guardianContact: "+977-9840000099",
    faculty: "BICTE", batch: "2023", progress: { mode: "year", value: 2 },
    status: "active",
  },
  {
    id: "2", regNo: "STU-2022-092", name: "Nabin Lama", gender: "Male",
    contact: "+977-9850000002", email: "nabin.l@example.com",
    dob: "2003-11-02", address: "Vyas-1, Tanahun",
    guardianName: "Sita Lama", guardianContact: "+977-9850000098",
    faculty: "BBA", batch: "2022", progress: { mode: "semester", value: 5 },
    status: "active",
  },
  {
    id: "3", regNo: "STU-M-2024-003", name: "Roshani Adhikari", gender: "Female",
    contact: "+977-9860000003", email: "roshani.a@example.com",
    dob: "2000-06-21", address: "Damauli, Tanahun",
    guardianName: "Keshav Adhikari", guardianContact: "+977-9860000097",
    faculty: "M.Ed English", batch: "2024", progress: { mode: "year", value: 1 },
    status: "active",
  },
];

// Mutates the mock array in place — fine for now with no database.
// When you connect a real DB, this becomes an UPDATE statement instead.
export function setStudentStatus(id: string, status: StudentStatus) {
  const student = mockStudents.find((s) => s.id === id);
  if (student) student.status = status;
}

// Generates a simple sequential registration number.
// Replace with your real numbering scheme (or a DB auto-increment) later.
function generateRegNo(faculty: string): string {
  const year = new Date().getFullYear();
  const countThisYear = mockStudents.filter((s) => s.batch === String(year)).length + 1;
  const prefix = getFacultyLevel(faculty) === "master" ? "STU-M" : "STU";
  return `${prefix}-${year}-${String(countThisYear).padStart(3, "0")}`;
}

export interface NewStudentInput {
  name: string;
  gender: Gender;
  contact: string;
  email: string;
  dob: string;
  address: string;
  guardianName: string;
  guardianContact: string;
  faculty: string;
  progress: YearSemesterValue;
  photo?: string;
}

// Mimics an async DB insert — swap the body for a real `INSERT`/Prisma call
// later; the function signature and return shape can stay the same.
export async function createStudent(input: NewStudentInput): Promise<Student> {
  const newStudent: Student = {
    id: `student-${Date.now()}`,
    regNo: generateRegNo(input.faculty),
    batch: String(new Date().getFullYear()),
    status: "active",
    ...input,
  };
  mockStudents.push(newStudent);
  return newStudent;
}

export function getStudentById(id: string): Student | undefined {
  return mockStudents.find((s) => s.id === id);
}

// Mimics an async DB update — swap the body for a real UPDATE/Prisma call later.
export async function updateStudent(id: string, input: NewStudentInput): Promise<Student | undefined> {
  const student = mockStudents.find((s) => s.id === id);
  if (!student) return undefined;

  // regNo, batch, status, id are intentionally NOT overwritten by an edit —
  // those are system-assigned, not editable fields on this form.
  Object.assign(student, input);
  return student;
}