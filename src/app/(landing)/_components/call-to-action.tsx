import { Cli } from "@/components/site/cli";
import React from "react";

export const CallToAction = () => {
  return (
    <div className="md:mt-20 flex items-center justify-between gap-20 w-full">
      <div className="flex-1 flex flex-col items-center text-center w-full">
        <h1 className="font-bold flex flex-col text-xl md:text-3xl text-zinc-900 dark:text-zinc-50 capitalize tracking-tight leading-[1.3]">
          Copy. Paste. Use.
        </h1>
        <p className="text-base md:text-xl font-medium text-zinc-600 dark:text-zinc-400 mt-2 max-w-[32ch]">
          Instantly copy - paste components or install via CLI. No setup
          required.
        </p>

        <div className="mt-16 w-full max-w-[750px] border-zinc-200 dark:border-zinc-800 rounded-lg border">
          <Cli
            command={`add "https://berlix.vercel.app/registry/text-reveal.json"`}
          />
        </div>
      </div>
    </div>
  );
};
