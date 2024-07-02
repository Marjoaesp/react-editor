// src/components/Playlist.tsx
import React from 'react';
import { Playlist as PlaylistType } from './types';

interface PlaylistProps {
  playlist: PlaylistType;
  onEdit: (index: number) => void;
  index: number;
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, onEdit, index }) => {
  return (
    <div className="playlist">
      <h2>{playlist.name}</h2>
      <button onClick={() => onEdit(index)}>Edit</button>
      {/* Render playlist items or other details here */}
    </div>
  );
};

export default Playlist;
