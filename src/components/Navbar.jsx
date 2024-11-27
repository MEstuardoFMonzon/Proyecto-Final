import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";  // Asegúrate de tener este archivo de estilo

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Página Principal</Link>
      <Link to="/favoritos">Favoritos</Link>
    </nav>
  );
}

export default Navbar;
