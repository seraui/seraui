"use client";
import { ScrollArea } from "@/components/site/scroll-area";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// Custom hook for static export compatibility
const useCurrentPath = () => {
  const [currentPath, setCurrentPath] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // For static exports, use window.location.pathname
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      // Remove trailing slash for consistency
      setCurrentPath(
        path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path,
      );
    }
  }, [pathname]);

  // Fallback to usePathname for development, also normalize
  const normalizedPathname =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;
  return currentPath || normalizedPathname;
};

interface MenuItem {
  label: string;
  href: string;
  badge?: string;
  badges?: string[];
  children?: MenuItem[];
}

// Transform the existing navigation data to match our new MenuItem interface
const transformNavigation = (): MenuItem[] => {
  return navigation.map((section) => ({
    label: section.label,
    href: section.children[0]?.href || "#",
    children: section.children.map((child) => ({
      label: child.label,
      href: child.href,
      badge: child.badge,
      // The navigation data doesn't have badges array, only badge
      badges: undefined,
    })),
  }));
};

const menuData = transformNavigation();

// Helper function to get badge styling
const getBadgeStyle = (badge: string) => {
  switch (badge) {
    case "New":
      return "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400";
    case "Updated":
      return "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400";
    case "Tool":
      return "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800";
    case "Premium":
      return "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 dark:from-purple-950/60 dark:to-indigo-950/60 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50";
    case "Pro":
      return "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold shadow-lg shadow-amber-500/25 border border-amber-300 dark:from-amber-500 dark:via-yellow-400 dark:to-amber-500 dark:text-black dark:shadow-amber-400/30 dark:border-amber-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-950/60 dark:text-gray-400";
  }
};

const MenuItem: React.FC<{ item: MenuItem; isNested?: boolean }> = ({
  item,
  isNested = false,
}) => {
  const pathName = useCurrentPath();
  const [isOpen, setIsOpen] = useState(true);
  const isActive = pathName === item.href;
  const hasActiveChild = item.children?.some(
    (child) => pathName === child.href,
  );

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
          isNested ? "pl-6" : "font-semibold text-base",
          isActive || hasActiveChild
            ? "text-zinc-900 dark:text-white"
            : isNested
              ? "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              : "text-zinc-500 dark:text-white/80 hover:text-zinc-900 dark:hover:text-white/90",
        )}
      >
        <div className="flex items-center gap-2">
          {/* Active indicator dot for main section links */}
          {isNested && isActive && (
            <div className="size-2 bg-blue-500 rounded-full mr-1 flex-shrink-0" />
          )}
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

          <span>{item.label}</span>

          {item.badge && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full ml-1.5",
                getBadgeStyle(item.badge),
              )}
            >
              {item.badge}
            </span>
          )}

          {item.badges &&
            item.badges.map((badge, index) => (
              <span
                key={index}
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full ml-1",
                  getBadgeStyle(badge),
                )}
              >
                {badge}
              </span>
            ))}
        </div>
      </div>

      {item.children && isOpen && (
        <ul
          className={cn(
            "mt-0.5 space-y-0.5",
            isNested
              ? "pl-2"
              : "ml-4 border-l border-zinc-100 dark:border-zinc-800 mt-0.5 relative",
          )}
        >
          {item.children.map((child, index) => {
            const isChildActive = pathName === child.href;

            return isNested ? (
              <MenuItem key={index} item={child} isNested />
            ) : (
              <li key={child.href} className="relative py-0 pl-4">
                <div className="flex items-center">
                  {/* Active indicator dot for child links */}
                  {isChildActive && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0" />
                  )}
                  <Link
                    href={child.href}
                    className={cn(
                      "block py-1 text-sm",
                      isChildActive
                        ? "text-blue-600 dark:text-blue-400 font-medium"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200",
                    )}
                    aria-current={isChildActive ? "page" : undefined}
                  >
                    {child.label}
                  </Link>
                  {child.badge && (
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full ml-1.5",
                        getBadgeStyle(child.badge),
                      )}
                    >
                      {child.badge}
                    </span>
                  )}
                  {child.badges &&
                    child.badges.map((badge, index) => (
                      <span
                        key={index}
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full ml-1",
                          getBadgeStyle(badge),
                        )}
                      >
                        {badge}
                      </span>
                    ))}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

const Sidebar = () => {
  const currentPath = useCurrentPath();

  return (
    <aside className="hidden md:block w-[260px] h-[calc(100dvh-57px)] sticky top-[57px] border-r border-zinc-100 dark:border-zinc-800">
      <ScrollArea className="h-full w-full">
        <div className="py-6 px-4">
          <nav role="navigation" aria-label="Documentation navigation">
            <ul className="space-y-0.5">
              {menuData.map((item, index) => (
                <MenuItem key={index} item={item} />
              ))}
            </ul>
          </nav>

          <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center">
              {/* Active indicator dot for Getting Started Guide */}

              <Link
                href="/docs"
                className={cn(
                  "block py-1.5 text-sm",
                  currentPath === "/docs"
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
                )}
              >
                Getting Started Guide
              </Link>
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
