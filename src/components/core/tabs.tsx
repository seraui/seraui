'use client';

import { useState } from 'react';

export type TabItem = {
  id: string | number;
  name: string;
  content: string;
};

export interface TabsProps {
  items?: TabItem[];
}

export default function Tabs({ items = [] }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string | number>(items[0]?.id ?? 1);

  return (
    <div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden w-full max-w-2xl'>
      {/* Tabs Header */}
      <div className='flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950'>
        {items.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-5 py-3 text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 ${
              activeTab === tab.id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            aria-selected={activeTab === tab.id}
            role='tab'
          >
            <span>{tab.name}</span>
            {activeTab === tab.id && (
              <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-transform duration-300 ease-in-out transform origin-left'></span>
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div
        role='tabpanel'
        className='p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-opacity duration-300 ease-in-out'
      >
        {items.find((tab) => tab.id === activeTab)?.content || items[0]?.content}
      </div>
    </div>
  );
}
