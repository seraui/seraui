"use client";

import { useEffect } from "react";

// Lazy load Open Graph meta tags after initial render
export function LazyOpenGraph() {
  useEffect(() => {
    const addOpenGraphTags = () => {
      const ogTags = [
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Sera UI" },
        {
          property: "og:title",
          content:
            "Sera UI - Modern React Component Library | 500+ Animated Components",
        },
        {
          property: "og:description",
          content:
            "Build stunning web applications with Sera UI's 500+ animated React components. Free, open-source, and built with Tailwind CSS & Framer Motion.",
        },
        { property: "og:url", content: "https://seraui.seraprogrammer.com" },
        {
          property: "og:image",
          content: "https://seraui.seraprogrammer.com/og-image.png",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content:
            "Sera UI - Modern React Component Library with 500+ Animated Components",
        },
        { property: "og:image:type", content: "image/png" },
        { property: "og:locale", content: "en_US" },

        // Twitter Card Tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@sera_ui" },
        { name: "twitter:creator", content: "@sera_ui" },
        {
          name: "twitter:title",
          content: "Sera UI - Modern React Component Library",
        },
        {
          name: "twitter:description",
          content:
            "500+ animated React components built with Tailwind CSS & Framer Motion. Free, open-source, and production-ready.",
        },
        {
          name: "twitter:image",
          content: "https://seraui.seraprogrammer.com/og-image.png",
        },
        {
          name: "twitter:image:alt",
          content:
            "Sera UI - Modern React Component Library with 500+ Animated Components",
        },
      ];

      ogTags.forEach(({ property, name, content }) => {
        const existingTag = document.querySelector(
          `meta[${property ? "property" : "name"}="${property || name}"]`
        );
        if (!existingTag) {
          const meta = document.createElement("meta");
          if (property) meta.setAttribute("property", property);
          if (name) meta.setAttribute("name", name);
          meta.setAttribute("content", content);
          document.head.appendChild(meta);
        }
      });
    };

    // Add Open Graph tags after a small delay to not block initial render
    const timer = setTimeout(addOpenGraphTags, 200);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
