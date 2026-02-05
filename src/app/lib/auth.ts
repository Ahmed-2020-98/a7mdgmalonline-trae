import { cookies } from "next/headers";

const sessionCookie = "dashboard_session";

export function getAdminCredentials() {
  return {
    username: process.env.DASHBOARD_USERNAME ?? "admin",
    password: process.env.DASHBOARD_PASSWORD ?? "admin",
    sessionToken: process.env.DASHBOARD_SESSION_TOKEN ?? "change-me",
  };
}

export function getSessionToken() {
  const { sessionToken } = getAdminCredentials();
  return sessionToken;
}

export async function isAuthenticated() {
  const store = await cookies();
  const token = store.get(sessionCookie)?.value;
  return token === getSessionToken();
}

export async function setSessionCookie() {
  const store = await cookies();
  store.set(sessionCookie, getSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.set(sessionCookie, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}
