import type { Metadata } from "next";
import WayanadPage from "@/sections/Destinations/WayanadPage";

export const metadata: Metadata = {
  title: "Wayanad Destination Guide | imagicaholidays",
  description:
    "Explore the lush green mountains, mystic caves, and sprawling spice plantations of Wayanad, Kerala with imagicaholidays' bespoke tours.",
};

export default function Page() {
  return <WayanadPage />;
}
