import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/sections/Hero/HeroSection";
import DestinationsGrid from "@/sections/Destinations/DestinationsGrid";
import DestinationsFooter from "@/sections/Destinations/DestinationsFooter";
import TopHotelsSection from "@/sections/Hotels/TopHotelsSection";
import ActivitiesSection from "@/sections/Activities/ActivitiesSection";
import AttractiveSpotsSection from "@/sections/AttractiveSpots/AttractiveSpotsSection";
import FooterCrescendo from "@/sections/Crescendo/FooterCrescendo";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AttractiveSpotsSection />
      <DestinationsGrid />
      <DestinationsFooter />
      <ActivitiesSection />
      <TopHotelsSection />
      <FooterCrescendo />
      <Footer />
    </main>
  );
}
