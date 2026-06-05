import type { Metadata } from "next";
import DestinationsLandingClient from "./DestinationsLandingClient";

export const metadata: Metadata = {
  title: "Premium Holiday & Honeymoon Destinations in India | Imagica Holidays",
  description: "Explore curated travel destinations across India with Imagica Holidays. Handcrafted packages and luxury stays in Gangtok, Sikkim, Darjeeling, Munnar, Wayanad, Goa, Jaipur, Udaipur, and more.",
  keywords: [
    "Holiday Destinations India",
    "Luxury Hotels Sikkim",
    "Jaipur Tour Packages",
    "Munnar Kerala Tourism",
    "Darjeeling Sightseeing",
    "Goa Beach Resorts",
    "Udaipur Palace Tours",
    "Sikkim Travel Planner",
    "Imagica Destinations"
  ],
  alternates: {
    canonical: "https://imagicaholidays.com/destinations",
  },
  openGraph: {
    title: "Premium Travel & Honeymoon Destinations in India",
    description: "Curated itineraries and luxury stays across India's most stunning locations.",
    url: "https://imagicaholidays.com/destinations",
    type: "website",
  }
};

export default function Page() {
  return <DestinationsLandingClient />;
}
