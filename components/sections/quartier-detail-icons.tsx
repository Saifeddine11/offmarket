import type { ReactNode } from "react";
import type { QuartierDetailIcon } from "@/lib/quartiers/quartier-details";

const ICON_PATHS: Record<QuartierDetailIcon, ReactNode> = {
  restaurant: (
    <>
      <path
        d="M8 3v4M12 3v4M16 3v4M6 10h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 10v9M17 10v9M5 19h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  cup: (
    <>
      <path
        d="M7 10h10v5a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4v-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M17 11h1.2a2 2 0 0 1 0 4H17M8 6V4M12 6V4M16 6V4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  shopping: (
    <>
      <path
        d="M6 8h12l-1.2 10H7.2L6 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V6a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  pool: (
    <>
      <path
        d="M4 14c2.5-2 5-2 8 0s5.5 2 8 0M4 18c2.5-2 5-2 8 0s5.5 2 8 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 5v4M9 7h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  chart: (
    <path
      d="M5 18V9M10 18V5M15 18v-7M20 18V8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  ),
  road: (
    <path
      d="M4 18 9 6h6l5 12M9 12h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  building: (
    <>
      <path
        d="M6 20V8l6-4 6 4v12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 12h4M10 16h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  villa: (
    <>
      <path
        d="M4 18 12 8l8 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 18h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  pin: (
    <>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  leaf: (
    <path
      d="M12 20c5-4 7-8.5 7-13a7 7 0 0 0-14 0c0 4.5 2 9 7 13Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  lock: (
    <>
      <rect
        x="6"
        y="11"
        width="12"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 11V8a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  arch: (
    <path
      d="M5 18V11a7 7 0 0 1 14 0v7M5 18h14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  heritage: (
    <>
      <path
        d="M12 4 4 9v11h16V9l-8-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-6h4v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </>
  ),
  suitcase: (
    <>
      <rect
        x="6"
        y="9"
        width="12"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 9V7a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  house: (
    <path
      d="M4 18 12 9l8 9M8 18v-5h8v5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

type QuartierDetailIconProps = {
  name: QuartierDetailIcon;
};

export function QuartierDetailIconGlyph({ name }: QuartierDetailIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}
