import type { Metadata } from "next";
import GenericCityPage from "@/sections/Destinations/GenericCityPage";

export const metadata: Metadata = {
  title: "Kolkata Luxury Tours & Holidays | Cultural Tour of Bengal",
  description: "Experience the rich heritage, grand colonial architecture, and unmatched culture of Kolkata with Imagica Holidays. Book your bespoke Kolkata tour package today.",
  keywords: ["Kolkata Tour Packages", "Kolkata Holiday Packages", "Victoria Memorial Kolkata", "Howrah Bridge visit", "Luxury stays in Kolkata"],
  openGraph: {
    title: "Kolkata Luxury Tours & Holidays | Imagica Holidays",
    description: "Experience the rich heritage, grand colonial architecture, and unmatched culture of Kolkata with Imagica Holidays.",
    url: "https://imagicaholidays.com/destinations/kolkata",
    type: "website",
  },
  alternates: {
    canonical: "https://imagicaholidays.com/destinations/kolkata",
  },
};

export default function Page() {
  return <GenericCityPage citySlug="kolkata" />;
}
