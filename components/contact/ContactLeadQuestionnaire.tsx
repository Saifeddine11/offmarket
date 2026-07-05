"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { LeadForm } from "@/components/forms/LeadForm";
import { getContactCopy } from "@/lib/i18n/contactCopy";
import type { SiteLocale } from "@/lib/i18n/types";
import { MOTION_EASE } from "@/lib/motion/config";

const QUESTIONNAIRE_STEPS = 3;

/** 1 = property type, 2 = budget, 3 = objective, 4 = lead form */
type Step = 1 | 2 | 3 | 4;

type OptionGridProps = {
  options: readonly string[];
  selected: string;
  onSelect: (value: string) => void;
  name: string;
};

function OptionGrid({ options, selected, onSelect, name }: OptionGridProps) {
  const reduced = useReducedMotion();

  return (
    <div className="om-contact-lead__options" role="group">
      {options.map((option, index) => {
        const active = selected === option;
        return (
          <motion.button
            key={option}
            type="button"
            className={`om-contact-lead__option${active ? " is-active" : ""}`}
            aria-pressed={active}
            onClick={() => onSelect(option)}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: MOTION_EASE,
              delay: reduced ? 0 : index * 0.04,
            }}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={active}
              readOnly
              tabIndex={-1}
              className="om-contact-lead__option-input"
            />
            <span>{option}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

type ContactLeadQuestionnaireProps = {
  locale?: SiteLocale;
  source?: string;
  context?: string;
  intent?: string;
  showMessage?: boolean;
  /** Homepage private-access column: form only on final step, no duplicate header. */
  embedded?: boolean;
};

export function ContactLeadQuestionnaire({
  locale = "fr",
  source = "contact_page",
  context = "contact_questionnaire",
  intent = "contact_page",
  showMessage = false,
  embedded = false,
}: ContactLeadQuestionnaireProps) {
  const copy = getContactCopy(locale);
  const reduced = useReducedMotion();
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [step, setStep] = useState<Step>(1);
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [objective, setObjective] = useState("");

  const progress = step <= QUESTIONNAIRE_STEPS ? step : QUESTIONNAIRE_STEPS;
  const progressPct = (progress / QUESTIONNAIRE_STEPS) * 100;

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }, []);

  useEffect(() => () => clearAdvanceTimer(), [clearAdvanceTimer]);

  const scheduleAdvance = useCallback(
    (next: Step, hasValue: boolean) => {
      clearAdvanceTimer();
      if (!hasValue) return;
      advanceTimer.current = setTimeout(() => {
        setStep(next);
      }, 650);
    },
    [clearAdvanceTimer],
  );

  const handlePropertyTypeSelect = (value: string) => {
    setPropertyType(value);
    scheduleAdvance(2, Boolean(value));
  };

  const handleBudgetSelect = (value: string) => {
    setBudget(value);
    scheduleAdvance(3, Boolean(value));
  };

  const handleObjectiveSelect = (value: string) => {
    setObjective(value);
    scheduleAdvance(4, Boolean(value));
  };

  const goBack = () => {
    clearAdvanceTimer();
    setStep((current) => (current > 1 ? ((current - 1) as Step) : current));
  };

  const goContinue = () => {
    clearAdvanceTimer();
    if (step === 1 && propertyType) setStep(2);
    else if (step === 2 && budget) setStep(3);
    else if (step === 3 && objective) setStep(4);
  };

  const canContinue =
    (step === 1 && propertyType) ||
    (step === 2 && budget) ||
    (step === 3 && objective);

  const stepEnterMotion = reduced
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.42, ease: MOTION_EASE },
      };

  if (step === 4) {
    const formStep = (
      <LeadForm
        locale={locale}
        source={source}
        context={context}
        intent={intent}
        showMessage={showMessage}
        showHeader={!embedded}
        variant={embedded ? "bare" : "section"}
        defaultPropertyType={propertyType}
        defaultBudget={budget}
        defaultObjective={objective}
        onBack={goBack}
      />
    );

    return (
      <div className="om-contact-lead__home-form">
        <motion.div
          key="step-4"
          {...stepEnterMotion}
          className="om-contact-lead__card om-contact-lead__card--lead"
        >
          {formStep}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="om-contact-lead__card">
      <div className="om-contact-lead__progress" aria-hidden="true">
        <div
          className="om-contact-lead__progress-bar"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <p className="om-contact-lead__step-label" aria-live="polite">
        {copy.stepLabel(step)}
      </p>

      <motion.div key={step} className="om-contact-lead__step" {...stepEnterMotion}>
        {step === 1 ? (
          <>
            <h2 className="om-contact-lead__question">{copy.questions.propertyType}</h2>
            <OptionGrid
              name="propertyType"
              options={copy.propertyTypes}
              selected={propertyType}
              onSelect={handlePropertyTypeSelect}
            />
          </>
        ) : null}

        {step === 2 ? (
          <>
            <h2 className="om-contact-lead__question">{copy.questions.budget}</h2>
            <OptionGrid
              name="budget"
              options={copy.budgets}
              selected={budget}
              onSelect={handleBudgetSelect}
            />
          </>
        ) : null}

        {step === 3 ? (
          <>
            <h2 className="om-contact-lead__question">{copy.questions.objective}</h2>
            <OptionGrid
              name="objective"
              options={copy.objectives}
              selected={objective}
              onSelect={handleObjectiveSelect}
            />
          </>
        ) : null}
      </motion.div>

      <div className="om-contact-lead__actions">
        {step > 1 ? (
          <button
            type="button"
            className="om-contact-lead__btn om-contact-lead__btn--ghost"
            onClick={goBack}
          >
            {copy.back}
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
        <button
          type="button"
          className="om-contact-lead__btn om-contact-lead__btn--primary"
          onClick={goContinue}
          disabled={!canContinue}
        >
          {copy.continue}
        </button>
      </div>
    </div>
  );
}
