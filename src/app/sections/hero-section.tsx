import Image from "next/image";
import { heroContent } from "../data/home";
import Button from "../ui/button";

export default function HeroSection() {
  return (
    <section id="home" className="bg-muted/60">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="space-y-6 text-right">
          <h1 className="text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl">
            {heroContent.title}
          </h1>
          <p className="text-base leading-8 text-foreground/70 sm:text-lg">
            {heroContent.description}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button label={heroContent.ctaLabel} href={heroContent.ctaHref} />
            <Button
              label="شاهد أعمالنا"
              href="#portfolio"
              variant="ghost"
            />
          </div>
        </div>
        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[36px] border border-border bg-white shadow-lg">
          <Image
            src={heroContent.imageSrc}
            alt={heroContent.imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
