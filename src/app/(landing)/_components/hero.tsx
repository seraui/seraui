"use client";

import { motion } from "motion/react";
import { GitHubIcon } from "@/assets/icons/github";
import { ArrowRight } from "lucide-react";
import { TailwindIcon } from "@/assets/icons/tailwind";
import { ReactIcon } from "@/assets/icons/react";
import { MotionIcon } from "@/assets/icons/motion";
import { ShadcnIcon } from "@/assets/icons/shadcn";
import { TypeScriptIcon } from "@/assets/icons/typescript";
import { LoadingLink } from "@/components/ui";

export const Hero = () => {
  return (
    <div className="items-center my-40">
      <div className="flex-1 flex flex-col items-center text-center">
        <motion.h1
          initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="font-bold flex flex-col text-5xl capitalize tracking-tight leading-[1.3]"
        >
          <span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b dark:from-zinc-50 from-zinc-950 dark:via-white via-zinc-800 dark:to-zinc-950 to-zinc-600">
              Breathe
            </span>{" "}
            <span className="bg-gradient-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Motion
            </span>
          </span>
          <span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b dark:from-zinc-50 from-zinc-950 dark:via-white via-zinc-800 dark:to-zinc-950 to-zinc-600">
              into your
            </span>{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 via-violet-600 to-blue-600 bg-clip-text text-transparent">
              Components
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
          className="text-base md:text-xl font-medium text-zinc-600 dark:text-zinc-400 mt-4 max-w-[32ch]"
        >
          Motion-first components for React, built with Tailwind CSS and Motion.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeInOut" }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 w-full"
        >
          <LoadingLink href="/docs">
            <motion.div
              whileHover="hover"
              variants={{
                hover: {
                  boxShadow: "0px 12px 15px -12px rgba(234,88,12,1)",
                },
              }}
              className="w-full md:w-fit cursor-pointer flex items-center justify-center gap-2 px-8 h-12 py-3 rounded-full bg-zinc-950 text-zinc-50 font-medium dark:bg-zinc-50 dark:text-zinc-900"
            >
              <span>Get Started</span>
              <motion.div variants={{ hover: { x: 5 } }}>
                <ArrowRight />
              </motion.div>
            </motion.div>
          </LoadingLink>

          <motion.a
            href="https://github.com/reche13/berlix"
            className="w-full md:w-fit cursor-pointer flex items-center justify-center gap-2 h-12 px-8 py-3 rounded-full border-2 border-zinc-950 dark:text-zinc-50 font-medium dark:border-zinc-50 text-zinc-900"
          >
            <GitHubIcon className="size-4 fill-zinc-950 dark:fill-zinc-50" />
            Star on GitHub
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
          className="mt-8 flex flex-col gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50"
        >
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            ✨ Try the loading bar - click any navigation link!
          </span>
          <div className="flex flex-wrap gap-2 justify-center">
            <LoadingLink
              href="/docs/text-circle"
              className="px-3 py-1 text-xs rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/50 transition-colors"
            >
              Text Circle
            </LoadingLink>
            <LoadingLink
              href="/docs/text-reveal"
              className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              Text Reveal
            </LoadingLink>
            <LoadingLink
              href="/docs/flip-card"
              className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
            >
              Flip Card
            </LoadingLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
          className="mt-8 flex flex-col gap-2"
        >
          <span className="text-base font-medium text-zinc-500 dark:text-zinc-300">
            Built with
          </span>

          <div className="flex items-center gap-3">
            <ReactIcon className="fill-zinc-500 dark:fill-zinc-300 size-8" />
            <TypeScriptIcon className="fill-zinc-500 dark:fill-zinc-300 size-8" />
            <TailwindIcon className="fill-zinc-500 dark:fill-zinc-300 size-8" />
            <MotionIcon className="fill-zinc-500 dark:fill-zinc-300 size-12" />
            <ShadcnIcon className="stroke-zinc-500 dark:stroke-zinc-300 size-8" />
          </div>
        </motion.div>
      </div>
      {/* <div className="flex-1">TODO: image</div> */}
    </div>
  );
};
