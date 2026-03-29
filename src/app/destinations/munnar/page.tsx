import type { Metadata } from "next";
import MunnarPage from "@/sections/Destinations/MunnarPage";

export const metadata: Metadata = {
  title: "Munnar Destination Guide | imagicaholidays",
  description:
    "Explore the emerald green tea plantations, tranquil backwaters, and pristine wildlife of Munnar, Kerala with imagicaholidays' bespoke tours.",
};

export default function Page() {
  return <MunnarPage />;
}
