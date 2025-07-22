import { NextResponse } from "next/server";

// Image sitemap for better image SEO with caching
export const dynamic = "force-static";
export const revalidate = 86400; // Revalidate every 24 hours

export async function GET() {
  const baseUrl = "https://seraui.seraprogrammer.com";

  // Component images and screenshots
  const componentImages = [
    {
      name: "Button Components",
      url: "/screenshots/button-components.png",
      caption: "Beautiful animated button components for React",
    },
    {
      name: "Card Components",
      url: "/screenshots/card-components.png",
      caption: "Flexible card components with hover effects",
    },
    {
      name: "Form Components",
      url: "/screenshots/form-components.png",
      caption: "Modern login and form components",
    },
    {
      name: "Animation Components",
      url: "/screenshots/animation-components.png",
      caption: "Text animations and effects",
    },
    {
      name: "Layout Components",
      url: "/screenshots/layout-components.png",
      caption: "Hero sections and layout components",
    },
    {
      name: "Interactive Components",
      url: "/screenshots/interactive-components.png",
      caption: "Carousels and interactive elements",
    },
  ];

  const imageSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Homepage Images -->
  <url>
    <loc>${baseUrl}</loc>
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:caption>Sera UI - Modern React Component Library with 50+ Animated Components</image:caption>
      <image:title>Sera UI Homepage</image:title>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/logo.svg</image:loc>
      <image:caption>Sera UI Logo - Modern React Component Library</image:caption>
      <image:title>Sera UI Logo</image:title>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/hero-screenshot.png</image:loc>
      <image:caption>Sera UI Hero Section with Component Showcase</image:caption>
      <image:title>Sera UI Component Showcase</image:title>
    </image:image>
  </url>

  <!-- Documentation Images -->
  <url>
    <loc>${baseUrl}/docs</loc>
    <image:image>
      <image:loc>${baseUrl}/docs-overview.png</image:loc>
      <image:caption>Sera UI Documentation Overview - Complete Guide to React Components</image:caption>
      <image:title>Sera UI Documentation</image:title>
    </image:image>
  </url>

  ${componentImages
    .map(
      (image) => `
  <url>
    <loc>${baseUrl}/docs/${image.name.toLowerCase().replace(/\s+/g, "-")}</loc>
    <image:image>
      <image:loc>${baseUrl}${image.url}</image:loc>
      <image:caption>${image.caption}</image:caption>
      <image:title>${image.name} - Sera UI</image:title>
    </image:image>
  </url>
  `
    )
    .join("")}

  <!-- Component specific images -->
  <url>
    <loc>${baseUrl}/docs/button</loc>
    <image:image>
      <image:loc>${baseUrl}/components/button-preview.png</image:loc>
      <image:caption>React Button Components with Animations - Tailwind CSS and Framer Motion</image:caption>
      <image:title>Button Components Preview</image:title>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/components/button-variants.png</image:loc>
      <image:caption>Button Component Variants - Primary, Secondary, Outline, Ghost</image:caption>
      <image:title>Button Variants</image:title>
    </image:image>
  </url>

  <url>
    <loc>${baseUrl}/docs/card</loc>
    <image:image>
      <image:loc>${baseUrl}/components/card-preview.png</image:loc>
      <image:caption>React Card Components with Hover Effects - Modern UI Design</image:caption>
      <image:title>Card Components Preview</image:title>
    </image:image>
  </url>

  <url>
    <loc>${baseUrl}/docs/carousel</loc>
    <image:image>
      <image:loc>${baseUrl}/components/carousel-preview.png</image:loc>
      <image:caption>React Carousel Components - Responsive Image Sliders</image:caption>
      <image:title>Carousel Components Preview</image:title>
    </image:image>
  </url>

  <!-- Installation Guide Images -->
  <url>
    <loc>${baseUrl}/docs/installation</loc>
    <image:image>
      <image:loc>${baseUrl}/installation-guide.png</image:loc>
      <image:caption>Sera UI Installation Guide - Step by Step Setup</image:caption>
      <image:title>Installation Guide</image:title>
    </image:image>
  </url>

</urlset>`;

  return new NextResponse(imageSitemapXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
