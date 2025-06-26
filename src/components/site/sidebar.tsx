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

const Sidebar = () => {
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
    <aside className="hidden md:block w-[260px] h-[calc(100dvh-57px)] sticky top-[57px] border-r border-zinc-100 dark:border-zinc-800">
      <ScrollArea className="h-full w-full">
        <div className="py-6 px-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-6">
            Documentation
          </h2>
          
          <nav role="navigation" aria-label="Documentation navigation">
            {navigation.map((nav, index) => {
              const isExpanded = expandedSections.has(nav.label);
              const hasActiveChild = nav.children.some(child => pathName === child.href);
              
              return (
                <div key={`${nav.label}-${index}`} className="mb-3">
                  <button
                    onClick={() => toggleSection(nav.label)}
                    className={cn(
                      "w-full flex items-center justify-between py-2 text-left",
                      "text-sm",
                      hasActiveChild 
                        ? "text-zinc-900 dark:text-white font-medium" 
                        : "text-zinc-500 dark:text-zinc-400"
                    )}
                    aria-expanded={isExpanded}
                    aria-controls={`section-${index}`}
                  >
                    <span className="flex items-center gap-2">
                      {getIcon(nav.children[0]?.label || nav.label)}
                      {nav.label}
                    </span>
                    <span>
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                      )}
                    </span>
                  </button>
                  
                  <div
                    id={`section-${index}`}
                    className={cn(
                      "overflow-hidden transition-all duration-200 ease-out",
                      isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="ml-4 border-l border-zinc-100 dark:border-zinc-800 mt-1 relative">
                      {nav.children.map((child: { href: string; label: string }) => {
                        const isActive = pathName === child.href;

                        return (
                          <div key={child.href} className="relative py-0.5 pl-4">
                            {isActive && (
                              <span className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full" />
                            )}
                            <LoadingLink
                              href={child.href}
                              className={cn(
                                "block py-1.5 text-sm",
                                isActive 
                                  ? "text-blue-600 dark:text-blue-400 font-medium" 
                                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                              )}
                              aria-current={isActive ? "page" : undefined}
                            >
                              {child.label}
                            </LoadingLink>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
          
          <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <LoadingLink 
              href="/docs" 
              className="block py-2 text-sm text-blue-600 dark:text-blue-400"
              showLoading={false}
            >
              Getting Started Guide
            </LoadingLink>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
