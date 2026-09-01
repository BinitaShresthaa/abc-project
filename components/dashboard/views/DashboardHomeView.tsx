"use client";

import { useEffect, useState } from "react";
import { mockStudents } from "@/lib/mock-students";
import { mockContacts } from "@/lib/mock-contacts";
import { mockNotifications, getUnreadCount } from "@/lib/mock-notifications";
import type { FeedbackNotification } from "@/lib/mock-notifications";
import type { Campaign } from "@/lib/campaigns/types";
import type { DashboardViewProps } from "@/lib/view-types";
import { useDashboardUser } from "@/lib/dashboard-user-context";
import NavIcon from "@/components/dashboard/icons";
import FeedbackDetailModal from "@/components/dashboard/FeedbackDetailModal";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
function TimeAgo({ iso }: { iso: string }) {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    setText(timeAgo(iso));
  }, [iso]);

  // Empty on the very first client render (matches server output exactly,
  // since the server never renders a time-dependent string at all) — then
  // fills in right after mount, avoiding any server/client mismatch.
  return <span className="ml-auto shrink-0 text-[11px] text-slate-400">{text}</span>;
}

function StatCard({
  icon,
  label,
  value,
  onClick,
}: {
  icon: "users" | "megaphone" | "userCheck" | "bell";
  label: string;
  value: number;
  onClick?: () => void;
}) {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left dark:border-slate-800 dark:bg-slate-900 ${
        onClick ? "transition-colors hover:border-primary/40 hover:bg-primary/5" : ""
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <NavIcon name={icon} className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xl font-bold text-slate-800 dark:text-white">{value}</div>
        <div className="truncate text-xs text-slate-500 dark:text-slate-400">{label}</div>
      </div>
    </Wrapper>
  );
}

export default function DashboardHomeView({ onNavigate }: Partial<DashboardViewProps>) {
  const user = useDashboardUser();
  const isContactPerson = user?.role.name === "contact_person";

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [viewing, setViewing] = useState<FeedbackNotification | null>(null);

  useEffect(() => {
    fetch("/api/campaigns")
      .then((r) => r.json())
      .then((all: Campaign[]) => setCampaigns(all.filter((c) => c.status === "ACTIVE")))
      .finally(() => setLoadingCampaigns(false));
  }, []);

  // Contact Person sees only students in their own assigned faculty.
  const visibleStudents = isContactPerson
    ? mockStudents.filter((s) => s.status === "active" && s.faculty === user?.assignedFaculty)
    : mockStudents.filter((s) => s.status === "active");

  const unreadCount = getUnreadCount();
  const recentNotifications = mockNotifications.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${isContactPerson ? "lg:grid-cols-2" : "lg:grid-cols-4"}`}>
        <StatCard icon="users" label={isContactPerson ? "Students in Your Faculty" : "Active Students"} value={visibleStudents.length} onClick={() => onNavigate?.("student-list")} />
        <StatCard icon="megaphone" label="Active Campaigns" value={campaigns.length} onClick={() => onNavigate?.("campaign-list")} />
        {!isContactPerson && (
          <>
            <StatCard icon="userCheck" label="Contact Persons" value={mockContacts.length} onClick={() => onNavigate?.("contact-list")} />
            <StatCard icon="bell" label="Unread Notifications" value={unreadCount} onClick={() => onNavigate?.("notification")} />
          </>
        )}
      </div>

      <div className={`grid grid-cols-1 gap-6 ${isContactPerson ? "" : "lg:grid-cols-3"}`}>
        {/* Active campaigns preview */}
        <div className={`rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 ${isContactPerson ? "" : "lg:col-span-2"}`}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Active Campaigns</h3>
            <button
              onClick={() => onNavigate?.("campaign-list")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              View all
            </button>
          </div>

          {loadingCampaigns ? (
            <p className="text-sm text-slate-400">Loading...</p>
          ) : campaigns.length === 0 ? (
            <p className="text-sm text-slate-400">No active campaigns right now.</p>
          ) : (
            <div className="space-y-3">
              {campaigns.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 dark:border-slate-800"
                >
                  <img src={c.image} alt={c.title} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">{c.title}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{c.faculty}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
                    Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent feedback / notifications — hidden from Contact Person */}
        {!isContactPerson && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Recent Feedback</h3>
              <button
                onClick={() => onNavigate?.("notification")}
                className="text-xs font-semibold text-primary hover:underline"
              >
                View all
              </button>
            </div>

            {recentNotifications.length === 0 ? (
              <p className="text-sm text-slate-400">No notifications yet.</p>
            ) : (
              <div className="space-y-1">
                {recentNotifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setViewing(n)}
                    className={`block w-full rounded-lg px-2 py-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                      !n.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                      <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{n.email}</span>
<TimeAgo iso={n.createdAt} />
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{n.message}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {!isContactPerson && <FeedbackDetailModal notification={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
}