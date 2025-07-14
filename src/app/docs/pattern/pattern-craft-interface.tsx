'use client'

import { useState, useRef } from 'react';
import { Copy, Eye, Check, Search, X, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import all pattern components
import Pattern from "./grid"
import TFGrid from "./tfgrid"
import BFGrid from "./bfgrid"
import AzureDepths from "./azure-depths"
import DotGrid from "./dot-grid"
import CircuitBoard from "./circuit-board"
import RadialGlow from "./radial-glow"
import DiagonalGrid from "./diagonal-grid"
import MatrixGreen from "./matrix-green"
import NoiseTexture from "./noise-texture"
import BottomGradientRadial from "./bottom-gradient-radial"
import TealGlow from "./teal-glow"
import CrimsonDepth from "./crimson-depth"
import DualGradientOverlay from "./dual-gradient-overlay"
import AuroraMidnightGlow from "./aurora-midnight-glow"
import MatrixGreenAdvanced from "./matrix-green-advanced"
import CircuitBoardAdvanced from "./circuit-board-advanced"
import DiagonalSynthwave from "./diagonal-synthwave"
import PaperTexture from "./paper-texture"

// New PatternCraft patterns
import TopGradientRadial from "./top-gradient-radial"
import BottomVioletRadial from "./bottom-violet-radial"
import BottomSlateRadial from "./bottom-slate-radial"
import PinkGlow from "./pink-glow"
import AmberGlow from "./amber-glow"
import EmeraldGlow from "./emerald-glow"
import DarkHorizonGlow from "./dark-horizon-glow"
import EmeraldVoid from "./emerald-void"
import VioletAbyss from "./violet-abyss"
import OrchidDepths from "./orchid-depths"
import PurpleGradientGridRight from "./purple-gradient-grid-right"
import PurpleGradientGridLeft from "./purple-gradient-grid-left"
import DualGradientOverlayStrong from "./dual-gradient-overlay-strong"
import DarkRadialGlow from "./dark-radial-glow"
import BlueRadialGlow from "./blue-radial-glow"
import PurpleRadialGlow from "./purple-radial-glow"
import EmeraldRadialGlow from "./emerald-radial-glow"
import DiagonalStripes from "./diagonal-stripes"
import WhiteGridDots from "./white-grid-dots"
import DarkDottedGrid from "./dark-dotted-grid"

// Pattern data structure
interface PatternData {
  id: string;
  name: string;
  component: React.ComponentType;
  category: 'gradients' | 'geometric' | 'effects' | 'decorative';
  filePath: string;
  isNew?: boolean;
}

const patterns: PatternData[] = [
  // Existing patterns
  { id: 'basic-grid', name: 'Basic Grid', component: Pattern, category: 'geometric', filePath: 'src/app/docs/pattern/grid.tsx' },
  { id: 'top-fade-grid', name: 'Top Fade Grid', component: TFGrid, category: 'geometric', filePath: 'src/app/docs/pattern/tfgrid.tsx', isNew: true },
  { id: 'bottom-fade-grid', name: 'Bottom Fade Grid', component: BFGrid, category: 'geometric', filePath: 'src/app/docs/pattern/bfgrid.tsx', isNew: true },
  { id: 'dot-grid', name: 'Dot Grid', component: DotGrid, category: 'geometric', filePath: 'src/app/docs/pattern/dot-grid.tsx' },
  { id: 'diagonal-grid', name: 'Diagonal Grid', component: DiagonalGrid, category: 'geometric', filePath: 'src/app/docs/pattern/diagonal-grid.tsx' },
  { id: 'azure-depths', name: 'Azure Depths', component: AzureDepths, category: 'gradients', filePath: 'src/app/docs/pattern/azure-depths.tsx', isNew: true },
  { id: 'radial-glow', name: 'Radial Glow', component: RadialGlow, category: 'gradients', filePath: 'src/app/docs/pattern/radial-glow.tsx' },
  { id: 'bottom-gradient-radial', name: 'Bottom Gradient Radial', component: BottomGradientRadial, category: 'gradients', filePath: 'src/app/docs/pattern/bottom-gradient-radial.tsx', isNew: true },
  { id: 'teal-glow', name: 'Teal Glow', component: TealGlow, category: 'gradients', filePath: 'src/app/docs/pattern/teal-glow.tsx', isNew: true },
  { id: 'crimson-depth', name: 'Crimson Depth', component: CrimsonDepth, category: 'gradients', filePath: 'src/app/docs/pattern/crimson-depth.tsx', isNew: true },
  { id: 'dual-gradient-overlay', name: 'Dual Gradient Overlay', component: DualGradientOverlay, category: 'gradients', filePath: 'src/app/docs/pattern/dual-gradient-overlay.tsx', isNew: true },
  { id: 'aurora-midnight-glow', name: 'Aurora Midnight Glow', component: AuroraMidnightGlow, category: 'effects', filePath: 'src/app/docs/pattern/aurora-midnight-glow.tsx', isNew: true },
  { id: 'circuit-board', name: 'Circuit Board', component: CircuitBoard, category: 'effects', filePath: 'src/app/docs/pattern/circuit-board.tsx' },
  { id: 'matrix-green', name: 'Matrix Green', component: MatrixGreen, category: 'effects', filePath: 'src/app/docs/pattern/matrix-green.tsx', isNew: true },
  { id: 'matrix-green-advanced', name: 'Matrix Green Advanced', component: MatrixGreenAdvanced, category: 'effects', filePath: 'src/app/docs/pattern/matrix-green-advanced.tsx', isNew: true },
  { id: 'circuit-board-advanced', name: 'Circuit Board Advanced', component: CircuitBoardAdvanced, category: 'effects', filePath: 'src/app/docs/pattern/circuit-board-advanced.tsx', isNew: true },
  { id: 'diagonal-synthwave', name: 'Diagonal Synthwave', component: DiagonalSynthwave, category: 'effects', filePath: 'src/app/docs/pattern/diagonal-synthwave.tsx', isNew: true },
  { id: 'noise-texture', name: 'Noise Texture', component: NoiseTexture, category: 'decorative', filePath: 'src/app/docs/pattern/noise-texture.tsx', isNew: true },
  { id: 'paper-texture', name: 'Paper Texture', component: PaperTexture, category: 'decorative', filePath: 'src/app/docs/pattern/paper-texture.tsx', isNew: true },

  // New PatternCraft patterns
  { id: 'top-gradient-radial', name: 'Top Gradient Radial', component: TopGradientRadial, category: 'gradients', filePath: 'src/app/docs/pattern/top-gradient-radial.tsx', isNew: true },
  { id: 'bottom-violet-radial', name: 'Bottom Violet Radial', component: BottomVioletRadial, category: 'gradients', filePath: 'src/app/docs/pattern/bottom-violet-radial.tsx', isNew: true },
  { id: 'bottom-slate-radial', name: 'Bottom Slate Radial', component: BottomSlateRadial, category: 'gradients', filePath: 'src/app/docs/pattern/bottom-slate-radial.tsx', isNew: true },
  { id: 'pink-glow', name: 'Pink Glow', component: PinkGlow, category: 'gradients', filePath: 'src/app/docs/pattern/pink-glow.tsx', isNew: true },
  { id: 'amber-glow', name: 'Amber Glow', component: AmberGlow, category: 'gradients', filePath: 'src/app/docs/pattern/amber-glow.tsx', isNew: true },
  { id: 'emerald-glow', name: 'Emerald Glow', component: EmeraldGlow, category: 'gradients', filePath: 'src/app/docs/pattern/emerald-glow.tsx', isNew: true },
  { id: 'dark-horizon-glow', name: 'Dark Horizon Glow', component: DarkHorizonGlow, category: 'gradients', filePath: 'src/app/docs/pattern/dark-horizon-glow.tsx', isNew: true },
  { id: 'emerald-void', name: 'Emerald Void', component: EmeraldVoid, category: 'gradients', filePath: 'src/app/docs/pattern/emerald-void.tsx', isNew: true },
  { id: 'violet-abyss', name: 'Violet Abyss', component: VioletAbyss, category: 'gradients', filePath: 'src/app/docs/pattern/violet-abyss.tsx', isNew: true },
  { id: 'orchid-depths', name: 'Orchid Depths', component: OrchidDepths, category: 'gradients', filePath: 'src/app/docs/pattern/orchid-depths.tsx', isNew: true },
  { id: 'purple-gradient-grid-right', name: 'Purple Gradient Grid Right', component: PurpleGradientGridRight, category: 'geometric', filePath: 'src/app/docs/pattern/purple-gradient-grid-right.tsx', isNew: true },
  { id: 'purple-gradient-grid-left', name: 'Purple Gradient Grid Left', component: PurpleGradientGridLeft, category: 'geometric', filePath: 'src/app/docs/pattern/purple-gradient-grid-left.tsx', isNew: true },
  { id: 'dual-gradient-overlay-strong', name: 'Dual Gradient Overlay Strong', component: DualGradientOverlayStrong, category: 'geometric', filePath: 'src/app/docs/pattern/dual-gradient-overlay-strong.tsx', isNew: true },
  { id: 'dark-radial-glow', name: 'Dark Radial Glow', component: DarkRadialGlow, category: 'gradients', filePath: 'src/app/docs/pattern/dark-radial-glow.tsx', isNew: true },
  { id: 'blue-radial-glow', name: 'Blue Radial Glow', component: BlueRadialGlow, category: 'gradients', filePath: 'src/app/docs/pattern/blue-radial-glow.tsx', isNew: true },
  { id: 'purple-radial-glow', name: 'Purple Radial Glow', component: PurpleRadialGlow, category: 'gradients', filePath: 'src/app/docs/pattern/purple-radial-glow.tsx', isNew: true },
  { id: 'emerald-radial-glow', name: 'Emerald Radial Glow', component: EmeraldRadialGlow, category: 'gradients', filePath: 'src/app/docs/pattern/emerald-radial-glow.tsx', isNew: true },
  { id: 'diagonal-stripes', name: 'Diagonal Stripes', component: DiagonalStripes, category: 'geometric', filePath: 'src/app/docs/pattern/diagonal-stripes.tsx', isNew: true },
  { id: 'white-grid-dots', name: 'White Grid with Dots', component: WhiteGridDots, category: 'geometric', filePath: 'src/app/docs/pattern/white-grid-dots.tsx', isNew: true },
  { id: 'dark-dotted-grid', name: 'Dark Dotted Grid', component: DarkDottedGrid, category: 'geometric', filePath: 'src/app/docs/pattern/dark-dotted-grid.tsx', isNew: true },
];

const categories = [
  { id: 'all', label: 'All Patterns' },
  { id: 'gradients', label: 'Gradients' },
  { id: 'geometric', label: 'Geometric' },
  { id: 'decorative', label: 'Decorative' },
  { id: 'effects', label: 'Effects' },
  { id: 'favorites', label: 'Favorites' },
];

interface PatternCardProps {
  pattern: PatternData;
  onPreview: (pattern: PatternData) => void;
  onCopy: (pattern: PatternData) => void;
  copiedId: string | null;
  isFavorite: boolean;
  onToggleFavorite: (patternId: string) => void;
}

function PatternCard({ pattern, onPreview, onCopy, copiedId, isFavorite, onToggleFavorite }: PatternCardProps) {
  const Component = pattern.component;

  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1">
      {/* Pattern Preview */}
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onPreview(pattern)}>
        <div className="absolute inset-0 scale-110 transition-transform duration-300 group-hover:scale-105">
          <Component />
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
            {copiedId === pattern.id ? <Check size={14} className="md:w-4 md:h-4" /> : <Copy size={14} className="md:w-4 md:h-4" />}
            <span className="hidden sm:inline">{copiedId === pattern.id ? 'Copied' : 'Copy'}</span>
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
          {pattern.isNew && (
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewPattern, setPreviewPattern] = useState<PatternData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const previewRef = useRef<HTMLDivElement>(null);

  const filteredPatterns = patterns.filter(pattern => {
    const matchesCategory = selectedCategory === 'all' ||
                           pattern.category === selectedCategory ||
                           (selectedCategory === 'favorites' && favorites.has(pattern.id));
    const matchesSearch = pattern.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleFavorite = (patternId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(patternId)) {
        newFavorites.delete(patternId);
      } else {
        newFavorites.add(patternId);
      }
      return newFavorites;
    });
  };

  const handlePreview = (pattern: PatternData) => {
    setPreviewPattern(pattern);
    // Scroll to preview section
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCopy = async (pattern: PatternData) => {
    try {
      // Fetch the actual file content
      const response = await fetch(`/api/get-file-content?path=${encodeURIComponent(pattern.filePath)}`);
      let codeContent: string;

      if (response.ok) {
        const data = await response.json();
        codeContent = data.content;
      } else {
        // Fallback to a template if file reading fails
        codeContent = `// ${pattern.name} Pattern
// File: ${pattern.filePath}
// Copy this component to your project

'use client'
export default function ${pattern.name.replace(/\s+/g, '')}() {
  // Pattern implementation here
  return (
    <div className="min-h-screen w-full">
      {/* Pattern content */}
    </div>
  );
}`;
      }

      await navigator.clipboard.writeText(codeContent);
      setCopiedId(pattern.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback copy
      const fallbackContent = `// ${pattern.name} Pattern - Please check ${pattern.filePath} for the actual implementation`;
      await navigator.clipboard.writeText(fallbackContent);
      setCopiedId(pattern.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          {patterns.length} patterns
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Pattern Library
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Tap on mobile or hover on desktop to see options
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
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
          {filteredPatterns.length} pattern{filteredPatterns.length !== 1 ? 's' : ''} found
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
            {selectedCategory === 'favorites' ? (
              <Heart size={48} className="mx-auto" />
            ) : (
              <Search size={48} className="mx-auto" />
            )}
          </div>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
            {selectedCategory === 'favorites' ? 'No favorites yet' : 'No patterns found'}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            {selectedCategory === 'favorites'
              ? 'Click the heart icon on patterns to add them to your favorites'
              : 'Try adjusting your search or category filter'
            }
          </p>
        </div>
      )}

      {/* Preview Section */}
      {previewPattern && (
        <div ref={previewRef} className="border-t border-zinc-200 dark:border-zinc-800 pt-12">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {previewPattern.name}
              </h3>
              {previewPattern.isNew && (
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
            <div className="h-96 md:h-[500px]">
              <previewPattern.component />
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
                {copiedId === previewPattern.id ? <Check size={16} /> : <Copy size={16} />}
                {copiedId === previewPattern.id ? 'Copied' : 'Copy Code'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
