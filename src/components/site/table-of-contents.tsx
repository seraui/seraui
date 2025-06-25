"use client";

import React from "react";
import { motion } from "motion/react";
import { useTableOfContents } from "@/hooks/use-table-of-contents";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

export const TableOfContents: React.FC = () => {
  const { toc, activeId, scrollToHeading } = useTableOfContents();

  // Don't render if there are no headings or all headings are empty
  if (toc.length === 0 || toc.every(item => !item.text.trim())) {
    return null;
  }

  return (
    <aside className="hidden xl:block w-64 h-[calc(100dvh-57px)] sticky top-[57px] flex-shrink-0">
      <div className="h-full py-8 px-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Timeline Table of Contents */}
          <nav className="relative" role="navigation" aria-label="Table of contents">
            {/* Timeline line */}
            <div className="absolute left-2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700" />

            <div className="space-y-4">
              {toc.map((item, index) => {
                const isActive = item.id === activeId;

                return (
                  <div key={item.id} className="relative flex items-start">
                    {/* Timeline dot */}
                    <motion.div
                      className={cn(
                        "relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-200",
                        isActive
                          ? "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/25"
                          : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600"
                      )}
                      animate={{
                        scale: isActive ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Content */}
                    <button
                      onClick={() => scrollToHeading(item.id)}
                      className={cn(
                        "ml-4 text-left text-sm transition-all duration-200 hover:text-zinc-900 dark:hover:text-zinc-100",
                        isActive
                          ? "text-blue-600 dark:text-blue-400 font-medium"
                          : "text-zinc-600 dark:text-zinc-400"
                      )}
                    >
                      {item.text}
                    </button>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Reading Progress */}
          <div className="space-y-3">

            {/* Cool Progress Container */}
            <div className="relative">
              {/* Background track with glow */}
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 shadow-inner">
                <motion.div
                  className="h-2 rounded-full relative overflow-hidden shadow-lg"
                  style={{
                    background: (() => {
                      const progress = toc.length > 0
                        ? ((toc.findIndex(item => item.id === activeId) + 1) / toc.length) * 100
                        : 0;

                      if (progress <= 25) {
                        // Red to Yellow (0-25%)
                        return `linear-gradient(90deg, #ef4444 0%, #f59e0b ${progress * 4}%, #ef4444 100%)`;
                      } else if (progress <= 50) {
                        // Yellow to Orange (25-50%)
                        return `linear-gradient(90deg, #f59e0b 0%, #f97316 ${(progress - 25) * 4}%, #f59e0b 100%)`;
                      } else if (progress <= 75) {
                        // Orange to Light Green (50-75%)
                        return `linear-gradient(90deg, #f97316 0%, #84cc16 ${(progress - 50) * 4}%, #f97316 100%)`;
                      } else {
                        // Light Green to Green (75-100%)
                        return `linear-gradient(90deg, #84cc16 0%, #22c55e ${(progress - 75) * 4}%, #22c55e 100%)`;
                      }
                    })(),
                    boxShadow: (() => {
                      const progress = toc.length > 0
                        ? ((toc.findIndex(item => item.id === activeId) + 1) / toc.length) * 100
                        : 0;

                      if (progress <= 25) return '0 0 8px rgba(239, 68, 68, 0.4)';
                      if (progress <= 50) return '0 0 8px rgba(245, 158, 11, 0.4)';
                      if (progress <= 75) return '0 0 8px rgba(249, 115, 22, 0.4)';
                      return '0 0 8px rgba(34, 197, 94, 0.4)';
                    })()
                  }}
                  initial={{ width: "0%" }}
                  animate={{
                    width: toc.length > 0
                      ? `${((toc.findIndex(item => item.id === activeId) + 1) / toc.length) * 100}%`
                      : "0%"
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Animated shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </div>

              {/* Progress percentage indicator */}
              <motion.div
                className="absolute -top-8 text-xs font-medium px-2 py-1 rounded-md shadow-sm"
                style={{
                  left: `${toc.length > 0 ? ((toc.findIndex(item => item.id === activeId) + 1) / toc.length) * 100 : 0}%`,
                  transform: 'translateX(-50%)',
                  background: (() => {
                    const progress = toc.length > 0
                      ? ((toc.findIndex(item => item.id === activeId) + 1) / toc.length) * 100
                      : 0;

                    if (progress <= 25) return 'rgba(239, 68, 68, 0.1)';
                    if (progress <= 50) return 'rgba(245, 158, 11, 0.1)';
                    if (progress <= 75) return 'rgba(249, 115, 22, 0.1)';
                    return 'rgba(34, 197, 94, 0.1)';
                  })(),
                  color: (() => {
                    const progress = toc.length > 0
                      ? ((toc.findIndex(item => item.id === activeId) + 1) / toc.length) * 100
                      : 0;

                    if (progress <= 25) return '#ef4444';
                    if (progress <= 50) return '#f59e0b';
                    if (progress <= 75) return '#f97316';
                    return '#22c55e';
                  })(),
                  border: (() => {
                    const progress = toc.length > 0
                      ? ((toc.findIndex(item => item.id === activeId) + 1) / toc.length) * 100
                      : 0;

                    if (progress <= 25) return '1px solid rgba(239, 68, 68, 0.2)';
                    if (progress <= 50) return '1px solid rgba(245, 158, 11, 0.2)';
                    if (progress <= 75) return '1px solid rgba(249, 115, 22, 0.2)';
                    return '1px solid rgba(34, 197, 94, 0.2)';
                  })()
                }}
                animate={{
                  left: toc.length > 0
                    ? `${((toc.findIndex(item => item.id === activeId) + 1) / toc.length) * 100}%`
                    : "0%"
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {toc.length > 0 ? Math.round(((toc.findIndex(item => item.id === activeId) + 1) / toc.length) * 100) : 0}%
              </motion.div>
            </div>

            <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>Start</span>
              <span>End</span>
            </div>
          </div>

          {/* Glassy Navigation Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md border border-white/20 dark:border-zinc-700/50 rounded-lg hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md border border-white/20 dark:border-zinc-700/50 rounded-lg hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>Go to bottom</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
