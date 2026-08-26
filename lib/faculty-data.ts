import type { FacultyMember } from "./types";

// ---------------------------------------------------------------
// Canonical list of faculty/program names — this is what every
// filter dropdown and "Add" form (Student, Alumni, etc.) should
// import faculty options from. Add a new program here once, and
// it becomes available everywhere automatically.
// ---------------------------------------------------------------
export const facultyList: string[] = [
  // ---------- Bachelor's level ----------
  "BA English",
  "BBA",
  "BA",
  "BICTE",
  "BA Nepali",
  "B.Ed Math",
  "B.Ed Nepali",
  "B.Ed Science",

  // ---------- Master's level ----------
  "M.A",
  "M.B.S",
  "M.Ed English",
  "M.Ed Nepali",
  "M.Ed EPM",
];

// Edit this list freely — add, remove, or reorder entries.
// To change a photo: drop the image file into /public/images/faculty/
// and point `photo` at it, e.g. "/images/faculty/basanta-kandel.jpg".
// If `photo` is omitted or the file is missing, an initials avatar is shown instead.

export const facultyMembers: FacultyMember[] = [
  // ---------- Bachelor's level ----------
  {
    id: "basanta-kandel",
    name: "Dr. Basanta Kandel",
    role: "HOD",
    department: "B.edEnglish",
    email: "basanta.kandel@aadikavicampus.edu.np",
    phone: "+977-98560XXXXX",
    photo: "/images/faculty/basanta-kandel.jpg",
    level: "bachelor",
  },
  {
    id: "chij-kumar-shrestha",
    name: "Mr. Chij Kumar Shrestha",
    role: "HOD",
    department: "BBA",
    email: "chij.kumar@aadikavicampus.edu.np",
    phone: "+977-98460XXXXX",
    photo: "/images/faculty/chij-kumar-shrestha.jpg",
    level: "bachelor",
  },
  {
    id: "bimal-giri",
    name: "Mr. Bimal Giri",
    role: "HOD",
    department: "BA Englsih",
    email: "bimal.giri@aadikavicampus.edu.np",
    phone: "+977-98160XXXXX",
    photo: "/images/faculty/bimal-giri.jpg",
    level: "bachelor",
  },
  {
    id: "ghan-b-thapa",
    name: "Er. Ghan B. Thapa",
    role: "HOD",
    department: "BICTE",
    email: "gb.sinjali@aadikavicampus.edu.np",
    phone: "+977-98060XXXXX",
    photo: "/images/faculty/ghan-b-thapa.jpg",
    level: "bachelor",
  },
  {
    id: "sushil-prasad-wagle",
    name: "Dr. Sushil Prasad Wagle",
    role: "HOD",
    department: "BA Nepali",
    email: "sushil.prasad@aadikavicampus.edu.np",
    phone: "+977-98260XXXXX",
    photo: "/images/faculty/sushil-prasad-wagle.jpg",
    level: "bachelor",
  },
  {
    id: "gajendra-poudel",
    name: "Mr. Gajendra Poudel",
    role: "HOD, Education Faculty",
    department: "B.Ed Math, Nepali & Science",
    email: "gajendra.p@aadikavicampus.edu.np",
    phone: "+977-98660XXXXX",
    photo: "/images/faculty/gajendra-poudel.jpg",
    level: "bachelor",
  },

  // ---------- Master's level ----------
  {
    id: "keshab-raj-sharma",
    name: "Prof. Dr. Keshab Raj Sharma",
    role: "HOD, M.A Faculty",
    department: "Graduate · Master of Arts",
    email: "keshab.sharma@aadikavicampus.edu.np",
    phone: "+977-98760XXXXX",
    photo: "/images/faculty/keshab-raj-sharma.jpg",
    level: "master",
  },
  {
    id: "anjali-koirala",
    name: "Dr. Anjali Koirala",
    role: "HOD, M.B.S Faculty",
    department: "Graduate · Business Studies",
    email: "anjali.koirala@aadikavicampus.edu.np",
    phone: "+977-98360XXXXX",
    photo: "/images/faculty/anjali-koirala.jpg",
    level: "master",
  },
  {
    id: "rajendra-bhattarai",
    name: "Mr. Rajendra Bhattarai",
    role: "HOD, M.Ed Faculty",
    department: "Graduate · English, Nepali, EPM",
    email: "rajendra.b@aadikavicampus.edu.np",
    phone: "+977-98960XXXXX",
    photo: "/images/faculty/rajendra-bhattarai.jpg",
    level: "master",
  },
];
// ---------------------------------------------------------------
// Append to the bottom of the existing lib/faculty-data.ts file.
// Determines whether a faculty/program is Bachelor's or Master's level,
// used to decide which Year/Semester range applies to a student.
// ---------------------------------------------------------------

export const masterFacultyNames: string[] = ["M.A", "M.B.S", "M.Ed English", "M.Ed Nepali", "M.Ed EPM"];

export function getFacultyLevel(faculty: string): "bachelor" | "master" {
  return masterFacultyNames.includes(faculty) ? "master" : "bachelor";
}