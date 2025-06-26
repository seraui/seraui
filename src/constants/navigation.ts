type NavigationChild = {
  label: string;
  href: string;
};
type NavigationItem = {
  label: string;
  children: NavigationChild[];
};

export const navigation: NavigationItem[] = [
  {
    label: "Get Started",
    children: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Search", href: "/docs/search" },
      { label: "TOC Demo", href: "/docs/toc-demo" },
    ],
  },
  {
    label: "Tabs",
    children: [
      { label: "Tabs", href: "/docs/tabs" },
      { label: "Fancy Tabs", href: "/docs/tabs-fancy" },
      { label: "Classic Tabs", href: "/docs/tabs-classic" },
    ],
  },
];
