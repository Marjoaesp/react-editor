import React, { useState } from 'react';
import EditPlaylist from './EditPlaylist';
import SidebarMartin from '../DesignEditor/components/SidebarMartin';
import Modal from './Modal';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

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

const PlaylistManager: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistName, setPlaylistName] = useState('');
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [deletingPlaylist, setDeletingPlaylist] = useState<Playlist | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const addPlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: playlists.length + 1,
      name,
      items: [],
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const updatePlaylist = (updatedPlaylist: Playlist) => {
    setPlaylists(playlists.map((pl) => (pl.id === updatedPlaylist.id ? updatedPlaylist : pl)));
  };

  const deletePlaylist = (playlistId: number) => {
    setPlaylists(playlists.filter((pl) => pl.id !== playlistId));
    setDeletingPlaylist(null); // Close the confirmation prompt
  };

  const handleAddPlaylist = () => {
    if (playlistName) {
      addPlaylist(playlistName);
      setPlaylistName('');
      setIsCreating(false);
    }
  };

  const publishPlaylist = async (playlist: Playlist) => {
    const zip = new JSZip();
    const order = { orden: playlist.items.map(item => item.name) }; // Create order JSON

    // Add order.json to the zip file
    zip.file('order.json', JSON.stringify(order, null, 2));

    // Add items to the zip file
    for (const item of playlist.items) {
      const response = await fetch(item.dataUrl);
      const blob = await response.blob();
      zip.file(item.name, blob);
    }

    // Generate zip file and trigger download
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${playlist.name}.zip`);
  };

  return (
  <div style={{ display: "flex", height: "100vh" }}>
    <SidebarMartin/>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Playlists</h1>
      <button
        onClick={() => setIsCreating(true)}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Crear lista de reproducción
      </button>
      <div>
        {playlists.map((playlist) => (
          <div key={playlist.id} className="block my-2 p-2 border rounded hover:bg-gray-100">
            <h2 className="text-lg font-bold">{playlist.name}</h2>
            <p className="text-sm">{playlist.items.length} {playlist.items.length === 1 ? 'Item' : 'Items'}</p>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => setEditingPlaylist(playlist)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => setDeletingPlaylist(playlist)}
              >
                Eliminar
              </button>
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={() => publishPlaylist(playlist)}
              >
                Publicar
              </button>
            </div>
          </div>
        ))}
      </div>
      {isCreating && (
        <Modal onClose={() => setIsCreating(false)}>
          <div>
            <h2 className="text-xl font-bold mb-4">Crear nueva lista de reproducción</h2>
            <input
              type="text"
              placeholder="Nombre de la lista"
              className="border p-2 mb-4 w-full"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsCreating(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddPlaylist}
              >
                Crear
              </button>
            </div>
          </div>
        </Modal>
      )}
      {editingPlaylist && (
        <EditPlaylist
          playlist={editingPlaylist}
          onSave={(updated) => {
            updatePlaylist(updated);
            setEditingPlaylist(null);
          }}
          onClose={() => setEditingPlaylist(null)}
        />
      )}
      {deletingPlaylist && (
        <Modal onClose={() => setDeletingPlaylist(null)}>
          <div>
            <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar la lista de reproducción '{deletingPlaylist.name}'?</p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setDeletingPlaylist(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deletePlaylist(deletingPlaylist.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  </div>    
  );
};

export default PlaylistManager;
