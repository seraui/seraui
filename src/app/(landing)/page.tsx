import React from "react";
import Header from "@/components/site/header";
import { Hero } from "./_components/hero";
import { Footer } from "./_components/footer";

const page = () => {
  return (
    <main className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <Header />
      <Hero />
      
      <div className="w-full bg-zinc-50 dark:bg-zinc-950">
        <div className="relative">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default page;
