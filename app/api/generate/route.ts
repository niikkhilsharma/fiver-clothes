import { NextResponse } from "next/server";

const HUHU_API_KEY = process.env.HUHU_API_KEY;
const HUHU_API_URL = "https://api-service.huhu.ai/tryon/v1";

export async function POST(request: Request) {
  if (!HUHU_API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const { garmentType, garmentImgUrl, modelImgUrl, modelType } = body;

    if (!garmentType || !garmentImgUrl || !modelImgUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await fetch(HUHU_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HUHU_API_KEY,
      },
      body: JSON.stringify({
        image_garment_url: garmentImgUrl,
        image_model_url: modelImgUrl,
        garment_type: garmentType,
        model_type: modelType,
      }),
    });
    console.log(response, "response");
    if (!response.ok) {
      throw new Error(`Huhu API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 },
    );
  }
}
