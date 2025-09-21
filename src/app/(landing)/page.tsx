import React from "react";
import type { Metadata } from "next";
import Header from "@/components/site/header";
import { Hero } from "./_components/hero";
import { Footer } from "./_components/footer";
import Testimonial from "./_components/testimonial";

// Dynamic import for heavy carousel component
import { DynamicCarousel } from "@/components/ui/dynamic-loader";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Sera UI - Modern React, Next.js and JSX Component Library",
    description:
      "Free and Open-source UI library for React, Next.js & JSX frameworks. Styled with Tailwind CSS crafted for fast, beautiful, highly-customizable and animated user interfaces.",
  },
};

const page = () => {
  return (
    <main className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <Header />
      <Hero />
      <DynamicCarousel />
      <Testimonial />
      <Footer />
    </main>
  );
};

export default page;
