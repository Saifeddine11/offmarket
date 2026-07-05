import { HomeFaqBoot } from "@/components/home/HomeFaqBoot";
import {
  HOME_FAQ_ITEMS,
  HOME_FAQ_SECTION_ID,
  HOME_FAQ_TITLE_ID,
} from "@/components/home/homeFaqContent";

export function HomeFaqSection() {
  return (
    <>
      <section
        className="om-home-faq"
        id={HOME_FAQ_SECTION_ID}
        aria-labelledby={HOME_FAQ_TITLE_ID}
        data-scroll-section
      >
        <div className="om-home-faq__inner">
          <header className="om-home-faq__header">
            <span className="om-home-faq__eyebrow">FAQ</span>
            <h2 id={HOME_FAQ_TITLE_ID} className="om-home-faq__title">
              Acheter sur plan à Marrakech
            </h2>
            <p className="om-home-faq__subtitle">
              Les questions essentielles avant d’étudier une villa, un
              appartement neuf ou un projet immobilier présenté par OFF MARKET.
            </p>
          </header>

          <div className="om-home-faq__list">
            {HOME_FAQ_ITEMS.map((item, index) => {
              const buttonId = `home-faq-button-${index}`;
              const panelId = `home-faq-panel-${index}`;

              return (
                <div
                  key={item.question}
                  className="om-home-faq__item"
                  data-open="false"
                >
                  <h3 className="om-home-faq__heading">
                    <button
                      id={buttonId}
                      type="button"
                      className="om-home-faq__trigger"
                      aria-expanded="false"
                      aria-controls={panelId}
                      data-home-faq-trigger
                    >
                      <span className="om-home-faq__question">
                        {item.question}
                      </span>
                      <span className="om-home-faq__toggle" aria-hidden="true">
                        +
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden="true"
                    className="om-home-faq__panel"
                    style={{ height: 0, opacity: 0, overflow: "hidden" }}
                  >
                    <div className="om-home-faq__panel-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <HomeFaqBoot sectionId={HOME_FAQ_SECTION_ID} />
    </>
  );
}
