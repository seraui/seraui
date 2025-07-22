import React from "react";
import type { Metadata } from "next";
import Header from "@/components/site/header";
import { Hero } from "./_components/hero";
import { Footer } from "./_components/footer";
import A0 from "./_components/a0";
import NetworkVisualization from "@/app/docs/network/network";
import Carousel from "@/app/docs/carousel/carousel";

// Force static generation for landing page
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Sera UI - Modern React Component Library",
  description:
    "Build stunning web applications with Sera UI's modern React components. Free, open-source, and built with Tailwind CSS & Framer Motion.",
  keywords: [
    "React components",
    "UI library",
    "Tailwind CSS",
    "Framer Motion",
    "TypeScript",
  ],
  openGraph: {
    title: "Sera UI - Modern React Component Library",
    description:
      "Build stunning web applications with Sera UI's modern React components.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sera UI - Modern React Component Library",
    description:
      "Build stunning web applications with Sera UI's modern React components.",
  },
};

const page = () => {
  return (
    <main className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <Header />
      <Hero />
      <A0 />
      <Carousel />
      {/* Community Section - Enhanced Mobile Responsiveness */}
      <section className="py-12 sm:py-16 md:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Let&apos;s Connect Together
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Join our vibrant community of developers and creators. Visualize
              your network, collaborate, and build something amazing with Sera
              UI.
            </p>
          </div>

          <div className="flex justify-center">
            <NetworkVisualization />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default page;
