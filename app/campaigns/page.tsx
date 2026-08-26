"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CampaignCard from "@/components/CampaignCard";
import CampaignCarousel from "@/components/CampaignCarousel";
import CampaignStories from "@/components/CampaignStories";
import StoryViewer from "@/components/StoryViewer";

import type { StoryCampaign } from "@/components/CampaignStories";

import CampaignReveal from "@/components/ui/CampaignReveal";
import CampaignContainer from "@/components/ui/CampaignContainer";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

import {
  ArrowDown,
  CheckCircle2,
  Clock,
  Heart,
  LayoutGrid,
  List,
  Rocket,
  Sparkles,
  X,
} from "lucide-react";

/* =========================================================
   CAMPAIGN TYPE
========================================================= */

export type Campaign = {
  slug: string;

  image: string;

  status:
    | "ACTIVE"
    | "UPCOMING"
    | "COMPLETED";

  category: string;

  title: string;

  description: string;

  detailedDescription?: string;

  whyMatters?: string;

  launchDate?: string;

  raised?: string;

  goal?: string;

  progress?: number;
};

/* =========================================================
   ACTIVE CAMPAIGNS
========================================================= */

const activeCampaigns: Campaign[] = [
  {
    slug: "science-lab-modernization",

    image: "/campaigns/science.jpg",

    status: "ACTIVE",

    category: "Infrastructure",

    title: "Science Lab Modernization",

    description:
      "Upgrading our biology and chemistry laboratories with modern equipment and improved learning facilities.",

    detailedDescription:
      "The Science Lab Modernization campaign aims to improve the learning environment for students studying science. Existing biology and chemistry laboratories require updated equipment and improved facilities to support practical learning and experimentation.",

    whyMatters:
      "Modern laboratory facilities allow students to gain practical experience, conduct experiments safely, and develop skills required for higher education and future scientific careers.",

    raised: "450000",

    goal: "1000000",

    progress: 45,
  },

  {
    slug: "merit-scholarship-fund-2026",

    image: "/campaigns/merit-scholarship.jpg",

    status: "ACTIVE",

    category: "Scholarship",

    title: "Merit Scholarship Fund 2026",

    description:
      "Supporting talented students from financially disadvantaged backgrounds by helping cover their educational expenses.",

    detailedDescription:
      "The Merit Scholarship Fund 2026 provides financial support to talented and hardworking students who may face difficulties continuing their education.",

    whyMatters:
      "Supporting deserving students makes quality education more accessible and creates better opportunities for students to achieve their academic goals.",

    raised: "120000",

    goal: "500000",

    progress: 24,
  },

  {
    slug: "campus-sports-complex",

    image: "/campaigns/sports.jpg",

    status: "ACTIVE",

    category: "Facilities",

    title: "Campus Sports Complex",

    description:
      "Building a multipurpose sports facility to encourage physical activity, teamwork and student well-being.",

    detailedDescription:
      "The Campus Sports Complex campaign focuses on developing a modern multipurpose sports facility where students can participate in different sports and physical activities throughout the year.",

    whyMatters:
      "Physical activity contributes to student well-being, teamwork, discipline and a healthy campus environment.",

    raised: "90000",

    goal: "500000",

    progress: 18,
  },
];

/* =========================================================
   FUTURE CAMPAIGNS
========================================================= */

const upcomingCampaigns: Campaign[] = [
  {
    slug: "library-digitization-phase-2",

    image: "/campaigns/library.jpg",

    status: "UPCOMING",

    category: "Education",

    title: "Library Digitization — Phase 2",

    description:
      "Expanding our digital archive with academic resources, manuscripts and regional research collections.",

    detailedDescription:
      "Phase 2 of the library digitization project will focus on expanding digital access to academic resources, research materials and important campus records.",

    whyMatters:
      "Digital resources make academic materials easier to access and help preserve important educational resources for future generations.",

    launchDate: "Ashoj 2083",

    raised: "0",

    goal: "300000",

    progress: 0,
  },

  {
    slug: "smart-learning-environment",

    image: "/campaigns/smart.jpg",

    status: "UPCOMING",

    category: "Education",

    title: "Smart Learning Environment",

    description:
      "Expanding smart learning facilities to create a more interactive and technology-friendly classroom environment.",

    detailedDescription:
      "This campaign aims to expand the use of smart classroom technology and digital learning equipment across more classrooms.",

    whyMatters:
      "Technology-supported classrooms can make lessons more interactive and provide students with better access to digital learning resources.",

    launchDate: "Kartik 2083",

    raised: "0",

    goal: "400000",

    progress: 0,
  },

  {
    slug: "campus-development-initiative",

    image: "/campaigns/campaign.jpg",

    status: "UPCOMING",

    category: "Development",

    title: "Campus Development Initiative",

    description:
      "Supporting future campus improvements and creating a better environment for students and faculty.",

    detailedDescription:
      "The Campus Development Initiative focuses on future improvements that can make the campus more comfortable, accessible and supportive for students and faculty.",

    whyMatters:
      "A better campus environment helps create a positive learning experience and supports the overall development of students.",

    launchDate: "Baisakh 2084",

    raised: "0",

    goal: "500000",

    progress: 0,
  },
];

/* =========================================================
   COMPLETED CAMPAIGNS
========================================================= */

const pastCampaigns: Campaign[] = [
  {
    slug: "smart-classroom-upgrade",

    image: "/campaigns/smart.jpg",

    status: "COMPLETED",

    category: "Education",

    title: "Smart Classroom Upgrade",

    description:
      "Successfully installed interactive smart boards and projectors across the campus.",

    detailedDescription:
      "The Smart Classroom Upgrade campaign successfully improved the teaching and learning environment by installing interactive smart boards, projectors and digital learning equipment.",

    whyMatters:
      "Modern classroom technology helps teachers deliver engaging lessons and gives students access to interactive learning experiences.",

    raised: "100000",

    goal: "100000",

    progress: 100,
  },

  {
    slug: "digital-library-expansion",

    image: "/campaigns/library.jpg",

    status: "COMPLETED",

    category: "Education",

    title: "Digital Library Expansion",

    description:
      "Expanded access to digital subscriptions, journals and academic research materials.",

    detailedDescription:
      "The Digital Library Expansion campaign helped increase access to academic resources, journals, publications and research materials for students and faculty.",

    whyMatters:
      "Access to reliable academic resources supports research, assignments, academic projects and lifelong learning.",

    raised: "100000",

    goal: "100000",

    progress: 100,
  },

  {
    slug: "sports-development-program",

    image: "/campaigns/sports.jpg",

    status: "COMPLETED",

    category: "Sports",

    title: "Sports Development Program",

    description:
      "Successfully supported student participation in sports and extracurricular activities.",

    detailedDescription:
      "The Sports Development Program helped provide better opportunities for students to participate in sports and extracurricular activities.",

    whyMatters:
      "Sports promote teamwork, discipline, confidence and physical well-being among students.",

    raised: "100000",

    goal: "100000",

    progress: 100,
  },
];

/* =========================================================
   STORY REEL
========================================================= */

const storyReel: StoryCampaign[] = [
  ...activeCampaigns,
  ...upcomingCampaigns,
  ...pastCampaigns,
];

/* =========================================================
   PAGE
========================================================= */

export default function CampaignsPage() {

  const router = useRouter();

  const [view, setView] =
    useState<"grid" | "list">("grid");

  const [selectedCampaign, setSelectedCampaign] =
    useState<Campaign | null>(null);

  const [storyIndex, setStoryIndex] =
    useState<number | null>(null);

  /* =======================================================
     MODAL BODY SCROLL
  ======================================================= */

  useEffect(() => {

    if (
      selectedCampaign ||
      storyIndex !== null
    ) {

      document.body.style.overflow = "hidden";

    } else {

      document.body.style.overflow = "";

    }

    return () => {

      document.body.style.overflow = "";

    };

  }, [selectedCampaign, storyIndex]);

  /* =======================================================
     CAMPAIGN MODAL
  ======================================================= */

  const openCampaign = (
    campaign: Campaign
  ) => {

    setSelectedCampaign(campaign);

  };

  const closeCampaign = () => {

    setSelectedCampaign(null);

  };

  /* =======================================================
     STORY
  ======================================================= */

  const openStory = (
    index: number
  ) => {

    setStoryIndex(index);

  };

  const closeStory = () => {

    setStoryIndex(null);

  };

  /* =======================================================
     DONATE
  ======================================================= */

  const donateToCampaign = (
    campaign: Campaign
  ) => {

    router.push(
      `/campaigns/${campaign.slug}/donate`
    );

  };

  return (

    <main className="min-h-screen bg-white">

      {/* ===================================================
          HERO
      =================================================== */}

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

                Empowering

                <br />

                <span className="text-[#0E76BD]">
                  Our Future.
                </span>

              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">

                Join us in shaping the next generation of leaders.
                Our campaigns improve academic facilities,
                provide scholarships and create opportunities
                for students.

              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                <div className="flex items-center gap-2 rounded-full border border-[#0E76BD]/15 bg-white px-4 py-2 shadow-sm">

                  <span className="relative flex h-2 w-2">

                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0E76BD] opacity-75" />

                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0E76BD]" />

                  </span>

                  <span className="text-xs font-bold text-[#172B3A]">
                    {activeCampaigns.length} Running
                  </span>

                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#0E76BD]/15 bg-white px-4 py-2 shadow-sm">

                  <Clock
                    size={13}
                    className="text-[#0E76BD]"
                  />

                  <span className="text-xs font-bold text-[#172B3A]">
                    {upcomingCampaigns.length} Upcoming
                  </span>

                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#0E76BD]/15 bg-white px-4 py-2 shadow-sm">

                  <CheckCircle2
                    size={13}
                    className="text-[#0E76BD]"
                  />

                  <span className="text-xs font-bold text-[#172B3A]">
                    {pastCampaigns.length} Completed
                  </span>

                </div>

              </div>

              <a
                href="#active-campaigns"
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#0E76BD] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0E76BD]/25 transition-all duration-300 hover:bg-[#095F99] hover:shadow-xl"
              >

                Explore Campaigns

                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />

              </a>

            </CampaignReveal>

            <CampaignReveal delay={150}>

              <div className="relative">

                <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white shadow-2xl shadow-[#0E76BD]/15">

                  <img
                    src="/campaigns/campaign.jpg"
                    alt="Campus Campaign"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                </div>

                <div className="absolute -bottom-5 left-4 rounded-xl border border-blue-50 bg-white px-5 py-3 shadow-xl sm:left-6">

                  <p className="text-2xl font-bold text-[#0E76BD]">
                    1,200+
                  </p>

                  <p className="text-xs font-medium text-gray-500">
                    Students supported
                  </p>

                </div>

              </div>

            </CampaignReveal>

          </div>

        </CampaignContainer>

      </section>

      {/* ===================================================
          CAMPAIGN HIGHLIGHTS
      =================================================== */}

      <section className="border-b border-blue-50 bg-white py-7 sm:py-8">

        <CampaignContainer>

          <CampaignReveal>

            <div className="mb-4 flex items-center gap-2">

              <Sparkles
                size={16}
                className="text-[#0E76BD]"
              />

              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#172B3A]">
                Campaign Highlights
              </h2>

            </div>

          </CampaignReveal>

          <CampaignReveal delay={80}>

            <CampaignStories
              campaigns={storyReel}
              onOpen={openStory}
            />

          </CampaignReveal>

        </CampaignContainer>

      </section>

      {/* ===================================================
          ACTIVE CAMPAIGNS
      =================================================== */}

      <section
        id="active-campaigns"
        className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#F5FAFD] via-white to-[#F5FAFD] py-14 sm:py-16 lg:py-20"
      >

        <CampaignContainer maxWidth="max-w-[1600px]">

          <CampaignReveal>

            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-3">

                <div className="mt-1 h-7 w-1.5 rounded-full bg-[#0E76BD]" />

                <div>

                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0E76BD]">

                    <Rocket size={12} />

                    Make an impact

                  </p>

                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#172B3A] sm:text-3xl">
                    Active Campaigns
                  </h2>

                </div>

              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">

                <div className="flex rounded-xl border border-blue-100 bg-white p-1 shadow-sm">

                  <button
                    type="button"
                    aria-label="Grid view"
                    onClick={() => setView("grid")}
                    className={`rounded-lg p-2.5 transition-all ${
                      view === "grid"
                        ? "bg-[#0E76BD] text-white shadow-md"
                        : "text-gray-400 hover:bg-blue-50 hover:text-[#0E76BD]"
                    }`}
                  >

                    <LayoutGrid size={17} />

                  </button>

                  <button
                    type="button"
                    aria-label="List view"
                    onClick={() => setView("list")}
                    className={`rounded-lg p-2.5 transition-all ${
                      view === "list"
                        ? "bg-[#0E76BD] text-white shadow-md"
                        : "text-gray-400 hover:bg-blue-50 hover:text-[#0E76BD]"
                    }`}
                  >

                    <List size={17} />

                  </button>

                </div>

              </div>

            </div>

          </CampaignReveal>

          {view === "grid" ? (

            <CampaignCarousel
              items={activeCampaigns}
              fade="light"
              renderItem={(campaign) => (

                <CampaignCard
                  layout="grid"
                  {...campaign}
                  onCampaignClick={() =>
                    openCampaign(campaign)
                  }
                  onDonateClick={() =>
                    donateToCampaign(campaign)
                  }
                />

              )}
            />

          ) : (

            <div className="flex flex-col gap-5 sm:gap-6">

              {activeCampaigns.map(
                (campaign, index) => (

                  <CampaignReveal
                    key={campaign.slug}
                    delay={index * 100}
                    className="h-full"
                  >

                    <CampaignCard
                      layout="list"
                      {...campaign}
                      onCampaignClick={() =>
                        openCampaign(campaign)
                      }
                      onDonateClick={() =>
                        donateToCampaign(campaign)
                      }
                    />

                  </CampaignReveal>

                )
              )}

            </div>

          )}

        </CampaignContainer>

      </section>

      {/* ===================================================
          FUTURE CAMPAIGNS
      =================================================== */}

      <section className="relative overflow-hidden border-t border-blue-50 bg-white py-14 sm:py-16 lg:py-20">

        <CampaignContainer maxWidth="max-w-[1600px]">

          <CampaignReveal>

            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex items-start gap-3">

                <div className="mt-1 h-7 w-1.5 rounded-full bg-[#0E76BD]" />

                <div>

                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0E76BD]">

                    <Clock size={12} />

                    Coming soon

                  </p>

                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#172B3A] sm:text-3xl">
                    Future Campaigns
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">

                    Support upcoming initiatives and help us
                    build a stronger future for students.

                  </p>

                </div>

              </div>

            </div>

          </CampaignReveal>

          <CampaignCarousel
            items={upcomingCampaigns}
            fade="light"
            renderItem={(campaign) => (

              <CampaignCard
                layout="grid"
                {...campaign}
                onCampaignClick={() =>
                  openCampaign(campaign)
                }
                onDonateClick={() =>
                  donateToCampaign(campaign)
                }
              />

            )}
          />

        </CampaignContainer>

      </section>

      {/* ===================================================
          PAST CAMPAIGNS
      =================================================== */}

      <section className="border-t border-blue-50 bg-[#F7FBFE] py-14 sm:py-16 lg:py-20">

        <CampaignContainer maxWidth="max-w-[1600px]">

          <CampaignReveal>

            <div className="mb-8 flex items-start gap-3">

              <div className="mt-1 h-7 w-1.5 rounded-full bg-gray-300" />

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                  Completed initiatives
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#172B3A] sm:text-3xl">
                  Past Campaigns
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Browse our successfully completed campaigns.
                </p>

              </div>

            </div>

          </CampaignReveal>

          {/* SAME CARD SIZE AS ACTIVE / FUTURE */}

          <div className="flex flex-wrap gap-5 sm:gap-6">

            {pastCampaigns.map(
              (campaign, index) => (

                <CampaignReveal
                  key={campaign.slug}
                  delay={index * 100}
                  className="w-[280px] flex-shrink-0 sm:w-[320px] lg:w-[350px]"
                >

                  <CampaignCard
                    layout="grid"
                    {...campaign}
                    onCampaignClick={() =>
                      openCampaign(campaign)
                    }
                  />

                </CampaignReveal>

              )
            )}

          </div>

        </CampaignContainer>

      </section>

      {/* ===================================================
          DETAILS MODAL
      =================================================== */}

      {selectedCampaign && (

        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#062B42]/70 p-0 backdrop-blur-sm sm:p-4"
          onClick={closeCampaign}
        >

          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-[94vh] sm:max-w-4xl sm:rounded-2xl"
          >

            <button
              type="button"
              aria-label="Close campaign details"
              onClick={closeCampaign}
              className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-lg transition-all hover:scale-105 hover:bg-gray-100"
            >

              <X
                size={25}
                strokeWidth={2.5}
              />

            </button>

            <div className="min-h-0 flex-1 overflow-y-auto">

              <div className="relative h-60 w-full sm:h-[360px]">

                <img
                  src={selectedCampaign.image}
                  alt={selectedCampaign.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#062B42]/50 via-transparent to-transparent" />

              </div>

              <div className="px-5 py-7 sm:px-10 sm:py-9">

                <div className="flex flex-wrap items-center gap-3">

                  <span
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold tracking-wide text-white ${
                      selectedCampaign.status === "ACTIVE"
                        ? "bg-[#0E76BD]"
                        : selectedCampaign.status === "UPCOMING"
                        ? "bg-[#172B3A]"
                        : "bg-gray-700"
                    }`}
                  >

                    {selectedCampaign.status === "UPCOMING" && (
                      <Clock size={13} />
                    )}

                    {selectedCampaign.status === "ACTIVE"
                      ? "RUNNING"
                      : selectedCampaign.status}

                  </span>

                  <span className="rounded-lg bg-[#0E76BD]/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#0E76BD]">

                    {selectedCampaign.category}

                  </span>

                  {selectedCampaign.status === "UPCOMING" &&
                    selectedCampaign.launchDate && (

                      <span className="text-xs font-semibold text-gray-500">

                        Launching{" "}
                        {selectedCampaign.launchDate}

                      </span>

                    )}

                </div>

                <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-[#172B3A] sm:text-4xl">

                  {selectedCampaign.title}

                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">

                  {selectedCampaign.description}

                </p>

                <div className="my-7 border-t border-blue-100" />

                <section>

                  <h3 className="text-xl font-bold text-[#172B3A] sm:text-2xl">
                    About This Campaign
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">

                    {selectedCampaign.detailedDescription ||
                      selectedCampaign.description}

                  </p>

                </section>

                {selectedCampaign.whyMatters && (

                  <section className="mt-8">

                    <h3 className="text-xl font-bold text-[#172B3A] sm:text-2xl">
                      Why This Campaign Matters
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">

                      {selectedCampaign.whyMatters}

                    </p>

                  </section>

                )}

                {(selectedCampaign.status === "ACTIVE" ||
                  selectedCampaign.status === "UPCOMING") && (

                  <button
                    type="button"
                    onClick={() =>
                      donateToCampaign(selectedCampaign)
                    }
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#800000] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#800000]/20 transition-all duration-300 hover:bg-[#660000] hover:shadow-xl active:scale-[0.99]"
                  >

                    <Heart
                      size={19}
                      fill="currentColor"
                    />

                    Donate Now

                  </button>

                )}

                {selectedCampaign.status === "COMPLETED" && (

                  <div className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-[#0E76BD]/15 bg-[#EAF6FC] px-6 py-4 text-sm font-bold text-[#0E76BD]">

                    <CheckCircle2 size={19} />

                    This campaign is fully funded

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ===================================================
          STORY VIEWER
      =================================================== */}

      {storyIndex !== null && (

        <StoryViewer
          campaigns={storyReel}
          startIndex={storyIndex}
          onClose={closeStory}
          onDonate={(campaign) => {

            closeStory();

            donateToCampaign(
              campaign as Campaign
            );

          }}
          onNotify={(campaign) => {

            closeStory();

            donateToCampaign(
              campaign as Campaign
            );

          }}
        />

      )}

      {/* ===================================================
          SCROLL TO TOP
      =================================================== */}

      <ScrollToTopButton />

    </main>

  );
}