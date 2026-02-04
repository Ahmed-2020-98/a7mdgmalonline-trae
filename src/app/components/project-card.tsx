import Image from "next/image";
import Link from "next/link";
import { Project } from "../lib/types";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
      <div className="grid grid-cols-2 gap-2 bg-muted p-4">
        {project.images.map((image, index) => (
          <div
            key={`${project.name}-${index}`}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-background"
          >
            <Image
              src={image}
              alt={project.name}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {project.name}
          </h3>
          <p className="text-sm leading-7 text-foreground/70">
            {project.description}
          </p>
        </div>
        <Link
          href={project.url}
          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          {project.ctaLabel}
          <span className="text-base">↗</span>
        </Link>
      </div>
    </div>
  );
}
