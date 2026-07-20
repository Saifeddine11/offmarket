"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __staticHtmlScriptQueue?: Promise<void>;
    OM_BLOG_boot?: () => void;
  }
}

function normalizePathname(pathname: string | null) {
  if (!pathname) return "";
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

function isHomePath(pathname: string | null) {
  const normalized = normalizePathname(pathname);
  return (
    normalized === "" ||
    normalized === "/" ||
    normalized === "/fr" ||
    normalized === "/en" ||
    normalized === "/it" ||
    normalized === "/nl"
  );
}

function isBlogIndexPath(pathname: string | null) {
  const normalized = normalizePathname(pathname);
  return (
    normalized === "/blog" ||
    normalized === "/en/blog" ||
    normalized === "/nl/blog"
  );
}

/** Boots the blog hub after React hydration so SSR markup is not mutated early. */
export function DeferredBlogBoot() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isHomePath(pathname) && !isBlogIndexPath(pathname)) return;

    function bootBlog() {
      if (typeof window.OM_BLOG_boot === "function") {
        window.OM_BLOG_boot();
        return true;
      }
      return false;
    }

    (window.__staticHtmlScriptQueue ?? Promise.resolve()).then(() => {
      if (bootBlog()) {
        return;
      }

      const retryId = window.setInterval(() => {
        if (bootBlog()) {
          window.clearInterval(retryId);
        }
      }, 50);

      window.setTimeout(() => window.clearInterval(retryId), 5000);
    });
  }, [pathname]);

  return null;
}
