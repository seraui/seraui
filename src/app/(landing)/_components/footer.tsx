import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-4 text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-300">
      <span>© 2025 Berlix UI. All rights reserved.</span>
      <span>
        built with 🔥 by{" "}
        <Link
          href="https://rechesoares.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Reche
        </Link>
      </span>
    </div>
  );
};
