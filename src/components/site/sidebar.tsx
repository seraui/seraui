"use client";
import { ScrollArea } from "@/components/site/scroll-area";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { LoadingLink } from "@/components/ui";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, FileText, Home, Settings } from "lucide-react";

// Icon mapping for navigation items
const getIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "introduction":
      return <Home className="w-4 h-4" />;
    case "installation":
      return <Settings className="w-4 h-4" />;
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
    <aside className="hidden md:block w-[280px] h-[calc(100dvh-57px)] sticky top-[57px] border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <ScrollArea className="h-full w-full">
        <div className="py-6 px-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Documentation
            </h2>
          </div>
          
          <nav className="space-y-2" role="navigation" aria-label="Documentation navigation">
            {navigation.map((nav, index) => {
              const isExpanded = expandedSections.has(nav.label);
              const hasActiveChild = nav.children.some(child => pathName === child.href);
              
              return (
                <div key={`${nav.label}-${index}`} className="space-y-1">
                  <button
                    onClick={() => toggleSection(nav.label)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors",
                      "text-zinc-700 dark:text-zinc-300 font-medium text-sm",
                      "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                      hasActiveChild && "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300"
                    )}
                    aria-expanded={isExpanded}
                    aria-controls={`section-${index}`}
                  >
                    <span className="flex items-center gap-2">
                      {getIcon(nav.children[0]?.label || nav.label)}
                      {nav.label}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  <div
                    id={`section-${index}`}
                    className={cn(
                      "overflow-hidden transition-all duration-200",
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1 pl-6">
                      {nav.children.map((child) => {
                        const isActive = pathName === child.href;

                        return (
                          <li key={child.href}>
                            <LoadingLink
                              href={child.href}
                              className={cn(
                                "block px-3 py-2 rounded-md text-sm transition-colors",
                                "text-zinc-600 dark:text-zinc-400",
                                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                "hover:text-zinc-900 dark:hover:text-zinc-100",
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
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Need help? Check our{" "}
              <LoadingLink 
                href="/docs" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
                showLoading={false}
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

export default Sidebar;
