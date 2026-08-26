export interface Campaign {
  id: string;
  title: string;
  status: "Ongoing" | "Upcoming" | "Completed";
  date: string;
  description: string;
  image: string;
  href: string;
}

export const campaigns: Campaign[] = [
  {
    id: "camp-1",
    title: "Blood Donation Drive 2083",
    status: "Ongoing",
    date: "Bhadra 2083",
    description:
      "Students and staff coming together with the Nepal Red Cross Society to donate blood and save lives across Tanahun.",
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1200&auto=format&fit=crop",
    href: "/campaigns/blood-donation-2083",
  },
  {
    id: "camp-2",
    title: "Green Campus Plantation Campaign",
    status: "Ongoing",
    date: "Shrawan 2083",
    description:
      "A campus-wide tree plantation initiative aimed at building a greener, more sustainable Aadikavi Bhanubhakta Campus.",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop",
    href: "/campaigns/green-campus",
  },
  {
    id: "camp-3",
    title: "Digital Literacy for Rural Schools",
    status: "Upcoming",
    date: "Ashwin 2083",
    description:
      "Campus volunteers will visit nearby community schools to run basic computer and internet-safety workshops.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    href: "/campaigns/digital-literacy",
  },
  {
    id: "camp-4",
    title: "Entrepreneurship Mentorship Drive",
    status: "Ongoing",
    date: "Ashad 2083",
    description:
      "Following the Aadikavi Entrepreneurship Summit, alumni and industry mentors are now paired with student founders.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    href: "/campaigns/entrepreneurship-mentorship",
  },
  {
    id: "camp-5",
    title: "Clean Damauli Cleanup Campaign",
    status: "Completed",
    date: "Jestha 2083",
    description:
      "Volunteers cleaned up public spaces around Damauli bazaar in partnership with the local municipality.",
    image:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1200&auto=format&fit=crop",
    href: "/campaigns/clean-damauli",
  },
];
