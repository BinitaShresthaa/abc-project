import Image from "next/image";
import type { Campaign } from "@/data/homepage/campaigns";

const statusStyles: Record<Campaign["status"], string> = {
  Ongoing: "bg-emerald-600/90 text-white",
  Upcoming: "bg-campus-blue/90 text-white",
  Completed: "bg-slate-700/80 text-white",
};

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <a
      href={campaign.href}
      aria-label={`View campaign: ${campaign.title}`}
      className="group relative flex h-full w-[calc(100vw-2rem)] max-w-[330px] flex-col overflow-hidden rounded-[24px] border border-white/70 bg-white/80 shadow-[0_10px_35px_rgba(8,64,104,0.10)] backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_22px_55px_rgba(8,64,104,0.17)] sm:w-[330px]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          sizes="(max-width: 640px) calc(100vw - 2rem), 330px"
          className="object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.05] group-hover:brightness-[0.48]"
        />

        {/* Soft glass layer appears only when the photo is hovered/focused. */}
        <div className="pointer-events-none absolute inset-0 bg-slate-950/0 transition-colors duration-500 group-hover:bg-slate-950/20" />

        <span
          className={`absolute left-4 top-4 rounded-full border border-white/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm backdrop-blur-md ${statusStyles[campaign.status]}`}
        >
          {campaign.status}
        </span>

        <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/35 bg-white/20 px-5 py-3 text-sm font-semibold text-white opacity-0 shadow-lg backdrop-blur-xl transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 hover:bg-white/30">
          View
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

      <div className="flex flex-1 flex-col justify-between bg-white/70 p-5 backdrop-blur-md">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-campus-blue/75">
            {campaign.date}
          </p>
          <h3 className="mt-1.5 font-display text-xl font-bold leading-snug text-campus-blue-dark">
            {campaign.title}
          </h3>
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {campaign.description}
          </p>
        </div>

      </div>
    </a>
  );
}
