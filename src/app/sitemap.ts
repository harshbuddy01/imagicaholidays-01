import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://imagicaholidays.com";
  
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/careers",
    "/faqs",
    "/help-center",
    "/testimonials",
    "/privacy",
    "/terms",
    "/cookies",
    "/reserve",
    "/journey",
    "/destinations",
  ];

  const destinationRoutes = [
    "/destinations/gangtok",
    "/destinations/lachung",
    "/destinations/pelling",
    "/destinations/darjeeling",
    "/destinations/munnar",
    "/destinations/wayanad",
    "/destinations/goa",
    "/destinations/jaipur",
    "/destinations/udaipur",
  ];

  let dynamicRoutes: string[] = [];
  try {
    const res = await fetch("https://api.imagicaholidays.com/api/v1/public/journeys", {
      next: { revalidate: 3600 } // Cache sitemap fetches for 1 hour
    });
    if (res.ok) {
      const d = await res.json();
      if (d.success && Array.isArray(d.data)) {
        dynamicRoutes = d.data.map((j: any) => `/journey/${j.id}`);
      }
    }
  } catch (e) {
    console.error("Sitemap dynamic journeys fetch failed, ignoring:", e);
  }

  const allRoutes = [...staticRoutes, ...destinationRoutes, ...dynamicRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/destinations") ? 0.9 : route.startsWith("/journey/") ? 0.8 : 0.7,
  }));
}
