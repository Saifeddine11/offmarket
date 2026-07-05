"use client";

import { useEffect, useRef, type RefObject } from "react";

import { PrivateAccessForm } from "@/components/forms/PrivateAccessForm";
import { getFormCopy } from "@/lib/i18n/formCopy";
import {
  resolveLeadContextValues,
  type LeadFormProps,
} from "@/lib/forms/leadFormTypes";

export type { LeadFormProps } from "@/lib/forms/leadFormTypes";

function bootLeadForm(scope: HTMLElement) {
  const api = (
    window as Window & {
      OMPrivateAccessForm?: { init: (root?: ParentNode | Document) => void };
    }
  ).OMPrivateAccessForm;

  api?.init(scope);
}

export function LeadForm({
  source,
  context,
  title,
  subtitle,
  defaultPropertyType,
  defaultBudget,
  defaultObjective,
  compact = false,
  locale = "fr",
  intent = "contact_page",
  intentMode = "fixed",
  showMessage = false,
  showHeader = true,
  variant = "section",
  sectionClassName,
  onBack,
}: LeadFormProps) {
  const copy = getFormCopy(locale);
  const rootRef = useRef<HTMLElement>(null);

  const contextValues = resolveLeadContextValues({
    source,
    context,
    defaultPropertyType,
    defaultBudget,
    defaultObjective,
  });

  const resolvedTitle = title ?? copy.title;
  const resolvedSubtitle = subtitle ?? copy.subtitle;

  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;

    let cancelled = false;

    const run = () => {
      if (!cancelled) bootLeadForm(scope);
    };

    const queue = (
      window as Window & { __staticHtmlScriptQueue?: Promise<void> }
    ).__staticHtmlScriptQueue;

    if (queue) {
      void queue.then(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
    };
  }, [contextValues, locale, source, context]);

  const form = (
    <PrivateAccessForm
      locale={locale}
      intent={intent}
      intentMode={intentMode}
      variant={variant === "section" ? "embedded" : "default"}
      contextValues={contextValues}
      showMessage={showMessage}
      source={source}
      context={context}
      compact={compact}
      onBack={onBack}
    />
  );

  if (variant === "bare") {
    return (
      <div
        ref={rootRef as RefObject<HTMLDivElement>}
        className={compact ? "om-lead-form om-lead-form--compact" : "om-lead-form"}
        data-lead-form
        data-lead-source={source}
        data-lead-context={context}
      >
        {form}
      </div>
    );
  }

  const sectionClasses = [
    "om-home-private-access",
    "is-animated-fallback",
    compact ? "om-home-private-access--compact" : "",
    sectionClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={rootRef}
      className={sectionClasses}
      aria-labelledby="om-home-private-access-title"
      data-lead-form
      data-lead-source={source}
      data-lead-context={context}
    >
      <div className="om-home-private-access__inner">
        {showHeader ? (
          <header className="om-home-private-access__header">
            <span className="om-home-private-access__eyebrow">{copy.eyebrow}</span>
            <h2
              id="om-home-private-access-title"
              className="om-home-private-access__title"
            >
              {resolvedTitle}
            </h2>
            <p className="om-home-private-access__subtitle">{resolvedSubtitle}</p>
          </header>
        ) : null}
        {form}
      </div>
    </section>
  );
}
