import { PageFinalCtaMotion } from "@/components/motion/PageFinalCtaMotion";

export function LegalPageContent() {
  return (
    <main
      id="main"
      className="om-legal-page"
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding:
          "clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 7vw, 7rem)",
      }}
    >
      <header style={{ marginBottom: "3rem" }}>
        <span
          className="om-eyebrow"
          style={{ display: "block", marginBottom: "1.25rem" }}
        >
          INFORMATIONS LÉGALES
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
          Mentions légales
        </h1>
      </header>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: "var(--om-font-heading)",
            fontWeight: 650,
            color: "var(--om-ruby-950)",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          OFF MARKET
        </h2>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.6,
            color: "rgba(86, 84, 73, 0.72)",
            margin: "0 0 0.4rem",
          }}
        >
          Immobilier privé à Marrakech
        </p>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.6,
            color: "rgba(86, 84, 73, 0.72)",
            margin: "0 0 0.4rem",
          }}
        >
          Email :{" "}
          <a
            href="mailto:contact@offmarket.ma"
            style={{ color: "var(--om-ruby-800)" }}
          >
            contact@offmarket.ma
          </a>
        </p>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.6,
            color: "rgba(86, 84, 73, 0.72)",
            margin: 0,
          }}
        >
          Téléphone : +212 (0) 000 000 000
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.65,
            color: "rgba(86, 84, 73, 0.72)",
            margin: 0,
          }}
        >
          Ce site présente une sélection privée d&apos;opportunités
          immobilières à Marrakech. Les informations affichées sont indicatives
          et ne constituent pas une offre contractuelle.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: "var(--om-font-heading)",
            fontWeight: 650,
            color: "var(--om-ruby-950)",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Données personnelles
        </h2>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.65,
            color: "rgba(86, 84, 73, 0.72)",
            margin: 0,
          }}
        >
          Les informations transmises via les formulaires de contact sont
          utilisées uniquement pour répondre aux demandes des utilisateurs.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: "var(--om-font-heading)",
            fontWeight: 650,
            color: "var(--om-ruby-950)",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Cookies
        </h2>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.65,
            color: "rgba(86, 84, 73, 0.72)",
            margin: 0,
          }}
        >
          Le site peut utiliser des cookies techniques nécessaires au bon
          fonctionnement de l&apos;expérience.
        </p>
      </section>

      <section>
        <h2
          style={{
            fontFamily: "var(--om-font-heading)",
            fontWeight: 650,
            color: "var(--om-ruby-950)",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Contact
        </h2>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.65,
            color: "rgba(86, 84, 73, 0.72)",
            margin: 0,
          }}
        >
          Pour toute demande relative au site ou à vos données, vous pouvez écrire
          à{" "}
          <a
            href="mailto:contact@offmarket.ma"
            style={{ color: "var(--om-ruby-800)" }}
          >
            contact@offmarket.ma
          </a>
          .
        </p>
      </section>

      <PageFinalCtaMotion />
    </main>
  );
}
