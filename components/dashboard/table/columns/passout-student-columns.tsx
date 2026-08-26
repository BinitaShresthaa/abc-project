import type { TableColumn, TableFilter } from "../types";
import type { Student } from "@/lib/mock-students";
import { facultyList } from "@/lib/faculty-data";
import { adYearToBs } from "@/lib/nepali-date";
import IdentityCell from "../IdentityCell";

export const passoutStudentColumns: TableColumn<Student>[] = [
  {
    key: "identity", header: "Student",
    render: (r) => <IdentityCell name={r.name} regNo={r.regNo} photo={r.photo} />,
    exportValue: (r) => `${r.name} (${r.regNo})`,
    searchable: true,
    searchValue: (r) => `${r.name} ${r.regNo}`,
  },
  { key: "contact", header: "Contact No.", render: (r) => <span>{r.contact}</span>, exportValue: (r) => r.contact },
  { key: "email", header: "Email", render: (r) => <span>{r.email}</span>, exportValue: (r) => r.email },
  { key: "dob", header: "Date of Birth", render: (r) => <span>{r.dob}</span>, exportValue: (r) => r.dob },
  { key: "address", header: "Address", render: (r) => <span>{r.address}</span>, exportValue: (r) => r.address },
  { key: "guardianName", header: "Guardian Name", render: (r) => <span>{r.guardianName}</span>, exportValue: (r) => r.guardianName },
  { key: "guardianContact", header: "Guardian Number", render: (r) => <span>{r.guardianContact}</span>, exportValue: (r) => r.guardianContact },
  {
    key: "faculty", header: "Faculty",
    render: (r) => <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{r.faculty}</span>,
    exportValue: (r) => r.faculty, searchable: true,
  },
  {
    key: "batch", header: "Batch",
    render: (r) => (
      <div>
        <div>{adYearToBs(r.batch)} BS</div>
        <div className="text-xs text-slate-400">{r.batch} AD</div>
      </div>
    ),
    exportValue: (r) => `${adYearToBs(r.batch)} BS (${r.batch} AD)`,
  },
];

export const passoutStudentFilters: TableFilter<Student>[] = [
  { key: "batch", label: "Passout Batches (BS)", getValue: (r) => r.batch, isYearFilter: true },
  { key: "faculty", label: "Faculties", getValue: (r) => r.faculty, options: facultyList },
];