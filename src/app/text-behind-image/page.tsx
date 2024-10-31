"use client"
import { useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import AuthGuard from "@/components/AuthGuard";
import TextControls from '@/components/Editor/TextControls';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Button from "@/components/Buttons/Button";
import FileUplodComponent from "@/components/FileUploadComponent";
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
        fontSize: 100,
        fontWeight: 400,
        fontFamily: 'Arial',
        opacity: 1,
        text: '',
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        resetImage();
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

    const resetImage = () => {
        setOriginalImage(null);
        setProcessedImage(null);
        setIsImageSetupDone(false);
    }

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
        setTextSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    return (
        <AuthGuard>
            {
                originalImage && processedImage && (
                    <div className="flex flex-col items-center p-4">
                        {/* <button
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
                        /> */}
                        <input 
                            className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-large cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                            id="file-input" 
                            type="file" 
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            accept=".jpg, .jpeg, .png"
                        />
                    </div>
                )
            }

            <div className="flex flex-col md:flex-row md:justify-between w-full">

                <div className="mt-4 w-full md:w-3/5">
                    {
                        !originalImage && !processedImage && (
                            <div className="flex justify-center min-h-screen">
                                <FileUplodComponent handleUpload={handleUploadImage} handleFileChange={handleFileChange} ref={fileInputRef} />
                            </div>
                        )
                    }
                    {
                        !processedImage && (
                            <div className="flex justify-center min-h-screen">
                                <ImagePlaceholder
                                    src="/path/to/image.jpg"
                                    alt="Description of image"
                                    width={400}
                                    height={300}
                                />
                            </div>
                        )
                    }
                    {originalImage && (
                        <div className="relative w-full h-64 md:h-96 overflow-hidden">
                            {/* Original Image */}
                            <img
                                src={originalImage}
                                alt="Original"
                                className="absolute inset-0 w-full h-full object-contain rounded"
                            />

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
                                <img
                                    src={processedImage}
                                    alt="Processed"
                                    className="absolute inset-0 w-full h-full object-contain rounded"
                                />
                            )}
                        </div>
                    )}
                </div>
                {/* Controls for positioning the text */}
                <div className="flex flex-col w-full md:w-2/5">

                    <div className="flex flex-col items-center">
                        <Button text="Add Text" customClass="w-60 mt-4 rounded-large" />
                    </div>
                    {
                        processedImage && (
                            <TextControls textSet={textSettings} onTextChange={handleTextChange} />
                        )
                    }
                    <div className="flex flex-col items-center">
                        <Button text="Download" customClass="w-60 mt-4 rounded-large" />
                    </div>
                </div>

            </div>
        </AuthGuard>
    );
}
