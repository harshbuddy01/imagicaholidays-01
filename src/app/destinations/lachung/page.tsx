import type { Metadata } from "next";
import LachungPage from "@/sections/Destinations/LachungPage";

export const metadata: Metadata = {
  title: "Lachung – Valley of Flowers | imagicaholidays",
  description:
    "Explore Lachung, gateway to Yumthang Valley. Discover snow peaks, rhododendrons, Zero Point, and curated tour packages starting from ₹4,500.",
};

export default function Page() {
  return <LachungPage />;
}
