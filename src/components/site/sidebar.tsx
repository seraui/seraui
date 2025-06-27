"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/site/scroll-area";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { LoadingLink } from "@/components/ui";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  badge?: string;
  children?: MenuItem[];
}

// Transform the existing navigation data to match our new MenuItem interface
const transformNavigation = () => {
  return navigation.map(section => ({
    label: section.label,
    href: section.children[0]?.href || "#",
    children: section.children.map(child => ({
      label: child.label,
      href: child.href
    }))
  }));
};

const menuData = transformNavigation();

const MenuItem: React.FC<{ item: MenuItem, isNested?: boolean }> = ({ item, isNested = false }) => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const isActive = pathName === item.href;
  const hasActiveChild = item.children?.some(child => pathName === child.href);

  const handleClick = (e: React.MouseEvent) => {
    if (item.children) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <li>
      <div 
        onClick={handleClick}
        className={cn(
          "flex items-center justify-between py-2 text-sm transition-colors cursor-pointer",
          isNested ? "pl-6" : "font-medium",
          (isActive || hasActiveChild) 
            ? "text-zinc-900 dark:text-white" 
            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
        )}
      >
        <span className="flex items-center gap-2">
          {!isNested && item.children && (
            <span>
              {isOpen ? (
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              )}
            </span>
          )}
          {isNested && (
            <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 mr-2"></span>
          )}
          {item.label}
        </span>
        {item.badge && (
          <span className="text-xs font-medium text-blue-500">
            {item.badge}
          </span>
        )}
      </div>
      
      {item.children && isOpen && (
        <ul className={cn(
          "mt-1 space-y-1",
          isNested ? "pl-2" : "ml-4 border-l border-zinc-100 dark:border-zinc-800 mt-1 relative"
        )}>
          {item.children.map((child, index) => {
            const isChildActive = pathName === child.href;
            
            return isNested ? (
              <MenuItem key={index} item={child} isNested />
            ) : (
              <li key={child.href} className="relative py-0.5 pl-4">
                {isChildActive && (
                  <span className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full" />
                )}
                <LoadingLink
                  href={child.href}
                  className={cn(
                    "block py-1.5 text-sm",
                    isChildActive
                      ? "text-blue-600 dark:text-blue-400 font-medium" 
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  )}
                  aria-current={isChildActive ? "page" : undefined}
                >
                  {child.label}
                </LoadingLink>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="hidden md:block w-[260px] h-[calc(100dvh-57px)] sticky top-[57px] border-r border-zinc-100 dark:border-zinc-800">
      <ScrollArea className="h-full w-full">
        <div className="py-6 px-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-6">
            Documentation
          </h2>
          
          <nav role="navigation" aria-label="Documentation navigation">
            <ul className="space-y-3">
              {menuData.map((item, index) => (
                <MenuItem key={index} item={item} />
              ))}
            </ul>
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
