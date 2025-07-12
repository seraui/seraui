'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icon components
const StarIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const HeartIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const ZapIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
  </svg>
);

const MusicIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>
);

const CameraIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

interface Tab {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  gradient: string;
}

interface GradientTabsProps {
  tabs: Tab[];
  className?: string;
}

export default function GradientTabs({ tabs, className }: GradientTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className={`w-full max-w-4xl mx-auto ${className || ''}`}>
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex rounded-2xl bg-slate-100/50 p-1 backdrop-blur-sm dark:bg-slate-800/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-lg"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="gradientTab"
                    className={`absolute inset-0 rounded-xl ${tab.gradient}`}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                <div className="relative z-10 flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{tab.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {tabs.map((tab) => {
            if (activeTab !== tab.id) return null;
            
            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 rounded-3xl ${tab.gradient} opacity-10 blur-3xl`} />
                
                {/* Content card */}
                <div className="relative rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-2xl p-3 ${tab.gradient} bg-opacity-20`}>
                      <tab.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {tab.title}
                      </h2>
                      <p className="text-lg text-slate-600 dark:text-slate-300">
                        {tab.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="mt-6 flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-2 w-2 rounded-full ${tab.gradient.replace('bg-gradient-to-r', 'bg-gradient-to-br')}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Demo component
export function GradientTabsDemo() {
  const tabs: Tab[] = [
    {
      id: "favorites",
      title: "Favorites",
      icon: StarIcon,
      description: "Your most loved and cherished items, carefully curated just for you. Discover what makes your collection special.",
      gradient: "bg-gradient-to-r from-yellow-400 to-orange-500"
    },
    {
      id: "love",
      title: "Love",
      icon: HeartIcon,
      description: "Things that bring joy to your heart. A collection of moments and memories that make life beautiful.",
      gradient: "bg-gradient-to-r from-pink-400 to-red-500"
    },
    {
      id: "energy",
      title: "Energy",
      icon: ZapIcon,
      description: "High-powered content that electrifies and energizes. Get ready for an explosive experience.",
      gradient: "bg-gradient-to-r from-blue-400 to-purple-500"
    },
    {
      id: "music",
      title: "Music",
      icon: MusicIcon,
      description: "Harmonious melodies and rhythmic beats that move your soul. Let the music take you away.",
      gradient: "bg-gradient-to-r from-green-400 to-teal-500"
    },
    {
      id: "photos",
      title: "Photos",
      icon: CameraIcon,
      description: "Captured moments frozen in time. Every picture tells a story worth remembering forever.",
      gradient: "bg-gradient-to-r from-indigo-400 to-blue-500"
    }
  ];

  return <GradientTabs tabs={tabs} />;
} 