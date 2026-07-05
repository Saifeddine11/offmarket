"use client";

import { animate, inView, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

import { MOTION_EASE } from "@/lib/motion/config";

declare global {
  interface Window {
    __omTerritoriesBoot?: () => void;
    OM_BLOG_boot?: () => void;
    __omQuartiersMotionBoot?: () => void;
  }
}

const TERRITORY_HEADER_TITLE_SELECTOR =
  "#quartiers-territories .om-territories__title";
const TERRITORY_CARD_SELECTOR =
  ".om-territories--quartiers-page [data-om-territory-card], .om-territories--quartiers-page [data-om-territory-mobile-card]";
const BLOG_CARD_SELECTOR = "#quartiers-blog .om-blog-card";
const BLOG_HEADER_SELECTOR =
  "#quartiers-blog .om-blog-section__eyebrow, #quartiers-blog .om-blog-section__title, #quartiers-blog .om-blog-section__lead";
const BLOG_TABS_SELECTOR = "#quartiers-blog .om-blog-categories";

function isMobile() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function isInViewport(node: Element) {
  const rect = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewportHeight * 0.92 && rect.bottom > viewportHeight * 0.08;
}

function isLayoutVisible(node: HTMLElement) {
  if (!node.isConnected) return false;

  const style = getComputedStyle(node);
  if (style.display === "none" || style.visibility === "hidden") return false;

  let parent = node.parentElement;
  while (parent) {
    const parentStyle = getComputedStyle(parent);
    if (parentStyle.display === "none" || parentStyle.visibility === "hidden") {
      return false;
    }
    parent = parent.parentElement;
  }

  return node.getClientRects().length > 0;
}

function bindInViewReveal(node: HTMLElement, reveal: () => void) {
  const safety = window.setTimeout(() => {
    if (parseFloat(getComputedStyle(node).opacity) < 0.5) {
      reveal();
    }
  }, 2500);

  const stop = inView(
    node,
    () => {
      window.clearTimeout(safety);
      reveal();
      stop();
    },
    { amount: 0.05 },
  );
}

function animateTerritoryCard(card: HTMLElement, index: number) {
  if (card.dataset.omMotionBound === "true") return;
  if (!isLayoutVisible(card)) return;
  card.dataset.omMotionBound = "true";

  const mobile = isMobile();
  const media = card.querySelector<HTMLElement>(
    ".om-territories__card-media, .om-territories__mobile-media",
  );
  const number = card.querySelector<HTMLElement>(".om-territories__card-number");
  const copy = card.querySelector<HTMLElement>(
    ".om-territories__card-copy--idle, .om-territories__card-copy",
  );

  const reveal = () => {
    animate(
      card,
      {
        opacity: 1,
        y: 0,
        scale: 1,
      },
      {
        duration: mobile ? 0.85 : 1.05,
        ease: MOTION_EASE,
        delay: index * (mobile ? 0.08 : 0.14),
      },
    );

    if (media) {
      animate(
        media,
        { scale: 1 },
        {
          duration: mobile ? 0.9 : 1.15,
          ease: MOTION_EASE,
          delay: index * (mobile ? 0.08 : 0.14) + 0.08,
        },
      );
    }

    if (number) {
      animate(
        number,
        { opacity: 1, y: 0 },
        {
          duration: 0.8,
          ease: MOTION_EASE,
          delay: index * (mobile ? 0.08 : 0.14) + 0.12,
        },
      );
    }

    if (copy) {
      animate(
        copy,
        { opacity: 1, y: 0 },
        {
          duration: 0.85,
          ease: MOTION_EASE,
          delay: index * (mobile ? 0.08 : 0.14) + 0.18,
        },
      );
    }
  };

  if (isInViewport(card)) {
    reveal();
    return;
  }

  card.style.opacity = "0";
  card.style.transform = mobile
    ? "translateY(40px) scale(0.98)"
    : "translateY(80px) scale(0.965)";

  if (media) {
    media.style.transform = "scale(1.08)";
  }
  if (number) {
    number.style.opacity = "0";
    number.style.transform = "translateY(16px)";
  }
  if (copy) {
    copy.style.opacity = "0";
    copy.style.transform = "translateY(20px)";
  }

  bindInViewReveal(card, reveal);
}

function animateBlogCard(card: HTMLElement, index: number) {
  if (card.dataset.omMotionBound === "true") return;
  if (!isLayoutVisible(card)) return;
  card.dataset.omMotionBound = "true";

  const mobile = isMobile();

  const reveal = () => {
    animate(
      card,
      {
        opacity: 1,
        y: 0,
        scale: 1,
      },
      {
        duration: mobile ? 0.8 : 0.95,
        ease: MOTION_EASE,
        delay: 0.12 + index * (mobile ? 0.08 : 0.12),
      },
    );
  };

  if (isInViewport(card)) {
    reveal();
    return;
  }

  card.style.opacity = "0";
  card.style.transform = mobile ? "translateY(28px) scale(0.99)" : "translateY(44px) scale(0.985)";

  bindInViewReveal(card, reveal);
}

function animateTitleMask(node: HTMLElement, index: number) {
  if (node.dataset.omMotionBound === "true") return;
  if (!isLayoutVisible(node)) return;
  node.dataset.omMotionBound = "true";

  const mobile = isMobile();
  const text = node.textContent ?? "";
  node.textContent = "";

  const line = document.createElement("span");
  line.className = "om-text-mask-reveal__line";

  const inner = document.createElement("span");
  inner.className = "om-text-mask-reveal__inner";
  inner.textContent = text;

  line.appendChild(inner);
  node.appendChild(line);

  inner.style.display = "block";
  inner.style.transform = mobile ? "translateY(60%)" : "translateY(110%)";
  inner.style.opacity = mobile ? "0.4" : "0.2";

  const reveal = () => {
    animate(
      inner,
      { y: "0%", opacity: 1 },
      {
        duration: mobile ? 0.85 : 1.1,
        ease: MOTION_EASE,
        delay: index * 0.08,
      },
    );
  };

  if (isInViewport(node)) {
    reveal();
    return;
  }

  bindInViewReveal(node, reveal);
}

function animateFadeNode(node: HTMLElement, index: number) {
  if (node.dataset.omMotionBound === "true") return;
  if (!isLayoutVisible(node)) return;
  node.dataset.omMotionBound = "true";

  const mobile = isMobile();

  const reveal = () => {
    animate(
      node,
      { opacity: 1, y: 0 },
      {
        duration: mobile ? 0.75 : 0.9,
        ease: MOTION_EASE,
        delay: index * (mobile ? 0.06 : 0.08),
      },
    );
  };

  if (isInViewport(node)) {
    reveal();
    return;
  }

  node.style.opacity = "0";
  node.style.transform = `translateY(${mobile ? 16 : 28}px)`;

  bindInViewReveal(node, reveal);
}

function bootDynamicMotion() {
  document.querySelectorAll<HTMLElement>(TERRITORY_HEADER_TITLE_SELECTOR).forEach(
    (node, index) => {
      animateTitleMask(node, index);
    },
  );

  document.querySelectorAll<HTMLElement>(TERRITORY_CARD_SELECTOR).forEach((card, index) => {
    animateTerritoryCard(card, index);
  });

  document.querySelectorAll<HTMLElement>(BLOG_CARD_SELECTOR).forEach((card, index) => {
    animateBlogCard(card, index);
  });

  document.querySelectorAll<HTMLElement>(BLOG_HEADER_SELECTOR).forEach((node, index) => {
    if (node.classList.contains("om-blog-section__title")) {
      animateTitleMask(node, index);
      return;
    }
    animateFadeNode(node, index);
  });

  document.querySelectorAll<HTMLElement>(BLOG_TABS_SELECTOR).forEach((node, index) => {
    animateFadeNode(node, index + 2);
  });
}

export function QuartiersDynamicMotion() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    window.__omQuartiersMotionBoot = bootDynamicMotion;

    const run = () => {
      bootDynamicMotion();
      window.setTimeout(bootDynamicMotion, 120);
      window.setTimeout(bootDynamicMotion, 450);
    };

    (window.__staticHtmlScriptQueue ?? Promise.resolve()).then(run);

    const blogRoot = document.querySelector("#quartiers-blog [data-om-blog-root]");
    let observer: MutationObserver | null = null;

    if (blogRoot && "MutationObserver" in window) {
      observer = new MutationObserver(bootDynamicMotion);
      observer.observe(blogRoot, { childList: true, subtree: true });
    }

    return () => {
      observer?.disconnect();
      delete window.__omQuartiersMotionBoot;
    };
  }, [reduced]);

  return null;
}
