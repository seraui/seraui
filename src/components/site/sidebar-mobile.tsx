"use client";
import { ScrollArea } from "@/components/site/scroll-area";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { LoadingLink } from "@/components/ui";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, FileText, Home, Settings, Search } from "lucide-react";

// Icon mapping for navigation items
const getIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "introduction":
      return <Home className="w-4 h-4" />;
    case "installation":
      return <Settings className="w-4 h-4" />;
    case "search":
      return <Search className="w-4 h-4" />;
    case "tabs":
      return <FileText className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

export const SidebarMobile = ({ onClose }: { onClose: () => void }) => {
  const pathName = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(navigation.map(nav => nav.label))
  );

  const toggleSection = (sectionLabel: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionLabel)) {
      newExpanded.delete(sectionLabel);
    } else {
      newExpanded.add(sectionLabel);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <aside className="w-full h-[calc(100%-60px)] sticky top-[60px] bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <ScrollArea className="h-full w-full">
        <div className="py-6 px-4">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Documentation
            </h2>
          </div>
          
          <nav className="space-y-1" role="navigation" aria-label="Documentation navigation">
            {navigation.map((nav, index) => {
              const isExpanded = expandedSections.has(nav.label);
              const hasActiveChild = nav.children.some(child => pathName === child.href);
              
              return (
                <div key={`${nav.label}-${index}`} className="space-y-1">
                  <button
                    onClick={() => toggleSection(nav.label)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-3 rounded-md text-left transition-colors",
                      "text-zinc-700 dark:text-zinc-300 font-medium text-base",
                      "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950",
                      hasActiveChild && "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300"
                    )}
                    aria-expanded={isExpanded}
                    aria-controls={`mobile-section-${index}`}
                  >
                    <span className="flex items-center gap-3">
                      {getIcon(nav.children[0]?.label || nav.label)}
                      {nav.label}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>
                  
                  <div
                    id={`mobile-section-${index}`}
                    className={cn(
                      "overflow-hidden transition-all duration-200",
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1 pl-6">
                      {nav.children.map((child) => {
                        const isActive = pathName === child.href;

                        return (
                          <li key={`${child.href}`}>
                            <LoadingLink
                              href={child.href}
                              onClick={onClose}
                              className={cn(
                                "block px-3 py-3 rounded-md text-base transition-colors",
                                "text-zinc-600 dark:text-zinc-400",
                                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                "hover:text-zinc-900 dark:hover:text-zinc-100",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950",
                                isActive && [
                                  "bg-blue-100 dark:bg-blue-900/30",
                                  "text-blue-700 dark:text-blue-300",
                                  "font-medium"
                                ]
                              )}
                              aria-current={isActive ? "page" : undefined}
                            >
                              {child.label}
                            </LoadingLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>
          
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Need help? Check our{" "}
              <LoadingLink 
                href="/docs" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
                showLoading={false}
                onClick={onClose}
              >
                getting started guide
              </LoadingLink>
            </p>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};
