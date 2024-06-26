import React from 'react';

interface EmailProps {
  size: number;
  style?: React.CSSProperties;
}

const Email: React.FC<EmailProps> = ({ size, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      strokeWidth="3"
      stroke="#d1d1d1"
      fill="none"
      style={style}
      aria-hidden="true"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <circle cx="32" cy="18.14" r="11.14"></circle>
        <path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"></path>
      </g>
    </svg>
  );
};

export default Email;
