"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import type { SiteLocale } from "@/lib/i18n/types";

type FooterNewsletterProps = {
  title: string;
  text: string;
  placeholder: string;
  buttonLabel: string;
  successMessage: string;
  errorMessage: string;
  rateLimitMessage: string;
  emailLabel?: string;
  locale?: SiteLocale;
};

const HONEYPOT_LABELS: Record<SiteLocale, string> = {
  fr: "Site web de l'entreprise",
  en: "Company website",
  it: "Sito web aziendale",
  nl: "Bedrijfswebsite",
};

function readUtm() {
  if (typeof window === "undefined") {
    return { utmSource: "", utmMedium: "", utmCampaign: "" };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
  };
}

function createIdempotencyKey(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID().replace(/-/g, "");
    }
  } catch {
    /* noop */
  }
  return `k${Date.now()}${Math.random().toString(16).slice(2)}`;
}

export function FooterNewsletter({
  title,
  text,
  placeholder,
  buttonLabel,
  successMessage,
  errorMessage,
  rateLimitMessage,
  emailLabel = "Email",
  locale = "fr",
}: FooterNewsletterProps) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState("");
  const startedAtRef = useRef<number>(Date.now());
  const idempotencyRef = useRef<string>(createIdempotencyKey());

  useEffect(() => {
    startedAtRef.current = Date.now();
    idempotencyRef.current = createIdempotencyKey();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const companyWebsite = String(formData.get("companyWebsite") ?? "");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.reportValidity();
      return;
    }

    setPending(true);
    setError(null);

    const utm = readUtm();
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20000);
    const attemptKey = idempotencyRef.current;

    try {
      const response = await fetch("/api/leads/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          type: "newsletter",
          email,
          locale,
          pagePath: window.location.pathname || "",
          pageUrl: window.location.href || "",
          source: "footer_newsletter",
          context: "site_footer",
          marketingConsent: true,
          companyWebsite,
          formStartedAt: startedAtRef.current,
          idempotencyKey: attemptKey,
          ...utm,
        }),
      });

      const json = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;

      if (response.status === 429) {
        setError(json?.message || rateLimitMessage);
        return;
      }

      if (!response.ok || !json?.ok) {
        setError(errorMessage);
        return;
      }

      setSubmitted(true);
      setEmailValue("");
      startedAtRef.current = Date.now();
      idempotencyRef.current = createIdempotencyKey();
    } catch {
      setError(errorMessage);
    } finally {
      window.clearTimeout(timeoutId);
      setPending(false);
    }
  }

  return (
    <div className="om-footer__newsletter">
      <p className="om-footer__newsletter-title">{title}</p>
      <p className="om-footer__newsletter-text">{text}</p>
      {submitted ? (
        <p className="om-footer__newsletter-success" role="status">
          {successMessage}
        </p>
      ) : (
        <form className="om-footer__newsletter-form" onSubmit={handleSubmit} noValidate>
          <label className="om-footer__sr-only" aria-hidden="true">
            <span>{HONEYPOT_LABELS[locale]}</span>
            <input
              type="text"
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </label>
          <label className="om-footer__newsletter-field">
            <span className="om-footer__sr-only">{emailLabel}</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={placeholder}
              className="om-footer__newsletter-input"
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
              disabled={pending}
            />
          </label>
          <button
            type="submit"
            className="om-footer__newsletter-btn"
            disabled={pending}
          >
            {buttonLabel}
          </button>
          {error ? (
            <p className="om-footer__newsletter-success" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
