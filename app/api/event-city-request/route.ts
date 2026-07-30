import { NextResponse } from "next/server";

type CityRequestPayload = {
  name?: unknown;
  phone?: unknown;
  city?: unknown;
  role?: unknown;
};

const validRoles = new Set(["Student", "Parent", "Guardian"]);

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanUrl(value: string | undefined) {
  return value?.replace(/\s+/g, "").trim();
}

export async function POST(request: Request) {
  const googleScriptUrl = cleanUrl(process.env.GOOGLE_SHEETS_EVENT_CITY_REQUEST_URL);

  if (!googleScriptUrl) {
    return NextResponse.json(
      { message: "City request form is not configured yet." },
      { status: 500 },
    );
  }

  let payload: CityRequestPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request data." }, { status: 400 });
  }

  const name = cleanText(payload.name);
  const phone = cleanText(payload.phone);
  const city = cleanText(payload.city);
  const role = cleanText(payload.role) || "Student";

  if (!name || !phone || !city) {
    return NextResponse.json(
      { message: "Please fill in your name, phone number, and city." },
      { status: 400 },
    );
  }

  if (!validRoles.has(role)) {
    return NextResponse.json({ message: "Please select a valid role." }, { status: 400 });
  }

  try {
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        name,
        phone,
        city,
        role,
        pageUrl: request.headers.get("referer") || "",
        submittedAt: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const deploymentMessage =
        response.status === 403
          ? "City request submissions are not enabled yet. Please check the form deployment access."
          : `City request service returned ${response.status}. Please try again later.`;

      return NextResponse.json(
        { message: deploymentMessage },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: "City request submitted successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Google Apps Script error.";

    return NextResponse.json(
      { message: `City request connection failed: ${message}` },
      { status: 502 },
    );
  }
}
