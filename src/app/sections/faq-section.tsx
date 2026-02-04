import { faqs } from "../data/faqs";
import { faqIntro } from "../data/sections";
import Accordion from "../ui/accordion";
import SectionHeading from "../ui/section-heading";

export default function FaqSection() {
  return (
    <section id="faq" className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            title={faqIntro.title}
            description={faqIntro.description}
          />
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
