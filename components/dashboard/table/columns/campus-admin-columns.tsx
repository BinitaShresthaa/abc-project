import type { TableColumn } from "../types";
import type { CampusAdmin } from "@/lib/mock-campus-admins";
import IdentityCell from "../IdentityCell";

export const campusAdminColumns: TableColumn<CampusAdmin>[] = [
  {
    key: "identity",
    header: "Campus Administrator",
    render: (r) => <IdentityCell name={r.name} regNo={r.campusAdminId} photo={r.photo} />,
    exportValue: (r) => `${r.name} (${r.campusAdminId})`,
    searchable: true,
    searchValue: (r) => `${r.name} ${r.campusAdminId}`,
  },
  { key: "gender", header: "Gender", render: (r) => <span>{r.gender}</span>, exportValue: (r) => r.gender },
  { key: "email", header: "Email", render: (r) => <span>{r.email}</span>, exportValue: (r) => r.email, searchable: true },
  { key: "contact", header: "Contact No.", render: (r) => <span>{r.contact}</span>, exportValue: (r) => r.contact },
  {
    key: "password",
    header: "Password",
    render: (r) => <span className="font-mono text-slate-500 dark:text-slate-400">{r.password}</span>,
  },
];