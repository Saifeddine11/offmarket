import type { BlogArticleViewModel } from "@/lib/blog/blogArticleViewModel";

const BUTTON_ARROW = (
  <span className="om-button__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

type BlogArticleTemplateProps = {
  article: BlogArticleViewModel;
};

function TableOfContents({
  article,
  variant,
}: {
  article: BlogArticleViewModel;
  variant: "aside" | "mobile";
}) {
  if (!article.toc.length) return null;

  const list = (
    <ol className="om-blog-article__toc-list">
      {article.toc.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`}>{item.label}</a>
        </li>
      ))}
    </ol>
  );

  if (variant === "mobile") {
    return (
      <details className="om-blog-article__toc om-blog-article__toc--mobile">
        <summary>{article.labels.toc}</summary>
        <nav aria-label={article.labels.toc}>{list}</nav>
      </details>
    );
  }

  return (
    <aside className="om-blog-article__toc om-blog-article__toc--desktop" aria-label={article.labels.toc}>
      <p className="om-blog-article__toc-title">{article.labels.toc}</p>
      <nav>{list}</nav>
    </aside>
  );
}

export function BlogArticleTemplate({ article }: BlogArticleTemplateProps) {
  const hasToc = article.toc.length > 0;

  return (
    <main id="main" className="om-blog-article-shell">
      <div className="om-blog-article-shell__inner">
        <nav className="om-blog-article__breadcrumb" aria-label={article.labels.breadcrumbNav}>
          <ol>
            {article.breadcrumbs.map((crumb, index) => {
              const isLast = index === article.breadcrumbs.length - 1;
              return (
                <li key={`${crumb.label}-${index}`}>
                  {index > 0 ? (
                    <span className="om-blog-article__breadcrumb-sep" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                  {crumb.href && !isLast ? (
                    <a href={crumb.href}>{crumb.label}</a>
                  ) : (
                    <span aria-current={isLast ? "page" : undefined}>{crumb.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <article className="om-blog-article om-blog-article--editorial">
          <header className="om-blog-article__header">
            <p className="om-blog-article__eyebrow">{article.categoryLabel}</p>
            <h1 className="om-blog-article__title">{article.title}</h1>
            {article.standfirst ? (
              <p className="om-blog-article__standfirst">{article.standfirst}</p>
            ) : null}
            <dl className="om-blog-article__meta">
              {article.publishedLabel ? (
                <div>
                  <dt>{article.labels.published}</dt>
                  <dd>
                    <time dateTime={article.publishedLabel}>{article.publishedLabel}</time>
                  </dd>
                </div>
              ) : null}
              {article.updatedLabel ? (
                <div>
                  <dt>{article.labels.updated}</dt>
                  <dd>
                    <time dateTime={article.updatedLabel}>{article.updatedLabel}</time>
                  </dd>
                </div>
              ) : null}
              {article.readingTimeLabel ? (
                <div>
                  <dt className="sr-only">{article.readingTimeLabel}</dt>
                  <dd>{article.readingTimeLabel}</dd>
                </div>
              ) : null}
              {article.editorialLabel ? (
                <div>
                  <dt className="sr-only">{article.editorialLabel}</dt>
                  <dd>{article.editorialLabel}</dd>
                </div>
              ) : null}
            </dl>
          </header>

          {article.image ? (
            <figure className="om-blog-article__media">
              <img
                src={article.image.src}
                alt={article.image.alt}
                loading="eager"
                decoding="async"
              />
              {article.image.caption || article.image.credit ? (
                <figcaption>
                  {article.image.caption}
                  {article.image.credit ? (
                    <span className="om-blog-article__media-credit">
                      {article.image.caption ? " · " : ""}
                      {article.image.credit}
                    </span>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          <div
            className={
              hasToc
                ? "om-blog-article__layout om-blog-article__layout--with-toc"
                : "om-blog-article__layout"
            }
          >
            {/* Mobile TOC stays above the body; desktop TOC is the right sticky column. */}
            <TableOfContents article={article} variant="mobile" />

            <div className="om-blog-article__main">
              {article.takeaways.length > 0 ? (
                <section className="om-blog-article__takeaways" aria-label={article.labels.takeaways}>
                  <h2 className="om-blog-article__takeaways-title">{article.labels.takeaways}</h2>
                  <ul>
                    {article.takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <div
                className="om-blog-article__body"
                dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
              />

              {article.showTrust ? (
                <aside className="om-blog-article__trust" aria-label={article.trustTitle}>
                  <p className="om-blog-article__trust-title">{article.trustTitle}</p>
                  <p>{article.trustText}</p>
                </aside>
              ) : null}

              <section className="om-blog-article__cta" aria-label={article.contextualCta.title}>
                <p className="om-blog-article__cta-eyebrow">{article.contextualCta.eyebrow}</p>
                <h2 className="om-blog-article__cta-title">{article.contextualCta.title}</h2>
                <p className="om-blog-article__cta-text">{article.contextualCta.text}</p>
                <a className="om-button om-button--primary" href={article.contextualCta.href}>
                  {BUTTON_ARROW}
                  <span>{article.contextualCta.label}</span>
                </a>
              </section>

              {article.faq.length > 0 ? (
                <section className="om-blog-article__faq" aria-labelledby="om-blog-faq-title">
                  <h2 id="om-blog-faq-title">FAQ</h2>
                  {article.faq.map((item) => (
                    <details key={item.question} className="om-blog-article__faq-item">
                      <summary>{item.question}</summary>
                      <div
                        className="om-blog-article__faq-answer"
                        dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                      />
                    </details>
                  ))}
                </section>
              ) : null}
            </div>

            <TableOfContents article={article} variant="aside" />
          </div>

          <footer className="om-blog-article__footer">
            <div className="om-blog-article__footer-meta">
              <span>{article.footer.categoryLabel}</span>
              {article.footer.publishedLabel ? (
                <span>
                  <time dateTime={article.footer.publishedLabel}>
                    {article.footer.publishedLabel}
                  </time>
                </span>
              ) : null}
              {article.footer.editorialLabel ? (
                <span>{article.footer.editorialLabel}</span>
              ) : null}
            </div>
            <a className="om-blog-article__footer-back" href={article.footer.backHref}>
              ← {article.footer.backLabel}
            </a>
          </footer>
        </article>

        {article.related.length > 0 ? (
          <section className="om-blog-article__related" aria-labelledby="om-blog-related-title">
            <div className="om-blog-article__related-header">
              <h2 id="om-blog-related-title">{article.labels.related}</h2>
            </div>
            <div className="om-blog-article__related-grid">
              {article.related.map((item) => (
                <a key={item.href} className="om-blog-article__related-card" href={item.href}>
                  <span className="om-blog-article__related-media">
                    <img src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" />
                  </span>
                  <span className="om-blog-article__related-body">
                    <span className="om-blog-article__related-category">{item.category}</span>
                    <span className="om-blog-article__related-title">{item.title}</span>
                    <span className="om-blog-article__related-excerpt">{item.excerpt}</span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
