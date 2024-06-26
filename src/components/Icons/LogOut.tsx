import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation

interface LogOutProps {
  size: number;
  style?: React.CSSProperties; // Optional CSS properties
}

const LogOut: React.FC<LogOutProps> = ({ size, style }) => {
  const iconStyle = {
    verticalAlign: 'middle', // Vertical alignment of the icon
    marginRight: '4px' // Space to the right of the icon
  };

  return (
    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#333', ...style }}>
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
        style={{ ...iconStyle, ...style }} // Apply styles directly to the SVG
        className="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
      >
        <path d="M14 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9" 
              stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </Link>
  );
};

export default LogOut;
