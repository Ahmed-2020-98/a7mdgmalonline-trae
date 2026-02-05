import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "../../lib/auth";
import { getClientRecords, getClients, saveClients } from "../../lib/site-store";
import { Client } from "../../lib/types";

type ClientRecord = { id: string; name: string; logoKey: string };

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const clients = await getClients();
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = (await request.json()) as Partial<Client> & {
    logoKey?: string;
  };
  const records = await getClientRecords();
  const nextRecord: ClientRecord = {
    id: payload.id ?? randomUUID(),
    name: payload.name ?? "",
    logoKey: payload.logoKey ?? "client-logo",
  };
  const updated = [...records, nextRecord];
  await saveClients(updated);
  return NextResponse.json(nextRecord, { status: 201 });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = (await request.json()) as { id?: string; name?: string; logoKey?: string };
  if (!payload.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const records = await getClientRecords();
  const index = records.findIndex((client) => client.id === payload.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const updatedRecord: ClientRecord = {
    ...records[index],
    ...payload,
    logoKey: payload.logoKey ?? records[index].logoKey,
  };
  const updated = [...records];
  updated[index] = updatedRecord;
  await saveClients(updated);
  return NextResponse.json(updatedRecord);
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = (await request.json()) as { id?: string };
  if (!payload.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const records = await getClientRecords();
  const updated = records.filter((client) => client.id !== payload.id);
  await saveClients(updated);
  return NextResponse.json({ ok: true });
}
