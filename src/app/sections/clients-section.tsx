import { clientsIntro } from "../data/sections";
import ClientLogo from "../components/client-logo";
import SectionHeading from "../ui/section-heading";
import { getClients } from "../lib/site-store";

export default async function ClientsSection() {
  const clients = await getClients();
  return (
    <section id="clients" className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-8">
          <SectionHeading
            title={clientsIntro.title}
            description={clientsIntro.description}
            align="center"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((client) => (
              <ClientLogo key={client.name} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
