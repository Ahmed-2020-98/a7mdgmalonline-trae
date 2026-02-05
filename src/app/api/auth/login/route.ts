import { NextResponse } from "next/server";
import { getAdminCredentials, setSessionCookie } from "../../../lib/auth";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    username?: string;
    password?: string;
  };
  const { username, password } = getAdminCredentials();
  if (payload.username !== username || payload.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  await setSessionCookie();
  return NextResponse.json({ ok: true });
}
