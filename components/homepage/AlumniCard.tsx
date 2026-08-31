import Image from "next/image";
import type { AlumniProfile } from "@/data/homepage/alumni";

export default function AlumniCard({ alumnus }: { alumnus: AlumniProfile }) {
  return (
    <a
      href={alumnus.href}
      aria-label={`View profile of ${alumnus.name}`}
      className="group relative flex h-full w-[calc(100vw-2rem)] max-w-[305px] flex-col overflow-hidden rounded-[24px] border border-white/80 bg-white/80 shadow-[0_10px_35px_rgba(8,64,104,0.10)] backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_22px_55px_rgba(8,64,104,0.17)] sm:w-[305px]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-campus-blue-pale">
        <Image
          src={alumnus.photo}
          alt={alumnus.name}
          fill
          sizes="(max-width: 640px) calc(100vw - 2rem), 305px"
          className="object-cover object-center transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.05] group-hover:brightness-[0.48]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-campus-blue-dark/35 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-40" />

        <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/35 bg-white/20 px-5 py-3 text-sm font-semibold text-white opacity-0 shadow-lg backdrop-blur-xl transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 hover:bg-white/30">
          View Profile
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M2 8h12M9 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between bg-white/75 p-5 backdrop-blur-md">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-bold leading-tight text-campus-blue-dark">
                {alumnus.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-campus-maroon">
                {alumnus.batch}
              </p>
            </div>
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-campus-blue shadow-[0_0_0_5px_rgba(14,118,190,0.10)]" />
          </div>

          <p className="mt-3 text-sm font-medium text-slate-600">{alumnus.role}</p>
          <p className="mt-3 line-clamp-2 text-sm italic leading-relaxed text-slate-500">
            &ldquo;{alumnus.quote}&rdquo;
          </p>
        </div>

      </div>
    </a>
  );
}
