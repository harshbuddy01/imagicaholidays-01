import type { Metadata } from "next";
import LachungPage from "@/sections/Destinations/LachungPage";

export const metadata: Metadata = {
  title: "Lachung Tour Packages | North Sikkim & Yumthang Valley Holidays",
  description:
    "Explore Lachung, the pristine gateway to Yumthang Valley. Discover snow peaks, blooming rhododendrons, and Zero Point with our handcrafted North Sikkim tour packages.",
  keywords: ["Lachung Tour Packages", "North Sikkim Holidays", "Yumthang Valley Tour", "Zero Point Sikkim", "Luxury stays Lachung", "Sikkim winter holidays", "Himalayan tours"],
  openGraph: {
    title: "Lachung & Yumthang Valley Tour Packages | Sikkim Holidays",
    description: "Experience the magic of North Sikkim. Handcrafted itineraries featuring Yumthang Valley, Zero Point, and premium mountain stays.",
    url: "https://imagicaholidays.com/destinations/lachung",
    type: "website",
  },
  alternates: {
    canonical: "https://imagicaholidays.com/destinations/lachung",
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Lachung & Valley of Flowers Retreat",
  description: "A breathtaking holiday in North Sikkim featuring the vibrant Yumthang Valley and high-altitude adventures at Zero Point.",
  offers: {
    "@type": "Offer",
    price: "4500",
    priceCurrency: "INR"
  },
  itinerary: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Yumthang Valley" },
      { "@type": "ListItem", position: 2, name: "Zero Point (Yumesamdong)" },
      { "@type": "ListItem", position: 3, name: "Lachung Monastery" }
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
      <LachungPage />
    </>
  );
}
