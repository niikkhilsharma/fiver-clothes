import { NextResponse } from "next/server";

const HUHU_API_KEY = process.env.HUHU_API_KEY;
const HUHU_API_URL = "https://api-service.huhu.ai/requests/v1";

interface JobStatusResponse {
  job_id: string;
  status: string;
  output?: Array<{
    image_url: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: { params: { jobId: string } },
) {
  if (!HUHU_API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  try {
    const { jobId } = await params;
    const url = `${HUHU_API_URL}?job_id=${jobId}`;

    const response = await fetch(url, {
      headers: {
        "x-api-key": HUHU_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Huhu API error: ${response.statusText}`);
    }

    const data: JobStatusResponse = await response.json();

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
