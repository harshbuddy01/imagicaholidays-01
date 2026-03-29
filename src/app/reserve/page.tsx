import React, { Suspense } from "react";
import type { Metadata } from "next";
import ReservationSection from "@/sections/Reservation/ReservationSection";

export const metadata: Metadata = {
  title: "Reserve | imagicaholidays",
  description: "Book your dream Himalayan holiday with imagicaholidays. Fill in your travel details and let us craft a bespoke experience for you.",
};

export default function ReservePage() {
  return (
    <main>
      <Suspense fallback={null}>
        <ReservationSection />
      </Suspense>
    </main>
  );
}
