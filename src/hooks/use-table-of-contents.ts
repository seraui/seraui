"use client";

import { useEffect, useState } from "react";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function useTableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Function to extract headings from the page
    const extractHeadings = () => {
      // Wait a bit for MDX content to render
      setTimeout(() => {
        // Get h1, h2, and h3 headings from the main content area
        const mainContent = document.querySelector("main");
        if (!mainContent) return;

        const headings = mainContent.querySelectorAll("h1, h2, h3");
        const tocItems: TOCItem[] = [];

        headings.forEach((heading, index) => {
          // Skip if heading is empty or just whitespace
          const text = heading.textContent?.trim();
          if (!text) return;

          let id = heading.id;

          // If heading doesn't have an id, create one from the text
          if (!id) {
            id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "") || `heading-${index}`;
            heading.id = id;
          }

          // Get the heading level from the tag name
          const level = parseInt(heading.tagName.charAt(1));

          tocItems.push({
            id,
            text,
            level,
          });
        });

        setToc(tocItems);
      }, 100); // Small delay to ensure MDX content is rendered
    };

    // Extract headings on mount and when content changes
    extractHeadings();

    // Set up a MutationObserver to watch for content changes
    const observer = new MutationObserver(() => {
      extractHeadings();
    });

    // Observe changes to the main content area
    const mainContent = document.querySelector("main");
    if (mainContent) {
      observer.observe(mainContent, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Function to handle scroll and update active heading
    const handleScroll = () => {
      const headings = toc.map(item => document.getElementById(item.id)).filter(Boolean);
      
      if (headings.length === 0) return;

      // Find the heading that's currently in view
      let activeHeading = headings[0];
      
      for (const heading of headings) {
        if (heading) {
          const rect = heading.getBoundingClientRect();
          // Consider a heading active if it's within the top 30% of the viewport
          if (rect.top <= window.innerHeight * 0.3) {
            activeHeading = heading;
          } else {
            break;
          }
        }
      }

      if (activeHeading?.id !== activeId) {
        setActiveId(activeHeading?.id || "");
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toc, activeId]);

  // Function to scroll to a heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return {
    toc,
    activeId,
    scrollToHeading,
  };
}
