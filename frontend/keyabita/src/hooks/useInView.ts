import { useEffect, useRef, useState } from "react";


/**
 * Custom hook to detect when an element enters the viewport.
 *
 * @template T - HTML element type (e.g., HTMLDivElement, HTMLImageElement)
 * @param {IntersectionObserverInit} [options={ threshold: 0.2 }] - IntersectionObserver options.
 * @param {number} [options.threshold=0.2] - Percentage of the element visible to trigger `isInView`.
 * @param {Element | null} [options.root=null] - Element that is used as the viewport for checking visibility.
 * @param {string} [options.rootMargin="0px"] - Margin around the root.
 *
 * @returns {{ ref: React.RefObject<T>, isInView: boolean }}
 *  - `ref`: attach to the element you want to observe.
 *  - `isInView`: true if the element has entered the viewport.
 *
 * @example
 * const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.5 });
 * return <div ref={ref}>{isInView ? "Visible" : "Not visible"}</div>;
 */
export function useInView<T extends HTMLElement>(options: IntersectionObserverInit = { threshold: 0.2 }) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // Only one start
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}
