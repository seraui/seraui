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
    label: "Components",
    children: [
      { label: "Loaders", href: "/docs/loaders", badge: "Tool" },
      { label: "Patterns Collection", href: "/docs/pattern", badge: "Tool" },
      { label: "Color Palette", href: "/docs/colorpalette", badge: "Tool" },
      { label: "Gradient", href: "/docs/gradientgen", badge: "Tool" },
      { label: "SVG Icons", href: "/docs/svg-icons", badge: "Tool" },
      { label: "marquee", href: "/docs/marquee" },
      { label: "Code Profile", href: "/docs/codeprofile" },
      { label: "Portfolio", href: "/docs/portfolio" },
      { label: "Orbiting Circles", href: "/docs/integrations" },
      { label: "Network", href: "/docs/network" },
      { label: "Video Text", href: "/docs/video-text" },
      { label: "Image Swiper", href: "/docs/imageswiper", badge: "New" },
      { label: "Divider", href: "/docs/divider" },
      { label: "Noise", href: "/docs/noise", badge: "New" },
      { label: "GlitchVault Card", href: "/docs/glitchvault", badge: "New" },
    ],
  },
  {
    label: "Button",
    children: [
      { label: "Button", href: "/docs/button" },
      { label: "Modern Button", href: "/docs/modern-button" },
      { label: "Glow Button", href: "/docs/glow-button", badge: "New" },
      { label: "Dropdown", href: "/docs/dropdown" },
      { label: "Shimmer Button", href: "/docs/shimmer" },
      { label: "Drawer", href: "/docs/drawer" },
    ],
  },
  {
    label: "Badge & Toast",
    children: [
      { label: "Badge", href: "/docs/badge" },
      { label: "Animated Badge", href: "/docs/animatedbadge", badge: "New" },
      { label: "Toast", href: "/docs/toast" },
      { label: "Announcement", href: "/docs/announcement", badge: "New" },
    ],
  },
  {
    label: "Input",
    children: [
      { label: "Search", href: "/docs/search" },
      { label: "Prompt", href: "/docs/prompt", badge: "Updated" },
      { label: "Password", href: "/docs/password" },
      { label: "Combobox", href: "/docs/combobox", badge: "New" },
    ],
  },
  {
    label: "Text",
    children: [
      { label: "Text Animation", href: "/docs/text" },
      { label: "Fuzzy", href: "/docs/fuzzy" },
      { label: "Flip Words", href: "/docs/flipwords" },
      { label: "Text Reveal", href: "/docs/textreveal" },
      { label: "Decrypting", href: "/docs/decrypting" },
      { label: "Aurora Text", href: "/docs/aurora" },
      { label: "Sparkles Text", href: "/docs/sparklestext" },
      { label: "Number Ticker", href: "/docs/ticker" },
      { label: "Letter Glitch", href: "/docs/letter-glitch" },
      { label: "ResizeHandle Text", href: "/docs/resize-handle" },
    ],
  },
  {
    label: "Tabs",
    children: [
      { label: "Dock Tabs", href: "/docs/doctabs" },
      { label: "Carousel", href: "/docs/carousel", badge: "New" },
      { label: "Tabs", href: "/docs/tabs" },
      { label: "Fancy Tabs", href: "/docs/tabs-fancy" },
      { label: "Classic Tabs", href: "/docs/tabs-classic" },
      { label: "Dock", href: "/docs/dock" },
      { label: "File Tree", href: "/docs/filetree" },
      { label: "Copy Button", href: "/docs/copybutton" },
    ],
  },
  {
    label: "Accordion",
    children: [
      { label: "Accordion", href: "/docs/accordion" },
      { label: "Fancy Accordion", href: "/docs/accordion-last" },
      {
        label: "Gradient Accordion",
        href: "/docs/gradient-accordion",
        badge: "New",
      },
    ],
  },
  {
    label: "Form & Cards",
    children: [
      { label: "Login", href: "/docs/login", badge: "Updated" },
      { label: "Sign In", href: "/docs/signin" },
      { label: "Newsletter", href: "/docs/waitlist" },
      { label: "Card", href: "/docs/card" },
      { label: "Two Step", href: "/docs/twostep" },
      { label: "Amazon Gift Card", href: "/docs/amazongift" },
      { label: "Magic Card", href: "/docs/magic" },
      { label: "Gradient", href: "/docs/gradient" },
      { label: "Spotlight Card", href: "/docs/spotlightcard" },
      { label: "Multi Select", href: "/docs/multiselector" },
      { label: "NFT Marketplace", href: "/docs/nftmarketplace" },
    ],
  },
  {
    label: "Grid",
    children: [
      { label: "Masonary Grid", href: "/docs/masonary" },
      { label: "Bento Grid", href: "/docs/bento-grid" },
    ],
  },
  {
    label: "Backgrounds",
    children: [
      { label: "Falling Glitch", href: "/docs/falling-glitch" },
      { label: "Moving Grid", href: "/docs/moving-grid" },
    ],
  },
  {
    label: "Retro",
    children: [
      { label: "Retro Button", href: "/docs/retro-button" },
      { label: "Retro Card", href: "/docs/retro-card" },
    ],
  },
  {
    label: "Websites Blocks",
    children: [
      { label: "Hero", href: "/docs/hero" },
      { label: "Header", href: "/docs/navbar" },
      { label: "Pricing", href: "/docs/pricing", badge: "New" },
      { label: "Testimonial", href: "/docs/testimonial" },
      { label: "Footer", href: "/docs/footer", badge: "New" },
      { label: "Forgot Password", href: "/docs/forgotpassword" },
      { label: "Team Member", href: "/docs/teammember" },
    ],
  },
];
