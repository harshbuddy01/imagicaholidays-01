import type { Metadata } from "next";
import WayanadPage from "@/sections/Destinations/WayanadPage";

export const metadata: Metadata = {
  title: "Wayanad Tour Packages | Kerala Nature & Spice Retreats",
  description:
    "Explore the lush green mountains, mystic caves, and sprawling spice plantations of Wayanad, Kerala. Book bespoke luxury tours and Kerala holidays with Imagica Holidays.",
  keywords: ["Wayanad Tour Packages", "Kerala Holidays", "Kerala nature resorts", "Wayanad honeymoon packages", "Edakkal Caves tour", "South India wildlife tours", "Luxury retreats Kerala"],
  openGraph: {
    title: "Wayanad Luxury Tour Packages & Kerala Holidays",
    description: "Immerse yourself in Kerala's unspoiled nature. Handcrafted itineraries featuring Edakkal Caves, spice plantations, and premium eco-stays.",
    url: "https://imagicaholidays.com/destinations/wayanad",
    type: "website",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Wayanad Nature & Spice Retreat",
  description: "A luxury holiday in Kerala featuring mystic caves, lush mountains, and expansive spice plantations.",
  offers: {
    "@type": "Offer",
    price: "7200",
    priceCurrency: "INR"
  },
  itinerary: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Edakkal Caves" },
      { "@type": "ListItem", position: 2, name: "Banasura Sagar Dam" },
      { "@type": "ListItem", position: 3, name: "Wayanad Wildlife Sanctuary" }
    ]
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WayanadPage />
    </>
  );
}
