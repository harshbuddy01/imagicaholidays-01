import type { Metadata } from "next";
import GoaPage from "@/sections/Destinations/GoaPage";

export const metadata: Metadata = {
    title: "Goa Tour Packages & Luxury Holidays | Best Time to Visit Goa",
    description:
        "Explore the tropical paradise of Goa with premium tour packages. From sun-kissed beaches to Portuguese heritage and vibrant nightlife. Book your luxury Goa holiday today.",
    keywords: ["Goa Tour Packages", "Goa Holidays", "Best time to visit Goa", "Goa itinerary", "Luxury resorts in Goa", "North Goa tours", "South Goa serenity"],
    openGraph: {
        title: "Goa Tour Packages & Luxury Holidays",
        description: "Experience the Pearl of the Orient. Discover handcrafted Goa itineraries, pristine beaches, and cultural heritage.",
        url: "https://imagicaholidays.com/destinations/goa",
        type: "website",
    },
    alternates: {
        canonical: "https://imagicaholidays.com/destinations/goa",
    },
};

export default function Page() {
    return <GoaPage />;
}
