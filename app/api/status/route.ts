import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

const HUHU_API_KEY = process.env.HUHU_API_KEY;
const HUHU_API_URL = "https://api-service.huhu.ai/requests/v1";

export async function GET(request: NextRequest) {
  if (!HUHU_API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }
  const params = request?.nextUrl?.searchParams;
  const jobId = params?.get("jobId");

  try {
    const url = `${HUHU_API_URL}?job_id=${jobId}`;

    const response = await fetch(url, {
      headers: {
        "x-api-key": HUHU_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Huhu API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      jobId: data.job_id,
      status: data.status,
      imageUrl:
        data.status === "completed" ? data.output?.[0]?.image_url : undefined,
    });
  } catch (error) {
    console.error("Status check error:", error);
    return NextResponse.json(
      { error: "Failed to check job status" },
      { status: 500 },
    );
  }
}
