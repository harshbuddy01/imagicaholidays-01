import type { Metadata } from "next";
import PellingPage from "@/sections/Destinations/PellingPage";

export const metadata: Metadata = {
  title: "Pelling – Whispers of Kanchenjunga | imagicaholidays",
  description:
    "Explore Pelling in West Sikkim. Breathtaking views of Mount Kanchenjunga, ancient monasteries, majestic waterfalls, and the famous glass skywalk.",
};

export default function Page() {
  return <PellingPage />;
}
