import Avatar from "./Avatar";

// Reusable across every list type (Alumni, Student, Campus Admin, Contact, etc.)
// Photo is square and sized to naturally give the row roughly 2 lines of height.
// Name and Reg No are shown stacked in one visual cell — but they stay as
// two separate fields in your data/database; this only merges the *display*.
export default function IdentityCell({
  name,
  regNo,
  photo,
}: {
  name: string;
  regNo: string;
  photo?: string;
}) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <Avatar name={name} photo={photo} size={56} shape="square" />
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">{name}</div>
        <div className="mt-0.5 truncate font-mono text-xs text-slate-400">{regNo}</div>
      </div>
    </div>
  );
}