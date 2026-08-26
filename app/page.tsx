import HeroSlider from "@/components/homepage/HeroSlider";
import AboutSection from "@/components/homepage/AboutSection";
import AboutCampusSection from "@/components/homepage/AboutCampusSection";
import ProgrammeSection from "@/components/homepage/ProgrammeSection";
import CampaignsSection from "@/components/homepage/CampaignsSection";
import AlumniSection from "@/components/homepage/AlumniSection";
import BackToTop from "@/components/homepage/BackToTop";

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <AboutCampusSection />
      <AboutSection />
      <ProgrammeSection />
      <CampaignsSection />
      <AlumniSection />
      <BackToTop />
    </main>
  );
}
