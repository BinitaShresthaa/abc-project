"use client";

import { useEffect, useRef } from "react";

export default function AutoScrollRow<T>({
  items,
  renderItem,
  speed = 44,
  itemClassName = "",
}: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  /** pixels per second at full speed */
  speed?: number;
  itemClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const posRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Render the list twice back-to-back so the loop can reset seamlessly.
  const doubled = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // Slow to a quarter speed under the cursor rather than stopping dead,
      // so the motion still feels alive while being easy to read.
      const currentSpeed = hoverRef.current ? speed * 0.25 : speed;
      posRef.current -= currentSpeed * dt;

      const half = track.scrollWidth / 2;
      if (half > 0 && Math.abs(posRef.current) >= half) {
        posRef.current += half;
      }
      track.style.transform = `translate3d(${posRef.current}px,0,0)`;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, items.length]);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      onFocus={() => (hoverRef.current = true)}
      onBlur={() => (hoverRef.current = false)}
    >
      <div ref={trackRef} className="flex w-max gap-6 will-change-transform">
        {doubled.map((item, i) => (
          <div key={i} className={itemClassName}>
            {renderItem(item, i % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
