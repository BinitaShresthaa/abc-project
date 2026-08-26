import Image from "next/image";
import { allProgrammes } from "@/data/homepage/programmes";
import { siteInfo, socialLinks } from "@/data/homepage/misc";

const usefulLinks = [
  { label: "Home", href: "/" },
  { label: "Alumni", href: "/almuni/almuni-login" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-campus-blue text-white">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        aria-hidden="true"
      />
      <div className="section-container grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/aadikavi-logo.png"
              alt="Aadikavi Bhanubhakta Campus logo"
              width={200}
              height={67}
              className="h-12 w-auto max-w-[180px] shrink-0 object-contain"
            />
            <div>
              <p className="font-display text-lg font-bold leading-tight">
                {siteInfo.name}
              </p>
              <p className="text-xs text-white/70">{siteInfo.address}</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm font-medium italic text-white/85">
            {siteInfo.tagline}
          </p>
          <div className="mt-5 flex items-center gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Our Programs</h3>
          <ul className="mt-4 space-y-2.5">
            {allProgrammes.map((programme) => (
              <li key={programme.id}>
                <a
                  href={programme.href}
                  className="flex items-center gap-2 text-sm text-white/85 hover:text-white"
                >
                  <span className="text-xs" aria-hidden="true">
                    &#9656;
                  </span>
                  {programme.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Useful Link</h3>
          <ul className="mt-4 space-y-2.5">
            {usefulLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-white/85 hover:text-white"
                >
                  <span className="text-xs" aria-hidden="true">
                    &#9656;
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Contact Info</h3>
          <ul className="mt-4 space-y-3.5 text-sm text-white/85">
            <li className="flex items-start gap-2.5">
              <PinIcon />
              <span>{siteInfo.shortAddress}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon />
              <a href={`mailto:${siteInfo.email}`} className="hover:text-white">
                {siteInfo.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <PhoneIcon />
              <a href={`tel:${siteInfo.phone}`} className="hover:text-white">
                {siteInfo.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="section-container flex flex-col items-center justify-between gap-3 py-5 text-sm text-white/80 sm:flex-row">
          <p>
            &copy; Copyright {siteInfo.year} {siteInfo.name} All Rights Reserved
          </p>

        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: "facebook" | "youtube" | "instagram" }) {
  if (icon === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.35C15.9 4.24 15 4.16 13.96 4.16c-2.2 0-3.7 1.34-3.7 3.8v2.44H7.65v3h2.6V21h3.24z" />
      </svg>
    );
  }
  if (icon === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M21.6 7.6a2.6 2.6 0 00-1.83-1.84C18.1 5.3 12 5.3 12 5.3s-6.1 0-7.77.46A2.6 2.6 0 002.4 7.6 27 27 0 002 12a27 27 0 00.4 4.4 2.6 2.6 0 001.83 1.84C5.9 18.7 12 18.7 12 18.7s6.1 0 7.77-.46a2.6 2.6 0 001.83-1.84A27 27 0 0022 12a27 27 0 00-.4-4.4zM10 15V9l5.2 3-5.2 3z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path
        d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2a7 7 0 017 7.5C19 14.8 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 6.5L12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path
        d="M6.5 3h2l1.5 4-2 1.5a12 12 0 006.5 6.5L16 13l4 1.5v2A2.5 2.5 0 0117.5 19 15 15 0 015 6.5 2.5 2.5 0 016.5 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
