import Image from "next/image";
import { aboutPillars, aboutSite, statistics } from "@/data/homepage/misc";
import Reveal from "./Reveal";
import { JSX } from "react/jsx-runtime";

const pillarIcons: Record<string, JSX.Element> = {
  student: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 6.5h16M4 12h16M4 17.5h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="6" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="17.5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.9 8.7L10.4 15.5M16.1 8.7L13.6 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  campaign: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 14V6a1 1 0 011-1h9l6 4-6 4H5a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7 17.5v2.5M9.5 20h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

const yearsStat = statistics.find((s) => s.id === "stat-years");

export default function AboutSection() {
  return (
    <section className="section-container py-16 sm:py-24">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative lg:order-2" direction="right">
          {/* Ambient blob tying this section back to the hero/stats palette
              without introducing any new hues. */}
          <div
            className="pointer-events-none absolute -left-10 -top-10 -z-10 h-64 w-64 rounded-full bg-campus-blue-light blur-3xl"
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

          {yearsStat && (
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-elevated ring-1 ring-black/5 sm:-bottom-8 sm:left-10">
              <p className="font-display text-3xl font-extrabold text-campus-blue">
                {yearsStat.value}
                {yearsStat.suffix}
              </p>
              <p className="max-w-[7rem] text-xs font-medium leading-tight text-slate-500">
                Years of trusted education
              </p>
            </div>
          )}
        </Reveal>

        <Reveal delay={120} className="lg:order-1" direction="left">
          <p className="text-sm font-semibold uppercase tracking-wide text-campus-maroon">
            {aboutSite.heading}
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold text-campus-blue sm:text-4xl">
            {aboutSite.title}
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-slate-600">
            {aboutSite.paragraph}
          </p>

          <ul className="mt-8 space-y-4">
            {aboutPillars.map((pillar) => (
              <li key={pillar.id} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-campus-blue-light text-campus-blue">
                  {pillarIcons[pillar.icon]}
                </span>
                <div>
                  <p className="font-display text-base font-bold text-campus-blue-dark">
                    {pillar.title}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-500">{pillar.description}</p>
                </div>
              </li>
            ))}
          </ul>

        </Reveal>
      </div>
    </section>
  );
}
