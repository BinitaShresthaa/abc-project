"use client";

import { useEffect, useRef, useState } from "react";
import {
  mockNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadCount,
} from "@/lib/mock-notifications";
import FeedbackDetailModal from "./FeedbackDetailModal";
import type { FeedbackNotification } from "@/lib/mock-notifications";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [, forceRefresh] = useState(0);
  const [viewing, setViewing] = useState<FeedbackNotification | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = getUnreadCount();
  const recent = mockNotifications.slice(0, 5);

  function openNotification(n: FeedbackNotification) {
    setViewing(n);
    setOpen(false);
    if (!n.read) {
      markNotificationRead(n.id);
      forceRefresh((x) => x + 1);
    }
  }

  function handleMarkAllRead() {
    markAllNotificationsRead();
    forceRefresh((x) => x + 1);
  }

  return (
    <>
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-700">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Notifications {unreadCount > 0 && <span className="text-primary">({unreadCount})</span>}
              </span>
              {unreadCount > 0 && (
                <button onClick={handleMarkAllRead} className="text-xs font-medium text-primary hover:underline">
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto styled-scrollbar">
              {recent.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-slate-400">No notifications yet.</div>
              ) : (
                recent.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => openNotification(n)}
                    className={`block w-full border-b border-slate-50 px-4 py-3 text-left last:border-0 hover:bg-slate-50 dark:border-slate-700/50 dark:hover:bg-slate-700/50 ${
                      !n.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                      <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{n.email}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{n.message}</p>
                    <span className="mt-1 block text-[11px] text-slate-400">{timeAgo(n.createdAt)}</span>
                  </button>
                ))
              )}
            </div>

            <a href="#" onClick={(e) => { e.preventDefault(); setOpen(false); }} className="block border-t border-slate-100 px-4 py-2.5 text-center text-xs font-semibold text-primary hover:underline dark:border-slate-700">
              View all notifications
            </a>
          </div>
        )}
      </div>

      <FeedbackDetailModal notification={viewing} onClose={() => setViewing(null)} />
    </>
  );
}