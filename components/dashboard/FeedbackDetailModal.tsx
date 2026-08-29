"use client";

import type { FeedbackNotification } from "@/lib/mock-notifications";

function getInitials(email: string) {
  return email.slice(0, 2).toUpperCase();
}

export default function FeedbackDetailModal({
  notification,
  onClose,
}: {
  notification: FeedbackNotification | null;
  onClose: () => void;
}) {
  if (!notification) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
      >
        <div className="relative bg-primary px-6 pb-14 pt-6">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">Feedback Submission</span>
        </div>

        <div className="relative -mt-12 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white ring-4 ring-white dark:ring-slate-900">
            {getInitials(notification.email)}
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 text-center">
          <h3 className="text-lg font-bold text-primary">{notification.email}</h3>
          <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {new Date(notification.createdAt).toLocaleString()}
          </span>

          <p className="mt-4 whitespace-pre-wrap text-left text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {notification.message}
          </p>

          <div className="mt-5 flex justify-center border-t border-dashed border-slate-200 pt-4 dark:border-slate-700">
            
              <a href={`mailto:${notification.email}`}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Reply via email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}