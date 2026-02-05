import { NextRequest, NextResponse } from "next/server";

function getSessionToken() {
  return process.env.DASHBOARD_SESSION_TOKEN ?? "change-me";
}

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    !request.nextUrl.pathname.startsWith("/dashboard/login")
  ) {
    const token = request.cookies.get("dashboard_session")?.value;
    if (token !== getSessionToken()) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard/login";
      url.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
