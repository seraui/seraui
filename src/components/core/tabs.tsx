'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type TabItem = {
  id: string | number;
  name: string;
  content: string;
};

export interface TabsProps {
  items?: TabItem[];
  className?: string;
}

export default function Tabs({ items = [], className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string | number>(items[0]?.id ?? 1);

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const indicatorVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={tabVariants}
      className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-800/50 overflow-hidden w-full max-w-2xl ${className}`}
    >
      {/* Tabs Header */}
      <div className='flex border-b border-gray-100/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-950/50 backdrop-blur-sm'>
        {items.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-4 text-sm font-medium transition-all duration-300 ease-out ${
              activeTab === tab.id
                ? 'text-slate-800 dark:text-slate-200'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-selected={activeTab === tab.id}
            role='tab'
          >
            <span className='relative z-10'>{tab.name}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-600 to-slate-800 dark:from-slate-400 dark:to-slate-600'
                initial="hidden"
                animate="visible"
                variants={indicatorVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      <div className='relative overflow-hidden'>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role='tabpanel'
            className='p-8 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm text-slate-700 dark:text-slate-300'
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {items.find((tab) => tab.id === activeTab)?.content || items[0]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
