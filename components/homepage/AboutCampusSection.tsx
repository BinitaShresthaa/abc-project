import Image from "next/image";
import { aboutSite, siteInfo } from "@/data/homepage/misc";
import Reveal from "./Reveal";

export default function AboutCampusSection() {
  return (
    <section className="bg-campus-blue-pale/60 py-16 sm:py-24">
      <div className="section-container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div
            className="pointer-events-none absolute -left-10 -top-10 -z-10 h-64 w-64 rounded-full bg-white blur-3xl"
            aria-hidden="true"
          />
          <div className="group overflow-hidden rounded-card shadow-elevated ring-1 ring-black/5">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={aboutSite.image}
                alt="Aadikavi Bhanubhakta Campus main building"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1"
              />
            </div>
          </div>

          <div className="absolute -bottom-6 left-6 rounded-2xl bg-white px-5 py-4 shadow-elevated ring-1 ring-black/5 sm:-bottom-8 sm:left-10">
            <p className="font-display text-sm font-bold italic text-campus-maroon">
              &ldquo;{siteInfo.tagline}&rdquo;
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-sm font-semibold uppercase tracking-wide text-campus-maroon">
            {aboutSite.heading}
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold text-campus-blue sm:text-4xl">
            {aboutSite.title}
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-slate-600">
            {aboutSite.paragraph}
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-500">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-campus-blue" fill="none" aria-hidden="true">
              <path
                d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2a7 7 0 017 7.5C19 14.8 12 21 12 21z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            {siteInfo.address}
          </p>

        </Reveal>
      </div>
    </section>
  );
}
