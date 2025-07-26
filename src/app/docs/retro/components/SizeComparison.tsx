"use client";
import React from "react";
import Button from "../retro";

const StarIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function SizeComparison() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Button variant="default" size="sm">
        Small
      </Button>
      <Button variant="default" size="md">
        Medium
      </Button>
      <Button variant="default" size="lg">
        Large
      </Button>
      <Button variant="default" size="icon" aria-label="Icon size">
        <StarIcon />
      </Button>
    </div>
  );
}
