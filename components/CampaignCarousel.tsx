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
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Manual drag state (mouse + touch)
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPositionRef = useRef(0);

  const [repeatCount, setRepeatCount] = useState(2);

  const speed = 0.22;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track || items.length === 0) return;

    const computeRepeatCount = () => {
      const firstCard = track.children[0] as HTMLElement | undefined;
      if (!firstCard) return;
      const cardWidth = firstCard.getBoundingClientRect().width;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || "0");
      const setWidth = (cardWidth + gap) * items.length;
      if (setWidth <= 0) return;
      const viewportWidth = wrapper.getBoundingClientRect().width;
      const needed = Math.ceil((viewportWidth * 2) / setWidth) + 1;
      const next = Math.max(2, needed);
      setRepeatCount((prev) => (prev === next ? prev : next));
    };

    computeRepeatCount();
    const resizeObserver = new ResizeObserver(() => computeRepeatCount());
    resizeObserver.observe(wrapper);
    return () => resizeObserver.disconnect();
  }, [items]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || items.length === 0) return;

    const getLoopWidth = () => {
      const firstCard = track.children[0] as HTMLElement;
      if (!firstCard) return 0;
      const cardWidth = firstCard.getBoundingClientRect().width;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || "0");
      return (cardWidth + gap) * items.length;
    };

    const wrapPosition = () => {
      const loopWidth = getLoopWidth();
      if (loopWidth <= 0) return;
      while (positionRef.current <= -loopWidth) positionRef.current += loopWidth;
      while (positionRef.current > 0) positionRef.current -= loopWidth;
    };

    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!pausedRef.current && !isDraggingRef.current) {
        positionRef.current -= speed * (delta / 16.67);
        wrapPosition();
        track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      lastTimeRef.current = null;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [items]);

  function applyPosition() {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.children[0] as HTMLElement | undefined;
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || "0");
    const loopWidth = (cardWidth + gap) * items.length;
    if (loopWidth > 0) {
      while (positionRef.current <= -loopWidth) positionRef.current += loopWidth;
      while (positionRef.current > 0) positionRef.current -= loopWidth;
    }
    // Direct write, no CSS transition class anywhere on this element —
    // so it tracks the pointer/wheel 1:1, not an eased animation.
    track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
  }

  function pauseThenResume() {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
      lastTimeRef.current = performance.now();
    }, 600);
  }

  function handleDragStart(clientX: number) {
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    dragStartXRef.current = clientX;
    dragStartPositionRef.current = positionRef.current;
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }

  function handleDragMove(clientX: number) {
    if (!isDraggingRef.current) return;
    const delta = clientX - dragStartXRef.current;
    if (Math.abs(delta) > 4) dragMovedRef.current = true;
    positionRef.current = dragStartPositionRef.current + delta;
    applyPosition();
  }

  function handleDragEnd() {
    isDraggingRef.current = false;
    pausedRef.current = false;
    lastTimeRef.current = performance.now();
  }

  useEffect(() => {
  const wrapper = wrapperRef.current;
  if (!wrapper) return;

  function onWheel(e: WheelEvent) {
    // Only take over when the gesture is genuinely horizontal
    // (touchpad two-finger swipe). A plain vertical mouse wheel
    // or vertical trackpad scroll should pass through untouched
    // so the page still scrolls normally.
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (!isHorizontal || e.deltaX === 0) return;

    e.preventDefault();
    positionRef.current -= e.deltaX;
    applyPosition();
    pauseThenResume();
  }

  wrapper.addEventListener("wheel", onWheel, { passive: false });
  return () => wrapper.removeEventListener("wheel", onWheel);
}, []);

  const carouselItems = Array.from({ length: repeatCount }, () => items).flat();

  return (
   <div
  ref={wrapperRef}
  className="relative w-full overflow-hidden"
  style={{ overscrollBehaviorX: "contain" }}
  onMouseEnter={() => { pausedRef.current = true; }}
  onMouseLeave={() => {
    if (!isDraggingRef.current) pausedRef.current = false;
    handleDragEnd();
  }}
  onMouseDown={(e) => handleDragStart(e.clientX)}
  onMouseMove={(e) => handleDragMove(e.clientX)}
  onMouseUp={handleDragEnd}
  onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
  onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
  onTouchEnd={handleDragEnd}
>
      <div className={`pointer-events-none absolute left-0 top-0 z-20 h-full w-14 bg-gradient-to-r ${fade === "dark" ? "from-[#062B42]" : "from-[#F5FAFD]"} to-transparent`} />

      <div
        ref={trackRef}
        className="flex w-max cursor-grab items-stretch gap-6 select-none active:cursor-grabbing"
        style={{ transform: "translate3d(0, 0, 0)", willChange: "transform" }}
      >
        {carouselItems.map((item, index) => (
          <div key={`${index}-${String(index)}`} className="flex w-[280px] flex-shrink-0 items-stretch sm:w-[320px] lg:w-[350px]">
            <div className="pointer-events-none flex w-full [&_*]:pointer-events-auto">
              {renderItem(item, index % items.length)}
            </div>
          </div>
        ))}
      </div>

      <div className={`pointer-events-none absolute right-0 top-0 z-20 h-full w-14 bg-gradient-to-l ${fade === "dark" ? "from-[#062B42]" : "from-[#F5FAFD]"} to-transparent`} />
    </div>
  );
}