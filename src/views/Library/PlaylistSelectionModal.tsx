import React, { useState, useEffect } from 'react';
import { Playlist, LibraryItem } from 'src/types';
import Modal from './Modal';
import { loadFromLocalStorage } from 'src/localstorageHelper';

interface PlaylistSelectionModalProps {
  libraryItem: LibraryItem;
  onClose: () => void;
  onSave: (selectedPlaylists: number[]) => void;
}

const PlaylistSelectionModal: React.FC<PlaylistSelectionModalProps> = ({ libraryItem, onClose, onSave }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<number[]>([]);

  useEffect(() => {
    const loadedPlaylists = loadFromLocalStorage('playlists') || [];
    setPlaylists(loadedPlaylists);
  }, []);

  const handleCheckboxChange = (playlistId: number) => {
    setSelectedPlaylists((prev) =>
      prev.includes(playlistId) ? prev.filter((id) => id !== playlistId) : [...prev, playlistId]
    );
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <h2 className="text-xl font-bold mb-4">Agregar a Lista de Reproducción</h2>
        <p>Seleccionar la lista de reproducción para agregar '{libraryItem.name}'</p>
        <div className="max-h-64 overflow-y-auto">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="flex items-center my-2">
              <input
                type="checkbox"
                checked={selectedPlaylists.includes(playlist.id)}
                onChange={() => handleCheckboxChange(playlist.id)}
              />
              <label className="ml-2">{playlist.name}</label>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => onSave(selectedPlaylists)}
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PlaylistSelectionModal;
