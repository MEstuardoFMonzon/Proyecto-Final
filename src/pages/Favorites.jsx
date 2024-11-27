import React, { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";  // Asegúrate de que este componente esté bien
import "../styles/main.css";  // Asegúrate de tener este archivo de estilo

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (pokemonName) => {
    const updatedFavorites = favorites.filter((pokemon) => pokemon.name !== pokemonName);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites">
      <h2>Favoritos</h2>
      <div className="pokemon-container">
        {favorites.map((pokemon, index) => (
          <div key={index} className="favorite-item">
            <PokemonCard pokemon={pokemon} />
            <button onClick={() => removeFromFavorites(pokemon.name)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;

