'use client'
import React from "react";

export default function SpotlightCard() {
  return (
    <>
      <style jsx>{`
        @property --border-angle {
          syntax: "<angle>";
          inherits: true;
          initial-value: 0deg;
        }

        /* * Keyframes for the border animation.
         * We animate the --border-angle custom property from 0deg to 360deg.
         * This changing angle is used in the conic-gradient background of the card,
         * creating the effect of a rotating highlight.
        */
        @keyframes border-spin {
          100% {
            --border-angle: 360deg;
          }
        }

        /* * The .animate-border class applies the animation.
         * The animation 'border-spin' runs for 6 seconds, is linear, and repeats infinitely.
        */
        .animate-border {
            animation: border-spin 6s linear infinite;
        }
      `}</style>
    <div className="w-full flex items-center justify-center p-4">
      {/* * The outer div creates the animated border effect.
       * The accent color has been changed to a teal/cyan theme.
       */}
      <div className="w-full max-w-[422px] mx-auto [background:linear-gradient(45deg,#080b11,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,theme(colors.teal.500)_86%,theme(colors.cyan.300)_90%,theme(colors.teal.500)_94%,theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border">
        {/* The inner div holds the content, with the grid background image style. */}
        <div className="relative text-center z-10 px-8 py-12 rounded-2xl w-full bg-white dark:bg-black h-full mx-auto">
          {/* Card Header */}
          <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
            Sign In
          </h1>
          <p className="text-sm mt-2 text-gray-600 dark:text-slate-400">
            Choose your preferred login method
          </p>

          {/* Login Buttons Container */}
          <div className="flex flex-col gap-4 mt-8">
            {/* Google Login Button */}
            <button className="flex items-center justify-center gap-3 w-full px-4 py-2.5 bg-gray-100 dark:bg-slate-800/60 backdrop-blur-sm text-black dark:text-white rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700/60 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-cyan-400">
              {/* New, cleaner Google SVG Icon */}
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* GitHub Login Button */}
            <button className="flex items-center justify-center gap-3 w-full px-4 py-2.5 bg-gray-100 dark:bg-slate-800/60 backdrop-blur-sm text-black dark:text-white rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700/60 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-cyan-400">
              {/* GitHub SVG Icon */}
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.577.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
              <span>Sign in with GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
