import type { Metadata } from "next";
import { redirect } from "next/navigation";
import JourneyDetailsClient from "./JourneyDetailsClient";
import { journeys as fallbackJourneys } from "@/lib/constants";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.imagicaholidays.com/api/v1';

interface Props {
  params: Promise<{ id: string }>;
}

async function getJourneyData(id: string) {
  try {
    // Fetch with next cache validation settings
    const res = await fetch(`${API_BASE}/public/journeys`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      const d = await res.json();
      if (d.success && Array.isArray(d.data)) {
        const found = d.data.find((j: any) => j.id === id);
        if (found) return found;
      }
    }
  } catch (e) {
    console.error("Failed to fetch journey from API, using fallback:", e);
  }
  // Fallback to static constants if not found or API fails
  return fallbackJourneys.find((j: any) => j.id === id) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const journey = await getJourneyData(id);

  if (!journey) {
    return {
      title: "Journey Not Found | Imagica Holidays",
    };
  }

  const title = journey.seoTitle || `${journey.title} | Imagica Holidays`;
  const description = journey.seoDescription || journey.overview || `Experience the beauty of ${journey.departurePort} to ${journey.returnPort} with our premium tour packages.`;
  const keywords = journey.seoKeywords 
    ? journey.seoKeywords.split(',').map((k: string) => k.trim()) 
    : [journey.title, journey.regions, "Luxury Tour Packages", "Imagica Holidays"];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: journey.seoTitle || journey.title,
      description: journey.seoDescription || journey.overview,
      url: `https://imagicaholidays.com/journey/${id}`,
      type: "website",
      images: journey.images && journey.images.length > 0 ? [{ url: journey.images[0] }] : [],
    },
    alternates: {
      canonical: `https://imagicaholidays.com/journey/${id}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const journey = await getJourneyData(id);

  if (!journey) {
    redirect("/journey");
  }

  // Construct JSON-LD Schema on Server Side for rich Google SEO snippet support
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": journey.title,
    "description": journey.overview || journey.seoDescription,
    "offers": {
      "@type": "Offer",
      "price": journey.pricePerGuest.toString(),
      "priceCurrency": "INR"
    },
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": journey.itinerary.map((dayData: any, idx: number) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": dayData.title
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JourneyDetailsClient journey={journey} />
    </>
  );
}
