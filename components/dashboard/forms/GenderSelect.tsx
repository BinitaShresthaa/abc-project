import { genderOptions, type Gender } from "@/lib/gender";
import { inputClass } from "./StudentFormFields";

export default function GenderSelect({
  value,
  onChange,
}: {
  value: Gender | "";
  onChange: (value: Gender) => void;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as Gender)} className={inputClass}>
      <option value="" disabled>Select gender</option>
      {genderOptions.map((g) => (
        <option key={g} value={g}>{g}</option>
      ))}
    </select>
  );
}