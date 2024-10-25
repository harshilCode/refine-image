"use client"
import { useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import AuthGuard from "@/components/AuthGuard";

export default function Dashboard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          const imageUrl = URL.createObjectURL(file);
          reader.onload = async () => {
              setOriginalImage(reader.result as string);
              await setupImage(imageUrl);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleUploadImage = () => {
      fileInputRef.current?.click();
  };

  const setupImage = async (imageUrl: string) => {
    try {
        const imageBlob = await removeBackground(imageUrl);
        const url = URL.createObjectURL(imageBlob);
        setProcessedImage(url);
        setIsImageSetupDone(true);
    } catch (error) {
        console.error(error);
    }
  };
 
  return (
    <AuthGuard>
<div className="flex flex-col items-center p-4">
          <button
              onClick={handleUploadImage}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 focus:outline-none"
          >
              Upload Image
          </button>
          <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png"
          />
          <div className="flex flex-wrap justify-center mt-4 space-x-4">
              {originalImage && (
                  <div className="w-full md:w-1/2 p-2">
                      <img src={originalImage} alt="Original" className="w-full h-auto rounded shadow" />
                      <p className="text-center mt-2">Original Image</p>
                  </div>
              )}
              {(processedImage && isImageSetupDone) && (
                  <div className="w-full md:w-1/2 p-2">
                      <img src={processedImage} alt="Processed" className="w-full h-auto rounded shadow" />
                      <p className="text-center mt-2">Processed Image</p>
                  </div>
              )}
          </div>
      </div>
    </AuthGuard>
  );
}
