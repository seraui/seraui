import React from "react";
import type { Metadata } from "next";
import Header from "@/components/site/header";
import { Hero } from "./_components/hero";
import { Footer } from "./_components/footer";
import A0 from "./_components/a0";

export const metadata: Metadata = {
  title: "Sera UI - Modern React Component Library",
  description: "Build stunning web applications with Sera UI's modern React components. Free, open-source, and built with Tailwind CSS & Framer Motion.",
  keywords: ["React components", "UI library", "Tailwind CSS", "Framer Motion", "TypeScript"],
  openGraph: {
    title: "Sera UI - Modern React Component Library",
    description: "Build stunning web applications with Sera UI's modern React components.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sera UI - Modern React Component Library",
    description: "Build stunning web applications with Sera UI's modern React components.",
  },
};

const page = () => {
  return (
    <main className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <Header />
      <Hero />
      <A0 />
      
      <div className="w-full bg-zinc-50 dark:bg-zinc-950">
        <div className="relative">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default page;
