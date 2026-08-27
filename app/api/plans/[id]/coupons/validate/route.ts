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

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authorization = request.headers.get("authorization");
  const planId = request.headers.get("planId") ?? request.headers.get("planid") ?? params.id;

  try {
    const payload = await request.json();
    const response = await fetch(
      `${getApiBaseUrl()}/plans/${encodeURIComponent(planId)}/coupons/validate`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          planId,
          ...(authorization ? { Authorization: authorization } : {}),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to connect to coupon service.",
      },
      { status: 502 },
    );
  }
}
