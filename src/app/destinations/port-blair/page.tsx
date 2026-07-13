import type { Metadata } from "next";
import GenericCityPage from "@/sections/Destinations/GenericCityPage";

export const metadata: Metadata = {
  title: "Andaman Port Blair Luxury Tour Packages | Tropical Island Holidays",
  description: "Explore the tropical paradise of Andaman & Nicobar. Book premium Port Blair tour packages featuring Celluar Jail history, beaches, and coral reefs.",
  keywords: ["Port Blair Tour Packages", "Andaman Holiday Packages", "Port Blair luxury hotels", "Cellular Jail memorial", "Andaman beach resorts"],
  openGraph: {
    title: "Andaman Port Blair Holiday Packages | Imagica Holidays",
    description: "Explore the tropical paradise of Andaman & Nicobar. Book premium Port Blair tour packages featuring Celluar Jail history, beaches, and coral reefs.",
    url: "https://imagicaholidays.com/destinations/port-blair",
    type: "website",
  },
  alternates: {
    canonical: "https://imagicaholidays.com/destinations/port-blair",
  },
};

export default function Page() {
  return <GenericCityPage citySlug="port-blair" />;
}
