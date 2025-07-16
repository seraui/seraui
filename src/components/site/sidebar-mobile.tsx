"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/site/scroll-area";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
      href: child.href,
      badge: child.badge
    }))
  }));
};

const menuData = transformNavigation();

const MenuItem: React.FC<{ item: MenuItem, isNested?: boolean, onClose: () => void }> = ({ item, isNested = false, onClose }) => {
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
          "flex items-center justify-between py-1 text-sm transition-colors cursor-pointer",
          isNested ? "pl-6" : "font-medium",
          (isActive || hasActiveChild)
            ? "text-zinc-900 dark:text-white"
            : isNested
              ? "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              : "text-zinc-500 dark:text-white/80 hover:text-zinc-900 dark:hover:text-white/90"
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
          {item.badge && (
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full ml-1.5",
              item.badge === "New" ? "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400" : 
              item.badge === "Updated" ? "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400" :
              "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400"
            )}>
              {item.badge}
            </span>
          )}
        </span>
      </div>
      
      {item.children && isOpen && (
        <ul className={cn(
          "mt-0.5 space-y-0.5",
          isNested ? "pl-2" : "ml-4 border-l border-zinc-100 dark:border-zinc-800 mt-0.5 relative"
        )}>
          {item.children.map((child, index) => {
            const isChildActive = pathName === child.href;
            
            return isNested ? (
              <MenuItem key={index} item={child} isNested onClose={onClose} />
            ) : (
              <li key={child.href} className="relative py-0 pl-4">
                {isChildActive && (
                  <span className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full" />
                )}
                <div className="flex items-center">
                  <Link
                    href={child.href}
                    onClick={onClose}
                    className={cn(
                      "block py-1 text-sm",
                      isChildActive
                        ? "text-blue-600 dark:text-blue-400 font-medium"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    )}
                    aria-current={isChildActive ? "page" : undefined}
                  >
                    {child.label}
                  </Link>
                  {child.badge && (
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full ml-1.5",
                      child.badge === "New" ? "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400" : 
                      child.badge === "Updated" ? "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400" :
                      "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400"
                    )}>
                      {child.badge}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export const SidebarMobile = ({ onClose }: { onClose: () => void }) => {
  return (
    <aside className="w-full h-[calc(100%-60px)] sticky top-[60px] border-t border-zinc-100 dark:border-zinc-800">
      <ScrollArea className="h-full w-full">
        <div className="py-6 px-4">
          <nav role="navigation" aria-label="Documentation navigation">
            <ul className="space-y-1">
              {menuData.map((item, index) => (
                <MenuItem key={index} item={item} onClose={onClose} />
              ))}
            </ul>
          </nav>
          
          <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <Link
              href="/docs"
              className="block py-1.5 text-sm text-blue-600 dark:text-blue-400"
              onClick={onClose}
            >
              Getting Started Guide
            </Link>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};
