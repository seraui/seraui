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
    label: "Getting Started",
    children: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation", badge: "Updated" },
    ],
  },
  {
    label : "Button",
    children : [
     { label : "Button" , href : "/docs/button"},
     { label : "Dropdown" , href : "/docs/dropdown", badge: "New"}
    ]
   },
  {
    label : "Input",
    children : [
      { label : "Search" , href : "/docs/search"},
      { label : "Prompt" , href : "/docs/prompt"},
      { label : "Password" , href : "/docs/password", badge: "New"}
    ]
  },
  {
    label : "TEXT",
    children : [
      { label : "Fuzzy", href : "/docs/fuzzy"},
      { label : "Flip Words", href : "/docs/flipwords", badge: "New"},
      { label : "Text Reveal", href : "/docs/textreveal"},
      { label : "Decrypting", href : "/docs/decrypting"}
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
      { label: "Pricing", href: "/docs/pricing" , badge: "New" },
      { label: "Login", href: "/docs/login"},
      { label: "Card", href: "/docs/card"},
      { label: "Two Step", href: "/docs/twostep"},
      { label: "Amazon Gift Card", href: "/docs/amazongift"},
    ],
  },
  {
    label : "Pattern",
    children: [
      { label: "Patterns Collection", href: "/docs/pattern" , badge: "New"},
    ],
  },
];
