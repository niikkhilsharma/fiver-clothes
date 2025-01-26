import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://api.ideogram.ai/generate";
  const options = {
    method: "POST",
    headers: {
      "Api-Key":
        "IJBfB_43eTamg0n7j4YSZka6rOfyskYHb7ouH7L9rejesUvhoDNx5RJv5DBjQOjoLDRjUhmO8mmbGlrokyBsVw",
      "Content-Type": "application/json",
    },
    body: '{"image_request":{"prompt":"A realistic model from the left side camera view age greater than 20 male","aspect_ratio":"ASPECT_10_16","model":"V_2","magic_prompt_option":"AUTO"}}',
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}
