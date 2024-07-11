import React, { useState } from 'react';

interface LibraryItem {
  id: number;
  name: string;
  dataUrl: string;
}

const Library: React.FC = () => {
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([
    // Add some sample items for demonstration
    { id: 1, name: 'Image 1', dataUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Image 2', dataUrl: 'https://via.placeholder.com/150' },
  ]);

  const addToPlaylist = (item: LibraryItem) => {
    // Logic to add the item to a playlist (can use context or props to pass the function)
    console.log(`Adding ${item.name} to playlist`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Library</h1>
      <div className="grid grid-cols-4 gap-4">
        {libraryItems.map((item) => (
          <div key={item.id} className="border rounded p-2">
            <img src={item.dataUrl} alt={item.name} className="w-full h-auto mb-2" />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => addToPlaylist(item)}
            >
              Add to Playlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
