"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import ImageGallery from "@/components/image-gallery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { modelImages, garmentImages } from "@/lib/dummy-data";
import { uploadToCloudinary } from "@/lib/function";
import Navbar from "@/components/navbar";

export default function Create() {
  const [garmentImgUrl, setGarmentImgUrl] = useState<string | null>(null);
  const [modelImgUrl, setModelImgUrl] = useState<string | null>(null);
  const [genImageUrl, setGenImage] = useState<string | null>(null);
  const [garmentType, setGarmentType] = useState<string | null>(null);
  const [modelType, setModelType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numImages, setNumImages] = useState("1");
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  console.log(modelType, numImages, error);
  // Handle file uploads
  const handleFileUpload = async (
    file: File,
    setUrl: (url: string) => void,
  ) => {
    try {
      setIsLoading(true);
      const cloudinaryUrl = await uploadToCloudinary(file);
      setUrl(cloudinaryUrl);
    } catch (error) {
      console.error("Upload error:", error);
      // Here you might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  // Handle generate button click
  const handleGenerate = async () => {
    if (!garmentType || !garmentImgUrl || !modelImgUrl) {
      // Show error message to user
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          garmentType,
          garmentImgUrl,
          modelImgUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = await response.json();
      setJobId(data.job_id);
      setJobStatus(data.status);
    } catch (error) {
      console.error("Generation error:", error);
      // Show error message to user
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkStatus = async () => {
      if (!jobId) return;

      try {
        const response = await fetch(`/api/status/${jobId}`);

        if (!response.ok) {
          throw new Error(`Status check failed: ${response.statusText}`);
        }

        const data = await response.json();
        setJobStatus(data.status);

        if (data.status === "completed" && data.imageUrl) {
          setGenImage(data.imageUrl);
          clearInterval(intervalId);
          setIsLoading(false);
        } else if (data.status === "failed") {
          setIsLoading(false);
          setError("Image generation failed");
          clearInterval(intervalId);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to check status");
        setIsLoading(false);
        clearInterval(intervalId);
      }
    };

    if (jobId && jobStatus !== "completed" && jobStatus !== "failed") {
      intervalId = setInterval(checkStatus, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [jobId, jobStatus]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="py-8">
        <div className="mx-auto flex max-w-screen-lg gap-4 px-4">
          {/* Garment Section */}
          <div className="w-1/3">
            <p className="font-sans font-medium text-gray-500">
              Please upload or select a garment:
            </p>
            <Label htmlFor="garment" className="mt-2 hover:cursor-pointer">
              <div className="mt-2 flex h-[26rem] flex-col items-center justify-center gap-2 rounded-lg border bg-white font-sans font-bold text-gray-600">
                {garmentImgUrl ? (
                  <Image
                    width={100}
                    height={100}
                    alt="Garment"
                    src={garmentImgUrl}
                    className="h-full w-full object-contain"
                    quality={100}
                    unoptimized
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 p-2 text-xs text-gray-400">
                    <ImageIcon />
                    <p className="text-center">
                      Input Garment Would be displayed here.
                    </p>
                  </div>
                )}
              </div>
            </Label>
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(file, setGarmentImgUrl);
                }
              }}
              id="garment"
              className="hidden"
            />

            <Label htmlFor="garment_type" className="mt-2 hover:cursor-pointer">
              <Select onValueChange={(value) => setGarmentType(value)}>
                <SelectTrigger className="mt-4 w-full font-sans text-gray-600 focus:ring-gray-300">
                  <SelectValue
                    placeholder="Please select a garment type"
                    className="text-gray-600"
                  />
                </SelectTrigger>
                <SelectContent className="font-sans text-gray-600">
                  <SelectItem value="Top">Top</SelectItem>
                  <SelectItem value="Bottom">Bottom</SelectItem>
                  <SelectItem value="Full Body">Full Body</SelectItem>
                </SelectContent>
              </Select>
            </Label>

            <ImageGallery
              garmentImages={garmentImages}
              setGarmentImgUrl={setGarmentImgUrl}
            />
          </div>

          {/* Model Section */}
          <div className="w-1/3">
            <p className="font-sans font-medium text-gray-500">
              Please upload or select a model:
            </p>
            <Label htmlFor="model" className="mt-2 hover:cursor-pointer">
              <div className="mt-2 flex h-[26rem] flex-col items-center justify-center gap-2 rounded-lg border bg-white font-sans font-bold text-gray-600">
                {modelImgUrl ? (
                  <Image
                    unoptimized
                    width={100}
                    height={100}
                    alt="Model"
                    src={modelImgUrl}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 p-2 text-xs text-gray-400">
                    <ImageIcon />
                    <p className="text-center">
                      Input Model will be displayed here.
                    </p>
                  </div>
                )}
              </div>
            </Label>
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(file, setModelImgUrl);
                }
              }}
              id="model"
              className="hidden"
            />

            <Label htmlFor="model_type" className="mt-2 hover:cursor-pointer">
              <Select onValueChange={(value) => setModelType(value)}>
                <SelectTrigger className="mt-4 w-full font-sans text-gray-600 focus:ring-gray-300">
                  <SelectValue
                    className="text-gray-600"
                    placeholder="Filter Model"
                  />
                </SelectTrigger>
                <SelectContent className="font-sans text-gray-600">
                  <SelectItem value="Woman">Woman</SelectItem>
                  <SelectItem value="Man">Man</SelectItem>
                  <SelectItem value="Boy">Boy</SelectItem>
                  <SelectItem value="Girl">Girl</SelectItem>
                  <SelectItem value="Generated Model List">
                    Generated Model List
                  </SelectItem>
                </SelectContent>
              </Select>
            </Label>

            <ImageGallery
              garmentImages={modelImages}
              setGarmentImgUrl={setModelImgUrl}
            />
          </div>

          {/* Generated Image Section */}
          <div className="w-1/3">
            <p className="font-sans font-medium text-gray-500">
              Generated image:
            </p>

            <div className="mt-2 flex h-[26rem] flex-col items-center justify-center gap-2 rounded-lg border bg-white font-sans font-bold text-gray-600">
              {genImageUrl ? (
                <Image
                  unoptimized
                  width={100}
                  height={100}
                  alt="Generated Image"
                  src={genImageUrl}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 p-2 text-xs text-gray-400">
                  <ImageIcon />
                  <p className="text-center">
                    Generated image will be displayed here.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Label
                htmlFor="num_images"
                className="w-full font-sans text-sm hover:cursor-pointer"
              >
                Number of images:
              </Label>
              <Select
                defaultValue="1"
                onValueChange={(value) => setNumImages(value)}
              >
                <SelectTrigger className="font-sans text-gray-600 focus:ring-gray-300">
                  <SelectValue className="text-gray-600" />
                </SelectTrigger>
                <SelectContent className="font-sans text-gray-600">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button
                className="mt-4 w-full bg-blue-600 hover:bg-blue-600/90"
                onClick={handleGenerate}
                disabled={
                  isLoading || !garmentType || !garmentImgUrl || !modelImgUrl
                }
              >
                {isLoading ? "Processing..." : "Generate Model"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
