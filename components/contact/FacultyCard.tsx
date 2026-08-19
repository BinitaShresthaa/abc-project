"use client";

import { useState } from "react";
import Image from "next/image";
import type { FacultyMember } from "@/lib/types";
import { getInitials } from "@/lib/utils";

export default function FacultyCard({
  member,
  onClick,
}: {
  member: FacultyMember;
  onClick: (member: FacultyMember) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const showPhoto = member.photo && !imgError;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(member)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(member);
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary sm:p-6"
    >
<span
  className="absolute inset-x-0 top-0 h-1"
  style={{
    background:
      "linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 20%, white) 0%, var(--color-primary) 50%, color-mix(in srgb, var(--color-primary) 20%, white) 100%)",
    backgroundSize: "250% 100%",
    animation: "card-sweep 3.2s ease-in-out infinite",
  }}
/>
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20 sm:h-[68px] sm:w-[68px]">
          {showPhoto ? (
            <Image
              src={member.photo as string}
              alt={member.name}
              fill
              sizes="68px"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary text-lg font-semibold text-white">
              {getInitials(member.name)}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h4 className="truncate text-base font-semibold text-primary sm:text-[1.05rem]">
            {member.name}
          </h4>
          <p className="mt-0.5 text-sm text-slate-500">{member.role}</p>
          <span className="mt-2 inline-block rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            {member.department}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-dashed border-slate-200 pt-4">
        
         <a href={`mailto:${member.email}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-primary"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-primary">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="truncate">{member.email}</span>
        </a>
        
         <a  href={`tel:${member.phone}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-primary"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-primary">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>{member.phone}</span>
        </a>
      </div>
    </div>
  );
}