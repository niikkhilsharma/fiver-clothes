import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { imageBlob } = body;

  const uploadedImgObj = await cloudinary.uploader.upload(imageBlob);
  console.log(uploadedImgObj);
  return NextResponse.json({ publicId: uploadedImgObj.public_id });
}
