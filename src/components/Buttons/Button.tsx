import React from 'react';

interface ButtonProps {
  text: string;
  color?: string; // Background color for the button
  textColor?: string; // Text color for the button text
}

const Button: React.FC<ButtonProps> = ({ text, color = 'black', textColor = 'white' }) => {
  // Handle black color with hard-coded dark mode classes
  const backgroundColorClass = color === 'black' ? 'bg-black dark:bg-gray-800' : `bg-${color}-600`;
  const hoverColorClass = color === 'black' ? 'hover:bg-gray-700 dark:hover:bg-gray-600' : `hover:bg-${color}-500`;
  const focusOutlineClass = color === 'black' ? 'focus-visible:outline-gray-800 dark:focus-visible:outline-gray-600' : `focus-visible:outline-${color}-600`;
  const textColorClass = textColor === 'white' ? 'text-white' : `text-${textColor}`;

  return (
    <button
      type="button"
      className={`rounded-full ${backgroundColorClass} ${textColorClass} px-4 py-2.5 text-sm font-semibold shadow-sm ${hoverColorClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${focusOutlineClass}`}
    >
      {text}
    </button>
  );
};

export default Button;
