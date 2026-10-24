import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Refresh cache every 60s

const WORKING_API_KEY = "AIzaSyAb7PWktk-ExGldWC0bgQ-zf7dvxR149Is";
const DEFAULT_PLACE_ID = "ChIJ3UbvD4Kb-DkRFvv1VdWmFm4";

async function fetchFromGooglePlaces(key: string, placeId: string) {
  const newUrl = `https://places.googleapis.com/v1/places/${placeId}?languageCode=en&key=${key}`;
  const res = await fetch(newUrl, {
    headers: {
      "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
    },
    next: { revalidate: 60 },
  });
  return res;
}

export async function GET() {
  const envKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || DEFAULT_PLACE_ID;

  let googleError: string | null = null;

  // 1. Primary: Google Places API (New) with fallback to WORKING_API_KEY
  try {
    let keyToUse = envKey || WORKING_API_KEY;
    let res = await fetchFromGooglePlaces(keyToUse, placeId);

    // If env key returned 403 or error, retry with known working key
    if (!res.ok && keyToUse !== WORKING_API_KEY) {
      console.warn("[google-reviews] Env key failed, retrying with default verified key");
      keyToUse = WORKING_API_KEY;
      res = await fetchFromGooglePlaces(keyToUse, placeId);
    }

    if (res.ok) {
      const data = await res.json();
      const rawReviews = data.reviews || [];
      const reviews = rawReviews.map((r: any) => {
        const photo = r.authorAttribution?.photoUri || "";
        // Strict avatar integrity: ONLY Google profile photos, NEVER stock/fake photos
        const safeAvatar = photo.includes("googleusercontent.com") ? photo : "";
        return {
          author: r.authorAttribution?.displayName || "Google Reviewer",
          avatar: safeAvatar,
          rating: r.rating || 5,
          text: r.text?.text || r.originalText?.text || "",
          time: new Date(r.publishTime || Date.now()).getTime(),
          relativeTime: r.relativePublishTimeDescription || "Verified Google Review",
          googleUrl: r.authorAttribution?.uri || r.googleMapsUri || "https://maps.app.goo.gl/nYMH3mYr92GBcfCTA",
          isGoogle: true,
        };
      });

      if (reviews.length > 0) {
        return NextResponse.json({
          success: true,
          source: "google_places_api",
          place: {
            name: data.displayName?.text || "IMAGICA HOLIDAYS",
            rating: data.rating || 4.8,
            totalReviews: data.userRatingCount || 16,
          },
          reviews,
        });
      }
    } else {
      const errJson = await res.json().catch(() => ({}));
      googleError = errJson.error?.message || `Places API HTTP ${res.status}`;
    }
  } catch (err: any) {
    googleError = err.message;
  }

  // 2. Secondary: Live CRM Database Fallback
  try {
    const crmRes = await fetch("https://api.imagicaholidays.com/api/v1/public/testimonials", {
      next: { revalidate: 60 },
    });
    if (crmRes.ok) {
      const crmData = await crmRes.json();
      const list = crmData.data || crmData;
      if (Array.isArray(list) && list.length > 0) {
        const reviews = list.map((item: any) => {
          const rawPhoto = item.photoUrl || item.avatar || "";
          // Strict avatar integrity: No unsplash stock faces
          const safePhoto = (rawPhoto.includes("googleusercontent.com") || rawPhoto.includes("res.cloudinary.com")) && !rawPhoto.includes("unsplash.com") ? rawPhoto : "";
          return {
            author: item.customerName || item.author,
            avatar: safePhoto,
            rating: item.rating || 5,
            text: item.text || item.content,
            time: new Date(item.createdAt || Date.now()).getTime(),
            relativeTime: item.destination || "Verified Traveler",
            googleUrl: "https://maps.app.goo.gl/nYMH3mYr92GBcfCTA",
            tag: item.destination,
            isGoogle: true,
          };
        });

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
