import React, { useState, useEffect, useRef } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from 'src/localstorageHelper';
import SidebarMartin from '../DesignEditor/components/SidebarMartin';
import { LibraryItem, Playlist } from 'src/types';
import PlaylistSelectionModal from './PlaylistSelectionModal';

const Library: React.FC = () => {
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>(loadFromLocalStorage('libraryItems') || []);
  const [selectedLibraryItem, setSelectedLibraryItem] = useState<LibraryItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    saveToLocalStorage('libraryItems', libraryItems);
  }, [libraryItems]);

  const addLibraryItem = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const type = file.type.startsWith('image') ? 'image' : 'video'; // Determine the type based on the file type
      const newItem: LibraryItem = { id: Date.now(), name: file.name, dataUrl, type };
      setLibraryItems([...libraryItems, newItem]);
    };
    reader.readAsDataURL(file);
  };

  const removeLibraryItem = (id: number) => {
    setLibraryItems(libraryItems.filter(item => item.id !== id));
  };

  const addToPlaylists = (selectedPlaylists: number[]) => {
    const updatedPlaylists: Playlist[] = loadFromLocalStorage('playlists') || [];
    updatedPlaylists.forEach((playlist) => {
      if (selectedPlaylists.includes(playlist.id)) {
        // Add the item to the playlist
        playlist.items.push({
          ...selectedLibraryItem!,
          type: selectedLibraryItem!.type, // Ensure the type is included
        });
      }
    });
    saveToLocalStorage('playlists', updatedPlaylists);
    setSelectedLibraryItem(null);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      addLibraryItem(file);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SidebarMartin />
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Library</h1>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          + Añadir archivos
        </button>
        <div className="grid grid-cols-4 gap-4">
          {libraryItems.map((item) => (
            <div key={item.id} className="border rounded p-2">
              <img src={item.dataUrl} alt={item.name} className="w-full h-auto mb-2" />
              <h2 className="text-lg font-semibold truncate">{item.name}</h2>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={() => setSelectedLibraryItem(item)}
                >
                  Añadir a Playlist
                </button>
                <button
                  className="bg-red-500 text-white w-6 h-6 rounded mt-2"
                  onClick={() => removeLibraryItem(item.id)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedLibraryItem && (
        <PlaylistSelectionModal
          libraryItem={selectedLibraryItem}
          onClose={() => setSelectedLibraryItem(null)}
          onSave={addToPlaylists}
        />
      )}
    </div>
  );
};

export default Library;
