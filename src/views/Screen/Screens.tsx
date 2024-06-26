import React, { useState } from 'react';
import SidebarMartin from '../DesignEditor/components/SidebarMartin';

interface Screen {
  id: number;
  name: string;
  img: string;
}

const getScreens = (count: number): Screen[] =>
  Array.from({ length: count }, (_, k) => ({
    id: k,
    name: `Screen ${k}`,
    img: `https://picsum.photos/200/200?random=${k}`
  }));

const Screens: React.FC = () => {
  const [screens, setScreens] = useState<Screen[]>(getScreens(10));
  const [emptyScreens, setEmptyScreens] = useState<Screen[]>([]);
  const [draggedScreen, setDraggedScreen] = useState<Screen | null>(null);
  const [sourceList, setSourceList] = useState<Screen[] | null>(null);
  const [setSourceListFn, setSetSourceListFn] = useState<React.Dispatch<React.SetStateAction<Screen[]>> | null>(null);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, screen: Screen, list: Screen[], setList: React.Dispatch<React.SetStateAction<Screen[]>>) => {
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

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidebarMartin />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '50px', width: '100%', overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            background: 'lightgrey',
            padding: '8px',
            width: '50%', // Full width
            height: "30%",

            overflowX: 'auto', // Enable horizontal scrolling
            overflowY: 'hidden', // Hide vertical scrollbar
            maxHeight: '50vh', // Limit the max height of the container
          }}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, emptyScreens, setEmptyScreens)} // Empty container on top
        >
          {emptyScreens.map((screen) => (
            <div
              key={screen.id}
              draggable
              onDragStart={(e) => onDragStart(e, screen, emptyScreens, setEmptyScreens)}
              style={{
                userSelect: 'none',
                padding: '16px',
                margin: '0 8px',
                width: '200px', // Fixed width
                minWidth: '200px', // Minimum width
                backgroundColor: '#456C86',
                color: 'white',
                cursor: 'move',
                flexShrink: 0, // Prevent items from shrinking when space is limited
              }}
            >
              <img src={screen.img} alt={screen.name} style={{ width: '100%' }} />
              <div>{screen.name}</div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            background: 'lightgrey',
            padding: '8px',
            marginTop: "1%",
            width: '50%', // Full width
            height: "30%",
            overflowX: 'auto', // Enable horizontal scrolling
            overflowY: 'hidden', // Hide vertical scrollbar
             // Limit the max height of the container
          }}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, screens, setScreens)} // Full container on bottom
        >
          {screens.map((screen) => (
            <div
              key={screen.id}
              draggable
              onDragStart={(e) => onDragStart(e, screen, screens, setScreens)}
              style={{
                userSelect: 'none',
                padding: '16px',
                margin: '0 8px',
                width: '200px', // Fixed width
                minWidth: '200px', // Minimum width
                backgroundColor: '#456C86',
                color: 'white',
                cursor: 'move',
                flexShrink: 0, // Prevent items from shrinking when space is limited
              }}
            >
              <img src={screen.img} alt={screen.name} style={{ width: '100%' }} />
              <div>{screen.name}</div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Screens;
