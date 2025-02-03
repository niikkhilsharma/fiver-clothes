import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { reduceUserCredits } from "@/utils/db/actions";

export const maxDuration = 30;

const HUHU_API_KEY = process.env.HUHU_API_KEY;
const HUHU_API_URL = process.env.HUHU_API_URL!;

export async function POST(request: Request) {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Please login to continue" },
      { status: 401 },
    );
  } else if (!(user?.totalCredits > 0)) {
    return NextResponse.json(
      {
        error:
          "Insufficient credits. Please recharge your account to continue.",
      },
      { status: 403 },
    );
  }

  if (!HUHU_API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const { garmentType, garmentImgUrl, modelImgUrl, modelType } = body;

    console.log(garmentType, garmentImgUrl, modelImgUrl, modelType);
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

    if (!response.ok) {
      throw new Error(`Huhu API error: ${response.statusText}`);
    }

    await reduceUserCredits({ email: user.email, reduceBy: 1 });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 },
    );
  }
}
