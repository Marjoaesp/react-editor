import React, { useState, useEffect } from 'react';
import SidebarMartin from '../DesignEditor/components/SidebarMartin';
import Modal from './Modal'; // Assume you have a modal component
import { saveToLocalStorage, loadFromLocalStorage } from 'src/localstorageHelper'

interface LibraryItem {
  id: number;
  name: string;
  dataUrl: string;
}

interface Playlist {
  id: number;
  name: string;
  items: LibraryItem[];
}

interface LibraryProps {
  playlists: Playlist[];
  onAddToPlaylist: (item: LibraryItem, playlistId: number) => void;
}

const Library: React.FC<LibraryProps> = ({ playlists, onAddToPlaylist }) => {
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>(loadFromLocalStorage('libraryItems') || []);

  useEffect(() => {
    saveToLocalStorage('libraryItems', libraryItems);
  }, [libraryItems]);

  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  const addItem = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newItem: LibraryItem = { id: libraryItems.length + 1, name: file.name, dataUrl };
      setLibraryItems([...libraryItems, newItem]);
    };
    reader.readAsDataURL(file);
  };

  const removeItem = (id: number) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      setLibraryItems(libraryItems.filter((item) => item.id !== id));
    }
  };

  const handleAddToPlaylist = (item: LibraryItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleSelectPlaylist = (playlistId: number) => {
    if (selectedItem) {
      onAddToPlaylist(selectedItem, playlistId);
      setShowModal(false);
      setSelectedItem(null);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidebarMartin />
      <div className="p-4 flex-1">
        <h1 className="text-2xl font-bold mb-4">Library</h1>
        <div className="mb-4">
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) addItem(file);
            }}
            className="border p-2"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {libraryItems.map((item) => (
            <div key={item.id} className="border rounded p-2">
              <img src={item.dataUrl} alt={item.name} className="w-36 h-36 object-cover mb-2" />
              <h2 className="text-lg font-semibold">
                {item.name.length > 15 ? `${item.name.slice(0, 12)}...` : item.name}
              </h2>
              <button
                className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center mt-2"
                onClick={() => removeItem(item.id)}
              >
                X
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
                onClick={() => handleAddToPlaylist(item)}
              >
                Add to Playlist
              </button>
            </div>
          ))}
        </div>
        {showModal && selectedItem && (
          <Modal onClose={() => setShowModal(false)}>
            <h2 className="text-xl font-bold mb-4">Select Playlist</h2>
            <div className="flex flex-col space-y-2">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleSelectPlaylist(playlist.id)}
                >
                  {playlist.name}
                </button>
              ))}
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Library;
