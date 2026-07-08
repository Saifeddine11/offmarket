"use client";

import { useEffect } from "react";

type HomeFaqBootProps = {
  sectionId: string;
};

type BootedFaqSection = HTMLElement & {
  __homeFaqBooted?: boolean;
};

export function HomeFaqBoot({ sectionId }: HomeFaqBootProps) {
  useEffect(() => {
    const section = document.getElementById(sectionId) as BootedFaqSection | null;
    if (!section || section.__homeFaqBooted) return;

    section.__homeFaqBooted = true;

    function setItem(item: Element, open: boolean) {
      const button = item.querySelector<HTMLButtonElement>(
        "[data-home-faq-trigger]",
      );
      if (!button) return;

      const panel = document.getElementById(button.getAttribute("aria-controls") ?? "");
      if (!panel) return;

      button.setAttribute("aria-expanded", open ? "true" : "false");
      item.setAttribute("data-open", open ? "true" : "false");
      panel.setAttribute("aria-hidden", open ? "false" : "true");

      if (open) {
        panel.style.height = `${panel.scrollHeight}px`;
        panel.style.opacity = "1";
      } else {
        panel.style.height = `${panel.scrollHeight}px`;
        panel.offsetHeight;
        panel.style.height = "0px";
        panel.style.opacity = "0";
      }
    }

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const button = target.closest<HTMLButtonElement>(
        "[data-home-faq-trigger]",
      );
      if (!button || !section?.contains(button)) return;

      const item = button.closest(".om-home-faq__item");
      if (!item) return;

      const nextOpen = button.getAttribute("aria-expanded") !== "true";
      section
        .querySelectorAll(".om-home-faq__item")
        .forEach((other) => {
          if (other !== item) setItem(other, false);
        });
      setItem(item, nextOpen);
    }

    function handleTransitionEnd(event: TransitionEvent) {
      const panel = event.target;
      if (!(panel instanceof HTMLElement)) return;
      if (!panel.classList.contains("om-home-faq__panel")) return;

      if (panel.getAttribute("aria-hidden") === "false") {
        panel.style.height = "auto";
      }
    }

    section.addEventListener("click", handleClick);
    section.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      section.removeEventListener("click", handleClick);
      section.removeEventListener("transitionend", handleTransitionEnd);
      section.__homeFaqBooted = false;
    };
  }, [sectionId]);

  return null;
}
