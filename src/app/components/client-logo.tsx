import Image from "next/image";
import { Client } from "../lib/types";

type ClientLogoProps = {
  client: Client;
};

export default function ClientLogo({ client }: ClientLogoProps) {
  return (
    <div className="group flex items-center justify-center rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
      <div className="relative h-10 w-28 grayscale transition group-hover:grayscale-0">
        <Image
          src={client.logoSrc}
          alt={client.name}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
