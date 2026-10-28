import type { Metadata } from "next";
import FindYourJourneyClient from "@/app/journey/FindYourJourneyClient";
import { journeys as fallbackJourneys } from "@/lib/constants";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.imagicaholidays.com/api/v1';

export const metadata: Metadata = {
  title: "Our Packages | Luxury Tour Packages & Custom Holidays | Imagica Holidays",
  description: "Explore our handcrafted luxury tour packages and custom itineraries. Plan your dream holiday to Sikkim, Gangtok, Darjeeling, Kashmir, Manali, Kerala, Ooty, Rajasthan, and more.",
  keywords: [
    "Our Packages",
    "Luxury Tour Packages",
    "Customized Holiday Packages",
    "Sikkim Gangtok Tour Packages",
    "Darjeeling Luxury Holidays",
    "Kashmir Tour Packages",
    "Manali Holiday Packages",
    "Kerala Backwater Houseboats",
    "Ooty Luxury Resorts",
    "Jaipur Udaipur Rajasthan Tours",
    "India Luxury Travel Operator"
  ],
  alternates: {
    canonical: "https://imagicaholidays.com/packages",
  },
  openGraph: {
    title: "Our Packages | Luxury Tour Packages & Handcrafted Holidays",
    description: "Plan your custom holiday itinerary with Imagica Holidays. Premium hotels, private transfers, and curated local sightseeing.",
    url: "https://imagicaholidays.com/packages",
    type: "website",
  }
};

async function getPackages() {
  try {
    let res = await fetch(`${API_BASE}/public/packages`, {
      next: { revalidate: 30 }
    });
    if (!res.ok) {
      res = await fetch(`${API_BASE}/public/journeys`, {
        next: { revalidate: 30 }
      });
    }
    if (res.ok) {
      const d = await res.json();
      if (d.success && d.data?.length) {
        return d.data;
      }
    }
  } catch (e) {
    console.error("Failed to fetch packages on server, using fallback:", e);
  }
  return fallbackJourneys;
}

export default async function Page() {
  const packages = await getPackages();

  return <FindYourJourneyClient initialJourneys={packages} />;
}
