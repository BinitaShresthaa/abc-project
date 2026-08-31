"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Avatar from "./Avatar";
import type { DetailCardConfig, DetailSectionIcon } from "./types";

// Reusable across every list type — pass whichever DetailCardConfig<T> matches
// your row shape (see columns/student-columns.tsx for the Student wiring).
//
// This component fills 100% of its parent's height. It's meant to be dropped
// into a fixed/absolute-positioned wrapper that overlaps the list rather than
// squeezing it — see StudentListView.tsx.
//
// `onPrev` / `onNext` are optional: pass them to enable a scroll-to-browse
// classmate navigator. Scrolling ANYWHERE on the card body (mouse wheel or
// trackpad, up or down) switches to the previous/next classmate — there's
// no separate hit-target to find. A thin decorative bar on the right edge
// just hints "this is browsable"; it isn't required to be under the cursor.
// Omit both props and the card is a plain static profile with no scroll
// interaction at all (falls back to normal content scrolling if the profile
// content is ever taller than the card).
//
// IMPORTANT — scope: the caller decides who counts as a "classmate" by
// what it passes into onPrev/onNext (see lib/mock-students.ts's
// getClassmates helper, used by StudentListView.tsx / LeftStudentListView.tsx
// / PassoutStudentListView.tsx). getClassmates already filters to the exact
// same faculty + batch + year/semester as the student being viewed, so
// scrolling here only ever moves within that one class — it never crosses
// into a different faculty, batch, or semester. This component itself has
// no faculty/batch logic; it just calls whatever onPrev/onNext it's given.
//
// Trade-off: while onPrev/onNext are provided, every scroll gesture on the
// card is captured for navigation, so the profile content itself won't
// natively scroll even if it's taller than the card. In practice the
// content here is short enough that this doesn't come up — if you later add
// enough fields that it does, that's the first thing to revisit.
export default function DetailCard<T>({
  row,
  config,
  title = "Profile",
  onClose,
  onPrev,
  onNext,
  emptyLabel = "Select a row to view details",
  positionLabel,
}: {
  row: T | null | undefined;
  config: DetailCardConfig<T>;
  title?: string;
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  emptyLabel?: string;
  positionLabel?: string;
}) {
  const showNav = onPrev !== undefined || onNext !== undefined;
  const bodyRef = useRef<HTMLDivElement>(null);

  // Keep the latest callbacks in refs. The native wheel listener below reads
  // from these instead of closing over onPrev/onNext directly, so the
  // listener never needs to be torn down and reattached just because the
  // parent re-renders with new function identities (which happens on every
  // render if the parent passes inline arrow functions, e.g.
  // onNext={() => setIndex(i => i + 1)}). This is what lets repeated scroll
  // gestures keep advancing instead of only firing once.
  const onPrevRef = useRef(onPrev);
  const onNextRef = useRef(onNext);
  useEffect(() => {
    onPrevRef.current = onPrev;
    onNextRef.current = onNext;
  });

  useEffect(() => {
    const el = bodyRef.current;
    if (!el || !showNav) return;

    // Accumulates delta across a scroll gesture — a mouse wheel fires one big
    // delta per "click", a trackpad fires many tiny ones per swipe, and
    // Firefox reports "lines" instead of pixels. This normalizes all three
    // into one classmate-step per gesture instead of firing constantly.
    // Attached natively (not via React's onWheel) because React's onWheel
    // is passive by default, which silently ignores preventDefault().
    let accum = 0;
    let locked = false;

    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      if (locked) return;

      const delta = e.deltaMode === 1 ? e.deltaY * 20 : e.deltaY; // deltaMode 1 = "line" mode (Firefox)
      accum += delta;

      const THRESHOLD = 40;
      if (Math.abs(accum) < THRESHOLD) return;

      if (accum > 0) onNextRef.current?.();
      else onPrevRef.current?.();

      accum = 0;
      locked = true;
      window.setTimeout(() => {
        locked = false;
      }, 350);
    }

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
    // Re-run only when nav turns on/off, not on every onPrev/onNext identity
    // change — the refs above handle keeping the callbacks current.
  }, [showNav]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
      {/* header bar — stays fixed while the body below handles scroll */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-100">{title}</h3>
          {positionLabel && (
            <p className="mt-0.5 truncate text-xs text-slate-400 dark:text-slate-500">{positionLabel}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* body: the ENTIRE area below is the scroll-to-browse zone when
          showNav is true — scrolling up or down anywhere in here (not just
          a specific strip) steps to the prev/next classmate. When showNav
          is false, this just scrolls the profile content normally via
          overflow-y-auto. */}
      <div
        ref={bodyRef}
        title={showNav ? "Scroll to browse this class" : undefined}
        aria-label={showNav ? "Scroll to browse classmates in this batch and semester" : undefined}
        className={`styled-scrollbar relative flex-1 overflow-y-auto p-5 ${showNav ? "cursor-ns-resize" : ""}`}
      >
        {!row ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-sm text-slate-400">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-300 dark:text-slate-600">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
            </svg>
            {emptyLabel}
          </div>
        ) : (
          <DetailCardBody
            // Keying by a stable per-row identity forces React to unmount +
            // remount this subtree whenever the classmate changes, which is
            // what makes the entrance animation below replay every time —
            // without a changing key, React would just patch the existing
            // DOM in place and nothing would visibly animate.
            key={config.getId?.(row) ?? config.getName(row)}
            row={row}
            config={config}
          />
        )}

        {/* purely decorative "this is browsable" hint on the right edge —
            not a hit target, pointer-events-none so it never intercepts
            anything; the whole body above already handles the wheel. */}
        {showNav && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-1.5 top-3 bottom-3 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700"
          />
        )}

        {/* Keyframes for the classmate-switch entrance animation above.
            Injected inline so this component has no extra CSS-file
            dependency — safe to duplicate across instances since the
            keyframe name is scoped to this file's intent. */}
        <style>{`
          @keyframes detailCardEnter {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}

function DetailCardBody<T>({ row, config }: { row: T; config: DetailCardConfig<T> }) {
  const name = config.getName(row);
  const photo = config.getPhoto?.(row);
  const id = config.getId?.(row);
  const badges = config.getBadges?.(row) ?? [];
  const sections = config.getSections?.(row) ?? [];

  return (
    <>
      {/* identity row: photo left, badges/name/id stacked right */}
      <div className="flex items-start gap-4">
        <Avatar name={name} photo={photo} size={64} shape="square" />
        <div className="min-w-0 flex-1 pt-0.5">
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b.label}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    b.tone === "neutral"
                      ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {b.label}
                </span>
              ))}
            </div>
          )}
          <div className="mt-2 truncate text-lg font-semibold text-slate-700 dark:text-slate-100">{name}</div>
          {id && (
            <div className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-600 dark:text-slate-300">{config.idLabel ?? "ID"}:</span> {id}
            </div>
          )}
        </div>
      </div>

      {/* boxed sections */}
      {sections.map((section) => (
        <div
          key={section.heading}
          className="mt-5 rounded-xl border border-slate-200 p-4 dark:border-slate-700"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <span className="text-slate-400 dark:text-slate-500">{SECTION_ICONS[section.icon]}</span>
              {section.heading}
            </div>
            {section.actionLabel && (
              <button
                onClick={section.onAction}
                className="shrink-0 text-xs font-medium text-primary hover:underline"
              >
                {section.actionLabel}
              </button>
            )}
          </div>

          {/* min-w-0 on each cell lets the grid track actually shrink below
              its content's intrinsic width (grid items default to
              min-width: auto, which was forcing long, unbreakable text like
              an email address to blow out its column and overlap the next
              one). break-words then lets that long text wrap onto a second
              line instead of overflowing. */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {section.fields.map((f, i) => (
              <div key={i} className={`min-w-0 ${f.fullWidth ? "col-span-2" : ""}`}>
                <div className="text-xs text-slate-400">{f.label}</div>
                <div className="mt-0.5 break-words text-sm text-slate-700 dark:text-slate-200">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

const SECTION_ICONS: Record<DetailSectionIcon, ReactNode> = {
  mail: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
  phone: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  location: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  academic: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m22 10-10-5L2 10l10 5 10-5Z" />
      <path d="M6 12.5V17c0 1 2.5 3 6 3s6-2 6-3v-4.5" />
    </svg>
  ),
  note: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M9 13h6M9 17h6" />
    </svg>
  ),
  id: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h6M7 12h10M7 16h6" />
    </svg>
  ),
};