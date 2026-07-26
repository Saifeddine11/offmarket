"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { MOTION_EASE } from "@/lib/motion/config";
import type { SiteLocale } from "@/lib/i18n/types";

const VIDEO_SRC = "/assets/offmarket/video/fayssal_offmarket.mp4";
const VIDEO_POSTER = "/assets/offmarket/video/fayssal_offmarket-poster.jpg";

const PLAY_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
  </svg>
);

const CLOSE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6 6 18"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Qui sommes-nous video: muted autoplay preview that opens a premium
 * popup modal (blurred backdrop, sound enabled, controls) on click.
 */
const VIDEO_COPY = {
  fr: {
    open: "Ouvrir la vidéo de présentation OFF MARKET",
    close: "Fermer la vidéo de présentation OFF MARKET",
    dialog: "Vidéo de présentation OFF MARKET",
  },
  en: {
    open: "Open the OFF MARKET presentation video",
    close: "Close the OFF MARKET presentation video",
    dialog: "OFF MARKET presentation video",
  },
  es: {
    open: "Abrir el video de presentación de OFF MARKET",
    close: "Cerrar el video de presentación de OFF MARKET",
    dialog: "Video de presentación de OFF MARKET",
  },
  it: {
    open: "Apri il video di presentazione OFF MARKET",
    close: "Chiudi il video di presentazione OFF MARKET",
    dialog: "Video di presentazione OFF MARKET",
  },
  nl: {
    open: "Open de OFF MARKET-presentatievideo",
    close: "Sluit de OFF MARKET-presentatievideo",
    dialog: "OFF MARKET-presentatievideo",
  },
  no: {
    open: "Åpne presentasjonsvideoen til OFF MARKET",
    close: "Lukk presentasjonsvideoen til OFF MARKET",
    dialog: "OFF MARKET-presentasjonsvideo",
  },
} satisfies Record<SiteLocale, { open: string; close: string; dialog: string }>;

export function AboutWhoVideo({ locale = "fr" }: { locale?: SiteLocale }) {
  const copy = VIDEO_COPY[locale] ?? VIDEO_COPY.fr;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    const body = document.body;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    // Opened from a user click — try to play with sound. If the browser
    // blocks unmuted autoplay, controls stay visible for manual play.
    const video = modalVideoRef.current;
    if (video) {
      video.muted = false;
      const played = video.play();
      if (played && typeof played.catch === "function") {
        played.catch(() => {});
      }
    }

    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      const currentVideo = modalVideoRef.current;
      if (currentVideo) {
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }
      triggerRef.current?.focus();
    };
  }, [open, close]);

  const backdropMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: reduced ? 0.2 : 0.35, ease: MOTION_EASE },
  };

  const modalMotion = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2, ease: MOTION_EASE },
      }
    : {
        initial: { opacity: 0, scale: 0.96, y: 24 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 24 },
        transition: { duration: 0.42, ease: MOTION_EASE },
      };

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className="about-who__video-frame about-video-card about-who__video-button"
        onClick={() => setOpen(true)}
        aria-label={copy.open}
      >
        <video
          className="about-who__video"
          src={VIDEO_SRC}
          poster={VIDEO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        <span className="about-who__play" aria-hidden="true">
          {PLAY_ICON}
        </span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="about-video-modal__backdrop"
                onClick={close}
                {...backdropMotion}
              >
                <motion.div
                  className="about-video-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-label={copy.dialog}
                  onClick={(event) => event.stopPropagation()}
                  {...modalMotion}
                >
                  <video
                    ref={modalVideoRef}
                    className="about-video-modal__video"
                    src={VIDEO_SRC}
                    poster={VIDEO_POSTER}
                    controls
                    playsInline
                    preload="auto"
                  />
                  <button
                    type="button"
                    ref={closeRef}
                    className="about-video-modal__close"
                    onClick={close}
                    aria-label={copy.close}
                  >
                    {CLOSE_ICON}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
