import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        "/tools/react-code-runner",
        "/standalone/",
        "/feed.xml/",
        "/image-sitemap.xml/",
      ],
    },
    sitemap: "https://seraui.seraprogrammer.com/sitemap.xml",
  };
}
