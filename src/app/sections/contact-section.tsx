import {
  contactFields,
  contactFormContent,
  contactInfo,
  contactInfoLabels,
} from "../data/contact";
import { contactIntro } from "../data/sections";
import SectionHeading from "../ui/section-heading";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-muted">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <SectionHeading
              title={contactIntro.title}
              description={contactIntro.description}
            />
            <div className="space-y-4 text-sm text-foreground/80">
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs text-foreground/60">
                  {contactInfoLabels.phone}
                </p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {contactInfo.phone}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs text-foreground/60">
                  {contactInfoLabels.email}
                </p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {contactInfo.email}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs text-foreground/60">
                  {contactInfoLabels.address}
                </p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {contactInfo.address}
                </p>
              </div>
            </div>
          </div>
          <form
            className="rounded-3xl border border-border bg-background p-6 shadow-sm"
            suppressHydrationWarning
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {contactFields.map((field) =>
                field.as === "textarea" ? (
                  <label
                    key={field.name}
                    className="flex flex-col gap-2 sm:col-span-2"
                  >
                    <span className="text-sm font-semibold text-foreground">
                      {field.label}
                    </span>
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="min-h-[140px] rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                    />
                  </label>
                ) : (
                  <label key={field.name} className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {field.label}
                    </span>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                    />
                  </label>
                )
              )}
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition hover:bg-primary/90"
            >
              {contactFormContent.submitLabel}
            </button>
            <p className="mt-3 text-center text-xs text-foreground/60">
              {contactFormContent.helperText}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
