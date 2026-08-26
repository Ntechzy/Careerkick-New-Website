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

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authorization = request.headers.get("authorization");

  try {
    const response = await fetch(
      `${getApiBaseUrl()}/student-payment-details/${encodeURIComponent(params.id)}`,
      {
        headers: {
          Accept: "application/json",
          ...(authorization ? { Authorization: authorization } : {}),
        },
        cache: "no-store",
      },
    );
    const payload = await response.json();

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to connect to student payment service.",
      },
      { status: 502 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authorization = request.headers.get("authorization");

  try {
    const body = await request.json();
    const response = await fetch(
      `${getApiBaseUrl()}/student-payment-details/${encodeURIComponent(params.id)}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(authorization ? { Authorization: authorization } : {}),
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );
    const payload = await response.json();

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to connect to student payment service.",
      },
      { status: 502 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authorization = request.headers.get("authorization");

  try {
    const response = await fetch(
      `${getApiBaseUrl()}/student-payment-details/${encodeURIComponent(params.id)}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          ...(authorization ? { Authorization: authorization } : {}),
        },
        cache: "no-store",
      },
    );
    const payload = await response.json();

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to connect to student payment service.",
      },
      { status: 502 },
    );
  }
}
