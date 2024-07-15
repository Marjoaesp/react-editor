import React from 'react';
import { useParams } from 'react-router-dom';
import EditPlaylist from './EditPlaylist';
import { Playlist } from 'src/types';

interface EditPlaylistRouteProps {
  playlists: Playlist[];
  onSave: (playlist: Playlist) => void;
  onClose: () => void;
}

const EditPlaylistRoute: React.FC<EditPlaylistRouteProps> = ({ playlists, onSave, onClose }) => {
  const { id } = useParams<{ id: string }>();
  const playlist = playlists.find((p) => p.id === parseInt(id || '', 10));

  return playlist ? (
    <EditPlaylist playlist={playlist} onSave={onSave} onClose={onClose} />
  ) : (
    <div>Playlist not found</div>
  );
};

export default EditPlaylistRoute;
