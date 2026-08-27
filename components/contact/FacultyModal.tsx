"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { FacultyMember } from "@/lib/types";
import { getInitials } from "@/lib/utils";

export default function FacultyModal({
  member,
  onClose,
}: {
  member: FacultyMember | null;
  onClose: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Mount immediately, then flip `visible` on the next frame so the
  // enter transition actually has a "from" state to animate away from.
  useEffect(() => {
    if (member) {
      setMounted(true);
      setImgError(false);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setMounted(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [member]);

  useEffect(() => {
    if (!member) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [member, onClose]);

  if (!mounted) return null;
  const showPhoto = member?.photo && !imgError;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm transition-opacity duration-250 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-250 ease-out ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        {member && (
          <div className="overflow-y-auto">
            {/* header / photo */}
            <div className="relative bg-primary px-6 pb-14 pt-6">
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                {member.role}
              </span>
            </div>

            {/* avatar overlapping header */}
            <div className="relative -mt-12 flex justify-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white">
                {showPhoto ? (
                  <Image
                    src={member.photo as string}
                    alt={member.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary text-2xl font-semibold text-white">
                    {getInitials(member.name)}
                  </div>
                )}
              </div>
            </div>

            {/* body */}
            <div className="px-6 pb-6 pt-4 text-center">
              <h3 className="text-lg font-bold text-primary">{member.name}</h3>
              <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {member.department}
              </span>

              <p className="mt-4 text-left text-sm leading-relaxed text-slate-600">
                {member.bio ?? `${member.name} is the Contact Person for ${member.department}.`}
              </p>

              {(member.education || member.officeHours) && (
                <div className="mt-4 space-y-1.5 text-left text-sm text-slate-600">
                  {member.education && (
                    <div>
                      <span className="font-semibold text-primary">Education: </span>
                      {member.education}
                    </div>
                  )}
                  {member.officeHours && (
                    <div>
                      <span className="font-semibold text-primary">Office Hours: </span>
                      {member.officeHours}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-5 flex flex-col gap-2 border-t border-dashed border-slate-200 pt-4 text-left">
                
                 <a href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-primary"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-primary">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span className="truncate">{member.email}</span>
                </a>
                
                 <a href={`tel:${member.phone}`}
                  className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-primary"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-primary">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{member.phone}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}