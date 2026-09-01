"use client";

import Image from "next/image";
import { mockContacts } from "@/lib/mock-contacts";
import { contactPersonToFacultyMember } from "@/lib/contact-adapter";
import FeedbackForm from "@/components/contact/FeedbackForm";
import FacultyDirectory from "@/components/contact/FacultyDirectory";
import Reveal from "@/components/ui/Reveal";
import Container from "@/components/ui/Container";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

export default function ContactPage() {
  const facultyMembers = mockContacts.map(contactPersonToFacultyMember);
  const bachelorFaculty = facultyMembers.filter((f) => f.level === "bachelor");
  const masterFaculty = facultyMembers.filter((f) => f.level === "master");

  return (
    <main className="overflow-x-hidden bg-white text-slate-800">
{/* ---------------- HERO ---------------- */}
<section className="relative overflow-hidden bg-[#E8F0F7] pb-10 pt-10 sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-14">  <Container className="relative z-10 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-12">
    <Reveal>
      <div className="p-2 sm:p-3">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Faculty Directory · Contact Persons
        </span>
        <h1 className="mt-3 max-w-xl text-2xl font-bold leading-[1.15] text-[#172B3A] sm:text-3xl lg:text-4xl">
          Reach the people behind every faculty.
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-[0.95rem]">
          Contact Persons are the Faculty Focal individuals responsible
          for their department&rsquo;s student records, academic
          queries, and day-to-day coordination — your first point of
          call at Aadikavi Bhanubhakta Campus.
        </p>

        <div className="mt-5 grid max-w-md grid-cols-3 gap-4 border-t border-primary/10 pt-4">
          <div>
            <div className="text-lg font-bold sm:text-xl" style={{ color: "#800000" }}>
              {facultyMembers.length}
            </div>
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#800000" }}>
              Contacts Listed
            </div>
          </div>
          <div className="border-l border-primary/10 pl-4">
            <div className="text-lg font-bold sm:text-xl" style={{ color: "#800000" }}>
              11
            </div>
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#800000" }}>
              Programs
            </div>
          </div>
          <div className="border-l border-primary/10 pl-4">
            <div className="text-lg font-bold sm:text-xl" style={{ color: "#800000" }}>
              39yrs
            </div>
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#800000" }}>
              Since 1987
            </div>
          </div>
        </div>
      </div>
    </Reveal>

    {/* Wider photo — shallower aspect ratio so it reads as a wide banner
        rather than a tall block, and takes up more horizontal room
        relative to the text column (1.15fr vs 1fr above). */}
    <Reveal delay={150}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-xl sm:rounded-[3rem]">
        <Image
          src="/campaigns/campaign.jpg"
          alt="Aadikavi Bhanubhakta Campus"
          fill
          sizes="(max-width: 1024px) 90vw, 640px"
          className="object-cover"
        />
      </div>
    </Reveal>
  </Container>

  {/* Thin divider strip separating hero from the next section, so the
      two sections read as visually distinct rather than blending
      together. */}
</section>
{/* Decorative divider between hero and the next section — a soft wave
    curve plus a centered accent dot, instead of a plain border line. */}
<div className="relative h-16 sm:h-20">
  <svg
    viewBox="0 0 1440 80"
    preserveAspectRatio="none"
    className="absolute inset-x-0 bottom-0 h-full w-full"
  >
    <path
      fill="white"
      d="M0,40 C360,10 1080,70 1440,40 L1440,80 L0,80 Z"
    />
  </svg>
  <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3 sm:bottom-4">
    <span className="h-px w-16 bg-primary/20 sm:w-24" />
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-9 sm:w-9">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6z" />
      </svg>
    </span>
    <span className="h-px w-16 bg-primary/20 sm:w-24" />
  </div>
</div>
      {/* ---------------- INTRO / WHAT IS A CONTACT PERSON ---------------- */}
      <section className="py-16 sm:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Who are Contact Persons
            </span>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
              One dedicated contact for every department
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-600">
              Each Head of Department serves as the designated Faculty Focal
              person — able to view and manage the student list for their
              faculty, and equipped to answer questions ranging from
              admissions to academic records.
            </p>

            <div className="mt-7 flex flex-col gap-5">
              {[
                {
                  title: "Student records",
                  desc: "Faculty-specific rosters and academic history, kept by department.",
                  icon: (
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  ),
                },
                {
                  title: "Direct communication",
                  desc: "Email and phone lines that reach the department head, not a queue.",
                  icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
                },
                {
                  title: "Academic guidance",
                  desc: "Program structure, credit transfer, and thesis-level queries.",
                  icon: (
                    <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
                  ),
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 100} y={16}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">{item.title}</h4>
                      <p className="mt-0.5 text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Photo collage — replace src values with your own images in /public/images */}
          <Reveal delay={200} y={32}>
            <div className="relative h-[300px] sm:h-[400px] lg:h-[440px]">
              <div
                className="absolute left-0 top-0 z-20 h-[62%] w-[58%] overflow-hidden rounded-xl border-4 border-white shadow-xl"
                style={{ animation: "hang-sway 6s ease-in-out infinite" }}
              >
                <Image
                  src="/images/campus/faculty-meeting.jpg"
                  alt="Faculty meeting"
                  fill
                  sizes="(max-width: 768px) 60vw, 400px"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute bottom-0 right-0 z-30 h-[46%] w-[48%] overflow-hidden rounded-xl border-4 border-white shadow-xl"
                style={{ animation: "hang-sway 5s ease-in-out infinite", animationDelay: "0.6s" }}
              >
                <Image
                  src="/images/campus/library.jpg"
                  alt="Campus library"
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute right-[6%] top-[16%] z-10 h-[34%] w-[34%] overflow-hidden rounded-xl border-4 border-white shadow-xl"
                style={
                  {
                    animation: "hang-sway 5.5s ease-in-out infinite",
                    animationDelay: "1.1s",
                    "--sway-rotate": "3deg",
                  } as React.CSSProperties
                }
              >
                <Image
                  src="/images/campus/lecture-hall.jpg"
                  alt="Lecture hall"
                  fill
                  sizes="(max-width: 768px) 40vw, 250px"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-[10%] left-[6%] z-40 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-primary text-center shadow-xl sm:h-24 sm:w-24">
                <span className="px-2 text-[11px] font-semibold leading-tight text-white">
                  Est.
                  <br />
                  1987
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- FACULTY ADMINISTRATION ---------------- */}
      <section className="bg-primary/5 py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto mb-12 max-w-xl text-center" y={16}>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Faculty Focal Person
            </span>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
              Contact Person, by academic level
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
              Primary points of contact for faculty-specific student
              details, academic records, and administrative inquiries.
              Tap a card to see full details.
            </p>
          </Reveal>

          <FacultyDirectory
            bachelorFaculty={bachelorFaculty}
            masterFaculty={masterFaculty}
          />

          {/* Info banner */}
          <Reveal delay={100}>
            <div className="mt-14 rounded-2xl bg-primary p-6 text-white sm:p-8">
              <p className="text-sm leading-relaxed sm:text-[0.95rem]">
                The Contact Person listed above are the{" "}
                <strong className="font-semibold text-white/90">primary points of contact</strong>{" "}
                for faculty-specific student details, academic records, and
                administrative inquiries within their respective departments.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- FEEDBACK ---------------- */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          <Reveal y={32}>
            <FeedbackForm />
          </Reveal>
        </Container>
      </section>

      <ScrollToTopButton />
    </main>
  );
}