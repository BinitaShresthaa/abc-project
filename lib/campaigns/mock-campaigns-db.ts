import type { Campaign, Donation, CampaignHighlight } from "./types";

export const mockCampaigns: Campaign[] = [
  { id: "campaign-1", slug: "science-lab-modernization", image: "/campaigns/science.jpg", status: "ACTIVE", faculty: "ABC Science Club", title: "Science Lab Modernization", description: "Upgrading our biology and chemistry laboratories with modern equipment and improved learning facilities.", detailedDescription: "The Science Lab Modernization campaign aims to improve the learning environment for students studying science.", whyMatters: "Modern laboratory facilities allow students to gain practical experience and develop skills required for future scientific careers.", createdAt: "2026-01-10T00:00:00.000Z" },
  { id: "campaign-2", slug: "merit-scholarship-fund-2026", image: "/campaigns/merit-scholarship.jpg", status: "ACTIVE", faculty: "ABC BBA Cloud", title: "Merit Scholarship Fund 2026", description: "Supporting talented students from financially disadvantaged backgrounds by helping cover their educational expenses.", whyMatters: "Supporting deserving students makes quality education more accessible.", createdAt: "2026-01-08T00:00:00.000Z" },
  { id: "campaign-3", slug: "campus-sports-complex", image: "/campaigns/sports.jpg", status: "ACTIVE", faculty: "ABC Cricket", title: "Campus Sports Complex", description: "Building a multipurpose sports facility to encourage physical activity, teamwork and student well-being.", createdAt: "2026-01-05T00:00:00.000Z" },
  { id: "campaign-4", slug: "library-digitization-phase-2", image: "/campaigns/library.jpg", status: "UPCOMING", faculty: "ABC Readers", title: "Library Digitization — Phase 2", description: "Expanding our digital archive with academic resources, manuscripts and regional research collections.",  launchDate: "2026-09-16", createdAt: "2026-01-03T00:00:00.000Z" },
  { id: "campaign-5", slug: "smart-learning-environment", image: "/campaigns/smart.jpg", status: "UPCOMING", faculty: "ABIT", title: "Smart Learning Environment", description: "Expanding smart learning facilities to create a more interactive and technology-friendly classroom environment.", launchDate: "2026-10-16", createdAt: "2026-01-02T00:00:00.000Z" },
  { id: "campaign-6", slug: "campus-development-initiative", image: "/campaigns/campaign.jpg", status: "UPCOMING", faculty: "Student Management", title: "Campus Development Initiative", description: "Supporting future campus improvements and creating a better environment for students and faculty.", launchDate: "2027-04-14", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "campaign-7", slug: "smart-classroom-upgrade", image: "/campaigns/smart.jpg", status: "COMPLETED", faculty: "ABC Math Circle", title: "Smart Classroom Upgrade", description: "Successfully installed interactive smart boards and projectors across the campus.", createdAt: "2025-11-20T00:00:00.000Z" },
  { id: "campaign-8", slug: "digital-library-expansion", image: "/campaigns/library.jpg", status: "COMPLETED", faculty: "ABC Readers", title: "Digital Library Expansion", description: "Expanded access to digital subscriptions, journals and academic research materials.", createdAt: "2025-11-10T00:00:00.000Z" },
  { id: "campaign-9", slug: "sports-development-program", image: "/campaigns/sports.jpg", status: "COMPLETED", faculty: "ABC Cricket", title: "Sports Development Program", description: "Successfully supported student participation in sports and extracurricular activities.", createdAt: "2025-11-01T00:00:00.000Z" },
];

export const mockDonations: Donation[] = [];

// Demo highlight data — same source both dashboard and public page read from.
// campaign-1 and campaign-2 are pre-highlighted with a couple of extra
// photos each, so the story reel / tap-to-advance behavior has something
// real to show right away without you having to click "Highlight" first.
export const mockHighlights: CampaignHighlight[] = [
  {
    id: "highlight-1",
    campaignId: "campaign-1",
    photos: ["/images/h1.png", "/images/h2.jpg"],
    createdAt: "2026-01-15T00:00:00.000Z",
  },
  {
    id: "highlight-2",
    campaignId: "campaign-2",
    photos: ["/images/h3.jpg"],
    createdAt: "2026-01-14T00:00:00.000Z",
  },
];