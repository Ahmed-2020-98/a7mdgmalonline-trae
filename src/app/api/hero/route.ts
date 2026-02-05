import { NextResponse } from "next/server";
import { isAuthenticated } from "../../lib/auth";
import { getHero, saveHero } from "../../lib/site-store";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const hero = await getHero();
  return NextResponse.json(hero);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = (await request.json()) as {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    imageKey: string;
    imageAlt: string;
  };
  await saveHero(payload);
  return NextResponse.json({ ok: true });
}
