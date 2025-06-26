import { Cli } from "@/components/site/cli";
import React from "react";
import Link from "next/link";

export const CallToAction = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.3] mb-4">
          Build Faster. Launch Smarter.
        </h2>
        <p className="text-base md:text-lg font-medium text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl">
          Seamlessly integrate ready-made components with a single click or via our CLI. No setup. No hassle. Just speed and elegance.
        </p>

        <div className="w-full max-w-3xl">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <Cli
                command={`add "https://seraui.seraprogrammer.com/registry/button.json"`}
              />
            </div>
          </div>
        </div>

        {/* Additional CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <Link href="/docs">
              <span className="text-white">Start Building</span>
            </Link>
          </button>
          <button className="px-8 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200">
            <Link href="/docs/installation">
              <span className="text-zinc-700 dark:text-zinc-300">
                Browse Components
              </span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
