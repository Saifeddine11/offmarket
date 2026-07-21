"use client";

import { useEffect, useState, type RefObject } from "react";

type UseOnceInViewOptions = {
  /** Element to observe; falls back to `fallbackRef` when null. */
  targetId?: string;
  fallbackRef?: RefObject<Element | null>;
  rootMargin?: string;
  threshold?: number | number[];
  /** When true, skip waiting and report visible immediately. */
  forceVisible?: boolean;
};

/**
 * Fires once when the target enters the viewport.
 * Honors `prefers-reduced-motion` by reporting visible immediately.
 */
export function useOnceInView({
  targetId,
  fallbackRef,
  rootMargin = "0px 0px -10% 0px",
  threshold = [0, 0.15, 0.28],
  forceVisible = false,
}: UseOnceInViewOptions = {}): { visible: boolean; reducedMotion: boolean } {
  const [visible, setVisible] = useState(forceVisible);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (forceVisible) {
      setVisible(true);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);
    if (reduced) {
      setVisible(true);
      return;
    }

    const target =
      (targetId ? document.getElementById(targetId) : null) ??
      fallbackRef?.current ??
      null;

    if (!target) {
      setVisible(true);
      return;
    }

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      setVisible(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(target);

    const rect = target.getBoundingClientRect();
    if (
      rect.top < window.innerHeight * 0.85 &&
      rect.bottom > window.innerHeight * 0.1
    ) {
      start();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, [forceVisible, fallbackRef, rootMargin, targetId, threshold]);

  return { visible, reducedMotion };
}
