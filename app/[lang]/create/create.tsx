"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
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
import { modelImages, garmentImages } from "@/lib/data";
import { uploadToCloudinary } from "@/lib/function";
import { useToast } from "@/hooks/use-toast";
import { languageDictionaryType } from "@/lib/types";

export default function Create({
  dictionary,
}: {
  dictionary: languageDictionaryType;
}) {
  const { toast } = useToast();

  const [garmentImgUrl, setGarmentImgUrl] = useState<string | null>(null);
  const [replicateImageUrl, setReplicateImageUrl] = useState<string | null>(
    null,
  );
  const [currentModelImageUrl, setCurrentModelImageUrl] = useState<
    string | null
  >(null);
  const [garmentType, setGarmentType] = useState<"Top" | "Bottom" | "Full">(
    "Top",
  );
  const [prompt, setPrompt] = useState<string>("");
  const [cameraAngle, setCameraAngle] = useState<
    "front" | "side" | "back" | "3/4"
  >("front");

  const [isLoading, setIsLoading] = useState(false);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelImageLoader, setModelImageLoader] = useState<boolean>(false);

  const handleFileUpload = async (
    file: File,
    setUrl: (url: string) => void,
  ) => {
    try {
      setIsLoading(true);
      const cloudinaryUrl = await uploadToCloudinary(file);
      setUrl(cloudinaryUrl);
      toast({
        title: dictionary.success.upload,
        description: dictionary.success.uploadDescription,
      });
    } catch (error) {
      console.log("Upload error:", error);
      toast({
        variant: "destructive",
        title: dictionary.errors.uploadFailed,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = (): boolean => {
    if (!garmentType) {
      toast({
        variant: "destructive",
        title: dictionary.errors.missingInput,
        description: dictionary.errors.selectGarmentType,
      });
      return false;
    }
    if (!garmentImgUrl) {
      toast({
        variant: "destructive",
        title: dictionary.errors.missingInput,
        description: dictionary.errors.uploadGarmentImage,
      });
      return false;
    }
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: dictionary.errors.missingInput,
        description: dictionary.errors.pleaseEnterPrompt,
      });
      return false;
    }
    return true;
  };

  const handleReplicateGenerate = async () => {
    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      setError(null);
      setReplicateImageUrl(null);

      const response = await fetch("/api/replicate-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          garmentType,
          garmentImgUrl,
          prompt,
          cameraAngle,
        }),
      });

      if (!response.ok) {
        const errorMessage =
          (await response.json()).error || "Generation Failed";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setReplicateImageUrl(data.imageUrl);
      setIsLoading(false);
      toast({
        title: dictionary.success.title,
        description: dictionary.success.imageGenerated,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Generation failed";

      toast({
        variant: "destructive",
        title: dictionary.errors.failedGeneration,
      });

      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleDownloadImage = () => {
    if (!currentModelImageUrl) return;

    const link = document.createElement("a");
    link.href = currentModelImageUrl;
    link.download = "generated-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCurrentModelGenerate = async () => {
    try {
      setModelImageLoader(true);
      setError(null);
      setCurrentModelImageUrl(null);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          garmentType,
          garmentImgUrl,
          modelImgUrl: replicateImageUrl,
        }),
      });

      if (!response.ok) {
        const errorMessage =
          (await response.json()).error || "Generation Failed";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setJobId(data.job_id);
      setJobStatus(data.status);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Generation failed";

      toast({
        variant: "destructive",
        title: dictionary.errors.failedGeneration,
      });

      setError(errorMessage);
      setModelImageLoader(false);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkStatus = async () => {
      if (!jobId) return;

      try {
        const response = await fetch(`/api/status?jobId=${jobId}`);

        if (!response.ok) {
          throw new Error(`Status check failed: ${response.statusText}`);
        }

        const data = await response.json();
        setJobStatus(data.status);

        if (data.status === "completed" && data.imageUrl) {
          setCurrentModelImageUrl(data.imageUrl);
          clearInterval(intervalId);
          setModelImageLoader(false);
          toast({
            title: dictionary.success.title,
            description: dictionary.success.imageGenerated,
          });
        } else if (data.status === "failed") {
          setIsLoading(false);
          setError("Image generation failed");
          clearInterval(intervalId);
          toast({
            variant: "destructive",
            title: dictionary.errors.failedGeneration,
          });
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to check status";
        setError(errorMessage);
        setModelImageLoader(false);
        clearInterval(intervalId);
        toast({
          variant: "destructive",
          title: dictionary.errors.statusCheck,
        });
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
  }, [jobId, jobStatus, toast]);

  return (
    <div className="mx-auto my-32 flex max-w-screen-lg flex-wrap justify-center gap-4 px-4 md:flex-nowrap md:justify-between">
      {/* Garment Upload Section */}
      <div className="w-full sm:w-[48%] md:w-[31%]">
        <p className="font-sans font-medium md:h-12 lg:h-auto">
          {dictionary.create.garmentUploadHeading}
        </p>
        <Label htmlFor="garment" className="mt-2 hover:cursor-pointer">
          <div className="mt-2 flex h-[26rem] flex-col items-center justify-center gap-2 rounded-lg border bg-white font-sans font-bold dark:bg-gray-900/80">
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
              <div className="flex flex-col items-center justify-center gap-2 p-2 text-xs">
                <ImageIcon />
                <p className="text-center">
                  {dictionary.create.garmentInputHeading}
                </p>
              </div>
            )}
          </div>
        </Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileUpload(file, setGarmentImgUrl);
            }
          }}
          id="garment"
          className="hidden"
        />

        <ImageGallery images={garmentImages} setImgUrl={setGarmentImgUrl} />

        <p className="-mb-4 mt-4 text-sm">
          {dictionary.create.garmentTypeLabel}
        </p>
        <Label htmlFor="garment_type" className="mt-2 hover:cursor-pointer">
          <Select
            defaultValue="Top"
            onValueChange={(value: "Top" | "Bottom" | "Full") =>
              setGarmentType(value)
            }
          >
            <SelectTrigger className="mt-4 w-full font-sans focus:ring-gray-300">
              <SelectValue
                placeholder="Please select a garment type"
                className="md:w-[31%]"
              />
            </SelectTrigger>
            <SelectContent className="font-sans">
              <SelectItem value="Top">
                {dictionary.create.garmentType.top}
              </SelectItem>
              <SelectItem value="Bottom">
                {dictionary.create.garmentType.bottom}
              </SelectItem>
              <SelectItem value="Full body">
                {dictionary.create.garmentType.fullBody}
              </SelectItem>
            </SelectContent>
          </Select>
        </Label>
      </div>

      {/* Replicate Generated Image Section */}
      <div className="w-full sm:max-w-80 md:w-[31%]">
        <p className="font-sans font-medium md:h-12 lg:h-auto">
          {dictionary.create.generatedImage}
        </p>

        <div className="mt-2 flex h-[26rem] flex-col items-center justify-center gap-2 rounded-lg border bg-white font-sans font-bold dark:bg-gray-900/80">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : replicateImageUrl ? (
            <Image
              unoptimized
              width={100}
              height={100}
              alt="Replicate Generated Image"
              src={replicateImageUrl}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 p-2 text-xs">
              <ImageIcon />
              <p className="text-center">
                {dictionary.create.generatedImageInputHeading}
              </p>
            </div>
          )}
        </div>

        <div className="">
          <ImageGallery images={modelImages} setImgUrl={setReplicateImageUrl} />
        </div>

        <div className="mt-4">
          <Label htmlFor="prompt" className="mb-2 block">
            {dictionary.create.stabilityPromptLabel}
          </Label>
          <Input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter image description"
            className="w-full"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="camera_angle" className="mb-2 block">
            {dictionary.create.cameraAngleLabel}
          </Label>
          <Select
            value={cameraAngle}
            onValueChange={(value: "front" | "side" | "back" | "3/4") =>
              setCameraAngle(value)
            }
          >
            <SelectTrigger className="w-full font-sans focus:ring-gray-300">
              <SelectValue placeholder="Select camera angle" />
            </SelectTrigger>
            <SelectContent className="font-sans">
              <SelectItem value="front">
                {dictionary.create.cameraAngle.front}
              </SelectItem>
              <SelectItem value="side">
                {dictionary.create.cameraAngle.side}
              </SelectItem>
              <SelectItem value="back">
                {dictionary.create.cameraAngle.back}
              </SelectItem>
              <SelectItem value="3/4">
                {dictionary.create.cameraAngle["3/4"]}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="mt-4 w-full"
          variant={"outline"}
          onClick={handleReplicateGenerate}
          disabled={isLoading || !prompt || !cameraAngle}
        >
          {isLoading
            ? dictionary.create.generatingLoader
            : dictionary.create.btn}
        </Button>
      </div>

      {/* Current Model Generated Image Section */}
      <div className="w-full sm:max-w-80 md:w-[31%]">
        <p className="font-sans font-medium md:h-12 lg:h-auto">
          {dictionary.create.generatedImage}
        </p>

        <div className="mt-2 flex h-[26rem] flex-col items-center justify-center gap-2 rounded-lg border bg-white font-sans font-bold dark:bg-gray-900/80">
          {modelImageLoader ? (
            <Skeleton className="h-full w-full" />
          ) : currentModelImageUrl ? (
            <Image
              unoptimized
              width={100}
              height={100}
              alt="Current Model Generated Image"
              src={currentModelImageUrl}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 p-2 text-xs">
              <ImageIcon />
              <p className="text-center">
                {dictionary.create.generatedImageInputHeading}
              </p>
            </div>
          )}
        </div>

        <Button
          className="mt-4 w-full"
          variant={"outline"}
          onClick={handleCurrentModelGenerate}
          disabled={
            isLoading || !garmentType || !garmentImgUrl || !replicateImageUrl
          }
        >
          {isLoading
            ? dictionary.create.generatingLoader
            : dictionary.create.btn}
        </Button>
        <Button
          className="mt-4 w-full dark:text-white"
          onClick={handleDownloadImage}
          disabled={currentModelImageUrl ? false : true}
        >
          {dictionary.create.downloadBtn}
        </Button>
      </div>
    </div>
  );
}
