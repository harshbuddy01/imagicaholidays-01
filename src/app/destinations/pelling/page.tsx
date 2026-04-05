import type { Metadata } from "next";
import PellingPage from "@/sections/Destinations/PellingPage";

export const metadata: Metadata = {
  title: "Pelling Tour Packages | Best Kanchenjunga Views & Sikkim Holidays",
  description:
    "Explore Pelling in West Sikkim. Breathtaking views of Mount Kanchenjunga, ancient monasteries, majestic waterfalls, and the famous Sky Walk. Book your luxury Pelling tour.",
  keywords: ["Pelling Tour Packages", "Sikkim Holidays", "Kanchenjunga view hotels", "West Sikkim tourism", "Pelling Sky Walk", "Himalayan tours", "Luxury retreats Pelling"],
  openGraph: {
    title: "Pelling Luxury Tour Packages & Sikkim Holidays",
    description: "Experience the whispers of Kanchenjunga in Pelling. Handcrafted itineraries featuring Pemayangtse Monastery, Khecheopalri Lake, and premium stays.",
    url: "https://imagicaholidays.com/destinations/pelling",
    type: "website",
  },
  alternates: {
    canonical: "https://imagicaholidays.com/destinations/pelling",
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Pelling Kanchenjunga Retreat",
  description: "A luxury holiday in West Sikkim offering the closest and most breathtaking views of Mt. Kanchenjunga, alongside ancient spiritual sites.",
  offers: {
    "@type": "Offer",
    price: "7500",
    priceCurrency: "INR"
  },
  itinerary: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Pelling Sky Walk & Chenrezig Statue" },
      { "@type": "ListItem", position: 2, name: "Pemayangtse Monastery" },
      { "@type": "ListItem", position: 3, name: "Khecheopalri Lake" }
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
      <PellingPage />
    </>
  );
}
