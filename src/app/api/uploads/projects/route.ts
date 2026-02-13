import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { buildApiUrl, getApiBaseUrl } from "../../../lib/api-base";
import { isAuthenticated } from "../../../lib/auth";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const formData = await request.formData();
  const file = formData.get("image");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing image" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }
  if (getApiBaseUrl()) {
    const outgoing = new FormData();
    outgoing.append("image", file);
    const response = await fetch(buildApiUrl("/api/uploads/projects"), {
      method: "POST",
      body: outgoing,
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: "Upload failed" },
        { status: response.status },
      );
    }
    const data = (await response.json()) as { url?: string };
    return NextResponse.json({ url: data.url ?? "" });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".png";
  const filename = `${randomUUID()}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "projects");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  return NextResponse.json({ url: `/uploads/projects/${filename}` });
}
