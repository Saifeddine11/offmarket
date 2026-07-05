"use client";

import { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";

import { ContactLeadQuestionnaire } from "@/components/contact/ContactLeadQuestionnaire";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  detectPageLocale,
  type LeadFormProps,
} from "@/lib/forms/leadFormTypes";

type LeadFormMountConfig = LeadFormProps & {
  target: HTMLElement;
  mode: "section" | "bare";
};

type BridgeState = { cancelled: boolean };

function intentToSource(intent: string | null): string {
  switch (intent) {
    case "homepage-off-market":
      return "homepage";
    case "contact-off-market":
    case "contact_page":
      return "contact_page";
    case "off-market":
      return "off_market_page";
    case "biens-existants":
      return "off_market_page";
    default:
      return intent || "homepage";
  }
}

/**
 * Seamless swap: the React root is mounted (hidden) alongside the legacy static
 * markup, which stays visible as the placeholder. Only once React has actually
 * painted a control into `mount` do we reveal it and remove the legacy nodes —
 * in the same frame — so the section never shows an empty gap. A ~2.5s cap
 * forces the swap regardless, so behaviour never regresses below the previous
 * "replace immediately" approach.
 */
function revealWhenReady(
  mount: HTMLElement,
  legacyNodes: Element[],
  state: BridgeState,
) {
  let frames = 0;
  const swap = () => {
    if (state.cancelled) return;
    mount.style.removeProperty("display");
    legacyNodes.forEach((node) => node.remove());
  };
  const check = () => {
    if (state.cancelled) return;
    if (mount.querySelector("input, select, textarea, button") || frames > 150) {
      swap();
      return;
    }
    frames += 1;
    requestAnimationFrame(check);
  };
  requestAnimationFrame(check);
}

function replaceHomeSectionWithQuestionnaire(
  section: HTMLElement,
  roots: Root[],
  state: BridgeState,
) {
  if (section.dataset.leadFormReplaced === "true") return;

  const form = section.querySelector<HTMLFormElement>("[data-private-access-form]");
  if (!form) return;

  const locale = detectPageLocale();
  const intent =
    form.getAttribute("data-form-intent") ||
    form.querySelector<HTMLInputElement>("[data-private-intent]")?.value ||
    "homepage-off-market";

  const mount = document.createElement("div");
  mount.className = "om-home-private-access__questionnaire";
  mount.dataset.leadFormReplaced = "true";
  // Keep the static form as the visible placeholder until the questionnaire paints.
  mount.style.display = "none";
  form.insertAdjacentElement("afterend", mount);
  section.dataset.leadFormReplaced = "true";

  const root = createRoot(mount);
  roots.push(root);
  root.render(
    <ContactLeadQuestionnaire
      locale={locale}
      embedded
      source={intentToSource(intent)}
      context="home_access"
      intent={intent}
      showMessage
    />,
  );

  revealWhenReady(mount, [form], state);
}

function buildMountFromCallbackPanel(): LeadFormMountConfig | null {
  const panel = document.querySelector<HTMLElement>(
    "#l-callback .l-callback__col.js-form-content",
  );
  if (!panel || panel.dataset.leadFormReplaced === "true") return null;

  return {
    target: panel,
    mode: "bare",
    locale: detectPageLocale(),
    source: "homepage",
    context: "callback",
    intent: "contact_page",
    intentMode: "fixed",
    showHeader: false,
    showMessage: true,
    compact: true,
    variant: "bare",
  };
}

function replaceWithLeadForm(
  config: LeadFormMountConfig,
  roots: Root[],
  state: BridgeState,
) {
  const { target, mode, ...props } = config;
  if (target.dataset.leadFormReplaced === "true") return;

  const mount = document.createElement("div");
  mount.className =
    mode === "section"
      ? "om-lead-form-static-mount"
      : "om-lead-form-static-mount om-lead-form-static-mount--bare";
  // Keep the legacy markup visible until the React form paints (seamless swap).
  mount.style.display = "none";

  let legacyNodes: Element[] = [];

  if (target.matches("#l-callback .l-callback__col.js-form-content")) {
    legacyNodes = [
      ...target.querySelectorAll(
        "form, .l-callback__form-container, .l-callback__tablist",
      ),
    ];
    target.appendChild(mount);
    target.dataset.leadFormReplaced = "true";
  } else {
    const legacyForm = target.querySelector("form");
    if (legacyForm) {
      legacyForm.insertAdjacentElement("afterend", mount);
      legacyNodes = [legacyForm];
    } else {
      target.appendChild(mount);
    }
    target.dataset.leadFormReplaced = "true";
  }

  const root = createRoot(mount);
  roots.push(root);
  root.render(
    <LeadForm {...props} variant={mode === "section" ? "section" : "bare"} />,
  );

  revealWhenReady(mount, legacyNodes, state);
}

function replaceStaticLeadForms(roots: Root[], state: BridgeState) {
  document
    .querySelectorAll<HTMLElement>("section.om-home-private-access")
    .forEach((section) => {
      replaceHomeSectionWithQuestionnaire(section, roots, state);
    });

  const callbackConfig = buildMountFromCallbackPanel();
  if (callbackConfig) replaceWithLeadForm(callbackConfig, roots, state);
}

/**
 * Replaces legacy static HTML lead forms with React LeadForm or the contact questionnaire.
 */
export function LeadFormStaticBridge() {
  useEffect(() => {
    const roots: Root[] = [];
    const state: BridgeState = { cancelled: false };

    const run = () => {
      if (!state.cancelled) replaceStaticLeadForms(roots, state);
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
      state.cancelled = true;
      roots.forEach((root) => {
        queueMicrotask(() => root.unmount());
      });
    };
  }, []);

  return null;
}
