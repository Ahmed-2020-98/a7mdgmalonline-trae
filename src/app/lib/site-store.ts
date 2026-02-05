import { promises as fs } from "fs";
import path from "path";
import { buildApiUrl, getApiBaseUrl } from "./api-base";
import { Client, HeroContent, Service } from "./types";
import heroImage from "@/assets/images/hero.webp";
import clientLogo from "@/assets/images/client-logo.svg";

const heroFile = path.join(process.cwd(), "data", "hero.json");
const servicesFile = path.join(process.cwd(), "data", "services.json");
const clientsFile = path.join(process.cwd(), "data", "clients.json");

type HeroRecord = Omit<HeroContent, "imageSrc"> & { imageKey: string };
type ClientRecord = { id: string; name: string; logoKey: string };

function resolveImage(key: string) {
  if (key === "hero-webp") {
    return heroImage;
  }
  if (key === "client-logo") {
    return clientLogo;
  }
  return "/images/project-placeholder.svg";
}

export async function getHero(): Promise<HeroContent> {
  if (getApiBaseUrl()) {
    const response = await fetch(buildApiUrl("/api/hero"), { cache: "no-store" });
    if (response.ok) {
      const data = (await response.json()) as HeroContent | HeroRecord;
      if ("imageKey" in data) {
        return {
          title: data.title,
          description: data.description,
          ctaLabel: data.ctaLabel,
          ctaHref: data.ctaHref,
          secondaryCtaLabel: data.secondaryCtaLabel,
          secondaryCtaHref: data.secondaryCtaHref,
          imageSrc: resolveImage(data.imageKey),
          imageAlt: data.imageAlt,
        };
      }
      return data as HeroContent;
    }
  }
  const raw = await fs.readFile(heroFile, "utf-8");
  const record = JSON.parse(raw) as HeroRecord;
  return {
    title: record.title,
    description: record.description,
    ctaLabel: record.ctaLabel,
    ctaHref: record.ctaHref,
    secondaryCtaLabel: record.secondaryCtaLabel,
    secondaryCtaHref: record.secondaryCtaHref,
    imageSrc: resolveImage(record.imageKey),
    imageAlt: record.imageAlt,
  };
}

export async function saveHero(hero: HeroRecord) {
  await fs.mkdir(path.dirname(heroFile), { recursive: true });
  await fs.writeFile(heroFile, JSON.stringify(hero, null, 2), "utf-8");
}

export async function getServices(): Promise<Service[]> {
  if (getApiBaseUrl()) {
    const response = await fetch(buildApiUrl("/api/services"), {
      cache: "no-store",
    });
    if (response.ok) {
      return (await response.json()) as Service[];
    }
  }
  const raw = await fs.readFile(servicesFile, "utf-8");
  return JSON.parse(raw) as Service[];
}

export async function saveServices(services: Service[]) {
  await fs.mkdir(path.dirname(servicesFile), { recursive: true });
  await fs.writeFile(servicesFile, JSON.stringify(services, null, 2), "utf-8");
}

export async function getClients(): Promise<Client[]> {
  if (getApiBaseUrl()) {
    const response = await fetch(buildApiUrl("/api/clients"), {
      cache: "no-store",
    });
    if (response.ok) {
      return (await response.json()) as Client[];
    }
  }
  const records = await getClientRecords();
  return records.map((record) => ({
    id: record.id,
    name: record.name,
    logoSrc: resolveImage(record.logoKey),
  }));
}

export async function getClientRecords(): Promise<ClientRecord[]> {
  const raw = await fs.readFile(clientsFile, "utf-8");
  return JSON.parse(raw) as ClientRecord[];
}

export async function saveClients(records: ClientRecord[]) {
  await fs.mkdir(path.dirname(clientsFile), { recursive: true });
  await fs.writeFile(clientsFile, JSON.stringify(records, null, 2), "utf-8");
}
