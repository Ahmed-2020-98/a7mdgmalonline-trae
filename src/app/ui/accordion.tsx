import { FaqItem } from "../lib/types";

type AccordionProps = {
  items: FaqItem[];
};

export default function Accordion({ items }: AccordionProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-border bg-background px-5 py-4 transition hover:border-primary/40"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-foreground">
            <span>{item.question}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-7 text-foreground/70">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
