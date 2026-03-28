import type { Metadata } from "next";
import DarjeelingPage from "@/sections/Destinations/DarjeelingPage";

export const metadata: Metadata = {
  title: "Darjeeling – Queen of the Hills | imagicaholidays",
  description:
    "Explore Darjeeling, the Queen of the Hills. Discover Tiger Hill sunrise, Toy Train, tea gardens, and curated tour packages starting from ₹5,200.",
};

export default function Page() {
  return <DarjeelingPage />;
}
