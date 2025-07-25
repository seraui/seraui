import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/tools/react-code-runner", "/standalone/"],
    },
    sitemap: "https://seraui.seraprogrammer.com/sitemap.xml",
  };
}
