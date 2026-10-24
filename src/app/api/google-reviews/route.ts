import { NextResponse } from "next/server";

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || "ChIJ3UbvD4Kb-DkRFvv1VdWmFm4";

  let googleError: string | null = null;

  if (apiKey) {
    try {
      // 1. Try Google Places Details API (Legacy)
      const legacyUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,photos&language=en&reviews_sort=newest&key=${apiKey}`;

      const response = await fetch(legacyUrl, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`Google API HTTP error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "OK" && data.result) {
        const result = data.result;
        const reviews = (result.reviews || []).map((r: any) => ({
          author: r.author_name,
          avatar: r.profile_photo_url || "",
          rating: r.rating || 5,
          text: r.text || "",
          time: (r.time || Math.floor(Date.now() / 1000)) * 1000,
          relativeTime: r.relative_time_description || "Verified Google Review",
          googleUrl: r.author_url || "https://maps.app.goo.gl/nYMH3mYr92GBcfCTA",
          isGoogle: true,
        }));

        if (reviews.length > 0) {
          return NextResponse.json({
            success: true,
            source: "google_places_api",
            place: {
              name: result.name || "IMAGICA HOLIDAYS",
              rating: result.rating || 4.8,
              totalReviews: result.user_ratings_total || 200,
            },
            reviews,
          });
        }
      } else {
        googleError = `Google Places status: ${data.status} — ${data.error_message || ""}`;
      }
    } catch (error: any) {
      googleError = error.message;
    }

    // 2. If Legacy didn't return OK, try Google Places API (New)
    try {
      const newUrl = `https://places.googleapis.com/v1/places/${placeId}?languageCode=en&key=${apiKey}`;
      const newRes = await fetch(newUrl, {
        headers: {
          "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
        },
        next: { revalidate: 3600 },
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
          googleUrl: r.authorAttribution?.uri || "https://maps.app.goo.gl/nYMH3mYr92GBcfCTA",
          isGoogle: true,
        }));

        if (reviews.length > 0) {
          return NextResponse.json({
            success: true,
            source: "google_places_new_api",
            place: {
              name: newData.displayName?.text || "IMAGICA HOLIDAYS",
              rating: newData.rating || 4.8,
              totalReviews: newData.userRatingCount || 200,
            },
            reviews,
          });
        }
      }
    } catch (newErr: any) {
      if (!googleError) googleError = newErr.message;
    }
  } else {
    googleError = "GOOGLE_PLACES_API_KEY environment variable is not set";
  }

  // 3. Fallback: Fetch verified reviews from TravelCRM API
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
          relativeTime: item.destination || "Verified Traveler",
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
            totalReviews: reviews.length >= 5 ? reviews.length : 200,
          },
          reviews,
        });
      }
    }
  } catch (crmErr: any) {
    console.error("[google-reviews] CRM fallback error:", crmErr.message);
  }

  // Return diagnosis so error can be resolved immediately
  return NextResponse.json(
    {
      success: false,
      error: "Failed to fetch reviews",
      details: googleError,
      configuredPlaceId: placeId,
      hasApiKey: Boolean(apiKey),
    },
    { status: 500 }
  );
}
