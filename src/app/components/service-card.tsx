import { Service } from "../lib/types";
import { ServiceIcon } from "../ui/icons";

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
        <ServiceIcon name={service.icon} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-7 text-foreground/70">
          {service.description}
        </p>
      </div>
    </div>
  );
}
