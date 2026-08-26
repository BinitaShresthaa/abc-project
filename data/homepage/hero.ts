export interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "h1",
    image:
      "/images/h1.png",
    alt: "Award ceremony for institutional accreditation at Aadikavi Bhanubhakta Campus",
    eyebrow: "Alumni",
    title: "Empowering Our Alumni Community",
    subtitle:
      "Connecting graduates beyond the classroom by fostering lifelong relationships, celebrating achievements, and creating opportunities to engage with Aadikavi Bhanubhakta Campus.",
  },
  {
    id: "h2",
    image:
      "/images/h2.jpg",
    alt: "Students and staff gathered on campus grounds",
    eyebrow: "SIS",
    title: "Student Information System",
    subtitle:
      "A centralized digital platform for managing student records, academic information, attendance, and essential campus services with accuracy, efficiency, and easy access.",
  },
  {
    id: "h3",
    image:
      "/images/h3.jpg",
    alt: "Cultural programme performance at the campus",
    eyebrow: "Campaigns",
    title: " Inspiring Change Through Campus Campaigns",
    subtitle:
      "Engaging students, faculty, and the community through meaningful campaigns that promote education, awareness, social responsibility, and positive change.",
  },
];
