// src/components/PlaylistWrapper.tsx
import React, { useState } from 'react';
import Playlist from './Playlist';
import PlaylistManager from './PlaylistManager';
import { Playlist as PlaylistType } from './types';

const PlaylistWrapper: React.FC = () => {
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
  const [editingPlaylist, setEditingPlaylist] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    setEditingPlaylist(index);
  };

  return (
    <div>
      {playlists.map((playlist, index) => (
        <Playlist
          key={playlist.id}
          playlist={playlist}
          onEdit={handleEdit}
          index={index}
        />
      ))}
      {editingPlaylist !== null && (
        <PlaylistManager
          playlist={playlists[editingPlaylist]}
          onSave={(updated: PlaylistType) => {
            const newPlaylists = [...playlists];
            newPlaylists[editingPlaylist] = updated;
            setPlaylists(newPlaylists);
            setEditingPlaylist(null);
          }}
          onClose={() => setEditingPlaylist(null)}
        />
      )}
    </div>
  );
};

export default PlaylistWrapper;
