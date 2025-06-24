"use client";
import { ScrollArea } from "@/components/site/scroll-area";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LoadingLink } from "@/components/ui";
import { usePathname } from "next/navigation";
import React from "react";

export const SidebarMobile = ({ onClose }: { onClose: () => void }) => {
  const pathName = usePathname();

  return (
    <aside className="w-full h-[calc(100%-60px)] sticky top-[60px]">
      <ScrollArea className="h-full w-full">
        <div className="py-6 px-4">
          <nav className="px-2 flex flex-col gap-5 text-base font-medium text-zinc-800 dark:text-zinc-200">
            <LoadingLink
              className="hover:text-zinc-900 dark:hover:text-zinc-50"
              href="/docs"
              onClick={onClose}
            >
              Docs
            </LoadingLink>
            <LoadingLink
              className="hover:text-zinc-900 dark:hover:text-zinc-50"
              href="/docs/text-circle"
              onClick={onClose}
            >
              Components
            </LoadingLink>
          </nav>
          <ul className="space-y-2 mt-4">
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
                          onClick={onClose}
                          className={cn(
                            "block text-zinc-600 dark:text-zinc-400 font-normal text-base px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700",
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
