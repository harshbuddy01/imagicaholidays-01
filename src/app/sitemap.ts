import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];

  const destinationRoutes = [
    "/destinations/gangtok",
    "/destinations/lachung",
    "/destinations/pelling",
    "/destinations/darjeeling",
    "/destinations/munnar",
    "/destinations/wayanad",
  ];

  const allRoutes = [...staticRoutes, ...destinationRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/destinations") ? 0.9 : 0.7,
  }));
}
