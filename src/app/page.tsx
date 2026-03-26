import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/sections/Hero/HeroSection";
import ResortJourneySection from "@/sections/Journey/ResortJourneySection";
import EstateIntroSection from "@/sections/Intro/EstateIntroSection";
import HotelsSection from "@/sections/Hotels/HotelsSection";
import ExperienceSection from "@/sections/Experience/ExperienceSection";
import SectionDivider from "@/components/ui/SectionDivider";
import { pools, dining, spa } from "@/lib/constants";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ResortJourneySection />
      <EstateIntroSection />
      <HotelsSection />

      <div className="content-shell px-5 md:px-8 lg:px-12">
        <SectionDivider />
      </div>

      <ExperienceSection
        id="pools"
        eyebrow="Leisure"
        title="Pools That Feel Like Terraced Landscapes"
        description="A collection of dramatic ocean-edge decks, hidden jungle waters, and family-friendly lagoons that transition from sunlit mornings to golden-hour reflections."
        cards={pools}
      />

      <div className="content-shell px-5 md:px-8 lg:px-12">
        <SectionDivider />
      </div>

      <ExperienceSection
        id="dining"
        eyebrow="Culinary"
        title="Destination Dining Across the Estate"
        description="From open-fire seafood to Japanese theater and elevated sunset lounges, each venue pairs world-class craft with a sense of place."
        cards={dining}
      />

      <div className="content-shell px-5 md:px-8 lg:px-12">
        <SectionDivider />
      </div>

      <ExperienceSection
        id="spa"
        eyebrow="Wellness"
        title="Holistic Spa Journeys by the Sea"
        description="Restore through ocean rituals, thermal pathways, and restorative Balinese practices designed to recalibrate body and mind."
        cards={spa}
      />

      <Footer />
    </main>
  );
}
