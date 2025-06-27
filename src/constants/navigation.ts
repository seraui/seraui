type NavigationChild = {
  label: string;
  href: string;
  badge?: string; // Optional badge like "New" or "Updated"
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
      { label: "Installation", href: "/docs/installation", badge: "Updated" },
    ],
  },
  {
    label : "Button",
    children : [
     { label : "Button" , href : "/docs/button", badge: "New"}
    ]
   },
  {
    label: "Tabs",
    children: [
      { label: "Tabs", href: "/docs/tabs" },
      { label: "Fancy Tabs", href: "/docs/tabs-fancy"},
      { label: "Classic Tabs", href: "/docs/tabs-classic" },
    ],
  },
  {
    label : "Accordion",
    children: [
      { label: "Accordion", href: "/docs/accordion" },
    ],
  },
  {
    label : "Form",
    children: [
      { label: "Card", href: "/docs/card" , badge: "New"},
    ],
  }
];
