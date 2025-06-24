"use client";
import React, { useState } from "react";
import { ThemeSwitcher } from "./theme";
import Link from "next/link";
import { LoadingLink } from "@/components/ui";
import { GitHubIcon } from "@/assets/icons/github";
import { XIcon } from "@/assets/icons/x";

import { AnimatePresence, motion } from "motion/react";
import { SidebarMobile } from "./sidebar-mobile";
import { X } from "lucide-react";
import { Logo } from "@/assets/icons/logo";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: sidebarOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 z-40 h-full w-4/5 bg-zinc-50 dark:bg-zinc-950 md:hidden"
      >
        <div className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-6 fill-rose-500" />
            <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
              Berlix&nbsp;UI
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-zinc-900 dark:text-zinc-100"
          >
            <X className="size-5" />
          </button>
        </div>
        <SidebarMobile onClose={() => setSidebarOpen(false)} />
      </motion.div>

      <div className="w-full sticky top-0 z-20 bg-transparent backdrop-blur-lg border-b border-gray-200 dark:border-zinc-800">
        <header className="mx-auto max-w-[1536px] h-14 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              {
                <button
                  onClick={toggleSidebar}
                  className="flex flex-col items-start gap-1 md:hidden"
                >
                  <span className="w-5 h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
                  <span className="w-3 h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
                  <span className="w-4 h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
                </button>
              }

              <LoadingLink href="/" className="flex items-center gap-2">
                <Logo className="size-6 fill-rose-500" />
                <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                  Berlix&nbsp;UI
                </span>
              </LoadingLink>
            </div>
            <nav className=" hidden md:flex items-center gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
              <LoadingLink
                className="hover:text-zinc-900 dark:hover:text-zinc-50"
                href="/docs"
              >
                Docs
              </LoadingLink>
              <LoadingLink
                className="hover:text-zinc-900 dark:hover:text-zinc-50"
                href="/docs/text-circle"
              >
                Components
              </LoadingLink>
            </nav>
          </div>
          <nav className="flex items-center space-x-3">
            <Link
              href="https://x.com/rechesoares13"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200"
              aria-label="X (Twitter)"
            >
              <XIcon className="h-4 w-4 fill-zinc-950 dark:fill-zinc-50" />
            </Link>
            <Link
              href="https://github.com/reche13/berlix"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-4 w-4 fill-zinc-950 dark:fill-zinc-50" />
            </Link>
            <ThemeSwitcher />
          </nav>
        </header>
      </div>
    </>
  );
};

export default Header;
