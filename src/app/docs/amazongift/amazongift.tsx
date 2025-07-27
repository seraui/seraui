"use client";
import React, { useState } from "react";

const ChevronPatternIcon = () => (
  <svg
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 z-0"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="chevron"
        patternUnits="userSpaceOnUse"
        width="20"
        height="20"
        patternTransform="scale(1) rotate(45)"
      >
        <rect
          x="0"
          y="0"
          width="10"
          height="20"
          fill="rgba(255, 255, 255, 0.03)"
          className="dark:fill-white/[0.03] fill-black/[0.03]"
        />
        <rect
          x="10"
          y="0"
          width="10"
          height="20"
          fill="rgba(255, 255, 255, 0.05)"
          className="dark:fill-white/[0.05] fill-black/[0.05]"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#chevron)" />
  </svg>
);

export default function AmazonGiftCard() {
  const [couponCode, setCouponCode] = useState("");

  return (
    <div className="font-sans antialiased text-gray-900 dark:text-white w-full flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1E1B29] rounded-2xl p-6 sm:p-8 shadow-2xl relative max-w-sm w-full border border-gray-200 dark:border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-8">
          <div
            className="w-full h-full bg-gray-100 dark:bg-[#100E16] rounded-b-full border-x border-b border-gray-200 dark:border-white/10"
            style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}
          ></div>
        </div>

        <div className="text-center mb-8 pt-6">
          <h1 className="text-gray-900 dark:text-white text-2xl font-bold">
            Amazon $100 Gift Card
          </h1>
          <p className="text-gray-600 dark:text-[#9A97A5] text-sm mt-2 px-4">
            Click the button below to redeem your amazon gift code.
          </p>
        </div>

        <div className="bg-gray-50/80 dark:bg-white/[.03] backdrop-blur-md rounded-lg p-4 border border-gray-200 dark:border-white/10 shadow-inner">
          <div className="flex justify-between items-center text-gray-900 dark:text-white mb-4">
            <span className="font-medium">Amazon.com</span>
            <span className="font-bold text-lg">$100</span>
          </div>

          <div className="bg-gray-100/50 dark:bg-black/20 rounded-md relative flex items-center justify-between overflow-hidden transition-all duration-300 ring-1 ring-transparent focus-within:ring-purple-500/50 dark:focus-within:ring-[#8A2EFF]/50">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="AS25-NJZ1-KLO9"
              className="bg-transparent border-none focus:ring-0 text-gray-700 dark:text-white/70 font-mono text-xl tracking-[0.3em] w-full z-10 outline-none p-3 placeholder-gray-500 dark:placeholder-white/70 text-left"
              aria-label="Gift card code input"
            />

            <div className="absolute inset-y-0 right-0 w-3/5 pointer-events-none">
              <ChevronPatternIcon />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to left, rgba(60, 56, 77, 1) 0%, rgba(60, 56, 77, 0.9) 50%, transparent 100%)",
                  clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
                }}
              ></div>

              <div
                className="absolute inset-y-0 right-[calc(60%-1px)] w-10 h-full bg-transparent"
                style={{
                  boxShadow: "-7px 0 15px -2px rgba(0,0,0,0.5)",
                  transform: "skewX(-15deg)",
                  transformOrigin: "right",
                }}
              ></div>
            </div>
          </div>
        </div>

        <button
          className="bg-purple-600 hover:bg-purple-700 dark:bg-[#8A2EFF] dark:hover:bg-[#7b29e0] text-white font-bold py-3 rounded-lg w-full mt-8 transition-all duration-300"
          style={{
            boxShadow:
              "0 0 25px rgba(138, 46, 255, 0.5), 0 5px 15px -5px rgba(138, 46, 255, 0.4)",
          }}
        >
          Claim Your Coupon
        </button>

        <p className="text-gray-500 dark:text-[#6C6A7B] text-xs text-center mt-4">
          Grab this coupon code and remember to use it within 30 days, so you
          don&apos;t miss out!
        </p>
      </div>
    </div>
  );
}
