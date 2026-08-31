export interface Statistic {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: "calendar" | "staff" | "students" | "classrooms";
}

export const statistics: Statistic[] = [
  { id: "stat-years", value: 37, suffix: "+", label: "Years of Services", icon: "calendar" },
  { id: "stat-staff", value: 75, suffix: "+", label: "Staffs", icon: "staff" },
  { id: "stat-students", value: 3000, suffix: "+", label: "Students", icon: "students" },
  { id: "stat-classrooms", value: 60, suffix: "+", label: "Classrooms", icon: "classrooms" },
];

export interface AboutPillar {
  id: string;
  title: string;
  description: string;
  icon: "student" | "network" | "campaign";
}

export const aboutPillars: AboutPillar[] = [
  {
    id: "pillar-student",
    title: "Student Information System",
    description: "Academic records, routines and campus updates, always at hand.",
    icon: "student",
  },
  {
    id: "pillar-network",
    title: "Alumni Connection Network",
    description: "Graduates stay in touch, mentor students and give back.",
    icon: "network",
  },
  {
    id: "pillar-campaign",
    title: "Live Campaigns Hub",
    description: "Discover and support the initiatives shaping the campus.",
    icon: "campaign",
  },
];

export const aboutSite = {
  heading: "About This Site",
  title: "One Platform For Students, Alumni & Campaigns",
  image:
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
  paragraph:
    "This website is the digital home of Aadikavi Bhanubhakta Campus, built around three connected pillars. A student information system keeps learners linked to their academic records and campus updates in one place. An alumni connection network helps graduates stay in touch with classmates, mentor current students, and give back to the community they came from. And a live campaigns hub makes it simple to discover and support fundraising initiatives that keep the campus growing.",
};

export const siteInfo = {
  name: "Aadikavi Bhanubhakta Campus",
  address: "Vyas-1, Damauli, Tanahun, Gandaki Province, Nepal",
  shortAddress: "Damauli, Tanahun, Gandaki, Nepal",
  tagline: "Quality Education for Quality Life",
  email: "abcampus@gmail.com",
  phone: "065-590096",
  year: 2026,
};

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: "facebook" | "youtube" | "instagram";
}

export const socialLinks: SocialLink[] = [
  { id: "facebook", label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com", icon: "instagram" },
];
