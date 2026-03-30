import type { Metadata } from "next";
import MunnarPage from "@/sections/Destinations/MunnarPage";

export const metadata: Metadata = {
  title: "Munnar Tour Packages | Kerala Holidays & Tea Estate Retreats",
  description:
    "Explore the emerald tea plantations, tranquil backwaters, and pristine wildlife of Munnar, Kerala. Book bespoke luxury tours and Kerala holidays with Imagica Holidays.",
  keywords: ["Munnar Tour Packages", "Kerala Holidays", "Kerala Tour Operators", "Munnar honeymoon packages", "Tea estate resorts Munnar", "South India tours", "Luxury retreats Kerala"],
  openGraph: {
    title: "Munnar Luxury Tour Packages & Kerala Holidays",
    description: "Experience the tranquility of Kerala's highest estates. Handcrafted itineraries featuring Eravikulam National Park, tea gardens, and premium stays.",
    url: "https://imagicaholidays.com/destinations/munnar",
    type: "website",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Munnar Emerald Estates & Kerala Retreat",
  description: "A luxury holiday in Kerala featuring sprawling tea gardens, exotic wildlife, and unparalleled backwater experiences.",
  offers: {
    "@type": "Offer",
    price: "8500",
    priceCurrency: "INR"
  },
  itinerary: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Eravikulam National Park" },
      { "@type": "ListItem", position: 2, name: "Mattupetty Dam" },
      { "@type": "ListItem", position: 3, name: "Tea Estate Walking Tour" }
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
      <MunnarPage />
    </>
  );
}
