import React, { useState, useEffect  } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DesignEditor from '~/views/DesignEditor';
import Login from '~/views/Login';
import Register from './views/Register';
import Screens from './views/Screen';
import Getinfo from './views/Getinfo';
import Library from './views/Library';
import { EditPlaylist, Modal } from './views/Playlists';
import PlaylistWrapper from './views/Playlists/PlaylistWrapper';
import SidebarMartin from "~/views/DesignEditor";
import { saveToLocalStorage, loadFromLocalStorage } from './localstorageHelper';

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

const Router: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>(loadFromLocalStorage('playlists') || []);

  useEffect(() => {
    saveToLocalStorage('playlists', playlists);
  }, [playlists]);

  const handleAddToPlaylist = (item: LibraryItem, playlistId: number) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId ? { ...playlist, items: [...playlist.items, item] } : playlist
      )
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Screens" element={<Screens />} />
        <Route path="/Playlist" element={<PlaylistWrapper />} />
        <Route path="/Biblioteca" element={<Library playlists={playlists} onAddToPlaylist={handleAddToPlaylist} />} />
        <Route path="/" element={<DesignEditor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
