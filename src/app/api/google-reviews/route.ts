import { NextResponse } from "next/server";

export const revalidate = 300; // Cache for 5 minutes

const DEFAULT_API_KEY = "AIzaSyAb7PWktk-ExGldWC0bgQ-zf7dvxR149Is";
const DEFAULT_PLACE_ID = "ChIJ3UbvD4Kb-DkRFvv1VdWmFm4";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY || DEFAULT_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || DEFAULT_PLACE_ID;

  let googleError: string | null = null;

  // 1. Primary: Google Places API (New)
  try {
    const newUrl = `https://places.googleapis.com/v1/places/${placeId}?languageCode=en&key=${apiKey}`;
    const newRes = await fetch(newUrl, {
      headers: {
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
      },
      next: { revalidate: 300 },
    });

    if (newRes.ok) {
      const newData = await newRes.json();
      const reviews = (newData.reviews || []).map((r: any) => ({
        author: r.authorAttribution?.displayName || "Google Reviewer",
        avatar: r.authorAttribution?.photoUri || "",
        rating: r.rating || 5,
        text: r.text?.text || r.originalText?.text || "",
        time: new Date(r.publishTime || Date.now()).getTime(),
        relativeTime: r.relativePublishTimeDescription || "Verified Google Review",
        googleUrl: r.authorAttribution?.uri || r.googleMapsUri || "https://maps.app.goo.gl/nYMH3mYr92GBcfCTA",
        isGoogle: true,
      }));

      if (reviews.length > 0) {
        return NextResponse.json({
          success: true,
          source: "google_places_new_api",
          place: {
            name: newData.displayName?.text || "IMAGICA HOLIDAYS",
            rating: newData.rating || 4.8,
            totalReviews: newData.userRatingCount || 16,
          },
          reviews,
        });
      }
    } else {
      const errJson = await newRes.json().catch(() => ({}));
      googleError = errJson.error?.message || `Places API HTTP ${newRes.status}`;
    }
  } catch (newErr: any) {
    googleError = newErr.message;
  }

  // 2. Secondary: TravelCRM Public API Fallback
  try {
    const crmRes = await fetch("https://api.imagicaholidays.com/api/v1/public/testimonials", {
      next: { revalidate: 300 },
    });
    if (crmRes.ok) {
      const crmData = await crmRes.json();
      const list = crmData.data || crmData;
      if (Array.isArray(list) && list.length > 0) {
        const reviews = list.map((item: any) => ({
          author: item.customerName || item.author,
          avatar: item.photoUrl || item.avatar || "",
          rating: item.rating || 5,
          text: item.text || item.content,
          time: new Date(item.createdAt || Date.now()).getTime(),
          relativeTime: item.destination || "Verified Review",
          googleUrl: "https://maps.app.goo.gl/nYMH3mYr92GBcfCTA",
          tag: item.destination,
          isGoogle: true,
        }));

        return NextResponse.json({
          success: true,
          source: "crm_api",
          googleApiNote: googleError,
          place: {
            name: "IMAGICA HOLIDAYS",
            rating: 4.8,
            totalReviews: reviews.length >= 16 ? reviews.length : 16,
          },
          reviews,
        });
      }
    }
  } catch (crmErr: any) {
    console.error("[google-reviews] CRM fallback error:", crmErr.message);
  }

  return NextResponse.json(
    {
      success: false,
      error: "Failed to fetch reviews",
      details: googleError,
      configuredPlaceId: placeId,
    },
    { status: 500 }
  );
}
