"use client";

import { useEffect, useState } from "react";

export function useScreenSize() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkScreenSize = () => {
        setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint in Tailwind
      };

      checkScreenSize();

      window.addEventListener("resize", checkScreenSize);

      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, []);

  return { isLargeScreen };
}
