export interface AlumniProfile {
  id: string;
  name: string;
  batch: string;
  role: string;
  photo: string;
  quote: string;
  href: string;
}

export const alumniProfiles: AlumniProfile[] = [
  {
    id: "alum-1",
    name: "Sushila Gurung",
    batch: "B.Ed. English, 2076",
    role: "Secondary School Teacher, Damauli",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    quote:
      "Aadikavi gave me the confidence to stand in front of a classroom and lead.",
    href: "/almuni/almuni-login",
  },
  {
    id: "alum-2",
    name: "Bikram Thapa",
    batch: "B.B.S, 2074",
    role: "Founder, Tanahun AgriTech",
    photo:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop",
    quote:
      "The entrepreneurship culture on campus is where my first business idea took shape.",
    href: "/almuni/almuni-login",
  },
  {
    id: "alum-3",
    name: "Anjali Poudel",
    batch: "B.A, 2077",
    role: "Journalist, Kantipur",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
    quote:
      "My professors pushed me to ask harder questions — that habit built my career.",
    href: "/almuni/almuni-login",
  },
  {
    id: "alum-4",
    name: "Rajan Bhandari",
    batch: "BBA, 2075",
    role: "Branch Manager, Global IME Bank",
    photo:
      "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=800&auto=format&fit=crop",
    quote:
      "The campus community still feels like home every time I visit Damauli.",
    href: "/almuni/almuni-login",
  },
  {
    id: "alum-5",
    name: "Kabita Shrestha",
    batch: "M.Ed., 2073",
    role: "Education Officer, Tanahun",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    quote:
      "I came back to teach here because this campus shaped who I became.",
    href: "/almuni/almuni-login",
  },
];
