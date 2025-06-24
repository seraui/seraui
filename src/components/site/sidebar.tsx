"use client";
import { ScrollArea } from "@/components/site/scroll-area";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LoadingLink } from "@/components/ui";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <aside className="hidden md:block w-[230px] h-[calc(100dvh-57px)] sticky top-[57px] border-r border-zinc-200 dark:border-zinc-800">
      <ScrollArea className="h-full w-full">
        <div className="py-6 px-4">
          <ul className="space-y-2">
            {navigation.map((nav, index) => (
              <li key={`${nav.label}-${index}`}>
                <div className="text-zinc-900 dark:text-zinc-50 font-medium text-sm px-2 py-2">
                  {nav.label}
                </div>
                <ul className="space-y-1">
                  {nav.children.map((child) => {
                    const isActive = pathName === child.href;

                    return (
                      <li key={`${child.href}`}>
                        <LoadingLink
                          href={child.href}
                          className={cn(
                            "block text-zinc-600 dark:text-zinc-400 font-normal text-sm px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700",
                            isActive &&
                              "bg-gray-100 dark:bg-zinc-700 text-zinc-800 dark:text-white"
                          )}
                        >
                          {child.label}
                        </LoadingLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
