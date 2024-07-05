import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import DisplayScreen from "~/components/Icons/DisplayScreen";
import Playlist from "~/components/Icons/Playlist";
import Libreria from "~/components/Icons/Libreria";
import UserProfile from "./Components";
import Scissors from "~/components/Icons/Scissors";
import LogOut from "~/components/Icons/LogOut";

const SidebarMartin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const iconStyle = { marginRight: "8px", verticalAlign: "middle", width: "24px", height: "24px" };
  const sidebarWidth = isOpen ? "w-64" : "w-20"; // Adjust width according to your preference

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex transition-width duration-300 ${sidebarWidth}`}>
      <Sidebar collapsed={!isOpen} className="transition-width duration-300">
        {/* Condición para mostrar UserProfile solo si el sidebar está abierto */}
        {isOpen && <UserProfile username="Martin Parisi" />}

        <div className="mt-10">
          <Menu>
            <MenuItem>
              <Link to="/Screens" className="flex items-center no-underline text-gray-800">
                <DisplayScreen size={24} style={iconStyle} />
                {isOpen && <span className="ml-1 align-middle leading-6">Pantallas</span>}
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/playlist" className="flex items-center no-underline text-gray-800">
                <Playlist size={24} style={iconStyle} />
                {isOpen && <span className="ml-1 align-middle leading-6">Playlist</span>}
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/biblioteca" className="flex items-center no-underline text-gray-800">
                <Libreria size={24} style={iconStyle} />
                {isOpen && <span className="ml-1 align-middle leading-6">Biblioteca</span>}
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/" className="flex items-center no-underline text-gray-800">
                <Scissors size={24} style={iconStyle} />
                {isOpen && <span className="ml-1 align-middle leading-6">Editor</span>}
              </Link>
            </MenuItem>
          </Menu>
        </div>

        {/* Botón de cerrar sesión */}
        <Link to="/login" className="flex items-center no-underline text-gray-800 mt-20 ml-4">
          <LogOut size={24} />
          {isOpen && <span className="ml-1 align-middle leading-6">Cerrar sesión</span>}
        </Link>
      </Sidebar>

      {/* Botón para alternar la visibilidad del sidebar */}
      <button
        onClick={toggleSidebar}
        className={`h-7 w-7 border-none bg-none cursor-pointer fixed transition-all duration-300 ${
          isOpen ? "ml-[14%]" : "ml-[5%]"
        } z-3`}
      >
        <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          {isOpen ? (
            <path d="M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z"></path>
          ) : (
            <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z"></path>
          )}
        </svg>
      </button>
    </div>
  );
};

export default SidebarMartin;
