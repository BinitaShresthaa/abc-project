export type ProgressMode = "year" | "semester";

export interface YearSemesterValue {
  mode: ProgressMode;
  value: number;
}

export interface ProgressRange {
  yearMax: number;
  semesterMax: number;
}

// Bachelor: 4 years / 8 semesters. Master: 2 years / 4 semesters.
// Adjust these two lines if Master's actual structure differs.
export function getProgressRange(level: "bachelor" | "master"): ProgressRange {
  return level === "master" ? { yearMax: 2, semesterMax: 4 } : { yearMax: 4, semesterMax: 8 };
}

export function formatProgress(v: YearSemesterValue): string {
  return v.mode === "year" ? `Year ${v.value}` : `Semester ${v.value}`;
}

// Flat list of every possible label across both levels — used for the
// table's filter dropdown, since a mixed student list spans both levels.
export function getAllProgressOptions(): string[] {
  const bachelor = getProgressRange("bachelor");
  const options: string[] = [];
  for (let y = 1; y <= bachelor.yearMax; y++) options.push(`Year ${y}`);
  for (let s = 1; s <= bachelor.semesterMax; s++) options.push(`Semester ${s}`);
  return options;
}