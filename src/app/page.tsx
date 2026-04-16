import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/sections/Hero/HeroSection";
import ResortJourneySection from "@/sections/Journey/ResortJourneySection";
import TopHotelsSection from "@/sections/Hotels/TopHotelsSection";
import HotelSelectionSection from "@/sections/Hotels/HotelSelectionSection";
import DestinationsCarousel from "@/sections/Destinations/DestinationsCarousel";
import DestinationsFooter from "@/sections/Destinations/DestinationsFooter";
import ActivitiesSection from "@/sections/Activities/ActivitiesSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ResortJourneySection />
      <DestinationsCarousel />
      <DestinationsFooter />
      <TopHotelsSection />
      <HotelSelectionSection />
      <ActivitiesSection />
      <Footer />
    </main>
  );
}
