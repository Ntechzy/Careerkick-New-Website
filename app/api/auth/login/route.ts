import { NextResponse } from "next/server";

const fallbackApiBaseUrl = "http://localhost:5000/api";

function getApiBaseUrl() {
  return (
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.VITE_API_BASE_URL ??
    fallbackApiBaseUrl
  ).replace(/\/$/, "");
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const response = await fetch(`${getApiBaseUrl()}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const data = await response.json();
    const role = data?.data?.role;
    const nextResponse = NextResponse.json(data, { status: response.status });

    if (response.ok && data?.success && (role === "admin" || role === "student")) {
      nextResponse.cookies.set("careerkick-dashboard-auth", "true", {
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "lax",
      });
      nextResponse.cookies.set("careerkick-dashboard-role", role, {
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "lax",
      });
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to connect to login service.",
      },
      { status: 502 },
    );
  }
}
