"use client"
import { useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import AuthGuard from "@/components/AuthGuard";
import TextControls from '../../components/Editor/TextControls';

export default function TextBehindImage() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [textSettings, setTextSettings] = useState({
        top: 0,
        left: 0,
        rotation: 0,
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        opacity: 1,
        text: '',
    });

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

    const handleTextChange = (key: string, value: number | string) => {
        console.log(key, value);
        setTextSettings((prevSettings) => ({
          ...prevSettings,
          [key]: value,
        }));
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
            </div>
            {/* Input for the text */}
            <input
                type="text"
                value={textSettings.text}
                onChange={(e) => setTextSettings({ ...textSettings, text: e.target.value })}
                placeholder="Enter text to overlay"
                className="mt-4 p-2 border border-gray-300 rounded"
            />

            {/* Controls for positioning the text */}
            <TextControls textSet={textSettings} onTextChange={handleTextChange} />

            <div className="flex justify-center mt-4">
                {originalImage && (
                    <div className="relative w-full md:w-1/2 p-2">
                        {/* Original Image */}
                        <img
                            src={originalImage}
                            alt="Original"
                            className="w-full h-auto rounded shadow"
                        />
                        {/* <p className="text-center mt-2">Original Image</p> */}

                        {/* Text Layer */}
                        {textSettings.text && (
                            <div
                                className="absolute pointer-events-none"
                                style={{
                                    top: `${50 - textSettings.top}%`,
                                    left: `${textSettings.left + 50}%`,
                                    transform: `translate(-50%, -50%) rotate(${textSettings.rotation}deg)`,
                                    color: textSettings.color,
                                    textAlign: 'center',
                                    fontSize: `${textSettings.fontSize}px`,
                                    fontWeight: textSettings.fontWeight,
                                    fontFamily: textSettings.fontFamily,
                                    opacity: textSettings.opacity,
                                }}
                            >
                                <p className="text-4xl font-bold text-white" style={{ fontSize: `${textSettings.fontSize}px`, color: textSettings.color, fontWeight: textSettings.fontWeight, }}>
                                    {textSettings.text}
                                </p>
                            </div>
                        )}

                        {/* Processed Image - Positioned on top of the Original Image */}
                        {(processedImage && isImageSetupDone) && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={processedImage}
                                    alt="Processed"
                                    className="w-full h-auto rounded shadow"
                                />
                                {/* <p className="absolute bottom-0 left-0 right-0 text-center mt-2 bg-white bg-opacity-50">
                                    Processed Image
                                </p> */}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AuthGuard>
    );
}
