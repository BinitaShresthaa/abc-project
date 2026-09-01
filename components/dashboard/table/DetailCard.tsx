"use client";

import { useEffect, useState, type ReactNode } from "react";
import Avatar from "./Avatar";
import type { DetailCardConfig, DetailSectionIcon } from "./types";

// Reusable across every list type — pass whichever DetailCardConfig<T> matches
// your row shape (see columns/student-columns.tsx for the Student wiring).
//
// This component fills 100% of its parent's height. It's meant to be dropped
// into a fixed/absolute-positioned wrapper that overlaps the list rather than
// squeezing it — see StudentListView.tsx.
//
// `onPrev` / `onNext` are optional: pass them to enable classmate navigation.
// When present, a small round "<" / ">" button floats on the left/right edge
// of the card — click it to jump to the previous/next classmate. Each click
// slides the new profile in from the direction you clicked (next slides in
// from the right, prev from the left), so a single click is unmistakably
// visible even if you're not watching closely. Omit either prop (e.g.
// because you're already at the first/last classmate) and that side's
// button simply doesn't render. Omit both and the card has no navigation at
// all, just the profile.
//
// IMPORTANT — scope: the caller decides who counts as a "classmate" by
// what it passes into onPrev/onNext (see lib/mock-students.ts's
// getClassmates helper, used by StudentListView.tsx / LeftStudentListView.tsx
// / PassoutStudentListView.tsx). getClassmates already filters to the exact
// same faculty + batch + year/semester as the student being viewed, so these
// buttons only ever move within that one class — they never cross into a
// different faculty, batch, or semester. This component itself has no
// faculty/batch logic; it just calls whatever onPrev/onNext it's given.
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
  // Tracks which direction the last navigation was, purely so the entrance
  // animation below can slide from the matching side — this is what makes
  // every single click visibly, directionally obvious instead of an
  // ambiguous instant swap.
  const [direction, setDirection] = useState<"prev" | "next">("next");

  function handlePrevClick() {
    setDirection("prev");
    onPrev?.();
  }

  function handleNextClick() {
    setDirection("next");
    onNext?.();
  }

  // Keyboard support: Left/Right arrow keys also step through classmates,
  // in addition to clicking the < / > buttons. Scoped to the whole window
  // rather than just the card, since the card itself has no natural focus
  // target to attach a local key handler to — but we skip handling the key
  // entirely whenever focus is inside a text input, textarea, or any
  // contentEditable element elsewhere on the page (e.g. the search box),
  // so this never hijacks normal typing/cursor-movement there. This effect
  // is intentionally allowed to re-attach on every onPrev/onNext change
  // (unlike the old wheel handler) since keydown handling has no
  // accumulated state that a teardown could lose mid-gesture.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isTypingContext =
        !!target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (isTypingContext) return;

      if (e.key === "ArrowLeft" && onPrev) {
        e.preventDefault();
        handlePrevClick();
      } else if (e.key === "ArrowRight" && onNext) {
        e.preventDefault();
        handleNextClick();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);

  return (
    // Outer wrapper: relative for positioning context, but deliberately NO
    // overflow-hidden here — that's what lets the < / > buttons below sit
    // fully outside the card's rounded edge without being clipped in half.
    <div className="relative h-full">
      {/* inner shell: this is where overflow-hidden actually belongs, since
          it's what keeps the header/body content clipped to the rounded
          corners. */}
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        {/* header bar — stays fixed while the body below scrolls */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-700 dark:text-slate-100">{title}</h3>
            {positionLabel && (
              <p className="mt-0.5 truncate text-xs text-slate-400 dark:text-slate-500">{positionLabel}</p>
            )}
          </div>
          {onClose && (
            <button
              type="button"
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

        {/* body — plain normal scrolling, no wheel interception. Navigation
            happens purely through the < / > buttons below. overflow-hidden
            here (not overflow-y-auto alone) so the slide-in animation
            doesn't briefly show a horizontal scrollbar as content translates
            in. Extra horizontal padding (px-12 instead of px-5) is reserved
            on both sides whenever nav buttons are showing, so wrapped text
            (like a long email address) never reaches under the button —
            this holds regardless of how wide the card itself is. */}
        <div
          className={`styled-scrollbar flex-1 overflow-hidden overflow-y-auto py-5 ${
            onPrev || onNext ? "px-12" : "px-5"
          }`}
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
              // Keying by a stable per-row identity forces React to remount
              // this subtree on every classmate change, which replays the
              // slide-in animation below every single time — that's what
              // guarantees each click is visibly, individually noticeable.
              key={config.getId?.(row) ?? config.getName(row)}
              row={row}
              config={config}
              direction={direction}
            />
          )}
        </div>
      </div>

      {/* Previous-classmate button — sits INSIDE the card near the left
          edge, vertically centered. The body above reserves extra padding
          (px-12) whenever this button is shown, so it never overlaps
          wrapped text like a long email address. Positioned relative to the
          outer (non-clipping) wrapper so it isn't affected by the inner
          shell's overflow-hidden either way. Only rendered when onPrev is
          actually provided (i.e. not already at the first classmate in the
          class). type="button" guards against any accidental implicit
          form-submit behavior if this ever ends up nested inside a <form>
          upstream. */}
      {onPrev && (
        <button
          type="button"
          onClick={handlePrevClick}
          aria-label="Previous classmate"
          title="Previous classmate"
          className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-500 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-700 active:scale-90 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Next-classmate button — mirrors the previous button on the right
          edge, also inside the card now. Only rendered when onNext is
          provided (not at the last classmate). */}
      {onNext && (
        <button
          type="button"
          onClick={handleNextClick}
          aria-label="Next classmate"
          title="Next classmate"
          className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-500 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-700 active:scale-90 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Keyframes for the directional classmate-switch entrance animation
          used above. Injected inline so this component has no extra
          CSS-file dependency. */}
      <style>{`
        @keyframes detailCardSlideFromRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes detailCardSlideFromLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function DetailCardBody<T>({
  row,
  config,
  direction,
}: {
  row: T;
  config: DetailCardConfig<T>;
  direction: "prev" | "next";
}) {
  const name = config.getName(row);
  const photo = config.getPhoto?.(row);
  const id = config.getId?.(row);
  const badges = config.getBadges?.(row) ?? [];
  const sections = config.getSections?.(row) ?? [];

  return (
    <div
      style={{
        animation: `${direction === "next" ? "detailCardSlideFromRight" : "detailCardSlideFromLeft"} 220ms ease-out`,
      }}
    >
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
                type="button"
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
    </div>
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