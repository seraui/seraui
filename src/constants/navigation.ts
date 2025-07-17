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
    label : "Components",
    children: [
      { label: "Loaders", href: "/docs/loaders" , badge: "Tool"},
      { label: "Patterns Collection", href: "/docs/pattern" , badge: "Tool"},
      { label : "marquee" , href : "/docs/marquee"},
      { label: "Code Profile", href: "/docs/codeprofile" , badge: "New"},
      { label: "Portfolio", href: "/docs/portfolio" , badge: "New"},
      { label : "Orbiting Circles" , href : "/docs/integrations"},
      { label : "Network" , href : "/docs/network" , badge: "New"},
    ],
  },
  {
    label : "Button",
    children : [
     { label : "Button" , href : "/docs/button"},
     { label : "Retro Button" , href : "/docs/retro", badge: "New"},
     { label : "Dropdown" , href : "/docs/dropdown", badge: "New"},
     { label : "Shimmer Button" , href : "/docs/shimmer", badge: "New"},

    ]
   },
   {
    label : "Badge & Toast",
    children : [
      { label : "Badge" , href : "/docs/badge"},
      { label : "Animated Badge" , href : "/docs/animatedbadge" , badge: "New"},
      { label : "Toast" , href : "/docs/toast" , badge: "New"}
    ]
  },
  {
    label : "Input",
    children : [
      { label : "Search" , href : "/docs/search"},
      { label : "Prompt" , href : "/docs/prompt" , badge: "Updated"},
      { label : "Password" , href : "/docs/password", badge: "New"}
    ]
  },
  {
    label : "Text",
    children : [
      { label : "Text Animation" , href : "/docs/text"},
      { label : "Fuzzy", href : "/docs/fuzzy"},
      { label : "Flip Words", href : "/docs/flipwords", badge: "New"},
      { label : "Text Reveal", href : "/docs/textreveal"},
      { label : "Decrypting", href : "/docs/decrypting"},
      { label : "Aurora Text", href : "/docs/aurora", badge: "New"}
    ]
  },
  {
    label: "Tabs",
    children: [
      { label: "Dock Tabs", href: "/docs/doctabs" },
      { label: "Carousel", href: "/docs/carousel" , badge: "New"},
      { label: "Tabs", href: "/docs/tabs" },
      { label: "Fancy Tabs", href: "/docs/tabs-fancy"},
      { label: "Classic Tabs", href: "/docs/tabs-classic" },
      { label: "Dock", href: "/docs/dock"},
      { label: "File Tree", href: "/docs/filetree" , badge: "New"},
      { label: "Copy Button", href: "/docs/copybutton" , badge: "New"}
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
    label : "Form & Cards",
    children: [
      { label: "Login", href: "/docs/login", badge: "Updated"},
      { label: "Sign In", href: "/docs/signin", badge: "New"},
      { label: "Waitlist", href: "/docs/waitlist", badge: "New"},
      { label: "Card", href: "/docs/card"},
      { label: "Two Step", href: "/docs/twostep"},
      { label: "Amazon Gift Card", href: "/docs/amazongift"},
      { label : "Magic Card" , href : "/docs/magic"},
      { label : "Gradient" , href : "/docs/gradient" , badge : "New"},
      { label : "Spotlight Card" , href : "/docs/spotlightcard" , badge : "New"},
      { label : "Multi Select" , href : "/docs/multiselector" , badge : "New"},
    ],
  },
  {
    label : "Grid",
    children : [
      { label : "Masonary Grid" , href : "/docs/masonary"},
    ]
  },
  {
    label : "Websites Blocks",
    children : [
      { label : "Hero" , href : "/docs/hero"},
      { label : "Header" , href : "/docs/navbar"},
      { label: "Pricing", href: "/docs/pricing" , badge: "New" },
      { label: "Testimonial", href: "/docs/testimonial" , badge: "New"},
      { label: "Footer", href: "/docs/footer" , badge: "New"},
      { label: "Forgot Password", href: "/docs/forgotpassword" , badge: "New"},
      { label: "Team Member", href: "/docs/teammember" , badge: "New"},
      
    ]
  },
];
