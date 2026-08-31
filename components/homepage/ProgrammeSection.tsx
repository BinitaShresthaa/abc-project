import { bachelorProgrammes, masterProgrammes } from "@/data/homepage/programmes";
import ProgrammeCard from "./ProgrammeCard";
import Reveal from "./Reveal";

function Grid({ programmes, offset = 0 }: { programmes: typeof bachelorProgrammes; offset?: number }) {
  return <div className="mx-auto mt-9 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">{programmes.map((programme, i) => <Reveal key={programme.id} delay={offset + i * 70}><ProgrammeCard programme={programme}/></Reveal>)}</div>;
}

function Heading({ eyebrow, title, count }: { eyebrow: string; title: string; count: number }) {
  return <Reveal><div className="flex items-end justify-between gap-6 border-b border-slate-200 pb-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-campus-blue">{eyebrow}</p><h3 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h3></div><span className="hidden rounded-full bg-campus-blue-light px-4 py-2 text-sm font-semibold text-campus-blue sm:inline-flex">{count} Programmes</span></div></Reveal>;
}

export default function ProgrammeSection() {
  return <section id="programmes" className="bg-slate-50 py-20 sm:py-24">
    <div className="section-container">
      <Reveal className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-campus-maroon">Our Courses</p><div className="mx-auto mt-3 h-1 w-16 rounded-full bg-campus-blue" aria-hidden="true"/><h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">Find the Right <span className="text-campus-blue">Programme for Your Future</span></h2><p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Explore undergraduate and graduate programmes with essential details on faculty, duration, and academic level.</p></Reveal>
      <div className="mt-16"><Heading eyebrow="Undergraduate" title="Bachelor's Programmes" count={bachelorProgrammes.length}/><Grid programmes={bachelorProgrammes}/></div>
      <div className="mt-20"><Heading eyebrow="Graduate" title="Master's Programmes" count={masterProgrammes.length}/><div className="mx-auto mt-9 grid max-w-5xl gap-4 md:grid-cols-3">{masterProgrammes.map((programme, i) => <Reveal key={programme.id} delay={i * 80}><ProgrammeCard programme={programme}/></Reveal>)}</div></div>
    </div>
  </section>;
}
