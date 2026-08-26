"use client";

import { useId, useRef, useState } from "react";
import type { NavLink } from "@/data/homepage/navigation";

export default function DropdownMenu({
  link,
  active,
}: {
  link: NavLink;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  // Current-page indicator is a subtle underline rather than a filled
  // background, so it never competes with the red hover state.
  const baseClasses =
    "relative px-3 py-2 text-[15px] font-medium text-white transition-colors duration-200 rounded-md hover:bg-campus-maroon";
  const underline = active
    ? "after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-white"
    : "";

  if (!link.children || link.children.length === 0) {
    return (
      <a href={link.href} className={`${baseClasses} ${underline}`}>
        {link.label}
      </a>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 ${baseClasses} ${underline}`}
      >
        {link.label}
        <svg
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 12 8"
          fill="none"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id={menuId}
        role="menu"
        className={`absolute left-0 top-full z-40 min-w-[220px] origin-top rounded-lg bg-white py-2 shadow-card-hover ring-1 ring-black/5 transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {link.children.map((child) => (
          <a
            key={child.href}
            href={child.href}
            role="menuitem"
            className="block px-4 py-2 text-sm text-campus-blue-dark hover:bg-campus-blue-light hover:text-campus-blue"
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  );
}
