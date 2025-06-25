"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export const PM_COMMANDS = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun: "bunx",
} as const;

export const PM_INSTALL_COMMANDS = {
  npm: "npm install",
  pnpm: "pnpm add",
  yarn: "yarn add",
  bun: "bun add",
} as const;

export const PM_CREATE_COMMANDS = {
  npm: "npm create",
  pnpm: "pnpm create",
  yarn: "yarn create",
  bun: "bun create",
} as const;

interface PackageManagerContextType {
  packageManager: PackageManager;
  setPackageManager: (pm: PackageManager) => void;
  getCommand: (type?: "dlx" | "install" | "create") => string;
}

const PackageManagerContext = createContext<PackageManagerContextType | undefined>(undefined);

interface PackageManagerProviderProps {
  children: React.ReactNode;
}

export function PackageManagerProvider({ children }: PackageManagerProviderProps) {
  const [packageManager, setPackageManagerState] = useState<PackageManager>("npm");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("preferred-package-manager");
    if (saved && (saved === "npm" || saved === "pnpm" || saved === "yarn" || saved === "bun")) {
      setPackageManagerState(saved as PackageManager);
    }
  }, []);

  // Save to localStorage when changed
  const setPackageManager = (pm: PackageManager) => {
    setPackageManagerState(pm);
    localStorage.setItem("preferred-package-manager", pm);
  };

  // Helper function to get the appropriate command
  const getCommand = (type: "dlx" | "install" | "create" = "dlx") => {
    switch (type) {
      case "dlx":
        return PM_COMMANDS[packageManager];
      case "install":
        return PM_INSTALL_COMMANDS[packageManager];
      case "create":
        return PM_CREATE_COMMANDS[packageManager];
      default:
        return PM_COMMANDS[packageManager];
    }
  };

  return (
    <PackageManagerContext.Provider
      value={{
        packageManager,
        setPackageManager,
        getCommand,
      }}
    >
      {children}
    </PackageManagerContext.Provider>
  );
}

export function usePackageManager() {
  const context = useContext(PackageManagerContext);
  if (context === undefined) {
    throw new Error("usePackageManager must be used within a PackageManagerProvider");
  }
  return context;
}
