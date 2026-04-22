"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAdjacentPages } from "@/lib/docs-navigation";
import { cn } from "@/lib/utils";

export function DocPagination() {
  const pathname = usePathname();
  const { previous, next } = getAdjacentPages(pathname);

  if (!previous && !next) {
    return null;
  }

  return (
    <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={cn(!previous && "md:col-start-2")}>
          {previous && (
            <Link
              href={previous.href}
              className="group flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-zinc-500 group-hover:-translate-x-0.5 transition-transform" />
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500">Previous</span>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  {previous.label}
                </span>
              </div>
            </Link>
          )}
        </div>

        <div>
          {next && (
            <Link
              href={next.href}
              className="group flex items-center justify-end gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
            >
              <div className="flex flex-col items-end">
                <span className="text-xs text-zinc-500">Next</span>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  {next.label}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
