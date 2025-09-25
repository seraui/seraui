import { readdirSync, Stats, statSync } from "fs";
import type { MetadataRoute } from "next";
import path from "path";

const baseUrl = "https://seraui.com"; // Update this with your actual domain

interface RouteInfo {
  route: string;
  filePath: string;
  stats: Stats;
}

export function generateDocsSitemap(): MetadataRoute.Sitemap {
  try {
    const docsDir = path.join(process.cwd(), "src", "app", "docs");
    const routes = scanDocsDirectory(docsDir);

    return routes.map((routeInfo) => ({
      url: `${baseUrl}${routeInfo.route}`,
      lastModified: routeInfo.stats.mtime,
      changeFrequency: "weekly" as const,
      priority: calculatePriority(routeInfo.route),
    }));
  } catch (error) {
    console.error("Error generating docs sitemap:", error);
    return [];
  }
}

function scanDocsDirectory(docsDir: string): RouteInfo[] {
  const routes: RouteInfo[] = [];

  try {
    scanDirectoryRecursive(docsDir, "/docs", routes);
  } catch (error) {
    console.warn(`Docs directory not found at ${docsDir}`);
    return [];
  }

  return routes;
}

function scanDirectoryRecursive(
  currentDir: string,
  currentRoute: string,
  routes: RouteInfo[],
): void {
  try {
    const entries = readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const stats = statSync(fullPath);

      if (entry.isDirectory()) {
        // Handle directory - this becomes a route segment
        const newRoute = `${currentRoute}/${entry.name}`;

        // Check if this directory has a page.tsx, page.ts, or page.js
        const hasPage = hasPageFile(fullPath);
        if (hasPage) {
          routes.push({
            route: newRoute,
            filePath: fullPath,
            stats,
          });
        }

        // Recursively scan subdirectories
        scanDirectoryRecursive(fullPath, newRoute, routes);
      } else if (isPageFile(entry.name)) {
        // Handle page files in the current directory
        // If we're in a directory and find a page file, it represents the current route
        if (currentRoute !== "/docs") {
          // This page file represents the current directory route
          routes.push({
            route: currentRoute,
            filePath: fullPath,
            stats,
          });
        } else {
          // This is the main docs page
          routes.push({
            route: "/docs",
            filePath: fullPath,
            stats,
          });
        }
      }
    }
  } catch (error) {
    // Skip directories that can't be read
    console.warn(`Could not read directory ${currentDir}:`, error);
  }
}

function hasPageFile(dirPath: string): boolean {
  const pageFiles = ["page.tsx", "page.ts", "page.js", "page.jsx", "page.mdx"];

  try {
    const files = readdirSync(dirPath);
    return pageFiles.some((pageFile) => files.includes(pageFile));
  } catch {
    return false;
  }
}

function isPageFile(filename: string): boolean {
  const pageFiles = ["page.tsx", "page.ts", "page.js", "page.jsx", "page.mdx"];
  return pageFiles.includes(filename);
}

function calculatePriority(route: string): number {
  // Calculate priority based on route depth and importance
  const segments = route.split("/").filter(Boolean);
  const depth = segments.length;

  // Root docs page gets highest priority
  if (route === "/docs") {
    return 1.0;
  }

  // Shallow routes get higher priority
  if (depth === 2) {
    return 0.8;
  } else if (depth === 3) {
    return 0.6;
  } else if (depth === 4) {
    return 0.4;
  } else {
    return 0.3;
  }
}
