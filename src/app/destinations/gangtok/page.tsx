import type { Metadata } from "next";
import GangtokPage from "@/sections/Destinations/GangtokPage";

export const metadata: Metadata = {
  title: "Gangtok – Heart of Sikkim | imagicaholidays",
  description:
    "Explore Gangtok, the vibrant capital of Sikkim. Discover breathtaking Kanchenjunga views, Buddhist monasteries, MG Marg, and curated tour packages starting from ₹10,475.",
};

export default function Page() {
  return <GangtokPage />;
}
