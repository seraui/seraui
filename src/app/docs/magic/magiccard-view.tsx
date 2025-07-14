'use client';

import React from 'react';
import MagicContainer from './magiccard';
import type { SVGProps } from 'react';

/* ------------------------------------------------------------------ */
/*                               Icons                                */
/* ------------------------------------------------------------------ */

const BackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const MoreIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const VerifiedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    {...props}
  >
    <polygon
      fill="#42a5f5"
      points="29.62 3 33.053 8.308 39.367 8.624 39.686 14.937 44.997 18.367 42.116 23.995 45 29.62 39.692 33.053 39.376 39.367 33.063 39.686 29.633 44.997 24.005 42.116 18.38 45 14.947 39.692 8.633 39.376 8.314 33.063 3.003 29.633 5.884 24.005 3 18.38 8.308 14.947 8.624 8.633 14.937 8.314 18.367 3.003 23.995 5.884"
    />
    <polygon
      fill="#fff"
      points="21.396 31.255 14.899 24.76 17.021 22.639 21.428 27.046 30.996 17.772 33.084 19.926"
    />
  </svg>
);

const StarIcon = ({
  className,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*                         MagicCardView Component                     */
/* ------------------------------------------------------------------ */

export default function MagicCardView() {
  /* --------------------------- Fallback URLs -------------------------- */
  const coverFallback =
    'https://placehold.co/400x128/cccccc/cccccc?text=.';
  const profileFallback =
    'https://placehold.co/100x100/cccccc/ffffff?text=NH';

  /* ----------------------- Render ----------------------- */
  return (
    <div className="flex items-center justify-center p-4 font-sans">
      <MagicContainer className="w-full max-w-sm">
        <div className="w-full rounded-[23px] bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="relative h-32">
            <img
              src="https://i.postimg.cc/hPqqvz2L/Screenshot-2025-07-12-182051.png"
              alt="Cover"
              className="w-full h-full object-cover"
              onError={e => {
                (e.currentTarget as HTMLImageElement).src = coverFallback;
              }}
            />

            <div className="absolute top-4 left-4">
              <button
                type="button"
                className="bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition-colors"
              >
                <BackIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute top-4 right-4">
              <button
                type="button"
                className="bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition-colors"
              >
                <MoreIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute right-6 -bottom-5">
              <button
                type="button"
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full py-2 px-4 flex items-center gap-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-semibold"
              >
                <HeartIcon className="w-5 h-5 text-red-500" />
                <span>Like</span>
              </button>
            </div>
          </div>

          {/* Main Body */}
          <div className="relative p-6 pt-0">
            {/* Profile Image */}
            <div className="absolute left-6 -top-12">
              <div className="relative">
                <img
                  src="https://i.postimg.cc/W1rCvYnT/nazmul-hossain.jpg"
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).src =
                      profileFallback;
                  }}
                />
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
              </div>
            </div>

            {/* Top Stats */}
            <div className="flex justify-end items-center pt-6 mb-2">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>404 posts</span>
                <span>1.6 k likes</span>
              </div>
            </div>

            {/* User Info */}
            <div className="text-left pt-2">
              <div className="flex items-center gap-1">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Nazmul Hossain
                </h2>
                <VerifiedIcon className="w-5 h-5" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">@nazmul</p>
              <p className="text-gray-700 dark:text-gray-300 leading-snug mb-4">
                I will inspire 10 million people to do what they love
                the best they can!
              </p>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-yellow-400">
                  <StarIcon className="w-5 h-5" />
                  <StarIcon className="w-5 h-5" />
                  <StarIcon className="w-5 h-5" />
                  <StarIcon className="w-5 h-5" />
                  <StarIcon className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                  26 reviews
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white dark:bg-gray-900 p-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-left mb-4">
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold px-3 py-1 rounded-full">
                UI/UX Design
              </span>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold px-3 py-1 rounded-full">
                React
              </span>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold px-3 py-1 rounded-full">
                Node.js
              </span>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold px-3 py-1 rounded-full">
                Public Speaking
              </span>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold px-3 py-1 rounded-full">
                Mentorship
              </span>
            </div>
          </div>
        </div>
      </MagicContainer>
    </div>
  );
}
