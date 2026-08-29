import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DASHBOARD_AUTH_COOKIE = "careerkick-dashboard-auth";
const DASHBOARD_ROLE_COOKIE = "careerkick-dashboard-role";
const adminOnlyPaths = [
  "/dashboard/plans",
  "/dashboard/coupons",
  "/dashboard/student-transactions",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/dashboard/login";
  const isLoggedIn = request.cookies.get(DASHBOARD_AUTH_COOKIE)?.value === "true";
  const role = request.cookies.get(DASHBOARD_ROLE_COOKIE)?.value;
  const isAdminOnlyPath = adminOnlyPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isLoggedIn && role === "student" && isAdminOnlyPath) {
    return NextResponse.redirect(new URL("/dashboard/my-transactions", request.url));
  }

  if (isLoggedIn && role !== "admin" && role !== "student") {
    const response = NextResponse.redirect(new URL("/dashboard/login", request.url));
    response.cookies.delete(DASHBOARD_AUTH_COOKIE);
    response.cookies.delete(DASHBOARD_ROLE_COOKIE);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
