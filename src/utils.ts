import { useState, useEffect } from "react";
import { MOBILE_BREAKPOINT } from "./constants";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);

  useEffect(() => {
    function checkWidth() {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    }

    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return isMobile;
}
