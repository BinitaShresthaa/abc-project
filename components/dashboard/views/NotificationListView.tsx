"use client";

import { useState } from "react";
import {
  mockNotifications,
  markNotificationRead,
  markNotificationsRead,
} from "@/lib/mock-notifications";
import FeedbackDetailModal from "@/components/dashboard/FeedbackDetailModal";
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

export default function NotificationListView() {
  const [, forceRefresh] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [viewing, setViewing] = useState<FeedbackNotification | null>(null);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function openNotification(n: FeedbackNotification) {
    setViewing(n);
    if (!n.read) {
      markNotificationRead(n.id);
      forceRefresh((x) => x + 1);
    }
  }

  function handleMarkSelectedRead() {
    markNotificationsRead(Array.from(selected));
    setSelected(new Set());
    forceRefresh((x) => x + 1);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {mockNotifications.filter((n) => !n.read).length} unread
        </h2>
        {selected.size > 0 && (
          <button
            onClick={handleMarkSelectedRead}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90"
          >
            Mark {selected.size} as read
          </button>
        )}
      </div>

      {mockNotifications.length === 0 ? (
        <div className="p-10 text-center text-sm text-slate-400">No notifications yet.</div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {mockNotifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-3 px-4 py-3.5 transition-colors ${!n.read ? "bg-primary/5" : ""}`}
            >
              <input
                type="checkbox"
                checked={selected.has(n.id)}
                onChange={() => toggle(n.id)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 accent-primary"
              />
              <button onClick={() => openNotification(n)} className="min-w-0 flex-1 text-left">
                <div className="flex items-center gap-2">
                  {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                  <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{n.email}</span>
                  <span className="ml-auto shrink-0 text-xs text-slate-400">{timeAgo(n.createdAt)}</span>
                </div>
                <p className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">{n.message}</p>
              </button>
              {!n.read && (
                <button
                  onClick={() => { markNotificationRead(n.id); forceRefresh((x) => x + 1); }}
                  className="shrink-0 text-xs font-medium text-primary hover:underline"
                >
                  Mark read
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <FeedbackDetailModal notification={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}