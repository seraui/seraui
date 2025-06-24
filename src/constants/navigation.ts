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
    ],
  },
  {
    label: "Text Effects",
    children: [
      { label: "Text Circle", href: "/docs/text-circle" },
      { label: "Text Reveal", href: "/docs/text-reveal" },
      { label: "Text Ripple", href: "/docs/text-ripple" },
      { label: "Text Scramble", href: "/docs/text-scramble" },
      { label: "Text Split", href: "/docs/text-split" },
      { label: "Demo", href: "/docs/demo" },
      { label: "Tabs", href: "/docs/tabs" },
    ],
  },
  {
    label: "Forms",
    children: [
      { label: "Checkbox", href: "/docs/checkbox" },
    ],
  },
  {
    label: "Navigation",
    children: [
      { label: "Menu Fluid", href: "/docs/menu-fluid" },
      { label: "Menu Vertical", href: "/docs/menu-vertical" },
    ],
  },
  {
    label: "Cards",
    children: [
      { label: "Book", href: "/docs/book" },
      { label: "Flip Card", href: "/docs/flip-card" },
      { label: "Tilt Card", href: "/docs/tilt-card" },
    ],
  },
  {
    label: "Backgrounds",
    children: [{ label: "Gradient Bars", href: "/docs/gradient-bars" }],
  },
];
