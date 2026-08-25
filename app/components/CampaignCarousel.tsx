"use client";

import { useEffect, useRef, useState } from "react";

type CarouselProps<T> = {
  items: T[];
  fade?: "light" | "dark";
  renderItem: (item: T, index: number) => React.ReactNode;
};

export default function CampaignCarousel<T>({
  items,
  fade = "light",
  renderItem,
}: CarouselProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const animationRef =
    useRef<number | null>(null);

  const positionRef =
    useRef(0);

  const lastTimeRef =
    useRef<number | null>(null);

  const pausedRef =
    useRef(false);

  /*
  ---------------------------------------------------------
  HOW MANY TIMES THE ITEMS ARRAY IS DUPLICATED

  Only 2 copies is enough on a narrow screen, but on a wide
  screen (or with a small items array) the visible area can
  become wider than one full duplicated set — which exposes
  a visible "end" right before the loop wraps.

  This is recalculated from the real, measured viewport
  width, so it always has enough copies rendered ahead of
  the scroll position, no matter how wide the container is.
  ---------------------------------------------------------
  */

  const [repeatCount, setRepeatCount] = useState(2);

  /*
  ---------------------------------------------------------
  SPEED
  ---------------------------------------------------------
  */

  const speed = 0.45;

  /*
  ---------------------------------------------------------
  MEASURE + DECIDE HOW MANY COPIES ARE NEEDED
  ---------------------------------------------------------
  */

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    if (!wrapper || !track || items.length === 0) {
      return;
    }

    const computeRepeatCount = () => {
      const firstCard =
        track.children[0] as HTMLElement | undefined;

      if (!firstCard) {
        return;
      }

      const cardWidth =
        firstCard.getBoundingClientRect().width;

      const styles =
        window.getComputedStyle(track);

      const gap =
        parseFloat(styles.columnGap || "0");

      /*
      Width of ONE complete set of items.
      */

      const setWidth =
        (cardWidth + gap) * items.length;

      if (setWidth <= 0) {
        return;
      }

      const viewportWidth =
        wrapper.getBoundingClientRect().width;

      /*
      -----------------------------------------------------
      We need enough rendered copies so that at ANY scroll
      position, there's still at least one full viewport's
      worth of cards ahead, plus one extra set as a buffer
      for the wrap-around moment.
      -----------------------------------------------------
      */

      const needed = Math.ceil(
        (viewportWidth * 2) / setWidth
      ) + 1;

      const next = Math.max(2, needed);

      setRepeatCount((prev) =>
        prev === next ? prev : next
      );
    };

    computeRepeatCount();

    const resizeObserver = new ResizeObserver(() => {
      computeRepeatCount();
    });

    resizeObserver.observe(wrapper);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items]);

  useEffect(() => {
    const track = trackRef.current;

    if (!track || items.length === 0) {
      return;
    }

    /*
    -------------------------------------------------------
    GET WIDTH OF ONE COMPLETE SET
    -------------------------------------------------------
    */

    const getLoopWidth = () => {
      const firstCard =
        track.children[0] as HTMLElement;

      if (!firstCard) {
        return 0;
      }

      /*
      Each campaign card has the same
      fixed width.

      We calculate:

      card width + gap
      */

      const cardWidth =
        firstCard.getBoundingClientRect().width;

      const styles =
        window.getComputedStyle(track);

      const gap =
        parseFloat(styles.columnGap || "0");

      /*
      IMPORTANT:

      One complete loop is always the width
      of ONE set of items, regardless of how
      many duplicated copies are rendered.
      */

      return (
        (cardWidth + gap) *
        items.length
      );
    };

    /*
    -------------------------------------------------------
    ANIMATION
    -------------------------------------------------------
    */

    const animate = (time: number) => {
      /*
      First frame
      */

      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta =
        time - lastTimeRef.current;

      lastTimeRef.current = time;

      /*
      -----------------------------------------------------
      MOVE
      -----------------------------------------------------
      */

      if (!pausedRef.current) {
        positionRef.current -=
          speed * (delta / 16.67);

        const loopWidth =
          getLoopWidth();

        if (loopWidth > 0) {
          /*
          -------------------------------------------------
          THE IMPORTANT PART
          -------------------------------------------------

          Instead of:

          position = 0

          we DON'T visibly reset.

          We add the loop width.

          Because enough duplicated sets are
          always rendered ahead of the current
          position (see repeatCount above), the
          user never sees an end — only
          continuous, seamless movement.
          -------------------------------------------------
          */

          if (
            positionRef.current <=
            -loopWidth
          ) {
            positionRef.current +=
              loopWidth;
          }

          track.style.transform =
            `translate3d(${positionRef.current}px, 0, 0)`;
        }
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    /*
    -------------------------------------------------------
    START
    -------------------------------------------------------
    */

    animationRef.current =
      requestAnimationFrame(animate);

    /*
    -------------------------------------------------------
    RESIZE
    -------------------------------------------------------
    */

    const handleResize = () => {
      /*
      Don't suddenly jump the carousel
      while resizing.
      */

      lastTimeRef.current = null;
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    /*
    -------------------------------------------------------
    CLEANUP
    -------------------------------------------------------
    */

    return () => {
      if (
        animationRef.current !== null
      ) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [items]);

  /*
  ---------------------------------------------------------
  DUPLICATE THE CARDS
  ---------------------------------------------------------

  VERY IMPORTANT:

  We need enough identical sets that the track is
  always wider than the visible viewport, at every
  scroll position — not just a fixed 2 copies.

  [1] [2] [3] [1] [2] [3] [1] [2] [3] ...

  This allows each set to replace the one before it
  without the user ever seeing a reset or an end.
  */

  const carouselItems = Array.from(
    { length: repeatCount },
    () => items
  ).flat();

  return (
    <div
      ref={wrapperRef}
      className="
        relative
        w-full
        overflow-hidden
      "

      /*
      -----------------------------------------------------
      PAUSE ONLY WHEN USER IS ACTUALLY
      HOVERING / TOUCHING
      -----------------------------------------------------
      */

      onMouseEnter={() => {
        pausedRef.current = true;
      }}

      onMouseLeave={() => {
        pausedRef.current = false;

        /*
        Prevent a sudden jump after hover.
        */

        lastTimeRef.current =
          performance.now();
      }}

      onTouchStart={() => {
        pausedRef.current = true;
      }}

      onTouchEnd={() => {
        pausedRef.current = false;

        lastTimeRef.current =
          performance.now();
      }}
    >

      {/* =================================================
          LEFT FADE
      ================================================= */}

      <div
        className={`
          pointer-events-none
          absolute
          left-0
          top-0
          z-20
          h-full
          w-14

          bg-gradient-to-r

          ${
            fade === "dark"
              ? "from-[#062B42]"
              : "from-[#F5FAFD]"
          }

          to-transparent
        `}
      />

      {/* =================================================
          TRACK
      ================================================= */}

      <div
        ref={trackRef}
        className="
          flex
          w-max
          items-stretch
          gap-6
        "
        style={{
          transform:
            "translate3d(0, 0, 0)",

          willChange:
            "transform",
        }}
      >

        {carouselItems.map(
          (item, index) => (
            <div
              key={`${index}-${String(index)}`}
              className="
                flex
                w-[280px]
                flex-shrink-0
                items-stretch

                sm:w-[320px]

                lg:w-[350px]
              "
            >
              <div className="flex w-full">
                {renderItem(
                  item,
                  index % items.length
                )}
              </div>
            </div>
          )
        )}

      </div>

      {/* =================================================
          RIGHT FADE
      ================================================= */}

      <div
        className={`
          pointer-events-none
          absolute
          right-0
          top-0
          z-20
          h-full
          w-14

          bg-gradient-to-l

          ${
            fade === "dark"
              ? "from-[#062B42]"
              : "from-[#F5FAFD]"
          }

          to-transparent
        `}
      />

    </div>
  );
}