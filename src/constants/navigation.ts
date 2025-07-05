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
     { label : "Button" , href : "/docs/button", badge: "New"},
     { label : "Dropdown" , href : "/docs/dropdown", badge: "New"}
    ]
   },
  {
    label : "Input",
    children : [
      { label : "Search" , href : "/docs/search", badge: "New"},
      { label : "Prompt" , href : "/docs/prompt", badge: "New"}
    ]
  },
  {
    label : "TEXT",
    children : [
      { label : "Fuzzy", href : "/docs/fuzzy", badge: "New"},
    ]
  },
  {
    label: "Tabs",
    children: [
      { label: "Tabs", href: "/docs/tabs" },
      { label: "Fancy Tabs", href: "/docs/tabs-fancy"},
      { label: "Classic Tabs", href: "/docs/tabs-classic" },
      { label: "Dock", href: "/docs/dock", badge: "New"}
    ],
  },
  {
    label : "Accordion",
    children: [
      { label: "Accordion", href: "/docs/accordion" },
      { label: "Fancy Accordion", href: "/docs/accordion-last" },
      
    ],
  },
  {
    label : "Form",
    children: [
      { label: "Login", href: "/docs/login" , badge: "New"},
      { label: "Card", href: "/docs/card" , badge: "New"},
      { label: "Two Step", href: "/docs/twostep" , badge: "New"},
      { label: "Amazon Gift Card", href: "/docs/amazongift" , badge: "New"},
    ],
  },
  {
    label : "Components",
    children: [
      { label: "Features Section", href: "/docs/features" , badge: "New"},
    ],
  },
];
