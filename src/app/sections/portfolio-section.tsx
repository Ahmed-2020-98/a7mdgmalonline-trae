import { projects } from "../data/portfolio";
import { portfolioIntro } from "../data/sections";
import ProjectCard from "../components/project-card";
import Button from "../ui/button";
import SectionHeading from "../ui/section-heading";

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-muted">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              title={portfolioIntro.title}
              description={portfolioIntro.description}
            />
            {portfolioIntro.ctaLabel && portfolioIntro.ctaHref ? (
              <Button
                label={portfolioIntro.ctaLabel}
                href={portfolioIntro.ctaHref}
                variant="ghost"
                className="self-start md:self-auto"
              />
            ) : null}
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
