import type { Metadata } from "next";
import JaipurPage from "@/sections/Destinations/JaipurPage";

export const metadata: Metadata = {
    title: "Jaipur Tour Packages & Royal Holidays | Best Time to Visit Pink City",
    description:
        "Experience royal Rajasthan with premium Jaipur tour packages. From the iconic Hawa Mahal to majestic Amer Fort and City Palace. Book your luxury Jaipur holiday today.",
    keywords: ["Jaipur Tour Packages", "Jaipur Holidays", "Best time to visit Jaipur", "Jaipur itinerary", "Luxury palace stays", "Pink City tours", "Amer Fort"],
    openGraph: {
        title: "Jaipur Tour Packages & Royal Holidays",
        description: "Experience the Pink City of India. Discover handcrafted Jaipur itineraries, majestic forts, and royal heritage.",
        url: "https://imagicaholidays.com/destinations/jaipur",
        type: "website",
    },
    alternates: {
        canonical: "https://imagicaholidays.com/destinations/jaipur",
    },
};

export default function Page() {
    return <JaipurPage />;
}
