"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { MOTION_EASE } from "@/lib/motion/config";

type TimelineEntry = {
  index: string;
  title: string;
  content: string;
  details?: string[];
};

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    index: "01",
    title: "Étudier le projet",
    content:
      "Nous analysons l’emplacement, le promoteur, les documents, le prix, les matériaux, les prestations et le calendrier.",
    details: [
      "Emplacement",
      "Promoteur",
      "Documents",
      "Prix",
      "Matériaux",
      "Livraison",
    ],
  },
  {
    index: "02",
    title: "Examen S.A.F.E.",
    content:
      "Le projet passe par notre grille S.A.F.E. pour vérifier les points sensibles avant présentation.",
    details: [
      "Sécurité du dossier",
      "Sérieux du promoteur",
      "Fiabilité d’exécution",
      "Encadrement acheteur",
    ],
  },
  {
    index: "03",
    title: "Présenter avec exigence",
    content:
      "Un projet n’est présenté que s’il mérite réellement d’être étudié par un acheteur.",
    details: [
      "Opportunité qualifiée",
      "Lecture claire",
      "Risques identifiés",
      "Décision plus sereine",
    ],
  },
];

/**
 * whileInView is unreliable on these pages (viewport observer does not fire),
 * so reveal state is driven by useInView + a bounding-box fallback, matching
 * the approved ImageScrollReveal pattern.
 */
function isInViewport(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh * 0.85 && rect.bottom > vh * 0.1;
}

function TimelineRow({
  entry,
  reduced,
  active,
}: {
  entry: TimelineEntry;
  reduced: boolean;
  active: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { amount: 0.35 });
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (inView) setSeen(true);
  }, [inView]);

  useEffect(() => {
    if (reduced || seen) return;
    const node = rowRef.current;
    if (!node) return;
    if (isInViewport(node)) {
      setSeen(true);
      return;
    }
    const check = () => {
      if (rowRef.current && isInViewport(rowRef.current)) setSeen(true);
    };
    window.addEventListener("scroll", check, { passive: true });
    const safety = window.setTimeout(check, 2600);
    return () => {
      window.removeEventListener("scroll", check);
      window.clearTimeout(safety);
    };
  }, [reduced, seen]);

  const revealed = reduced || seen;

  return (
    <div className="about-timeline__entry" ref={rowRef}>
      <div className="about-timeline__marker" aria-hidden="true">
        <span
          className="about-timeline__dot"
          data-active={active ? "true" : "false"}
        />
      </div>

      <div className="about-timeline__aside">
        <span
          className="about-timeline__index"
          data-active={active ? "true" : "false"}
        >
          {entry.index}
        </span>
        <h3 className="about-timeline__entry-title">{entry.title}</h3>
      </div>

      <motion.div
        className="about-timeline__body"
        initial={reduced ? false : { opacity: 0, y: 30 }}
        animate={
          reduced
            ? { opacity: 1, y: 0 }
            : revealed
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 30 }
        }
        transition={
          reduced ? { duration: 0 } : { duration: 0.9, ease: MOTION_EASE }
        }
      >
        <p className="about-timeline__text">{entry.content}</p>
        {entry.details && entry.details.length > 0 ? (
          <ul className="about-timeline__details" role="list">
            {entry.details.map((detail) => (
              <li key={detail} className="about-timeline__pill">
                <span className="about-timeline__pill-dot" aria-hidden="true" />
                {detail}
              </li>
            ))}
          </ul>
        ) : null}
      </motion.div>
    </div>
  );
}

/** About page — trust verification steps as a premium scroll timeline. */
export function VerifiedActorsTimeline() {
  const reduced = useReducedMotion() === true;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Reliable current-step detection. The viewport IntersectionObserver is
  // unreliable on these pages, so the active step is derived from a passive,
  // rAF-throttled scroll read: the entry whose box crosses the reading line.
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const rows = container.querySelectorAll<HTMLElement>(
        ".about-timeline__entry",
      );
      const line = (window.innerHeight || 0) * 0.46;
      let next = -1;
      rows.forEach((row, i) => {
        const rect = row.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) next = i;
      });
      setActiveIndex((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="about-timeline" ref={containerRef}>
      <div className="about-timeline__line" aria-hidden="true">
        {reduced ? (
          <div className="about-timeline__line-fill about-timeline__line-fill--static" />
        ) : (
          <motion.div
            className="about-timeline__line-fill"
            style={{ scaleY }}
          />
        )}
      </div>

      {TIMELINE_ENTRIES.map((entry, index) => (
        <TimelineRow
          key={entry.index}
          entry={entry}
          reduced={reduced}
          active={index === activeIndex}
        />
      ))}
    </div>
  );
}
