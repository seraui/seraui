"use client";
import React from "react";
import Button from "../retro-btn";

export default function InteractiveDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <div className="text-center">
        <Button variant="default" size="md" className="w-full mb-2">
          Hover Me!
        </Button>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Default button with shadow animation
        </p>
      </div>
      <div className="text-center">
        <Button variant="outline" size="md" className="w-full mb-2">
          Try This One
        </Button>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Outline button with fill animation
        </p>
      </div>
      <div className="text-center">
        <Button variant="secondary" size="md" className="w-full mb-2">
          And This!
        </Button>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Secondary button with smooth transitions
        </p>
      </div>
    </div>
  );
}
