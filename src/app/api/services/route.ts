import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "../../lib/auth";
import { getServices, saveServices } from "../../lib/site-store";
import { Service } from "../../lib/types";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const services = await getServices();
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = (await request.json()) as Partial<Service>;
  const services = await getServices();
  const nextService: Service = {
    id: payload.id ?? randomUUID(),
    title: payload.title ?? "",
    description: payload.description ?? "",
    icon: (payload.icon ?? "info-site") as Service["icon"],
  };
  const updated = [...services, nextService];
  await saveServices(updated);
  return NextResponse.json(nextService, { status: 201 });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = (await request.json()) as Partial<Service>;
  if (!payload.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const services = await getServices();
  const index = services.findIndex((service) => service.id === payload.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const updatedService: Service = { ...services[index], ...payload } as Service;
  const updated = [...services];
  updated[index] = updatedService;
  await saveServices(updated);
  return NextResponse.json(updatedService);
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = (await request.json()) as { id?: string };
  if (!payload.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const services = await getServices();
  const updated = services.filter((service) => service.id !== payload.id);
  await saveServices(updated);
  return NextResponse.json({ ok: true });
}
