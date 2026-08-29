"use client";

import { useEffect, useState } from "react";
import Avatar from "@/components/dashboard/table/Avatar";

export default function PhotoUploadField({
  name,
  value,
  onChange,
}: {
  name: string;
  value?: string;
  onChange: (url: string | undefined) => void;
}) {
  const [preview, setPreview] = useState<string | undefined>(value);

  // Re-sync local preview whenever the parent's value changes —
  // e.g. after a form reset back to emptyForm, or after Reset in Edit.
  useEffect(() => {
    setPreview(value);
  }, [value]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(url);
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar name={name || "?"} photo={preview} size={64} shape="square" />
      <label className="cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
        Choose photo
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>
    </div>
  );
}