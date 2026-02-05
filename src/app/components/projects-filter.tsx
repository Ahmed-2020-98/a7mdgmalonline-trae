"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./project-card";
import { Project } from "../lib/types";

type ProjectsFilterProps = {
  projects: Project[];
};

export default function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const categories = useMemo(() => {
    const unique = new Set(projects.map((project) => project.category));
    return ["الكل", ...Array.from(unique)];
  }, [projects]);
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? "الكل");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "الكل") {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeCategory === category
                ? "bg-primary text-white shadow-sm shadow-primary/30"
                : "border border-border bg-background text-foreground/70 hover:border-primary/40 hover:text-primary"
            }`}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-foreground/60">
          لا توجد مشاريع ضمن هذا التصنيف حالياً.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id ?? project.name} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
