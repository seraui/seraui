"use client";

import React, { useEffect, useState } from "react";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "blue" | "pink" | "green";
}

const variants = {
  blue: {
    light: {
      outerGlow: "rgba(59, 130, 246, 0.4)",
      blobGlow: "rgba(59, 130, 246, 0.6)",
      blobHighlight: "#60a5fa",
      blobShadow: "rgba(59, 130, 246, 0.25)",
      innerGlow: "rgba(59, 130, 246, 0.1)",
      innerHighlight: "rgba(147, 197, 253, 0.15)",
      outerBg: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      innerBg: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
      textColor: "#1e293b",
    },
    dark: {
      outerGlow: "rgba(255, 255, 255, 0.35)",
      blobGlow: "rgba(0, 0, 255, 0.5)",
      blobHighlight: "#3fe9ff",
      blobShadow: "rgba(0, 81, 255, 0.18)",
      innerGlow: "rgba(0, 0, 255, 0.07)",
      innerHighlight: "rgba(0, 225, 255, 0.1)",
      outerBg: "radial-gradient(circle 80px at 80% -10%, #ffffff, #181b1b)",
      innerBg: "radial-gradient(circle 80px at 80% -50%, #777777, #0f1111)",
      textColor: "#ffffff",
    },
  },
  pink: {
    light: {
      outerGlow: "rgba(236, 72, 153, 0.4)",
      blobGlow: "rgba(236, 72, 153, 0.6)",
      blobHighlight: "#f472b6",
      blobShadow: "rgba(236, 72, 153, 0.25)",
      innerGlow: "rgba(236, 72, 153, 0.1)",
      innerHighlight: "rgba(251, 207, 232, 0.15)",
      outerBg: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
      innerBg: "linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)",
      textColor: "#831843",
    },
    dark: {
      outerGlow: "rgba(255, 230, 255, 0.4)",
      blobGlow: "rgba(255, 0, 150, 0.5)",
      blobHighlight: "#ff66cc",
      blobShadow: "rgba(255, 0, 150, 0.18)",
      innerGlow: "rgba(255, 0, 150, 0.07)",
      innerHighlight: "rgba(255, 102, 204, 0.1)",
      outerBg: "radial-gradient(circle 80px at 80% -10%, #ffffff, #181b1b)",
      innerBg: "radial-gradient(circle 80px at 80% -50%, #777777, #0f1111)",
      textColor: "#ffffff",
    },
  },
  green: {
    light: {
      outerGlow: "rgba(34, 197, 94, 0.4)",
      blobGlow: "rgba(34, 197, 94, 0.6)",
      blobHighlight: "#4ade80",
      blobShadow: "rgba(34, 197, 94, 0.25)",
      innerGlow: "rgba(34, 197, 94, 0.1)",
      innerHighlight: "rgba(187, 247, 208, 0.15)",
      outerBg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      innerBg: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
      textColor: "#14532d",
    },
    dark: {
      outerGlow: "rgba(230, 255, 230, 0.4)",
      blobGlow: "rgba(0, 255, 100, 0.5)",
      blobHighlight: "#adff2f",
      blobShadow: "rgba(0, 255, 100, 0.18)",
      innerGlow: "rgba(0, 255, 100, 0.07)",
      innerHighlight: "rgba(173, 255, 47, 0.1)",
      outerBg: "radial-gradient(circle 80px at 80% -10%, #ffffff, #181b1b)",
      innerBg: "radial-gradient(circle 80px at 80% -50%, #777777, #0f1111)",
      textColor: "#ffffff",
    },
  },
};

// Custom hook to detect theme
const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", checkTheme);
    };
  }, []);

  return isDark;
};

const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  variant = "blue",
}) => {
  const isDark = useTheme();
  const variantColors = variants[variant] || variants.blue;
  const colors = isDark ? variantColors.dark : variantColors.light;

  return (
    <button
      className="relative cursor-pointer rounded-2xl border-none p-0.5 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
      style={{
        background: colors.outerBg,
      }}
    >
      <div
        className="absolute top-0 right-0 h-[60%] w-[65%] rounded-[120px] -z-10"
        style={{ boxShadow: `0 0 30px ${colors.outerGlow}` }}
      ></div>

      <div
        className="absolute bottom-0 left-0 h-full w-[70px] rounded-2xl"
        style={{
          boxShadow: `-10px 10px 30px ${colors.blobShadow}`,
          background: `radial-gradient(circle 60px at 0% 100%, ${colors.blobHighlight}, ${colors.blobGlow}, transparent)`,
        }}
      ></div>

      <div
        className="relative z-20 flex h-11 items-center justify-center overflow-hidden rounded-[14px] px-8"
        style={{
          background: colors.innerBg,
          color: colors.textColor,
        }}
      >
        <div
          className="absolute top-0 left-0 h-full w-full rounded-[14px]"
          style={{
            background: `radial-gradient(circle 60px at 0% 100%, ${colors.innerHighlight}, ${colors.innerGlow}, transparent)`,
          }}
        ></div>

        <span className="relative z-10 whitespace-nowrap text-lg font-semibold">
          {children}
        </span>
      </div>
    </button>
  );
};

export default function SeraButtonView() {
  return (
    <div className="flex gap-5">
      <GlowButton variant="blue">Blue Glow</GlowButton>
      <GlowButton variant="pink">Pink Glow</GlowButton>
      <GlowButton variant="green">Green Glow</GlowButton>
    </div>
  );
}
