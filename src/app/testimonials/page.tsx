import type { Metadata } from "next";
import TestimonialsPage from "@/sections/Testimonials/TestimonialsPage";

export const metadata: Metadata = {
  title: "Happy Travelers – Our Guest Book | imagicaholidays",
  description:
    "Read stories and testimonials from our happy travelers. Discover how imagicaholidays crafts unforgettable, bespoke journeys across the Himalayas.",
};

export default function Page() {
  return <TestimonialsPage />;
}
