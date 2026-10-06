import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const privateRoutes = ["/api/", "/account", "/checkout", "/order-success"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privateRoutes,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: privateRoutes,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
