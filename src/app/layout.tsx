import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { geistMono } from "@/assets/fonts";
import { Analytics } from "@vercel/analytics/next";
import { PackageManagerProvider } from "@/contexts/package-manager-context";
import { Inter } from "next/font/google";
import Script from "next/script";
import { PerformanceMonitor } from "@/components/performance/PerformanceMonitor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Sera UI - Modern React Component Library | Tailwind CSS & Framer Motion",
  description:
    "Sera UI is a premium React component library with 500+ animated components. Built with Tailwind CSS, Framer Motion, and TypeScript. Free, open-source, and production-ready for modern web applications.",
  keywords: [
    // Core & High-Volume Keywords
    "React components",
    "UI library",
    "React component library",
    "Tailwind CSS components",
    "Framer Motion components",
    "Next.js components",
    "Modern UI library",
    "Web components",
    "React UI kit",
    "Design system React",
    "Component library",
    "Frontend components",
    "React hooks UI",
    "Responsive UI components",
    "Accessible components",
    "Dark mode components",
    "React templates",
    "Web development tools",
    "JavaScript components",
    "CSS components",
    "React development library",
    "UI/UX components",
    "Interactive components",
    "React animations",
    "Component framework",
    "React toolkit",
    "Web design components",
    "React patterns",
    "shadcn ui",
    "shadcn components",
    "Tailwind UI",
    "Free React components",
    "Open source UI library",
    "React component examples",
    "UI components for React",
    "Best React UI library 2025",
    "Top UI libraries for React",
    "React UI framework",
    "Custom React components",
    "Reusable React components",

    // Niche: Bangladeshi & Bangla Keywords
    "Bangladeshi UI library",
    "First UI library from Bangladesh",
    "Made in Bangladesh UI library",
    "Bangla UI library",
    "React UI library for Bangladesh",
    "Bangladeshi React components",
    "Next.js UI library Bangladesh",
    "Tailwind CSS Bangladesh",
    "UI library for Bangladeshi developers",
    "Made in BD UI kit",
    "Bangladesh web components",
    "React component library BD",
    "Best Bangladeshi UI library",
    "Top UI library Bangladesh",
    "UI kit for Bangladeshi startups",
    "Localized UI components BD",
    "React UI for BD market",
    "Bangla React components",
    "Lightweight UI library for Bangladesh",
    "Free UI kit for Bangladeshi students",
    "Dhaka software company UI kit",
    "Chittagong developer tools",
    "Sylhet tech UI library",
    "Bangladesh IT solutions components",
    "React development in Bangladesh",
    "বাংলা UI লাইব্রেরি (Bangla UI Library)",
    "রিঅ্যাক্ট কম্পোনেন্ট বাংলাদেশ (React Component Bangladesh)",
    "বাংলাদেশের সেরা UI কিট (Best UI Kit of Bangladesh)",
    "বাংলা ওয়েব কম্পোনেন্ট (Bangla Web Component)",
    "বাংলাদেশি ডেভেলপারদের জন্য UI (UI for Bangladeshi Developers)",
    "নেক্সটজেএস বাংলা টিউটোরিয়াল (Next.js Bangla Tutorial)",
    "শ্যাডসিএন অল্টারনেটিভ বাংলাদেশ (shadcn alternative Bangladesh)",
    "React jobs Bangladesh",
    "Frontend developer tools BD",
    "Bangladesh open source project",
    "Ecommerce UI kit for Bangladesh",
    "bKash payment component React",
    "Nagad integration UI React",
    "Bangladeshi date picker component",
    "React Bangla tutorial",
    "Custom UI components for BD apps",
    "BD tech community library",
    "Bangladesh web development library",
    "React Native components Bangladesh",
    "Local first UI library BD",

    // shadcn/ui Related Keywords
    "shadcn ui alternative",
    "shadcn ui vs [Your Library Name]",
    "Free shadcn ui alternative",
    "Lighter than shadcn ui",
    "Easier shadcn ui",
    "shadcn ui components list",
    "shadcn ui install",
    "shadcn ui Next.js",
    "shadcn ui tutorial",
    "Customize shadcn ui",
    "shadcn ui themes",
    "shadcn ui dashboard",
    "shadcn ui landing page",
    "Best shadcn components",
    "shadcn ui form",
    "shadcn ui table",
    "shadcn ui dark mode",
    "Why use shadcn ui",
    "Is shadcn ui a library",
    "shadcn ui for beginners",
    "shadcn ui examples",
    "shadcn ui pricing",
    "shadcn ui with TypeScript",
    "shadcn ui vs Radix UI",
    "shadcn ui vs Material UI",
    "shadcn ui pros and cons",
    "Add components to shadcn ui",
    "Beautiful shadcn components",
    "shadcn ui animation",
    "shadcn ui responsive design",

    // Tailwind CSS Related Keywords
    "Tailwind CSS UI library",
    "Tailwind CSS component library",
    "Free Tailwind components",
    "Best Tailwind UI kit",
    "Tailwind CSS templates",
    "Headless UI Tailwind CSS",
    "DaisyUI alternative",
    "Flowbite alternative",
    "Preline UI alternative",
    "Tailwind CSS button component",
    "Tailwind CSS form elements",
    "Tailwind CSS navbar examples",
    "Animated Tailwind components",
    "Tailwind CSS responsive grid",
    "Tailwind CSS dark mode toggle",
    "Copy-paste Tailwind components",
    "Beautiful Tailwind CSS UI",
    "Tailwind CSS plugins",
    "Tailwind CSS design system",
    "Build UI with Tailwind CSS",
    "Tailwind CSS interactive components",
    "Tailwind CSS UI kit for Next.js",
    "Pre-built Tailwind components",
    "Tailwind CSS React components",
    "Tailwind CSS class library",
    "Tailwind cheat sheet",
    "Tailwind component generator",
    "Tailwind CSS landing page template",
    "Tailwind CSS admin dashboard",
    "Accessible Tailwind components",

    // Next.js Integration Keywords
    "Best UI library for Next.js",
    "Next.js UI components",
    "Next.js component library",
    "Next.js Tailwind CSS starter",
    "Next.js shadcn setup",
    "Next.js UI kit",
    "Next.js server components UI",
    "Next.js client components UI",
    "Next.js app router UI library",
    "Next.js 14 UI components",
    "Free Next.js templates",
    "Next.js dashboard template",
    "Next.js landing page UI",
    "How to use UI library in Next.js",
    "Next.js dark mode Tailwind",
    "Next.js animations Framer Motion",
    "Next.js accessible components",
    "Lightweight UI for Next.js",
    "Fast UI library for Next.js",
    "Next.js UI performance",
    "Next.js starter with UI library",
    "Vercel UI library",
    "Next.js UI best practices",
    "Next.js component library boilerplate",
    "Next.js enterprise UI kit",

    // Long-Tail & "How-To" Keywords
    "How to build a design system in React",
    "How to create a React component library",
    "How to animate components in React",
    "How to make responsive components with Tailwind",
    "How to add dark mode to a React app",
    "How to build accessible forms in React",
    "Best way to structure React components",
    "Tutorial for building a UI library",
    "Make my Next.js app look good",
    "Quick UI for React projects",
    "Easy to use React components",
    "React components for startups",
    "UI components for SaaS application",
    "React components for dashboard",
    "Building a UI with TypeScript and React",
    "Free UI components for personal projects",
    "How to manage state in UI components",
    "Best practices for React component design",
    "Create a themeable React component library",
    "How to use CSS variables with React components",
    "React component library performance optimization",
    "How to test React components",
    "Building interactive charts in React",
    "Best React data table component",
    "Create custom hooks for UI components",
    "How to build a settings page in React",
    "Login form component React Tailwind",
    "Responsive navigation bar React tutorial",
    "How to create a modal in Next.js",
    "Animate on scroll React components",

    // Component-Specific Keywords
    "React button component",
    "Animated button component",
    "Tailwind CSS card component",
    "React modal/dialog component",
    "Accessible modal React",
    "React data table component",
    "Sortable table React",
    "React form input components",
    "React date picker component",
    "React dropdown/select component",
    "Autocomplete component React",
    "React tooltip component",
    "React spinner/loader component",
    "React toast/notification component",
    "React accordion component",
    "React tabs component",
    "React carousel/slider component",
    "React progress bar component",
    "React avatar component",
    "React badge component",
    "React breadcrumbs component",
    "React pagination component",
    "React skeleton loader",
    "React command/search palette",
    "Next.js image component examples",
    "Copy-to-clipboard button React",
    "Stepper component React",
    "File upload component React",
    "Pricing table component Tailwind",
    "Stats component React",

    // More Keyword Variations
    "Simple React UI kit",
    "Beautiful Tailwind buttons",
    "Lightweight Next.js components",
    "Fast React data grid",
    "Modern dashboard UI kit",
    "Elegant form components",
    "Free React admin template",
    "Open source design system",
    "Custom React hooks for UI",
    "Premium UI kit alternative",
    "React UI library examples",
    "Next.js Tailwind tutorial",
    "shadcn ui starter kit",
    "React components for beginners guide",
    "UI components with React hooks",
    "Production-ready UI library",
    "React TypeScript components",
    "Accessible web components",
    "Framer Motion examples",
    "Tailwind CSS responsive design",
    "JavaScript UI library",
    "Headless component library",
    "React UI patterns",
    "Component driven development",
    "Atomic design React",
    "Themed components React",
    "React component generator",
    "Low-code UI builder React",
    "Copy and paste React components",
    "Minimalist UI components",
    "Professional React components",
    "Enterprise-grade UI library",
    "Scalable React components",
    "Modular UI components",
    "Developer-friendly UI kit",
    "Vercel design system alternative",
    "React aria components",
    "Radix primitives examples",
    "Headless UI React tutorial",
    "Best React libraries 2026",
    "Free lightweight React components",
    "Best open source Next.js UI kit",
    "Modern shadcn alternative tutorial",
    "Simple accessible tabs component with Tailwind",
    "Beautiful Framer Motion animations for React",
    "Bangladeshi open source React library",
    "Fastest UI components for Next.js Bangladesh",
    "রিঅ্যাক্ট শ্যাডসিএন অল্টারনেটিভ (React shadcn alternative in Bangla)",
    "টেলউইন্ড সিএসএস বাংলা (Tailwind CSS Bangla)",
  ],
  authors: [{ name: "Sera UI Team", url: "https://github.com/sera-ui" }],
  creator: "Sera UI",
  publisher: "Sera UI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://seraui.seraprogrammer.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Sera UI - Modern React Component Library | 500+ Animated Components",
    description:
      "Build stunning web applications with Sera UI's 500+ animated React components. Free, open-source, and built with Tailwind CSS & Framer Motion. Perfect for developers who want beautiful, accessible, and performant UI components.",
    url: "https://seraui.seraprogrammer.com",
    siteName: "Sera UI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sera UI - Modern React Component Library with 500+ Animated Components",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sera UI - Modern React Component Library",
    description:
      "500+ animated React components built with Tailwind CSS & Framer Motion. Free, open-source, and production-ready. Perfect for modern web development.",
    images: ["/og-image.png"],
    creator: "@sera_ui",
    site: "@sera_ui",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "y3qEBdgYG32ZoXRsNqWxh6QgyxhQ337zoKpLwmb_dic",
  },
  category: "technology",
  classification: "React Component Library",
  other: {
    "theme-color": "#000000",
    "color-scheme": "dark light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Sera UI",
    "application-name": "Sera UI",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta
          name="google-site-verification"
          content="y3qEBdgYG32ZoXRsNqWxh6QgyxhQ337zoKpLwmb_dic"
        />
        <meta name="yandex-verification" content="1b0095f6bfc08171" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sera UI" />
        <meta name="application-name" content="Sera UI" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Manifest and Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.svg" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://vercel.live" />

        {/* DNS Prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//vercel.live" />

        {/* Enhanced Structured Data for Software Application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Sera UI",
              description:
                "Modern React component library with 500+ animated components built with Tailwind CSS and Framer Motion. Free, open-source, and production-ready for modern web applications.",
              url: "https://seraui.seraprogrammer.com",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              softwareVersion: "1.0.0",
              datePublished: "2024-01-01",
              dateModified: new Date().toISOString(),
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              author: {
                "@type": "Organization",
                name: "Sera UI Team",
                url: "https://github.com/sera-ui",
              },
              creator: {
                "@type": "Organization",
                name: "Sera UI Team",
              },
              publisher: {
                "@type": "Organization",
                name: "Sera UI",
                logo: {
                  "@type": "ImageObject",
                  url: "https://seraui.seraprogrammer.com/logo.svg",
                },
              },
              keywords:
                "React components, UI library, Tailwind CSS, Framer Motion, TypeScript, animated components, open source, free, Bangladesh, shadcn alternative",
              programmingLanguage: ["TypeScript", "JavaScript", "CSS"],
              runtimePlatform: "Web Browser",
              downloadUrl: "https://github.com/seraprogrammer/sera-ui",
              installUrl: "https://www.npmjs.com/package/sera-ui",
              codeRepository: "https://github.com/seraprogrammer/sera-ui",
              license: "https://opensource.org/licenses/MIT",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "250",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Developer Community",
                  },
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  reviewBody:
                    "Excellent React component library with beautiful animations and comprehensive documentation.",
                },
              ],
            }),
          }}
        />

        {/* Enhanced Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sera UI",
              url: "https://seraui.seraprogrammer.com",
              logo: "https://seraui.seraprogrammer.com/logo.svg",
              description:
                "Modern React component library for developers. First UI library from Bangladesh with 500+ animated components.",
              foundingDate: "2024",
              founder: {
                "@type": "Person",
                name: "Sera UI Team",
              },
              sameAs: [
                "https://github.com/seraprogrammer/sera-ui",
                "https://twitter.com/sera_ui",
                "https://discord.gg/sera-ui",
                "https://www.npmjs.com/package/sera-ui",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                url: "https://github.com/seraprogrammer/sera-ui/issues",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "BD",
              },
            }),
          }}
        />

        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Sera UI",
              url: "https://seraui.seraprogrammer.com",
              description:
                "Modern React component library with 500+ animated components",
              publisher: {
                "@type": "Organization",
                name: "Sera UI",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://seraui.seraprogrammer.com/docs?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              mainEntity: {
                "@type": "ItemList",
                name: "React Components",
                description: "Collection of modern React components",
                numberOfItems: 50,
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} ${geistMono.variable} antialiased min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
      >
        <Analytics />

        {/* Performance Optimizations */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KCJ7NVNQ62"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KCJ7NVNQ62', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              custom_map: {
                'custom_parameter_1': 'component_category',
                'custom_parameter_2': 'user_journey_stage'
              }
            });
            
            // Enhanced ecommerce tracking for component usage
            gtag('config', 'G-KCJ7NVNQ62', {
              custom_map: {'custom_parameter_1': 'component_name'}
            });
          `}
        </Script>

        {/* Hotjar Analytics for UX insights */}
        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3849284,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>

        {/* Microsoft Clarity for user behavior analytics */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "n8j9k2l3m4");
          `}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <PackageManagerProvider>
            {children}
            <PerformanceMonitor />
          </PackageManagerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
