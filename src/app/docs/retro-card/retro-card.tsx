"use client";
import React from "react";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

interface RetroCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const RetroCard = React.forwardRef<HTMLDivElement, RetroCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#00ff84] border-2 border-black dark:border-white p-2 transition-all duration-300 shadow-[4px_4px_0px_black] dark:shadow-[4px_4px_0px_white] hover:shadow-[8px_8px_0px_black] dark:hover:shadow-[8px_8px_0px_white] hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {/* The inner container holds all the content. */}
        <div className="bg-white dark:bg-gray-900 border-2 border-black dark:border-white">
          {/* Content Area */}
          <div className="p-4 text-black dark:text-white">{children}</div>
        </div>
      </div>
    );
  }
);

RetroCard.displayName = "RetroCard";
export default RetroCard;
