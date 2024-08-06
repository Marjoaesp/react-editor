import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DesignEditor from '~/views/DesignEditor';
import Login from '~/views/Login';
import Register from './views/Register';
import Screens from './views/Screen';
import Getinfo from './views/Getinfo';
import Library from './views/Library';
import SidebarMartin from "~/views/DesignEditor";
import EditPlaylistRoute from './views/Playlists/EditPlaylistRoute';
import PlaylistWrapper from './views/Playlists/PlaylistWrapper';
import { saveToLocalStorage, loadFromLocalStorage } from './localstorageHelper';
import { LibraryItem, Playlist } from './types';

const Router: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>(loadFromLocalStorage('playlists') || []);

  useEffect(() => {
    saveToLocalStorage('playlists', playlists);
  }, [playlists]);

  const handleSavePlaylist = (updatedPlaylist: Playlist) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) =>
        playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist
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
        <Route path="/Biblioteca" element={<Library />} />
        <Route path="/EditPlaylist/:id" element={<EditPlaylistRoute playlists={playlists} onSave={handleSavePlaylist} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />} />

        <Route path="/" element={<DesignEditor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;