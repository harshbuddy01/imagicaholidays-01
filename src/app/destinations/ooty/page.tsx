import type { Metadata } from "next";
import GenericCityPage from "@/sections/Destinations/GenericCityPage";

export const metadata: Metadata = {
  title: "Ooty Luxury Honeymoon & Tour Packages | Nilgiri Hill Retreats",
  description: "Escape to the Queen of Hill Stations. Explore Ooty tea gardens, scenic lakes, and ride the UNESCO Toy Train. Book handcrafted Ooty luxury tour packages.",
  keywords: ["Ooty Tour Packages", "Ooty Honeymoon Packages", "Ooty luxury resorts", "Nilgiri Mountain Railway toy train", "Ooty Lake boating"],
  openGraph: {
    title: "Ooty Luxury Honeymoon & Holiday Packages | Nilgiri Retreats",
    description: "Escape to the Queen of Hill Stations. Explore tea gardens, scenic lakes, and ride the UNESCO Toy Train.",
    url: "https://imagicaholidays.com/destinations/ooty",
    type: "website",
  },
  alternates: {
    canonical: "https://imagicaholidays.com/destinations/ooty",
  },
};

export default function Page() {
  return <GenericCityPage citySlug="ooty" />;
}
