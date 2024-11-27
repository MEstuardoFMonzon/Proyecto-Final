import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Página principal
import PokemonDetail from "./pages/PokemonDetail"; // Detalles de Pokémon
import Favorites from "./pages/Favorites"; // Página de Favoritos
import Navbar from "./components/Navbar"; // Barra de navegación
import './styles/main.css'; // Asegúrate de importar el archivo de estilo principal

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Página principal */}
          <Route path="/pokemon/:name" element={<PokemonDetail />} /> {/* Página de detalle */}
          <Route path="/favoritos" element={<Favorites />} /> {/* Página de favoritos */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
