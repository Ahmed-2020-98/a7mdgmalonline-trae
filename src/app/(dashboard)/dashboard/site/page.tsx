import DashboardSiteSettings from "../../../components/dashboard-site-settings";
import { getClients, getHero, getServices } from "../../../lib/site-store";

export default async function DashboardSitePage() {
  const [hero, services, clients] = await Promise.all([
    getHero(),
    getServices(),
    getClients(),
  ]);

  return (
    <DashboardSiteSettings
      initialHero={hero}
      initialServices={services}
      initialClients={clients}
    />
  );
}

