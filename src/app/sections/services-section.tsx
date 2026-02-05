import { servicesIntro } from "../data/sections";
import ServiceCard from "../components/service-card";
import SectionHeading from "../ui/section-heading";
import { getServices } from "../lib/site-store";

export default async function ServicesSection() {
  const services = await getServices();
  return (
    <section id="services" className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-8">
          <SectionHeading
            title={servicesIntro.title}
            description={servicesIntro.description}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
