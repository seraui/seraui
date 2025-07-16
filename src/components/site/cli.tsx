"use client";

import React from "react";
import CodeCopy from "./code-copy";
import { cn } from "@/lib/utils";
import { FaYarn } from "react-icons/fa";
import { SiNpm, SiPnpm, SiBun } from "react-icons/si";
import { usePackageManager, type PackageManager, PM_COMMANDS } from "@/contexts/package-manager-context";

type CliProps = {
  command: string;
};

export const Cli = ({ command }: CliProps) => {
  const { packageManager: pm, setPackageManager: setPm } = usePackageManager();

  // Dynamically build the registry URL if command looks like 'add *.json'
  let finalCommand = command;
  if (typeof window !== "undefined") {
    // Match 'add something.json' optionally with quotes
    const match = command.match(/^add\s+"?([\w-]+\.json)"?$/);
    if (match) {
      const file = match[1];
      finalCommand = `add \"${window.location.origin}/registry/${file}\"`;
    }
  }

  const fullCommand = `${PM_COMMANDS[pm]} shadcn@latest ${finalCommand}`;

  return (
    <div className="w-full rounded-lg bg-zinc-100 dark:bg-zinc-950 relative overflow-hidden border border-zinc-200 dark:border-zinc-800">
      {/* PM Selector */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          {(Object.keys(PM_COMMANDS) as PackageManager[]).map((name) => {
            const isActive = name === pm;
            return (
              <button
                key={name}
                onClick={() => setPm(name)}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                  "cursor-pointer",
                  isActive
                    ? "border-amber-400 text-zinc-900 dark:text-zinc-50 font-bold bg-white dark:bg-zinc-900/80 shadow-sm rounded-t-md"
                    : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 rounded-t-md"
                )}
                style={{
                  background: isActive ? undefined : "none",
                  borderRadius: "0.5rem 0.5rem 0 0", // top rounded
                  boxShadow: isActive ? "0 2px 8px 0 rgba(0,0,0,0.04)" : undefined,
                  outline: "none",
                  minWidth: 0,
                }}
                aria-selected={isActive}
                role="tab"
                tabIndex={isActive ? 0 : -1}
              >
                {/* Icon for each package manager with color/fade */}
                {name === "npm" && (
                  <SiNpm size={18} color={isActive ? "#CB3837" : "#666"} />
                )}
                {name === "pnpm" && (
                  <SiPnpm size={18} color={isActive ? "#F9DC3E" : "#666"} />
                )}
                {name === "yarn" && (
                  <FaYarn size={18} color={isActive ? "#2C8EBB" : "#666"} />
                )}
                {name === "bun" && (
                  <SiBun size={18} color={isActive ? "#FBF0DF" : "#666"} />
                )}
                {name}
              </button>
            );
          })}
        </div>
        <CodeCopy
          className="relative top-0 right-0 text-zinc-900 dark:text-zinc-50"
          code={fullCommand}
        />
      </div>

      <div className="text-sm text-left font-mono text-nowrap font-medium bg-white dark:bg-zinc-950 px-4 py-4 overflow-x-auto max-w-full min-w-0">
        <span className="text-amber-400">{PM_COMMANDS[pm]}</span>{" "}
        <span className="text-teal-500">shadcn@latest</span>{" "}
        <span className="text-zinc-700 dark:text-zinc-300">{finalCommand}</span>
      </div>
    </div>
  );
};
