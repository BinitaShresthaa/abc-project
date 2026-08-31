"use client";

import { useState } from "react";
import { primaryNav } from "@/data/homepage/navigation";
import DarkModeToggle from "./DarkModeToggle";
import LoginButton from "./LoginButton";

export default function MobileMenu({ activeHref }: { activeHref: string }) {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-campus-maroon"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <div
        className={`fixed inset-x-0 top-16 z-30 max-h-[calc(100vh-64px)] overflow-y-auto bg-campus-blue-dark shadow-nav transition-all duration-300 ${
          open ? "opacity-100 visible" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <nav className="section-container flex flex-col py-3">
          {primaryNav.map((link) => {
            const isActive = link.href === activeHref;
            const isOpen = openSection === link.href;
            return (
              <div key={link.href} className="border-b border-white/10 last:border-none">
                <div className="flex items-center justify-between">
                  <a
                    href={link.href}
                    className={`flex-1 py-3 text-[15px] font-medium ${
                      isActive ? "text-white underline decoration-2 underline-offset-4" : "text-white/90"
                    }`}
                  >
                    {link.label}
                  </a>
                  {link.children && (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-label={`Toggle ${link.label} submenu`}
                      onClick={() => setOpenSection(isOpen ? null : link.href)}
                      className="p-3 text-white"
                    >
                      <svg
                        viewBox="0 0 12 8"
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
                {link.children && isOpen && (
                  <div className="flex flex-col pb-3 pl-4">
                    {link.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="py-2 text-sm text-white/80 hover:text-white"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex items-center justify-between py-4">
            <span className="text-sm font-medium text-white/80">Theme</span>
            <DarkModeToggle />
          </div>
          <LoginButton className="mb-2 w-full justify-center" />
        </nav>
      </div>
    </div>
  );
}
