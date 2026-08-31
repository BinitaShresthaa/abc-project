import type { YearSemesterValue } from "./academic-progress";
import { getFacultyLevel } from "./faculty-data";

export type StudentStatus = "active" | "left" | "passout";
export type Gender = "Male" | "Female" | "Other";

export interface Student {
  id: string;
  regNo: string;
  photo?: string;
  name: string;
  // Optional so it doesn't break any existing "add student" form that
  // doesn't collect it yet — the table column just shows "-" until set.
  gender?: Gender;
  contact: string;
  email: string;
  dob: string;
  address: string;
  guardianName: string;
  guardianContact: string;
  faculty: string;
  batch: string;
  progress: YearSemesterValue;
  status: StudentStatus; // new
  // Optional — only used by the detail card's "Academic Performance" stats.
  // Leave undefined until these are backed by real data; the stat grid
  // just hides itself when neither is present.
  gpa?: number;
  attendancePercent?: number;
  // Optional — a student's position within their own class (same faculty +
  // batch + year/semester). Used only to order the profile panel's
  // prev/next "classmate" navigator; if it's missing, that student just
  // sorts after everyone who has one (falls back to name order).
  rollNo?: number;
}

export const mockStudents: Student[] = [
  {
    id: "1", regNo: "STU-2023-014", name: "Kritika Basnet", gender: "Female",
    contact: "+977-9840000001", email: "kritika.b@example.com",
    dob: "2004-03-12", address: "Damauli, Tanahun",
    guardianName: "Ram Basnet", guardianContact: "+977-9840000099",
    faculty: "BICTE", batch: "2081", progress: { mode: "semester", value: 2 },
    status: "active", gpa: 3.6, attendancePercent: 91, rollNo: 1,
  },
  {
    id: "2", regNo: "STU-2022-092", name: "Nabin Lama", gender: "Male",
    contact: "+977-9850000002", email: "nabin.l@example.com",
    dob: "2003-11-02", address: "Vyas-1, Tanahun",
    guardianName: "Sita Lama", guardianContact: "+977-9850000098",
    faculty: "BBA", batch: "2082", progress: { mode: "semester", value: 5 },
    status: "active", gpa: 3.8, attendancePercent: 94, rollNo: 1,
  },
  {
    id: "3", regNo: "STU-M-2024-003", name: "Roshani Adhikari", gender: "Female",
    contact: "+977-9860000003", email: "roshani.a@example.com",
    dob: "2000-06-21", address: "Damauli, Tanahun",
    guardianName: "Keshav Adhikari", guardianContact: "+977-9860000097",
    faculty: "M.Ed English", batch: "2083", progress: { mode: "year", value: 1 },
    status: "active", gpa: 3.4, attendancePercent: 88, rollNo: 1,
  },
  // --- Added purely to demo the classmate prev/next navigator: these two
  // share Kritika's exact class (BICTE, batch 2023, year 2), so opening her
  // profile now has a real 3-person roster to step through. Safe to remove
  // once you have real batch data with more than one student per class. ---
  {
    id: "4", regNo: "STU-2023-015", name: "Sunita Gurung", gender: "Female",
    contact: "+977-9840000004", email: "sunita.g@example.com",
    dob: "2004-05-30", address: "Damauli, Tanahun",
    guardianName: "Him Gurung", guardianContact: "+977-9840000096",
    faculty: "BICTE", batch: "2083", progress: { mode: "semester", value: 2 },
    status: "active", gpa: 3.5, attendancePercent: 89, rollNo: 2,
  },
  
  {
    id: "5", regNo: "STU-2023-016", name: "Prakash Thapa", gender: "Male",
    contact: "+977-9840000005", email: "prakash.t@example.com",
    dob: "2004-01-18", address: "Vyas-2, Tanahun",
    guardianName: "Deepak Thapa", guardianContact: "+977-9840000095",
    faculty: "BICTE", batch: "2023", progress: { mode: "semester", value: 2 },
    status: "active", gpa: 3.2, attendancePercent: 85, rollNo: 3,
  },

  // --- Batch 2080, BICTE, Semester 6 — 20 students (rollNo 1–20), purely to
  // test/demo the classmate scroll navigator with a realistically sized class.
  // Safe to remove once real batch 2080 data exists.
  { id: "101", regNo: "STU-2080-001", name: "Aakriti Sharma", gender: "Female", contact: "+977-9810000101", email: "aakriti.sharma@example.com", dob: "2003-02-14", address: "Damauli, Tanahun", guardianName: "Bishnu Sharma", guardianContact: "+977-9810000201", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 1 },
  { id: "102", regNo: "STU-2080-002", name: "Bibek Poudel", gender: "Male", contact: "+977-9810000102", email: "bibek.poudel@example.com", dob: "2003-05-21", address: "Vyas-3, Tanahun", guardianName: "Hari Poudel", guardianContact: "+977-9810000202", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 2 },
  { id: "103", regNo: "STU-2080-003", name: "Chandani Rai", gender: "Female", contact: "+977-9810000103", email: "chandani.rai@example.com", dob: "2003-08-09", address: "Bandipur, Tanahun", guardianName: "Suresh Rai", guardianContact: "+977-9810000203", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 3 },
  { id: "104", regNo: "STU-2080-004", name: "Dipesh Karki", gender: "Male", contact: "+977-9810000104", email: "dipesh.karki@example.com", dob: "2003-01-30", address: "Ghansikuwa, Tanahun", guardianName: "Mohan Karki", guardianContact: "+977-9810000204", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 4 },
  { id: "105", regNo: "STU-2080-005", name: "Esha Gurung", gender: "Female", contact: "+977-9810000105", email: "esha.gurung@example.com", dob: "2003-11-17", address: "Damauli, Tanahun", guardianName: "Purna Gurung", guardianContact: "+977-9810000205", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 5 },
  { id: "106", regNo: "STU-2080-006", name: "Faisal Khan", gender: "Male", contact: "+977-9810000106", email: "faisal.khan@example.com", dob: "2003-03-25", address: "Vyas-1, Tanahun", guardianName: "Aslam Khan", guardianContact: "+977-9810000206", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 6 },
  { id: "107", regNo: "STU-2080-007", name: "Gita Thapa", gender: "Female", contact: "+977-9810000107", email: "gita.thapa@example.com", dob: "2003-07-04", address: "Damauli, Tanahun", guardianName: "Khem Thapa", guardianContact: "+977-9810000207", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 7 },
  { id: "108", regNo: "STU-2080-008", name: "Hemant Basnet", gender: "Male", contact: "+977-9810000108", email: "hemant.basnet@example.com", dob: "2003-09-12", address: "Bandipur, Tanahun", guardianName: "Ganesh Basnet", guardianContact: "+977-9810000208", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 8 },
  { id: "109", regNo: "STU-2080-009", name: "Ishani Adhikari", gender: "Female", contact: "+977-9810000109", email: "ishani.adhikari@example.com", dob: "2003-04-06", address: "Vyas-2, Tanahun", guardianName: "Narayan Adhikari", guardianContact: "+977-9810000209", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 9 },
  { id: "110", regNo: "STU-2080-010", name: "Jeevan Bhattarai", gender: "Male", contact: "+977-9810000110", email: "jeevan.bhattarai@example.com", dob: "2003-12-19", address: "Damauli, Tanahun", guardianName: "Ram Bhattarai", guardianContact: "+977-9810000210", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 10 },
  { id: "111", regNo: "STU-2080-011", name: "Kabita Shrestha", gender: "Female", contact: "+977-9810000111", email: "kabita.shrestha@example.com", dob: "2003-06-28", address: "Ghansikuwa, Tanahun", guardianName: "Dilip Shrestha", guardianContact: "+977-9810000211", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 11 },
  { id: "112", regNo: "STU-2080-012", name: "Laxman Rana", gender: "Male", contact: "+977-9810000112", email: "laxman.rana@example.com", dob: "2003-10-02", address: "Vyas-3, Tanahun", guardianName: "Bikram Rana", guardianContact: "+977-9810000212", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 12 },
  { id: "113", regNo: "STU-2080-013", name: "Manisha KC", gender: "Female", contact: "+977-9810000113", email: "manisha.kc@example.com", dob: "2003-02-27", address: "Bandipur, Tanahun", guardianName: "Rajesh KC", guardianContact: "+977-9810000213", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 13 },
  { id: "114", regNo: "STU-2080-014", name: "Niraj Pandey", gender: "Male", contact: "+977-9810000114", email: "niraj.pandey@example.com", dob: "2003-08-15", address: "Damauli, Tanahun", guardianName: "Shyam Pandey", guardianContact: "+977-9810000214", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 14 },
  { id: "115", regNo: "STU-2080-015", name: "Ojaswi Regmi", gender: "Female", contact: "+977-9810000115", email: "ojaswi.regmi@example.com", dob: "2003-01-11", address: "Vyas-1, Tanahun", guardianName: "Prakash Regmi", guardianContact: "+977-9810000215", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 15 },
  { id: "116", regNo: "STU-2080-016", name: "Pratik Magar", gender: "Male", contact: "+977-9810000116", email: "pratik.magar@example.com", dob: "2003-05-08", address: "Ghansikuwa, Tanahun", guardianName: "Krishna Magar", guardianContact: "+977-9810000216", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 16 },
  { id: "117", regNo: "STU-2080-017", name: "Rachana Bista", gender: "Female", contact: "+977-9810000117", email: "rachana.bista@example.com", dob: "2003-09-23", address: "Damauli, Tanahun", guardianName: "Kul Bista", guardianContact: "+977-9810000217", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 17 },
  { id: "118", regNo: "STU-2080-018", name: "Sagar Neupane", gender: "Male", contact: "+977-9810000118", email: "sagar.neupane@example.com", dob: "2003-03-16", address: "Bandipur, Tanahun", guardianName: "Tara Neupane", guardianContact: "+977-9810000218", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 18 },
  { id: "119", regNo: "STU-2080-019", name: "Tulsi Khadka", gender: "Female", contact: "+977-9810000119", email: "tulsi.khadka@example.com", dob: "2003-07-29", address: "Vyas-2, Tanahun", guardianName: "Ram Khadka", guardianContact: "+977-9810000219", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 19 },
  { id: "120", regNo: "STU-2080-020", name: "Umesh Aryal", gender: "Male", contact: "+977-9810000120", email: "umesh.aryal@example.com", dob: "2003-12-05", address: "Damauli, Tanahun", guardianName: "Bhim Aryal", guardianContact: "+977-9810000220", faculty: "BICTE", batch: "2080", progress: { mode: "semester", value: 6 }, status: "active", rollNo: 20 },
];

// Mutates the mock array in place — fine for now with no database.
// When you connect a real DB, this becomes an UPDATE statement instead.
export function setStudentStatus(id: string, status: StudentStatus) {
  const student = mockStudents.find((s) => s.id === id);
  if (student) student.status = status;
}

// Returns `student`'s classmates from `list` — same faculty, same batch,
// and same year/semester — sorted by rollNo (students without one sort
// after those that have it, then alphabetically by name as a tiebreaker).
// `list` should already be filtered to whatever scope the caller is showing
// (e.g. only "active" students, or only "left" students) so the profile
// panel's prev/next navigator never crosses between those lists.
export function getClassmates(list: Student[], student: Student): Student[] {
  return list
    .filter(
      (s) =>
        s.faculty === student.faculty &&
        s.batch === student.batch &&
        s.progress.mode === student.progress.mode &&
        s.progress.value === student.progress.value
    )
    .sort((a, b) => {
      const ar = a.rollNo ?? Number.POSITIVE_INFINITY;
      const br = b.rollNo ?? Number.POSITIVE_INFINITY;
      if (ar !== br) return ar - br;
      return a.name.localeCompare(b.name);
    });
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
  gender?: Gender;
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