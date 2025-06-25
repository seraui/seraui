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
    label: "Components",
    children: [
      { label: "Tabs", href: "/docs/tabs" },
      { label: "Loading Bar", href: "/docs/loading-bar" },
      { label: "Loading Link", href: "/docs/loading-link" },
      { label: "Table", href: "/docs/table" },
      { label: "Code Block", href: "/docs/code-block" },
    ],
  }
];
