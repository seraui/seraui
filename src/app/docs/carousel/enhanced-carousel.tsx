"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, PanInfo, AnimatePresence } from 'framer-motion';

// --- Types ---
interface CardData {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
}

interface IconProps {
  className?: string;
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

interface CardProps {
  card: CardData;
  index: number;
  activeIndex: number;
  totalCards: number;
  onClick?: () => void;
}

// --- Helper Components & Icons ---

const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.93 2.25 12 7.5l2.07-5.25a.5.5 0 0 1 .9 0L17.25 8.5l4.16.34a.5.5 0 0 1 .29.88l-3.2 3.1.95 4.5a.5.5 0 0 1-.73.53L12 14.5l-3.72 2.33a.5.5 0 0 1-.73-.53l.95-4.5-3.2-3.1a.5.5 0 0 1 .29-.88l4.16-.34Z" />
  </svg>
);

const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

const PlayIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5,3 19,12 5,21"/></svg>
);

const PauseIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
);

const MaximizeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
);

const MinimizeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
);

const Badge: React.FC<BadgeProps> = ({ children, className }) => (
  <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${className}`}>
    {children}
  </div>
);

// --- Enhanced Carousel Data ---
const cardData: CardData[] = [
  { 
    id: 1, 
    imageUrl: 'https://i.pinimg.com/736x/d6/8a/12/d68a121e960094f99ad8acd37505fb7d.jpg', 
    title: 'Crimson Forest',
    description: 'A mystical forest bathed in crimson light, home to ancient spirits and magical creatures.',
    category: 'Nature'
  },
  { 
    id: 2, 
    imageUrl: 'https://i.pinimg.com/736x/21/16/f7/2116f71f9d51d875e44d809f074ff079.jpg', 
    title: 'Misty Mountains',
    description: 'Towering peaks shrouded in ethereal mist, where the air is pure and the views are endless.',
    category: 'Landscape'
  },
  { 
    id: 3, 
    imageUrl: 'https://i.pinimg.com/1200x/fe/c2/0d/fec20d2958059b8463bffb138d4eaac6.jpg', 
    title: 'Floating Islands',
    description: 'Mysterious islands suspended in the sky, defying gravity with their otherworldly beauty.',
    category: 'Fantasy'
  },
  { 
    id: 4, 
    imageUrl: 'https://i.pinimg.com/736x/84/dc/62/84dc62de850a34a9d420c97f3a2d58f4.jpg', 
    title: 'Crystal Cave',
    description: 'A hidden cavern filled with luminescent crystals that glow with an inner light.',
    category: 'Underground'
  },
  { 
    id: 5, 
    imageUrl: 'https://i.pinimg.com/1200x/be/c3/7e/bec37e2c43e703f922f887db2578ce2e.jpg', 
    title: 'Sunset Peaks',
    description: 'Golden hour transforms these majestic mountains into a painter\'s dream canvas.',
    category: 'Landscape'
  },
  { 
    id: 6, 
    imageUrl: 'https://i.pinimg.com/736x/47/dd/47/47dd47b0d66c2fa641e03e370bcb5433.jpg', 
    title: 'Night Sky',
    description: 'A celestial tapestry of stars and galaxies stretching across the infinite cosmos.',
    category: 'Space'
  },
  { 
    id: 7, 
    imageUrl: 'https://i.pinimg.com/736x/05/01/bc/0501bcd327d9df915e83154bbf9456e3.jpg', 
    title: 'Ancient Ruins',
    description: 'Time-worn structures that whisper secrets of civilizations long forgotten.',
    category: 'History'
  },
  { 
    id: 8, 
    imageUrl: 'https://i.pinimg.com/736x/c1/46/be/c146bebffca026d2c4fa76cc85aac917.jpg', 
    title: 'Magical Tree',
    description: 'A sentient tree with branches that reach toward the heavens, pulsing with magical energy.',
    category: 'Fantasy'
  },
  { 
    id: 9, 
    imageUrl: 'https://i.pinimg.com/736x/91/7a/51/917a51df0d444def3cade8d626305a67.jpg', 
    title: 'Celestial Waters',
    description: 'Waters that mirror the night sky, creating a perfect reflection of the universe above.',
    category: 'Nature'
  },
];

// --- Enhanced Carousel Component ---
export default function EnhancedCarousel() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(cardData.length / 2));
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState(4000);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to go to the next slide
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cardData.length);
  }, []);

  // Function to manually change slide and reset autoplay
  const changeSlide = useCallback((newIndex: number) => {
    const newSafeIndex = (newIndex + cardData.length) % cardData.length;
    setActiveIndex(newSafeIndex);
    // Reset autoplay timer on manual interaction
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplaySpeed);
    }
  }, [isPaused, autoplaySpeed, goToNext]);

  // Set up and clear autoplay interval
  useEffect(() => {
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplaySpeed);
    }
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, activeIndex, autoplaySpeed, goToNext]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          changeSlide(activeIndex - 1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          changeSlide(activeIndex + 1);
          break;
        case ' ':
          event.preventDefault();
          setIsPaused(prev => !prev);
          break;
        case 'Escape':
          setIsFullscreen(false);
          break;
        case 'f':
        case 'F':
          setIsFullscreen(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, changeSlide]);
  
  // Handle drag events to change slides
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragThreshold = 75;
    const dragOffset = info.offset.x;
    if (dragOffset > dragThreshold) {
      changeSlide(activeIndex - 1);
    } else if (dragOffset < -dragThreshold) {
      changeSlide(activeIndex + 1);
    }
  };

  const toggleAutoplay = () => {
    setIsPaused(prev => !prev);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  const toggleThumbnails = () => {
    setShowThumbnails(prev => !prev);
  };

  return (
    <section className={`w-full flex-col items-center justify-center font-sans overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <div 
        className={`${isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl mx-auto p-4'}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`relative flex w-full flex-col rounded-3xl border border-white/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 pt-6 md:p-6 ${isFullscreen ? 'h-full' : ''}`}>
          
          {/* Header with Controls */}
          <div className="flex items-center justify-between mb-4">
            <Badge className="rounded-xl border border-gray-300 dark:border-white/10 text-base text-gray-700 dark:text-white/80 bg-gray-100/80 dark:bg-black/20 backdrop-blur-sm">
              <SparklesIcon className="fill-[#EEBDE0] stroke-1 text-neutral-800 h-5 w-5 mr-1" />
              Enhanced Carousel
            </Badge>

            {/* Control Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleAutoplay}
                className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
                title={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <PlayIcon className="w-4 h-4" /> : <PauseIcon className="w-4 h-4" />}
              </button>
              
              <button 
                onClick={toggleThumbnails}
                className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
                title="Toggle Thumbnails"
              >
                <div className="w-4 h-4 flex flex-wrap gap-0.5">
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                </div>
              </button>

              <button 
                onClick={toggleFullscreen}
                className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <MinimizeIcon className="w-4 h-4" /> : <MaximizeIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Carousel Container */}
          <div className={`relative w-full flex items-center justify-center overflow-hidden ${isFullscreen ? 'flex-1' : 'h-[280px] md:h-[400px]'}`}>
            <motion.div  
              className="w-full h-full flex items-center justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
            >
              {cardData.map((card, index) => (
                <Card
                  key={card.id}
                  card={card}
                  index={index}
                  activeIndex={activeIndex}
                  totalCards={cardData.length}
                />
              ))}
            </motion.div>
          </div>

          {/* Thumbnail Navigation */}
          <AnimatePresence>
            {showThumbnails && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {cardData.map((card, index) => (
                    <button
                      key={card.id}
                      onClick={() => changeSlide(index)}
                      className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        activeIndex === index 
                          ? 'border-pink-400 scale-110' 
                          : 'border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20'
                      }`}
                    >
                      <img 
                        src={card.imageUrl} 
                        alt={card.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { 
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; 
                          target.src='https://placehold.co/64x48/1e1e1e/ffffff?text=IMG'; 
                        }}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation and Indicators */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {/* Previous Button */}
            <button 
              onClick={() => changeSlide(activeIndex - 1)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2">
              {cardData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    activeIndex === index ? 'w-6 bg-pink-400' : 'w-2 bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button 
              onClick={() => changeSlide(activeIndex + 1)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Speed:</span>
            <input
              type="range"
              min="1000"
              max="8000"
              step="500"
              value={autoplaySpeed}
              onChange={(e) => setAutoplaySpeed(Number(e.target.value))}
              className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">{(autoplaySpeed / 1000).toFixed(1)}s</span>
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Use arrow keys to navigate, spacebar to pause/play, F for fullscreen, ESC to exit fullscreen
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Enhanced Card Component ---
function Card({ card, index, activeIndex, totalCards }: CardProps) {
  let offset = index - activeIndex;
  if (offset > totalCards / 2) {
    offset -= totalCards;
  } else if (offset < -totalCards / 2) {
    offset += totalCards;
  }
  
  const isVisible = Math.abs(offset) <= 1;
  const isActive = offset === 0;

  const animate = {
    x: `${offset * 50}%`,
    scale: offset === 0 ? 1 : 0.8,
    zIndex: totalCards - Math.abs(offset),
    opacity: isVisible ? 1 : 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 30 }
  };

  return (
    <motion.div
      className="absolute w-1/2 md:w-1/3 h-[95%]"
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={animate}
      initial={false}
    >
      <div className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden bg-gray-200 dark:bg-neutral-800 group cursor-pointer">
        <img  
          src={card.imageUrl}  
          alt={card.title}
          className="w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { 
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src='https://placehold.co/400x600/1e1e1e/ffffff?text=Image+Missing'; 
          }}
        />
        
        {/* Enhanced overlay with more information */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-white text-lg font-semibold">{card.title}</h4>
              <Badge className="text-xs bg-white/20 text-white border-white/20">
                {card.category}
              </Badge>
            </div>
            {isActive && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/90 text-sm leading-relaxed"
              >
                {card.description}
              </motion.p>
            )}
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
} 