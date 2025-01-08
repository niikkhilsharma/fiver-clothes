"use client";

import React from "react";
import Image from "next/image";
import { MdCloudUpload } from "react-icons/md";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const ImageGallery = ({
  garmentImages,
  setGarmentImgUrl,
}: {
  garmentImages: { image_url: string; image_id: string }[];
  setGarmentImgUrl: (url: string) => void;
}) => {
  return (
    <div className="mt-4 overflow-x-auto">
      <div className="grid w-max auto-cols-max grid-flow-col grid-rows-2 gap-2 pb-4">
        <Label
          htmlFor="garment-image"
          className="flex max-h-20 min-h-20 min-w-16 max-w-16 flex-shrink-0 items-center justify-center rounded-lg border p-[0.05rem] hover:cursor-pointer hover:bg-gray-100"
        >
          <MdCloudUpload size={32} className="text-blue-600" />
          <Input
            id="garment-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setGarmentImgUrl(URL.createObjectURL(file));
            }}
          />
        </Label>

        {garmentImages.map((garment, index) => (
          <div
            key={index}
            className="max-h-20 min-h-20 min-w-16 max-w-16 flex-shrink-0 overflow-hidden rounded-lg border p-[0.05rem]"
          >
            <Image
              onClick={() => setGarmentImgUrl(garment.image_url)}
              width={50}
              height={50}
              alt="Garment"
              src={garment.image_url}
              quality={100}
              unoptimized
              className="aspect-square h-full w-full rounded-lg object-fill transition-opacity hover:cursor-pointer hover:opacity-80"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
