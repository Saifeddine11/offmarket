import { PageFinalCtaMotion } from "@/components/motion/PageFinalCtaMotion";
import {
  LEGAL_DOCUMENTS,
  siteLocaleForLegalLocale,
  type LegalDocumentKey,
  type LegalLocale,
} from "@/lib/legal/legalContent";

export function LegalPageContent({
  locale = "fr",
  document = "legal",
}: {
  locale?: LegalLocale;
  document?: LegalDocumentKey;
}) {
  const content = LEGAL_DOCUMENTS[locale][document];
  const isArabic = locale === "ar";

  return (
    <main
      id="main"
      className="om-legal-page"
      dir={isArabic ? "rtl" : "ltr"}
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 7vw, 7rem)",
      }}
    >
      <header style={{ marginBottom: "3rem" }}>
        <span className="om-eyebrow" style={{ display: "block", marginBottom: "1.25rem" }}>
          {content.eyebrow}
        </span>
        <h1
          style={{
            fontFamily: "var(--om-font-heading)",
            fontWeight: 500,
            letterSpacing: "var(--om-letter-tight)",
            color: "var(--om-ruby-950)",
            margin: 0,
          }}
        >
          {content.title}
        </h1>
        <p className="om-legal-page__updated" style={{ margin: "1rem 0 0" }}>
          {content.updated}
        </p>
      </header>

      {content.sections.map((section) => (
        <section key={section.title} style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--om-font-heading)",
              fontWeight: 650,
              color: "var(--om-ruby-950)",
              margin: "0 0 0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              style={{
                fontFamily: "var(--om-font-body)",
                lineHeight: 1.65,
                color: "rgba(86, 84, 73, 0.72)",
                margin: "0 0 0.75rem",
              }}
            >
              {paragraph}
            </p>
          ))}
          {section.bullets?.length ? (
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <PageFinalCtaMotion locale={siteLocaleForLegalLocale(locale)} />
    </main>
  );
}
