#!/usr/bin/env node

import { promises as fs } from "fs";
import path from "path";
import { pathToFileURL } from "url";

interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

type MetadataRouteSitemap = SitemapEntry[];

async function generateSitemap() {
  try {
    // Get the project root directory (assuming script is in /scripts/)
    const projectRoot = path.resolve(__dirname, "..");
    const sitemapTsPath = path.join(projectRoot, "sitemap.ts");
    const publicDir = path.join(projectRoot, "public");
    const sitemapXmlPath = path.join(publicDir, "sitemap.xml");

    // Check if sitemap.ts exists
    try {
      await fs.access(sitemapTsPath);
    } catch (error) {
      throw new Error(`sitemap.ts not found at ${sitemapTsPath}`);
    }

    // Dynamic import of the sitemap function
    const sitemapModule = await import(pathToFileURL(sitemapTsPath).href);
    const sitemapFunction = sitemapModule.default;

    if (typeof sitemapFunction !== "function") {
      throw new Error("sitemap.ts must default export a function");
    }

    // Execute the sitemap function
    const sitemapData: MetadataRouteSitemap = await sitemapFunction();

    if (!Array.isArray(sitemapData)) {
      throw new Error("Sitemap function must return an array");
    }

    // Generate XML content
    const xmlContent = generateXmlContent(sitemapData);

    // Ensure public directory exists
    await fs.mkdir(publicDir, { recursive: true });

    // Write the sitemap.xml file
    await fs.writeFile(sitemapXmlPath, xmlContent, "utf8");

    console.log(`✅ Sitemap generated successfully at ${sitemapXmlPath}`);
    console.log(`📊 Generated ${sitemapData.length} URLs`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

function generateXmlContent(sitemapData: MetadataRouteSitemap): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen =
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = "</urlset>";

  const urls = sitemapData
    .map((entry) => {
      let urlXml = "  <url>\n";
      urlXml += `    <loc>${escapeXml(entry.url)}</loc>\n`;

      if (entry.lastModified) {
        const lastMod =
          entry.lastModified instanceof Date
            ? entry.lastModified.toISOString().split("T")[0]
            : entry.lastModified;
        urlXml += `    <lastmod>${lastMod}</lastmod>\n`;
      }

      if (entry.changeFrequency) {
        urlXml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
      }

      if (entry.priority !== undefined) {
        urlXml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
      }

      urlXml += "  </url>";
      return urlXml;
    })
    .join("\n");

  return `${xmlHeader}\n${urlsetOpen}\n${urls}\n${urlsetClose}`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Run the script
generateSitemap();
