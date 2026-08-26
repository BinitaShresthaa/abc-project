"use client";

import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Heart,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

type StoryCampaign = {
  slug: string;

  image: string;

  status:
    | "ACTIVE"
    | "UPCOMING"
    | "COMPLETED";

  category: string;

  title: string;

  description: string;

  launchDate?: string;
};

type Props = {
  campaigns: StoryCampaign[];

  startIndex: number;

  onClose: () => void;

  onDonate: (
    campaign: StoryCampaign
  ) => void;

  onNotify?: (
    campaign: StoryCampaign
  ) => void;
};

export default function StoryViewer({
  campaigns,
  startIndex,
  onClose,
  onDonate,
}: Props) {

  const [index, setIndex] =
    useState(startIndex);

  const campaign =
    campaigns[index];

  const next = () => {

    setIndex(
      (current) =>
        (current + 1) %
        campaigns.length
    );

  };

  const previous = () => {

    setIndex(
      (current) =>
        (current - 1 +
          campaigns.length) %
        campaigns.length
    );

  };

  useEffect(() => {

    const handleKey = (
      event: KeyboardEvent
    ) => {

      if (event.key === "Escape") {
        onClose();
      }

      if (
        event.key === "ArrowRight"
      ) {
        next();
      }

      if (
        event.key === "ArrowLeft"
      ) {
        previous();
      }

    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleKey
      );

    };

  });

  if (!campaign) {
    return null;
  }

  return (

    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4">

      {/* CLOSE */}

      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-xl transition hover:scale-105"
      >

        <X size={22} />

      </button>

      {/* LEFT */}

      <button
        type="button"
        onClick={previous}
        className="absolute left-3 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg sm:flex"
      >

        <ArrowLeft size={22} />

      </button>

      {/* CARD */}

      <div className="relative h-[85vh] w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* IMAGE */}

        <div className="relative h-[55%]">

          <img
            src={campaign.image}
            alt={campaign.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#062B42]/80 via-transparent to-transparent" />

          {/* STATUS */}

          <div className="absolute left-5 top-5">

            <span className="rounded-full bg-[#0E76BD] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">

              {campaign.status}

            </span>

          </div>

        </div>

        {/* CONTENT */}

        <div className="flex h-[45%] flex-col overflow-y-auto p-6">

          <p className="text-xs font-bold uppercase tracking-widest text-[#0E76BD]">

            {campaign.category}

          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#172B3A]">

            {campaign.title}

          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">

            {campaign.description}

          </p>

          {campaign.launchDate && (

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-500">

              <Clock
                size={14}
                className="text-[#0E76BD]"
              />

              Launching{" "}
              {campaign.launchDate}

            </div>

          )}

          {campaign.status !==
            "COMPLETED" && (

            <button
              type="button"
              onClick={() =>
                onDonate(campaign)
              }
              className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
            >

              <Heart
                size={18}
                fill="currentColor"
              />

              Donate Now

            </button>

          )}

        </div>

      </div>

      {/* RIGHT */}

      <button
        type="button"
        onClick={next}
        className="absolute right-3 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg sm:flex"
      >

        <ArrowRight size={22} />

      </button>

    </div>

  );
}