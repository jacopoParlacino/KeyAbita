import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the viewport width matches desktop size.
 *
 * @param {number} [breakpoint=768] - Minimum width in pixels to consider "desktop".
 * @returns {boolean} True if window.innerWidth > breakpoint, otherwise false.
 *
 * @example
 * const isDesktop = useIsDesktop(1024);
 * return <div>{isDesktop ? "Desktop layout" : "Mobile layout"}</div>;
 */
export default function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth > breakpoint);

    checkWidth(); // on mount
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [breakpoint]);

  return isDesktop;
}
