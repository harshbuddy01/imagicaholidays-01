import type { Metadata } from "next";
import GangtokPage from "@/sections/Destinations/GangtokPage";

export const metadata: Metadata = {
  title: "Gangtok Tour Packages & Holidays | Best Time to Visit Sikkim",
  description:
    "Explore the best of Sikkim with premium Gangtok tour packages. From stunning Kanchenjunga viewpoints to spiritual monasteries like Rumtek. Book your luxury Gangtok holiday today starting from ₹10,475.",
  keywords: ["Gangtok Tour Packages", "Sikkim Holidays", "Best time to visit Gangtok", "Gangtok itinerary", "Luxury resorts in Gangtok", "MG Marg hotels", "Himalayan tours"],
  openGraph: {
    title: "Gangtok Tour Packages & Luxury Holidays in Sikkim",
    description: "Experience the vibrant heart of the Himalayas. Discover handcrafted Gangtok itineraries, breathtaking Kanchenjunga viewpoints, and cultural heritage.",
    url: "https://imagicaholidays.com/destinations/gangtok",
    type: "website",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Gangtok Explorer Package",
  description: "A premium luxury tour visiting the capital of Sikkim, featuring monasteries, majestic peaks, and the famous MG Marg.",
  offers: {
    "@type": "Offer",
    price: "10475",
    priceCurrency: "INR"
  },
  itinerary: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "MG Marg Walk" },
      { "@type": "ListItem", position: 2, name: "Rumtek Monastery" },
      { "@type": "ListItem", position: 3, name: "Tsomgo Lake Visit" }
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
      <GangtokPage />
    </>
  );
}
