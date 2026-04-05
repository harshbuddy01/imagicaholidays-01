import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"], // Standard safety disallows
    },
    sitemap: "https://imagicaholidays.com/sitemap.xml",
  };
}

