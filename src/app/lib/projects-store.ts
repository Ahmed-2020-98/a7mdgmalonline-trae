import { promises as fs } from "fs";
import path from "path";
import { Project } from "./types";

const dataFile = path.join(process.cwd(), "data", "projects.json");

export async function getProjects(): Promise<Project[]> {
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

export async function saveProjects(projects: Project[]) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(projects, null, 2), "utf-8");
}
