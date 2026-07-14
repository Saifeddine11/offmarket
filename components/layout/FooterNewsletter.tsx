"use client";

import { useState, type FormEvent } from "react";

type FooterNewsletterProps = {
  title: string;
  text: string;
  placeholder: string;
  buttonLabel: string;
  successMessage: string;
};

export function FooterNewsletter({
  title,
  text,
  placeholder,
  buttonLabel,
  successMessage,
}: FooterNewsletterProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.reportValidity();
      return;
    }

    setSubmitted(true);
    window.location.href = `mailto:contact@offmarketofficial.com?subject=${encodeURIComponent(
      "Inscription newsletter OFF MARKET",
    )}&body=${encodeURIComponent(`Bonjour,\n\nJe souhaite recevoir les opportunités privées OFF MARKET.\n\nEmail : ${email}`)}`;
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
          <label className="om-footer__newsletter-field">
            <span className="om-footer__sr-only">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={placeholder}
              className="om-footer__newsletter-input"
            />
          </label>
          <button type="submit" className="om-footer__newsletter-btn">
            {buttonLabel}
          </button>
        </form>
      )}
    </div>
  );
}
