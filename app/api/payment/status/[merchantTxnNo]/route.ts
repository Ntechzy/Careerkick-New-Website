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
  _request: Request,
  { params }: { params: { merchantTxnNo: string } },
) {
  const merchantTxnNo = params.merchantTxnNo;
  const upstreamUrl = `${getApiBaseUrl()}/payment/status/${encodeURIComponent(merchantTxnNo)}`;

  try {
    const response = await fetch(upstreamUrl, {
      headers: {
        Accept: "application/json",
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
          error instanceof Error ? error.message : "Unable to check payment status.",
      },
      { status: 502 },
    );
  }
}
