import React from 'react';

interface TextControlsProps {
  textSet: {
    top: number;
    left: number;
    rotation: number;
    color: string;
    fontSize: number;
    fontWeight: number;
    fontFamily: string;
    opacity: number;
    text: string;
  };
  onTextChange: (key: string, value: number | string) => void;
}

const TextControls: React.FC<TextControlsProps> = ({ textSet, onTextChange }) => {
  return (
    <div className="mt-4 flex flex-col space-y-8 px-8">
      <div className="mb-6">
        <input
          type="text"
          id="text-input"
          value={textSet.text}
          onChange={(e) => onTextChange('text', e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Font Family</label>
        <select
          value={textSet.fontFamily}
          onChange={(e) => onTextChange('fontFamily', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Text Color</label>
        <input
          type="color"
          value={textSet.color}
          onChange={(e) => onTextChange('color', e.target.value)}
          className="w-20"
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label htmlFor="font-size" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Font Size</label>
          <p className="text-sm text-gray-500 dark:text-gray-400">{textSet.fontSize} px</p>
        </div>
        <input
          id="font-size"
          type="range"
          min="10"
          max="1000"
          value={textSet.fontSize}
          onChange={(e) => onTextChange('fontSize', Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-large appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label htmlFor="font-weight" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Font Weight</label>
          <p className="text-sm text-gray-500 dark:text-gray-400">{textSet.fontWeight}</p>
        </div>
        <input
          id="font-weight"
          type="range"
          min="100"
          max="900"
          step="100"
          value={textSet.fontWeight}
          onChange={(e) => onTextChange('fontWeight', e.target.value)}
          className="w-full h-2 bg-gray-300 rounded-large appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label className="block text-sm font-bold mb-1">Opacity</label>
          <p className="text-sm text-gray-500 dark:text-gray-400">{textSet.opacity}</p>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={textSet.opacity}
          onChange={(e) => onTextChange('opacity', Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="relative mb-6">
        <div className="flex justify-between">
          <label htmlFor="x-position" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">X Position (Horizontal)</label>
          <p className="text-sm text-gray-500 dark:text-gray-400">{textSet.left}</p>
        </div>
        <input
          id="x-position"
          type="range"
          min="-50"
          max="50"
          value={textSet.left}
          onChange={(e) => onTextChange('left', Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-large appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <div className="relative mb-6">
        <div className="flex justify-between">
          <label htmlFor="y-position" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Y Position (Vertical)</label>
          <p className="text-sm text-gray-500 dark:text-gray-400">{textSet.top}</p>
        </div>
        <input
          id="y-position"
          type="range"
          min="-50"
          max="50"
          value={textSet.top}
          onChange={(e) => onTextChange('top', Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-large appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label htmlFor="rotation" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Rotation</label>
          <p className="text-sm text-gray-500 dark:text-gray-400">{textSet.rotation}°</p>
        </div>
        <input
          id="rotation"
          type="range"
          min="0"
          max="360"
          value={textSet.rotation}
          onChange={(e) => onTextChange('rotation', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-large appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
    </div>
  );
};

export default TextControls;
