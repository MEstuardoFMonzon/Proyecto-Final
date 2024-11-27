import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PokemonCard({ pokemon }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Revisar si el Pokémon está en favoritos
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFav = storedFavorites.some((fav) => fav.name === pokemon.name);
    setIsFavorite(isFav);
  }, [pokemon.name]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      // Si ya es favorito, eliminarlo
      const updatedFavorites = storedFavorites.filter((fav) => fav.name !== pokemon.name);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Si no es favorito, agregarlo
      storedFavorites.push(pokemon);
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card-content">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`}
          alt={pokemon.name}
        />
        <h3>{pokemon.name}</h3>
        <p>Tipos: {pokemon.types.join(", ")}</p> {/* Mostrar los tipos */}
      </Link>
      <button
        onClick={toggleFavorite}
        className={`favorite-button ${isFavorite ? "favorited" : ""}`}
      >
        {isFavorite ? "❤️ Quitar" : "🤍 Favorito"}
      </button>
    </div>
  );
}

export default PokemonCard;
