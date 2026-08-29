export function sortByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
}

export function sortByFaculty<T extends { department: string } | { faculty: string }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    const facultyA = "department" in a ? a.department : (a as { faculty: string }).faculty;
    const facultyB = "department" in b ? b.department : (b as { faculty: string }).faculty;
    return facultyA.localeCompare(facultyB, undefined, { sensitivity: "base" });
  });
}