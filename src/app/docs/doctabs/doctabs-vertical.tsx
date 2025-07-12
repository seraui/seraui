'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icon components
const DashboardIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="7" height="9" x="3" y="3" rx="1"/>
    <rect width="7" height="5" x="14" y="3" rx="1"/>
    <rect width="7" height="9" x="14" y="12" rx="1"/>
    <rect width="7" height="5" x="3" y="16" rx="1"/>
  </svg>
);

const AnalyticsIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3v18h18"/>
    <path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);

const UsersIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="m22 21-2-2"/>
    <path d="M16 16.28A13.84 13.84 0 0 1 22 21"/>
  </svg>
);

const FileIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14,2 14,8 20,8"/>
  </svg>
);

interface Tab {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string;
  badge?: number;
}

interface VerticalTabsProps {
  tabs: Tab[];
  className?: string;
}

export default function VerticalTabs({ tabs, className }: VerticalTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className={`flex h-80 w-full max-w-4xl rounded-lg border border-slate-200/20 bg-white/80 shadow-lg backdrop-blur-md dark:border-slate-700/30 dark:bg-black/40 ${className || ''}`}>
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-200/20 bg-slate-50/50 p-4 backdrop-blur-sm dark:border-slate-700/30 dark:bg-black/20">
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-white/80 text-blue-600 shadow-sm backdrop-blur-sm dark:bg-black/60 dark:text-blue-400 dark:shadow-blue-500/10"
                    : "text-slate-600 hover:bg-white/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-black/40 dark:hover:text-slate-100"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-blue-50/80 backdrop-blur-sm dark:bg-blue-500/10 dark:backdrop-blur-md"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                <div className="relative z-10 flex items-center gap-3">
                  <Icon className={`h-5 w-5 transition-colors ${
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200"
                  }`} />
                  <span className="font-medium">{tab.title}</span>
                  {tab.badge && (
                    <span className="ml-auto rounded-full bg-blue-100/80 px-2 py-0.5 text-xs font-medium text-blue-600 backdrop-blur-sm dark:bg-blue-500/20 dark:text-blue-400 dark:backdrop-blur-md">
                      {tab.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <AnimatePresence mode="wait">
          {tabs.map((tab) => {
            if (activeTab !== tab.id) return null;
            
            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {tab.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {tab.content}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Demo component
export function VerticalTabsDemo() {
  const tabs: Tab[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: DashboardIcon,
      content: "Welcome to your dashboard! Here you can view an overview of all your important metrics and recent activity. The dashboard provides a comprehensive view of your data and performance indicators.",
      badge: 3
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: AnalyticsIcon,
      content: "Dive deep into your analytics data. View detailed reports, trends, and insights about your performance. Track key metrics and identify opportunities for growth and optimization.",
      badge: 12
    },
    {
      id: "users",
      title: "Users",
      icon: UsersIcon,
      content: "Manage your user base effectively. View user profiles, activity logs, and engagement metrics. Monitor user behavior and implement strategies to improve user experience.",
    },
    {
      id: "files",
      title: "Files",
      icon: FileIcon,
      content: "Organize and manage your files efficiently. Upload, download, and share documents with your team. Keep everything organized with our intuitive file management system.",
      badge: 5
    }
  ];

  return <VerticalTabs tabs={tabs} />;
} 