"use client";
import React, { useState, useEffect } from "react";
import { ThemeSwitcher } from "./theme";
import Link from "next/link";
import { GitHubIcon } from "@/assets/icons/github";

import { AnimatePresence, motion } from "motion/react";
import { SidebarMobile } from "./sidebar-mobile";
import {
  X,
  LinkedinIcon,
  BookOpen,
  MessageCircle,
  Heart,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/assets/icons/logo";
import { SearchModal } from "./search-modal";

// Support Alert Banner Component
const SupportAlertBanner = () => {
  const [isVisible, setIsVisible] = useState(() => {
    // Check if user has previously dismissed the banner
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem(
        "sera-ui-support-banner-dismissed"
      );
      return !dismissed;
    }
    return true;
  });

  const handleClose = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("sera-ui-support-banner-dismissed", "true");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white relative z-[9999]">
      <div className="mx-auto max-w-[1536px] px-4 md:px-6 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Heart className="h-4 w-4 fill-current animate-pulse" />
            <span className="font-medium">
              We&apos;re hitting Vercel&apos;s free tier limits! Help keep Sera
              UI alive.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/sponsor"
              className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-medium transition-colors duration-200"
            >
              <Heart className="h-3 w-3" />
              Sponsor
              <ExternalLink className="h-3 w-3" />
            </Link>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// GitHub Star Badge Component with Caching
const GitHubStarBadge = ({ repo }: { repo: string }) => {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const now = Date.now();
        const cacheKey = `github-stars-${repo}`;
        const cacheTimeKey = `github-stars-time-${repo}`;

        // Check cache first (cache for 1 hour = 3600000ms)
        if (typeof window !== "undefined") {
          const cached = localStorage.getItem(cacheKey);
          const cacheTime = localStorage.getItem(cacheTimeKey);

          if (cached && cacheTime && now - parseInt(cacheTime) < 3600000) {
            setStars(parseInt(cached));
            setLoading(false);
            return;
          }
        }

        console.log("Fetching stars for repo:", repo);
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        console.log("Response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Star count:", data.stargazers_count);
          setStars(data.stargazers_count);

          // Cache the result
          if (typeof window !== "undefined") {
            localStorage.setItem(cacheKey, data.stargazers_count.toString());
            localStorage.setItem(cacheTimeKey, now.toString());
          }
        } else {
          console.error("Failed to fetch stars, status:", response.status);
          setStars(0);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stars:", error);
        setStars(0);
      } finally {
        setLoading(false);
      }
    };

    fetchStars();
  }, [repo]);

  const formatStars = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  if (loading) {
    return (
      <Link
        href="https://github.com/seraui/seraui"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200"
        aria-label="GitHub"
      >
        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 animate-pulse">
          ...
        </span>
        <GitHubIcon className="h-4 w-4 fill-zinc-950 dark:fill-zinc-50" />
      </Link>
    );
  }

  return (
    <Link
      href="https://github.com/seraui/seraui"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200"
      aria-label="GitHub"
    >
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {stars !== null ? formatStars(stars) : "N/A"}
      </span>
      <GitHubIcon className="h-4 w-4 fill-zinc-950 dark:fill-zinc-50" />
    </Link>
  );
};

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Keyboard shortcut for search (Cmd+K on Mac, Ctrl+K on Windows/Linux)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <SupportAlertBanner />
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
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                Sera&nbsp;UI
              </span>
              <span className="px-2 py-0.5 text-xs font-medium bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full text-zinc-700 dark:text-zinc-300">
                1.0
              </span>
            </div>
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
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                    Sera&nbsp;UI
                  </span>
                  <span className="px-2 py-0.5 text-xs font-medium bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full text-zinc-700 dark:text-zinc-300">
                    1.0
                  </span>
                </div>
              </Link>
            </div>
            <nav className=" hidden md:flex items-center gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
              <Link
                className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                href="/docs"
              >
                <BookOpen className="h-4 w-4" />
                Docs
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                href="https://ai.seraprogrammer.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Sera Chat
              </Link>
            </nav>
          </div>
          <nav className="flex items-center space-x-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-between gap-3 px-3 py-2 h-9 rounded-md bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-300/50 dark:border-zinc-800 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-all duration-200 text-left md:min-w-[280px] cursor-pointer backdrop-blur-sm"
              aria-label="Search"
            >
              <div className="flex items-center gap-2">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-zinc-600 dark:text-zinc-400 flex-shrink-0"
                >
                  <path
                    d="M10 3.347c1.138 0 2.213.266 3.163.739-.255.462-.74.764-1.283.787l-.87.036A5.636 5.636 0 0010 4.818c-3.038 0-5.5 2.415-5.5 5.394 0 2.906 2.344 5.276 5.279 5.39l.221.004.221-.004c2.935-.114 5.279-2.484 5.279-5.39l-.003-.13.082-.215c.2-.524.676-.893 1.234-.967l.058-.005a6.771 6.771 0 01-.803 4.742 2.849 2.849 0 012.076.657l.157.143 1.872 1.836a2.731 2.731 0 010 3.916 2.864 2.864 0 01-3.852.13l-.14-.13-1.872-1.836a2.732 2.732 0 01-.818-2.19 7.062 7.062 0 01-3.491.914c-3.866 0-7-3.073-7-6.865 0-3.791 3.134-6.865 7-6.865zm5.37 12.13a1.28 1.28 0 00-.097 1.73l.096.106 1.872 1.836c.241.236.552.362.868.378h.135l.135-.013c.269-.04.527-.162.733-.365a1.28 1.28 0 00.097-1.73l-.097-.106-1.871-1.835a1.342 1.342 0 00-1.872 0zm.05-12.056l.044 1.013a2.493 2.493 0 001.648 2.225l.97.355c.457.167.35.83-.138.85l-1.033.044a2.592 2.592 0 00-.304.03l-.05.01c-.08.014-.159.032-.236.054l-.147.046-.18.07-.168.08-.113.063-.141.09-.164.121-.032.026c-.323.27-.579.62-.734 1.026l-.361.95a.43.43 0 01-.373.285h-.078l-.077-.012a.429.429 0 01-.34-.407l-.044-1.014a2.493 2.493 0 00-1.648-2.224l-.97-.355c-.457-.167-.35-.83.138-.85l1.034-.044c.3-.013.588-.077.855-.185l.109-.048c.175-.08.34-.178.49-.294l.148-.122.12-.114.136-.152.045-.056.078-.104.055-.082-.03.046a2.47 2.47 0 00.262-.505l.362-.95c.17-.45.846-.345.867.134z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
                <span className="hidden md:inline text-sm text-zinc-600 dark:text-zinc-400">
                  Search
                </span>
              </div>
              <div className="hidden md:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-xs font-mono bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 rounded border border-zinc-300/50 dark:border-zinc-700/50">
                  Ctrl
                </kbd>
                <span className="text-xs text-zinc-500">+</span>
                <kbd className="px-1.5 py-0.5 text-xs font-mono bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 rounded border border-zinc-300/50 dark:border-zinc-700/50">
                  K
                </kbd>
              </div>
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
            <GitHubStarBadge repo="seraui/seraui" />
            <ThemeSwitcher />
          </nav>
        </header>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
