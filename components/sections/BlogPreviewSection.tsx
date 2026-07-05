import { ScrollReveal } from "@/components/motion/ScrollReveal";

export type BlogPreviewSectionProps = {
  /** `home` | `hub` | `quartiers` — drives om-blog.js layout and defaults. */
  mode?: "home" | "hub" | "quartiers";
  /** Optional override — rendered by om-blog.js when set. */
  title?: string;
  /** Optional override — rendered by om-blog.js when set. */
  lead?: string;
  /** Comma-separated category slugs — home/hub only; quartiers mode uses article tags. */
  categories?: string;
  className?: string;
  id?: string;
  motion?: boolean;
};

/**
 * Blog preview shell — cards and carousel are mounted by `om-blog.js`.
 * Pair with `DeferredBlogBoot` on client-rendered pages.
 */
export function BlogPreviewSection({
  mode = "home",
  title,
  lead,
  categories,
  className = "om-blog-section",
  id,
  motion = false,
}: BlogPreviewSectionProps) {
  return (
    <section
      id={id}
      className={className}
      data-om-blog
      data-om-blog-mode={mode}
      {...(title ? { "data-om-blog-title": title } : {})}
      {...(lead ? { "data-om-blog-lead": lead } : {})}
      {...(categories ? { "data-om-blog-categories": categories } : {})}
      data-scroll-section
      aria-labelledby={
        mode === "quartiers" ? "om-blog-quartiers-title" : undefined
      }
    >
      <ScrollReveal disabled={!motion}>
        {/* om-blog.js mounts cards here, sometimes before hydration —
            dangerouslySetInnerHTML keeps hydration from diffing children */}
        <div
          className="om-blog-section__inner"
          data-om-blog-root
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: "" }}
        />
      </ScrollReveal>
    </section>
  );
}
