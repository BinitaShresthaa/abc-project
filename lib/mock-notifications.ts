export interface FeedbackNotification {
  id: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export const mockNotifications: FeedbackNotification[] = [
  {
    id: "notif-1",
    email: "existing.parent@example.com",
    message: "The library hours could be extended during exam week — a lot of us study late.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: false,
  },
];

// Called by the PUBLIC feedback form (components/contact/FeedbackForm.tsx)
// when someone submits — this is what makes a new notification appear
// in the dashboard bell icon and the Notification page.
export function createFeedbackNotification(email: string, message: string): FeedbackNotification {
  const notif: FeedbackNotification = {
    id: `notif-${Date.now()}`,
    email,
    message,
    createdAt: new Date().toISOString(),
    read: false,
  };
  mockNotifications.unshift(notif); // newest first
  return notif;
}

export function markNotificationRead(id: string) {
  const n = mockNotifications.find((n) => n.id === id);
  if (n) n.read = true;
}

export function markNotificationsRead(ids: string[]) {
  const idSet = new Set(ids);
  mockNotifications.forEach((n) => {
    if (idSet.has(n.id)) n.read = true;
  });
}

export function markAllNotificationsRead() {
  mockNotifications.forEach((n) => { n.read = true; });
}

export function getUnreadCount(): number {
  return mockNotifications.filter((n) => !n.read).length;
}