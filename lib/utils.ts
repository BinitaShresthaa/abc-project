export function getInitials(name: string) {
  return name
    .replace(/^(?:(?:Dr|Mr|Mrs|Ms|Er|Prof)\.\s*)+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}