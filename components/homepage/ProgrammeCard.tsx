import type { Programme } from "@/data/homepage/programmes";

function Icon({ id }: { id: string }) {
  const p = { viewBox:"0 0 24 24", className:"h-6 w-6", fill:"none", stroke:"currentColor", strokeWidth:1.8, strokeLinecap:"round" as const, strokeLinejoin:"round" as const, "aria-hidden":true };
  if (id.includes("bed")) return <svg {...p}><path d="M4 5h16v14H4z"/><path d="M8 8h8M8 12h5M8 16h3"/></svg>;
  if (["bba","bbs","mbs"].includes(id)) return <svg {...p}><path d="M4 20V8l8-4 8 4v12M2 20h20M8 11v5M12 11v5M16 11v5"/></svg>;
  if (id === "bict-ed") return <svg {...p}><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 21h8M12 18v3M8 10l2 2-2 2M12 14h4"/></svg>;
  return <svg {...p}><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H11v16H6.5A2.5 2.5 0 0 0 4 22z"/><path d="M20 6.5A2.5 2.5 0 0 0 17.5 4H13v16h4.5A2.5 2.5 0 0 1 20 22z"/></svg>;
}

export default function ProgrammeCard({ programme }: { programme: Programme }) {
  return <a href={programme.href} className="group relative flex h-[220px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(8,64,104,0.06)] transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-sky-200 hover:shadow-[0_16px_34px_rgba(125,211,252,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2">
    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-sky-50/0 via-sky-50/0 to-sky-100/0 opacity-0 transition-opacity duration-500 group-hover:from-sky-50/70 group-hover:via-white/20 group-hover:to-sky-100/70 group-hover:opacity-100" />
    <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-100/70 blur-2xl transition-all duration-700 group-hover:scale-[1.8] group-hover:bg-sky-200/80" />
    <div className="relative flex items-start justify-between gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-campus-blue-pale text-campus-blue ring-1 ring-transparent transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg] group-hover:bg-sky-100 group-hover:text-sky-600 group-hover:ring-sky-200"><Icon id={programme.id}/></div>
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 transition-all duration-300 group-hover:bg-sky-100 group-hover:text-sky-700">{programme.duration}</span>
    </div>
    <div className="relative mt-4"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-campus-blue">{programme.level}</p><h3 className="mt-1 font-display text-xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-sky-700">{programme.name}</h3><p className="mt-1 line-clamp-2 min-h-[2.5rem] text-xs font-medium leading-5 text-slate-500">{programme.fullName}</p></div>
    <div className="relative mt-auto pt-4"><div className="flex items-center gap-2 text-xs text-slate-600"><span className="font-semibold text-slate-800">Faculty</span><span className="h-1 w-1 rounded-full bg-sky-300"/><span>{programme.faculty}</span></div></div>
    <span className="relative mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-transparent text-xs font-semibold text-sky-600 opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">View programme <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none"><path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
  </a>;
}
