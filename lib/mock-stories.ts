export interface AlumniStory {
  id: string;
  alumniId: string;
  title: string;
  text: string;
  image?: string;
  postedAt: string; // display string for now, e.g. "2 days ago"
}

export const mockStories: AlumniStory[] = [
  {
    id: "story-1",
    alumniId: "1",
    title: "My First Software Engineering Job!",
    text:
      "Landed my first software engineering role at LOC right after graduating from BICTE! It genuinely didn't feel real for the first few weeks. I still remember pulling all-nighters in the college lab trying to get a project working before deadline, and now I get to build things that thousands of people use every day. To anyone still studying — the late nights are worth it, and don't be afraid to ask for help when you're stuck. Grateful for the professors who pushed us to actually understand the fundamentals instead of just copying code.",
    image: "/campaigns/science.jpg",
    postedAt: "2 days ago",
  },
  {
    id: "story-2",
    alumniId: "2",
    title: "Grateful for My BBA Years",
    text:
      "Grateful for everything I learned during my BBA years. Now working as a Bank Officer at NIC Asia and loving the day-to-day problem solving.",
    postedAt: "5 days ago",
  },
  {
    id: "story-3",
    alumniId: "5",
    title: "Just Got Promoted!",
    text: "Small update — just got promoted at Kantipur! Thank you all for the support.",
    image: "/campaigns/library.jpg",
    postedAt: "1 week ago",
  },
];

// Mutates the mock array in place — fine for now with no database.
// When you connect a real DB, this becomes an INSERT/DELETE respectively.
export function addStory(story: AlumniStory) {
  mockStories.unshift(story);
}

export function removeStory(id: string) {
  const index = mockStories.findIndex((s) => s.id === id);
  if (index !== -1) mockStories.splice(index, 1);
}