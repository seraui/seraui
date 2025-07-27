"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";

const SeraUIHero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const Dropdown = ({
    title,
    children,
    isOpen,
    onToggle,
  }: {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
  }) => {
    return (
      <div className="relative">
        <div onClick={onToggle} className="cursor-pointer">
          <div className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors">
            <span>{title}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </div>
        {isOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-slate-700 focus:outline-none z-30">
            <div className="py-1">{children}</div>
          </div>
        )}
      </div>
    );
  };

  const DropdownItem = ({
    children,
    href = "#",
  }: {
    children: React.ReactNode;
    href?: string;
  }) => (
    <a
      href={href}
      className="text-slate-700 dark:text-slate-200 block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
    >
      {children}
    </a>
  );

  const handleDropdownToggle = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <nav
        ref={navRef}
        className="relative z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Sera UI
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <Dropdown
                title="Products"
                isOpen={openDropdown === "Products"}
                onToggle={() => handleDropdownToggle("Products")}
              >
                <DropdownItem>Analytics</DropdownItem>
                <DropdownItem>Engagement</DropdownItem>
                <DropdownItem>Automation</DropdownItem>
              </Dropdown>
              <Dropdown
                title="Solutions"
                isOpen={openDropdown === "Solutions"}
                onToggle={() => handleDropdownToggle("Solutions")}
              >
                <DropdownItem>For Startups</DropdownItem>
                <DropdownItem>For Enterprise</DropdownItem>
                <DropdownItem>For Developers</DropdownItem>
              </Dropdown>
              <Dropdown
                title="Resources"
                isOpen={openDropdown === "Resources"}
                onToggle={() => handleDropdownToggle("Resources")}
              >
                <DropdownItem>Blog</DropdownItem>
                <DropdownItem>Documentation</DropdownItem>
                <DropdownItem>Help Center</DropdownItem>
              </Dropdown>
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
              >
                Price
              </a>
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
              >
                Contact
              </a>
              <button className="h-9 px-4 py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors">
                Login
              </button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500 dark:focus:ring-slate-400"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
              >
                Products
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
              >
                Solutions
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
              >
                Resources
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
              >
                Price
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
              >
                Contact
              </a>
              <button className="mt-4 w-full h-10 px-4 py-2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors">
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32">
          <div className="flex justify-center mb-6">
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1 text-xs sm:text-sm font-medium hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex -space-x-2">
                <img
                  className="w-5 h-5 rounded-full border border-white dark:border-slate-800"
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User 1"
                />
                <img
                  className="w-5 h-5 rounded-full border border-white dark:border-slate-800"
                  src="https://i.pravatar.cc/150?img=2"
                  alt="User 2"
                />
                <img
                  className="w-5 h-5 rounded-full border border-white dark:border-slate-800"
                  src="https://i.pravatar.cc/150?img=3"
                  alt="User 3"
                />
              </div>
              <span className="text-slate-600 dark:text-slate-300 hidden sm:inline">
                Build Beautiful Interfaces with Sera UI
              </span>
              <span className="text-slate-600 dark:text-slate-300 sm:hidden">
                Explore The Platform
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </a>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              Build Beautiful Interfaces
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl md:max-w-3xl mx-auto mb-10">
              Modern React components designed for speed and elegance. Create
              stunning user experiences with our comprehensive design system
              that scales with your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="h-11 px-8 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 inline-flex items-center justify-center rounded-md text-base font-medium transition-colors">
                Get a Demo
              </button>
              <button className="h-11 px-8 bg-white text-slate-900 border border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700 inline-flex items-center justify-center rounded-md text-base font-medium transition-colors">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeraUIHero;
