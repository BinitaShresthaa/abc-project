"use client";

import { useEffect, useState } from "react";
import { mockStudents, getClassmates } from "@/lib/mock-students";
import { leftStudentColumns, leftStudentFilters } from "@/components/dashboard/table/columns/left-student-columns";
import { studentDetailConfig } from "@/components/dashboard/table/columns/student-columns";
import { formatProgress } from "@/lib/academic-progress";
import DataTable from "@/components/dashboard/table/DataTable";
import DetailCard from "@/components/dashboard/table/DetailCard";
import type { Student } from "@/lib/mock-students";

export default function LeftStudentListView() {
  const leftStudents = mockStudents.filter((s) => s.status === "left");

  // No student selected by default — the list stays full width. Clicking a
  // row opens the profile panel as an overlay; the panel's × closes it again.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedStudent = selectedId ? leftStudents.find((s) => s.id === selectedId) ?? null : null;

  // Classmates: same faculty + batch + year/semester, scoped to leftStudents
  // only (never crosses into the active or passout lists).
  const classmates = selectedStudent ? getClassmates(leftStudents, selectedStudent) : [];
  const classIndex = selectedStudent ? classmates.findIndex((s) => s.id === selectedStudent.id) : -1;

  function goToClassmate(offset: number) {
    if (classIndex === -1) return;
    const next = classmates[classIndex + offset];
    if (next) setSelectedId(next.id);
  }

  // If the selected student no longer appears in this filtered list, close the panel.
  useEffect(() => {
    if (selectedId && !leftStudents.some((s) => s.id === selectedId)) {
      setSelectedId(null);
    }
  }, [leftStudents, selectedId]);

  return (
    <div className="relative">
      <DataTable
        title="Left Students"
        data={leftStudents as unknown as Record<string, unknown>[]}
        columns={leftStudentColumns as unknown as Parameters<typeof DataTable>[0]["columns"]}
        filters={leftStudentFilters as unknown as Parameters<typeof DataTable>[0]["filters"]}
        rowIdKey="id"
        onRowClick={(r) => setSelectedId((r as unknown as Student).id)}
        activeRowId={selectedId}
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