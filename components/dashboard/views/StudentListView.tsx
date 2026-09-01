"use client";

import { useEffect, useState } from "react";
import { mockStudents, setStudentStatus, getClassmates } from "@/lib/mock-students";
import { studentColumns, studentFilters, studentDetailConfig } from "@/components/dashboard/table/columns/student-columns";
import { formatProgress } from "@/lib/academic-progress";
import { sortByName } from "@/lib/sort-utils";
import DataTable from "@/components/dashboard/table/DataTable";
import DetailCard from "@/components/dashboard/table/DetailCard";
import { useDashboardUser } from "@/lib/dashboard-user-context";
import type { Student } from "@/lib/mock-students";
import type { RowAction, BulkAction } from "@/components/dashboard/table/types";
import type { DashboardViewProps } from "@/lib/view-types";

export default function StudentListView({ onEditStudent }: Partial<DashboardViewProps>) {
  const user = useDashboardUser();
  const canManageStudents = user?.role.name !== "contact_person";

  const [, forceRefresh] = useState(0);
  const activeStudents = sortByName(mockStudents.filter((s) => s.status === "active"));

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedStudent = selectedId ? activeStudents.find((s) => s.id === selectedId) ?? null : null;

  const classmates = selectedStudent ? getClassmates(activeStudents, selectedStudent) : [];
  const classIndex = selectedStudent ? classmates.findIndex((s) => s.id === selectedStudent.id) : -1;

  function goToClassmate(offset: number) {
    if (classIndex === -1) return;
    const next = classmates[classIndex + offset];
    if (next) setSelectedId(next.id);
  }

  useEffect(() => {
    if (selectedId && !activeStudents.some((s) => s.id === selectedId)) {
      setSelectedId(null);
    }
  }, [activeStudents, selectedId]);

  function handleStatusChange(student: Student, status: "left" | "passout") {
    setStudentStatus(student.id, status);
    forceRefresh((n) => n + 1);
  }

  const rowActions: RowAction<Student>[] = canManageStudents
    ? [
        { label: "Edit", onSelect: (r) => onEditStudent?.(r.id) },
        { label: "Mark as Left", onSelect: (r) => handleStatusChange(r, "left") },
        { label: "Mark as Passout", onSelect: (r) => handleStatusChange(r, "passout") },
      ]
    : [];

  const bulkActions: BulkAction<Student>[] = canManageStudents
    ? [
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
      ]
    : [];

  return (
    <div className="relative">
      <DataTable<Student>
        title="Student List"
        data={activeStudents}
        columns={studentColumns}
        filters={studentFilters}
        rowIdKey="id"
        rowActions={rowActions}
        bulkActions={bulkActions}
        onRowClick={(r) => setSelectedId(r.id)}
        activeRowId={selectedId}
        showSelectionBadge={!canManageStudents}

      />

      {selectedStudent && (
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