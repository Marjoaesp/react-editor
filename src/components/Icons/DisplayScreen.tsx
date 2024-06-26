import React from 'react';

interface DisplayScreenProps {
  size: number;
  style?: React.CSSProperties; // Propiedad opcional para los estilos CSS
}

const DisplayScreen: React.FC<DisplayScreenProps> = ({ size, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style} // Aplica los estilos directamente al SVG
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
    >
      <path d="M9 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1M9 12H4m8 8V9h8v11h-8Zm0 0H9m8-4a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"/>
    </svg>
  );
};

export default DisplayScreen;
