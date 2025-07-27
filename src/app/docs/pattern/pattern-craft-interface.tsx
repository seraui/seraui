"use client";

import { useState, useRef } from "react";
import { Copy, Eye, Check, Search, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { gridPatterns } from "./patterns";
import { CSSProperties } from "react";

// Pattern data structure matching your patterns.ts file
interface Pattern {
  id: string;
  name: string;
  category: "gradients" | "geometric" | "decorative" | "effects";
  description?: string;
  badge?: "New" | "";
  style: CSSProperties;
  code: string;
}

// Component to render pattern preview
function PatternPreview({ pattern }: { pattern: Pattern }) {
  return (
    <div className="w-full h-full" style={pattern.style}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white opacity-80">
            {pattern.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

const categories = [
  { id: "all", label: "All Patterns" },
  { id: "gradients", label: "Gradients" },
  { id: "geometric", label: "Geometric" },
  { id: "decorative", label: "Decorative" },
  { id: "effects", label: "Effects" },
  { id: "favorites", label: "Favorites" },
];

interface PatternCardProps {
  pattern: Pattern;
  onPreview: (pattern: Pattern) => void;
  onCopy: (pattern: Pattern) => void;
  copiedId: string | null;
  isFavorite: boolean;
  onToggleFavorite: (patternId: string) => void;
}

function PatternCard({
  pattern,
  onPreview,
  onCopy,
  copiedId,
  isFavorite,
  onToggleFavorite,
}: PatternCardProps) {
  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1">
      {/* Pattern Preview */}
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={() => onPreview(pattern)}
      >
        <div className="absolute inset-0 scale-110 transition-transform duration-300 group-hover:scale-105">
          <PatternPreview pattern={pattern} />
        </div>

        {/* Overlay with buttons - visible on hover/tap */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 md:gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(pattern);
            }}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-lg text-xs md:text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-lg"
          >
            <Eye size={14} className="md:w-4 md:h-4" />
            <span className="hidden sm:inline">Preview</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(pattern);
            }}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-lg text-xs md:text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-lg"
          >
            {copiedId === pattern.id ? (
              <Check size={14} className="md:w-4 md:h-4" />
            ) : (
              <Copy size={14} className="md:w-4 md:h-4" />
            )}
            <span className="hidden sm:inline">
              {copiedId === pattern.id ? "Copied" : "Copy"}
            </span>
          </button>
        </div>

        {/* New badge and Favorite button */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(pattern.id);
            }}
            className={cn(
              "p-1.5 rounded-full backdrop-blur-sm transition-colors shadow-lg",
              isFavorite
                ? "bg-red-500/90 text-white hover:bg-red-600/90"
                : "bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400"
            )}
          >
            <Heart size={14} className={isFavorite ? "fill-current" : ""} />
          </button>
          {pattern.badge === "New" && (
            <div className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full shadow-lg">
              New
            </div>
          )}
        </div>
      </div>

      {/* Pattern Info */}
      <div className="p-4">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100 text-sm truncate">
          {pattern.name}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 capitalize">
          {pattern.category}
        </p>
      </div>
    </div>
  );
}

export default function PatternCraftInterface() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewPattern, setPreviewPattern] = useState<Pattern | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const previewRef = useRef<HTMLDivElement>(null);

  const filteredPatterns = gridPatterns.filter((pattern) => {
    const matchesCategory =
      selectedCategory === "all" ||
      pattern.category === selectedCategory ||
      (selectedCategory === "favorites" && favorites.has(pattern.id));
    const matchesSearch = pattern.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleFavorite = (patternId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(patternId)) {
        newFavorites.delete(patternId);
      } else {
        newFavorites.add(patternId);
      }
      return newFavorites;
    });
  };

  const handlePreview = (pattern: Pattern) => {
    setPreviewPattern(pattern);
    // Scroll to preview section
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCopy = async (pattern: Pattern) => {
    try {
      // Use the actual code from the pattern
      await navigator.clipboard.writeText(pattern.code);
      setCopiedId(pattern.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      // Fallback copy
      const fallbackContent = `// ${pattern.name} Pattern
${pattern.code}`;
      await navigator.clipboard.writeText(fallbackContent);
      setCopiedId(pattern.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Pattern Library
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Tap on mobile or hover on desktop to see options {" "}
          <span>Inspired by PatternCraft</span>
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              selectedCategory === category.id
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Results Counter */}
      <div className="text-center mb-6">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {filteredPatterns.length} pattern
          {filteredPatterns.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Pattern Grid */}
      {filteredPatterns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredPatterns.map((pattern) => (
            <PatternCard
              key={pattern.id}
              pattern={pattern}
              onPreview={handlePreview}
              onCopy={handleCopy}
              copiedId={copiedId}
              isFavorite={favorites.has(pattern.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 mb-12">
          <div className="text-zinc-400 dark:text-zinc-600 mb-4">
            {selectedCategory === "favorites" ? (
              <Heart size={48} className="mx-auto" />
            ) : (
              <Search size={48} className="mx-auto" />
            )}
          </div>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
            {selectedCategory === "favorites"
              ? "No favorites yet"
              : "No patterns found"}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            {selectedCategory === "favorites"
              ? "Click the heart icon on patterns to add them to your favorites"
              : "Try adjusting your search or category filter"}
          </p>
        </div>
      )}

      {/* Preview Section */}
      {previewPattern && (
        <div
          ref={previewRef}
          className="border-t border-zinc-200 dark:border-zinc-800 pt-12"
        >
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {previewPattern.name}
              </h3>
              {previewPattern.badge === "New" && (
                <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full">
                  New
                </span>
              )}
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-1">
              Full preview of the selected pattern
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 capitalize">
              Category: {previewPattern.category}
            </p>
          </div>

          <div className="relative bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="h-[500px] md:h-[600px] lg:h-[700px]">
              <PatternPreview pattern={previewPattern} />
            </div>

            {/* Preview Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setPreviewPattern(null)}
                className="flex items-center gap-2 px-3 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-lg text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-lg"
              >
                <X size={16} />
                <span className="hidden sm:inline">Close</span>
              </button>
              <button
                onClick={() => handleCopy(previewPattern)}
                className="flex items-center gap-2 px-3 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-lg text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-lg"
              >
                {copiedId === previewPattern.id ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
                {copiedId === previewPattern.id ? "Copied" : "Copy Code"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
