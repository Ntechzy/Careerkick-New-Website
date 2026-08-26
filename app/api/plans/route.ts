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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "20";
  const authorization = request.headers.get("authorization");
  const upstreamUrl = `${getApiBaseUrl()}/plans?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`;

  try {
    const response = await fetch(upstreamUrl, {
      headers: {
        Accept: "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
      },
      cache: "no-store",
    });
    const payload = await response.json();

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to connect to plans service.",
      },
      { status: 502 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const authorization = request.headers.get("authorization");
    const response = await fetch(`${getApiBaseUrl()}/plans`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to connect to plans service.",
      },
      { status: 502 },
    );
  }
}
