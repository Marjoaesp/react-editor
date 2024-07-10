import React, { useState, useEffect } from 'react';
import SidebarMartin from '../DesignEditor/components/SidebarMartin';
import MonitorIcon from '~/components/Icons/MonitorIcon';

interface Screen {
  id: number;
  name: string;
}

const Screens: React.FC = () => {
  const [screens, setScreens] = useState<Screen[]>([]);
  const [emptyScreens, setEmptyScreens] = useState<Screen[]>([]);
  const [draggedScreen, setDraggedScreen] = useState<Screen | null>(null);
  const [sourceList, setSourceList] = useState<Screen[] | null>(null);
  const [setSourceListFn, setSetSourceListFn] = useState<React.Dispatch<React.SetStateAction<Screen[]>> | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<{ ip: string; mac: string }>({ ip: '', mac: '' });

  useEffect(() => {
    // Fetch device information from the server
    const fetchDeviceInfo = async () => {
      try {
        const response = await fetch('http://192.168.255.55:5173/info');
        const data = await response.json();
        setDeviceInfo(data);
      } catch (error) {
        console.error('Error fetching device information:', error);
      }
    };

    fetchDeviceInfo();
  }, []);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>, 
    screen: Screen, 
    list: Screen[], 
    setList: React.Dispatch<React.SetStateAction<Screen[]>>
  ) => {
    setDraggedScreen(screen);
    setSourceList(list);
    setSetSourceListFn(() => setList); // Store the set function to update the source list later
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetList: Screen[],
    setTargetList: React.Dispatch<React.SetStateAction<Screen[]>>
  ) => {
    event.preventDefault();
    if (draggedScreen && sourceList && setSourceListFn) {
      if (sourceList !== targetList) {
        const newSourceList = sourceList.filter(s => s.id !== draggedScreen.id);
        setSourceListFn(newSourceList); // Update the source list
        setTargetList([...targetList, draggedScreen]);
      } else {
        // Move item within the same container
        const newSourceList = [...sourceList.filter(s => s.id !== draggedScreen.id), draggedScreen];
        setSourceListFn(newSourceList); // Update the same list with the item moved
      }
    }
    setDraggedScreen(null);
    setSourceList(null);
    setSetSourceListFn(null);
  };

  const addScreen = () => {
    // Add a new screen (for demonstration, we're using a placeholder name and ID)
    const newScreen: Screen = { id: screens.length, name: `Screen ${screens.length + 1}` };
    setScreens([...screens, newScreen]);
  };

  return (
    <div className="flex h-screen">
      <SidebarMartin />
      <div className="flex flex-col items-start mt-12 w-full overflow-hidden">
        <div
          className="flex flex-row items-start justify-start bg-gray-300 p-2 w-1/2 h-1/3 overflow-x-auto overflow-y-hidden max-h-[50vh]"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, emptyScreens, setEmptyScreens)}
        >
          {emptyScreens.map((screen) => (
            <div
              key={screen.id}
              draggable
              onDragStart={(e) => onDragStart(e, screen, emptyScreens, setEmptyScreens)}
              className="select-none p-4 mx-2 w-[200px] min-w-[200px] bg-[#456C86] text-white cursor-move flex-shrink-0 flex flex-col items-center"
            >
              <MonitorIcon />
              <div>{screen.name}</div>
            </div>
          ))}
        </div>
        <div
          className="flex flex-row items-start justify-start bg-gray-300 p-2 mt-1 w-1/2 h-1/3 overflow-x-auto overflow-y-hidden"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, screens, setScreens)}
        >
          {screens.map((screen) => (
            <div
              key={screen.id}
              draggable
              onDragStart={(e) => onDragStart(e, screen, screens, setScreens)}
              className="select-none p-4 mx-2 w-[200px] min-w-[200px] bg-[#456C86] text-white cursor-move flex-shrink-0 flex flex-col items-center"
            >
              <MonitorIcon />
              <div>{screen.name}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addScreen}
          className="w-[150px] h-10 bg-blue-600 text-white border border-gray-300 rounded-lg cursor-pointer ml-[23%] mt-1"
        >
          Add
        </button>
          
        <div className="mt-5 w-1/2 bg-gray-300 p-2">
          <h2>Device Information:</h2>
          <p>IP Address: {deviceInfo.ip}</p>
          <p>MAC Address: {deviceInfo.mac}</p>
        </div>
      </div>
    </div>
  );
};

export default Screens;
