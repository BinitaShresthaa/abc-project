"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { primaryNav } from "@/data/homepage/navigation";
import DropdownMenu from "./DropdownMenu";
import MobileMenu from "./MobileMenu";
import DarkModeToggle from "./DarkModeToggle";
import LoginButton from "./LoginButton";

export default function Header({ activeHref = "/" }: { activeHref?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Logo row — scrolls away normally with the page. */}
      <header className="relative z-40">
        <div className="bg-white py-2 sm:py-3">
          <div className="section-container flex items-center justify-center">
            <a
              href="/"
              aria-label="Aadikavi Bhanubhakta Campus home"
              className="block w-full max-w-[220px] sm:max-w-[240px]"
            >
              <Image
                src="/images/aadikavi-logo.png"
                alt="Aadikavi Bhanubhakta Campus — affiliated to Tribhuvan University"
                width={2000}
                height={666}
                priority
                sizes="(max-width: 640px) 60vw, 240px"
                className="mx-auto h-auto w-full object-contain"
              />
            </a>
          </div>
        </div>
      </header>

      {/* Nav bar — a native `position: sticky` element, kept as a sibling of
          <header> rather than nested inside it so its containing block is
          the whole document, not the short header above. Nav links are
          centered independent of the right-side controls via absolute
          centering, so the login/theme cluster can stay flush right without
          pulling the links off-center. */}
      <div
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-campus-blue/95 shadow-nav backdrop-blur-md"
            : "bg-campus-blue"
        }`}
      >
        <div className="section-container relative flex min-h-16 items-center justify-end gap-2 sm:gap-3">
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            {primaryNav.map((link) => (
              <DropdownMenu key={link.href} link={link} active={link.href === activeHref} />
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <DarkModeToggle />
            <LoginButton className="hidden sm:inline-flex" />
            <MobileMenu activeHref={activeHref} />
          </div>
        </div>
      </div>
    </>
  );
}
