import { navigation } from "@/constants/navigation";
import { components } from "@/scripts/components";

export type DocPage = {
  label: string;
  href: string;
};

const extraDocSlugs = [
  "faq",
  "hide-toc-example",
  "orbits",
  "progress",
  "radio-buttons",
  "randomtextreveal",
  "retro-style-form",
  "verify-badge",
  "video-gallery",
];

function toLabel(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizePath(path: string) {
  if (path.endsWith("/") && path !== "/") {
    return path.slice(0, -1);
  }

  return path;
}

function getNavigationPages(): DocPage[] {
  const pages: DocPage[] = [];

  navigation.forEach((section) => {
    section.children.forEach((child) => {
      pages.push({
        label: child.label,
        href: normalizePath(child.href),
      });
    });
  });

  return pages;
}

function getComponentPages(): DocPage[] {
  return components.map((component) => ({
    label: component.title || component.name,
    href: `/docs/${component.name}`,
  }));
}

function getExtraPages(): DocPage[] {
  return extraDocSlugs.map((slug) => ({
    label: toLabel(slug),
    href: `/docs/${slug}`,
  }));
}

export function getAllDocPages(): DocPage[] {
  const map = new Map<string, DocPage>();

  [...getNavigationPages(), ...getComponentPages(), ...getExtraPages()].forEach(
    (page) => {
      const href = normalizePath(page.href);

      if (!map.has(href)) {
        map.set(href, { ...page, href });
      }
    },
  );

  return Array.from(map.values());
}

export function getAdjacentPages(currentPath: string): {
  previous: DocPage | null;
  next: DocPage | null;
} {
  const pages = getAllDocPages();
  const normalizedPath = normalizePath(currentPath);
  const currentIndex = pages.findIndex((page) => page.href === normalizedPath);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? pages[currentIndex - 1] : null,
    next: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null,
  };
}
