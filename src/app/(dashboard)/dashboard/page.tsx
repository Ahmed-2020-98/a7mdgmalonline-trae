import DashboardProjects from "../../components/dashboard-projects";
import { getProjects } from "../../lib/projects-store";

export default async function DashboardPage() {
  const projects = await getProjects();
  return <DashboardProjects initialProjects={projects} />;
}
