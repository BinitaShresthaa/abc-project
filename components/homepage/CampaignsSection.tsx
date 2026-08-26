"use client";

import { campaigns } from "@/data/homepage/campaigns";
import AutoScrollRow from "./AutoScrollRow";
import CampaignCard from "./CampaignCard";
import Reveal from "./Reveal";

export default function CampaignsSection() {
  return (
    <section className="relative card-row-glow overflow-hidden bg-slate-50/70 py-16 sm:py-24">
      <div className="section-container relative z-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-campus-blue">
              Get Involved
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-700 sm:text-4xl">
              Current Campaigns
            </h2>
          </div>
          <a
            href="/campaigns"
            className="inline-flex items-center gap-1.5 rounded-full bg-campus-maroon px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-campus-maroon-dark"
          >
            Explore Campaigns
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-10">
        <AutoScrollRow
          items={campaigns}
          speed={40}
          renderItem={(campaign) => <CampaignCard campaign={campaign} />}
        />
      </Reveal>
    </section>
  );
}
