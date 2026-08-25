"use client";

import type { TableColumn, TableFilter } from "../types";
import type { Alumni } from "@/lib/mock-alumni";
import Avatar from "../Avatar";
import { adYearToBs } from "@/lib/nepali-date";
import { facultyList } from "@/lib/faculty-data";


export const alumniColumns: TableColumn<Alumni>[] = [
  {
    key: "regNo",
    header: "Registration No.",
    render: (r) => <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{r.regNo}</span>,
    exportValue: (r) => r.regNo,
    searchable: true,
  },
  {
    key: "photo",
    header: "Photo",
    render: (r) => <Avatar name={r.name} photo={r.photo} />,
  },
  {
    key: "name",
    header: "Alumni Name",
    render: (r) => <span className="font-medium text-slate-700 dark:text-slate-200">{r.name}</span>,
    exportValue: (r) => r.name,
    searchable: true,
  },
  {
    key: "email",
    header: "Email",
    render: (r) => <span>{r.email}</span>,
    exportValue: (r) => r.email,
  },
  {
    key: "contact",
    header: "Contact No.",
    render: (r) => <span>{r.contact}</span>,
    exportValue: (r) => r.contact,
  },
  {
    key: "currentJob",
    header: "Current Job",
    render: (r) => <span>{r.currentJob}</span>,
    exportValue: (r) => r.currentJob,
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
  key: "passoutYear",
  header: "Passout Year",
  render: (r) => (
    <div>
      <div>{adYearToBs(r.passoutYear)} BS</div>
      <div className="text-xs text-slate-400">{r.passoutYear} AD</div>
    </div>
  ),
  exportValue: (r) => `${adYearToBs(r.passoutYear)} BS (${r.passoutYear} AD)`,
},
];

export const alumniFilters: TableFilter<Alumni>[] = [
  { key: "batch", label: "Batches (BS)", getValue: (r) => r.batch, isYearFilter: true },
  { key: "passoutYear", label: "Passout Years (BS)", getValue: (r) => r.passoutYear, isYearFilter: true },
  { key: "faculty", label: "Faculties", getValue: (r) => r.faculty, options: facultyList },
];