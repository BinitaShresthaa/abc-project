import type { TableColumn, TableFilter } from "../types";
import type { ContactPerson } from "@/lib/mock-contacts";
import { facultyList } from "@/lib/faculty-data";
import IdentityCell from "../IdentityCell";

export const contactColumns: TableColumn<ContactPerson>[] = [
  {
    key: "identity",
    header: "Contact Person",
    render: (r) => <IdentityCell name={r.name} regNo={r.contactId} photo={r.photo} />,
    exportValue: (r) => `${r.name} (${r.contactId})`,
    searchable: true,
    searchValue: (r) => `${r.name} ${r.contactId}`,
  },
  {
  key: "gender",
  header: "Gender",
  render: (r) => <span>{r.gender}</span>,
  exportValue: (r) => r.gender,
},
  { key: "email", header: "Email", render: (r) => <span>{r.email}</span>, exportValue: (r) => r.email, searchable: true },
  { key: "contactNo", header: "Contact No.", render: (r) => <span>{r.contactNo}</span>, exportValue: (r) => r.contactNo },
  {
    key: "assignedFaculty",
    header: "Assigned Faculty",
    render: (r) => (
      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{r.assignedFaculty}</span>
    ),
    exportValue: (r) => r.assignedFaculty,
    searchable: true,
  },
  { key: "position", header: "Position", render: (r) => <span>{r.position}</span>, exportValue: (r) => r.position },
  {
  key: "password",
  header: "Password",
  render: (r) => <span className="font-mono text-slate-500 dark:text-slate-400">{r.password}</span>,
  exportValue: (r) => r.password,
},
];

// No batch/passout filters — contact persons aren't students, so those
// concepts don't apply here. Only faculty is a meaningful filter.
export const contactFilters: TableFilter<ContactPerson>[] = [
  { key: "assignedFaculty", label: "Faculties", getValue: (r) => r.assignedFaculty, options: facultyList },
];