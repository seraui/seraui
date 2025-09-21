import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaDiscord, FaFacebook } from "react-icons/fa";

export const Footer = () => {
  return (
    
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur px-4 sm:px-6 py-4 sm:py-6 text-xs sm:text-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="text-zinc-500 dark:text-zinc-400 text-center md:text-left">
          © {new Date().getFullYear()} Sera UI ·{" "}
          <Link
            href="/docs"
            className="text-zinc-700 dark:text-zinc-100 font-medium hover:underline"
          >
            Docs
          </Link>
        </div>
    <div className="flex items-center gap-4 text-xl text-zinc-500 dark:text-zinc-400">
          <a
            href="https://github.com/seraui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-zinc-900 dark:hover:text-white"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/company/pimjo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://discord.gg/whEJ7K8de"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <FaDiscord />
          </a>
          <a
            href="https://www.facebook.com/pimjoHQ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaFacebook />
          </a>
        </div>

        <div className="text-zinc-500 dark:text-zinc-400 text-center md:text-right">
          <span className="mr-1">An Open-source Project by</span>
          <a
            href="https://pimjo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-700 dark:text-zinc-100 hover:underline"
          >
            Pimjo
          </a>
        </div>
      </div>
    </footer>
  );
};
