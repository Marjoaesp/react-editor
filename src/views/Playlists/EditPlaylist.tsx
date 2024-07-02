import React, { useState } from 'react';
import { Playlist, PlaylistItem } from './types'; // Import types

interface EditPlaylistProps {
  playlist: Playlist;
  onSave: (updated: Playlist) => void;
  onClose: () => void;
}

const EditPlaylist: React.FC<EditPlaylistProps> = ({ playlist, onSave, onClose }) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemFile, setNewItemFile] = useState<File | null>(null);
  const [newItemType, setNewItemType] = useState<'image' | 'video'>('image');
  const [updatedPlaylist, setUpdatedPlaylist] = useState<Playlist>(playlist);

  const handleAddItem = async () => {
    if (!newItemFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newItem: PlaylistItem = {
        name: newItemName,
        type: newItemType,
        dataUrl: e.target?.result as string,
      };

      const newItems = [...updatedPlaylist.items, newItem];
      setUpdatedPlaylist({ ...updatedPlaylist, items: newItems });
      setNewItemName('');
      setNewItemFile(null); // Clear the file input after adding
    };

    reader.readAsDataURL(newItemFile);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = updatedPlaylist.items.filter((_, i) => i !== index);
    setUpdatedPlaylist({ ...updatedPlaylist, items: newItems });
  };

  const moveItem = (currentIndex: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newItems = [...updatedPlaylist.items];

    // Swap items in the array
    [newItems[currentIndex], newItems[newIndex]] = [newItems[newIndex], newItems[currentIndex]];

    setUpdatedPlaylist({ ...updatedPlaylist, items: newItems });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-5xl flex">
        {/* Left Column - List of Items */}
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-bold mb-4">Elementos en la lista</h2>
          {updatedPlaylist.items.length === 0 && <p>No hay elementos en la lista.</p>}
          {updatedPlaylist.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-2 border p-2 rounded">
              <div className="flex items-center">
                <img
                  src={item.dataUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.type === 'image' ? 'Imagen' : 'Video'}</p>
                </div>
              </div>
              <div>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  disabled={index === 0}
                  onClick={() => moveItem(index, 'up')}
                >
                ▲
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  disabled={index === updatedPlaylist.items.length - 1}
                  onClick={() => moveItem(index, 'down')}
                >
                ▼
                </button>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleRemoveItem(index)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {/* Right Column - Add New Item */}
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-bold mb-4">Agregar nuevo elemento</h2>
          <div>
            <label className="block mb-2">Nombre del nuevo elemento</label>
            <input
              type="text"
              className="border p-2 mb-4 w-full"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <label className="block mb-2">Tipo de elemento</label>
            <select
              className="border p-2 mb-4 w-full"
              value={newItemType}
              onChange={(e) => setNewItemType(e.target.value as 'image' | 'video')}
            >
              <option value="image">Imagen</option>
              <option value="video">Video</option>
            </select>
            <label className="block mb-2">Archivo</label>
            <input
              type="file"
              className="border p-2 mb-4 w-full"
              onChange={(e) => setNewItemFile(e.target.files ? e.target.files[0] : null)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
              onClick={handleAddItem}
            >
              {newItemType === 'image' ? 'Agregar imagen' : 'Agregar video'}
            </button>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => onSave(updatedPlaylist)}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlaylist;
