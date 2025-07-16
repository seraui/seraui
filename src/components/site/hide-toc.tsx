"use client";

import { useEffect } from "react";
import { useTOC } from "@/contexts/toc-context";

export function HideTOC() {
  const { setShowTOC } = useTOC();

  useEffect(() => {
    setShowTOC(false);
    
    // Cleanup: restore TOC when component unmounts
    return () => {
      setShowTOC(true);
    };
  }, [setShowTOC]);

  return null;
}
