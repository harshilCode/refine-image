import React, { useState } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect(file); // Pass the file to the parent component
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelect(file); // Pass the file to the parent component
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
      <h2 className="text-lg font-semibold mb-2">Upload Your Image From Your System</h2>
      <p className="text-sm text-gray-500 mb-6">Show Your Brand Transparency With Image!</p>
      <div
        className={`border-2 border-dashed rounded-md p-6 cursor-pointer ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center space-y-2"
        >
          <svg
            className="w-12 h-12 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16V8a2 2 0 012-2h6a2 2 0 012 2v8M5 12h14m-7 5v-3m0 0l3-3m-3 3l-3-3"
            ></path>
          </svg>
          <p className="text-blue-600 underline">Click To Upload</p>
          <p className="text-gray-500">Or Drag And Drop</p>
          <p className="text-xs text-gray-400">Max File Size: 15 MB</p>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
