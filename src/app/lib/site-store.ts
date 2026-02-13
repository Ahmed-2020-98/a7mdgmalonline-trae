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
    try {
      const response = await fetch(buildApiUrl("/api/hero"), {
        cache: "no-store",
      });
      if (response.ok) {
        const data = (await response.json()) as
          | HeroContent
          | HeroRecord
          | (HeroRecord & {
              image_src?: string;
              cta_label?: string;
              cta_href?: string;
              secondary_cta_label?: string;
              secondary_cta_href?: string;
              image_alt?: string;
            });
        if (!data) {
          return fallbackHero();
        }
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
        if ("image_src" in data) {
          const imageSrc =
            data.image_src === "hero-webp"
              ? resolveImage("hero-webp")
              : data.image_src ?? data.imageSrc;
          return {
            title: data.title,
            description: data.description,
            ctaLabel: data.cta_label ?? data.ctaLabel,
            ctaHref: data.cta_href ?? data.ctaHref,
            secondaryCtaLabel: data.secondary_cta_label ?? data.secondaryCtaLabel,
            secondaryCtaHref: data.secondary_cta_href ?? data.secondaryCtaHref,
            imageSrc,
            imageAlt: data.image_alt ?? data.imageAlt,
          };
        }
        return data as HeroContent;
      }
    } catch {
      return fallbackHero();
    }
  }
  return fallbackHero();
}

async function fallbackHero(): Promise<HeroContent> {
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
    try {
      const response = await fetch(buildApiUrl("/api/services"), {
        cache: "no-store",
      });
      if (response.ok) {
        return (await response.json()) as Service[];
      }
    } catch {
      const raw = await fs.readFile(servicesFile, "utf-8");
      return JSON.parse(raw) as Service[];
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
    try {
      const response = await fetch(buildApiUrl("/api/clients"), {
        cache: "no-store",
      });
      if (response.ok) {
        const data = (await response.json()) as Array<
          Client & { logo_src?: string }
        >;
        return data.map((client) => ({
          id: client.id,
          name: client.name,
          logoSrc:
            client.logo_src === "client-logo"
              ? resolveImage("client-logo")
              : client.logo_src ?? client.logoSrc,
        }));
      }
    } catch {
      const records = await getClientRecords();
      return records.map((record) => ({
        id: record.id,
        name: record.name,
        logoSrc: resolveImage(record.logoKey),
      }));
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
