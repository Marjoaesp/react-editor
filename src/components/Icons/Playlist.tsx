import React from 'react';

interface PlaylistProps {
  size: number;
  style?: React.CSSProperties; // Propiedad opcional para los estilos CSS
}

const Playlist: React.FC<PlaylistProps> = ({ size, style }) => {
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
      className="w-6 h-6 text-gray-800 "
      aria-hidden="true"
    >
      <path d="M19 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm0 0-4 4m5 0H4m1 0 4-4m1 4 4-4m-4 7v6l4-3-4-3Z"/>
    </svg>
  );
};

export default Playlist;
