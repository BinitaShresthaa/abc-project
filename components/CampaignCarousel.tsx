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

  const animationRef = useRef<number | null>(null);

  const positionRef = useRef(0);

  const lastTimeRef = useRef<number | null>(null);

  const pausedRef = useRef(false);

  const wheelTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const [repeatCount, setRepeatCount] = useState(2);

  const speed = 0.45;

  /*
  =========================================================
  GET WIDTH OF ONE COMPLETE SET
  =========================================================
  */

  const getLoopWidth = () => {
    const track = trackRef.current;

    if (!track || items.length === 0) {
      return 0;
    }

    const firstCard =
      track.children[0] as HTMLElement | undefined;

    if (!firstCard) {
      return 0;
    }

    const cardWidth =
      firstCard.getBoundingClientRect().width;

    const styles =
      window.getComputedStyle(track);

    const gap =
      parseFloat(styles.columnGap || "0");

    return (
      (cardWidth + gap) *
      items.length
    );
  };

  /*
  =========================================================
  NORMALIZE POSITION
  =========================================================
  */

  const normalizePosition = (
    position: number,
    loopWidth: number
  ) => {
    if (loopWidth <= 0) {
      return position;
    }

    while (position <= -loopWidth) {
      position += loopWidth;
    }

    while (position > 0) {
      position -= loopWidth;
    }

    return position;
  };

  /*
  =========================================================
  APPLY POSITION
  =========================================================
  */

  const applyPosition = (position: number) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.style.transform =
      `translate3d(${position}px, 0, 0)`;
  };

  /*
  =========================================================
  CALCULATE COPIES
  =========================================================
  */

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    if (
      !wrapper ||
      !track ||
      items.length === 0
    ) {
      return;
    }

    const calculateCopies = () => {
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

      const setWidth =
        (cardWidth + gap) *
        items.length;

      if (setWidth <= 0) {
        return;
      }

      const viewportWidth =
        wrapper.getBoundingClientRect().width;

      const needed =
        Math.ceil(
          (viewportWidth * 2) /
            setWidth
        ) + 1;

      const next =
        Math.max(2, needed);

      setRepeatCount((prev) =>
        prev === next
          ? prev
          : next
      );
    };

    calculateCopies();

    const resizeObserver =
      new ResizeObserver(
        calculateCopies
      );

    resizeObserver.observe(wrapper);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items]);

  /*
  =========================================================
  HORIZONTAL WHEEL / TRACKPAD
  =========================================================

  Normal vertical wheel:
      PAGE SCROLLS

  Horizontal trackpad:
      CAROUSEL MOVES

  Shift + wheel:
      CAROUSEL MOVES
  =========================================================
  */

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

    const handleWheel = (
      event: WheelEvent
    ) => {
      const isVertical =
        Math.abs(event.deltaY) >
        Math.abs(event.deltaX);

      /*
      Normal mouse wheel.

      DO NOT TOUCH IT.

      Let the page scroll normally.
      */

      if (
        isVertical &&
        !event.shiftKey
      ) {
        return;
      }

      /*
      Determine horizontal movement.
      */

      let movement = 0;

      if (event.shiftKey) {
        movement = event.deltaY;
      } else {
        movement = event.deltaX;
      }

      if (movement === 0) {
        return;
      }

      const loopWidth =
        getLoopWidth();

      if (loopWidth <= 0) {
        return;
      }

      /*
      This is horizontal carousel
      scrolling, so prevent the page
      from moving horizontally.
      */

      event.preventDefault();

      /*
      Move carousel.

      Positive movement:
          move left

      Negative movement:
          move right
      */

      positionRef.current -= movement;

      positionRef.current =
        normalizePosition(
          positionRef.current,
          loopWidth
        );

      applyPosition(
        positionRef.current
      );

      /*
      Pause auto-scroll briefly.
      */

      pausedRef.current = true;

      lastTimeRef.current = null;

      if (wheelTimerRef.current) {
        clearTimeout(
          wheelTimerRef.current
        );
      }

      wheelTimerRef.current =
        setTimeout(() => {
          pausedRef.current = false;

          lastTimeRef.current =
            performance.now();
        }, 350);
    };

    wrapper.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    );

    return () => {
      wrapper.removeEventListener(
        "wheel",
        handleWheel
      );

      if (wheelTimerRef.current) {
        clearTimeout(
          wheelTimerRef.current
        );
      }
    };
  }, [items]);

  /*
  =========================================================
  AUTO SCROLL
  =========================================================
  */

  useEffect(() => {
    const track = trackRef.current;

    if (
      !track ||
      items.length === 0
    ) {
      return;
    }

    const animate = (time: number) => {
      if (
        lastTimeRef.current === null
      ) {
        lastTimeRef.current = time;
      }

      const delta =
        time -
        lastTimeRef.current;

      lastTimeRef.current = time;

      /*
      RIGHT -> LEFT
      */

      if (!pausedRef.current) {
        positionRef.current -=
          speed *
          (delta / 16.67);

        const loopWidth =
          getLoopWidth();

        if (loopWidth > 0) {
          positionRef.current =
            normalizePosition(
              positionRef.current,
              loopWidth
            );

          applyPosition(
            positionRef.current
          );
        }
      }

      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };

    animationRef.current =
      requestAnimationFrame(
        animate
      );

    /*
    =======================================================
    RESIZE
    =======================================================
    */

    const handleResize = () => {
      lastTimeRef.current = null;
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    /*
    =======================================================
    CLEANUP
    =======================================================
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
  =========================================================
  DUPLICATE ITEMS
  =========================================================
  */

  const carouselItems =
    Array.from(
      {
        length: repeatCount,
      },
      () => items
    ).flat();

  /*
  =========================================================
  RENDER
  =========================================================
  */

  return (
    <div
      ref={wrapperRef}
      className="
        relative
        w-full
        overflow-hidden
      "
    >
      {/* LEFT FADE */}

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

      {/* TRACK */}

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

      {/* RIGHT FADE */}

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