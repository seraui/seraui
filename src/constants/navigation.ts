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
      {
        label: "Installation Guide",
        href: "/docs/installation",
        badge: "Updated",
      },
    ],
  },
  {
    label: "UI Components",
    children: [
      { label: "Marquee Scroller", href: "/docs/marquee" },
      { label: "Code Profile Card", href: "/docs/codeprofile" },
      { label: "Portfolio Showcase", href: "/docs/portfolio" },
      { label: "Orbiting Circles Animation", href: "/docs/orbits" },
      { label: "Network Visualization", href: "/docs/network" },
      { label: "Video Text Overlay", href: "/docs/video-text" },
      { label: "Image Swiper Carousel", href: "/docs/imageswiper" },
      { label: "Section Divider", href: "/docs/divider" },
      { label: "Noise Background", href: "/docs/noise", badge: "New" },
      { label: "Glitch Vault Card", href: "/docs/glitchvault" },
      { label: "Glow Line Effect", href: "/docs/glowline" },
      { label: "Modal Dialog", href: "/docs/modal", badge: "New" },
      { label: "HTML code runner", href: "/docs/html-code" },
      { label: "Infinite Grid", href: "/docs/infinite-grid" },
      { label: "Orbiting Skills", href: "/docs/orbiting" },
      {
        label: "Orbiting Carousel",
        href: "/docs/orbit-carousel",
        badge: "New",
      },
      { label: "Timeline Components", href: "/docs/timeline", badge: "New" },
      { label: "Radio Buttons", href: "/docs/radio-buttons", badge: "New" },
    ],
  },
  {
    label: "Buttons & Actions",
    children: [
      { label: "Basic Button", href: "/docs/button" },
      { label: "Modern Button", href: "/docs/modern-button" },
      { label: "Glow Button", href: "/docs/glow-button", badge: "New" },
      { label: "Dropdown Menu", href: "/docs/dropdown" },
      { label: "Shimmer Button", href: "/docs/shimmer" },
      { label: "Slide-out Drawer", href: "/docs/drawer" },
      {
        label: "Liquid Glass Button",
        href: "/docs/liquid-glass",
        badge: "New",
      },
    ],
  },
  {
    label: "Badges & Notifications",
    children: [
      { label: "Status Badge", href: "/docs/badge" },
      { label: "Animated Badge", href: "/docs/animatedbadge", badge: "New" },
      {
        label: "Verify Badge",
        href: "/docs/verify-badge",
        badge: "New",
      },
      { label: "Toast Notification", href: "/docs/toast" },
      {
        label: "Announcement Banner",
        href: "/docs/announcement",
        badge: "New",
      },
    ],
  },
  {
    label: "Form Inputs",
    children: [
      { label: "Search Input", href: "/docs/search" },
      { label: "Command Prompt", href: "/docs/prompt", badge: "Updated" },
      { label: "Password Input", href: "/docs/password" },
      { label: " Combo Box", href: "/docs/combo-box", badge: "New" },
    ],
  },
  {
    label: "Text Effects",
    children: [
      { label: "Text Animation", href: "/docs/text" },
      { label: "Fuzzy Text Effect", href: "/docs/fuzzy" },
      { label: "Flip Words Animation", href: "/docs/flipwords" },
      { label: "Text Reveal Effect", href: "/docs/textreveal" },
      { label: "Decrypting Text", href: "/docs/decrypting" },
      { label: "Aurora Text Effect", href: "/docs/aurora" },
      { label: "Sparkles Text", href: "/docs/sparklestext" },
      { label: "Number Ticker Counter", href: "/docs/ticker" },
      { label: "Letter Glitch Effect", href: "/docs/letter-glitch" },
      { label: "Resize Handle Text", href: "/docs/resize-handle" },
      { label: "Noise Text", href: "/docs/noisetext", badge: "New" },
      {
        label: "Text Highlighter",
        href: "/docs/text-highlighter",
        badge: "New",
      },
      { label: "Curved Text", href: "/docs/curved-text", badge: "New" },
      { label: "Kbd Text", href: "/docs/kbd", badge: "New" },
    ],
  },
  {
    label: "Navigation & Layout",
    children: [
      { label: "Dock-style Tabs", href: "/docs/doctabs" },
      { label: "Carousel", href: "/docs/carousel" },
      { label: "3D Carousel", href: "/docs/3d-carousel", badge: "New" },
      { label: "Basic Tabs", href: "/docs/tabs" },
      { label: "Fancy Tabs", href: "/docs/tabs-fancy" },
      { label: "Classic Tabs", href: "/docs/tabs-classic" },
      { label: "App Dock", href: "/docs/dock" },
      { label: "File Tree Explorer", href: "/docs/filetree" },
      { label: "Copy to Clipboard", href: "/docs/copybutton" },
    ],
  },
  {
    label: "Accordions",
    children: [
      { label: "Basic Accordion", href: "/docs/accordion" },
      { label: "Fancy Accordion", href: "/docs/accordion-last" },
      {
        label: "Gradient Accordion",
        href: "/docs/gradient-accordion",
        badge: "New",
      },
    ],
  },
  {
    label: "Forms & Cards",
    children: [
      { label: "3D Card", href: "/docs/threed-card", badge: "New" },
      { label: "Login Form", href: "/docs/login" },
      { label: "Sign In Form", href: "/docs/signin" },
      { label: "Newsletter Signup", href: "/docs/waitlist" },
      { label: "Basic Card", href: "/docs/card" },
      { label: "Two-Step Verification", href: "/docs/twostep" },
      { label: "Amazon Gift Card", href: "/docs/amazongift" },
      { label: "Magic Card Effect", href: "/docs/magic" },
      { label: "Gradient Card", href: "/docs/gradient" },
      { label: "Spotlight Card", href: "/docs/spotlightcard" },
      { label: "Multi-Select Dropdown", href: "/docs/multiselector" },
      { label: "NFT Marketplace Card", href: "/docs/nftmarketplace" },
    ],
  },
  {
    label: "Grid Layouts",
    children: [
      { label: "Masonry Grid", href: "/docs/masonary" },
      { label: "Bento Grid Layout", href: "/docs/bento-grid" },
    ],
  },
  {
    label: "Background Effects",
    children: [
      { label: "Falling Glitch Effect", href: "/docs/falling-glitch" },
      { label: "Moving Grid Background", href: "/docs/moving-grid" },
    ],
  },
  {
    label: "Retro Components",
    children: [
      { label: "Retro-style Button", href: "/docs/retro-button" },
      { label: "Retro-style Card", href: "/docs/retro-card" },
      {
        label: "Retro-style Accordion",
        href: "/docs/retro-style-accordion",
        badge: "New",
      },
      {
        label: "Retro-style Form",
        href: "/docs/retro-style-form",
        badge: "New",
      },
    ],
  },
  {
    label: "Website Sections",
    children: [
      { label: "Hero Section", href: "/docs/hero" },
      { label: "Navigation Header", href: "/docs/navbar" },
      { label: "Pricing Section", href: "/docs/pricing", badge: "New" },
      { label: "Testimonial Section", href: "/docs/testimonial" },
      { label: "Footer Section", href: "/docs/footer", badge: "New" },
      { label: "Forgot Password Form", href: "/docs/forgotpassword" },
      { label: "Team Member Card", href: "/docs/teammember" },
      { label: "FAQ Section", href: "/docs/faq", badge: "New" },
      { label: "Video Gallery", href: "/docs/video-gallery", badge: "New" },
    ],
  },
  {
    label: "Tools",
    children: [
      { label: "Loading Spinners", href: "/docs/loaders" },
      { label: "Pattern Collection", href: "/docs/pattern" },
      { label: "Color Palette", href: "/docs/colorpalette" },
      { label: "Gradient Generator", href: "/docs/gradientgen" },
      { label: "SVG Icon Library", href: "/docs/svg-icons" },
    ],
  },
];
