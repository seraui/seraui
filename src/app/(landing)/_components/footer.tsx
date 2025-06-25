import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-4 text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-300">
      <span>© {new Date().getFullYear()} Sera UI. All rights reserved.</span>
      <span>
        Built by{" "}
        <Link
          href="https://seraprogrammer.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Sera Programmer
        </Link>
      </span>
    </div>
  );
};
