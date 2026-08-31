"use client";

import { useEffect, useState } from "react";
import { mockStudents, setStudentStatus, getClassmates } from "@/lib/mock-students";
import { studentColumns, studentFilters, studentDetailConfig } from "@/components/dashboard/table/columns/student-columns";
import { formatProgress } from "@/lib/academic-progress";
import DataTable from "@/components/dashboard/table/DataTable";
import DetailCard from "@/components/dashboard/table/DetailCard";
import type { Student } from "@/lib/mock-students";
import type { RowAction, BulkAction } from "@/components/dashboard/table/types";
import type { DashboardViewProps } from "@/lib/view-types";

export default function StudentListView({ onEditStudent }: Partial<DashboardViewProps>) {
  const [, forceRefresh] = useState(0);
  const activeStudents = mockStudents.filter((s) => s.status === "active");
  type TableStudent = Student & Record<string, unknown>;

  // No student selected by default — the list stays full width. Clicking a
  // row opens the profile panel as an overlay; the panel's × closes it again.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedStudent = selectedId ? activeStudents.find((s) => s.id === selectedId) ?? null : null;

  // Classmates: same faculty + batch + year/semester, scoped to this same
  // active-students list only (never crosses into Left/Passout). Powers the
  // profile panel's prev/next "class roster" navigator.
  const classmates = selectedStudent ? 
  getClassmates(activeStudents, selectedStudent) : [];
  const classIndex = selectedStudent ? classmates.findIndex((s) => s.id === selectedStudent.id) : -1;

  function goToClassmate(offset: number) {
    if (classIndex === -1) return;
    const next = classmates[classIndex + offset];
    if (next) setSelectedId(next.id);
  }

  // If the selected student leaves the active list (e.g. marked as Left/Passout,
  // or filtered out elsewhere), close the panel rather than pointing at a stale row.
  useEffect(() => {
    if (selectedId && !activeStudents.some((s) => s.id === selectedId)) {
      setSelectedId(null);
    }
  }, [activeStudents, selectedId]);

  function handleStatusChange(student: Student, status: "left" | "passout") {
    setStudentStatus(student.id, status);
    forceRefresh((n) => n + 1); // re-render since mockStudents mutated in place
  }

  const rowActions: RowAction<TableStudent>[] = [
    { label: "Edit", onSelect: (r) => onEditStudent?.(r.id) },
    { label: "Mark as Left", onSelect: (r) => handleStatusChange(r, "left") },
    { label: "Mark as Passout", onSelect: (r) => handleStatusChange(r, "passout") },
  ];

  const bulkActions: BulkAction<TableStudent>[] = [
    {
      label: "Mark as Passout",
      onSelect: (rows) => {
        rows.forEach((r) => setStudentStatus(r.id, "passout"));
        forceRefresh((n) => n + 1);
      },
    },
    {
      label: "Mark as Left",
      onSelect: (rows) => {
        rows.forEach((r) => setStudentStatus(r.id, "left"));
        forceRefresh((n) => n + 1);
      },
    },
  ];

  return (
    // `relative` isn't strictly required (the panel is `fixed`, viewport-relative)
    // but keeps this view a sensible positioning root if you add anything else here.
    <div className="relative">
      <DataTable<TableStudent>
        title="Student List"
        data={activeStudents as TableStudent[]}
        columns={studentColumns as any}
        filters={studentFilters}
        rowIdKey="id"
        rowActions={rowActions}
        bulkActions={bulkActions}
        onRowClick={(r) => setSelectedId(r.id)}
        activeRowId={selectedId}
      />

      {selectedStudent && (
        // Fixed, viewport-anchored overlay — this is what makes the panel sit
        // ON TOP of the list instead of squeezing it narrower. `top-24`/`bottom-6`
        // give it clearance below the Topbar and a margin at the bottom; tweak
        // `top-24` if your Topbar's height differs.
        <div className="fixed right-6 top-24 bottom-6 z-30 w-full max-w-sm">
          <DetailCard
            title="Student Profile"
            row={selectedStudent}
            config={studentDetailConfig}
            onClose={() => setSelectedId(null)}
            onPrev={classIndex > 0 ? () => goToClassmate(-1) : undefined}
            onNext={classIndex >= 0 && classIndex < classmates.length - 1 ? () => goToClassmate(1) : undefined}
            positionLabel={
              classIndex >= 0
                ? `${classIndex + 1} of ${classmates.length} — ${selectedStudent.faculty}, ${formatProgress(selectedStudent.progress)}`
                : undefined
            }
          />
        </div>
      )}
    </div>
  );
}