// Helper function to upload file to Cloudinary
export async function uploadToCloudinary(file: File) {
  const reader = new FileReader();

  const fileToBase64 = () =>
    new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const base64String = await fileToBase64();

  const response = await fetch("/api/cloudinary/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageBlob: base64String }),
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  console.log(
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${data.publicId}`,
  );
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${data.publicId}`;
}

export async function downloadImage(
  imgUrl: string,
  imageName: string = "Model",
) {
  const image = await fetch(imgUrl);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = imageName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
