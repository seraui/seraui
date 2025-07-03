"use client";
import React, { useState, useEffect } from "react";
import { ThemeSwitcher } from "./theme";
import Link from "next/link";
import { GitHubIcon } from "@/assets/icons/github";

import { AnimatePresence, motion } from "motion/react";
import { SidebarMobile } from "./sidebar-mobile";
import { X, Search, LinkedinIcon } from "lucide-react";
import { Logo } from "@/assets/icons/logo";
import { SearchModal } from "./search-modal";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Keyboard shortcut for search (Cmd+K on Mac, Ctrl+K on Windows/Linux)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
              Sera&nbsp;UI
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

      <div className="w-full sticky top-0 z-[9998] bg-transparent backdrop-blur-lg border-b border-gray-200 dark:border-zinc-800">
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

              <Link href="/" className="flex items-center gap-2">
                <Logo className="size-6 fill-rose-500" />
                <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                  Sera&nbsp;UI
                </span>
              </Link>
            </div>
            <nav className=" hidden md:flex items-center gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
              <Link
                className="hover:text-zinc-900 dark:hover:text-zinc-50"
                href="/docs"
              >
                Docs
              </Link>
              <Link
                className="hover:text-zinc-900 dark:hover:text-zinc-50"
                href="/docs/tabs"
              >
                Components
              </Link>
              <Link
                className="hover:text-zinc-900 dark:hover:text-zinc-50"
                href="/tools"
              >
                Tools
              </Link>
            </nav>
          </div>
          <nav className="flex items-center space-x-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 text-left md:min-w-[200px] cursor-pointer"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
              <span className="hidden md:inline text-sm text-zinc-500 dark:text-zinc-400 truncate">
                Search...
              </span>
            </button>
            <Link
              href="https://www.linkedin.com/in/codernazmulhossain/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200"
              aria-label="Linkedin"
            >
              <LinkedinIcon className="h-4 w-4 fill-zinc-950 dark:fill-zinc-50" />
            </Link>
            <Link
              href="https://github.com/seraprogrammer"
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

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
};

export default Header;
