"use client";
import React from "react";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  variant?: "solid" | "dashed" | "dotted";
  thickness?: number;
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

const Divider = ({
  orientation = "horizontal",
  decorative = true,
  variant = "solid",
  thickness = 1,
  color,
  className = "",
  children,
  ...props
}: DividerProps) => {
  const baseClasses = "flex items-center";
  const orientationClasses =
    orientation === "horizontal" ? "w-full my-8" : "h-full self-stretch mx-8";

  // Build border style based on variant
  const variantStyles = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted",
  };

  // Build color style
  const colorStyle = color ? { borderColor: color } : {};

  // Build thickness style
  const thicknessStyle =
    orientation === "horizontal"
      ? { borderTopWidth: `${thickness}px` }
      : { borderLeftWidth: `${thickness}px` };

  // The line itself
  const lineClasses = `
    flex-grow
    ${orientation === "horizontal" ? "border-t" : "border-l"}
    ${variantStyles[variant]}
    ${!color ? "border-border-[#13131d] dark:border-[#13131d]" : ""}
  `;

  return (
    <div
      className={`${baseClasses} ${orientationClasses} ${className}`}
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      {...props}
    >
      {children ? (
        <>
          <div
            className={lineClasses}
            style={{ ...colorStyle, ...thicknessStyle }}
          ></div>
          <span className="flex items-center px-4 text-sm text-zinc-500 font-medium">
            {children}
          </span>
          <div
            className={lineClasses}
            style={{ ...colorStyle, ...thicknessStyle }}
          ></div>
        </>
      ) : (
        <div
          className={lineClasses}
          style={{ ...colorStyle, ...thicknessStyle }}
        ></div>
      )}
    </div>
  );
};

export default Divider;
