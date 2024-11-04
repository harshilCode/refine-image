"use client"
import { useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import AuthGuard from "@/components/AuthGuard";
import TextControls from '@/components/Editor/TextControls';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Button from "@/components/Buttons/Button";
import FileUpload from "@/components/FileUpload";
export default function TextBehindImage() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [expandedAccordions, setExpandedAccordions] = useState<boolean[]>([]);

    const toggleAccordion = (index: number) => {
        console.log(index);
        setExpandedAccordions((prev) => {
            const newExpanded = [...prev];
            newExpanded[index] = !newExpanded[index];
            return newExpanded;
        });
    };
    const [textSettings, setTextSettings] = useState<Array<{
        top: number;
        left: number;
        rotation: number;
        color: string;
        fontSize: number;
        fontWeight: number;
        fontFamily: string;
        opacity: number;
        text: string;
    }>>([]);

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

    // const handleUploadImage = () => {
    //     fileInputRef.current?.click();
    // };

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

    const handleTextChange = (index: number, key: string, value: number | string) => {
        setTextSettings((prevSettings) => {
            const newSettings = [...prevSettings];
            newSettings[index] = {
                ...newSettings[index],
                [key]: value,
            };
            return newSettings;
        });
    };

    const handleAddText = () => {
        setTextSettings((prevSettings) => [
            ...prevSettings,
            {
                top: 0,
                left: 0,
                rotation: 0,
                color: '#ffffff',
                fontSize: 100,
                fontWeight: 400,
                fontFamily: 'Arial',
                opacity: 1,
                text: '',
            },
        ]);
    };

    return (
        <AuthGuard>
            {
                originalImage && processedImage && (
                    <div className="flex flex-col items-center p-4">
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
                            <div className="flex justify-center">
                                <FileUpload handleFileChange={handleFileChange} ref={fileInputRef} />
                            </div>
                        )
                    }
                    {
                        originalImage && !processedImage && (
                            <div className="flex justify-center min-h-screen">
                                <ImagePlaceholder />
                            </div>
                        )
                    }
                    {originalImage && processedImage && (
                        <div className="relative w-full h-64 md:h-96 overflow-hidden">
                            {/* Original Image */}
                            <img
                                src={originalImage}
                                alt="Original"
                                className="absolute inset-0 w-full h-full object-contain rounded"
                            />

                            {/* Text Layer */}
                            {textSettings.map((settings, index) => (
                                settings.text && (
                                    <div
                                        key={index}
                                        className="absolute pointer-events-none"
                                        style={{
                                            top: `${50 - settings.top}%`,
                                            left: `${settings.left + 50}%`,
                                            transform: `translate(-50%, -50%) rotate(${settings.rotation}deg)`,
                                            color: settings.color,
                                            textAlign: 'center',
                                            fontSize: `${settings.fontSize}px`,
                                            fontWeight: settings.fontWeight,
                                            fontFamily: settings.fontFamily,
                                            opacity: settings.opacity,
                                        }}
                                    >
                                        <p className="text-4xl font-bold text-white" style={{ fontSize: `${settings.fontSize}px`, color: settings.color, fontWeight: settings.fontWeight, }}>
                                            {settings.text}
                                        </p>
                                    </div>
                                )
                            ))}

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
                        <Button text="Add Text" customClass="w-60 mt-4 rounded-large" onClick={handleAddText} />
                    </div>
                    {processedImage && textSettings.map((settings, index) => (
                        <div key={index} id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                            <h2 id="accordion-flush-heading-1">
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                                    data-accordion-target={`#accordion-body-${index}`}
                                    aria-expanded={expandedAccordions[index] || false}
                                    aria-controls="accordion-flush-body-1"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span>Text {index + 1}</span>
                                    <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                    </svg>
                                </button>
                            </h2>
                            <div id={`accordion-body-${index}`} className={`${expandedAccordions[index] ? 'block' : 'hidden'}`} aria-labelledby="accordion-flush-heading-1">
                                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                                    <TextControls textSet={settings} onTextChange={(key, value) => handleTextChange(index, key, value)} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-col items-center">
                        <Button text="Download" customClass="w-60 mt-4 rounded-large" />
                    </div>
                </div>

            </div>
        </AuthGuard>
    );
}
