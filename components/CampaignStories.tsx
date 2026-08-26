"use client";

import { useRef } from "react";
import { Clock, Heart } from "lucide-react";

export type StoryCampaign = {
  slug: string;

  image: string;

  status: "ACTIVE" | "UPCOMING" | "COMPLETED";

  category: string;

  title: string;

  description: string;

  launchDate?: string;
};

type Props = {
  campaigns: StoryCampaign[];

  onOpen: (index: number) => void;
};

export default function CampaignStories({
  campaigns,
  onOpen,
}: Props) {

  const scrollRef =
    useRef<HTMLDivElement>(null);

  const isDraggingRef =
    useRef(false);

  const dragMovedRef =
    useRef(false);

  const startXRef =
    useRef(0);

  const startScrollLeftRef =
    useRef(0);

  /* =======================================================
     MOUSE DRAG TO SCROLL
     Lets users click-and-drag anywhere on the row, in
     either direction, with the mouse.
  ======================================================= */

  const handleMouseDown = (
    event: React.MouseEvent
  ) => {

    const el = scrollRef.current;

    if (!el) {
      return;
    }

    isDraggingRef.current = true;
    dragMovedRef.current = false;
    startXRef.current = event.pageX;
    startScrollLeftRef.current = el.scrollLeft;

  };

  const handleMouseMove = (
    event: React.MouseEvent
  ) => {

    if (!isDraggingRef.current) {
      return;
    }

    const el = scrollRef.current;

    if (!el) {
      return;
    }

    const delta =
      event.pageX - startXRef.current;

    if (Math.abs(delta) > 4) {
      dragMovedRef.current = true;
    }

    el.scrollLeft =
      startScrollLeftRef.current - delta;

  };

  const stopDragging = () => {
    isDraggingRef.current = false;
  };

  /* =======================================================
     VERTICAL WHEEL -> HORIZONTAL SCROLL
     A normal mouse wheel only produces vertical deltaY, so
     this remaps it to horizontal movement. Genuine
     horizontal trackpad gestures pass through untouched.
  ======================================================= */

  const handleWheel = (
    event: React.WheelEvent
  ) => {

    const el = scrollRef.current;

    if (!el) {
      return;
    }

    if (
      Math.abs(event.deltaY) >
      Math.abs(event.deltaX)
    ) {

      el.scrollLeft += event.deltaY;

      event.preventDefault();

    }

  };

  /* =======================================================
     CLICK GUARD
     Prevents a drag-release from also opening the story.
  ======================================================= */

  const handleCardClick = (
    index: number
  ) => {

    if (dragMovedRef.current) {
      dragMovedRef.current = false;
      return;
    }

    onOpen(index);

  };

  return (

    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onWheel={handleWheel}
      className="
        flex
        w-full
        cursor-grab
        select-none
        gap-4
        overflow-x-auto
        [-ms-overflow-style:none]
        [scrollbar-width:none]
        active:cursor-grabbing
        [&::-webkit-scrollbar]:hidden
      "
    >

      {campaigns.map(
        (campaign, index) => (

          <button
            key={campaign.slug}
            type="button"
            onClick={() =>
              handleCardClick(index)
            }
            className="
              group
              relative
              h-40
              w-72
              flex-shrink-0
              overflow-hidden
              rounded-2xl
              border
              border-blue-100
              bg-white
              text-left
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >

            {/* IMAGE */}

            <img
              src={campaign.image}
              alt={campaign.title}
              draggable={false}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
              "
            />

            {/* OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-[#062B42]/90 via-[#062B42]/20 to-transparent" />

            {/* STATUS */}

            <div className="absolute left-3 top-3">

              <span
                className={`
                  rounded-full
                  px-2.5
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-white

                  ${
                    campaign.status ===
                    "ACTIVE"
                      ? "bg-[#0E76BD]"
                      : campaign.status ===
                        "UPCOMING"
                      ? "bg-[#172B3A]"
                      : "bg-gray-700"
                  }
                `}
              >

                {campaign.status}

              </span>

            </div>

            {/* HEART */}

            {campaign.status !==
              "COMPLETED" && (

              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">

                <Heart
                  size={15}
                  fill="currentColor"
                />

              </div>

            )}

            {/* CONTENT */}

            <div className="absolute bottom-0 left-0 right-0 p-4">

              <p className="text-[9px] font-bold uppercase tracking-wider text-white/70">

                {campaign.category}

              </p>

              <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-tight text-white">

                {campaign.title}

              </h3>

              {campaign.status ===
                "UPCOMING" &&
                campaign.launchDate && (

                  <div className="mt-1 flex items-center gap-1 text-[9px] text-white/70">

                    <Clock size={10} />

                    {campaign.launchDate}

                  </div>

                )}

            </div>

          </button>

        )
      )}

    </div>

  );
}