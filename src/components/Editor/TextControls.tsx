import React from 'react';

interface TextControlsProps {
  textSet: {
    top: number;
    left: number;
    rotation: number;
    color: string;
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
    opacity: number;
  };
  onTextChange: (key: string, value: number | string) => void;
}

const TextControls: React.FC<TextControlsProps> = ({ textSet, onTextChange }) => {
  return (
    <div className="mt-4 flex flex-col space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">X Position (Horizontal)</label>
        <input
          type="range"
          min="-50"
          max="50"
          value={textSet.left}
          onChange={(e) => onTextChange('left', Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Y Position (Vertical)</label>
        <input
          type="range"
          min="-50"
          max="50"
          value={textSet.top}
          onChange={(e) => onTextChange('top', Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Rotation (Degrees)</label>
        <input
          type="range"
          min="0"
          max="360"
          value={textSet.rotation}
          onChange={(e) => onTextChange('rotation', Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Font Size (px)</label>
        <input
          type="number"
          min="10"
          max="1000"
          value={textSet.fontSize}
          onChange={(e) => onTextChange('fontSize', Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Font Weight</label>
        <select
          value={textSet.fontWeight}
          onChange={(e) => onTextChange('fontWeight', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="bolder">Bolder</option>
          <option value="lighter">Lighter</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Font Family</label>
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
        <label className="block text-sm font-medium mb-1">Text Color</label>
        <input
          type="color"
          value={textSet.color}
          onChange={(e) => onTextChange('color', e.target.value)}
          className="w-20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Opacity</label>
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
    </div>
  );
};

export default TextControls;
