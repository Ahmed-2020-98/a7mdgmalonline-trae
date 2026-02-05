import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getProjects, saveProjects } from "../../lib/projects-store";
import { Project } from "../../lib/types";
import { isAuthenticated } from "../../lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = (await request.json()) as Partial<Project>;
  const projects = await getProjects();
  const nextProject: Project = {
    id: payload.id ?? randomUUID(),
    name: payload.name ?? "",
    description: payload.description ?? "",
    images:
      payload.images && payload.images.length > 0
        ? payload.images
        : ["/images/project-placeholder.svg"],
    url: payload.url ?? "",
    ctaLabel: payload.ctaLabel ?? "زيارة الموقع",
    category: payload.category ?? "عام",
  };
  const updated = [...projects, nextProject];
  await saveProjects(updated);
  return NextResponse.json(nextProject, { status: 201 });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = (await request.json()) as Partial<Project>;
  if (!payload.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const projects = await getProjects();
  const index = projects.findIndex((project) => project.id === payload.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const updatedProject: Project = {
    ...projects[index],
    ...payload,
    images:
      payload.images && payload.images.length > 0
        ? payload.images
        : projects[index].images,
  };
  const updated = [...projects];
  updated[index] = updatedProject;
  await saveProjects(updated);
  return NextResponse.json(updatedProject);
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = (await request.json()) as { id?: string };
  if (!payload.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const projects = await getProjects();
  const updated = projects.filter((project) => project.id !== payload.id);
  await saveProjects(updated);
  return NextResponse.json({ ok: true });
}
