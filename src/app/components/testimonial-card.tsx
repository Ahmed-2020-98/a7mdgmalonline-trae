import Image from "next/image";
import { Testimonial } from "../lib/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
      <p className="text-sm leading-7 text-foreground/70">
        {testimonial.comment}
      </p>
      <div className="mt-auto flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border bg-muted">
          <Image
            src={testimonial.avatarSrc}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
        </div>
      </div>
    </div>
  );
}
