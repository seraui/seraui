import Header from "@/components/site/header";
import type { Metadata } from "next";
import { FeatureSection } from "./_components/feature";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import Testimonial from "./_components/testimonial";

// Force static generation for landing page
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sera UI - Modern React, Next.js and JSX Component Library",
  description:
    "Free and Open-source UI library for React, Next.js & JSX frameworks. Styled with Tailwind CSS crafted for fast, beautiful, highly-customizable and animated user interfaces.",
  keywords: [
    "React components",
    "UI library",
    "Tailwind CSS",
    "Framer Motion",
    "TypeScript",
  ],
  openGraph: {
    title: "Sera UI - Modern React, Next.js and JSX Component Library",
    description:
      "Free and Open-source UI library for React, Next.js & JSX frameworks. Styled with Tailwind CSS crafted for fast, beautiful, highly-customizable and animated user interfaces.",
    type: "website",
    images: [
      {
        url: "https://seraui.com/og-image.png", // <-- replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Sera UI - Open Source React Component Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sera UI - Modern React, Next.js and JSX Component Library",
    description:
      "Free and Open-source UI library for React, Next.js & JSX frameworks. Styled with Tailwind CSS crafted for fast, beautiful, highly-customizable and animated user interfaces.",
    images: ["https://seraui.com/og-image.png"], // <-- replace with your actual image URL
  },
};

const page = () => {
  return (
    <main className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <Header />
      <Hero />
      <FeatureSection />
      <Testimonial />
      <Footer />
    </main>
  );
};

export default page;
