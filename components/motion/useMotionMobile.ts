"use client";

import { useEffect, useState } from "react";

import { MOTION_MOBILE_MAX } from "@/lib/motion/config";

export function useMotionMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOTION_MOBILE_MAX}px)`);
    const apply = () => setMobile(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return mobile;
}
