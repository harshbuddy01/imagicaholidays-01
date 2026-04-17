import type { Metadata } from "next";
import UdaipurPage from "@/sections/Destinations/UdaipurPage";

export const metadata: Metadata = {
    title: "Udaipur Tour Packages & Romantic Holidays | Best Time to Visit City of Lakes",
    description:
        "Experience the romance of Udaipur with premium tour packages. From Lake Pichola boat rides to the majestic City Palace. Book your luxury Udaipur holiday today.",
    keywords: ["Udaipur Tour Packages", "Udaipur Holidays", "Best time to visit Udaipur", "Udaipur itinerary", "Luxury lakeside resorts", "Venice of the East", "Lake Pichola"],
    openGraph: {
        title: "Udaipur Tour Packages & Romantic Holidays",
        description: "Experience the Venice of the East. Discover handcrafted Udaipur itineraries, beautiful lakes, and royal palaces.",
        url: "https://imagicaholidays.com/destinations/udaipur",
        type: "website",
    },
    alternates: {
        canonical: "https://imagicaholidays.com/destinations/udaipur",
    },
};

export default function Page() {
    return <UdaipurPage />;
}
