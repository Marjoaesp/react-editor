import React, { useState, useEffect } from "react";
import Icons from "~/components/Icons";

const MyComponent: React.FC = () => {
  const zoomMin = 10;
  const zoomMax = 240;
  const [options, setOptions] = useState<{ zoomRatio: number }>({
    zoomRatio: 20,
  });

  const handleChange = (value: number) => {
    if (value < 0) {
      setOptions({ ...options, zoomRatio: zoomMin });
    } else if (value > zoomMax) {
      setOptions({ ...options, zoomRatio: zoomMax });
    } else {
      setOptions({ ...options, zoomRatio: value });
    }
  };

  useEffect(() => {
    // Handle zoom effect if needed
  }, [options.zoomRatio]);

  return (
    <div className="h-16 bg-white flex justify-between items-center">
      <div className="flex">
        {/* Example button with icon */}
        <button
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={() => handleChange(options.zoomRatio - 20)}
        >
          <Icons.RemoveCircleOutline size={24} />
        </button>
      </div>
      <div className="flex items-center justify-center">
        {/* Example button with icon */}
        <button
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={() => handleChange(options.zoomRatio + 20)}
        >
          <Icons.AddCircleOutline size={24} />
        </button>
        {/* Example input */}
        <input
          type="number"
          value={options.zoomRatio}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="w-24 px-2 py-1 border rounded-md"
          min={zoomMin}
          max={zoomMax}
        />
      </div>
      <div className="flex items-center justify-end">
        {/* Example button with icon */}
        <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
          <Icons.Refresh size={16} />
        </button>
        {/* Example button with icon */}
        <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
          <Icons.Undo size={22} />
        </button>
        {/* Example button with icon */}
        <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
          <Icons.Redo size={22} />
        </button>
        {/* Example button with icon */}
        <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
          <Icons.TimePast size={16} />
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
