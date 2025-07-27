"use client";
import React, { useState, useEffect } from "react";

const StackerLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z"
      fill="#4F46E5"
    />
    <path d="M19.333 9.333h-6.666v1.334h6.666V9.333z" fill="#fff" />
    <path d="M22.667 15.333h-10v1.334h10v-1.334z" fill="#fff" />
    <path d="M16 21.333h-3.333v1.334H16v-1.334z" fill="#fff" />
  </svg>
);

const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const HeroSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = ["Home", "Solutions", "Product", "Resources", "Pricing"];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-gray-50 dark:bg-black font-sans text-gray-800 dark:text-gray-200 w-full">
      <div className="w-full">
        <header className="py-6 px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between mx-auto">
            <div className="flex items-center gap-2">
              <StackerLogo className="h-8 w-8" />
              <span className="font-bold text-2xl text-gray-900 dark:text-white">
                stacker
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>

            <a
              href="#"
              className="hidden lg:inline-block bg-indigo-600 dark:bg-indigo-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-sm"
            >
              Get Started
            </a>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </nav>
        </header>

        <div
          className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div
            className="absolute inset-0 bg-black/60 dark:bg-black/80"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          <div
            className={`relative z-50 bg-white dark:bg-gray-900 h-full w-4/5 max-w-sm ml-auto p-6 flex flex-col transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-2xl text-gray-900 dark:text-white">
                Menu
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col items-start gap-5">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-lg w-full text-left py-2"
                >
                  {link}
                </a>
              ))}
              <a
                href="#"
                className="w-full mt-6 text-center bg-indigo-600 dark:bg-indigo-500 text-white font-semibold px-5 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-sm"
              >
                Get Started
              </a>
            </nav>
          </div>
        </div>

        <main className="relative flex-1 flex items-center justify-center text-center w-full">
          <div className="relative flex flex-col items-center justify-center py-10 sm:py-16 px-4 max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight max-w-4xl">
              Where your{" "}
              <span className="text-indigo-600 dark:text-indigo-400">data</span>{" "}
              turns into software with a click
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Build custom portals, CRMs, and tools effortlessly. From concept
              to launch in minutes, not months.
            </p>
            <button className="mt-8 flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-md transform hover:scale-105">
              <PlayIcon className="h-6 w-6" />
              <span>Watch Demo</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HeroSection;
