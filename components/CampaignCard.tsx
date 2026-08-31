"use client";

import { Clock, Heart, CheckCircle2 } from "lucide-react";
import { formatLaunchDateBS } from "@/lib/nepali-date";

type CampaignCardProps = {
  slug: string;
  image: string;
  status: "ACTIVE" | "UPCOMING" | "COMPLETED";
  faculty: string;
  title: string;
  description: string;
  layout?: "grid" | "list";
  launchDate?: string;
  onCampaignClick?: () => void;
  onDonateClick?: () => void;
  onNotifyClick?: () => void;
};

export default function CampaignCard({
  image, status, faculty, title, description, layout = "grid", launchDate, onCampaignClick, onDonateClick,
}: CampaignCardProps) {
  const isList = layout === "list";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onCampaignClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onCampaignClick?.();
        }
      }}
      className={`group flex ${isList ? "h-full" : "h-[520px]"} w-full cursor-pointer overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0E76BD]/40 ${isList ? "flex-col sm:flex-row" : "flex-col"}`}
    >
      <div className={`relative block flex-shrink-0 overflow-hidden ${isList ? "h-56 w-full sm:h-auto sm:w-64" : "h-52 w-full"}`}>
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#062B42]/60 via-transparent to-transparent" />
        <div className="absolute left-4 top-4">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg ${status === "ACTIVE" ? "bg-[#0E76BD]" : status === "UPCOMING" ? "bg-[#172B3A]" : "bg-gray-700"}`}>
            {status === "UPCOMING" && <Clock size={12} />}
            {status === "COMPLETED" && <CheckCircle2 size={12} />}
            {status === "ACTIVE" ? "Running" : status}
          </span>
        </div>
      </div>

      <div className={`flex min-h-0 flex-1 flex-col p-5 ${isList ? "sm:p-6" : ""}`}>
        <span className="w-fit rounded-md bg-[#0E76BD]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0E76BD]">{faculty}</span>
        <h3 className="mt-3 text-xl font-bold leading-tight text-[#172B3A] transition-colors duration-300 group-hover:text-[#0E76BD]">{title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">{description}</p>

        {status === "UPCOMING" && launchDate && (
  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-500">
    <Clock size={14} className="text-[#0E76BD]" /> From: {formatLaunchDateBS(launchDate)}
  </div>
)}

        <div className="mt-auto pt-5">
          {(status === "ACTIVE" || status === "UPCOMING") && (
            <button
              type="button"
              onClick={(event) => { event.stopPropagation(); onDonateClick?.(); }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#800000] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:bg-red-600 hover:shadow-xl active:scale-[0.98]"
            >
              <Heart size={17} fill="currentColor" /> Donate Now
            </button>
          )}
          {status === "COMPLETED" && (
            <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#0E76BD]/15 bg-[#EAF6FC] px-5 py-3 text-sm font-bold text-[#0E76BD]">
              <CheckCircle2 size={17} /> Completed
            </div>
          )}
        </div>
      </div>
    </article>
  );
}