import type { Metadata } from "next";
import DarjeelingPage from "@/sections/Destinations/DarjeelingPage";

export const metadata: Metadata = {
  title: "Darjeeling Tour Packages | Queen of the Hills Luxury Tours",
  description:
    "Experience Darjeeling like never before. Book luxury tours featuring the iconic Tiger Hill sunrise, heritage Toy Train, and lush tea estates. Packages from ₹5,200.",
  keywords: ["Darjeeling Tour Packages", "Darjeeling Holidays", "Best time to visit Darjeeling", "Darjeeling tea estates", "Luxury stays Darjeeling", "West Bengal tourism", "Himalayan tours"],
  openGraph: {
    title: "Darjeeling Tour Packages & Luxury Holidays",
    description: "Discover the breathtaking Queen of the Hills. Handcrafted itineraries featuring premium tea estates, Tiger Hill sunrises, and heritage stays.",
    url: "https://imagicaholidays.com/destinations/darjeeling",
    type: "website",
  },
  alternates: {
    canonical: "https://imagicaholidays.com/destinations/darjeeling",
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Darjeeling Heritage & Tea Estate Tour",
  description: "A luxury holiday in the Queen of the Hills featuring tea garden tours, the Himalayan Railway, and majestic Kanchenjunga views from Tiger Hill.",
  offers: {
    "@type": "Offer",
    price: "5200",
    priceCurrency: "INR"
  },
  itinerary: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tiger Hill Sunrise" },
      { "@type": "ListItem", position: 2, name: "Darjeeling Himalayan Railway (Toy Train)" },
      { "@type": "ListItem", position: 3, name: "Happy Valley Tea Estate" }
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
      <DarjeelingPage />
    </>
  );
}
