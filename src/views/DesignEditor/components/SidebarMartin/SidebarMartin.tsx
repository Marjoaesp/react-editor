import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import DisplayScreen from '~/components/Icons/DisplayScreen';
import Playlist from '~/components/Icons/Playlist';
import Libreria from '~/components/Icons/Libreria';
import UserProfile from './Components';
import Scissors from '~/components/Icons/Scissors';
import LogOut from '~/components/Icons/LogOut';

const SidebarMartin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const iconStyle = { marginRight: '8px', verticalAlign: 'middle', width: '24px', height: '24px' };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar collapsed={!isOpen}>
        {/* Condición para mostrar UserProfile solo si el sidebar está abierto */}
        {isOpen && <UserProfile username="Martin Parisi" />}

        {/* Condición para mostrar el menú solo si el sidebar está abierto */}
        {isOpen && (
          <div style={{ marginTop: "10%" }}>
            <Menu>
              <MenuItem>
                <Link
                  to="/Screens"
                  style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "#333" }}
                >
                  <DisplayScreen size={24} style={iconStyle} />
                  <span style={{ marginLeft: "4px", lineHeight: "24px", verticalAlign: "middle" }}>Pantallas</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/playlist"
                  style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "#333" }}
                >
                  <Playlist size={24} style={iconStyle} />
                  <span style={{ marginLeft: "4px", lineHeight: "24px", verticalAlign: "middle" }}>Playlist</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/biblioteca"
                  style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "#333" }}
                >
                  <Libreria size={24} style={iconStyle} />
                  <span style={{ marginLeft: "4px", lineHeight: "24px", verticalAlign: "middle" }}>Biblioteca</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "#333" }}>
                  <Scissors size={24} style={iconStyle} />
                  <span style={{ marginLeft: "4px", lineHeight: "24px", verticalAlign: "middle" }}>Editor</span>
                </Link>
              </MenuItem>
            </Menu>
          </div>
        )}

        {/* Condición para mostrar el botón de cerrar sesión solo si el sidebar está abierto */}
        {isOpen && (
          <Link
            to="/login"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#333",
              marginTop: "50%",
              marginLeft: "6%",
            }}
          >
            <LogOut size={24} />
            <span style={{ marginLeft: "4px", lineHeight: "24px", verticalAlign: "middle" }}>Cerrar sesión</span>
          </Link>
        )}
      </Sidebar>

      {/* Botón para alternar la visibilidad del sidebar */}
      <button onClick={toggleSidebar} style={{ marginLeft: "10px", height: "40px", width:"40px", border: "none", background: "none", cursor: "pointer" }}>
        <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          {isOpen ? (
            <path d="M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z"></path>
          ) : (
            <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z"></path>
          )}
        </svg>
      </button>
    </div>
  )
};

export default SidebarMartin;
