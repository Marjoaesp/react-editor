// Library.tsx
import React, { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from 'src/localstorageHelper';
import SidebarMartin from '../DesignEditor/components/SidebarMartin';
import { LibraryItem } from 'src/types';

const Library: React.FC = () => {
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>(loadFromLocalStorage('libraryItems') || []);

  useEffect(() => {
    saveToLocalStorage('libraryItems', libraryItems);
  }, [libraryItems]);

  const addLibraryItem = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newItem: LibraryItem = { id: Date.now(), name: file.name, dataUrl };
      setLibraryItems([...libraryItems, newItem]);
    };
    reader.readAsDataURL(file);
  };

  const removeLibraryItem = (id: number) => {
    setLibraryItems(libraryItems.filter(item => item.id !== id));
  };

  return (
    <div className="p-4" style={{ display: "flex", height: "100vh" }}>
      <SidebarMartin />
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Library</h1>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              addLibraryItem(file);
            }
          }}
          className="border p-2 mb-4"
        />
        <div className="grid grid-cols-4 gap-4">
          {libraryItems.map((item) => (
            <div key={item.id} className="border rounded p-2">
              <img src={item.dataUrl} alt={item.name} className="w-full h-auto mb-2" />
              <h2 className="text-lg font-semibold truncate">{item.name}</h2>
              <button
                className="bg-red-500 text-white w-6 h-6 rounded mt-2"
                onClick={() => removeLibraryItem(item.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
