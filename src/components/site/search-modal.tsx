"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Command, FileText, Home, Settings } from "lucide-react";
import { getAllSearchableItems, searchItems, SearchableItem } from "@/lib/search-registry";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Icon mapping for different categories and items
const getItemIcon = (item: SearchableItem) => {
  const title = item.title.toLowerCase();
  
  if (title.includes("introduction") || title.includes("home")) {
    return <Home className="w-4 h-4" />;
  }
  if (title.includes("installation") || title.includes("setup")) {
    return <Settings className="w-4 h-4" />;
  }
  return <FileText className="w-4 h-4" />;
};

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allItems] = useState(() => {
    const items = getAllSearchableItems();
    console.log(`🔍 Search Modal: Loaded ${items.length} total items`);
    console.log(`🔍 Components: ${items.filter(item => item.category === 'Components').length}`);
    return items;
  });
  const [filteredItems, setFilteredItems] = useState<SearchableItem[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Update filtered items when query changes
  useEffect(() => {
    if (query.trim()) {
      const results = searchItems(query, allItems);
      setFilteredItems(results); // Show all search results
    } else {
      // Show all components when no query, grouped by category
      const componentItems = allItems.filter(item => item.category === 'Components');
      const otherItems = allItems.filter(item => item.category !== 'Components');
      setFilteredItems([...componentItems, ...otherItems]); // Show all items, components first
    }
    setSelectedIndex(0);
  }, [query, allItems]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => 
            prev < filteredItems.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            window.location.href = filteredItems[selectedIndex].href;
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
      >
        <div className="flex items-start justify-center pt-[10vh] px-4">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 dark:border-zinc-800/50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/20 dark:border-zinc-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search components and documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 outline-none text-lg"
              />
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="px-2 py-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded text-zinc-600 dark:text-zinc-400 border border-white/20 dark:border-zinc-700/50">
                  {filteredItems.length} results
                </span>
                <kbd className="px-2 py-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded text-zinc-600 dark:text-zinc-400 border border-white/20 dark:border-zinc-700/50">
                  <Command className="w-3 h-3 inline mr-1" />K
                </kbd>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[500px] overflow-y-auto bg-white/30 dark:bg-black/30 backdrop-blur-sm">
              {filteredItems.length > 0 ? (
                <div className="py-2">
                  {filteredItems.map((item, index) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 hover:bg-white/50 dark:hover:bg-zinc-900/50 transition-colors ${
                        index === selectedIndex
                          ? "bg-white/50 dark:bg-zinc-900/50"
                          : ""
                      }`}
                    >
                      <div className="flex-shrink-0 text-zinc-500">
                        {getItemIcon(item)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                          {item.title}
                        </div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                          {item.description}
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-xs text-zinc-400 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm px-2 py-1 rounded border border-white/20 dark:border-zinc-700/50">
                        {item.category}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-zinc-500">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No results found for &quot;{query}&quot;</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/20 dark:border-zinc-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded border border-white/20 dark:border-zinc-700/50">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded border border-white/20 dark:border-zinc-700/50">↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded border border-white/20 dark:border-zinc-700/50">↵</kbd>
                    to select
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded border border-white/20 dark:border-zinc-700/50">esc</kbd>
                  to close
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
