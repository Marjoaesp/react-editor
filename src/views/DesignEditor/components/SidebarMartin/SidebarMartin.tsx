import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import DisplayScreen from '~/components/Icons/DisplayScreen';
import Playlist from '~/components/Icons/Playlist';
import Libreria from '~/components/Icons/Libreria';
import UserProfile from './Components';
import Scissors from '~/components/Icons/Scissors';
import LogOut from '~/components/Icons/LogOut';
const SidebarMartin = () => {
  const iconStyle = { marginRight: '8px', verticalAlign: 'middle', width: '24px', height: '24px' }; // Estilo para los íconos

  return (
    <Sidebar>
      <UserProfile username="Martin Parisi"  />

      <div style={{marginTop: "10%"}}>
      <Menu>
        
        <MenuItem>
          <Link to="/Screens" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#333' }}>
            <DisplayScreen size={24} style={iconStyle} />
            <span style={{ marginLeft: '4px', lineHeight: '24px', verticalAlign: 'middle' }}>Pantallas</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/playlist" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#333' }}>
            <Playlist size={24} style={iconStyle} />
            <span style={{ marginLeft: '4px', lineHeight: '24px', verticalAlign: 'middle' }}>Playlist</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/biblioteca" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#333' }}>
            <Libreria size={24} style={iconStyle} />
            <span style={{ marginLeft: '4px', lineHeight: '24px', verticalAlign: 'middle' }}>Biblioteca</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#333' }}>
            <Scissors size={24} style={iconStyle} />
            <span style={{ marginLeft: '4px', lineHeight: '24px', verticalAlign: 'middle' }}>Editor</span>
          </Link>
        </MenuItem>
        
      </Menu>
      </div>

      <Link to="/login" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#333', marginTop:"50%", marginLeft:"6%" }}>
            <LogOut size={24} />
            <span style={{ marginLeft: '4px', lineHeight: '24px', verticalAlign: 'middle' }}>Cerrar sesion</span>
          </Link>
    </Sidebar>
  );
};

export default SidebarMartin;
