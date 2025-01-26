import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, cameraAngle } = await req.json();
    console.log(prompt, cameraAngle);
    // Validate inputs
    if (!cameraAngle || !prompt) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
    }

    // Construct detailed prompt
    const detailedPrompt = `#fashion ${prompt}, highly detailed and full-body , captured in a ${cameraAngle} view.`;

    const input = {
      cfg: 4.5,
      steps: 40,
      prompt: detailedPrompt,
      aspect_ratio: "1:1",
      output_format: "webp",
      output_quality: 90,
      prompt_strength: 0.85,
    };

    // Run Replicate model
    const output = await replicate.run(
      "stability-ai/stable-diffusion-3.5-large",
      { input },
    );

    // @ts-expect-error output has some error
    const text = await new Response(output).text();
    console.log(text);
    return NextResponse.json({
      imageUrl: text,
      message: "Image generated successfully",
    });
  } catch (error) {
    console.log("Replicate generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate image",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
