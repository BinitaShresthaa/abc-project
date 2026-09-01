"use client";

import { JSX, useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  /** Which way the element travels in from as it becomes visible. */
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Comp = Tag as any;

  const hidden =
    direction === "left"
      ? "-translate-x-16 opacity-0"
      : direction === "right"
      ? "translate-x-16 opacity-0"
      : "translate-y-8 opacity-0";
  const shown = direction === "up" ? "translate-y-0 opacity-100" : "translate-x-0 opacity-100";

  return (
    <Comp
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${visible ? shown : hidden} ${className}`}
    >
      {children}
    </Comp>
  );
}
