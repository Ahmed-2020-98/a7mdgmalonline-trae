import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import SectionHeading from "../ui/section-heading";
import ProjectsFilter from "../components/projects-filter";
import { getProjects } from "../lib/projects-store";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-8">
          <SectionHeading
            title="مشاريعنا"
            description="استكشف مجموعة مختارة من أعمالنا في تصميم المواقع وتطبيقات الموبايل."
          />
          <ProjectsFilter projects={projects} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
