import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DASHBOARD_AUTH_COOKIE = "careerkick-dashboard-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/dashboard/login";
  const isLoggedIn = request.cookies.get(DASHBOARD_AUTH_COOKIE)?.value === "true";

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
