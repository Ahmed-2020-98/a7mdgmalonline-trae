import { testimonials } from "../data/testimonials";
import { testimonialsIntro } from "../data/sections";
import TestimonialCard from "../components/testimonial-card";
import SectionHeading from "../ui/section-heading";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-muted">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-8">
          <SectionHeading
            title={testimonialsIntro.title}
            description={testimonialsIntro.description}
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
