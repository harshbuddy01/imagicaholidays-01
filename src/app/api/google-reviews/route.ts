import { NextResponse } from "next/server";

/**
 * GET /api/google-reviews
 *
 * Server-side proxy to Google Places API (New) — keeps API key hidden from the browser.
 * Returns up to 5 reviews for the configured Place ID.
 *
 * Required env vars (in .env.local):
 *   GOOGLE_PLACES_API_KEY   — Google Cloud API key with Places API enabled
 *   GOOGLE_PLACE_ID         — e.g. ChIJ...  (find yours at https://developers.google.com/maps/documentation/places/web-service/place-id)
 */

export const runtime = "edge";
export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { success: false, error: "Google Places API not configured" },
      { status: 503 }
    );
  }

  try {
    // Google Places API (New) — place details
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,photos&language=en&reviews_sort=newest&key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // 1 hour cache at CDN edge
    });

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Google Places status: ${data.status} — ${data.error_message || ""}`);
    }

    const result = data.result;

    // Map reviews to a clean structure
    const reviews = (result.reviews || []).map((r: any) => ({
      author: r.author_name,
      avatar: r.profile_photo_url,
      rating: r.rating,
      text: r.text,
      time: r.time * 1000, // convert to milliseconds
      relativeTime: r.relative_time_description,
      googleUrl: r.author_url,
    }));

    return NextResponse.json({
      success: true,
      place: {
        name: result.name,
        rating: result.rating,
        totalReviews: result.user_ratings_total,
      },
      reviews,
    });
  } catch (error: any) {
    console.error("[google-reviews] Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
