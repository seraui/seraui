"use client";

import { useEffect } from "react";

// Lazy load structured data after initial render
export function StructuredData() {
  useEffect(() => {
    // Only add structured data after component mounts (client-side)
    const addStructuredData = () => {
      const scripts = [
        {
          id: "software-app-schema",
          data: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Sera UI",
            description:
              "Modern React component library with 500+ animated components built with Tailwind CSS and Framer Motion.",
            url: "https://seraui.com",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            softwareVersion: "1.0.0",
            datePublished: "2024-01-01",
            dateModified: new Date().toISOString(),
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            author: {
              "@type": "Organization",
              name: "Sera UI Team",
              url: "https://github.com/sera-ui",
            },
            keywords:
              "React components, UI library, Tailwind CSS, Framer Motion, TypeScript, Bangladesh",
            programmingLanguage: ["TypeScript", "JavaScript", "CSS"],
            downloadUrl: "https://github.com/seraprogrammer/sera-ui",
            license: "https://opensource.org/licenses/MIT",
          },
        },
        {
          id: "organization-schema",
          data: {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Sera UI",
            url: "https://seraui.com",
            logo: "https://seraui.com/logo.svg",
            description:
              "Modern React component library for developers. First UI library from Bangladesh.",
            foundingDate: "2024",
            sameAs: [
              "https://github.com/seraprogrammer/sera-ui",
              "https://twitter.com/sera_ui",
              "https://www.npmjs.com/package/sera-ui",
            ],
            address: {
              "@type": "PostalAddress",
              addressCountry: "BD",
            },
          },
        },
        {
          id: "website-schema",
          data: {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Sera UI",
            url: "https://seraui.com",
            description:
              "Modern React component library with 500+ animated components",
            publisher: {
              "@type": "Organization",
              name: "Sera UI",
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://seraui.com/docs?search={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          },
        },
      ];

      scripts.forEach(({ id, data }) => {
        if (!document.getElementById(id)) {
          const script = document.createElement("script");
          script.id = id;
          script.type = "application/ld+json";
          script.textContent = JSON.stringify(data);
          document.head.appendChild(script);
        }
      });
    };

    // Add structured data after a small delay to not block initial render
    const timer = setTimeout(addStructuredData, 100);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
