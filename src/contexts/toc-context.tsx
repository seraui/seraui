"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TOCContextType {
  showTOC: boolean;
  setShowTOC: (show: boolean) => void;
}

const TOCContext = createContext<TOCContextType | undefined>(undefined);

export function TOCProvider({ children }: { children: ReactNode }) {
  const [showTOC, setShowTOC] = useState(true);

  return (
    <TOCContext.Provider value={{ showTOC, setShowTOC }}>
      {children}
    </TOCContext.Provider>
  );
}

export function useTOC() {
  const context = useContext(TOCContext);
  if (context === undefined) {
    throw new Error("useTOC must be used within a TOCProvider");
  }
  return context;
}
