import Image from "next/image";
import { aboutContent } from "../data/home";
import Button from "../ui/button";

export default function AboutSection() {
  return (
    <section id="about" className="bg-background">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[32px] border border-border bg-muted">
          <Image
            src={aboutContent.imageSrc}
            alt={aboutContent.imageAlt}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6 text-right">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            {aboutContent.title}
          </h2>
          <p className="text-base leading-8 text-foreground/70 sm:text-lg">
            {aboutContent.description}
          </p>
          <Button
            label={aboutContent.ctaLabel}
            href={aboutContent.ctaHref}
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
}
