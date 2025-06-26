'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TabsViewFancy() {
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading effect when changing tabs
  useEffect(() => {
    if (activeTab) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const tabs = [
    {
      id: 1,
      name: 'Photos',
      icon: '📸',
      type: 'content',
      content:
        'This is the PHOTOS tab content. Here you would display your photo gallery or image collection.',
    },
    {
      id: 2,
      name: 'Music',
      icon: '🎵',
      type: 'content',
      content:
        'This is the MUSIC tab content. Here you would display your music player or audio tracks.',
    },
    {
      id: 3,
      name: 'Videos',
      icon: '🎬',
      type: 'content',
      content:
        'This is the VIDEOS tab content. Here you would display your video player or video collection.',
    },
  ];

  return (
    <div className='w-full max-w-2xl mx-auto'>
      {/* Tabs Container - Vertical design for larger screens, horizontal for mobile */}
      <div className='flex flex-col sm:flex-row gap-6 rounded-xl overflow-hidden'>
        {/* Sidebar navigation */}
        <div className='sm:w-56 flex sm:flex-col rounded-xl bg-black/5 dark:bg-white/5 backdrop-filter backdrop-blur-lg'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative group flex items-center w-full px-4 py-3 sm:py-4 transition-all
                ${
                  activeTab === tab.id
                    ? 'text-white dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
                }
              `}
            >
              {/* Background highlight for active tab */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId='tabBackground'
                  className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Tab content with icon and text */}
              <div className='flex items-center gap-3 z-10'>
                <span className='text-xl'>{tab.icon}</span>
                <span className='font-medium'>{tab.name}</span>
              </div>

              {/* Small dot indicator */}
              {activeTab === tab.id ? (
                <motion.div
                  layoutId='activeDot'
                  className='absolute right-3 w-2 h-2 rounded-full bg-white'
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                />
              ) : (
                <div className='absolute right-3 w-2 h-2 rounded-full bg-gray-400/0 group-hover:bg-gray-400/30 transition-colors' />
              )}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className='flex-1 relative rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-filter backdrop-blur-lg shadow-lg overflow-hidden'>
          {/* Loading overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                key='loader'
                className='absolute inset-0 z-20 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm'
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className='animate-spin h-8 w-8 text-indigo-600'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab content with animations */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className='p-6 h-64 overflow-y-auto'
            >
              <h3 className='text-lg font-semibold flex items-center gap-2 mb-4 text-gray-900 dark:text-white'>
                <span>{tabs.find((t) => t.id === activeTab)?.icon}</span>
                <span>{tabs.find((t) => t.id === activeTab)?.name}</span>
              </h3>
              <div className='prose dark:prose-invert'>
                {tabs.find((tab) => tab.id === activeTab)?.content ||
                  tabs[0].content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
