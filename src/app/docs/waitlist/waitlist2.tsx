'use client';
import React, { useState, useEffect } from 'react';

// Header Component
const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Placeholder for Logo */}
      <div className="w-12 h-12 bg-yellow-400 dark:bg-yellow-500 flex items-center justify-center rounded-lg shadow-md dark:shadow-gray-800">
        <span className="text-gray-900 dark:text-black font-bold text-2xl">M</span> {/* Or an actual SVG/Image */}
      </div>
      <p className="mt-4 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
        Available in early 2025
      </p>
    </div>
  );
};

// Early Access Section Component
const EarlyAccessSection: React.FC = () => {
  return (
    <div className="text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
        Get early access
      </h1>
      <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        Be amongst the first to experience Walt and launch a viral waitlist. Sign up to be notified when we launch!
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <label htmlFor="email-input" className="sr-only">Email address</label>
        <input
          id="email-input"
          type="email"
          placeholder="Email"
          className="w-full sm:w-80 px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:shadow-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          aria-label="Enter your email address"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-yellow-400 dark:bg-yellow-500 text-gray-900 dark:text-black font-semibold rounded-lg shadow-md dark:shadow-gray-800 hover:bg-yellow-500 dark:hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 focus:ring-offset-2 dark:focus:ring-offset-black transition duration-300 ease-in-out"
        >
          Join waitlist
        </button>
      </div>
    </div>
  );
};

// Main Waitlist Page Component
const Waitlist2: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-12 px-4 font-sans">
      <div className="bg-white dark:bg-black rounded-xl dark:shadow-gray-800 p-8 w-full max-w-4xl lg:p-12 border dark:border-gray-700">
        <Header />
        <EarlyAccessSection />
        {/* The WaitlistStats and VideoSection components have been removed */}
      </div>
    </div>
  );
};

export default Waitlist2;
