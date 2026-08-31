"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CampaignCard from "./CampaignCard";
import CampaignCarousel from "./CampaignCarousel";
import CampaignStories, { type HighlightEntry } from "./CampaignStories";
import StoryViewer from "./StoryViewer";
import CampaignReveal from "./ui/CampaignReveal";
import CampaignContainer from "./ui/CampaignContainer";
import ScrollToTopButton from "./ui/ScrollToTopButton";
import { formatLaunchDateBS } from "@/lib/nepali-date";

import type { Campaign, CampaignHighlight } from "@/lib/campaigns/types";
import {
  ArrowDown, CheckCircle2, Clock, Heart, LayoutGrid, List, Rocket, Sparkles, X,
} from "lucide-react";

export default function CampaignsClient({ campaigns, highlights }: { campaigns: Campaign[]; highlights: CampaignHighlight[] }) {
  const router = useRouter();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [storyIndex, setStoryIndex] = useState<number | null>(null);

  const activeCampaigns = useMemo(() => campaigns.filter((c) => c.status === "ACTIVE"), [campaigns]);
  const upcomingCampaigns = useMemo(() => campaigns.filter((c) => c.status === "UPCOMING"), [campaigns]);
  const pastCampaigns = useMemo(() => campaigns.filter((c) => c.status === "COMPLETED"), [campaigns]);

  // Join highlights (campaignId + extra photos) with their campaign record —
  // full photo sequence is [campaign.image, ...highlight.photos].
  const storyEntries = useMemo<HighlightEntry[]>(() => {
    return highlights
      .map((h) => {
        const campaign = campaigns.find((c) => c.id === h.campaignId);
        if (!campaign) return null;
        return { campaign, photos: [campaign.image, ...h.photos] };
      })
      .filter((entry): entry is HighlightEntry => entry !== null);
  }, [highlights, campaigns]);

  useEffect(() => {
    document.body.style.overflow = selectedCampaign || storyIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedCampaign, storyIndex]);

  const openCampaign = (campaign: Campaign) => setSelectedCampaign(campaign);
  const closeCampaign = () => setSelectedCampaign(null);
  const openStory = (index: number) => setStoryIndex(index);
  const closeStory = () => setStoryIndex(null);
  const donateToCampaign = (campaign: Campaign) => router.push(`/campaigns/${campaign.slug}/donate`);

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-[#EAF5FC] via-white to-[#F7FBFE]">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#0E76BD]/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-[#0E76BD]/10 blur-3xl" />
        <CampaignContainer>
          <div className="relative grid items-center gap-10 py-14 sm:py-16 md:grid-cols-2 md:gap-12 md:py-20 lg:py-24">
            <CampaignReveal>
              <span className="inline-flex rounded-full bg-[#0E76BD]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0E76BD]">
                Campus Initiatives
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-[#172B3A] sm:text-5xl lg:text-6xl">
                Empowering<br /><span className="text-[#0E76BD]">Our Future.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                Join us in shaping the next generation of leaders. Our campaigns improve academic facilities, provide scholarships and create opportunities for students.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-[#0E76BD]/15 bg-white px-4 py-2 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0E76BD] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0E76BD]" />
                  </span>
                  <span className="text-xs font-bold text-[#172B3A]">{activeCampaigns.length} Running</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#0E76BD]/15 bg-white px-4 py-2 shadow-sm">
                  <Clock size={13} className="text-[#0E76BD]" />
                  <span className="text-xs font-bold text-[#172B3A]">{upcomingCampaigns.length} Upcoming</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#0E76BD]/15 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 size={13} className="text-[#0E76BD]" />
                  <span className="text-xs font-bold text-[#172B3A]">{pastCampaigns.length} Completed</span>
                </div>
              </div>
              <a href="#active-campaigns" className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#0E76BD] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0E76BD]/25 transition-all duration-300 hover:bg-[#095F99] hover:shadow-xl">
                Explore Campaigns
                <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </CampaignReveal>
            <CampaignReveal delay={150}>
              <div className="relative">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white shadow-2xl shadow-[#0E76BD]/15">
                  <img src="/campaigns/campaign.jpg" alt="Campus Campaign" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <div className="absolute -bottom-5 left-4 rounded-xl border border-blue-50 bg-white px-5 py-3 shadow-xl sm:left-6">
                  <p className="text-2xl font-bold text-[#0E76BD]">1,200+</p>
                  <p className="text-xs font-medium text-gray-500">Students supported</p>
                </div>
              </div>
            </CampaignReveal>
          </div>
        </CampaignContainer>
      </section>

      {/* CAMPAIGN HIGHLIGHTS — editable in dashboard */}
      {storyEntries.length > 0 && (
        <section className="border-b border-blue-50 bg-white py-7 sm:py-8">
          <CampaignContainer>
            <CampaignReveal>
              <div className="mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-[#0E76BD]" />
                <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#172B3A]">Campaign Highlights</h2>
              </div>
            </CampaignReveal>
            <CampaignReveal delay={80}>
              <CampaignStories entries={storyEntries} onOpen={openStory} />
            </CampaignReveal>
          </CampaignContainer>
        </section>
      )}

      {/* ACTIVE CAMPAIGNS */}
      <section id="active-campaigns" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#F5FAFD] via-white to-[#F5FAFD] py-14 sm:py-16 lg:py-20">
        <CampaignContainer maxWidth="max-w-[1600px]">
          <CampaignReveal>
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-7 w-1.5 rounded-full bg-[#0E76BD]" />
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0E76BD]">
                    <Rocket size={12} /> Make an impact
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#172B3A] sm:text-3xl">Active Campaigns</h2>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="flex rounded-xl border border-blue-100 bg-white p-1 shadow-sm">
                  <button type="button" aria-label="Grid view" onClick={() => setView("grid")} className={`rounded-lg p-2.5 transition-all ${view === "grid" ? "bg-[#0E76BD] text-white shadow-md" : "text-gray-400 hover:bg-blue-50 hover:text-[#0E76BD]"}`}>
                    <LayoutGrid size={17} />
                  </button>
                  <button type="button" aria-label="List view" onClick={() => setView("list")} className={`rounded-lg p-2.5 transition-all ${view === "list" ? "bg-[#0E76BD] text-white shadow-md" : "text-gray-400 hover:bg-blue-50 hover:text-[#0E76BD]"}`}>
                    <List size={17} />
                  </button>
                </div>
              </div>
            </div>
          </CampaignReveal>

          {activeCampaigns.length === 0 ? (
            <p className="text-sm text-gray-400">No active campaigns right now.</p>
          ) : view === "grid" ? (
            <CampaignCarousel
              items={activeCampaigns}
              fade="light"
              renderItem={(campaign) => (
                <CampaignCard layout="grid" {...campaign} onCampaignClick={() => openCampaign(campaign)} onDonateClick={() => donateToCampaign(campaign)} />
              )}
            />
          ) : (
            <div className="flex flex-col gap-5 sm:gap-6">
              {activeCampaigns.map((campaign, index) => (
                <CampaignReveal key={campaign.slug} delay={index * 100} className="h-full">
                  <CampaignCard layout="list" {...campaign} onCampaignClick={() => openCampaign(campaign)} onDonateClick={() => donateToCampaign(campaign)} />
                </CampaignReveal>
              ))}
            </div>
          )}
        </CampaignContainer>
      </section>

      {/* FUTURE CAMPAIGNS */}
      <section className="relative overflow-hidden border-t border-blue-50 bg-white py-14 sm:py-16 lg:py-20">
        <CampaignContainer maxWidth="max-w-[1600px]">
          <CampaignReveal>
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-7 w-1.5 rounded-full bg-[#0E76BD]" />
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0E76BD]">
                    <Clock size={12} /> Coming soon
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#172B3A] sm:text-3xl">Future Campaigns</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                    Support upcoming initiatives and help us build a stronger future for students.
                  </p>
                </div>
              </div>
            </div>
          </CampaignReveal>

          {upcomingCampaigns.length === 0 ? (
            <p className="text-sm text-gray-400">Nothing scheduled yet.</p>
          ) : (
            <CampaignCarousel
              items={upcomingCampaigns}
              fade="light"
              renderItem={(campaign) => (
                <CampaignCard layout="grid" {...campaign} onCampaignClick={() => openCampaign(campaign)} onDonateClick={() => donateToCampaign(campaign)} />
              )}
            />
          )}
        </CampaignContainer>
      </section>

      {/* PAST CAMPAIGNS */}
      <section className="border-t border-blue-50 bg-[#F7FBFE] py-14 sm:py-16 lg:py-20">
        <CampaignContainer maxWidth="max-w-[1600px]">
          <CampaignReveal>
            <div className="mb-8 flex items-start gap-3">
              <div className="mt-1 h-7 w-1.5 rounded-full bg-gray-300" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">Completed initiatives</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#172B3A] sm:text-3xl">Past Campaigns</h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">Browse our successfully completed campaigns.</p>
              </div>
            </div>
          </CampaignReveal>

          <div className="flex flex-wrap gap-5 sm:gap-6">
            {pastCampaigns.map((campaign, index) => (
              <CampaignReveal key={campaign.slug} delay={index * 100} className="w-[280px] flex-shrink-0 sm:w-[320px] lg:w-[350px]">
                <CampaignCard layout="grid" {...campaign} onCampaignClick={() => openCampaign(campaign)} />
              </CampaignReveal>
            ))}
          </div>
        </CampaignContainer>
      </section>

      {/* DETAILS MODAL */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#062B42]/70 p-0 backdrop-blur-sm sm:p-4" onClick={closeCampaign}>
          <div onClick={(e) => e.stopPropagation()} className="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-[94vh] sm:max-w-4xl sm:rounded-2xl">
            <button type="button" aria-label="Close campaign details" onClick={closeCampaign} className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-lg transition-all hover:scale-105 hover:bg-gray-100">
              <X size={25} strokeWidth={2.5} />
            </button>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="relative h-60 w-full sm:h-[360px]">
                <img src={selectedCampaign.image} alt={selectedCampaign.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062B42]/50 via-transparent to-transparent" />
              </div>
              <div className="px-5 py-7 sm:px-10 sm:py-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold tracking-wide text-white ${selectedCampaign.status === "ACTIVE" ? "bg-[#0E76BD]" : selectedCampaign.status === "UPCOMING" ? "bg-[#172B3A]" : "bg-gray-700"}`}>
                    {selectedCampaign.status === "UPCOMING" && <Clock size={13} />}
                    {selectedCampaign.status === "ACTIVE" ? "RUNNING" : selectedCampaign.status}
                  </span>
                  <span className="rounded-lg bg-[#0E76BD]/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#0E76BD]">
                    {selectedCampaign.faculty}
                  </span>
                  {selectedCampaign.status === "UPCOMING" && selectedCampaign.launchDate && (
  <span className="text-xs font-semibold text-gray-500">
    Launching {formatLaunchDateBS(selectedCampaign.launchDate)}
  </span>
)}
                </div>
                <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-[#172B3A] sm:text-4xl">{selectedCampaign.title}</h2>
                <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">{selectedCampaign.description}</p>

                <div className="my-7 border-t border-blue-100" />
                <section>
                  <h3 className="text-xl font-bold text-[#172B3A] sm:text-2xl">About This Campaign</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                    {selectedCampaign.detailedDescription || selectedCampaign.description}
                  </p>
                </section>
                {selectedCampaign.whyMatters && (
                  <section className="mt-8">
                    <h3 className="text-xl font-bold text-[#172B3A] sm:text-2xl">Why This Campaign Matters</h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">{selectedCampaign.whyMatters}</p>
                  </section>
                )}
                {(selectedCampaign.status === "ACTIVE" || selectedCampaign.status === "UPCOMING") && (
                  <button type="button" onClick={() => donateToCampaign(selectedCampaign)} className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#800000] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#800000]/20 transition-all duration-300 hover:bg-[#660000] hover:shadow-xl active:scale-[0.99]">
                    <Heart size={19} fill="currentColor" /> Donate Now
                  </button>
                )}
                {selectedCampaign.status === "COMPLETED" && (
                  <div className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-[#0E76BD]/15 bg-[#EAF6FC] px-6 py-4 text-sm font-bold text-[#0E76BD]">
                    <CheckCircle2 size={19} /> This campaign is fully funded
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STORY VIEWER */}
      {storyIndex !== null && (
        <StoryViewer
          entries={storyEntries}
          startIndex={storyIndex}
          onClose={closeStory}
          onDonate={(campaign) => { closeStory(); donateToCampaign(campaign); }}
        />
      )}

      <ScrollToTopButton />
    </main>
  );
}