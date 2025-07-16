'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TabsViewClassic() {
  const [activeTab, setActiveTab] = useState(1);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const tabs = [
    {
      id: 1,
      name: 'Photos',
      icon: '📸',
      color: 'from-pink-500 to-rose-500',
      content:
        'This is the PHOTOS tab content. Here you would display your photo gallery or image collection.',
    },
    {
      id: 2,
      name: 'Music',
      icon: '🎵',
      color: 'from-purple-500 to-indigo-500',
      content:
        'This is the MUSIC tab content. Here you would display your music player or audio tracks.',
    },
    {
      id: 3,
      name: 'Videos',
      icon: '🎬',
      color: 'from-blue-500 to-cyan-500',
      content:
        'This is the VIDEOS tab content. Here you would display your video player or video collection.',
    },
  ];

  return (
    <div className='w-full max-w-2xl mx-auto'>
      {/* Tabs layout with cards */}
      <div className='grid grid-cols-3 gap-4 mb-8'>
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            onMouseEnter={() => setIsHovering(tab.id)}
            onMouseLeave={() => setIsHovering(null)}
            className={`relative overflow-hidden rounded-xl cursor-pointer ${
              activeTab === tab.id
                ? `bg-gradient-to-br ${tab.color} shadow-lg`
                : 'bg-white dark:bg-gray-800 shadow hover:shadow-md'
            }`}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            layout
          >
            <div
              className={`p-4 flex flex-col items-center justify-center aspect-[4/3] ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-800 dark:text-gray-200'
              }`}
            >
              <motion.div
                className='text-4xl mb-2'
                initial={false}
                animate={{
                  scale:
                    isHovering === tab.id || activeTab === tab.id ? 1.2 : 1,
                  rotate:
                    isHovering === tab.id && activeTab !== tab.id ? 10 : 0,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {tab.icon}
              </motion.div>
              <span className='font-medium tracking-wide text-center'>
                {tab.name}
              </span>
            </div>

            {isHovering === tab.id && activeTab !== tab.id && (
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br opacity-20 ${tab.color}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Content Area with dynamic colors based on active tab */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`relative overflow-hidden rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg border-t-4 border-gradient-to-r ${tabs.find((t) => t.id === activeTab)?.color}`}
        >
          <div className='absolute top-0 right-0 p-2 flex items-center justify-center'>
            <motion.div
              className='text-2xl opacity-50'
              animate={{
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.2, 1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              {tabs.find((t) => t.id === activeTab)?.icon}
            </motion.div>
          </div>

          <h3 className='text-xl font-bold mb-4 text-gray-800 dark:text-white'>
            {tabs.find((t) => t.id === activeTab)?.name}
          </h3>

          <div className='prose dark:prose-invert'>
            <p>{tabs.find((t) => t.id === activeTab)?.content}</p>
          </div>

          <div className='mt-6 text-center'>
            <button
              className={`px-4 py-2 rounded-full text-white bg-gradient-to-r ${tabs.find((t) => t.id === activeTab)?.color}`}
            >
              Explore {tabs.find((t) => t.id === activeTab)?.name}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
