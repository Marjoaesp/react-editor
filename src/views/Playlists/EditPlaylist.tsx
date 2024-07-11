import React, { useState } from 'react';

interface PlaylistItem {
  type: 'image' | 'video';
  name: string;
  dataUrl: string;
}

interface Playlist {
  id: number;
  name: string;
  items: PlaylistItem[];
}

interface EditPlaylistProps {
  playlist: Playlist;
  onSave: (updated: Playlist) => void;
  onClose: () => void;
}

const EditPlaylist: React.FC<EditPlaylistProps> = ({ playlist, onSave, onClose }) => {
  const [items, setItems] = useState<PlaylistItem[]>(playlist.items);

  const addItem = (type: 'image' | 'video', file: File) => {
    if (!file) {
      alert("Debe seleccionar un archivo para añadir.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newItem: PlaylistItem = { type, name: file.name, dataUrl };
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
    const updatedPlaylist = { ...playlist, items };
    onSave(updatedPlaylist);
  };


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div id="edit-modal" className="bg-white p-4 rounded shadow-lg w-full max-w-4xl overflow-hidden h-3/4">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Editar lista de reproducción</h2>
          <h2 className="text-xl font-bold">Añadir nuevo elemento</h2>
        </div>
        <div className="flex justify-between h-full">
          <div id="edit-playlist-items" className="space-y-4 w-3/4 pr-4 overflow-y-auto border-r border-gray-300">
            {items.map((item, index) => (
              <div key={index} className="flex items-center bg-gray-100 p-2 rounded mb-2 relative">
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm">Tipo: {item.type === 'image' ? 'Imagen' : 'Video'}</p>
                  <img src={item.dataUrl} alt={item.name} className="w-20 h-20 object-cover mt-2"/>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-blue-500 text-white p-2 rounded" onClick={() => moveItem(index, -1)} disabled={index === 0}>
                    Subir
                  </button>
                  <button className="bg-blue-500 text-white p-2 rounded" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1}>
                    Bajar
                  </button>
                  <button className="bg-red-500 text-white p-2 rounded" onClick={() => removeItem(index)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div id="file-upload-section" className="flex flex-col items-start w-1/2 pl-4">
            <h3 className="text-lg font-bold mb-2">Añadir nuevo elemento</h3>
            <div className="flex flex-col space-y-2">
              <input
                type="file"
                id="file-upload"
                className="border p-2 mb-4 w-full"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    addItem(file.type.startsWith('image') ? 'image' : 'video', file);
                  }
                }}
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPlaylist;
