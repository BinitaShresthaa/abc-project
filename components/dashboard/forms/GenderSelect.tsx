"use client";

import { genderOptions, type Gender } from "@/lib/gender";
import ScrollDropdown from "./ScrollDropdown";

export default function GenderSelect({
  value,
  onChange,
}: {
  value: Gender | "";
  onChange: (value: Gender) => void;
}) {
  return (
    <ScrollDropdown
      value={value}
      options={genderOptions.map((g) => ({ value: g, label: g }))}
      placeholder="Select gender"
      onChange={(v) => onChange(v as Gender)}
      visibleRows={4}
    />
  );
}