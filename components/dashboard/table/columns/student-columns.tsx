import type { TableColumn, TableFilter, DetailCardConfig } from "../types";
import type { Student, StudentStatus } from "@/lib/mock-students";
import { facultyList } from "@/lib/faculty-data";
import { formatProgress, getAllProgressOptions } from "@/lib/academic-progress";
import { adYearToBs } from "@/lib/nepali-date";
import Avatar from "../Avatar";
import IdentityCell from "../IdentityCell";


export const studentColumns: TableColumn<Student>[] = [
  {
  key: "identity",
  header: "Alumni", // or "Student" in student-columns.tsx
  render: (r) => <IdentityCell name={r.name} regNo={r.regNo} photo={r.photo} />,
  exportValue: (r) => `${r.name} (${r.regNo})`,
  searchable: true,
  searchValue: (r) => `${r.name} ${r.regNo}`,
},
  {
    key: "contact",
    header: "Contact No.",
    render: (r) => <span>{r.contact}</span>,
    exportValue: (r) => r.contact,
  },
  {
    key: "email",
    header: "Email",
    render: (r) => <span>{r.email}</span>,
    exportValue: (r) => r.email,
  },
  {
    key: "dob",
    header: "Date of Birth",
    // Note: DOB is a full date, not just a year — the +57 approximation only
    // works for plain years, so this shows AD only. A proper BS calendar
    // library would be needed to convert a full day/month/year correctly.
    render: (r) => <span>{r.dob}</span>,
    exportValue: (r) => r.dob,
  },
  {
    key: "address",
    header: "Address",
    render: (r) => <span>{r.address}</span>,
    exportValue: (r) => r.address,
  },
  {
    key: "guardianName",
    header: "Guardian Name",
    render: (r) => <span>{r.guardianName}</span>,
    exportValue: (r) => r.guardianName,
  },
  {
    key: "guardianContact",
    header: "Guardian Number",
    render: (r) => <span>{r.guardianContact}</span>,
    exportValue: (r) => r.guardianContact,
  },
  {
    key: "faculty",
    header: "Faculty",
    render: (r) => (
      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{r.faculty}</span>
    ),
    exportValue: (r) => r.faculty,
    searchable: true,
  },
  {
    key: "batch",
    header: "Batch",
    render: (r) => (
      <div>
        <div>{adYearToBs(r.batch)} BS</div>
        <div className="text-xs text-slate-400">{r.batch} AD</div>
      </div>
    ),
    exportValue: (r) => `${adYearToBs(r.batch)} BS (${r.batch} AD)`,
  },
  {
    key: "progress",
    header: "Year / Semester",
    render: (r) => <span>{formatProgress(r.progress)}</span>,
    exportValue: (r) => formatProgress(r.progress),
  },
];

export const studentFilters: TableFilter<Student>[] = [
  { key: "batch", label: "Batches (BS)", getValue: (r) => r.batch, isYearFilter: true },
  { key: "faculty", label: "Faculties", getValue: (r) => r.faculty, options: facultyList },
  {
    key: "progress",
    label: "Year/Semester",
    getValue: (r) => formatProgress(r.progress),
    options: getAllProgressOptions(),
  },
];

const STATUS_LABEL: Record<StudentStatus, string> = {
  active: "Active",
  left: "Left",
  passout: "Passout",
};

// Wiring for the right-hand "Student Profile" panel shown when a student row
// is selected (see components/dashboard/table/DetailCard.tsx). Pass this same
// pattern — a DetailCardConfig<T> — for any other list (alumni-detail-config,
// campus-admin-detail-config, ...) to get the same panel UI for free.
//
// Used as-is by StudentListView, LeftStudentListView, and PassoutStudentListView:
// the status badge and any status-specific copy come straight from r.status,
// so the same config works no matter which of the three lists it's shown from.
export const studentDetailConfig: DetailCardConfig<Student> = {
  getPhoto: (r) => r.photo,
  getName: (r) => r.name,
  idLabel: "Student ID",
  getId: (r) => r.regNo,
  getBadges: (r) => [
    { label: r.faculty, tone: "primary" },
    { label: STATUS_LABEL[r.status], tone: "neutral" },
  ],
  getSections: (r) => [
    {
      icon: "mail",
      heading: "Contact Information",
      fields: [
        { label: "Email Address", value: r.email },
        { label: "Phone Number", value: r.contact },
        { label: "Current Address", value: r.address, fullWidth: true },
      ],
    },
    {
      icon: "academic",
      heading: "Academic Status",
      fields: [
        { label: "Faculty", value: r.faculty },
        { label: "Year / Semester", value: formatProgress(r.progress) },
        { label: "Batch Year", value: `${adYearToBs(r.batch)} BS (${r.batch} AD)`, fullWidth: true },
      ],
    },
  ],
};