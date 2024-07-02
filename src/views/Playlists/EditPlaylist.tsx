// src/components/EditPlaylist.tsx
import React, { useState } from 'react';
import { Playlist, PlaylistItem } from './types';

interface EditPlaylistProps {
  playlist: Playlist;
  onClose: () => void;
  onSave: (updated: Playlist) => void;
}

const EditPlaylist: React.FC<EditPlaylistProps> = ({ playlist, onClose, onSave }) => {
  const [items, setItems] = useState<PlaylistItem[]>(playlist.items);

  const addItem = (type: 'image' | 'video', file: File | null, duration: string) => {
    if (!file) {
      alert("Debe seleccionar un archivo para añadir.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newItem: PlaylistItem = { type, name: file.name, duration, dataUrl };
      setItems([...items, newItem]);
    };
    reader.readAsDataURL(file);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const moveItem = (index: number, direction: number) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(index, 1);
    newItems.splice(index + direction, 0, movedItem);
    setItems(newItems);
  };

  const handleSave = () => {
    const updatedPlaylist: Playlist = { ...playlist, items };
    onSave(updatedPlaylist);
  };



  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div id="edit-modal" className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Edit Playlist - {playlist.name}</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="flex items-center justify-between p-2 border-b">
              <span>{item.type}: {item.name}</span>
              <span>{item.duration}</span>
              <div className="flex space-x-2">
                <button className="bg-gray-500 text-white p-1 rounded" onClick={() => moveItem(index, -1)} disabled={index === 0}>Up</button>
                <button className="bg-gray-500 text-white p-1 rounded" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1}>Down</button>
                <button className="bg-red-500 text-white p-1 rounded" onClick={() => removeItem(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input type="file" id="fileInput" className="mb-2" />
          <input type="text" placeholder="Duration (HH:MM:SS)" id="durationInput" className="border p-2 mb-2 w-full" />
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => addItem('image',(document.getElementById('fileInput') as HTMLInputElement)?.files?.[0] ?? null,
                (document.getElementById('durationInput') as HTMLInputElement).value)}>
                Add Image
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => addItem('video',(document.getElementById('fileInput') as HTMLInputElement)?.files?.[0] ?? null,
                (document.getElementById('durationInput') as HTMLInputElement).value)}>
                Add Video
                </button>
            </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditPlaylist;
