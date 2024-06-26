import React from 'react';

interface LibreriaProps {
  size: number;
  style?: React.CSSProperties; // Propiedad opcional para los estilos CSS
}

const Libreria: React.FC<LibreriaProps> = ({ size, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      style={style} // Aplica los estilos directamente al SVG
      aria-hidden="true"
    >
      <path d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
    </svg>
  );
};

export default Libreria;
