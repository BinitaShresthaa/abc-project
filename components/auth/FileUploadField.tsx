'use client';

import { uploadIcon } from './icons';

interface FileUploadFieldProps {
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  placeholder?: string;
}

export default function FileUploadField({
  value,
  onChange,
  accept,
  placeholder = 'No file chosen',
}: FileUploadFieldProps) {
  return (
    <div
      className="relative flex items-center gap-3 rounded-full bg-[#F5F4FB] pl-5 pr-2 py-2
                 shadow-[0_10px_25px_rgba(76,57,163,0.10)] border border-transparent"
    >
      <span className="text-[#0E76BD]">{uploadIcon}</span>
      <span className="flex-1 truncate text-sm text-[#8B87A3]">
        {value ? value.name : placeholder}
      </span>
      <label
        htmlFor="register-file-upload"
        className="cursor-pointer whitespace-nowrap rounded-full bg-white border border-black/10 px-4 py-2.5
                   text-[11.5px] font-semibold uppercase tracking-[1px] text-[#241B3A]
                   hover:bg-black/[0.03] transition-colors"
      >
        Choose File
      </label>
      <input
        id="register-file-upload"
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}